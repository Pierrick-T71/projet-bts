<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $table = 'exercices';
    protected $fillable = ['nom', 'description'];
}
