<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
use App\Models\Consultation;
use App\Models\DiagnosisHistory;
use App\Models\Patient;
use Illuminate\Http\Request;

class SymptomCheckerController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'symptom_ids' => 'required|array|min:1',
            'symptom_ids.*' => 'integer',
        ]);

        $symptomIds = $request->symptom_ids;
        $diagnoses  = Diagnosis::all();

        $results = $diagnoses->map(function ($diagnosis) use ($symptomIds) {
            $rules = json_decode($diagnosis->symptom_rules, true) ?? [];
            $score = count(array_intersect($symptomIds, $rules));

            if ($score === 0) return null;

            $priority = match (true) {
                $score >= 5 => 'Critical',
                $score >= 4 => 'High',
                $score >= 2 => 'Medium',
                default     => 'Low',
            };

            $percentage = $rules ? round(($score / count($rules)) * 100) : 0;

            return [
                'id'             => $diagnosis->id,
                'diagnosis'      => $diagnosis->disease_name,
                'description'    => $diagnosis->description,
                'recommendation' => $diagnosis->recommendation,
                'score'          => $score,
                'priority'       => $priority,
                'match_percent'  => $percentage,
            ];
        })->filter()->sortByDesc('score')->take(3)->values();

        // Auto-create consultation
        $patient = Patient::where('user_id', $request->user()->id)->first();

        if ($patient) {
            $topDiagnosis = $results->first();
            $severity = $topDiagnosis['priority'] ?? 'Low';

            $consultation = Consultation::create([
                'patient_id'  => $patient->id,
                'symptoms'    => $symptomIds,
                'severity'    => $severity,
                'notes'       => 'Auto-generated from symptom checker',
                'status'      => 'pending',
            ]);

            // Save to diagnosis history
            if ($topDiagnosis) {
                DiagnosisHistory::create([
                    'patient_id'      => $patient->id,
                    'consultation_id' => $consultation->id,
                    'diagnosis'       => $topDiagnosis['diagnosis'],
                    'recommendation'  => $topDiagnosis['recommendation'],
                ]);
            }
        }

        return response()->json([
            'success'     => true,
            'results'     => $results,
            'total_found' => $results->count(),
        ]);
    }
}
