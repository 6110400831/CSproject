<?php

namespace App\Traits;

trait ImageCompareTrait {

    public function compareImage($storageImageName, $storageImagePath, $requestImage)
    {
        $path = storage_path().'/app/public/'.$storageImagePath;
        
        $storageImage = file_get_contents($path);
        $requestImage = file_get_contents($requestImage);
        $storageImage_base64 = base64_encode($storageImage);
        $requestImage_base64 = base64_encode($requestImage);

        return $storageImage_base64 == $requestImage_base64;
    }
}