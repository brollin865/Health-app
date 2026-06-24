import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
export default function PatientShow({ patient }) {
    const fields = [['Full Name',patient.full_name],['Age',patient.age],['Gender',patient.gender],['Phone',patient.phone],['Address',patient.address],['Emergency Contact',patient.emergency_contact],['Medical History',patient.medical_history]];
    return (
        <AppLayout title="Patient Profile">
            <div className="max-w-2xl space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-blue-900 flex items-center justify-center text-white text-xl font-bold">{patient.full_name?.[0]}</div>
                        <div><h2 className="text-xl font-bold text-blue-900">{patient.full_name}</h2><p className="text-gray-500 text-sm">{patient.user?.email}</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {fields.map(([k,v])=>v&&<div key={k} className="col-span-1"><p className="text-xs text-gray-400 uppercase font-medium">{k}</p><p className="text-sm font-medium mt-0.5">{v}</p></div>)}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/consultations" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">View Consultations</Link>
                    <Link href="/patients" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Back to Patients</Link>
                </div>
            </div>
        </AppLayout>
    );
}
