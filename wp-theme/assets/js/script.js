/**
 * Royal Devs Theme – Front-end Scripts
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

(function () {
    'use strict';

    /* --- Mobile menu toggle --- */
    var toggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when a link is tapped
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* --- Smooth scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Scroll-triggered fade-in --- */
    var sections = document.querySelectorAll('.section');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        sections.forEach(function (section) {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }

    /* --- Card hover tap feedback for mobile --- */
    var cards = document.querySelectorAll('.card, .btn');
    cards.forEach(function (card) {
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.97)';
        }, { passive: true });
        card.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });

    /* --- Sticky header shadow on scroll --- */
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 30px -4px hsl(45 93% 58% / 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }
})();
