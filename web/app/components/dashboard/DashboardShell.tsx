'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, PieChart, Users, Activity, Settings, Search, Bell, Menu, X, Laptop, Building2, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardShell({ children, user }: { children: React.ReactNode, user: any }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" />, href: '/dashboard' },
        { id: 'analytics', label: 'Traffic & Views', icon: <PieChart className="w-4 h-4" />, href: '#' },
        { id: 'leads', label: 'Leads & Interest', icon: <Users className="w-4 h-4" />, href: '#' },
        { id: 'listings', label: 'My Listings', icon: <Activity className="w-4 h-4" />, href: '/dashboard/listings' },
    ];

    const getRoleIcon = () => {
        switch (user?.user_type) {
            case 'app_creator': return <Laptop className="w-4 h-4" />;
            case 'hospitality': return <Building2 className="w-4 h-4" />;
            case 'university': return <GraduationCap className="w-4 h-4" />;
            default: return <div className="w-4 h-4 rounded-full bg-primary" />;
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/30 backdrop-blur-sm">
                <div className="flex-1 py-6 space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.id} className="px-4">
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                    ? 'bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-border">
                    <Link
                        href="/settings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/settings'
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            }`}
                    >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Internal Dash Header */}
                <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-card/30">
                    <div className="flex items-center text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-lg w-full max-w-md">
                        <Search className="w-4 h-4 mr-2" />
                        <input
                            type="text"
                            placeholder="Search your metrics..."
                            className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <button className="p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                        </button>
                        <div className="flex items-center gap-2 pl-2 border-l border-border">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20 uppercase">
                                {user?.username?.[0]}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
