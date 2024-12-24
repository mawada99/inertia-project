<?php

use App\Http\Controllers\Auth\AuthContoller;
use App\Http\Controllers\HomeContoller;
use App\Http\Controllers\ShipmentController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('landing_page');

Route::group(['middleware' => 'guest'], function () {
    Route::get('/login', [AuthContoller::class, 'loginForm'])->name('login');

    Route::post('/login', [AuthContoller::class, 'login']);

    Route::get('/signup', [AuthContoller::class, 'signupForm']);

    Route::post('/signup', [AuthContoller::class, 'signup']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/shipments', [ShipmentController::class, 'index']);
    Route::get('/shipments/save/{shipment?}', [ShipmentController::class, 'saveForm']);
    Route::post('/shipments/save', [ShipmentController::class, 'save']);
});

Route::group(['middleware' => 'auth'], function () {
    Route::post('/logout', [AuthContoller::class, 'logout']);
    Route::get('/home', [HomeContoller::class, 'index'])->name('home');
});
