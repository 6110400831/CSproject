<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chapter extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = ['id', 'name', 'description'];

    public function challenges()
    {
        return $this->hasMany(Challenge::class);
    }
}
