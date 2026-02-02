'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, Filter, Plus, MoreVertical, Edit2, Trash2,
    ExternalLink, Eye, Laptop, Building2, GraduationCap,
    Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import DashboardShell from '../../components/dashboard/DashboardShell';
import { getStoredUser } from '../../lib/auth';

export default function MyListingsPage() {
    const router = useRouter();
    const user = getStoredUser();
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState<any[]>([]);

    useEffect(() => {
        // Simulate fetching user listings
        setTimeout(() => {
            setListings([
                { id: 1, title: 'HealthTracker AI', category: 'app', status: 'active', views: 1240, created_at: '2024-01-15' },
                { id: 2, title: 'EcoStay Lodge', category: 'hotel', status: 'pending', views: 0, created_at: '2024-02-01' },
                { id: 3, title: 'Global Edu Portal', category: 'university', status: 'active', views: 850, created_at: '2023-12-10' },
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-full border border-green-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                );
            case 'pending':
                return (
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase rounded-full border border-yellow-500/20">
                        <Clock className="w-3 h-3" /> Pending
                    </span>
                );
            case 'rejected':
                return (
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-full border border-red-500/20">
                        <AlertCircle className="w-3 h-3" /> Rejected
                    </span>
                );
            default: return null;
        }
    };

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case 'app': return <Laptop className="w-4 h-4" />;
            case 'hotel': return <Building2 className="w-4 h-4" />;
            case 'university': return <GraduationCap className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <DashboardShell user={user}>
                <div className="p-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">My <span className="gradient-text">Listings</span></h1>
                            <p className="text-muted-foreground mt-1">Manage and track the performance of your posts.</p>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/create-listing')}
                            className="bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Listing
                        </button>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 bg-card/50 border border-border rounded-2xl px-4 flex items-center gap-3">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by title..."
                                className="bg-transparent border-none outline-none py-3 text-sm w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold whitespace-nowrap">All Items</button>
                            <button className="px-4 py-2 bg-card hover:bg-accent border border-border rounded-xl text-xs font-medium text-muted-foreground whitespace-nowrap transition-colors">Active</button>
                            <button className="px-4 py-2 bg-card hover:bg-accent border border-border rounded-xl text-xs font-medium text-muted-foreground whitespace-nowrap transition-colors">Pending</button>
                        </div>
                    </div>

                    {/* Listings Table/Grid */}
                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl">
                        {isLoading ? (
                            <div className="p-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-sm font-medium text-muted-foreground">Loading your items...</p>
                            </div>
                        ) : listings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border bg-accent/30 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                                            <th className="px-6 py-4">Title & Category</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Analytics</th>
                                            <th className="px-6 py-4">Created Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {listings.map((item) => (
                                            <tr key={item.id} className="hover:bg-accent/20 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                                            {getCategoryIcon(item.category)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold group-hover:text-primary transition-colors">{item.title}</div>
                                                            <div className="text-[10px] text-muted-foreground capitalize">{item.category}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {getStatusBadge(item.status)}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1 text-xs font-medium">
                                                            <Eye className="w-3.5 h-3.5 text-blue-500" />
                                                            {item.views.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all" title="Edit">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all" title="Delete">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 hover:bg-accent rounded-lg transition-all">
                                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                                    <AlertCircle className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-lg">No listings found</h3>
                                <p className="text-muted-foreground text-sm mt-1">Start by creating your first post.</p>
                                <button
                                    onClick={() => router.push('/dashboard/create-listing')}
                                    className="mt-6 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all inline-flex items-center gap-2 hover:scale-105"
                                >
                                    <Plus className="w-4 h-4" />
                                    Post Your First Listing
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </DashboardShell>
        </div>
    );
}

function Loader2({ className }: { className: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
