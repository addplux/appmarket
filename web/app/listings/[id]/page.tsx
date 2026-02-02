'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Star, Download, TrendingUp, Shield, Globe, MessageSquare, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import InvestmentModal from '../../components/InvestmentModal';
import api from '../../lib/api';
import { Listing } from '../../types';

export default function ListingDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listing, setListing] = useState<Listing | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/listings/${id}/`);
                setListing(response.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchListing();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse font-medium">Loading details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-3xl font-bold mb-4">Listing Not Found</h2>
                    <p className="text-muted-foreground mb-8">The opportunity you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => router.push('/explore')} className="bg-primary text-white px-8 py-3 rounded-full font-bold">Back to Explore</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <button onClick={() => router.push('/explore')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Marketplace</span>
                    </button>

                    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                            {/* Listing Image */}
                            <div className="w-full md:w-1/3 aspect-video bg-muted rounded-2xl flex items-center justify-center overflow-hidden border border-border shadow-inner">
                                {listing.image ? (
                                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Globe className="w-10 h-10 opacity-20" />
                                        <span className="text-sm font-medium">No Preview Available</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Verified Listing
                                    </span>
                                    <span className="text-muted-foreground text-xs font-medium flex items-center gap-1.5 bg-accent/50 px-3 py-1.5 rounded-full">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(listing.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{listing.title}</h1>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl">
                                    {listing.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full sm:w-auto px-10 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-primary/25 hover:scale-105 active:scale-95"
                                    >
                                        Express Interest
                                    </button>
                                    {listing.external_link && (
                                        <a
                                            href={listing.external_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto px-10 bg-transparent border border-border hover:bg-accent text-foreground font-bold py-4 rounded-2xl flex items-center justify-center transition-all"
                                        >
                                            Visit Project
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <InvestmentModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        listingTitle={listing.title}
                        listingId={listing.id}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {listing.screenshots && listing.screenshots.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                                        Showcase
                                    </h3>
                                    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                                        {listing.screenshots.map((shot) => (
                                            <div key={shot.id} className="min-w-[300px] md:min-w-[400px] aspect-video bg-muted border border-border rounded-3xl overflow-hidden snap-start shadow-lg">
                                                <img src={shot.image} alt={shot.caption} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
                                <h3 className="text-2xl font-bold mb-8">How it Works</h3>
                                <div className="space-y-8">
                                    {listing.how_it_works ? (
                                        listing.how_it_works.split('\n').map((step, idx) => (
                                            <div key={idx} className="flex gap-6 items-start">
                                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 border border-primary/20 shadow-sm">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-muted-foreground text-lg py-1">{step.replace(/^\d\.\s/, '')}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground italic">No implementation steps provided.</p>
                                    )}
                                </div>
                            </section>

                            {listing.features && (
                                <section>
                                    <h3 className="text-2xl font-bold mb-8">Key Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {listing.features.split('\n').map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 bg-accent/30 rounded-2xl border border-border">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                <span className="font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar / Info */}
                        <div className="space-y-8">
                            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm">
                                <h4 className="font-bold text-xl mb-6">Details</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground font-medium">Owner</span>
                                        <span className="font-bold text-primary">{listing.owner}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground font-medium">Price</span>
                                        <span className="font-bold text-lg">
                                            {listing.price && parseFloat(listing.price) > 0 ? `$${listing.price}` : 'Free / TBA'}
                                        </span>
                                    </div>
                                    <div className="pt-6 border-t border-border mt-6">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                            <Shield className="w-3.5 h-3.5" />
                                            Platform Protection
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            All listings undergo a rigorous verification process before being listed on the App Market to ensure investor security.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden group">
                                <TrendingUp className="absolute -bottom-8 -right-8 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                                <h4 className="font-bold text-xl mb-3 flex items-center relative z-10">
                                    Early Access
                                </h4>
                                <p className="text-indigo-100 text-sm mb-6 leading-relaxed relative z-10">
                                    Join the early bird list to get exclusive updates and preferential terms for this opportunity.
                                </p>
                                <button className="w-full bg-white text-indigo-700 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-colors relative z-10 shadow-lg">
                                    Request Pitch Deck
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
