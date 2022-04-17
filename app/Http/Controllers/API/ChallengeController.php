<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChallengeCollection;
use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;
use App\Traits\ImageTrait;
use App\Traits\ProgressTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChallengeController extends Controller
{
    use ImageTrait, ProgressTrait;

    public function createChallenge(Request $request)
    {
        $name = $request->name;
        $image = $request->image;
        $category = 'challenges';
        $requestImage = $this->cutBase64($image);
        $imageName = $name.'.'.$this->getType($image);
        $path = $this->getPath($category, $name, $imageName);
        
        $challenge = Challenge::create([
            'name'        => $request->name,
            'description' => $request->description,
            'hint'        => $request->hint,
            'image'       => $path,
            'chapter_id'  => $request->chapter_id
        ]);

        if (!$challenge) {
            return response()->json([
                "success" => false,
                "data"    => $challenge,
                "message" => "Challenge create failed."
            ]);
        }
        
        Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($requestImage));
        return response()->json([
            "success" => true,
            "data"    => $challenge,
            "message" => "Challenge create succesfully."
        ]);
    }
    
    public function updateChallenge(Request $request)
    {
        $challenge = Challenge::findOrFail($request->id);
        if ($challenge != null) {
            foreach($request->all() as $key=>$value){
                if ($key == 'image') {
                    $name = $request->name;
                    $image = $request->image;
                    $category = 'challenges';
                    $requestImage = $this->cutBase64($image);
                    $imageName = $name.'.'.$this->getType($image);
                    $path = $this->getPath($category, $name, $imageName);
                    $challenge->update([$key => $path]);
                    Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($requestImage));
                }
                else {
                    $challenge->update([$key => $value]);
                }
            }
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
        $storageImagePath = $challenge->image;
        $requestImage = $this->cutBase64($request->image);
        $compareResult = $this->compareImage($storageImagePath, $requestImage);
        
        $data = new \stdClass;
        $data->result = $compareResult;
        $data->finished = $request->finished;

        if (!$compareResult) {
            return response()->json([
                "status" => false,
                "data"    => $data,
                "message" => "False answer."
            ]);
        }

        $data->finished = $this->updateProgress($request->user('sanctum'), $request->finished, $request->id);
        
        return response()->json([
            "status" => true,
            "data"    => $data,
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