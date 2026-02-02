'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft, Loader2, Plus, X, Upload,
    ArrowRight, Check, Laptop, Building2, GraduationCap,
    Image as ImageIcon, FileCode, Info, ListChecks
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import DashboardShell from '../../components/dashboard/DashboardShell';
import { getStoredUser } from '../../lib/auth';
import AuthInput from '../../components/AuthInput';

export default function CreateListingPage() {
    const router = useRouter();
    const user = getStoredUser();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        how_it_works: '',
        price: '0.00',
        features: '',
        video_url: '',
        external_link: '',
    });

    const [files, setFiles] = useState({
        image: null as File | null,
        logo: null as File | null,
        apk_file: null as File | null,
        screenshots: [] as File[],
    });

    const categories = [
        { id: 'app', label: 'Emerging App', icon: <Laptop className="w-4 h-4" /> },
        { id: 'hotel', label: 'Hotel', icon: <Building2 className="w-4 h-4" /> },
        { id: 'lodge', label: 'Lodge', icon: <Building2 className="w-4 h-4" /> },
        { id: 'apartment', label: 'Apartment', icon: <Building2 className="w-4 h-4" /> },
        { id: 'university', label: 'University', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'college', label: 'College', icon: <GraduationCap className="w-4 h-4" /> },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Implementation logic for form submission with FormData
        // For now, simulating success
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, label: 'Basics', icon: <Info className="w-4 h-4" /> },
        { id: 2, label: 'Details', icon: <ListChecks className="w-4 h-4" /> },
        { id: 3, label: 'Media', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 4, label: 'Files', icon: <FileCode className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <DashboardShell user={user}>
                <div className="p-8 max-w-4xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Back to Items</span>
                            </button>
                            <h1 className="text-3xl font-bold">Create New <span className="gradient-text">Listing</span></h1>
                            <p className="text-muted-foreground mt-2">Set up your new listing on the App Market.</p>
                        </div>

                        {/* Progress */}
                        <div className="hidden md:flex items-center gap-4 bg-card/50 border border-border p-2 rounded-2xl">
                            {steps.map((s) => (
                                <div key={s.id} className="flex items-center">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${step === s.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : step > s.id
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                        }`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${step >= s.id ? 'border-current' : 'border-muted-foreground'
                                            }`}>
                                            {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                                        </div>
                                        <span className="text-xs font-bold whitespace-nowrap">{s.label}</span>
                                    </div>
                                    {s.id < steps.length && (
                                        <div className="w-4 h-[1px] bg-border mx-1" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <AuthInput
                                                label="Listing Title"
                                                type="text"
                                                placeholder="e.g. HealthTracker AI"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                            />
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Category</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {categories.map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, category: cat.id })}
                                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${formData.category === cat.id
                                                                    ? 'bg-primary/10 border-primary text-primary'
                                                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                                                                }`}
                                                        >
                                                            {cat.icon}
                                                            <span className="text-xs font-bold">{cat.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <AuthInput
                                                label="Price (USD)"
                                                type="number"
                                                placeholder="0.00 for free"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                required
                                            />
                                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                                <div className="flex items-center gap-3 text-primary mb-2">
                                                    <Info className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Note</span>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                    Basic info helps users identify your listing quickly. Use a clear and descriptive title.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Description</label>
                                            <textarea
                                                className="w-full bg-card/50 border border-border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[120px]"
                                                placeholder="Describe your listing in detail..."
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">How it works</label>
                                            <textarea
                                                className="w-full bg-card/50 border border-border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                                                placeholder="Workflow or usage instructions..."
                                                value={formData.how_it_works}
                                                onChange={(e) => setFormData({ ...formData, how_it_works: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Features (one per line)</label>
                                            <textarea
                                                className="w-full bg-card/50 border border-border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                                                placeholder="Feature 1&#10;Feature 2..."
                                                value={formData.features}
                                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium block">Logo / Icon</label>
                                            <div className="border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-card/30 group">
                                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary">Upload Logo</p>
                                                <p className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG up to 1MB</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium block">Cover Image</label>
                                            <div className="border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-card/30 group h-full">
                                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-secondary">Upload Cover</p>
                                                <p className="text-[10px] text-muted-foreground/60 mt-1">16:9 recommended</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium block">Screenshots</label>
                                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                                                    <Plus className="w-6 h-6" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium block">Upload APK (Optional)</label>
                                            <div className="border border-border rounded-2xl p-6 flex flex-col items-center justify-center bg-card/30">
                                                <FileCode className="w-8 h-8 text-muted-foreground mb-3" />
                                                <p className="text-xs font-medium mb-4">Drop your APK here or browse</p>
                                                <button type="button" className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors">
                                                    Select File
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <AuthInput
                                                label="External Download Link"
                                                type="url"
                                                placeholder="https://..."
                                                value={formData.external_link}
                                                onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                                            />
                                            <AuthInput
                                                label="Demo Video URL"
                                                type="url"
                                                placeholder="YouTube or Vimeo link"
                                                value={formData.video_url}
                                                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 text-yellow-500 mb-2">
                                            <Check className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Final Check</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            By submitting this listing, you agree that your content adheres to our community guidelines.
                                            Our team will review your submission before it goes live.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8 border-t border-border flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${step === 1
                                            ? 'opacity-0 pointer-events-none'
                                            : 'bg-accent text-foreground hover:bg-accent/80'
                                        }`}
                                >
                                    Previous
                                </button>

                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-8 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        Next Step
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-10 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Listing
                                                <Check className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardShell>
        </div>
    );
}
