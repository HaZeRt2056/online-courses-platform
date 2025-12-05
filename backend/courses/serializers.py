from rest_framework import serializers
from .models import Course, Lesson, Category

class LessonSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # Показывает имя пользователя
    updated_at = serializers.DateTimeField(format="%d.%m.%y")  # Дата в формате дд.мм.гг

    class Meta:
        model = Lesson
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    quantity_lessons = serializers.SerializerMethodField()


    class Meta:
        model = Course
        fields = "__all__"  # <-- Убедись, что тут `duration` включено

    def get_quantity_lessons(self, obj):
        return obj.lessons.count()


class CategorySerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"