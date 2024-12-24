<?php

namespace App\GraphQL\Validators;

use App\Validations\Validation;
use Nuwave\Lighthouse\Validation\Validator;

class BaseValidator extends Validator
{
    private Validation $validation;

    /**
     * Return the validation rules.
     *
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return $this->validation->rules();
    }

    public function setValidationClass(string $validationClass)
    {
        $this->validation = new $validationClass($this->args->toArray());
    }
}
