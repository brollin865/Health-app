<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
use Illuminate\Http\Request;

class DiagnosisController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => Diagnosis::all()]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'disease_name'   => 'required|string',
            'description'    => 'nullable|string',
            'recommendation' => 'nullable|string',
            'symptom_rules'  => 'nullable|array',
        ]);
        $data = $request->all();
        if ($request->has('symptom_rules')) {
            $data['symptom_rules'] = json_encode($request->symptom_rules);
        }
        $diagnosis = Diagnosis::create($data);
        return response()->json(['success' => true, 'data' => $diagnosis], 201);
    }
}
