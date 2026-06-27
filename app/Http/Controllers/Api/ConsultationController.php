<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\DiagnosisHistory;
use App\Models\Patient;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'patient') {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient) {
                return response()->json(['success' => true, 'data' => []]);
            }
            $consultations = Consultation::where('patient_id', $patient->id)
                ->with('diagnosis')->orderByDesc('created_at')->get();
        } else {
            $consultations = Consultation::with(['patient.user', 'diagnosis'])
                ->orderByDesc('created_at')->get();
        }

        return response()->json(['success' => true, 'data' => $consultations]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'symptom_ids' => 'required|array',
            'severity'    => 'required|in:Low,Medium,High,Critical',
            'notes'       => 'nullable|string',
        ]);

        $patient = Patient::where('user_id', $request->user()->id)->firstOrFail();

        $consultation = Consultation::create([
            'patient_id' => $patient->id,
            'symptoms'   => $request->symptom_ids,
            'severity'   => $request->severity,
            'notes'      => $request->notes,
            'status'     => 'pending',
        ]);

        return response()->json(['success' => true, 'data' => $consultation], 201);
    }

    public function show(Request $request, $id)
    {
        $consultation = Consultation::with(['patient.user', 'diagnosis'])->findOrFail($id);

        if ($request->user()->role === 'patient' && $consultation->patient->user_id !== $request->user()->id) {
            abort(403);
        }

        return response()->json(['success' => true, 'data' => $consultation]);
    }

    public function update(Request $request, $id)
    {
        if ($request->user()->role === 'patient') {
            abort(403);
        }

        $consultation = Consultation::findOrFail($id);

        $consultation->update([
            'diagnosis_id'   => $request->diagnosis_id,
            'recommendation' => $request->recommendation,
            'status'         => $request->status ?? 'completed',
        ]);

        // Save to diagnosis history when completed
        if ($request->status === 'completed' && $request->diagnosis_name) {
            DiagnosisHistory::updateOrCreate(
                ['consultation_id' => $consultation->id],
                [
                    'patient_id'      => $consultation->patient_id,
                    'diagnosis'       => $request->diagnosis_name,
                    'recommendation'  => $request->recommendation,
                ]
            );
        }

        return response()->json(['success' => true, 'data' => $consultation->fresh('diagnosis')]);
    }

    public function history(Request $request)
    {
        $patient = Patient::where('user_id', $request->user()->id)->first();
        if (!$patient) {
            return response()->json(['success' => true, 'data' => []]);
        }
        $history = DiagnosisHistory::where('patient_id', $patient->id)
            ->orderByDesc('created_at')->get();
        return response()->json(['success' => true, 'data' => $history]);
    }
}
