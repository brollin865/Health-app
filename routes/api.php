
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SymptomController;
use App\Http\Controllers\Api\DiagnosisController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\SymptomCheckerController;
use App\Http\Controllers\Api\DashboardController;

// Public routes
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Patients
    Route::get('/patients',          [PatientController::class, 'index']);
    Route::post('/patients',         [PatientController::class, 'store']);
    Route::get('/patients/{id}',     [PatientController::class, 'show']);
    Route::put('/patients/{id}',     [PatientController::class, 'update']);

    // Symptoms catalogue
    Route::get('/symptoms',          [SymptomController::class, 'index']);
    Route::post('/symptoms',         [SymptomController::class, 'store']);

    // Diagnoses catalogue
    Route::get('/diagnoses',         [DiagnosisController::class, 'index']);
    Route::post('/diagnoses',        [DiagnosisController::class, 'store']);

    // Symptom checker
    Route::post('/symptom-checker',  [SymptomCheckerController::class, 'check']);

    // Consultations
    Route::get('/consultations',     [ConsultationController::class, 'index']);
    Route::post('/consultations',    [ConsultationController::class, 'store']);
    Route::get('/consultations/{id}',[ConsultationController::class, 'show']);
    Route::put('/consultations/{id}',[ConsultationController::class, 'update']);

    // Diagnosis history
    Route::get('/diagnosis-history', [ConsultationController::class, 'history']);

    // Dashboard stats
    Route::get('/dashboard/patient', [DashboardController::class, 'patient']);
    Route::get('/dashboard/doctor',  [DashboardController::class, 'doctor']);
    Route::get('/dashboard/admin',   [DashboardController::class, 'admin']);
});
