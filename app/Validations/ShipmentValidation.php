<?php

namespace App\Validations;

class ShipmentValidation extends Validation
{
    public function rules(): array
    {
        return [
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
