import { useEffect, useState } from 'react';
import { BarChart3, Users, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, Loader2, ExternalLink } from 'lucide-react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function OverviewInvestor() {
    const router = useRouter();
    const [interests, setInterests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await api.get('/interests/');
                setInterests(response.data);
            } catch (error) {
                console.error('Error fetching interests:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterests();
    }, []);

    if (isLoading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-muted-foreground">Analyzing portfolio...</p>
            </div>
        );
    }

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
                    label="Total Interests"
                    value={interests.length.toString()}
                    trend={`+${interests.length}`}
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
                    <h3 className="font-semibold text-sm mb-4">Your Recent Interests</h3>
                    <div className="space-y-3">
                        {interests.length > 0 ? interests.slice(0, 3).map((interest, i) => (
                            <div
                                key={interest.id}
                                onClick={() => router.push(`/listings/${interest.listing}`)}
                                className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                                        ID
                                    </div>
                                    <div>
                                        <div className="font-medium text-xs">Listing #{interest.listing}</div>
                                        <div className="text-[10px] text-muted-foreground">{interest.status} • {new Date(interest.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-primary" />
                            </div>
                        )) : (
                            <div className="py-8 text-center bg-accent/30 rounded-xl border border-dashed border-border">
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">No interests yet</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => router.push('/explore')}
                        className="mt-4 w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors border border-primary/20"
                    >
                        Explore Opportunities
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
