<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProgress extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id',
        'name',
        'email',
        'finished'
    ];

    protected $casts = [
        'finished' => 'array',
    ];
}
