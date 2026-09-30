'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Flame,
    LogOut,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Plus,
    Search,
    Filter,
    Eye,
    MessageSquare,
    DollarSign,
    TrendingUp,
    X,
    AlertCircle,
    Truck,
    Box,
    ChevronRight,
    ArrowUpRight,
    Calendar,
    Layers
} from 'lucide-react';

// --- INTERFACES & TYPES ---
interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    article: string;
    size: string;
    quantity: number;
    totalPrice: number;
    paidAmount: number;
    paymentType: 'DP' | 'FULL';
    status: 'WAITING_DP' | 'DP_VERIFIED' | 'PAID_FULL' | 'IN_PRODUCTION' | 'SHIPPED';
    date: string;
}

interface BatchPO {
    id: string;
    title: string;
    price: number;
    quota: number;
    ordered: number;
    deadline: string;
    status: 'ACTIVE' | 'CLOSED';
}

// --- DUMMY INITIAL DATA ---
const INITIAL_BATCHES: BatchPO[] = [
    {
        id: "DROP #001",
        title: "REIGN OF CHAOS",
        price: 185000,
        quota: 100,
        ordered: 42,
        deadline: "2026-10-15",
        status: "ACTIVE"
    },
    {
        id: "DROP #002",
        title: "SILENT VOID",
        price: 210000,
        quota: 50,
        ordered: 0,
        deadline: "2026-11-01",
        status: "CLOSED"
    }
];

