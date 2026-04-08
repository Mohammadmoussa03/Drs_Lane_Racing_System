from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChampionshipViewSet

router = DefaultRouter()
router.register(r'championships', ChampionshipViewSet, basename='championship')

urlpatterns = [
    path('', include(router.urls)),
]
