<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait {

    public function uploads2($category, $name, $imageName, $image)
    {
        Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($image));
        $path = 'storage/'.$category.'/'.$name.'/'.$imageName;
        return $path;
    }

    public function uploads($image, $name, $type)
    {
        if( $image ) {
            
            $image_type = $image->getClientOriginalExtension();
            $image_name = $name.'.'.$image_type;
            $image_path = 'storage/'.$image->storeAs($type.$name, $image_name, 'public');
            $image_size = $this->imageSize($image);

            return $image = [
                'name' => $image_name,
                'type' => $image_type,
                'path' => $image_path,
                'size' => $image_size
            ];
        }
    }
    
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