<?php
namespace App\Http\Controllers;
use App\Models\{Symptom,Diagnosis,Consultation,Patient,DiagnosisHistory};
use Illuminate\Http\Request;
use Inertia\Inertia;

class SymptomCheckerController extends Controller
{
    public function index()
    {
        return Inertia::render('SymptomChecker/Index', ['symptoms'=>Symptom::all(),'results'=>null]);
    }

    public function check(Request $request)
    {
        $ids      = $request->symptom_ids ?? [];
        $results  = Diagnosis::all()->map(function($d) use($ids){
            $rules = json_decode($d->symptom_rules,true) ?? [];
            $score = count(array_intersect($ids,$rules));
            if(!$score) return null;
            $priority = match(true){ $score>=5=>'Critical',$score>=4=>'High',$score>=2=>'Medium',default=>'Low' };
            return ['id'=>$d->id,'diagnosis'=>$d->disease_name,'score'=>$score,'priority'=>$priority,'match_percent'=>$rules?round($score/count($rules)*100):0,'recommendation'=>$d->recommendation];
        })->filter()->sortByDesc('score')->take(3)->values();

        $patient = Patient::where('user_id',$request->user()->id)->first();
        if($patient){
            $c = Consultation::create(['patient_id'=>$patient->id,'symptoms'=>json_encode($ids),'severity'=>$results->first()['priority']??'Low','notes'=>'Auto-generated from symptom checker','status'=>'pending']);
            if($results->isNotEmpty())
                DiagnosisHistory::create(['patient_id'=>$patient->id,'consultation_id'=>$c->id,'diagnosis'=>$results->first()['diagnosis'],'recommendation'=>$results->first()['recommendation']]);
        }
        return Inertia::render('SymptomChecker/Index', ['symptoms'=>Symptom::all(),'results'=>$results]);
    }
}
