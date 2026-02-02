'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-full border border-border bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm transition-colors flex items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === 'dark' ? 1 : 0,
                    rotate: theme === 'dark' ? 0 : 90,
                    opacity: theme === 'dark' ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon className="h-5 w-5 text-violet-400" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === 'light' ? 1 : 0,
                    rotate: theme === 'light' ? 0 : -90,
                    opacity: theme === 'light' ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Sun className="h-5 w-5 text-orange-500" />
            </motion.div>
        </button>
    );
}
