<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExerciceController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/exercices', [ExerciceController::class, 'index']);
    Route::post('/exercices', [ExerciceController::class, 'store']);
    Route::delete('/exercices/{id}', [ExerciceController::class, 'destroy']);
});