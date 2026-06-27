<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
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

        return response()->json([
            'success'     => true,
            'results'     => $results,
            'total_found' => $results->count(),
        ]);
    }
}
