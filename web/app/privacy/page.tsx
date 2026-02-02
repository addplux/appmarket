'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy <span className="gradient-text">Policy</span></h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                            <p className="text-muted-foreground mb-4">
                                We collect information you provide directly to us, including:
                            </p>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                <li>Account information (name, email, password)</li>
                                <li>Profile information (bio, photos, investment preferences)</li>
                                <li>Listing content (descriptions, images, videos)</li>
                                <li>Communications with other users</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-4">
                                We use the collected data to:
                            </p>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                <li>Operate and improve the AppMarket platform</li>
                                <li>Match investors with relevant opportunities</li>
                                <li>Process transactions and verify identities</li>
                                <li>Send service updates and promotional communications</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">3. Data Sharing</h2>
                            <p className="text-muted-foreground">
                                We do not sell your personal data. We share information only with:
                            </p>
                            <ul className="list-disc pl-5 text-muted-foreground mt-2 space-y-2">
                                <li><strong>Other Users:</strong> Public profile information and listing details are visible to other users.</li>
                                <li><strong>Service Providers:</strong> Third-party vendors who assist with hosting, analytics, and support.</li>
                                <li><strong>Legal Requirements:</strong> If required by law or to protect our rights.</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                            <p className="text-muted-foreground">
                                You have the right to access, update, or delete your personal information. You can manage your account settings directly through the dashboard or contact us for assistance.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have questions about this Privacy Policy, please contact us at support@appmarket.com.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
