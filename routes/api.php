<?php

use Illuminate\Http\Request;

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

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile', 'UserController@getAuthenticatedUser');
Route::get('interests/{id}', 'interestController@findUserInterest');
Route::get('economicSectors/{id}', 'economicSectorController@findUserEconomicSector');
Route::post('interests/{id}', 'interestController@saveUserInterest');
Route::post('economicSectors/{id}', 'economicSectorController@saveUserEconomicSector');
Route::get('economicSectors', 'economicSectorController@findEconomicSector');
Route::get('interests', 'interestController@findInterests');
Route::post('favorites/{id}', 'FavoritesController@saveFavorite');
Route::get('favorites/{id}', 'FavoritesController@findfavoritesByUser');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
