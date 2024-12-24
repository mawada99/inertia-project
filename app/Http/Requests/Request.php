<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Request extends FormRequest
{
    public $validationClass = null;

    public function rules(): array
    {
        $validationClass = $this->validationClass;
        $validation = new $validationClass($this->all());
        return $validation->rules();
    }
}
