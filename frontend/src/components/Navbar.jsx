import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/#' + id);
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo flex-logo" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/assets/logo.png" alt="Pranara Logo" className="logo-img" />
          <span className="brand-text">PRANARA</span>
        </Link>
        
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href={isHome ? '#kerala-map' : '/#kerala-map'} onClick={(e) => { e.preventDefault(); scrollTo('kerala-map'); }}>Destinations</a></li>
          <li><a href={isHome ? '#escapes' : '/#escapes'} onClick={(e) => { e.preventDefault(); scrollTo('escapes'); }}>Packages</a></li>
          <li><a href={isHome ? '#heritage' : '/#heritage'} onClick={(e) => { e.preventDefault(); scrollTo('heritage'); }}>Experiences</a></li>
          <li><a href={isHome ? '#instagram' : '/#instagram'} onClick={(e) => { e.preventDefault(); scrollTo('instagram'); }}>Gallery</a></li>
          <li><a href={isHome ? '#tips' : '/#tips'} onClick={(e) => { e.preventDefault(); scrollTo('tips'); }}>Blog</a></li>
          <li><a href={isHome ? '#booking' : '/#booking'} onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>Contact</a></li>
          <li className="mobile-cta-li">
            <a href="#booking" className="nav-btn-cta mobile-cta" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>
              <svg className="cta-plane-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              Book Your Journey
            </a>
          </li>
        </ul>

        <div className="desktop-cta-container">
          <a href="#booking" className="nav-btn-cta" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>
            <svg className="cta-plane-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Book Your Journey
          </a>
        </div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

