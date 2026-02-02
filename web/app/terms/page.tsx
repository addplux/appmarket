'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of <span className="gradient-text">Service</span></h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground">
                                By accessing or using the AppMarket platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                            <p className="text-muted-foreground mb-4">
                                AppMarket is a marketplace connecting developers and businesses ("Creators") with potential investors ("Investors") and users. We provide a platform for showcasing applications, hotels, and educational institutions.
                            </p>
                            <p className="text-muted-foreground">
                                <strong>Disclaimer:</strong> AppMarket facilitates introductions and information exchange. We do not provide financial advice, and we are not a registered broker-dealer or investment advisor.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                <li>You must provide accurate and complete information during registration.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>You must be at least 18 years old to use the investment features of the Platform.</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">4. Content and Conduct</h2>
                            <p className="text-muted-foreground mb-4">
                                Creators retain ownership of the content they upload. By posting content, you grant AppMarket a license to display and promote it on the Platform.
                            </p>
                            <p className="text-muted-foreground">
                                You agree not to upload content that is illegal, infringing, or harmful. We reserve the right to remove any listing at our discretion.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">5. Investments and Risks</h2>
                            <p className="text-muted-foreground">
                                All investments carry risk, including the potential loss of capital. AppMarket is not responsible for the performance or outcome of any investment made through connections found on the Platform. Users should conduct their own due diligence.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We may modify these terms at any time. Continued use of the Platform constitutes acceptance of the updated terms.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
