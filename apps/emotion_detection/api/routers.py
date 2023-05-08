from rest_framework.routers import DefaultRouter
from apps.emotion_detection.api.views.detections_viewset import DetectionsViewSet

router = DefaultRouter()

router.register(r'detections', DetectionsViewSet, basename='products')

urlpatterns = router.urls