<?php

namespace App\Http\Requests\Shipment;

use App\Http\Requests\Request;
use App\Validations\Shipment\ShipmentValidation;

class ShipmentRequest extends Request
{
    public $validationClass = ShipmentValidation::class;
}
