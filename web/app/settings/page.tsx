'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { User, Shield, CheckCircle, CreditCard, Camera, Loader2, Save } from 'lucide-react';
import { getStoredUser, isAuthenticated } from '../lib/auth';

type SettingsTab = 'profile' | 'security' | 'verification' | 'billing';

export default function SettingsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        setUser(getStoredUser());
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
        { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
        { id: 'verification', label: 'Verification', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Account <span className="gradient-text">Settings</span></h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Tabs */}
                        <aside className="w-full md:w-64 flex flex-col gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                            : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Content Area */}
                        <div className="flex-1 bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8">
                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                                {user?.username?.[0]?.toUpperCase()}
                                            </div>
                                            <button className="absolute bottom-0 right-0 p-2 bg-background border border-border rounded-full shadow-lg hover:bg-accent transition-colors">
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{user?.username}</h3>
                                            <p className="text-muted-foreground text-sm">{user?.email}</p>
                                            <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">
                                                {user?.user_type || 'Regular User'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <input type="text" defaultValue={user?.first_name} className="w-full h-11 bg-background/50 border border-border rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <input type="text" defaultValue={user?.last_name} className="w-full h-11 bg-background/50 border border-border rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <label className="text-sm font-medium">Bio</label>
                                            <textarea rows={4} placeholder="Tell us something about your showcase activity..." className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Password</h3>
                                        <p className="text-muted-foreground text-sm">Update your password to keep your account secure.</p>
                                    </div>

                                    <div className="space-y-6 max-w-md">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Current Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full h-11 bg-background/50 border border-border rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full h-11 bg-background/50 border border-border rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Confirm New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full h-11 bg-background/50 border border-border rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                    </div>

                                    <div className="flex justify-start pt-4">
                                        <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'verification' && (
                                <div className="space-y-8">
                                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center gap-6">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-xl font-bold mb-1">KYC Verification</h3>
                                            <p className="text-muted-foreground text-sm">Get verified to unlock investment opportunities and premium showcase features.</p>
                                        </div>
                                        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all">
                                            Verify Identity
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-border bg-accent/30">
                                            <h4 className="font-bold mb-2 text-sm">Status</h4>
                                            <div className="flex items-center gap-2 text-yellow-500 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                                Unverified
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-border bg-accent/30">
                                            <h4 className="font-bold mb-2 text-sm">Verification Level</h4>
                                            <div className="text-muted-foreground font-medium">Level 0 (Basic Account)</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Payment & Payouts</h3>
                                        <p className="text-muted-foreground text-sm">Manage your billing information and connected payout accounts.</p>
                                    </div>

                                    <div className="p-8 rounded-2xl border-2 border-dashed border-border flex flex-col items-center text-center space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-muted-foreground">
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold">No payment methods yet</p>
                                            <p className="text-muted-foreground text-sm">Add a card or connect a bank account to get started.</p>
                                        </div>
                                        <button className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all">
                                            Add Method
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
