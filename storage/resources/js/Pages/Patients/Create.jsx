import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
export default function PatientCreate() {
    const { data, setData, post, processing, errors } = useForm({ full_name:'',age:'',gender:'Male',phone:'',address:'',emergency_contact:'',medical_history:'' });
    const submit = e => { e.preventDefault(); post('/patients'); };
    return (
        <AppLayout title="Patient Profile">
            <div className="max-w-2xl bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-blue-900 mb-6">Complete Your Health Profile</h2>
                <form onSubmit={submit} className="space-y-4">
                    {[['full_name','Full Name','text'],['age','Age','number'],['phone','Phone Number','tel']].map(([k,l,t])=>(
                        <div key={k}><label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
                        <input type={t} value={data[k]} onChange={e=>setData(k,e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                        {errors[k]&&<p className="text-red-500 text-xs mt-1">{errors[k]}</p>}</div>
                    ))}
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select value={data.gender} onChange={e=>setData('gender',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        {['Male','Female','Other'].map(g=><option key={g}>{g}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><textarea value={data.address} onChange={e=>setData('address',e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label><input type="text" value={data.emergency_contact} onChange={e=>setData('emergency_contact',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label><textarea value={data.medical_history} onChange={e=>setData('medical_history',e.target.value)} rows={3} placeholder="Any existing conditions, allergies, previous surgeries..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                    <button type="submit" disabled={processing} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">{processing?'Saving...':'SAVE PROFILE'}</button>
                </form>
            </div>
        </AppLayout>
    );
}
