<?php

namespace App\Validations;

abstract class Validation
{
    public function __construct(private array $args) {}

    protected function arg(string $name): mixed
    {
        return @$this->args[$name];
    }

    abstract function rules(): array;
}
