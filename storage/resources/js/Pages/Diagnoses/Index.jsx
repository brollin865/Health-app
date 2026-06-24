import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, usePage } from '@inertiajs/react';
export default function DiagnosesIndex({ diagnoses }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';
    const { data, setData, post, processing, reset } = useForm({ disease_name:'', description:'', recommendation:'' });
    const submit = e => { e.preventDefault(); post('/diagnoses', { onSuccess: () => reset() }); };
    return (
        <AppLayout title="Diagnoses Catalogue">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-3">
                    {(diagnoses??[]).map((d,i)=>(
                        <div key={d.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-2"><span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-bold">{i+1}</span><h3 className="font-bold text-blue-900">{d.disease_name}</h3></div>
                            {d.description&&<p className="text-sm text-gray-600 mb-2">{d.description}</p>}
                            {d.recommendation&&<div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800"><span className="font-medium">Recommendation:</span> {d.recommendation}</div>}
                        </div>
                    ))}
                </div>
                {isAdmin && <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-bold text-blue-900 mb-4">Add Diagnosis</h3>
                    <form onSubmit={submit} className="space-y-3">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Disease Name</label><input type="text" value={data.disease_name} onChange={e=>setData('disease_name',e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Malaria"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={data.description} onChange={e=>setData('description',e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Recommendation</label><textarea value={data.recommendation} onChange={e=>setData('recommendation',e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Clinical recommendation..."/></div>
                        <button type="submit" disabled={processing} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">{processing?'Saving...':'Add Diagnosis'}</button>
                    </form>
                </div>}
            </div>
        </AppLayout>
    );
}
