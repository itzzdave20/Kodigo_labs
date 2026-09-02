<x-mail::message>
# New Kodigo Labs inquiry

A new project request just came in through the website.

**Name:** {{ $inquiry->name }}  
**Email:** {{ $inquiry->email }}  
**Project type:** {{ $inquiry->type }}

**Details**  
{{ $inquiry->details }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
