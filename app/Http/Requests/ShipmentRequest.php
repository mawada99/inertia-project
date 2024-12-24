<?php

namespace App\Http\Requests;

use App\Validations\ShipmentValidation;

class ShipmentRequest extends Request
{
    public $validationClass = ShipmentValidation::class;
}
