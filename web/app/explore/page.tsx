import { Metadata } from 'next';
import ExploreContent from '../components/ExploreContent';
import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Explore Opportunities',
    description: 'Discover and invest in the next big thing across apps, hospitality, and education.',
};

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Initializing market...</p>
                </div>
            }>
                <ExploreContent />
            </Suspense>
            <Footer />
        </div>
    );
}
