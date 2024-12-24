<?php

namespace App\Validations\Auth;

use App\Validations\Validation;

class SignupValidation extends Validation
{
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email',
            ],
            'password' => [
                'required',
                'confirmed',
            ]
        ];
    }
}
