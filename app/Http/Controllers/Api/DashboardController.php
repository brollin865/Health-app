<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\{Consultation, Patient, Diagnosis, DiagnosisHistory, User};
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function patient(Request $request)
    {
        $patient = Patient::where('user_id', $request->user()->id)->first();
        if (!$patient) return response()->json(['success' => true, 'data' => []]);

        $total     = Consultation::where('patient_id', $patient->id)->count();
        $pending   = Consultation::where('patient_id', $patient->id)->where('status', 'pending')->count();
        $completed = Consultation::where('patient_id', $patient->id)->where('status', 'completed')->count();
        $latest    = DiagnosisHistory::where('patient_id', $patient->id)->latest()->first();

        return response()->json(['success' => true, 'data' => [
            'total_consultations'     => $total,
            'pending_consultations'   => $pending,
            'completed_consultations' => $completed,
            'latest_diagnosis'        => $latest,
            'patient'                 => $patient,
        ]]);
    }

    public function doctor()
    {
        return response()->json(['success' => true, 'data' => [
            'total_patients'          => Patient::count(),
            'total_consultations'     => Consultation::count(),
            'pending_consultations'   => Consultation::where('status', 'pending')->count(),
            'completed_consultations' => Consultation::where('status', 'completed')->count(),
            'total_diagnoses'         => Diagnosis::count(),
            'recent_consultations'    => Consultation::with(['patient.user', 'diagnosis'])
                                            ->orderByDesc('created_at')->take(10)->get(),
        ]]);
    }

    public function admin()
    {
        return response()->json(['success' => true, 'data' => [
            'total_users'         => User::count(),
            'total_patients'      => Patient::count(),
            'total_consultations' => Consultation::count(),
            'total_diagnoses'     => Diagnosis::count(),
            'doctors'             => User::where('role', 'doctor')->count(),
        ]]);
    }
}
