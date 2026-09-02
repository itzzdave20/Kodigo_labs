<?php

namespace Database\Factories;

use App\Models\Inquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inquiry>
 */
class InquiryFactory extends Factory
{
    protected $model = Inquiry::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'type' => fake()->randomElement([
                'Business website',
                'Website / capstone project',
                'IoT project',
                'Not sure yet',
            ]),
            'details' => fake()->paragraphs(2, true),
        ];
    }
}
