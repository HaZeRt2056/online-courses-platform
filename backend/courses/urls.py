from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, LessonViewSet, CategoryViewSet

# Создаем router и регистрируем ViewSets
router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'categories', CategoryViewSet, basename='category')


urlpatterns = [
    path("", include(router.urls)),  # Включаем маршруты из router
]