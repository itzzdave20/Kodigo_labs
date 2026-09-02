import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navBackdrop = document.getElementById('navBackdrop');
    const form = document.getElementById('projectForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const typeSelect = document.getElementById('type');

    if (navToggle && navLinks) {
        const closeNav = () => {
            navLinks.classList.remove('is-open');
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            if (navBackdrop) navBackdrop.classList.remove('is-open');
        };

        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (navBackdrop) navBackdrop.classList.toggle('is-open', open);
        });

        if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
        navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(() => entry.target.classList.add('is-visible'), delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach((element, index) => {
            const section = element.closest('section');
            const siblingsInSection = section ? Array.from(section.querySelectorAll('.reveal')) : [element];
            const indexInSection = siblingsInSection.indexOf(element);
            element.dataset.revealDelay = indexInSection * 80;
            revealObserver.observe(element);
        });
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
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

    document.querySelectorAll('.price-cta[data-project-type]').forEach((cta) => {
        cta.addEventListener('click', () => {
            const projectType = cta.getAttribute('data-project-type');
            if (typeSelect && projectType) {
                typeSelect.value = projectType;
                typeSelect.dispatchEvent(new Event('change'));
            }
        });
    });

    if (typeSelect) {
        const pricingDisplay = document.getElementById('pricingDisplay');
        const pricingTitle = pricingDisplay?.querySelector('.pricing-display-title');
        const pricingAmount = pricingDisplay?.querySelector('.pricing-display-amount');
        const pricingFeatures = pricingDisplay?.querySelector('.pricing-display-features');

        typeSelect.addEventListener('change', (e) => {
            const selectedType = e.target.value;
            const pricing = pricingData[selectedType];

            if (pricing && pricingDisplay) {
                if (pricingTitle) pricingTitle.textContent = pricing.title;
                if (pricingAmount) pricingAmount.textContent = pricing.range;
                if (pricingFeatures) {
                    pricingFeatures.innerHTML = pricing.features.map(f => `<li>${f}</li>`).join('');
                }
                pricingDisplay.style.display = 'block';
            } else if (pricingDisplay) {
                pricingDisplay.style.display = 'none';
            }
        });

        if (typeSelect.value && pricingData[typeSelect.value]) {
            typeSelect.dispatchEvent(new Event('change'));
        }
    }



    if (!form) return;

    form.addEventListener('submit', (event) => {
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const details = form.querySelector('#details');
        const fields = [name, email, details];
        let valid = true;

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

        if (!valid) {
            event.preventDefault();
            if (formStatus) {
                formStatus.className = 'form-status is-error';
                formStatus.textContent = 'Please complete the required fields.';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
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
