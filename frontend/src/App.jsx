import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import EscapeSection from './components/EscapeSection';
import LocalHeritage from './components/LocalHeritage';
import CreativeGallery from './components/CreativeGallery';
import TripPlanner from './components/TripPlanner';
import Testimonials from './components/Testimonials';

import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Footer from './components/Footer';
import TourDetail from './components/TourDetail';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <EscapeSection />
      <LocalHeritage />
      <CreativeGallery />
      <TripPlanner />
      <Testimonials />
      <FAQ />
      <Booking />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tour/:id" element={<TourDetail />} />
      </Routes>
      <Footer />

      {/* Floating WhatsApp Logo */}

      <a 
        href="https://wa.me/916374502007" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="whatsapp-icon" width="30" height="30">
          <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
