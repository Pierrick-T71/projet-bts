<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    protected $fillable = ['nom'];

    public function exercices()
    {
        return $this->belongsToMany(Exercice::class);
    }
}