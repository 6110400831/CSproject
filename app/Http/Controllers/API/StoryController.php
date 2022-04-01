<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoryCollection;
use App\Http\Resources\LockCollection;
use App\Http\Resources\StoryResource;
use App\Models\Story;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{
    use ImageTrait;

    public function createStory(Request $request)
    {
        $name = $request->name;
        $image = $request->image;
        $category = 'stories';
        $requestImage = $this->cutBase64($image);
        $imageName = $name.'.'.$this->getType($image);
        $path = $this->getPath($category, $name, $imageName);

        $story = Story::create([
            'name'        => $request->name,
            'description' => $request->description,
            'condition'   => $request->condition,
            'image'       => $path
        ]);

        if (!$story) {
            return response()->json([
                "success" => false,
                "data"    => $story,
                "message" => "Story create failed."
            ]);
        }

        Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($requestImage));
        return response()->json([
            "success" => true,
            "data"    => $story,
            "message" => "Story create succesfully."
        ]);
    }
    
    public function updateStory(Request $request)
    {
        $name = $request->name;
        $image = $request->image;
        $category = 'stories';
        $requestImage = $this->cutBase64($image);
        $imageName = $name.'.'.$this->getType($image);
        $path = $this->getPath($category, $name, $imageName);
        
        $story = Story::findOrFail($request['id']);
        foreach($request->all() as $key=>$value){
            if ($key == 'image') {
                $story->update([$key => $path]);
            }
            else {
                $story->update([$key => $value]);
            }
        }

        if (!$story) {
            return response()->json([
                "success" => false,
                "data"    => $story,
                "message" => "Story create failed."
            ]);
        }

        Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($requestImage));
        return response()->json([
            "success" => true,
            "data"    => $story,
            "message" => "Story create succesfully."
        ]);
    }

    public function getAllStory()
    {
        return new StoryCollection(Story::all());
    }
    
    public function getStory(Request $request)
    {
        return new StoryResource(Story::findOrFail($request->id));
    }
    
    public function getStoryWithCondition(Request $request)
    {
        $story = Story::where('condition', '<=', $request->clear_count)->get();
        $story_collection = new StoryCollection($story);

        if (!$story) {
            return response()->json([
                "success" => false,
                "data"    => $story_collection,
                "message" => "Story not found."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $story_collection,
            "message" => "Story has been deliver."
        ]);
    }

    public function getStoryWithoutCondition(Request $request)
    {
        $story = Story::where('condition', '>', $request->clear_count)->get();
        $lock_collection = new LockCollection($story);

        if (!$story) {
            return response()->json([
                "success" => false,
                "data"    => $lock_collection,
                "message" => "Story lock not found."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $lock_collection,
            "message" => "Story lock has been deliver."
        ]);
    }

    public function getStoryImage(Request $request)
    {
        return Story::findOrFail($request->id)->getImage();
    }
    
    public function deleteStory(Request $request)
    {
        $story = Story::findOrFail($request->id)->delete();
        if ($story->exists()) {
            $story->delete();
            return response()->json([
                "status" => true,
                "message" => "Story successfully deleted."
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Story not found."
        ]);
    }
    
    public function getDeletedStories()
    {
        return Story::onlyTrashed()->get();
    }
    
    public function getDeletedStory(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->get();
    }
    
    public function deletedStoriesRestore()
    {
        return Story::withTrashed()->restore();
    }
    
    public function deletedStoryRestore(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->restore();
    }
    
    public function permanentDeleteStories()
    {
        return Story::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteStory(Request $request)
    {
        return Story::withTrashed()->findOrFail($request->id)->forceDelete();
    }
}