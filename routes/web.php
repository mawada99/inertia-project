<?php

use App\Http\Controllers\Auth\AuthContoller;
use App\Http\Controllers\HomeContoller;
use App\Http\Controllers\ShipmentController;
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

Route::middleware('auth')->group(function () {
    Route::get('/shipments', [ShipmentController::class, 'index'])->middleware("check-permission:shipping.shipment.list");
    Route::get('/shipments/save/{shipment?}', [ShipmentController::class, 'saveForm'])->middleware('check-permission:shipping.shipment.create|shipping.shipment.update');
    Route::post('/shipments/save', [ShipmentController::class, 'save'])->middleware('check-permission:shipping.shipment.create|shipping.shipment.update');
    Route::get('/shipments/{shipment}', [ShipmentController::class, 'viewShipment'])->middleware('can:view,shipment');
});

Route::group(['middleware' => 'auth'], function () {
    Route::post('/logout', [AuthContoller::class, 'logout']);
    Route::get('/home', [HomeContoller::class, 'index'])->name('home');
});
