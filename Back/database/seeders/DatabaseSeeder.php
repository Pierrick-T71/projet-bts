<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Programme;
use App\Models\User; // ⚠️ On importe le modèle User
use Illuminate\Support\Facades\Hash; // ⚠️ On importe Hash pour crypter le mot de passe

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // On demande à Laravel de créer nos 2 comptes de test
        User::create([
            'name' => 'Professeur Dubois',
            'email' => 'prof@test.com',
            'password' => Hash::make('Azerty@123'),
            'role' => 'prof'
        ]);

        User::create([
            'name' => 'Élève Martin',
            'email' => 'eleve@test.com',
            'password' => Hash::make('Azerty@123'),
            'role' => 'eleve'
        ]);

        // On demande à Laravel de créer nos 4 programmes de base
        Programme::create(['nom' => 'Pull']);
        Programme::create(['nom' => 'Push']);
        Programme::create(['nom' => 'Jambes']);
        Programme::create(['nom' => 'Abdos']);
    }
}