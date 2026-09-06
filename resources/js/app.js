import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navBackdrop = document.getElementById('navBackdrop');
    const form = document.getElementById('projectForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const typeSelect = document.getElementById('type');
    const header = document.querySelector('header');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setNavOpen = (open) => {
        if (!navLinks || !navToggle) return;
        navLinks.classList.toggle('is-open', open);
        navToggle.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (navBackdrop) {
            navBackdrop.classList.toggle('is-open', open);
            navBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
        }
        document.body.classList.toggle('nav-open', open);
    };

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            setNavOpen(!navLinks.classList.contains('is-open'));
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => setNavOpen(false));
        }

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setNavOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setNavOpen(false);
        });
    }

    if (header) {
        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const delay = Number(entry.target.dataset.revealDelay) || 0;
                window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        revealElements.forEach((element) => {
            const section = element.closest('section') || element.parentElement;
            const siblings = section ? Array.from(section.querySelectorAll('.reveal')) : [element];
            element.dataset.revealDelay = String(Math.max(siblings.indexOf(element), 0) * 90);
            revealObserver.observe(element);
        });

        const hero = document.querySelector('.hero.reveal');
        if (hero) {
            hero.dataset.revealDelay = '0';
            requestAnimationFrame(() => hero.classList.add('is-visible'));
        }
    }

    const animateCount = (el) => {
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) return;

        const suffix = el.dataset.suffix ?? '';
        const duration = 1100;

        if (prefersReducedMotion) {
            el.textContent = `${target}${suffix}`;
            return;
        }

        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };

        el.textContent = `0${suffix}`;
        requestAnimationFrame(tick);
    };

    const countEls = document.querySelectorAll('[data-count]');
    if (countEls.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        countEls.forEach((el) => countObserver.observe(el));
    }

    const pricingData = {
        'Business website': {
            title: 'Business Website',
            range: '₱3,500 – ₱7,000',
            features: ['3–6 pages', 'Product/service catalog', 'Contact form + map', '2 rounds of revisions']
        },
        'Website / capstone project': {
            title: 'Web System / Capstone',
            range: '₱8,000 – ₱15,000',
            features: ['Login & user roles', 'Database + admin panel', 'Custom features', 'Documentation included']
        },
        'IoT project': {
            title: 'IoT Project',
            range: '₱6,000 – ₱18,000',
            features: ['Sensor + microcontroller setup', 'Live web/mobile dashboard', 'Depends on hardware needed', 'Testing & calibration']
        }
    };

    const pricingDisplay = document.getElementById('pricingDisplay');
    const pricingTitle = pricingDisplay?.querySelector('.pricing-display-title');
    const pricingAmount = pricingDisplay?.querySelector('.pricing-display-amount');
    const pricingFeatures = pricingDisplay?.querySelector('.pricing-display-features');

    const renderPricing = (selectedType) => {
        if (!pricingDisplay) return;
        const pricing = pricingData[selectedType];

        if (!pricing) {
            pricingDisplay.hidden = true;
            return;
        }

        if (pricingTitle) pricingTitle.textContent = pricing.title;
        if (pricingAmount) pricingAmount.textContent = pricing.range;
        if (pricingFeatures) {
            pricingFeatures.innerHTML = pricing.features.map((item) => `<li>${item}</li>`).join('');
        }

        pricingDisplay.hidden = false;
        pricingDisplay.classList.remove('is-animating');
        void pricingDisplay.offsetWidth;
        pricingDisplay.classList.add('is-animating');
    };

    document.querySelectorAll('.price-cta[data-project-type]').forEach((cta) => {
        cta.addEventListener('click', () => {
            const projectType = cta.getAttribute('data-project-type');
            if (typeSelect && projectType) {
                typeSelect.value = projectType;
                renderPricing(projectType);
            }
        });
    });

    if (typeSelect) {
        typeSelect.addEventListener('change', (event) => {
            renderPricing(event.target.value);
        });

        if (pricingData[typeSelect.value]) {
            renderPricing(typeSelect.value);
        }
    }

    if (!form) return;

    form.querySelectorAll('input, textarea, select').forEach((field) => {
        const clearInvalid = () => field.classList.remove('is-invalid');
        field.addEventListener('input', clearInvalid);
        field.addEventListener('change', clearInvalid);
    });

    form.addEventListener('submit', (event) => {
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const details = form.querySelector('#details');
        const fields = [name, email, details];
        let valid = true;
        let message = 'Please complete the required fields.';

        fields.forEach((field) => {
            if (!field) return;
            const empty = !field.value.trim();
            field.classList.toggle('is-invalid', empty);
            if (empty) valid = false;
        });

        if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('is-invalid');
            valid = false;
        }

        if (details && details.value.trim().length > 0 && details.value.trim().length < 12) {
            details.classList.add('is-invalid');
            valid = false;
            message = 'Please add a bit more detail (at least 12 characters).';
        }

        if (!valid) {
            event.preventDefault();
            if (formStatus) {
                formStatus.className = 'form-status is-error';
                formStatus.textContent = message;
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.textContent = 'Sending...';
        }

        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = 'Sending your project details...';
        }
    });

    const successMessage = document.querySelector('.form-status.is-success');
    if (successMessage && submitBtn) {
        submitBtn.classList.add('is-success');
        submitBtn.textContent = 'Sent!';
        submitBtn.disabled = true;
    }
});
