<section id="contact">
    <div class="wrap">
        <div class="section-head reveal">
            <span class="section-node"></span>
            <h2 class="section-title">Start a project</h2>
        </div>
        <div class="contact-grid">
            <div class="contact-info reveal">
                <p>Fill out the form with your project details, or email me directly. I usually reply within a day.</p>
                <a class="contact-line" href="mailto:kodigolabs.dev@gmail.com">
                    <span class="dot"></span>
                    kodigolabs.dev@gmail.com
                </a>
                <div class="contact-line">
                    <span class="dot"></span>
                    Based in the Philippines · working with clients remotely
                </div>
            </div>

            <form id="projectForm" method="POST" action="{{ route('contact.store') }}" novalidate>
                @csrf

                @if (session('success'))
                    <div class="form-status is-success" role="status">{{ session('success') }}</div>
                @endif

                @if ($errors->any())
                    <div class="form-status is-error" role="alert">Please fix the highlighted fields and try again.</div>
                @endif

                <div class="field-row">
                    <div class="field">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" value="{{ old('name') }}" required autocomplete="name">
                        @error('name')
                            <span class="field-error">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="{{ old('email') }}" required autocomplete="email">
                        @error('email')
                            <span class="field-error">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <div class="field">
                    <label for="type">Project type</label>
                    <select id="type" name="type" required>
                        @php
                            $types = ['Business website', 'Website / capstone project', 'IoT project', 'Not sure yet'];
                        @endphp
                        @foreach ($types as $type)
                            <option value="{{ $type }}" @selected(old('type') === $type)>{{ $type }}</option>
                        @endforeach
                    </select>
                    @error('type')
                        <span class="field-error">{{ $message }}</span>
                    @enderror
                    
                    <!-- Pricing display area -->
                    <div id="pricingDisplay" class="pricing-display" hidden>
                        <div class="pricing-display-header">
                            <span class="pricing-display-icon">💰</span>
                            <strong class="pricing-display-title"></strong>
                        </div>
                        <div class="pricing-display-amount"></div>
                        <ul class="pricing-display-features"></ul>
                        <div class="pricing-display-note">
                            <small>💡 Final price depends on specific requirements. This is an estimate.</small>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="details">Project details</label>
                    <textarea id="details" name="details" placeholder="What are you building, and when do you need it by?" required>{{ old('details') }}</textarea>
                    @error('details')
                        <span class="field-error">{{ $message }}</span>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary" id="submitBtn">Send project details</button>
                <div class="form-status" id="formStatus" aria-live="polite"></div>
            </form>
        </div>
    </div>
</section>
