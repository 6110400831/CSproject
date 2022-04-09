<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ChapterController;
use App\Http\Controllers\API\ChallengeController;
use App\Http\Controllers\API\StoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum', 'user-access:admin']], function () {

    Route::controller(UserController::class)->group(function () {
        Route::get('/getAllUser','getAllUser');
        Route::get('/getUser','getUser');
        Route::get('/getUserProgress', 'getUserProgress');
        Route::post('/updateUser','updateUser');
        Route::post('/deleteUser','deleteUser');
        Route::get('/getDeletedUsers','getDeletedUsers');
        Route::post('/getDeletedUser','getDeletedUser');
        Route::post('/deletedUsersRestore','deletedUsersRestore');
        Route::post('/deletedUserRestore','deletedUserRestore');
        Route::delete('/permanentDeleteUsers','permanentDeleteUsers');
        Route::delete('/permanentDeleteUser','permanentDeleteUser');
    });

    Route::controller(ChapterController::class)->group(function () {
        Route::post('/createChapter','createChapter');
        Route::post('/updateChapter','updateChapter');
        Route::delete('/deleteChapter','deleteChapter');
        Route::get('/getDeletedChapters','getDeletedChapters');
        Route::get('/getDeletedChapter','getDeletedChapter');
        Route::post('/deletedChaptersRestore','deletedChaptersRestore');
        Route::post('/deletedChapterRestore','deletedChapterRestore');
        Route::delete('/permanentDeleteChapters','permanentDeleteChapters');
        Route::delete('/permanentDeleteChapter','permanentDeleteChapter');
    });

    Route::controller(ChallengeController::class)->group(function () {
        Route::post('/createChallenge','createChallenge');
        Route::post('/updateChallenge','updateChallenge');
        Route::delete('/deleteChallenge','deleteChallenge');
        Route::get('/getDeletedChallenges','getDeletedChallenges');
        Route::get('/getDeletedChallenge','getDeletedChallenge');
        Route::post('/deletedChallengesRestore','deletedChallengesRestore');
        Route::post('/deletedChallengeRestore','deletedChallengeRestore');
        Route::delete('/permanentDeleteChallenges','permanentDeleteChallenges');
        Route::delete('/permanentDeleteChallenge','permanentDeleteChallenge');
    });

    Route::controller(StoryController::class)->group(function () {
        Route::post('/createStory','createStory');
        Route::post('/updateStory','updateStory');
        Route::delete('/deleteStory','deleteStory');
        Route::get('/getDeletedStories','getDeletedStories');
        Route::get('/getDeletedStory','getDeletedStory');
        Route::post('/deletedStoriesRestore','deletedStoriesRestore');
        Route::post('/deletedStoryRestore','deletedStoryRestore');
        Route::delete('/permanentDeleteStories','permanentDeleteStories');
        Route::delete('/permanentDeleteStory','permanentDeleteStory');
    });
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('/getCurrentUser','getCurrentUser');
        Route::get('/getCurrentUserProgress','getCurrentUserProgress');
        Route::post('/updateCurrentUser','updateCurrentUser');
        Route::post('/deleteCurrentUser','deleteCurrentUser');
    });
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register','register');
    Route::post('/login','login');
});

Route::controller(ChapterController::class)->group(function () {
    Route::get('/getAllChapter','getAllChapter');
    Route::get('/getChapter','getChapter');
    Route::get('/getChapterChallenges','getChapterChallenges');
});

Route::controller(ChallengeController::class)->group(function () {
    Route::get('/getAllChallenge','getAllChallenge');
    Route::get('/getChallenge','getChallenge');
    Route::get('/getChallengeImage','getChallengeImage');
    Route::post('/imageCompare','imageCompare');
});

Route::controller(StoryController::class)->group(function () {
    Route::get('/getAllStory','getAllStory');
    Route::get('/getStory','getStory');
    Route::get('/getStoryImage','getStoryImage');
    Route::post('/getStoryWithCondition','getStoryWithCondition');
    Route::post('/getStoryWithoutCondition','getStoryWithoutCondition');
});