
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (!menuButton || !navigation) {
        return;
    }

    function closeMenu() {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("is-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});




document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
        const track = carousel.querySelector(".testimonial-track");
        const cards = Array.from(track.querySelectorAll(".testimonial-card"));
        const viewport = carousel.querySelector(".testimonial-viewport");
        const dotsContainer = carousel.querySelector(".testimonial-dots");
        const previousButton = carousel.querySelector('[data-direction="prev"]');
        const nextButton = carousel.querySelector('[data-direction="next"]');

        if (!track || !viewport || cards.length === 0) return;

        let currentIndex = 0;
        let visibleCards = getVisibleCards();
        let autoplay;

        function getVisibleCards() {
            if (window.innerWidth <= 560) return 1;
            if (window.innerWidth <= 850) return 2;
            return 3;
        }

        function getMaxIndex() {
            return Math.max(0, cards.length - visibleCards);
        }

        function buildDots() {
            dotsContainer.innerHTML = "";

            for (let i = 0; i <= getMaxIndex(); i++) {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "testimonial-dot";
                dot.setAttribute("aria-label", "Show testimonial position " + (i + 1));

                dot.addEventListener("click", function () {
                    goTo(i);
                    restartAutoplay();
                });

                dotsContainer.appendChild(dot);
            }
        }

        function goTo(index) {
            const maxIndex = getMaxIndex();

            if (index > maxIndex) index = 0;
            if (index < 0) index = maxIndex;

            currentIndex = index;

            const cardStyle = window.getComputedStyle(cards[0]);
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            const cardWidth = cards[0].getBoundingClientRect().width;

            track.style.transform =
                "translateX(-" + (currentIndex * (cardWidth + gap)) + "px)";

            dotsContainer.querySelectorAll(".testimonial-dot").forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentIndex);
                dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
            });
        }

        function next() {
            goTo(currentIndex + 1);
        }

        function previous() {
            goTo(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();

            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                autoplay = window.setInterval(next, 4500);
            }
        }

        function stopAutoplay() {
            if (autoplay) window.clearInterval(autoplay);
        }

        function restartAutoplay() {
            startAutoplay();
        }

        previousButton.addEventListener("click", function () {
            previous();
            restartAutoplay();
        });

        nextButton.addEventListener("click", function () {
            next();
            restartAutoplay();
        });

        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
        carousel.addEventListener("focusin", stopAutoplay);
        carousel.addEventListener("focusout", startAutoplay);

        let resizeTimer;

        window.addEventListener("resize", function () {
            window.clearTimeout(resizeTimer);

            resizeTimer = window.setTimeout(function () {
                const newVisibleCards = getVisibleCards();

                if (newVisibleCards !== visibleCards) {
                    visibleCards = newVisibleCards;
                    currentIndex = Math.min(currentIndex, getMaxIndex());
                    buildDots();
                }

                goTo(currentIndex);
            }, 120);
        });

        buildDots();
        goTo(0);
        startAutoplay();
    });
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("Notwex project modal script is running.");

    const modal = document.getElementById("projectModal");

    if (!modal) {
        console.error(
            "Popup not found. Add the project modal HTML to home.html."
        );
        return;
    }

    document.addEventListener("click", function (event) {
        const openButton = event.target.closest(
            "[data-open-project-modal]"
        );

        const closeButton = event.target.closest(
            "[data-close-project-modal]"
        );

        if (openButton) {
            event.preventDefault();

            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("project-modal-open");

            const firstInput = modal.querySelector(
                'input:not([type="hidden"])'
            );

            if (firstInput) {
                firstInput.focus();
            }
        }

        if (closeButton) {
            event.preventDefault();

            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("project-modal-open");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("project-modal-open");
        }
    });
});



// Portfolio project filters
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(
        "[data-portfolio-filter]"
    );

    const projectCards = document.querySelectorAll(
        "[data-portfolio-category]"
    );

    if (!filterButtons.length || !projectCards.length) {
        return;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.portfolioFilter;

            filterButtons.forEach(function (item) {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach(function (card) {
                const category = card.dataset.portfolioCategory;

                card.hidden =
                    selectedCategory !== "all" &&
                    category !== selectedCategory;
            });
        });
    });
});
