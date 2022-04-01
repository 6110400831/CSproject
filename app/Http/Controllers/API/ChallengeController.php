<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChallengeCollection;
use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChallengeController extends Controller
{
    use ImageTrait;

    public function test(Request $request)
    {
        $json_data = json_decode($request->json);
        $name = $json_data->name;
        $image = $request->image;
        // $img = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        // $type = explode(';', $image)[0];
        // $type = explode('/', $type)[1];
        // $imageName = $name.'.'.$type;
        // Storage::disk('public')->put('challenge/'.$name.'/'.$imageName, base64_decode($img));
        // $path = 'storage/challenge/'.$name.'/'.$imageName;
        // $path = $this->test($image, $name, 'challenges/');
        $path = $this->test($image, $name, 'challenges/');
        dd($path);

        $challenge = Challenge::create([
            'name'        => $json_data->name,
            'description' => $json_data->description,
            'hint'        => $json_data->hint,
            'image'       => $path,
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
    
    public function createChallenge(Request $request)
    {
        $json_data = json_decode($request->json);
        $fileData = $this->uploads($request->file('image'), $json_data->name, 'challenges/');

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
        $json_data = json_decode($request->json, true);
        $fileData = $this->uploads($request->file('image'), $json_data['name'], 'challenges/');
        $image_path = array('image' => $fileData['path']);
        $json_data = array_merge($json_data, $image_path);

        $challenge = Challenge::findOrFail($json_data['id']);
        foreach($json_data as $key=>$value){
            $challenge->update([$key=>$value]);
        }

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
            "message" => "Challenge successfully updated."
        ]);
    }

    public function imageCompare(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);

        $storageImageName = $challenge->name;
        $storageImagePath = $challenge->image;
        $requestImage = $request->file('image');
        $compareResult = $this->compareImage($storageImageName, $storageImagePath, $requestImage);

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
        return new ChallengeCollection(Challenge::all());
    }
    
    public function getChallenge(Request $request)
    {
        return new ChallengeResource(Challenge::findOrFail($request->id));
    }

    public function getChallengeImage(Request $request)
    {
        return Challenge::findOrFail($request->id)->getImage();
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