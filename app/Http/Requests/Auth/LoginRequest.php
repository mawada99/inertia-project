<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Validations\Auth\LoginValidation;

class LoginRequest extends Request
{
    public $validationClass = LoginValidation::class;
}
