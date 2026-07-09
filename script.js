/*
==========================================================
RAMINDSGN
script.js
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*======================================================
    ELEMENTS
    ======================================================*/

    const animatedElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right"
    );

    const glow = document.querySelector(".glow");

    const navigation = document.querySelector(".floating-nav");

    const scrollIndicator = document.querySelector(".scroll-indicator");

    const hero = document.querySelector(".hero");

    const featureCards = document.querySelectorAll(".feature-card");



    /*======================================================
    INTERSECTION OBSERVER
    ======================================================*/

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -80px 0px"
        }

    );

    animatedElements.forEach((element) => {

        observer.observe(element);

    });



    /*======================================================
    STAGGER FEATURE CARDS
    ======================================================*/

    featureCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 120}ms`;

    });



    /*======================================================
    NAVBAR SCROLL EFFECT
    ======================================================*/

    function updateNavigation() {

        if (!navigation) return;

        if (window.scrollY > 80) {

            navigation.style.background = "rgba(0,0,0,.55)";
            navigation.style.backdropFilter = "blur(28px)";
            navigation.style.borderColor = "rgba(255,255,255,.12)";
            navigation.style.transform = "scale(.97)";
            navigation.style.boxShadow = "0 20px 60px rgba(0,0,0,.35)";

        } else {

            navigation.style.background = "rgba(0,0,0,.28)";
            navigation.style.backdropFilter = "blur(18px)";
            navigation.style.borderColor = "rgba(255,255,255,.08)";
            navigation.style.transform = "scale(1)";
            navigation.style.boxShadow = "none";

        }

    }



    /*======================================================
    HIDE SCROLL INDICATOR
    ======================================================*/

    function updateScrollIndicator() {

        if (!scrollIndicator) return;

        if (window.scrollY > 100) {

            scrollIndicator.style.opacity = "0";
            scrollIndicator.style.transform =
                "translate(-50%,40px)";

        } else {

            scrollIndicator.style.opacity = "1";
            scrollIndicator.style.transform =
                "translate(-50%,0px)";

        }

    }



    /*======================================================
    PARALLAX HERO
    ======================================================*/

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const y = window.scrollY;

        hero.style.transform =
            `translateY(${y * 0.08}px)`;

    }, {
        passive: true
    });



    /*======================================================
    CURSOR GLOW
    ======================================================*/

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function animateGlow() {

        if (!glow) return;

        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;

        glow.style.left = `${glowX - 450}px`;
        glow.style.top = `${glowY - 450}px`;

        requestAnimationFrame(animateGlow);

    }

    animateGlow();



    /*======================================================
    CARD LIGHT FOLLOW
    ======================================================*/

    featureCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.background = `

                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255,255,255,.08),
                    rgba(255,255,255,.03) 45%
                )

            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background =
                "rgba(255,255,255,.03)";

        });

    });



    /*======================================================
    ACTIVE NAVIGATION
    ======================================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let current = "";

        sections.forEach((section) => {

            const top = section.offsetTop - 160;
            const height = section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {

                current = section.id;

            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }



    /*======================================================
    REDUCED MOTION
    ======================================================*/

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        animatedElements.forEach((element) => {

            element.classList.add("show");

        });

        return;

    }



    /*======================================================
    EVENTS
    ======================================================*/

    window.addEventListener("scroll", () => {

        updateNavigation();
        updateScrollIndicator();
        updateActiveLink();

    }, {
        passive: true
    });

    updateNavigation();
    updateScrollIndicator();
    updateActiveLink();

});