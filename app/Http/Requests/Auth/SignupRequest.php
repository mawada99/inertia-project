<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Validations\Auth\SignupValidation;

class SignupRequest extends Request {
    public $validationClass = SignupValidation::class;
}
