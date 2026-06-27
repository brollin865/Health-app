import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '' });
    const submit = (e) => { e.preventDefault(); post('/login'); };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 bg-blue-900 rounded-2xl items-center justify-center mb-4">
                        <span className="text-white text-3xl">⊕</span>
                    </div>
                    <h1 className="text-2xl font-bold text-blue-900">Health Monitor</h1>
                    <p className="text-gray-400 text-xs">Victoria University — Group 7</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    {errors.email && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">{errors.email}</div>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={processing}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 mt-2">
                        {processing ? 'Logging in...' : 'LOGIN TO DASHBOARD'}
                    </button>
                    <p className="text-center text-sm text-gray-500">Don't have an account? <a href="/register" className="text-blue-600 font-medium hover:underline">Register</a></p>
                </form>
            </div>
        </div>
    );
}
