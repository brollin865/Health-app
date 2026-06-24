import AppLayout from '@/Layouts/AppLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
const monthly = [{m:'Jan',c:8,p:5},{m:'Feb',c:15,p:9},{m:'Mar',c:22,p:14},{m:'Apr',c:18,p:11},{m:'May',c:30,p:20},{m:'Jun',c:25,p:18}];
export default function Analytics() {
    return (
        <AppLayout title="System Analytics">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h3 className="font-bold text-blue-900 mb-4">Monthly Consultations & New Patients</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={monthly}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/><Tooltip/><Legend/>
                                <Bar dataKey="c" fill="#1F4E79" radius={[4,4,0,0]} name="Consultations"/>
                                <Bar dataKey="p" fill="#22c55e" radius={[4,4,0,0]} name="New Patients"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h3 className="font-bold text-blue-900 mb-4">Growth Trend</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={monthly}><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/><Tooltip/><Legend/>
                                <Line type="monotone" dataKey="c" stroke="#1F4E79" strokeWidth={2.5} name="Consultations" dot={false}/>
                                <Line type="monotone" dataKey="p" stroke="#22c55e" strokeWidth={2.5} name="Patients" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[['Total Consultations','159','📋','blue'],['Total Patients','100','👥','green'],['Diagnoses Made','203','Rx','purple'],['Active Doctors','12','👨‍⚕️','orange']].map(([l,v,i,c])=>(
                        <div key={l} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 border-${c}-500`}>
                            <p className="text-sm text-gray-500">{l}</p>
                            <p className={`text-3xl font-bold text-${c}-600 mt-1`}>{v}</p>
                            <span className="text-2xl">{i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
