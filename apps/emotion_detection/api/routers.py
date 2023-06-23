from rest_framework.routers import DefaultRouter
from apps.emotion_detection.api.views.expressions_viewset import ExpressionsViewSet
from apps.emotion_detection.api.views.gender_viewset import GendersViewSet
from apps.emotion_detection.api.views.ages_viewset import AgesViewSet

router = DefaultRouter()

router.register(r'expressions', ExpressionsViewSet, basename='expressions')
router.register(r'genders', GendersViewSet, basename='genders')
router.register(r'ages', AgesViewSet, basename='ages')

urlpatterns = router.urls