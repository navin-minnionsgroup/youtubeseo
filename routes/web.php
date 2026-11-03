<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page
Route::get('/', function () {
    return Inertia::render('Landing');
})->name('home');

// Checkout Page
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');

// PayU Flow Routes
Route::post('/payu/initiate', [CheckoutController::class, 'initiatePayment'])->name('payu.initiate');
Route::post('/payu/success', [CheckoutController::class, 'handleSuccess'])->name('payu.success');
Route::post('/payu/failure', [CheckoutController::class, 'handleFailure'])->name('payu.failure');

require __DIR__.'/auth.php';
