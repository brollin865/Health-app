<?php
namespace App\Http\Controllers;
use App\Models\Symptom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SymptomController extends Controller
{
    public function index()  { return Inertia::render('Symptoms/Index', ['symptoms'=>Symptom::all()]); }
    public function store(Request $request)
    {
        $request->validate(['name'=>'required|string']);
        Symptom::create($request->only('name','description'));
        return redirect()->route('symptoms.index')->with('success','Symptom added!');
    }
}
