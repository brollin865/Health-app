import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AppLayout({ children, title = '' }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sideOpen, setSideOpen] = useState(true);

    const navItems = user?.role === 'admin' ? [
        { label: 'Dashboard',     href: '/dashboard',    icon: '⊞' },
        { label: 'Users',         href: '/admin/users',  icon: '👥' },
        { label: 'Analytics',     href: '/admin/analytics', icon: '📊' },
        { label: 'Symptoms',      href: '/symptoms',     icon: '🩺' },
        { label: 'Diagnoses',     href: '/diagnoses',    icon: 'Rx' },
    ] : user?.role === 'doctor' ? [
        { label: 'Dashboard',     href: '/dashboard',    icon: '⊞' },
        { label: 'Patients',      href: '/patients',     icon: '👥' },
        { label: 'Consultations', href: '/consultations',icon: '📋' },
        { label: 'Diagnoses',     href: '/diagnoses',    icon: 'Rx' },
        { label: 'Symptoms',      href: '/symptoms',     icon: '🩺' },
    ] : [
        { label: 'Dashboard',     href: '/dashboard',    icon: '⊞' },
        { label: 'Symptom Check', href: '/symptom-checker', icon: '🔍' },
        { label: 'Consultations', href: '/consultations',icon: '📋' },
        { label: 'My Profile',    href: '/patients/create', icon: '👤' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className={`${sideOpen ? 'w-56' : 'w-16'} bg-blue-900 text-white flex flex-col transition-all duration-200 shrink-0`}>
                <div className="flex items-center gap-2 px-4 py-5 border-b border-blue-800">
                    <span className="text-2xl">⊕</span>
                    {sideOpen && <span className="font-bold text-sm leading-tight">Health Monitor<br/><span className="text-xs text-blue-300">VU Group 7</span></span>}
                </div>
                <nav className="flex-1 py-4 space-y-1 px-2">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition text-sm font-medium">
                            <span className="text-base w-5 text-center">{item.icon}</span>
                            {sideOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-blue-800 text-xs text-blue-400">
                    {sideOpen && <div className="mb-1 font-medium text-white truncate">{user?.name}</div>}
                    {sideOpen && <div className="capitalize text-blue-300">{user?.role}</div>}
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSideOpen(!sideOpen)} className="text-gray-500 hover:text-gray-700">☰</button>
                        <h1 className="text-gray-800 font-semibold text-lg">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Entebbe General Referral Hospital</span>
                        <Link href="/logout" method="post" as="button"
                            className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-medium transition">
                            Logout
                        </Link>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
