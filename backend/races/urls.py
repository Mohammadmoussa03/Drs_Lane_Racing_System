from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RaceViewSet, MyBookingsView, MyWaitlistView, SubmitResultsView, ImportResultsCSVView

router = DefaultRouter()
router.register(r'races', RaceViewSet, basename='race')

urlpatterns = [
    path('', include(router.urls)),
    path('bookings/mine/',     MyBookingsView.as_view(),      name='my_bookings'),
    path('waitlist/mine/',     MyWaitlistView.as_view(),      name='my_waitlist'),
    path('results/add/',       SubmitResultsView.as_view(),   name='submit_results'),
    path('results/import-csv/', ImportResultsCSVView.as_view(), name='import_results_csv'),
]
