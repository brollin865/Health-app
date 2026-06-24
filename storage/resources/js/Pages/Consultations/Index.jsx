import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
const statusColors = { pending:'bg-orange-100 text-orange-700', under_review:'bg-blue-100 text-blue-700', completed:'bg-green-100 text-green-700' };
export default function ConsultationsIndex({ consultations }) {
    const { auth } = usePage().props;
    const isDoctor = auth?.user?.role === 'doctor';
    return (
        <AppLayout title="Consultations">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-900">{isDoctor ? 'All Consultations' : 'My Consultations'}</h2>
                    {!isDoctor && <Link href="/symptom-checker" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">+ New Consultation</Link>}
                </div>
                {!consultations?.length ? (
                    <div className="text-center py-16 text-gray-400">
                        <div className="text-5xl mb-4">📋</div>
                        <p>No consultations found</p>
                        {!isDoctor && <Link href="/symptom-checker" className="mt-4 inline-block text-blue-600 hover:underline">Start a symptom check →</Link>}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-blue-900 text-white">
                                <tr>{['#', isDoctor&&'Patient','Severity','Status','Diagnosis','Date','Action'].filter(Boolean).map(h=><th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {consultations.map((c,i)=>(
                                    <tr key={c.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-500">{i+1}</td>
                                        {isDoctor&&<td className="px-4 py-3 font-medium">{c.patient?.user?.name??'—'}</td>}
                                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.severity==='High'||c.severity==='Critical'?'bg-red-100 text-red-700':c.severity==='Medium'?'bg-orange-100 text-orange-700':'bg-green-100 text-green-700'}`}>{c.severity}</span></td>
                                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[c.status]??'bg-gray-100 text-gray-600'}`}>{c.status?.replace('_',' ').toUpperCase()}</span></td>
                                        <td className="px-4 py-3">{c.diagnosis?.disease_name??'—'}</td>
                                        <td className="px-4 py-3 text-gray-500">{c.created_at?.split('T')[0]}</td>
                                        <td className="px-4 py-3"><Link href={`/consultations/${c.id}`} className="text-blue-600 hover:underline text-xs font-medium">{isDoctor?'Review →':'View →'}</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
