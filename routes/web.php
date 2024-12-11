<?php

use App\Http\Controllers\Auth\AuthContoller;
use App\Http\Controllers\HomeContoller;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => 'guest'], function () {
    Route::get('/login', [AuthContoller::class, 'loginForm'])->name('login');

    Route::post('/login', [AuthContoller::class, 'login']);

    Route::get('/signup', [AuthContoller::class, 'signupForm']);

    Route::post('/signup', [AuthContoller::class, 'signup']);
});

Route::get('/home', [HomeContoller::class, 'index'])->middleware('auth')->name('home');
