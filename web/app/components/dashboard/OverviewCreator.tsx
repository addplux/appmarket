'use client';

import { BarChart3, Users, Activity, ExternalLink, Star, Eye, MessageSquare, ArrowUpRight, Plus } from 'lucide-react';

interface OverviewCreatorProps {
    type: 'app_creator' | 'hospitality' | 'university';
}

export default function OverviewCreator({ type }: OverviewCreatorProps) {
    const labels = {
        app_creator: { unit: 'Downloads', lead: 'Beta Users' },
        hospitality: { unit: 'Bookings', lead: 'Inquiries' },
        university: { unit: 'Enrollments', lead: 'Applicants' }
    };

    const currentLabels = labels[type] || labels.app_creator;

    return (
        <div className="p-6 space-y-6 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => window.location.href = '/dashboard/create-listing'} className="flex flex-col justify-center p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                            <Plus className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Create New</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Post a new {type.split('_')[0]}</div>
                        </div>
                    </div>
                </div>
                <StatCard
                    label="Total Visibility"
                    value="42.8k"
                    trend="+18%"
                    icon={<Eye className="w-4 h-4 text-primary" />}
                />
                <StatCard
                    label={`Total ${currentLabels.lead}`}
                    value="156"
                    trend="+12"
                    icon={<Users className="w-4 h-4 text-blue-500" />}
                />
                <StatCard
                    label="Avg Rating"
                    value="4.9"
                    trend="+0.1"
                    icon={<Star className="w-4 h-4 text-yellow-500" />}
                />
                <StatCard
                    label="Engagement"
                    value="24%"
                    trend="+5%"
                    icon={<Activity className="w-4 h-4 text-purple-500" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">Traffic & Interest Growth</h3>
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-2 px-2 h-48">
                        {[30, 40, 35, 55, 70, 60, 80, 75, 90, 85, 95, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${h * 0.5}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 flex flex-col">
                    <h3 className="font-semibold text-sm mb-4">Recent {currentLabels.lead}</h3>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <div className="font-medium text-xs">User_{i + 10}</div>
                                        <div className="text-[10px] text-muted-foreground">2 hours ago</div>
                                    </div>
                                </div>
                                <MessageSquare className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full py-2 text-xs font-bold text-foreground hover:bg-accent rounded-lg transition-colors border border-border">
                        Manage Leads
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, icon }: any) {
    return (
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-xs font-medium">{label}</span>
                {icon}
            </div>
            <div className="text-xl md:text-2xl font-bold">{value}</div>
            <div className="text-xs text-green-500 mt-1 flex items-center font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {trend} <span className="text-muted-foreground ml-1 font-normal opacity-70">growth</span>
            </div>
        </div>
    );
}
