import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold gradient-text">App Market</h3>
                        <p className="text-slate-400 text-sm">
                            Connecting visionaries with investors. The future of digital and physical assets functionality.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/explore" className="hover:text-violet-400 transition-colors">Browse Apps</Link></li>
                            <li><Link href="/explore?category=hotel" className="hover:text-violet-400 transition-colors">Hotels & Lodges</Link></li>
                            <li><Link href="/explore?category=university" className="hover:text-violet-400 transition-colors">Universities</Link></li>
                            <li><Link href="/invest" className="hover:text-violet-400 transition-colors">Invest</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-violet-400 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-violet-400 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-violet-400 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-violet-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-900/50 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} App Market. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
