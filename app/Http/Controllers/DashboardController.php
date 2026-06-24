<?php
namespace App\Http\Controllers;
use App\Models\{Consultation,Patient,Diagnosis,DiagnosisHistory};
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $stats = [];

        if ($user->role === 'patient') {
            $patient = Patient::where('user_id', $user->id)->first();
            if ($patient) {
                $stats = [
                    'total'     => Consultation::where('patient_id', $patient->id)->count(),
                    'pending'   => Consultation::where('patient_id', $patient->id)->where('status','pending')->count(),
                    'completed' => Consultation::where('patient_id', $patient->id)->where('status','completed')->count(),
                    'latest'    => DiagnosisHistory::where('patient_id', $patient->id)->latest()->first(),
                ];
            }
        } elseif ($user->role === 'doctor') {
            $stats = [
                'total_patients'          => Patient::count(),
                'pending_consultations'   => Consultation::where('status','pending')->count(),
                'completed_consultations' => Consultation::where('status','completed')->count(),
                'total_diagnoses'         => Diagnosis::count(),
                'recent_consultations'    => Consultation::with(['patient.user','diagnosis'])->orderByDesc('created_at')->take(10)->get(),
            ];
        } else {
            $stats = [
                'total_users'         => \App\Models\User::count(),
                'total_patients'      => Patient::count(),
                'total_consultations' => Consultation::count(),
                'doctors'             => \App\Models\User::where('role','doctor')->count(),
            ];
        }

        return Inertia::render('Dashboard', ['stats' => $stats]);
    }
}
