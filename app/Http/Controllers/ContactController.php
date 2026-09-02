<?php

namespace App\Http\Controllers;

use App\Mail\ContactInquiryMail;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        return view('home');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:180'],
            'type' => ['required', 'string', 'in:Business website,Website / capstone project,IoT project,Not sure yet'],
            'details' => ['required', 'string', 'min:12', 'max:4000'],
        ]);

        $inquiry = Inquiry::create($validated);

        Mail::to(config('mail.from.address'))->send(new ContactInquiryMail($inquiry));

        return redirect()
            ->route('home', ['#contact'])
            ->with('success', 'Thanks — your project details were sent. I usually reply within a day.');
    }
}
