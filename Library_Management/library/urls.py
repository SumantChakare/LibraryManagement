from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BorrowerViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'borrowers', BorrowerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]