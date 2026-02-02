import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invest in Emerging Assets',
    description: 'Direct access to high-yield opportunities in apps, hospitality, and education.',
};
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Search, MessageSquare, Handshake } from 'lucide-react';
import Link from 'next/link';

export default function InvestPage() {
    const steps = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Discover Opportunities",
            description: "Browse through hundreds of vetted applications, hotel chains, and educational institutions."
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Connect with Creators",
            description: "Use our secure platform to express interest and start direct conversations with asset owners."
        },
        {
            icon: <Handshake className="w-6 h-6" />,
            title: "Facilitate Growth",
            description: "Finalize partnerships and monitor your portfolio performance directly from your dashboard."
        }
    ];

    const benefits = [
        {
            icon: <ShieldCheck className="text-green-500" />,
            title: "Verified Assets",
            description: "Every listing goes through a multi-step verification process to ensure transparency."
        },
        {
            icon: <TrendingUp className="text-blue-500" />,
            title: "High Growth Potential",
            description: "Focus on emerging markets and early-stage digital assets with scalable models."
        },
        {
            icon: <Zap className="text-amber-500" />,
            title: "Instant Lead Flow",
            description: "Real-time notifications when creators respond to your investment interest."
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.1),transparent_50%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Smart Capital for <span className="gradient-text">Emerging</span><br />
                            Markets
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                            Join elite investors who are shaping the future of digital and physical infrastructure. AppMarket provides direct access to high-yield opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/explore" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/20">
                                Find Opportunities
                            </Link>
                            <Link href="/register" className="bg-card border border-border hover:bg-accent px-8 py-4 rounded-full font-bold text-lg transition-all">
                                Create Investor Account
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Process */}
            <section className="py-24 bg-accent/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How it Works</h2>
                        <p className="text-muted-foreground">A streamlined process from discovery to partnership.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative p-8 rounded-2xl bg-card border border-border group hover:border-primary/50 transition-all"
                            >
                                <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mt-4 mb-4">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Invest Here? */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-8">Why Invest via AppMarket?</h2>
                            <div className="space-y-8">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1">{benefit.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <div className="relative rounded-3xl overflow-hidden border border-border bg-card p-4">
                                <div className="bg-background rounded-2xl p-6 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Portfolio Balance</div>
                                            <div className="text-3xl font-bold">$245,600.00</div>
                                        </div>
                                        <TrendingUp className="text-green-500 w-10 h-10" />
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-xl border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-primary/20" />
                                                    <div className="h-4 w-24 bg-primary/20 rounded" />
                                                </div>
                                                <div className="h-4 w-12 bg-green-500/20 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] group-hover:scale-150 transition-transform duration-1000" />
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-8 relative z-10">
                            Ready to diversify your portfolio?
                        </h2>
                        <Link href="/explore" className="bg-white text-primary hover:bg-secondary px-10 py-5 rounded-full font-black text-xl transition-all shadow-2xl relative z-10 inline-flex items-center gap-2 group">
                            Start Exploring
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
