from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Championship, ChampionshipEntry
from .serializers import ChampionshipSerializer, ChampionshipEntrySerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ChampionshipViewSet(viewsets.ModelViewSet):
    queryset           = Championship.objects.all()
    serializer_class   = ChampionshipSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields   = ['status', 'season']
    ordering           = ['-season']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def join(self, request, pk=None):
        championship = self.get_object()
        driver = request.user.driver_profile

        if championship.status == Championship.STATUS_COMPLETED:
            return Response({'detail': 'Championship is over.'}, status=status.HTTP_400_BAD_REQUEST)
        if championship.entries.count() >= championship.max_drivers:
            return Response({'detail': 'Championship is full.'}, status=status.HTTP_400_BAD_REQUEST)
        if ChampionshipEntry.objects.filter(championship=championship, driver=driver).exists():
            return Response({'detail': 'Already enrolled.'}, status=status.HTTP_400_BAD_REQUEST)

        entry = ChampionshipEntry.objects.create(championship=championship, driver=driver)
        return Response(ChampionshipEntrySerializer(entry).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny])
    def standings(self, request, pk=None):
        championship = self.get_object()
        entries = championship.entries.select_related('driver').order_by('-points')
        return Response(ChampionshipEntrySerializer(entries, many=True).data)
