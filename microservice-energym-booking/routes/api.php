<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('bookings', BookingController::class);
Route::get('bookings/{id}', "App\Http\Controllers\BookingController@show");
Route::post('updatebooking/{id}', 'App\Http\Controllers\BookingController@update');
Route::delete('bookings', 'App\Http\Controllers\BookingController@destroy');
