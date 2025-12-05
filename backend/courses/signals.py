from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Lesson  # Импортируем только модели


@receiver([post_save, post_delete], sender=Lesson)
def update_course_duration(sender, instance, **kwargs):
    if instance.course:
        instance.course.update_duration()
