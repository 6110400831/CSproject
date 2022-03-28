<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Challenge;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function createStory(Request $request)
    {
        $json_data = json_decode($request->json);
        $fileData = $this->uploads($request->file('image'), $json_data->name);

        $story = Story::create([
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

    public function getAllStory()
    {
        return Story::all();
    }
    
    public function getStory(Request $request)
    {
        return Story::findOrFail($request->id);
    }
    
    public function deleteStory(Request $request)
    {
        $story = Story::findOrFail($request->id);
        if ($story->exists()) {
            $story->delete();
            return response()->json([
                "message" => "Story " . $request->id . " successfully deleted."
            ]);
        }

        return response()->json([
            "message" => "Story  " . $request->id . " not found."
        ]);
    }
    
    public function getDeletedStorys()
    {
        return Story::onlyTrashed()->get();
    }
    
    public function getDeletedStory(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->get();
    }
    
    public function deletedStorysRestore()
    {
        return Story::withTrashed()->restore();
    }
    
    public function deletedStoryRestore(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->restore();
    }
    
    public function permanentDeleteStorys()
    {
        return Story::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteStory(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->forceDelete();
    }
}