<header>
    <nav class="wrap" aria-label="Primary">
        <a href="{{ url('/') }}#top" class="brand">
            <img src="{{ asset('images/logo.svg') }}" alt="Kodigo Labs Logo" class="brand-logo">
            kodigo labs
        </a>

        <div class="navlinks" id="navLinks">
            <a href="{{ url('/') }}#services">Services</a>
            <a href="{{ url('/') }}#stack">Tech Stack</a>
            <a href="{{ url('/') }}#pricing">Pricing</a>
            <a href="{{ url('/') }}#process">Process</a>
            <a href="{{ url('/') }}#contact" class="nav-mobile-cta">Start a project</a>
        </div>

        <a href="{{ url('/') }}#contact" class="nav-cta">Start a project</a>

        <button type="button" class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navLinks">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
    <div class="nav-backdrop" id="navBackdrop" aria-hidden="true"></div>
</header>
