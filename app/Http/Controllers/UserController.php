<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserController extends Controller
{
    public function test()
    {
        return Inertia::render('Test', [
            'test_message' => 'Test Inertia Demo',
        ]);
    }
}
