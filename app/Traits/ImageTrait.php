<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait {

    public function test($image, $name, $category)
    {
        $img = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        $type = explode(';', $image)[0];
        $type = explode('/', $type)[1];
        $imageName = $name.'.'.$type;
        Storage::disk('public')->put($category.'/'.$name.'/'.$imageName, base64_decode($img));
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
    
    public function compareImage($storageImageName, $storageImagePath, $requestImage)
    {
        $storageImage = file_get_contents($storageImagePath);
        $requestImage = file_get_contents($requestImage);
        $storageImage_base64 = base64_encode($storageImage);
        $requestImage_base64 = base64_encode($requestImage);

        return $storageImage_base64 == $requestImage_base64;
    }

    public function imageType($image)
    {
        $img = preg_replace('/^data:image\/\w+;base64,/', '', $image);
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