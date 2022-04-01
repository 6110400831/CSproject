<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Story extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = ['id', 'name', 'description', 'condition', 'image'];

    public function getImage()
    {
        return asset($this->image);
    }
}
