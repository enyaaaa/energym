<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', 'App\Http\Controllers\UserController@logout');
});

Route::apiResource('user', UserController::class);
Route::post('register', 'App\Http\Controllers\UserController@register');
Route::post('login', 'App\Http\Controllers\UserController@login');
Route::get('profile', 'App\Http\Controllers\UserController@viewprofile');
Route::post('updateprofile', 'App\Http\Controllers\UserController@editprofile');
Route::delete('profile/{id}', 'App\Http\Controllers\UserController@destroy');