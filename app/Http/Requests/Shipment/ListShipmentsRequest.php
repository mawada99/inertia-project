<?php

namespace App\Http\Requests\Shipment;

use App\Http\Requests\Request;
use App\Validations\Shipment\ListShipmentsValidation;

class ListShipmentsRequest extends Request
{
    public $validationClass = ListShipmentsValidation::class;
}
