import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold gradient-text">App Market</h3>
                        <p className="text-muted-foreground text-sm">
                            Connecting visionaries with investors. The future of digital and physical assets functionality.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/explore" className="hover:text-primary transition-colors">Browse Apps</Link></li>
                            <li><Link href="/explore?category=hotel" className="hover:text-primary transition-colors">Hotels & Lodges</Link></li>
                            <li><Link href="/explore?category=university" className="hover:text-primary transition-colors">Universities</Link></li>
                            <li><Link href="/invest" className="hover:text-primary transition-colors">Invest</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} App Market. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
