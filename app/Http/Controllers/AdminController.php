<?php
namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function users()     { return Inertia::render('Admin/Users',     ['users'    => User::latest()->get()]); }
    public function analytics() { return Inertia::render('Admin/Analytics', ['analytics'=> []]); }
}
