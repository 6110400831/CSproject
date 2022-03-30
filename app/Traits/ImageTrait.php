<?php

namespace App\Traits;

trait ImageTrait {

    public function uploads($image, $name, $type)
    {
        if( $image ) {
            
            $image_type = $image->getClientOriginalExtension();
            $image_name = $name.'.'.$image_type;
            $image_path = $image->storeAs($type.$name, $image_name, 'public');
            $image_size = $this->imageSize($image);

            return $image = [
                'name' => $image_name,
                'type' => $image_type,
                'path' => $image_path,
                'size' => $image_size
            ];
        }
    }
    
    public function compareImage($storageImageName, $storageImagePath, $requestImage)
    {
        $path = storage_path().'/app/public/'.$storageImagePath;
        
        $storageImage = file_get_contents($path);
        $requestImage = file_get_contents($requestImage);
        $storageImage_base64 = base64_encode($storageImage);
        $requestImage_base64 = base64_encode($requestImage);

        return $storageImage_base64 == $requestImage_base64;
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