import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({ name:'', email:'', password:'', password_confirmation:'', role:'patient' });
    const submit = (e) => { e.preventDefault(); post('/register'); };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-900">Create Account</h1>
                    <p className="text-gray-500 text-sm">Health Monitoring & Diagnosis System</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    {['name','email'].map(f => (
                        <div key={f}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f === 'name' ? 'Full Name' : 'Email Address'}</label>
                            <input type={f === 'email' ? 'email' : 'text'} value={data[f]} onChange={e => setData(f, e.target.value)} required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            {errors[f] && <p className="text-red-500 text-xs mt-1">{errors[f]}</p>}
                        </div>
                    ))}
                    {['password','password_confirmation'].map(f => (
                        <div key={f}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{f === 'password' ? 'Password' : 'Confirm Password'}</label>
                            <input type="password" value={data[f]} onChange={e => setData(f, e.target.value)} required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                        <div className="flex gap-2">
                            {['patient','doctor'].map(r => (
                                <button key={r} type="button" onClick={() => setData('role', r)}
                                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition capitalize ${data.role === r ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={processing}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60">
                        {processing ? 'Creating account...' : 'CREATE ACCOUNT'}
                    </button>
                    <p className="text-center text-sm text-gray-500">Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Sign In</a></p>
                </form>
            </div>
        </div>
    );
}
