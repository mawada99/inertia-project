<?php

namespace App\Validations;

use App\Models\Shipment;
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
