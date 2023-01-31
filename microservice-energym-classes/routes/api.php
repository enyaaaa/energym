<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\InstructorController;
use App\Http\Controllers\ClassController;

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
    Route::post('logout', 'App\Http\Controllers\InstructorController@logout');
});

Route::apiResource('instructors', InstructorController::class);
Route::post('register', 'App\Http\Controllers\InstructorController@register');
Route::post('login', 'App\Http\Controllers\InstructorController@login');
Route::get('profile', 'App\Http\Controllers\InstructorController@viewprofile');
Route::post('updateprofile', 'App\Http\Controllers\InstructorController@editprofile');
Route::delete('profile/{id}', 'App\Http\Controllers\InstructorController@destroy');

Route::apiResource('classes', ClassController::class);
Route::get('classes/{classType}', "App\Http\Controllers\ClassController@show");
Route::get('class/{id}', "App\Http\Controllers\ClassController@getclass");
Route::delete('class/{id}', 'App\Http\Controllers\ClassController@destroy');