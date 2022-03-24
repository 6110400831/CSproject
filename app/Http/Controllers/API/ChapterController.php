<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Challenge;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function createChapter(Request $request)
    {
        $chapter = Chapter::create([
            'name'            => $request->name,
            'description'     => $request->description,
            'challenge_order' => $request->challenge_order
        ]);
        
        return response()->json([
            "message" => "Chapter " . $request->name . " successfully created."
        ]);
    }
    
    public function updateChapter(Request $request)
    {
        $chapter = Chapter::updateOrCreate(
            [
                'id'          => $request->id
            ],
            [
                'name'        => $request->name,
                'description' => $request->description
            ]
        );

        return response()->json([
            "message" => "Chapter " . $request->name . " successfully updated."
        ]);
    }

    public function getAllChapter()
    {
        return Chapter::all();
    }

    public function getChapter(Request $request)
    {
        return Chapter::findOrFail($request->id);
    }

    public function getChapterChallenges(Request $request)
    {
        return Chapter::findOrFail($request->id)->challenges;
    }
    
    public function deleteChapter(Request $request)
    {
        $chapter = Chapter::findOrFail($request->id);
        if ($chapter->exists()) {
            foreach($chapter->challenges as $challenge) {
                $challenge->image->delete();
                $challenge->delete();
            }
            $chapter->delete();
            return response()->json([
                "message" => "Chapter " . $request->id . " successfully deleted."
            ]);
        }

        return response()->json([
            "message" => "Chapter " . $request->id . " not found."
        ]);
    }
    
    public function getDeletedChapters()
    {
        return Chapter::onlyTrashed()->get();
    }
    
    public function getDeletedChapter(Request $request)
    {
        return Chapter::withTrashed()->find($request->id)->get();
    }
    
    public function deletedChaptersRestore()
    {
        return Chapter::withTrashed()->restore();
    }
    
    public function deletedChapterRestore(Request $request)
    {
        return Chapter::withTrashed()->find($request->id)->restore();
    }
    
    public function permanentDeleteChapters()
    {
        return Chapter::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteChapter(Request $request)
    {
        return Chapter::withTrashed()->find($request->id)->forceDelete();
    }
}