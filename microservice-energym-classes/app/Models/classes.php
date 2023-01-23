<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class classes extends Model
{
    use HasFactory;

    protected $table = 'classes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'classTitle',
        'classType',
        'classRoom',
        'classStartDateTime',
        'classEndDateTime',
        'classDuration',
        'price',
        'purpose',
        'description',
        'slots'
    ];
}
