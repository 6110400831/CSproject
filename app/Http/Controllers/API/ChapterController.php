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
            'description'     => $request->description
        ]);

        if (!$chapter) {
            return response()->json([
                "success" => false,
                "data"    => $chapter,
                "message" => "Chapter create failed."
            ]);
        }
        
        return response()->json([
            "success" => true,
            "data"    => $chapter,
            "message" => "Chapter successfully created."
        ]);
    }
    
    public function updateChapter(Request $request)
    {
        $chapter = Chapter::findOrFail($request->id);
        foreach($request->all() as $key=>$value){
            $chapter->update([$key=>$value]);
        }

        if (!$chapter) {
            return response()->json([
                "success" => false,
                "data"    => $chapter,
                "message" => "Chapter update failed."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $chapter,
            "message" => "Chapter successfully updated."
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
                $challenge->delete();
            }
            $chapter->delete();
            return response()->json([
                "success" => true,
                "message" => "Chapter successfully deleted."
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "Chapter not found."
        ]);
    }
    
    public function getDeletedChapters()
    {
        return Chapter::onlyTrashed()->get();
    }
    
    public function getDeletedChapter(Request $request)
    {
        return Chapter::withTrashed()->findOrFail($request->id)->get();
    }
    
    public function deletedChaptersRestore()
    {
        return Chapter::withTrashed()->restore();
    }
    
    public function deletedChapterRestore(Request $request)
    {
        return Chapter::withTrashed()->findOrFail($request->id)->restore();
    }
    
    public function permanentDeleteChapters()
    {
        return Chapter::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteChapter(Request $request)
    {
        return Chapter::withTrashed()->findOrFail($request->id)->forceDelete();
    }
}