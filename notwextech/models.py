
from django.db import models


class ProjectInquiry(models.Model):

    SERVICE_CHOICES = [
        ("website", "Website Development"),
        ("software", "Custom Software / Django System"),
        ("ecommerce", "E-Commerce Website"),
        ("mobile", "Mobile Application"),
        ("consulting", "IT Consulting"),
        ("other", "Other Technology Service"),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=150, blank=True)

    service = models.CharField(
        max_length=30,
        choices=SERVICE_CHOICES
    )

    timeline = models.CharField(
        max_length=100,
        blank=True
    )

    project_description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    is_contacted = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project Inquiry"
        verbose_name_plural = "Project Inquiries"

    def __str__(self):
        return f"{self.name} - {self.get_service_display()}"
