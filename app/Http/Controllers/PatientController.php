<?php
namespace App\Http\Controllers;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()   { return Inertia::render('Patients/Index', ['patients' => Patient::with('user')->get()]); }
    public function create()  { return Inertia::render('Patients/Create'); }
    public function show($id) { return Inertia::render('Patients/Show',  ['patient'  => Patient::with('user')->findOrFail($id)]); }
    public function edit($id) { return Inertia::render('Patients/Create',['patient'  => Patient::findOrFail($id)]); }

    public function store(Request $request)
    {
        $request->validate(['full_name'=>'required','age'=>'required|integer','gender'=>'required','phone'=>'required','address'=>'required']);
        Patient::updateOrCreate(['user_id'=>$request->user()->id], array_merge($request->all(), ['user_id'=>$request->user()->id]));
        return redirect()->route('dashboard')->with('success','Profile saved!');
    }

    public function update(Request $request, $id)
    {
        Patient::findOrFail($id)->update($request->all());
        return redirect()->route('patients.show', $id)->with('success','Profile updated!');
    }
}
