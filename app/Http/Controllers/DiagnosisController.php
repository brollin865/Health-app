<?php
namespace App\Http\Controllers;
use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiagnosisController extends Controller
{
    public function index()  { return Inertia::render('Diagnoses/Index', ['diagnoses'=>Diagnosis::all()]); }
    public function store(Request $request)
    {
        $request->validate(['disease_name'=>'required|string']);
        Diagnosis::create($request->only('disease_name','description','recommendation'));
        return redirect()->route('diagnoses.index')->with('success','Diagnosis added!');
    }
}
