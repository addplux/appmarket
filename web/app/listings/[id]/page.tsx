'use client';

import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Star, Download, TrendingUp, Shield, Globe, MessageSquare, Clock } from 'lucide-react';
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
        category: 1, // Added category ID for logic
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
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Listing Image Placeholder */}
                            <div className="w-full md:w-1/3 aspect-video bg-muted rounded-xl flex items-center justify-center">
                                <span className="text-muted-foreground font-medium">Image Preview</span>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${listing.category === 1 ? 'bg-blue-500/10 text-blue-500' :
                                        listing.category === 2 ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-green-500/10 text-green-500'
                                        }`}>
                                        {listing.category === 1 ? 'App' : listing.category === 2 ? 'Hotel' : 'University'}
                                    </span>
                                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> 2 days ago
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{listing.title}</h1>
                                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                    {listing.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full md:w-48 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Invest Now
                                    </button>
                                    <button className="w-full md:w-48 bg-transparent border border-border hover:bg-accent text-foreground font-bold py-3 rounded-full flex items-center justify-center transition-colors">
                                        Contact Developer
                                    </button>
                                </div>
                            </div>
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
                                <div key={shot.id} className="min-w-[280px] md:min-w-[320px] aspect-[9/16] bg-muted border border-border rounded-2xl flex items-center justify-center snap-start">
                                    <span className="text-muted-foreground">{shot.caption}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold mb-4">Description</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {listing.description}
                                </p>
                            </section>

                            <section className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                                <h3 className="text-2xl font-bold mb-6">How it Works</h3>
                                <div className="space-y-6">
                                    {listing.how_it_works.split('\n').map((step, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <p className="text-muted-foreground">{step.replace(/^\d\.\s/, '')}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Info */}
                        <div className="space-y-8">
                            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
                                <h4 className="font-bold mb-4">Information</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Developer</span>
                                        <span className="font-medium">{listing.owner}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Category</span>
                                        <span className="font-medium">{listing.category_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Website</span>
                                        <a href={listing.external_link} className="text-primary hover:underline">Link</a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary/10 to-indigo-600/10 border border-primary/20 p-6 rounded-3xl">
                                <h4 className="font-bold mb-3 flex items-center text-primary">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Investment Opportunity
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4 font-medium italic">
                                    "EcoTrack is currently seeking partners for their Series A funding."
                                </p>
                                <button className="w-full bg-background text-foreground border border-border font-bold py-3 rounded-xl hover:bg-accent transition-colors">
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
