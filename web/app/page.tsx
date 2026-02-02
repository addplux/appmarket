import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />

      {/* Categories Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Find the perfect investment opportunity or service in our diverse catalog.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Emerging Apps', 'Hotels & Lodges', 'Universities'].map((cat, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {/* Icon placeholder */}
                  <div className="w-6 h-6 bg-current rounded-full opacity-20" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cat}</h3>
                <p className="text-muted-foreground text-sm">Discover top-rated {cat.toLowerCase()} with high growth potential.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
