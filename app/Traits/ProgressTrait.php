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
            $userProgress = $user->progress;
            $new_finished = $this->updateFinished($userProgress->finished, $challenge_id);
            $userProgress->update(['finished' => $new_finished]);
        }

        return $new_finished;
    }
}