import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Tours from './components/Tours';
import Experiences from './components/Experiences';
import TripPlanner from './components/TripPlanner';
import KeralaMap from './components/KeralaMap';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import TravelTips from './components/TravelTips';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Tours />
      <Experiences />
      <TripPlanner />
      <KeralaMap />
      <Gallery />
      <Testimonials />
      <TravelTips />
      <FAQ />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;