const INITIAL_ORDERS: Order[] = [
    {
        id: "ORD-001",
        customerName: "Rian Ardianto",
        phone: "6281234567891",
        address: "Jl. Soekarno Hatta No. 45, Malang, Jawa Timur",
        article: "REIGN OF CHAOS (DROP #001)",
        size: "L",
        quantity: 2,
        totalPrice: 370000,
        paidAmount: 185000,
        paymentType: "DP",
        status: "DP_VERIFIED",
        date: "2026-09-28 14:20"
    },
    {
        id: "ORD-002",
        customerName: "Bagas Maulana",
        phone: "6285712345678",
        address: "Jl. Borobudur No. 12, Surabaya, Jawa Timur",
        article: "REIGN OF CHAOS (DROP #001)",
        size: "XL",
        quantity: 1,
        totalPrice: 185000,
        paidAmount: 185000,
        paymentType: "FULL",
        status: "PAID_FULL",
        date: "2026-09-29 09:15"
    },
    {
        id: "ORD-003",
        customerName: "Dion Rahardjo",
        phone: "6289987654321",
        address: "Kec. Sukajadi, Kota Bandung, Jawa Barat",
        article: "REIGN OF CHAOS (DROP #001)",
        size: "M",
        quantity: 1,
        totalPrice: 185000,
        paidAmount: 0,
        paymentType: "DP",
        status: "WAITING_DP",
        date: "2026-09-29 11:40"
    }
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // --- STATE MANAGEMENT ---
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [batches, setBatches] = useState<BatchPO[]>(INITIAL_BATCHES);

    // Filtering & Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');

    // Modals State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);

    // New Batch Form State
    const [newBatchTitle, setNewBatchTitle] = useState('');
    const [newBatchPrice, setNewBatchPrice] = useState(185000);
    const [newBatchQuota, setNewBatchQuota] = useState(50);
    const [newBatchDeadline, setNewBatchDeadline] = useState('');

    // --- SECURITY CHECK ---
    useEffect(() => {
        const loggedIn = localStorage.getItem('isAdminLoggedIn');
        if (loggedIn !== 'true') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) return null;

    // --- HANDLERS ---
    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        router.push('/admin/login');
    };

    const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(ord => {
            if (ord.id === orderId) {
                let updatedPaid = ord.paidAmount;
                if (newStatus === 'PAID_FULL') updatedPaid = ord.totalPrice;
                if (newStatus === 'DP_VERIFIED' && ord.paidAmount === 0) updatedPaid = ord.totalPrice * 0.5;
                return { ...ord, status: newStatus, paidAmount: updatedPaid };
            }
            return ord;
        }));

        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => prev ? {
                ...prev,
                status: newStatus,
                paidAmount: newStatus === 'PAID_FULL' ? prev.totalPrice : (newStatus === 'DP_VERIFIED' ? prev.totalPrice * 0.5 : prev.paidAmount)
            } : null);
        }
    };

    const handleCreateBatch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBatchTitle || !newBatchDeadline) return;

        const newBatch: BatchPO = {
            id: `DROP #00${batches.length + 1}`,
            title: newBatchTitle.toUpperCase(),
            price: Number(newBatchPrice),
            quota: Number(newBatchQuota),
            ordered: 0,
            deadline: newBatchDeadline,
            status: 'ACTIVE'
        };

        setBatches([newBatch, ...batches]);
        setIsAddBatchOpen(false);
        setNewBatchTitle('');
    };

    // --- CALCULATIONS & STATS ---
    const totalItemsSold = orders.reduce((sum, item) => sum + item.quantity, 0);
    const totalMoneyCollected = orders.reduce((sum, item) => sum + item.paidAmount, 0);
    const totalPotentialRevenue = orders.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalUnpaidBalance = totalPotentialRevenue - totalMoneyCollected;

    // --- FILTERED ORDERS ---
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.phone.includes(searchQuery);

        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-stone-200 font-mono selection:bg-[#D90429] selection:text-white">

            {/* HEADER NAVBAR */}
            <header className="sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-stone-800/80 px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-[#D90429]" />
                    <span className="font-black text-stone-100 text-sm tracking-wider">PASSIVE.WEAR // MANAGEMENT ENGINE</span>
                    <span className="bg-[#D90429]/20 text-[#D90429] border border-[#D90429]/40 text-[10px] px-2 py-0.5 rounded font-bold">
                        v2.4
                    </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                    <div className="hidden md:flex items-center gap-2 text-stone-400 font-sans">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Admin Active: <strong className="text-stone-200">adminpassive@gmail.com</strong></span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 hover:border-[#D90429] text-stone-300 hover:text-[#D90429] px-3 py-1.5 rounded transition-all text-xs font-bold"
                    >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* METRICS & FINANCiAL ANALYTICS DASHBOARD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-stone-900/40 border border-stone-800 p-5 rounded-lg relative overflow-hidden">
                        <div className="flex justify-between items-center text-stone-500 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider">// ITEM TERJUAL</span>
                            <Box className="w-4 h-4 text-[#D90429]" />
                        </div>
                        <p className="text-3xl font-black text-stone-100">{totalItemsSold} <span className="text-xs font-normal text-stone-500">Pcs</span></p>
                        <span className="text-[10px] text-stone-500 font-sans mt-2 block">Dari total seluruh batch PO</span>
                    </div>

                    <div className="bg-stone-900/40 border border-stone-800 p-5 rounded-lg relative overflow-hidden">
                        <div className="flex justify-between items-center text-stone-500 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider">// OMSET DITERIMA (CASH)</span>
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-3xl font-black text-emerald-400">Rp {totalMoneyCollected.toLocaleString('id-ID')}</p>
                        <span className="text-[10px] text-stone-500 font-sans mt-2 block">Uang masuk (DP + Pelunasan)</span>
                    </div>

                    <div className="bg-stone-900/40 border border-stone-800 p-5 rounded-lg relative overflow-hidden">
                        <div className="flex justify-between items-center text-stone-500 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider">// PIUTANG / PENDING</span>
                            <Clock className="w-4 h-4 text-amber-500" />
                        </div>
                        <p className="text-3xl font-black text-amber-400">Rp {totalUnpaidBalance.toLocaleString('id-ID')}</p>
                        <span className="text-[10px] text-stone-500 font-sans mt-2 block">Sisa pembayaran pembeli</span>
                    </div>

                    <div className="bg-stone-900/40 border border-stone-800 p-5 rounded-lg relative overflow-hidden">
                        <div className="flex justify-between items-center text-stone-500 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider">// ESTIMASI PROJEKSI OMSET</span>
                            <TrendingUp className="w-4 h-4 text-sky-500" />
                        </div>
                        <p className="text-3xl font-black text-stone-100">Rp {totalPotentialRevenue.toLocaleString('id-ID')}</p>
                        <span className="text-[10px] text-stone-500 font-sans mt-2 block">Total nilai orderan tercatat</span>
                    </div>
                </div>

                {/* BATCH RILISAN MANAGER */}
                <div className="bg-stone-900/30 border border-stone-800 rounded-lg p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <span className="text-xs font-bold text-[#D90429] uppercase tracking-widest">// DROP BATCH MANAGEMENT</span>
                            <h2 className="text-xl font-black text-stone-100 uppercase tracking-tight mt-0.5">MANAJEMEN BATCH PRE-ORDER</h2>
                        </div>
                        <button
                            onClick={() => setIsAddBatchOpen(true)}
                            className="flex items-center gap-2 bg-[#D90429] hover:bg-[#b00320] text-white font-extrabold px-4 py-2.5 rounded text-xs transition-all shadow-md shadow-[#D90429]/20"
                        >
                            <Plus className="w-4 h-4" /> BUKA BATCH PO BARU
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {batches.map((batch) => {
                            const percentage = Math.round((batch.ordered / batch.quota) * 100);
                            return (
                                <div key={batch.id} className="bg-stone-950 border border-stone-800 p-5 rounded-lg space-y-3 relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#D90429] uppercase">{batch.id}</span>
                                            <h3 className="text-lg font-black text-stone-100 uppercase">{batch.title}</h3>
                                            <p className="text-xs text-stone-400 mt-0.5">Rp {batch.price.toLocaleString('id-ID')} / pcs</p>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${batch.status === 'ACTIVE'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                            : 'bg-stone-800 text-stone-500 border-stone-700'
                                            }`}>
                                            {batch.status === 'ACTIVE' ? 'SISTEM OPEN PO' : 'CLOSED'}
                                        </span>
                                    </div>

                                    {/* PROGRESS BAR KUOTA */}
                                    <div className="space-y-1.5 font-sans">
                                        <div className="flex justify-between text-[11px]">
                                            <span className="text-stone-400">Kuota Terisi: <strong className="text-stone-200">{batch.ordered} / {batch.quota} Pcs</strong></span>
                                            <span className="font-bold text-[#D90429]">{percentage}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                                            <div
                                                className="h-full bg-[#D90429] transition-all duration-500"
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans border-t border-stone-800/80 pt-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-600" /> Deadline: {batch.deadline}</span>
                                        <span className="text-stone-400 font-mono">Estimasi Omset: Rp {(batch.ordered * batch.price).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ORDER MANAGEMENT TABLE SYSTEM */}
                <div className="bg-stone-900/30 border border-stone-800 rounded-lg p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold text-[#D90429] uppercase tracking-widest">// ORDER DATABASE</span>
                            <h2 className="text-xl font-black text-stone-100 uppercase tracking-tight mt-0.5">DAFTAR PESANAN MASUK</h2>
                        </div>

                        {/* FILTER & SEARCH BAR */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari Nama / ID Order / WA..."
                                    className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#D90429]"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded px-2.5 py-2 text-xs">
                                <Filter className="w-3.5 h-3.5 text-stone-500" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-transparent text-stone-300 focus:outline-none cursor-pointer"
                                >
                                    <option value="ALL" className="bg-stone-900">Semua Status</option>
                                    <option value="WAITING_DP" className="bg-stone-900">Menunggu DP</option>
                                    <option value="DP_VERIFIED" className="bg-stone-900">DP Terverifikasi</option>
                                    <option value="PAID_FULL" className="bg-stone-900">Lunas 100%</option>
                                    <option value="IN_PRODUCTION" className="bg-stone-900">Proses Produksi</option>
                                    <option value="SHIPPED" className="bg-stone-900">Dikirim</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto border border-stone-800 rounded-lg">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-stone-950 text-stone-400 font-mono border-b border-stone-800">
                                    <th className="py-3.5 px-4">NO. ORDER</th>
                                    <th className="py-3.5 px-4">PEMESAN</th>
                                    <th className="py-3.5 px-4">ARTIKEL & SIZE</th>
                                    <th className="py-3.5 px-4">TAGIHAN</th>
                                    <th className="py-3.5 px-4">PEMBAYARAN</th>
                                    <th className="py-3.5 px-4">STATUS</th>
                                    <th className="py-3.5 px-4 text-center">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800/60 font-sans">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-stone-500 font-mono">
                                            Tidak ada data pesanan yang sesuai filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((ord) => (
                                        <tr key={ord.id} className="hover:bg-stone-900/40 transition-colors">
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#D90429]">{ord.id}</td>
                                            <td className="py-3.5 px-4">
                                                <strong className="text-stone-200 block">{ord.customerName}</strong>
                                                <span className="text-[11px] text-stone-500 font-mono">{ord.phone}</span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="text-stone-300 block">{ord.article}</span>
                                                <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded font-mono font-bold">
                                                    Size: {ord.size} ({ord.quantity} Pcs)
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono">
                                                <strong className="text-stone-200">Rp {ord.totalPrice.toLocaleString('id-ID')}</strong>
                                                <span className="block text-[10px] text-stone-500">
                                                    {ord.paymentType === 'DP' ? 'Skema DP 50%' : 'Pelunasan Full'}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono">
                                                <span className="text-emerald-400 font-bold block">
                                                    Terbayar: Rp {ord.paidAmount.toLocaleString('id-ID')}
                                                </span>
                                                {ord.totalPrice - ord.paidAmount > 0 && (
                                                    <span className="text-amber-500 text-[10px]">
                                                        Sisa: Rp {(ord.totalPrice - ord.paidAmount).toLocaleString('id-ID')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ord.status === 'PAID_FULL'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                    : ord.status === 'DP_VERIFIED'
                                                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                                                        : ord.status === 'SHIPPED'
                                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                    }`}>
                                                    {ord.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(ord)}
                                                        className="p-1.5 bg-stone-900 border border-stone-800 hover:border-[#D90429] text-stone-300 hover:text-white rounded transition-all"
                                                        title="Detail Pesanan"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/${ord.phone}?text=${encodeURIComponent(`Halo Kak ${ord.customerName}, konfirmasi pesanan ${ord.id} (${ord.article}) dari PASSIVE.WEAR.`)}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-1.5 bg-emerald-950 border border-emerald-800/80 hover:border-emerald-500 text-emerald-400 rounded transition-all"
                                                        title="Follow Up WA"
                                                    >
                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

            {/* MODAL DETAIL ORDER & UPDATE STATUS */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-lg w-full p-6 space-y-6 relative">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                            <div>
                                <span className="text-[10px] font-bold text-[#D90429] uppercase">// DETAIL PESANAN</span>
                                <h3 className="font-extrabold text-stone-100 text-base">{selectedOrder.id} - {selectedOrder.customerName}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-stone-500 hover:text-stone-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs font-sans">
                            <div className="bg-stone-950 p-4 rounded border border-stone-800 space-y-2">
                                <p><strong className="text-stone-400 font-mono">Artikel:</strong> <span className="text-stone-200">{selectedOrder.article}</span></p>
                                <p><strong className="text-stone-400 font-mono">Ukuran & Qty:</strong> <span className="text-stone-200">{selectedOrder.size} ({selectedOrder.quantity} pcs)</span></p>
                                <p><strong className="text-stone-400 font-mono">No. WA:</strong> <span className="text-stone-200">{selectedOrder.phone}</span></p>
                                <p><strong className="text-stone-400 font-mono">Alamat:</strong> <span className="text-stone-200">{selectedOrder.address}</span></p>
                            </div>

                            {/* FINANCiAL STATUS IN MODAL */}
                            <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="bg-stone-950 p-3 rounded border border-stone-800">
                                    <span className="text-[10px] text-stone-500 block">Total Tagihan</span>
                                    <strong className="text-stone-100 text-sm">Rp {selectedOrder.totalPrice.toLocaleString('id-ID')}</strong>
                                </div>
                                <div className="bg-stone-950 p-3 rounded border border-stone-800">
                                    <span className="text-[10px] text-stone-500 block">Telah Dibayar</span>
                                    <strong className="text-emerald-400 text-sm">Rp {selectedOrder.paidAmount.toLocaleString('id-ID')}</strong>
                                </div>
                            </div>

                            {/* QUICK UPDATE STATUS */}
                            <div>
                                <label className="block text-[11px] font-bold text-stone-400 font-mono uppercase mb-2">// UPDATE STATUS MANAJEMEN</label>
                                <div className="grid grid-cols-2 gap-2 font-mono">
                                    <button
                                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'DP_VERIFIED')}
                                        className={`p-2 rounded text-[11px] font-bold border transition-all ${selectedOrder.status === 'DP_VERIFIED'
                                            ? 'bg-sky-500 text-black border-sky-500'
                                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-sky-500'
                                            }`}
                                    >
                                        Set DP Verifikasi (50%)
                                    </button>

                                    <button
                                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'PAID_FULL')}
                                        className={`p-2 rounded text-[11px] font-bold border transition-all ${selectedOrder.status === 'PAID_FULL'
                                            ? 'bg-emerald-500 text-black border-emerald-500'
                                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-emerald-500'
                                            }`}
                                    >
                                        Set Lunas (100%)
                                    </button>

                                    <button
                                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'IN_PRODUCTION')}
                                        className={`p-2 rounded text-[11px] font-bold border transition-all ${selectedOrder.status === 'IN_PRODUCTION'
                                            ? 'bg-amber-500 text-black border-amber-500'
                                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-amber-500'
                                            }`}
                                    >
                                        Proses Produksi
                                    </button>

                                    <button
                                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'SHIPPED')}
                                        className={`p-2 rounded text-[11px] font-bold border transition-all ${selectedOrder.status === 'SHIPPED'
                                            ? 'bg-purple-500 text-black border-purple-500'
                                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-purple-500'
                                            }`}
                                    >
                                        Sudah Dikirim
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-stone-800 flex justify-end">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold px-4 py-2 rounded text-xs"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL TAMBAH BATCH PO BARU */}
            {isAddBatchOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-md w-full p-6 space-y-5 relative">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                            <h3 className="font-bold text-stone-100 text-sm uppercase">// BUKA BATCH RILISAN BARU</h3>
                            <button onClick={() => setIsAddBatchOpen(false)} className="text-stone-500 hover:text-stone-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBatch} className="space-y-4 text-xs font-mono">
                            <div>
                                <label className="block text-stone-400 uppercase mb-1">Judul / Nama Artikel *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="CONTOH: VOID OF AGONY"
                                    value={newBatchTitle}
                                    onChange={(e) => setNewBatchTitle(e.target.value)}
                                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#D90429]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-stone-400 uppercase mb-1">Harga per Pcs (Rp) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={newBatchPrice}
                                        onChange={(e) => setNewBatchPrice(Number(e.target.value))}
                                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#D90429]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-stone-400 uppercase mb-1">Limit Kuota (Pcs) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={newBatchQuota}
                                        onChange={(e) => setNewBatchQuota(Number(e.target.value))}
                                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#D90429]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-stone-400 uppercase mb-1">Batas Waktu Countdown *</label>
                                <input
                                    type="date"
                                    required
                                    value={newBatchDeadline}
                                    onChange={(e) => setNewBatchDeadline(e.target.value)}
                                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#D90429]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#D90429] hover:bg-[#b00320] text-white font-extrabold py-3 rounded text-xs uppercase transition-all mt-2"
                            >
                                PUBLISH BATCH KE SISTEM
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}