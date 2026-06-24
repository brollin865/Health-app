import AppLayout from '@/Layouts/AppLayout';
export default function AdminUsers({ users }) {
    const roleColors = { admin:'bg-purple-100 text-purple-700', doctor:'bg-blue-100 text-blue-700', patient:'bg-green-100 text-green-700' };
    return (
        <AppLayout title="User Management">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-blue-900">All Users ({users?.length??0})</h2>
                    <div className="flex gap-2">
                        {['All','Patients','Doctors','Admins'].map(f=><button key={f} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">{f}</button>)}
                    </div>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50"><tr>{['#','Name','Email','Role','Joined','Status'].map(h=><th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>)}</tr></thead>
                    <tbody>
                        {(users??[]).map((u,i)=>(
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-400">{i+1}</td>
                                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{u.name?.[0]}</div><span className="font-medium">{u.name}</span></div></td>
                                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${roleColors[u.role]??'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                                <td className="px-4 py-3 text-gray-500">{u.created_at?.split('T')[0]}</td>
                                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Active</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
