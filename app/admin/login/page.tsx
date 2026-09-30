'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Flame, Lock, KeyRound, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validasi akun pengelola
        if (email === 'adminpassive@gmail.com' && password === 'password123') {
            // Simpan session dummy di localStorage
            localStorage.setItem('isAdminLoggedIn', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Email atau password pengelola salah. Akses ditolak.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-stone-200 font-mono selection:bg-[#D90429] selection:text-white flex items-center justify-center p-6">

            <div className="max-w-md w-full bg-stone-900/40 border border-stone-800 p-8 rounded-lg shadow-2xl relative">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-200 transition-colors mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Profile Brand
                </Link>

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-[#D90429]/10 border border-[#D90429]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-6 h-6 text-[#D90429]" />
                    </div>
                    <h1 className="text-xl font-extrabold text-stone-100 uppercase tracking-wider">PORTAL ADMIN PRE-ORDER</h1>
                    <p className="text-xs text-stone-500 font-sans mt-1">Sistem Pengelola Pre-Order PASSIVE.WEAR</p>
                </div>

                {error && (
                    <div className="bg-[#D90429]/10 border border-[#D90429]/40 p-3 rounded mb-6 flex items-start gap-2 text-xs text-[#D90429]">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="font-sans">{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1.5">// EMAIL USN ADMIN</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-stone-600 absolute left-3 top-3" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="adminpassive@gmail.com"
                                className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D90429]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1.5">// PASSWORD ADMIN</label>
                        <div className="relative">
                            <KeyRound className="w-4 h-4 text-stone-600 absolute left-3 top-3" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D90429]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D90429] hover:bg-[#b00320] text-white font-extrabold py-3 rounded text-xs uppercase tracking-wider transition-all mt-2 shadow-md shadow-[#D90429]/20"
                    >
                        MASUK DASHBOARD MANAGEMENT
                    </button>
                </form>

            </div>

        </div>
    );
}