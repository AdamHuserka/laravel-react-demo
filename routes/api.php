<?php

use App\Http\Controllers\api\PersonnelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/personnel/search', [PersonnelController::class, 'search']);

Route::apiResource('/personnel', PersonnelController::class);



