<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOrdered($query)
    {
        $query->orderBy('id');
    }
}
