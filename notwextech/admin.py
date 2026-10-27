
from django.contrib import admin
from .models import ProjectInquiry


@admin.register(ProjectInquiry)
class ProjectInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "service",
        "created_at",
        "is_contacted",
    )

    list_filter = (
        "service",
        "is_contacted",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "company",
        "project_description",
    )

    readonly_fields = ("created_at",)

    list_editable = ("is_contacted",)
