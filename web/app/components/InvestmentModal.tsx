'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Send } from 'lucide-react';
import api from '../lib/api';

interface InvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    listingTitle: string;
    listingId: number;
}

export default function InvestmentModal({ isOpen, onClose, listingTitle, listingId }: InvestmentModalProps) {
    const [amount, setAmount] = useState<number | ''>('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await api.post('/interests/', {
                listing: listingId,
                message: `Investment Amount: $${amount}. ${message}`,
            });
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setAmount('');
                setMessage('');
            }, 2500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send interest request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-card border border-border rounded-2xl shadow-2xl p-6 w-full max-w-lg z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold mb-2">Invest in {listingTitle}</h2>
                <p className="text-muted-foreground text-sm mb-6">Enter your investment details below to proceed.</p>

                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold mb-2">Request Sent!</h4>
                        <p className="text-muted-foreground">The developer will review your investment proposal and contact you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">Investment Amount (USD)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <input
                                    type="number"
                                    min="100"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    placeholder="e.g. 10000"
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">Message (Optional)</label>
                            <textarea
                                rows={3}
                                placeholder="Any questions or comments?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Sending Request...' : 'Submit Proposal'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
