from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend

from .models import Race, Booking, RaceResult, RaceWaitlist
from .serializers import (
    RaceSerializer, BookingSerializer, RaceResultSerializer,
    WaitlistSerializer, SubmitResultsSerializer,
)
from .services.points_service import submit_race_results
from .services.waitlist_service import add_to_waitlist, promote_next_from_waitlist, cancel_waitlist
from .services.csv_import_service import parse_csv_results


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


# ─── Races ────────────────────────────────────────────────────────────────────

class RaceViewSet(viewsets.ModelViewSet):
    queryset           = Race.objects.select_related('championship').all()
    serializer_class   = RaceSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends    = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields   = ['race_type', 'skill_level', 'status', 'championship']
    search_fields      = ['title', 'track_name']
    ordering_fields    = ['scheduled_at', 'price']
    ordering           = ['scheduled_at']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    # ── Booking ───────────────────────────────────────────────────────────────

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def book(self, request, pk=None):
        race   = self.get_object()
        driver = request.user.driver_profile

        if race.status not in (Race.STATUS_OPEN, Race.STATUS_FULL):
            return Response({'detail': 'Race is not available for booking.'}, status=status.HTTP_400_BAD_REQUEST)

        if Booking.objects.filter(driver=driver, race=race, status=Booking.STATUS_CONFIRMED).exists():
            return Response({'detail': 'Already booked.'}, status=status.HTTP_400_BAD_REQUEST)

        if RaceWaitlist.objects.filter(driver=driver, race=race, status=RaceWaitlist.STATUS_WAITING).exists():
            return Response({'detail': 'Already on the waitlist.'}, status=status.HTTP_400_BAD_REQUEST)

        # Full → join waitlist automatically
        if race.is_full:
            try:
                entry = add_to_waitlist(driver, race)
            except ValueError as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'waitlisted': True,
                'detail': f'Race is full. You are #{entry.position} on the waitlist.',
                'waitlist': WaitlistSerializer(entry).data,
            }, status=status.HTTP_202_ACCEPTED)

        booking = Booking.objects.create(
            driver=driver, race=race,
            status=Booking.STATUS_CONFIRMED,
            amount_paid=race.price,
        )
        if race.is_full:
            race.status = Race.STATUS_FULL
            race.save(update_fields=['status'])

        return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def cancel_booking(self, request, pk=None):
        race   = self.get_object()
        driver = request.user.driver_profile

        booking = Booking.objects.filter(
            driver=driver, race=race, status=Booking.STATUS_CONFIRMED
        ).first()

        if not booking:
            # Maybe they're on the waitlist
            cancelled = cancel_waitlist(driver, race)
            if cancelled:
                return Response({'detail': 'Removed from waitlist.'})
            return Response({'detail': 'No active booking or waitlist entry found.'}, status=status.HTTP_404_NOT_FOUND)

        booking.status = Booking.STATUS_CANCELLED
        booking.save(update_fields=['status'])

        # Attempt to promote next waitlisted driver
        promote_next_from_waitlist(race)

        return Response({'detail': 'Booking cancelled.'})

    # ── Results ───────────────────────────────────────────────────────────────

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def results(self, request, pk=None):
        race = self.get_object()
        results = race.results.select_related('driver').order_by('position')
        return Response(RaceResultSerializer(results, many=True).data)

    # ── Waitlist ──────────────────────────────────────────────────────────────

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def waitlist(self, request, pk=None):
        race = self.get_object()
        if not request.user.is_staff:
            # Drivers only see their own entry
            entry = RaceWaitlist.objects.filter(
                race=race, driver=request.user.driver_profile, status=RaceWaitlist.STATUS_WAITING
            ).first()
            if not entry:
                return Response({'detail': 'You are not on the waitlist.'}, status=status.HTTP_404_NOT_FOUND)
            return Response(WaitlistSerializer(entry).data)
        entries = RaceWaitlist.objects.filter(race=race, status=RaceWaitlist.STATUS_WAITING).order_by('position')
        return Response(WaitlistSerializer(entries, many=True).data)


# ─── My Bookings + Waitlist ───────────────────────────────────────────────────

class MyBookingsView(generics.ListAPIView):
    serializer_class   = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            driver=self.request.user.driver_profile
        ).select_related('race').order_by('-booked_at')


class MyWaitlistView(generics.ListAPIView):
    serializer_class   = WaitlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return RaceWaitlist.objects.filter(
            driver=self.request.user.driver_profile,
            status=RaceWaitlist.STATUS_WAITING,
        ).select_related('race').order_by('joined_at')


# ─── Result Submission ────────────────────────────────────────────────────────

class SubmitResultsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = SubmitResultsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        race_id = serializer.validated_data['race_id']
        try:
            race = Race.objects.get(pk=race_id)
        except Race.DoesNotExist:
            return Response({'detail': 'Race not found.'}, status=status.HTTP_404_NOT_FOUND)

        if race.status == Race.STATUS_COMPLETED:
            return Response({'detail': 'Results already submitted.'}, status=status.HTTP_400_BAD_REQUEST)

        results = submit_race_results(race, serializer.validated_data['results'])
        return Response({
            'detail': f'Results submitted for {len(results)} drivers.',
            'results': RaceResultSerializer(results, many=True).data,
        }, status=status.HTTP_201_CREATED)


# ─── CSV Result Import ────────────────────────────────────────────────────────

class ImportResultsCSVView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes     = [MultiPartParser, FormParser]

    def post(self, request):
        race_id  = request.data.get('race_id')
        csv_file = request.FILES.get('file')

        if not race_id:
            return Response({'detail': 'race_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not csv_file:
            return Response({'detail': 'No CSV file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

        if not csv_file.name.endswith('.csv'):
            return Response({'detail': 'File must be a .csv'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            race = Race.objects.get(pk=race_id)
        except Race.DoesNotExist:
            return Response({'detail': 'Race not found.'}, status=status.HTTP_404_NOT_FOUND)

        if race.status == Race.STATUS_COMPLETED:
            return Response({'detail': 'Results already submitted for this race.'}, status=status.HTTP_400_BAD_REQUEST)

        results_data, errors = parse_csv_results(csv_file)

        if errors:
            return Response({
                'detail': 'CSV contains errors. No results were saved.',
                'errors': errors,
            }, status=status.HTTP_400_BAD_REQUEST)

        if not results_data:
            return Response({'detail': 'CSV has no valid result rows.'}, status=status.HTTP_400_BAD_REQUEST)

        results = submit_race_results(race, results_data)
        return Response({
            'detail': f'Imported {len(results)} results from CSV.',
            'results': RaceResultSerializer(results, many=True).data,
        }, status=status.HTTP_201_CREATED)
