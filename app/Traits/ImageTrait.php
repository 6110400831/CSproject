<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait {
    
    public function compareImage($storageImagePath, $requestImage)
    {
        $storageImage = file_get_contents($storageImagePath);
        $storageImage_base64 = base64_encode($storageImage);

        return $storageImage_base64 == $requestImage;
    }
    
    public function getPath($category, $name, $imageName)
    {
        $path = 'storage/'.$category.'/'.$name.'/'.$imageName;
        return $path;
    }
    
    public function cutBase64($image)
    {
        $base64_image = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        return $base64_image;
    }
    
    public function getType($image)
    {
        $type = explode(';', $image)[0];
        $type = explode('/', $type)[1];
        return $type;
    }

    public function imageSize($image, $precision = 2)
    {
        $size = $image->getSize();

        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');
            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        }

        return $size;
    }
}