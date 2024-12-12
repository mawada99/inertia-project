<?php

namespace App\GraphQL\Directives;

// use Illuminate\Container\Container;
// use Nuwave\Lighthouse\Validation\Validator;
// use GraphQL\Language\AST\TypeDefinitionNode;
// use Nuwave\Lighthouse\Schema\AST\DocumentAST;
// use Nuwave\Lighthouse\Exceptions\DefinitionException;
// use Nuwave\Lighthouse\Execution\Arguments\ArgumentSet;
// use GraphQL\Language\AST\InputObjectTypeDefinitionNode;
// use Nuwave\Lighthouse\Validation\ValidatorDirective as BaseValidatorDirective;

// class ValidatorDirective extends BaseValidatorDirective
// {
//     protected function validator(): Validator
//     {
//         if (! isset($this->validator)) {
//             $validatorClass = $this->directiveArgValue('class');

//             $validator = Container::getInstance()->make($validatorClass);
//             assert($this->argumentValue instanceof ArgumentSet, 'this directive can only be defined on a field or input');
//             $validator->setArgs($this->argumentValue);

//             return $this->validator = $validator;
//         }

//         return $this->validator;
//     }

//     public function manipulateTypeDefinition(DocumentAST &$documentAST, TypeDefinitionNode &$typeDefinition): void
//     {
//         if (! $typeDefinition instanceof InputObjectTypeDefinitionNode) {
//             throw new DefinitionException("Can not use @validator on non input type {$typeDefinition->getName()->value}.");
//         }

//         $this->setFullClassnameOnDirective(
//             $typeDefinition,
//             $this->directiveArgValue('class', str_replace('Input', '', $typeDefinition->name->value) . "Request"),
//         );
//     }
// }
