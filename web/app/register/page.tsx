'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, CheckCircle2, Laptop, Building2, GraduationCap, TrendingUp, User as RegularUser } from 'lucide-react';
import AuthInput from '../components/AuthInput';
import { register } from '../lib/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        user_type: 'individual',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const accountTypes = [
        { id: 'individual', label: 'Individual', icon: <RegularUser className="w-5 h-5" />, description: 'Browse and explore' },
        { id: 'investor', label: 'Investor', icon: <TrendingUp className="w-5 h-5" />, description: 'Fund emerging apps' },
        { id: 'app_creator', label: 'App Creator', icon: <Laptop className="w-5 h-5" />, description: 'Post your apps' },
        { id: 'hospitality', label: 'Hospitality', icon: <Building2 className="w-5 h-5" />, description: 'Post hotels/lodges' },
        { id: 'university', label: 'University', icon: <GraduationCap className="w-5 h-5" />, description: 'Post university' },
    ];

    const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError('');
        setIsLoading(true);

        try {
            await register(formData);
            router.push('/dashboard'); // Take them straight to their new dashboard
        } catch (error: any) {
            if (error.response?.data) {
                const errorData = error.response.data;
                if (typeof errorData === 'object') {
                    setErrors(errorData);
                } else {
                    setGeneralError('Registration failed. Please try again.');
                }
            } else {
                setGeneralError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            <div className="relative w-full max-w-xl">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold gradient-text">App Market</h1>
                    </Link>
                    <p className="mt-2 text-muted-foreground">Create your account</p>
                </div>

                {/* Register Form Card */}
                <div className="bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {generalError && (
                            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 text-destructive text-sm">
                                {generalError}
                            </div>
                        )}

                        {/* Account Type Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium">I want to...</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {accountTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, user_type: type.id })}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2 group ${formData.user_type === type.id
                                            ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5'
                                            : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg transition-colors ${formData.user_type === type.id ? 'bg-primary text-white' : 'bg-muted group-hover:bg-primary/20 group-hover:text-primary'
                                            }`}>
                                            {type.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold leading-none mb-1">{type.label}</div>
                                            <div className="text-[10px] opacity-70 leading-tight">{type.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {errors.user_type && <p className="text-xs text-destructive mt-1">{errors.user_type}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AuthInput
                                label="Username"
                                type="text"
                                placeholder="Choose a username"
                                icon={<User className="w-5 h-5" />}
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                error={errors.username}
                                required
                            />

                            <AuthInput
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                icon={<Mail className="w-5 h-5" />}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <AuthInput
                                    label="Password"
                                    type="password"
                                    placeholder="Create password"
                                    icon={<Lock className="w-5 h-5" />}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    error={errors.password}
                                    required
                                />
                                {formData.password && passwordStrength && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength.strength ? passwordStrength.color : 'bg-muted'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <AuthInput
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm password"
                                icon={<Lock className="w-5 h-5" />}
                                value={formData.password_confirm}
                                onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                                error={errors.password_confirm}
                                required
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 mr-2 rounded border-border bg-background text-primary focus:ring-primary"
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
