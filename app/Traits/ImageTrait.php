<?php

namespace App\Traits;

trait ImageTrait {

    public function getImage($path)
    {
        $storagePath = storage_path().'/app/public/'.$path;
        return file_get_contents($storagePath);
    }

    public function uploads($image, $name)
    {
        if( $image ) {
            
            $image_type = $image->getClientOriginalExtension();
            $image_name = $name.'.'.$image_type;
            $image_path = $image->storeAs('challenges/'.$name, $image_name, 'public');
            $image_size = $this->imageSize($image);

            return $image = [
                'name' => $image_name,
                'type' => $image_type,
                'path' => $image_path,
                'size' => $image_size
            ];
        }
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