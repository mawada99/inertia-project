<?php

use App\Http\Controllers\Auth\AuthContoller;
use App\Http\Controllers\HomeContoller;
use App\Http\Controllers\ShipmentController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    dd(csrf_field());
    return view('welcome');
})->name('landing_page');

Route::group(['middleware' => 'guest'], function () {
    Route::get('/login', [AuthContoller::class, 'loginForm'])->name('login');

    Route::post('/login', [AuthContoller::class, 'login']);

    Route::get('/signup', [AuthContoller::class, 'signupForm']);

    Route::post('/signup', [AuthContoller::class, 'signup']);
});

Route::middleware(['auth', Admin::class])->group(function () {
    Route::get('/shipments', [ShipmentController::class, 'index']);
    Route::get('/shipments/create', [ShipmentController::class, 'createForm']);
    Route::post('/shipments/create', [ShipmentController::class, 'create']);
});

Route::group(['middleware' => 'auth'], function () {
    Route::post('/logout', [AuthContoller::class, 'logout']);
    Route::get('/home', [HomeContoller::class, 'index'])->name('home');
});
