<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $fillable = ['nom', 'description'];

    public function programmes()
    {
        return $this->belongsToMany(Programme::class);
    }
}
