'use client';

import { BarChart3, Users, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';

export default function OverviewInvestor() {
    return (
        <div className="p-6 space-y-6 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Portfolio Value"
                    value="$245,000"
                    trend="+12.5%"
                    trendUp={true}
                    icon={<Wallet className="w-4 h-4 text-primary" />}
                />
                <StatCard
                    label="Total Invested"
                    value="$180,000"
                    trend="+5.2%"
                    trendUp={true}
                    icon={<Briefcase className="w-4 h-4 text-blue-500" />}
                />
                <StatCard
                    label="Pending ROI"
                    value="$12,400"
                    trend="-2.1%"
                    trendUp={false}
                    icon={<TrendingUp className="w-4 h-4 text-green-500" />}
                />
                <StatCard
                    label="Active Deals"
                    value="8"
                    trend="+2"
                    trendUp={true}
                    icon={<Users className="w-4 h-4 text-purple-500" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">Portfolio Performance</h3>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Last 12 Months</div>
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-2 px-2 h-48">
                        {[40, 45, 55, 50, 65, 75, 70, 85, 90, 80, 95, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${h * 0.7}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 flex flex-col">
                    <h3 className="font-semibold text-sm mb-4">New Opportunities</h3>
                    <div className="space-y-3">
                        {['HealthTech AI', 'EcoStay Lodge', 'Global Edu Portal'].map((app, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                        {app[0]}
                                    </div>
                                    <div>
                                        <div className="font-medium text-xs">{app}</div>
                                        <div className="text-[10px] text-muted-foreground">App • High ROI</div>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-primary" />
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors border border-primary/20">
                        Browse More
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, trendUp, icon }: any) {
    return (
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-xs font-medium">{label}</span>
                {icon}
            </div>
            <div className="text-xl md:text-2xl font-bold">{value}</div>
            <div className={`text-xs mt-1 flex items-center font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {trend} <span className="text-muted-foreground ml-1 font-normal opacity-70">this period</span>
            </div>
        </div>
    );
}
