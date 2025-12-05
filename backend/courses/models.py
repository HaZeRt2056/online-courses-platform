from django.db import models
from django.db.models import Sum
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    icon = models.ImageField(upload_to="category_icons/", verbose_name="Иконка")

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=255)
    language = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.PositiveIntegerField(default=0)  # <-- Проверь, что поле есть
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="courses", verbose_name="Категория")



    def update_duration(self):
        total_duration = self.lessons.aggregate(Sum("duration"))["duration__sum"] or 0
        self.duration = total_duration
        self.save()


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons", verbose_name="Курс")
    title = models.CharField(max_length=255, verbose_name="Название урока")
    video = models.URLField(blank=True, null=True, verbose_name="Ссылка на видео")
    file = models.FileField(upload_to='lesson_files/', blank=True, null=True, verbose_name="Файл")
    file_instal = models.FileField(upload_to='install_files/', blank=True, null=True,
                                   verbose_name="Файл для скачивания")  # Домашка/файл
    description = models.TextField(verbose_name="Описание урока")
    order = models.PositiveIntegerField(verbose_name="Очередность урока")
    duration = models.IntegerField(null=True, blank=True, verbose_name="Продолжительность (мин)")

    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")  # авто-обновление
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Автор")

    def __str__(self):
        return f"{self.order}. {self.title} ({self.course.title})"
