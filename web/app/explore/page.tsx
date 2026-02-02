'use client';

import { Metadata } from 'next';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import api from '../lib/api';
import { Listing, Category } from '../types';
import { useSearchParams } from 'next/navigation';

function ExploreContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [listings, setListings] = useState<Listing[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listingsRes, categoriesRes] = await Promise.all([
                    api.get('/listings/'),
                    api.get('/categories/')
                ]);
                // Filter only active listings for the marketplace
                setListings(listingsRes.data.filter((l: Listing) =>
                    l.is_active && l.status === 'active'
                ));
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const displayCategories = [
        { id: 'all', name: 'All' },
        ...categories.map(c => ({ id: c.slug, name: c.name }))
    ];

    const filteredListings = listings.filter(l => {
        const matchesCategory = activeCategory === 'all' ||
            categories.find(c => c.id === l.category)?.slug === activeCategory;
        const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Explore <span className="gradient-text">Opportunities</span></h1>
                        <p className="text-muted-foreground">Discover and invest in the next big thing.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-end">
                        <div className="relative flex-1 w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background/50 border border-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                            {displayCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-6 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                        ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20'
                                        : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Listings Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-muted-foreground animate-pulse">Scanning the market...</p>
                    </div>
                ) : filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-card/50 rounded-3xl border border-border border-dashed">
                        <p className="text-lg font-bold mb-2">No opportunities found</p>
                        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <Navbar />
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Initializing market...</p>
                <Footer />
            </div>
        }>
            <ExploreContent />
        </Suspense>
    );
}
