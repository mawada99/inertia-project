<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeContoller extends Controller
{
    public function index()
    {
        return Inertia::render('Home/HomePage');
    }
}
