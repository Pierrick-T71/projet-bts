<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercice;

class ExerciceController extends Controller
{
    // Récupérer tous les exercices
    public function index()
    {
        // On charge la relation "programmes" (avec un S)
        return response()->json(Exercice::with('programmes')->latest()->get());
    }

    /**
     * Enregiste un exercice.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'programmes' => 'required|array', // On attend un TABLEAU d'IDs
            'programmes.*' => 'exists:programmes,id',
        ]);

        // On crée l'exercice
        $exercice = Exercice::create([
            'nom' => $request->nom,
            'description' => $request->description,
        ]);

        // On lie l'exercice aux programmes dans la table pivot 
        $exercice->programmes()->attach($request->programmes);

        return response()->json($exercice, 201);
    }

    /**
    * Supprimer un exercice 
    */
    public function destroy($id)
    {
        $exercice = Exercice::findOrFail($id);
        $exercice->delete();

        return response()->json(null, 204);
    }


}