<?php

namespace App\Validations\Shipment;

use App\Models\Shipment;
use App\Validations\Validation;
use Illuminate\Validation\Rule;

class ShipmentValidation extends Validation
{
    public function rules(): array
    {
        return [
            'id' => [
                Rule::exists(Shipment::class, 'id'),
            ],
            'price' => [
                'required',
                'numeric',
                'min:1',
            ],
            'type' => [
                'required',
                'string',
            ],
            'payment_type' => [
                'required',
                'string',
            ]
        ];
    }
}
