import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import EscapeSection from './components/EscapeSection';
import LocalHeritage from './components/LocalHeritage';
import TripPlanner from './components/TripPlanner';
import Testimonials from './components/Testimonials';
import TravelTips from './components/TravelTips';
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
      <TripPlanner />
      <Testimonials />
      <TravelTips />
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
    </div>
  );
}

export default App;
