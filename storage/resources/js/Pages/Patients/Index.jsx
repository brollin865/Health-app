import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
export default function PatientsIndex({ patients }) {
    return (
        <AppLayout title="Patients">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-900">Registered Patients</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-900 text-white"><tr>{['#','Name','Age','Gender','Phone','Address','Action'].map(h=><th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
                        <tbody>
                            {(patients??[]).map((p,i)=>(
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-500">{i+1}</td>
                                    <td className="px-4 py-3 font-medium">{p.full_name}</td>
                                    <td className="px-4 py-3">{p.age}</td>
                                    <td className="px-4 py-3">{p.gender}</td>
                                    <td className="px-4 py-3">{p.phone}</td>
                                    <td className="px-4 py-3 text-gray-500">{p.address}</td>
                                    <td className="px-4 py-3"><Link href={`/patients/${p.id}`} className="text-blue-600 hover:underline text-xs font-medium">View →</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
