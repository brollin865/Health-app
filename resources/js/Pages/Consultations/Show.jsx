import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, usePage } from '@inertiajs/react';
export default function ConsultationShow({ consultation, diagnoses, symptomNames }) {
    const { auth } = usePage().props;
    const isDoctor = auth?.user?.role === 'doctor';
    const { data, setData, put, processing } = useForm({ diagnosis_id: consultation.diagnosis_id??'', diagnosis_name:'', recommendation: consultation.recommendation??'', status: consultation.status??'pending' });
    const submit = (e) => { e.preventDefault(); const d = diagnoses.find(x=>x.id==data.diagnosis_id); setData('diagnosis_name', d?.disease_name??''); put(`/consultations/${consultation.id}`); };
    const statusColors = { pending:'bg-orange-100 text-orange-700', under_review:'bg-blue-100 text-blue-700', completed:'bg-green-100 text-green-700' };
    return (
        <AppLayout title="Consultation Detail">
            <div className="max-w-3xl space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-blue-900">Consultation #{consultation.id}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColors[consultation.status]??'bg-gray-100 text-gray-600'}`}>{consultation.status?.replace('_',' ').toUpperCase()}</span>
                    </div>
                    {isDoctor && <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="font-semibold text-blue-900">{consultation.patient?.user?.name}</p>
                        <p className="text-sm text-gray-500">{consultation.patient?.age} yrs • {consultation.patient?.gender} • {consultation.patient?.phone}</p>
                        {consultation.patient?.medical_history && <p className="text-sm text-gray-600 mt-1">History: {consultation.patient.medical_history}</p>}
                    </div>}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-500">Severity:</span> <span className="font-semibold ml-1">{consultation.severity}</span></div>
                        <div><span className="text-gray-500">Date:</span> <span className="font-semibold ml-1">{consultation.created_at?.split('T')[0]}</span></div>
                        <div className="col-span-2"><span className="text-gray-500">Symptoms:</span> <span className="ml-1">{symptomNames?.length ? symptomNames.join(', ') : '—'}</span></div>
                    </div>
                </div>
                {isDoctor ? (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-bold text-blue-900 mb-4">Doctor Review</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Formal Diagnosis</label>
                                <select value={data.diagnosis_id} onChange={e=>setData('diagnosis_id',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option value="">-- Select Diagnosis --</option>
                                    {diagnoses.map(d=><option key={d.id} value={d.id}>{d.disease_name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Recommendation</label>
                                <textarea value={data.recommendation} onChange={e=>setData('recommendation',e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter clinical recommendation..."/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                                <div className="flex gap-2">
                                    {['pending','under_review','completed'].map(s=>(
                                        <button key={s} type="button" onClick={()=>setData('status',s)} className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition capitalize ${data.status===s?'bg-blue-900 border-blue-900 text-white':'border-gray-200 text-gray-600 hover:border-blue-300'}`}>{s.replace('_',' ')}</button>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">{processing?'Saving...':'SAVE & UPDATE CONSULTATION'}</button>
                        </form>
                    </div>
                ) : consultation.recommendation && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <h3 className="font-bold text-green-800 mb-2">Doctor Response</h3>
                        {consultation.diagnosis && <p className="font-semibold text-lg mb-1">{consultation.diagnosis.disease_name}</p>}
                        <p className="text-gray-700">{consultation.recommendation}</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
