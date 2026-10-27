
from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from .forms import ProjectInquiryForm
from .models import ProjectInquiry

def home(request):
    return render(request, "home.html")


def about(request):
    return render(request, "about.html")


def services(request):
    return render(request, "services.html")


def portfolio(request):
    return render(request, "portfolio.html")


def contact(request):
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        service = request.POST.get("service", "").strip()
        subject = request.POST.get("subject", "").strip()
        message = request.POST.get("message", "").strip()

        if not name or not email or not message:
            messages.error(
                request,
                "Please fill in your name, email, and message."
            )
            return redirect("contact")

        # Save the contact enquiry in the existing database model.
        ProjectInquiry.objects.create(
            name=name,
            email=email,
            phone=phone,
            company="",
            service=service or "Other",
            timeline="",
            project_description=(
                f"Subject: {subject}\n\n{message}"
                if subject
                else message
            ),
        )

        messages.success(
            request,
            "Thank you! Your message has been submitted successfully."
        )
        return redirect("contact")

    return render(request, "contact.html")


def submit_project_inquiry(request):
    if request.method != "POST":
        return redirect("home")

    form = ProjectInquiryForm(request.POST)

    if form.is_valid():
        form.save()
        messages.success(
            request,
            "Thank you! Your project request has been submitted successfully. "
            "We will get back to you soon."
        )
    else:
        messages.error(
            request,
            "Please check your details and try submitting the form again."
        )

    return redirect("home")

def website_development(request):
    return render(request, "website_development.html")

def custom_software(request):
    return render(request, "custom_software.html")

def ecommerce_solutions(request):
    return render(request, "ecommerce_solutions.html")

def it_consulting(request):
    return render(request, "it_consulting.html")