<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Traits\ImageTrait;
use App\Models\Challenge;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    //not done yet.
    use ImageTrait;

    public function createImage(Request $request)
    {
        $chapter = Image::create([
            'name'         => $request->name,
            'type'         => $request->type,
            'path'         => $request->path,
            'size'         => $request->size,
            'challenge_id' => $request->challenge_id
        ]);
        
        return response()->json([
            "message" => "Chapter " . $request->name . " successfully created."
        ]);
    }
    
    public function updateImage(Request $request)
    {
        $chapter = Image::updateOrCreate(
            [
                'id' => $request->id
            ],
            [
                'name'         => $request->name,
                'type'         => $request->type,
                'path'         => $request->path,
                'size'         => $request->size,
                'challenge_id' => $request->challenge_id
            ]
        );

        return response()->json([
            "message" => "Chapter " . $request->name . " successfully updated."
        ]);
    }
    
    public function getAllImage()
    {
        return Image::all();
    }
    
    public function getImage(Request $request)
    {
        return Image::findOrFail($request->id);
    }

    public function compare(Request $request)
    {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,svg|max:2048',
        ]);
        $name = $request->file('image')->getClientOriginalName();
        $path = storage_path().'/app/public/images/cat.png';
        
        $localImage = file_get_contents($path);
        $requestImage = file_get_contents($request->file('image'));
        $base64 = base64_encode($localImage);
        $test = base64_encode($requestImage);

        if ($base64 != $test) {
            return response()->json([
                "success" => true,
                "message" => "test Fail"
            ]);
        }
        return response()->json([
            "success" => true,
            "message" => "test Successfully"
        ]);
    }
}