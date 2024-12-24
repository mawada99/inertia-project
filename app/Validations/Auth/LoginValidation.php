<?php

namespace App\Validations\Auth;

use App\Validations\Validation;

class LoginValidation extends Validation
{
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
            ],
            'password' => [
                'required',
                'min:8',
            ]
        ];
    }
}
