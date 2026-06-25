<?php
namespace App\Http\Controllers;
use App\Models\{Consultation,Patient,Diagnosis,DiagnosisHistory};
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private function monthlyConsultations(): array
    {
        $months = collect(range(5, 0))->map(fn ($i) => Carbon::now()->subMonths($i)->startOfMonth());

        return $months->map(function (Carbon $month) {
            return [
                'month'         => $month->format('M'),
                'consultations' => Consultation::whereBetween('created_at', [$month, $month->copy()->endOfMonth()])->count(),
            ];
        })->values()->all();
    }

    private function diagnosisDistribution(): array
    {
        $counts = DiagnosisHistory::selectRaw('diagnosis, count(*) as count')
            ->groupBy('diagnosis')
            ->orderByDesc('count')
            ->get();

        $total = $counts->sum('count');
        if ($total === 0) return [];

        $top = $counts->take(3);
        $otherCount = $counts->skip(3)->sum('count');

        $rows = $top->map(fn ($row) => [
            'name'  => $row->diagnosis,
            'value' => round($row->count / $total * 100),
        ]);

        if ($otherCount > 0) {
            $rows->push(['name' => 'Other', 'value' => round($otherCount / $total * 100)]);
        }

        return $rows->values()->all();
    }

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
                'monthly_consultations'   => $this->monthlyConsultations(),
                'diagnosis_distribution'  => $this->diagnosisDistribution(),
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
