import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
          Pranara
        </a>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><a href="#tours" onClick={(e) => { e.preventDefault(); scrollTo('tours'); }}>Packages</a></li>
          <li><a href="#experiences" onClick={(e) => { e.preventDefault(); scrollTo('experiences'); }}>Experiences</a></li>
          <li><a href="#planner" onClick={(e) => { e.preventDefault(); scrollTo('planner'); }}>Planner</a></li>
          <li><a href="#kerala-map" onClick={(e) => { e.preventDefault(); scrollTo('kerala-map'); }}>Map</a></li>
          <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a></li>
          <li><a href="#booking" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
}
