@extends('layouts.app')

@section('title', 'Kodigo Labs — Websites, Systems & IoT Projects')

@section('content')
    @include('partials.hero')
    @include('partials.services')
    @include('partials.stack')
    @include('partials.pricing')
    @include('partials.process')
    @include('partials.contact')
@endsection
