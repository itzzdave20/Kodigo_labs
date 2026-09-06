<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Kodigo Labs builds business websites, capstone systems, and IoT projects — priced fairly for students and small businesses in the Philippines.">
    <meta name="theme-color" content="#07140f">
    <title>@yield('title', 'Kodigo Labs — Websites, Systems & IoT Projects')</title>
    
    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/logo.svg') }}">
    <link rel="icon" type="image/svg+xml" sizes="32x32" href="{{ asset('images/favicon-32x32.svg') }}">
    <link rel="icon" type="image/svg+xml" sizes="16x16" href="{{ asset('images/favicon-16x16.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/apple-touch-icon.svg') }}">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>document.documentElement.classList.add('js');</script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="trace-bg" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-a" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-b" aria-hidden="true"></div>

    @include('partials.header')

    <main id="top">
        @yield('content')
    </main>

    @include('partials.footer')
</body>
</html>
