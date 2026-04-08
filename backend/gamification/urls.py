from django.urls import path
from .views import AchievementListView, MyAchievementsView

urlpatterns = [
    path('achievements/',      AchievementListView.as_view(),  name='achievements'),
    path('achievements/mine/', MyAchievementsView.as_view(),   name='my_achievements'),
]
