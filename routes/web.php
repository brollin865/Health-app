<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\SymptomController;
use App\Http\Controllers\SymptomCheckerController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Redirect root to login
Route::redirect('/', '/login');

// Authentication
Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Protected Routes
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Patients
    Route::get('/patients', [PatientController::class, 'index'])
        ->name('patients.index');

    Route::get('/patients/create', [PatientController::class, 'create'])
        ->name('patients.create');

    Route::post('/patients', [PatientController::class, 'store'])
        ->name('patients.store');

    Route::get('/patients/{patient}', [PatientController::class, 'show'])
        ->name('patients.show');

    Route::get('/patients/{patient}/edit', [PatientController::class, 'edit'])
        ->name('patients.edit');

    Route::put('/patients/{patient}', [PatientController::class, 'update'])
        ->name('patients.update');

    // Symptom Checker
    Route::get('/symptom-checker', [SymptomCheckerController::class, 'index'])
        ->name('symptom-checker.index');

    Route::post('/symptom-checker', [SymptomCheckerController::class, 'check'])
        ->name('symptom-checker.check');

    // Consultations
    Route::get('/consultations', [ConsultationController::class, 'index'])
        ->name('consultations.index');

    Route::post('/consultations', [ConsultationController::class, 'store'])
        ->name('consultations.store');

    Route::get('/consultations/{id}', [ConsultationController::class, 'show'])
        ->name('consultations.show');

    Route::put('/consultations/{id}', [ConsultationController::class, 'update'])
        ->name('consultations.update');

    // Diagnoses
    Route::get('/diagnoses', [DiagnosisController::class, 'index'])
        ->name('diagnoses.index');

    Route::post('/diagnoses', [DiagnosisController::class, 'store'])
        ->name('diagnoses.store');

    // Symptoms
    Route::get('/symptoms', [SymptomController::class, 'index'])
        ->name('symptoms.index');

    Route::post('/symptoms', [SymptomController::class, 'store'])
        ->name('symptoms.store');

    // Admin
    Route::get('/admin/users', [AdminController::class, 'users'])
        ->name('admin.users');

    Route::get('/admin/analytics', [AdminController::class, 'analytics'])
        ->name('admin.analytics');
});