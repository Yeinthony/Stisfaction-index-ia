from rest_framework.routers import DefaultRouter
from apps.emotion_detection.api.views.detections_viewset import ExpretionsViewSet

router = DefaultRouter()

router.register(r'expretions', ExpretionsViewSet, basename='expretions')

urlpatterns = router.urls