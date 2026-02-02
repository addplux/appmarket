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
                                className="w-full bg-background/50 border border-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                            {categories.map((cat) => (
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
                {activeCategory === 'all' ? (
                    <div className="space-y-16">
                        {/* Apps Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                                    Apps
                                </h2>
                                <button onClick={() => setActiveCategory('app')} className="text-primary hover:text-primary/80 font-medium text-sm">View All Apps</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {MOCK_LISTINGS.filter(l => l.category === 1).map((listing) => (
                                    <ListingCard key={listing.id} listing={listing as any} />
                                ))}
                            </div>
                        </section>

                        {/* Hotels Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
                                    Hotels & Lodges
                                </h2>
                                <button onClick={() => setActiveCategory('hotel')} className="text-primary hover:text-primary/80 font-medium text-sm">View All Hotels</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {MOCK_LISTINGS.filter(l => l.category === 2).map((listing) => (
                                    <ListingCard key={listing.id} listing={listing as any} />
                                ))}
                            </div>
                        </section>

                        {/* Universities Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="w-2 h-8 bg-green-500 rounded-full inline-block"></span>
                                    Educational
                                </h2>
                                <button onClick={() => setActiveCategory('university')} className="text-primary hover:text-primary/80 font-medium text-sm">View All Educational</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {MOCK_LISTINGS.filter(l => l.category === 3).map((listing) => (
                                    <ListingCard key={listing.id} listing={listing as any} />
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_LISTINGS.filter(l => {
                            if (activeCategory === 'app') return l.category === 1;
                            if (activeCategory === 'hotel') return l.category === 2;
                            if (activeCategory === 'university') return l.category === 3;
                            return true;
                        }).map((listing) => (
                            <ListingCard key={listing.id} listing={listing as any} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
