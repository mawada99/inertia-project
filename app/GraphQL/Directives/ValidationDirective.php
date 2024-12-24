<?php

namespace App\GraphQL\Directives;

use App\Validations\Validation;
use Illuminate\Container\Container;
use App\GraphQL\Validators\BaseValidator;
use Nuwave\Lighthouse\Validation\Validator;
use Nuwave\Lighthouse\Execution\Arguments\ArgumentSet;
use Nuwave\Lighthouse\Validation\ValidatorDirective as BaseValidatorDirective;

class ValidationDirective extends BaseValidatorDirective
{
    protected function validator(): Validator
    {
        if (! isset($this->validator)) {
            // We precomputed and validated the full class name at schema build time
            $validatorClass = $this->directiveArgValue('class', str_replace('Input', 'Validation', $this->nodeName()));
            $validator = Container::getInstance()->make(BaseValidator::class);
            assert($this->argumentValue instanceof ArgumentSet, 'this directive can only be defined on a field or input');
            $validator->setArgs($this->argumentValue);
            $validator->setValidationClass($validatorClass);

            return $this->validator = $validator;
        }

        return $this->validator;
    }

    /** @return class-string<\Nuwave\Lighthouse\Validation\Validator> */
    protected function namespaceValidatorClass(string $classCandidate): string
    {
        $validatorClassName = $this->namespaceClassName(
            $classCandidate,
            (array) config('lighthouse.namespaces.validators'),
            static fn(string $classCandidate): bool => is_subclass_of($classCandidate, Validation::class),
        );
        assert(is_subclass_of($validatorClassName, Validation::class));

        return $validatorClassName;
    }
}
