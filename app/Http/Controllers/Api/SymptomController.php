<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Symptom;
use Illuminate\Http\Request;

class SymptomController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => Symptom::all()]);
    }
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        $symptom = Symptom::create($request->all());
        return response()->json(['success' => true, 'data' => $symptom], 201);
    }
}
