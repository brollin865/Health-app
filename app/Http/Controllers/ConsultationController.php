<?php
namespace App\Http\Controllers;
use App\Models\{Consultation,Patient,DiagnosisHistory,Symptom};
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'patient') {
            $patient = Patient::where('user_id',$user->id)->first();
            $data = $patient ? Consultation::where('patient_id',$patient->id)->with('diagnosis')->orderByDesc('created_at')->get() : collect();
        } else {
            $data = Consultation::with(['patient.user','diagnosis'])->orderByDesc('created_at')->get();
        }
        return Inertia::render('Consultations/Index', ['consultations' => $data]);
    }

    public function show($id)
    {
        $c = Consultation::with(['patient.user','diagnosis'])->findOrFail($id);
        $diagnoses = \App\Models\Diagnosis::all();
        $raw = $c->symptoms;
        $symptomIds = is_array($raw) ? $raw : (json_decode($raw ?? '[]', true) ?? []);
        $symptoms = Symptom::whereIn('id', $symptomIds)->pluck('name');
        return Inertia::render('Consultations/Show', ['consultation'=>$c,'diagnoses'=>$diagnoses,'symptomNames'=>$symptoms]);
    }

    public function store(Request $request)
    {
        $request->validate(['symptom_ids'=>'required|array','severity'=>'required','notes'=>'nullable']);
        $patient = Patient::where('user_id',$request->user()->id)->firstOrFail();
        Consultation::create(['patient_id'=>$patient->id,'symptoms'=>$request->symptom_ids,'severity'=>$request->severity,'notes'=>$request->notes,'status'=>'pending']);
        return redirect()->route('consultations.index')->with('success','Consultation submitted!');
    }

    public function update(Request $request, $id)
    {
        $c = Consultation::findOrFail($id);
        $c->update(['diagnosis_id'=>$request->diagnosis_id,'recommendation'=>$request->recommendation,'status'=>$request->status??'completed']);
        if ($request->status==='completed' && $request->diagnosis_name) {
            DiagnosisHistory::updateOrCreate(['consultation_id'=>$c->id],['patient_id'=>$c->patient_id,'diagnosis'=>$request->diagnosis_name,'recommendation'=>$request->recommendation]);
        }
        return redirect()->route('consultations.show',$id)->with('success','Consultation updated!');
    }
}
