<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthContoller extends Controller
{
    public function loginForm(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        dd($request->all());
    }

    public function signupForm(): Response
    {
        return Inertia::render('Auth/Signup');
    }

    public function signup(SignupRequest $request)
    {
        dd($request->all());
    }
}
