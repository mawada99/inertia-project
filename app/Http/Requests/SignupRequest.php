<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        die(json_encode($this->request->all()));
        return [
            'name'                  => 'required|string|min:5',
            'email'                 => 'required|email|unique:users,name',
            'password'              => 'required|confirmed|alpha_num|min:8',
            'password_confirmation' => 'required|alpha_num|min:8',
        ];
    }
}
