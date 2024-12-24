<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\Validations\Auth\LoginValidation;

class LoginRequest extends Request
{
    public $validationClass = LoginValidation::class;
}
