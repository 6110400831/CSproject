<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Traits\ImageTrait;
use App\Traits\ImageCompareTrait;
use App\Models\Challenge;
use App\Models\Image;
use App\Models\Story;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    use ImageTrait, ImageCompareTrait;

    public function createChallenge(Request $request)
    {
        $json_data = json_decode($request->json);
        $fileData = $this->uploads($request->file('image'), $json_data->name);

        $challenge = Challenge::create([
            'name'        => $json_data->name,
            'description' => $json_data->description,
            'hint'        => $json_data->hint,
            'chapter_id'  => $json_data->chapter_id
        ]);

        $image = Image::create([
            'name'         => $fileData['name'],
            'type'         => $fileData['type'],
            'path'         => $fileData['path'],
            'size'         => $fileData['size'],
            'challenge_id' => $challenge->id
        ]);

        return response()->json([
            "success" => true,
            "message" => "Challenge create succesfully."
        ]);
    }
    
    public function updateChallenge(Request $request)
    {
        $json_data = json_decode($request->json);
        $fileData = $this->uploads($request->file('image'), $json_data->name);

        $chapter = Challenge::updateOrCreate(
            [
                'id' => $request->id
            ],
            [
                'name'        => $request->name,
                'description' => $request->description,
                'hint'        => $request->hint,
                'chapter_id'  => $request->chapter_id
            ]
        );

        $image = Image::updateOrCreate(
            [
                'id' => $request->id
            ],
            [
                'name'         => $fileData['name'],
                'type'         => $fileData['type'],
                'path'         => $fileData['path'],
                'size'         => $fileData['size'],
                'challenge_id' => $challenge->id
            ]
        );

        return response()->json([
            "message" => "Chapter " . $request->id . " successfully updated."
        ]);
    }

    public function imageCompare(Request $request)
    {
        $challenge = Challenge::findOrFail($request->challenge_id);

        $storageImageName = $challenge->image->name;
        $storageImagePath = $challenge->image->path;
        $requestImage   = $request->file('image');
        $compareResult  = $this->compareImage($storageImageName, $storageImagePath, $requestImage);

        if ($compareResult) {
            return response()->json([
                "status" => true,
                "message" => "Correct answer."
            ]);
        }
        return response()->json([
            "status" => false,
            "message" => "False answer."
        ]);
    }

    public function getAllChallenge()
    {
        return Challenge::all();
    }
    
    public function getChallenge(Request $request)
    {
        return Challenge::findOrFail($request->id);
    }
    
    public function deleteChallenge(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);
        if ($challenge->exists()) {
            $challenge->image->delete();
            $challenge->delete();
            return response()->json([
                "message" => "Challenge " . $request->id . " successfully deleted."
            ]);
        }

        return response()->json([
            "message" => "Challenge  " . $request->id . " not found."
        ]);
    }
    
    public function getDeletedChallenges()
    {
        return Challenge::onlyTrashed()->get();
    }
    
    public function getDeletedChallenge(Request $request)
    {
        return Challenge::withTrashed()->findOrFail($request->id)->get();
    }
    
    public function deletedChallengesRestore()
    {
        return Challenge::withTrashed()->restore();
    }
    
    public function deletedChallengeRestore(Request $request)
    {
        return Challenge::withTrashed()->findOrFail($request->id)->restore();
    }
    
    public function permanentDeleteChallenges()
    {
        return Challenge::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteChallenge(Request $request)
    {
        return Challenge::withTrashed()->findOrFail($request->id)->forceDelete();
    }

    public function testGetChallengeImage(Request $request)
    {
        $image = Image::findOrFail($request->id);
        return asset($image->path);
    }

    public function testPostChallenge(Request $request)
    {
        $fileData = $this->uploads($request->file('image'), $request->name);

        $image = Image::create([
            'name'         => $fileData['name'],
            'type'         => $fileData['type'],
            'path'         => $fileData['path'],
            'size'         => $fileData['size']
        ]);

        return $image;
    }
}