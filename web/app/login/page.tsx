'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2 } from 'lucide-react';
import AuthInput from '../components/AuthInput';
import { login } from '../lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError('');
        setIsLoading(true);

        try {
            await login(formData);
            router.push('/');
        } catch (error: any) {
            if (error.response?.data) {
                const errorData = error.response.data;
                if (typeof errorData === 'object') {
                    setErrors(errorData);
                } else {
                    setGeneralError('Invalid credentials. Please try again.');
                }
            } else {
                setGeneralError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950" />

            <div className="relative w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold gradient-text">App Market</h1>
                    </Link>
                    <p className="mt-2 text-slate-400">Sign in to your account</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {generalError && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                                {generalError}
                            </div>
                        )}

                        <AuthInput
                            label="Email or Username"
                            type="text"
                            placeholder="Enter your email or username"
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            error={errors.username || errors.non_field_errors}
                            required
                        />

                        <AuthInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            icon={<Lock className="w-5 h-5" />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                                <input type="checkbox" className="mr-2 rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500" />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="text-violet-400 hover:text-violet-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Create one now
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="mt-8 text-center text-xs text-slate-500">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
