<?php

namespace App\Traits;

use App\Models\UserProgress;

trait ProgressTrait {

    public function updateFinished($old, $new)
    {
        array_push($old, $new);
        $new_arr = array_unique($old);
        sort($new_arr);
        return $new_arr;
    }

    public function updateProgress($user, $finished, $challenge_id)
    {
        $new_finished = $this->updateFinished($finished, $challenge_id);

        if ($user != null) {
            $userProgress = UserProgress::find($user['id']);
            if ($userProgress == null) {
                $userProgress = $this->createUserProgress($user, $finished);
            }
            
            $new_finished = $this->updateFinished($userProgress->finished, $challenge_id);
            $userProgress->update(['finished' => $new_finished]);
        }

        return $new_finished;
    }

    public function createUserProgress($user, $finished)
    {
        $userProgress = new UserProgress;
        $userProgress->id = $user['id'];
        $userProgress->name = $user['name'];
        $userProgress->email = $user['email'];
        $userProgress->finished = $finished;
        $userProgress->save();
        return $userProgress;
    }
}