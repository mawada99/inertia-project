<?php

declare(strict_types=1);

namespace App\GraphQL\Directives;

use Illuminate\Container\Container;
use Nuwave\Lighthouse\Validation\Validator;
use Nuwave\Lighthouse\Execution\Arguments\ArgumentSet;
use Nuwave\Lighthouse\Validation\ValidatorDirective as BaseValidatorDirective;

class ValidatorDirective extends BaseValidatorDirective
{
    protected function validator(): Validator
    {
        if (! isset($this->validator)) {
            $validatorClass = $this->directiveArgValue('class');

            $validator = Container::getInstance()->make($validatorClass);
            assert($this->argumentValue instanceof ArgumentSet, 'this directive can only be defined on a field or input');
            $validator->setArgs($this->argumentValue);

            return $this->validator = $validator;
        }

        return $this->validator;
    }
}
