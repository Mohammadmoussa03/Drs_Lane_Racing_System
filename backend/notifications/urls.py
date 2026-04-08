from django.urls import path
from .views import NotificationListView, UnreadCountView, MarkReadView, MarkAllReadView

urlpatterns = [
    path('notifications/',              NotificationListView.as_view(), name='notifications'),
    path('notifications/unread-count/', UnreadCountView.as_view(),      name='notifications_unread'),
    path('notifications/read-all/',     MarkAllReadView.as_view(),      name='notifications_read_all'),
    path('notifications/<int:pk>/read/', MarkReadView.as_view(),        name='notification_read'),
]
