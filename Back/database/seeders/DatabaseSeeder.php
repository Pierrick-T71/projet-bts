<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Programme;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // On demande à Laravel de créer nos 4 programmes de base
        Programme::create(['nom' => 'Pull']);
        Programme::create(['nom' => 'Push']);
        Programme::create(['nom' => 'Jambes']);
        Programme::create(['nom' => 'Abdos']);
    }
}