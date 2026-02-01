'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative overflow-hidden pt-32 pb-16 md:pb-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm">
                        Discover the Future of Apps & Hospitality
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Invest in <span className="gradient-text">Emerging</span><br />
                        Opportunities
                    </h1>
                    <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        The premier marketplace for discovering, rating, and investing in the next generation of applications, hotels, and educational institutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/explore" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-full transition-all shadow-lg shadow-violet-900/20">
                            Browse Listings
                        </Link>
                        <Link href="/invest" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700 group">
                            Start Investing
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Abstract standard UI representation without image gen for speed */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-16 relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-violet-900/20 border border-slate-800 bg-slate-900/50 backdrop-blur-sm group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-slate-600 text-lg">[Dynamic App Dashboard Preview]</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
