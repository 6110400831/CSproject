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
            'image'       => $fileData['path'],
            'chapter_id'  => $json_data->chapter_id
        ]);

        if (!$challenge) {
            return response()->json([
                "success" => false,
                "data"    => $challenge,
                "message" => "Challenge create failed."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $challenge,
            "message" => "Challenge create succesfully."
        ]);
    }
    
    public function updateChallenge(Request $request)
    {
        $json_data = json_decode($request->json);
        $fileData = $this->uploads($request->file('image'), $json_data->name);

        $challenge = Challenge::updateOrCreate(
            [
                'id'          => $request->id
            ],
            [
                'name'        => $json_data->name,
                'description' => $json_data->description,
                'hint'        => $json_data->hint,
                'image'       => $fileData['path'],
                'chapter_id'  => $json_data->chapter_id
            ]
        );

        if (!$challenge) {
            return response()->json([
                "success" => false,
                "data"    => $challenge,
                "message" => "Challenge create failed."
            ]);
        }

        return response()->json([
            "message" => "Challenge successfully updated."
        ]);
    }

    public function imageCompare(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);

        $storageImageName = $challenge->name;
        $storageImagePath = $challenge->image;
        $requestImage   = $request->file('image');
        $compareResult  = $this->compareImage($storageImageName, $storageImagePath, $requestImage);

        if (!$compareResult) {
            return response()->json([
                "status" => false,
                "data"    => $compareResult,
                "message" => "False answer."
            ]);
        }
        return response()->json([
            "status" => true,
            "data"    => $compareResult,
            "message" => "Correct answer."
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

    public function getChallengeImage(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);
        return $challenge->getImage();
    }
    
    public function deleteChallenge(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);
        if ($challenge->exists()) {
            $challenge->delete();
            return response()->json([
                "status" => true,
                "message" => "Challenge successfully deleted."
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Challenge not found."
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
}