'use client';

import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Star, Download, TrendingUp, Shield, Globe, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import InvestmentModal from '../../components/InvestmentModal';

export default function ListingDetailPage() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for detail view
    const listing = {
        id: 1,
        title: "EcoTrack",
        description: "EcoTrack is a revolutionary sustainability platform designed to help individuals and businesses measure, understand, and reduce their environmental impact. By providing real-time data on carbon emissions and offering personalized recommendations, we empower everyone to take meaningful climate action.",
        how_it_works: "1. Connect your utility bills and vehicle data.\n2. We analyze your consumption patterns using advanced AI models.\n3. Receive weekly carbon footprint reports and tailored sustainability tips.\n4. Join community challenges and earn rewards for reducing emissions.",
        logo: null,
        owner: "DevTeam1",
        category_name: "Emerging App",
        rating: 4.8,
        reviews: 124,
        investors: 12,
        screenshots: [
            { id: 1, image: null, caption: "Dashboard" },
            { id: 2, image: null, caption: "Eco Tips" },
            { id: 3, image: null, caption: "Community" }
        ],
        external_link: "https://example.com"
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section (App Store Style) */}
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-12">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                            <span className="text-slate-200 text-5xl font-bold">ET</span>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">{listing.category_name}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{listing.title}</h1>
                            <div className="flex flex-wrap gap-6 items-center text-slate-400">
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-2" />
                                    <span className="text-slate-100 font-bold">{listing.rating}</span>
                                    <span className="ml-1">({listing.reviews} Reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                                    <span className="text-slate-100 font-bold">{listing.investors}</span>
                                    <span className="ml-1">Active Investors</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <button className="w-full md:w-48 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-full flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" /> Get App
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full md:w-48 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold py-3 rounded-full flex items-center justify-center transition-colors"
                            >
                                <Shield className="w-5 h-5 mr-2" /> Invest Now
                            </button>
                        </div>
                    </div>

                    <InvestmentModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        listingTitle={listing.title}
                    />

                    {/* Screenshot Gallery (Horizontal Scroll) */}
                    <div className="mb-16">
                        <h3 className="text-xl font-bold mb-6">Gallery</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            {listing.screenshots.map((shot) => (
                                <div key={shot.id} className="min-w-[280px] md:min-w-[320px] aspect-[9/16] bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center snap-start">
                                    <span className="text-slate-700">{shot.caption}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold mb-4">Description</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {listing.description}
                                </p>
                            </section>

                            <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                                <h3 className="text-2xl font-bold mb-6">How it Works</h3>
                                <div className="space-y-6">
                                    {listing.how_it_works.split('\n').map((step, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <p className="text-slate-300">{step.replace(/^\d\.\s/, '')}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Info */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                                <h4 className="font-bold mb-4">Information</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Developer</span>
                                        <span className="text-slate-200">{listing.owner}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Category</span>
                                        <span className="text-slate-200">{listing.category_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Website</span>
                                        <a href={listing.external_link} className="text-violet-400 hover:underline">Link</a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 p-6 rounded-3xl">
                                <h4 className="font-bold mb-3 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-violet-400" />
                                    Investment Opportunity
                                </h4>
                                <p className="text-sm text-slate-300 mb-4 font-medium italic">
                                    "EcoTrack is currently seeking partners for their Series A funding."
                                </p>
                                <button className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                                    View Pitch Deck
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
