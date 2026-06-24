import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';
const prioColor = p=>({ Critical:'bg-red-700',High:'bg-red-500',Medium:'bg-orange-500',Low:'bg-green-500' }[p]??'bg-gray-500');
export default function SymptomChecker({ symptoms, results }) {
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const toggle = id => setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
    const check = () => { if(!selected.length){alert('Select at least one symptom');return;} setLoading(true); router.post('/symptom-checker',{symptom_ids:selected},{onFinish:()=>setLoading(false)}); };
    return (
        <AppLayout title="Symptom Checker">
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-blue-900 mb-1">Select Your Symptoms</h2>
                    <p className="text-sm text-gray-500 mb-4">{selected.length} selected — tick all that apply</p>
                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                        {(symptoms??[]).map(s=>(
                            <label key={s.id} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${selected.includes(s.id)?'border-blue-500 bg-blue-50':'border-gray-100 hover:border-gray-300'}`}>
                                <input type="checkbox" checked={selected.includes(s.id)} onChange={()=>toggle(s.id)} className="w-4 h-4 accent-blue-700"/>
                                <div><p className="font-medium text-sm">{s.name}</p>{s.description&&<p className="text-xs text-gray-400">{s.description}</p>}</div>
                            </label>
                        ))}
                    </div>
                    <button onClick={check} disabled={loading||!selected.length} className="mt-4 w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50">
                        {loading?'Analysing...':`CHECK SYMPTOMS (${selected.length} selected)`}
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-blue-900 mb-4">Diagnosis Results</h2>
                    {!results ? (
                        <div className="text-center text-gray-400 py-16"><div className="text-5xl mb-3">🔍</div><p>Select symptoms and click Check</p></div>
                    ) : !results.length ? (
                        <div className="text-center text-gray-400 py-16"><div className="text-5xl mb-3">✅</div><p>No significant matches found. Consult a doctor.</p></div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700">⚠ Preliminary only. Please consult a qualified doctor.</div>
                            {results.map((r,i)=>(
                                <div key={i} className="border-2 rounded-xl p-4" style={{borderColor:['#ef4444','#f97316','#3b82f6'][i]??'#6b7280'}}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`w-7 h-7 rounded-full ${prioColor(r.priority)} text-white text-xs flex items-center justify-center font-bold`}>{i+1}</span>
                                        <span className="font-bold text-lg">{r.diagnosis}</span>
                                        <span className={`ml-auto ${prioColor(r.priority)} text-white text-xs px-2 py-0.5 rounded-full font-bold`}>{r.priority}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1"><div className="bg-blue-600 h-1.5 rounded-full" style={{width:`${r.match_percent}%`}}></div></div>
                                    <p className="text-xs text-gray-400 mb-2">{r.match_percent}% match</p>
                                    <p className="text-sm text-gray-700">{r.recommendation}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
