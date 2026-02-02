'use client';

import Link from 'next/link';
import { BarChart3, Users, CreditCard, Activity, Search, Bell, Settings, Home, PieChart, Wallet } from 'lucide-react';

export function HeroDashboardPreview() {
    return (
        <div className="w-full h-full bg-background flex text-xs md:text-sm overflow-hidden select-none">
            {/* Sidebar */}
            <div className="w-16 md:w-64 border-r border-border flex flex-col bg-card/50 hidden sm:flex">
                <div className="h-14 flex items-center px-4 md:px-6 border-b border-border">
                    <div className="w-6 h-6 rounded bg-primary flex-shrink-0"></div>
                    <span className="ml-3 font-bold hidden md:block">DevConsole</span>
                </div>
                <div className="flex-1 py-4 space-y-1">
                    <div className="px-3 md:px-4">
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20">
                            <Home className="w-4 h-4" />
                            <span className="font-medium hidden md:block">Overview</span>
                        </Link>
                    </div>
                    {/* ... other items (mock for now) ... */}
                    <div className="px-3 md:px-4">
                        <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors cursor-default">
                            <PieChart className="w-4 h-4" />
                            <span className="hidden md:block">Traffic & Views</span>
                        </div>
                    </div>
                    <div className="px-3 md:px-4">
                        <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors cursor-default">
                            <Users className="w-4 h-4" />
                            <span className="hidden md:block">Investors</span>
                        </div>
                    </div>
                    <div className="px-3 md:px-4">
                        <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors cursor-default">
                            <Activity className="w-4 h-4" />
                            <span className="hidden md:block">My Listings</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-border">
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        <span className="hidden md:block">Settings</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background/50">
                {/* Header */}
                <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-card/30">
                    <div className="flex items-center text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-md w-32 md:w-64">
                        <Search className="w-4 h-4 mr-2" />
                        <span className="text-xs">Search metrics...</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500"></div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="p-6 space-y-6 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-muted-foreground text-xs font-medium">Total Views</span>
                                <Activity className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold">128.4k</div>
                            <div className="text-xs text-green-500 mt-1 flex items-center font-medium">
                                +14.2% <span className="text-muted-foreground ml-1 font-normal">this week</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-muted-foreground text-xs font-medium">Investor Leads</span>
                                <Users className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold">42</div>
                            <div className="text-xs text-green-500 mt-1 flex items-center font-medium">
                                +5 <span className="text-muted-foreground ml-1 font-normal">new inquiries</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-card shadow-sm hidden md:block">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-muted-foreground text-xs font-medium">Avg Rating</span>
                                <BarChart3 className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold">4.8</div>
                            <div className="text-xs text-green-500 mt-1 flex items-center font-medium">
                                +0.2 <span className="text-muted-foreground ml-1 font-normal">from last month</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-card shadow-sm hidden md:block">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-muted-foreground text-xs font-medium">Traffic Rank</span>
                                <Activity className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold">#142</div>
                            <div className="text-xs text-green-500 mt-1 flex items-center font-medium">
                                Top 5% <span className="text-muted-foreground ml-1 font-normal">in category</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area Integration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48 md:h-64">
                        <div className="md:col-span-2 rounded-xl border border-border bg-card p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm">Engagement Growth</h3>
                            </div>
                            <div className="flex-1 flex items-end justify-between gap-2 px-2">
                                {[35, 45, 40, 60, 75, 55, 65, 85, 60, 50, 80, 65].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${h * (i > 8 ? 0.8 : 0.4)}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-sm">Recent Interest</h3>
                            </div>
                            <div className="space-y-3 mt-2">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300"></div>
                                            <div>
                                                <div className="font-medium text-xs">Venture Capital A</div>
                                                <div className="text-[10px] text-muted-foreground">Requested Pitch Deck</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-primary font-medium">View</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
