
from django import forms
from .models import ProjectInquiry


class ProjectInquiryForm(forms.ModelForm):
    class Meta:
        model = ProjectInquiry
        fields = [
            "name",
            "email",
            "phone",
            "company",
            "service",
            "timeline",
            "project_description",
        ]

        widgets = {
            "name": forms.TextInput(attrs={
                "placeholder": "Your full name",
                "autocomplete": "name",
            }),
            "email": forms.EmailInput(attrs={
                "placeholder": "you@example.com",
                "autocomplete": "email",
            }),
            "phone": forms.TextInput(attrs={
                "placeholder": "+255...",
                "autocomplete": "tel",
            }),
            "company": forms.TextInput(attrs={
                "placeholder": "Your company (optional)",
                "autocomplete": "organization",
            }),
            "service": forms.Select(),
            "timeline": forms.TextInput(attrs={
                "placeholder": "e.g. Within 1 month",
            }),
            "project_description": forms.Textarea(attrs={
                "placeholder": "Describe your idea, goals, and the features you need...",
                "rows": 4,
            }),
        }

        labels = {
            "name": "Full name",
            "email": "Email address",
            "phone": "Phone / WhatsApp",
            "company": "Company name",
            "service": "What service do you need?",
            "timeline": "When would you like to start?",
            "project_description": "Tell us about your project",
        }
