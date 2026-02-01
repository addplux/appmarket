'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { Search, Filter } from 'lucide-react';

// Temporary mock data for UI development
const MOCK_LISTINGS = [
    {
        id: 1,
        title: "EcoTrack",
        description: "The ultimate companion for tracking your carbon footprint and finding sustainable alternatives for everyday products.",
        image: null,
        logo: null,
        category: 1,
        owner: "DevTeam1",
        screenshots: [],
        how_it_works: "",
        video_url: "",
        external_link: "",
        created_at: "",
        is_active: true
    },
    {
        id: 2,
        title: "Azure Heights Lodge",
        description: "Experience luxury in the heart of nature. Our lodge offers breathtaking views and world-class amenities.",
        image: null,
        logo: null,
        category: 2,
        owner: "GreenStay",
        screenshots: [],
        how_it_works: "",
        video_url: "",
        external_link: "",
        created_at: "",
        is_active: true
    },
    {
        id: 3,
        title: "Nova University",
        description: "Join the next generation of innovators. Applications now open for our specialized engineering and tech programs.",
        image: null,
        logo: null,
        category: 3,
        owner: "NovaEdu",
        screenshots: [],
        how_it_works: "",
        video_url: "",
        external_link: "",
        created_at: "",
        is_active: true
    }
];

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'app', name: 'Apps' },
        { id: 'hotel', name: 'Hotels & Lodges' },
        { id: 'university', name: 'Educational' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
                    <p className="text-slate-400">Discover and invest in emerging opportunities across various sectors.</p>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search apps, hotels, universities..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                        ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/20'
                                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_LISTINGS.map((listing) => (
                        <ListingCard key={listing.id} listing={listing as any} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
