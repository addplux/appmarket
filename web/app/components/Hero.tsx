'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroDashboardPreview } from './HeroDashboardPreview';

export default function Hero() {
    return (
        <div className="relative overflow-hidden pt-32 pb-16 md:pb-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
                        Discover the Future of Apps & Hospitality
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Invest in <span className="gradient-text">Emerging</span><br />
                        Opportunities
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        The premier marketplace for discovering, rating, and investing in the next generation of applications, hotels, and educational institutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/explore" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all shadow-lg shadow-primary/20">
                            Browse Listings
                        </Link>
                        <Link href="/invest" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground bg-card hover:bg-accent rounded-full transition-all border border-border group">
                            Start Investing
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Dashboard Preview Component */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-16 relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-primary/5 border border-border bg-card/50 backdrop-blur-sm group select-none cursor-default"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-600/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
                    <HeroDashboardPreview />
                </motion.div>
            </div>
        </div>
    );
}
