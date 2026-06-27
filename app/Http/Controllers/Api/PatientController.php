<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'patient') {
            $patients = Patient::where('user_id', $user->id)->get();
        } else {
            $patients = Patient::with('user')->get();
        }

        return response()->json(['success' => true, 'data' => $patients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name'         => 'required|string|max:255',
            'age'               => 'required|integer|min:1|max:120',
            'gender'            => 'required|in:Male,Female,Other',
            'phone'             => 'required|string|max:20',
            'address'           => 'required|string',
            'emergency_contact' => 'nullable|string',
            'medical_history'   => 'nullable|string',
        ]);

        $patient = Patient::updateOrCreate(
            ['user_id' => $request->user()->id],
            array_merge($request->all(), ['user_id' => $request->user()->id])
        );

        return response()->json(['success' => true, 'data' => $patient], 201);
    }

    public function show(Request $request, $id)
    {
        $patient = Patient::with('user')->findOrFail($id);

        if ($request->user()->role === 'patient' && $patient->user_id !== $request->user()->id) {
            abort(403);
        }

        return response()->json(['success' => true, 'data' => $patient]);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);

        if ($request->user()->role === 'patient' && $patient->user_id !== $request->user()->id) {
            abort(403);
        }

        $patient->update($request->all());
        return response()->json(['success' => true, 'data' => $patient]);
    }
}
