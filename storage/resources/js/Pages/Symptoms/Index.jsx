import AppLayout from '@/Layouts/AppLayout';
import { useForm, usePage } from '@inertiajs/react';
export default function SymptomsIndex({ symptoms }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';
    const { data, setData, post, processing, reset } = useForm({ name:'', description:'' });
    const submit = e => { e.preventDefault(); post('/symptoms', { onSuccess: () => reset() }); };
    return (
        <AppLayout title="Symptoms Catalogue">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b"><h2 className="font-bold text-blue-900">All Symptoms ({symptoms?.length??0})</h2></div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50"><tr><th className="text-left px-4 py-3 text-gray-500 font-medium">#</th><th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th><th className="text-left px-4 py-3 text-gray-500 font-medium">Description</th></tr></thead>
                        <tbody>{(symptoms??[]).map((s,i)=><tr key={s.id} className="border-b hover:bg-gray-50"><td className="px-4 py-3 text-gray-400">{i+1}</td><td className="px-4 py-3 font-medium">{s.name}</td><td className="px-4 py-3 text-gray-500">{s.description}</td></tr>)}</tbody>
                    </table>
                </div>
                {isAdmin && <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-bold text-blue-900 mb-4">Add Symptom</h3>
                    <form onSubmit={submit} className="space-y-3">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Symptom Name</label><input type="text" value={data.name} onChange={e=>setData('name',e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Fever"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={data.description} onChange={e=>setData('description',e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Brief description..."/></div>
                        <button type="submit" disabled={processing} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">{processing?'Saving...':'Add Symptom'}</button>
                    </form>
                </div>}
            </div>
        </AppLayout>
    );
}
