import { lazy, useEffect } from 'react';
import { LenisProvider } from './hooks/useLenis';
import { ScrollTrigger } from './hooks/useGSAP';

// Eager — above the fold
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

// Global UX
import Cursor from './components/Cursor';
import NoiseOverlay from './components/NoiseOverlay';
import PageReveal from './components/PageReveal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import LazyMount from './components/LazyMount';

// Lazy — below the fold
const FeaturedCollections = lazy(() => import('./components/FeaturedCollections'));
const BestSellers = lazy(() => import('./components/BestSellers'));
const WhyChoose = lazy(() => import('./components/WhyChoose'));
const TrustSection = lazy(() => import('./sections/TrustSection'));
const BrandStory = lazy(() => import('./components/BrandStory'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Gallery = lazy(() => import('./components/Gallery'));
const FAQSection = lazy(() => import('./sections/FAQSection'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const FinalCTASection = lazy(() => import('./sections/FinalCTASection'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  // Recompute scroll-driven layouts once fonts/images settle
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <LenisProvider>
      <PageReveal />
      <NoiseOverlay />
      <Cursor />

      <div className="relative min-h-screen bg-cream text-ink">
        <AnnouncementBar />
        <Navbar />

        <main>
          <Hero />
          <Marquee />

          <LazyMount><FeaturedCollections /></LazyMount>
          <LazyMount><BestSellers /></LazyMount>
          <LazyMount minHeight={600}><WhyChoose /></LazyMount>
          <LazyMount minHeight={320}><TrustSection /></LazyMount>
          <LazyMount minHeight={800}><BrandStory /></LazyMount>
          <LazyMount minHeight={600}><Testimonials /></LazyMount>
          <LazyMount minHeight={600}><Gallery /></LazyMount>
          <LazyMount minHeight={500}><FAQSection /></LazyMount>
          <LazyMount minHeight={400}><Newsletter /></LazyMount>
          <LazyMount minHeight={500}><FinalCTASection /></LazyMount>
        </main>

        <LazyMount minHeight={400}><Footer /></LazyMount>
      </div>

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />

      {/* Floating dock — 12px gap, fades in past 300px */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        <WhatsAppButton />
        <BackToTop />
      </div>
    </LenisProvider>
  );
}
