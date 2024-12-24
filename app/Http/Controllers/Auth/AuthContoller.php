<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Events\UserCreated;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;

class AuthContoller extends Controller
{
    public function loginForm(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::where('email', $request->email)->first();

            Auth::login($user);

            return redirect()->route('home');
        }

        return back()->withErrors(['authentication' => 'Invalid Credentails']);
    }

    public function signupForm(): Response
    {
        return Inertia::render('Auth/Signup');
    }

    public function signup(SignupRequest $request)
    {
        $user = new User();

        $user->forceFill($request->except(['password_confirmation', '_token']))->save();

        UserCreated::dispatch($user);

        return redirect()->route('login');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
