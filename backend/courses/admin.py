from django.contrib import admin
from .models import Course, Lesson, Category # Убедись, что импортировал модели
from django.utils.html import format_html


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1  # Позволяет добавлять несколько уроков сразу

class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "get_duration", "language")  # Используем метод вместо поля
    search_fields = ("title",)
    list_filter = ("language",)

    def get_duration(self, obj):
        total_minutes = sum((lesson.duration or 0) for lesson in obj.lessons.all())  # Фикс ошибки
        hours = total_minutes // 60  # Часы
        minutes = total_minutes % 60  # Минуты
        return f"{hours}ч {minutes}м" if hours else f"{minutes}м"

    get_duration.short_description = "Продолжительность"  # Подпись в админке

admin.site.register(Course, CourseAdmin)


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")  # Уникальный список
    list_filter = ("course",)  # Фильтр по курсам
    search_fields = ("title", "course__title")  # Поиск по названию урока и курса
    ordering = ("course", "order")  # Упорядочивание уроков внутри курса

    def save_model(self, request, obj, form, change):
        if not obj.author:
            obj.author = request.user
        super().save_model(request, obj, form, change)

    def file_instal_link(self, obj):
        if obj.file_instal:
            return format_html('<a href="{}" download>📎 Скачать</a>', obj.file_instal.url)
        return "—"

    file_instal_link.short_description = "Материалы"


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon_preview']  # Добавляем icon_preview для отображения превью иконки

    def icon_preview(self, obj):
        if obj.icon:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:contain;" />', obj.icon.url)
        return "Нет иконки"
    icon_preview.short_description = "Превью иконки"

admin.site.register(Category, CategoryAdmin)