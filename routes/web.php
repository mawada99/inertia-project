<?php

use App\Http\Controllers\Auth\AuthContoller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('test', [UserController::class, 'test']);

Route::get('/login', [AuthContoller::class, 'loginForm'])->middleware('guest');

Route::post('/login', [AuthContoller::class, 'login'])->middleware('guest');

Route::get('/signup', [AuthContoller::class, 'signupForm']);

Route::post('/signup', [AuthContoller::class, 'signup']);
