<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard'); 
    }

    public function manageUsers()
    {
        return Inertia::render('Admin/ManageUsers'); 
    }
}
