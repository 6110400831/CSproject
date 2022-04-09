<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateCurrentUser(Request $request)
    {
        $user = $request->user();
        foreach($request->all() as $key=>$value){
            $user->update([$key=>$value]);
        }

        if (!$user) {
            return response()->json([
                "success" => false,
                "data"    => $user,
                "message" => "User update failed."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $user,
            "message" => "User successfully updated."
        ]);
    }

    public function updateUser(Request $request)
    {
        $user = User::findOrFail($request->id);
        foreach($request->all() as $key=>$value){
            $user->update([$key=>$value]);
        }

        if (!$user) {
            return response()->json([
                "success" => false,
                "data"    => $user,
                "message" => "User update failed."
            ]);
        }

        return response()->json([
            "success" => true,
            "data"    => $user,
            "message" => "User successfully updated."
        ]);
    }

    public function getCurrentUser(Request $request)
    {
        return $request->user();
    }

    public function getCurrentUserProgress(Request $request)
    {
        return $request->user()->progress;
    }

    public function getAllUser()
    {
        return User::all();
    }

    public function getUser(Request $request)
    {
        return User::findOrFail($request->id);
    }

    public function getUserProgress(Request $request)
    {
        return User::findOrFail($request->id)->progress;
    }

    public function deleteCurrentUser(Request $request)
    {
        $user = $request->user();
        
        if ($user->exists()) {
            $user->progress->delete();
            $user->delete();
            return response()->json([
                "success" => true,
                "message" => "User successfully deleted."
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "User not found."
        ]);
    }

    public function deleteUser(Request $request)
    {
        $user = User::findOrFail($request->id);
        
        if ($user->exists()) {
            $user->progress->delete();
            $user->delete();
            return response()->json([
                "success" => true,
                "message" => "User successfully deleted."
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "User not found."
        ]);
    }
    
    public function getDeletedUsers()
    {
        return User::onlyTrashed()->get();
    }
    
    public function getDeletedUser(Request $request)
    {
        return User::withTrashed()->findOrFail($request->id)->get();
    }
    
    public function deletedUsersRestore()
    {
        return User::withTrashed()->restore();
    }
    
    public function deletedUserRestore(Request $request)
    {
        return User::withTrashed()->findOrFail($request->id)->restore();
    }
    
    public function permanentDeleteUsers()
    {
        return User::withTrashed()->forceDelete();
    }
    
    public function permanentDeleteUser(Request $request)
    {
        return User::withTrashed()->findOrFail($request->id)->forceDelete();
    }
}
