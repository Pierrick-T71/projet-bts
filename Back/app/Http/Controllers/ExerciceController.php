<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercice;

class ExerciceController extends Controller
{
    // Récupérer tous les exercices
    public function index()
    {
        return response()->json(Exercice::latest()->get());
    }

    // Sauvegarder un exercice
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $exercice = Exercice::create([
        'nom' => $request->nom,
        'description' => $request->description,
        ]);

        return response()->json($exercice, 201);
    }

    // Supprimer un exercice
    public function destroy(string $id)
    {
        $exercice = Exercice::findOrFail($id);
        $exercice->delete();

        return response()->json(['message' => 'Supprimé avec succès']);
    }
}