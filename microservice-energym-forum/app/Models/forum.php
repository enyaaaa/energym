<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class forum extends Model
{
    use HasFactory;

    protected $table = 'forums';
    protected $primaryKey = 'id';
    protected $fillable = [
        'review',
        'commentImage',
        'rating',
    ];
}
