
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("contact/", views.contact, name="contact"),
    path("about/", views.about, name="about"),
    path("services/", views.services, name="services"),
    path("portfolio/", views.portfolio, name="portfolio"),
    path(
        "submit-project/",
        views.submit_project_inquiry,
        name="submit_project_inquiry",
    ),
    path(
        "services/website-development/",
        views.website_development,
        name="website_development",
    ),
    path(
        "services/custom-software/",
        views.custom_software,
        name="custom_software",
    ),
    path(
        "services/ecommerce-solutions/",
        views.ecommerce_solutions,
        name="ecommerce_solutions",
    ),
    path(
        "services/it-consulting/",
        views.it_consulting,
        name="it_consulting",
    ),
]
