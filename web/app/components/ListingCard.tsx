import Link from 'next/link';
import { Star } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    return (
        <Link href={`/listings/${listing.id}`} className="group">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all hover:translate-y-[-4px]">
                {/* Cover Image */}
                <div className="aspect-video relative overflow-hidden bg-slate-800">
                    {listing.image ? (
                        <img src={listing.image} alt={listing.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-700">No Image</div>
                    )}
                    {/* Logo overlay for apps */}
                    {listing.logo && (
                        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl border-2 border-slate-900 shadow-xl overflow-hidden bg-white">
                            <img src={listing.logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg group-hover:text-violet-400 transition-colors truncate pr-2">
                            {listing.title}
                        </h3>
                        <div className="flex items-center text-yellow-500 text-sm">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span>4.8</span>
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {listing.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Emerging App
                        </span>
                        <span className="text-violet-400 text-sm font-medium">View More</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
