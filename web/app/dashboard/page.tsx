'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredUser, isAuthenticated } from '../lib/auth';
import Navbar from '../components/Navbar';
import DashboardShell from '../components/dashboard/DashboardShell';
import OverviewInvestor from '../components/dashboard/OverviewInvestor';
import OverviewCreator from '../components/dashboard/OverviewCreator';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Protect the route
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        const userData = getStoredUser();
        setUser(userData);
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const renderOverview = () => {
        switch (user?.user_type) {
            case 'investor':
                return <OverviewInvestor />;
            case 'app_creator':
            case 'hospitality':
            case 'university':
                return <OverviewCreator type={user.user_type} />;
            default:
                // Default to creator view for now as a generic placeholder
                return <OverviewCreator type="app_creator" />;
        }
    };

    const getRoleName = () => {
        switch (user?.user_type) {
            case 'investor': return 'Investor';
            case 'app_creator': return 'App Creator';
            case 'hospitality': return 'Hospitality Partner';
            case 'university': return 'University Partner';
            default: return 'User';
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <DashboardShell user={user}>
                <div className="p-8">
                    <div className="max-w-7xl mx-auto mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">
                                {getRoleName()} Console
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold">Welcome back, <span className="gradient-text">{user?.username}</span></h1>
                        <p className="text-muted-foreground mt-2">Here is a summary of your activity and performance tracking.</p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        {renderOverview()}
                    </div>
                </div>
            </DashboardShell>
        </div>
    );
}
