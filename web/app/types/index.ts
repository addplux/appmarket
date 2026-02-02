export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Screenshot {
    id: number;
    image: string;
    caption: string;
}

export interface Listing {
    id: number;
    owner: string;
    category: number | null;
    screenshots: Screenshot[];
    title: string;
    description: string;
    how_it_works: string;
    image: string | null;
    logo: string | null;
    video_url: string;
    external_link: string;
    apk_file: string | null;
    price: string;
    features: string;
    status: 'pending' | 'active' | 'rejected';
    created_at: string;
    is_active: boolean;
}
