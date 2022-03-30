<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Challenge extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = ['id', 'name', 'description', 'hint', 'image', 'chapter_id'];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function getImage()
    {
        return asset($this->image);
    }
}
