import AppLayout from '@/Layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#ef4444','#f97316','#3b82f6','#22c55e'];

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;
    const role = auth?.user?.role;

    if (role === 'doctor') return <DoctorDashboard stats={stats} />;
    if (role === 'admin')  return <AdminDashboard stats={stats} />;
    return <PatientDashboard stats={stats} />;
}

function StatCard({ label, value, color, icon }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4`} style={{ borderColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
                </div>
                <span className="text-3xl opacity-60">{icon}</span>
            </div>
        </div>
    );
}

function PatientDashboard({ stats }) {
    return (
        <AppLayout title="Patient Dashboard">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
                    <h2 className="text-xl font-bold">Welcome back!</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <StatCard label="Total Consultations" value={stats?.total ?? 0}     color="#2E75B6" icon="📋" />
                    <StatCard label="Pending Reviews"     value={stats?.pending ?? 0}   color="#f97316" icon="⏳" />
                    <StatCard label="Completed"           value={stats?.completed ?? 0} color="#22c55e" icon="✅" />
                </div>
                {stats?.latest && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <h3 className="font-semibold text-red-800 mb-1">Latest Diagnosis</h3>
                        <p className="font-bold text-lg text-red-700">{stats.latest.diagnosis}</p>
                        <p className="text-sm text-gray-600 mt-1">{stats.latest.recommendation}</p>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Check Symptoms',     href: '/symptom-checker', color: 'bg-blue-600',  icon: '🔍' },
                        { label: 'My Consultations',   href: '/consultations',   color: 'bg-orange-500',icon: '📋' },
                    ].map(a => (
                        <Link key={a.href} href={a.href} className={`${a.color} text-white rounded-xl p-5 flex items-center gap-3 hover:opacity-90 transition font-semibold`}>
                            <span className="text-2xl">{a.icon}</span>{a.label}
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function DoctorDashboard({ stats }) {
    const monthlyData = [
        { month:'Jan', consultations:5 }, { month:'Feb', consultations:8 },
        { month:'Mar', consultations:12 },{ month:'Apr', consultations:7 },
        { month:'May', consultations:15 },{ month:'Jun', consultations: stats?.pending ?? 8 },
    ];
    const pieData = [
        { name:'Malaria', value:35 },{ name:'Typhoid', value:28 },
        { name:'Flu', value:20 },{ name:'Other', value:17 },
    ];

    return (
        <AppLayout title="Doctor Dashboard">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white flex items-center gap-4">
                    <span className="text-4xl">🏥</span>
                    <div>
                        <h2 className="text-xl font-bold">Doctor Portal</h2>
                        <span className="inline-block mt-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">ONLINE</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <StatCard label="Total Patients"  value={stats?.total_patients ?? 0}         color="#2E75B6" icon="👥" />
                    <StatCard label="Pending"         value={stats?.pending_consultations ?? 0}   color="#f97316" icon="⏳" />
                    <StatCard label="Completed"       value={stats?.completed_consultations ?? 0} color="#22c55e" icon="✅" />
                    <StatCard label="Diagnoses"       value={stats?.total_diagnoses ?? 0}         color="#7c3aed" icon="Rx" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h3 className="font-semibold text-blue-900 mb-4">Monthly Consultations</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="consultations" fill="#2E75B6" radius={[4,4,0,0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h3 className="font-semibold text-blue-900 mb-4">Diagnosis Distribution</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pending consultations */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-blue-900">Pending Consultations</h3>
                        <Link href="/consultations" className="text-sm text-blue-600 hover:underline font-medium">View All →</Link>
                    </div>
                    {(stats?.recent_consultations ?? []).filter(c => c.status === 'pending').slice(0,5).map(c => (
                        <div key={c.id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                    {c.patient?.user?.name?.[0] ?? 'P'}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{c.patient?.user?.name ?? 'Patient'}</p>
                                    <p className="text-xs text-gray-500">Severity: {c.severity} • {c.created_at?.split('T')[0]}</p>
                                </div>
                            </div>
                            <Link href={`/consultations/${c.id}`} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold hover:bg-orange-200 transition">
                                Review →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function AdminDashboard({ stats }) {
    const lineData = [
        { month:'Jan', consultations:8, patients:5 }, { month:'Feb', consultations:15, patients:9 },
        { month:'Mar', consultations:22, patients:14 },{ month:'Apr', consultations:18, patients:11 },
        { month:'May', consultations:30, patients:20 },{ month:'Jun', consultations:25, patients:18 },
    ];
    return (
        <AppLayout title="Administrator Dashboard">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 text-white flex items-center gap-4">
                    <span className="text-4xl">🛡️</span>
                    <div>
                        <h2 className="text-xl font-bold">Administrator Panel</h2>
                        <span className="inline-block mt-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">SYSTEM ONLINE</span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <StatCard label="Total Users"     value={stats?.total_users ?? 0}         color="#2E75B6" icon="👥" />
                    <StatCard label="Patients"        value={stats?.total_patients ?? 0}       color="#22c55e" icon="🧑‍⚕️" />
                    <StatCard label="Doctors"         value={stats?.doctors ?? 0}              color="#7c3aed" icon="👨‍⚕️" />
                    <StatCard label="Consultations"   value={stats?.total_consultations ?? 0}  color="#f97316" icon="📋" />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-semibold text-purple-900 mb-4">System Activity — Last 6 Months</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={lineData}>
                            <XAxis dataKey="month" tick={{ fontSize:12 }} />
                            <YAxis tick={{ fontSize:12 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="consultations" fill="#7c3aed" radius={[4,4,0,0]} name="Consultations" />
                            <Bar dataKey="patients"      fill="#22c55e" radius={[4,4,0,0]} name="New Patients" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/users"     className="bg-blue-50 border border-blue-200 rounded-xl p-5 hover:bg-blue-100 transition">
                        <h4 className="font-bold text-blue-900">👥 Manage Users</h4>
                        <p className="text-sm text-gray-500 mt-1">View, edit and manage all system users</p>
                    </Link>
                    <Link href="/admin/analytics" className="bg-purple-50 border border-purple-200 rounded-xl p-5 hover:bg-purple-100 transition">
                        <h4 className="font-bold text-purple-900">📊 System Analytics</h4>
                        <p className="text-sm text-gray-500 mt-1">View full system usage reports</p>
                    </Link>
                    <Link href="/symptoms"        className="bg-orange-50 border border-orange-200 rounded-xl p-5 hover:bg-orange-100 transition">
                        <h4 className="font-bold text-orange-900">🩺 Manage Symptoms</h4>
                        <p className="text-sm text-gray-500 mt-1">Add or edit the symptom catalogue</p>
                    </Link>
                    <Link href="/diagnoses"       className="bg-green-50 border border-green-200 rounded-xl p-5 hover:bg-green-100 transition">
                        <h4 className="font-bold text-green-900">Rx Manage Diagnoses</h4>
                        <p className="text-sm text-gray-500 mt-1">Configure disease and diagnosis rules</p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
