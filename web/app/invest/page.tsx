import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InvestContent from '../components/InvestContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invest in Emerging Assets',
    description: 'Direct access to high-yield opportunities in apps, hospitality, and education.',
};

export default function InvestPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <InvestContent />
            <Footer />
        </main>
    );
}
