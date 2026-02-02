'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState, InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export default function AuthInput({
    label,
    error,
    icon,
    type = 'text',
    className = '',
    ...props
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </div>
                )}
                <input
                    type={inputType}
                    className={`
            w-full px-4 py-3 bg-background/50 border rounded-lg
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all
            ${error ? 'border-destructive' : 'border-border'}
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${className}
          `}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
