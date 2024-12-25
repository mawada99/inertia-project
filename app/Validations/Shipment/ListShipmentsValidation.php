<?php

namespace App\Validations\Shipment;

use App\Validations\Validation;

class ListShipmentsValidation extends Validation
{
    public function rules(): array
    {
        return [
            'price' => [
                'nullable',
                'numeric',
                'min:1',
            ],
            'type' => [
                'nullable',
                'string',
            ],
            'payment_type' => [
                'nullable',
                'string',
            ]
        ];
    }
}
