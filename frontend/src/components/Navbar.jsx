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
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + id);
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo flex-logo">
          <img src="/assets/logo.png" alt="Pranara Logo" className="logo-img" />
          <span>Pranara</span>
        </Link>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href={isHome ? '#about' : '/#about'} onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><a href={isHome ? '#planner' : '/#planner'} onClick={(e) => { e.preventDefault(); scrollTo('planner'); }}>Planner</a></li>
          <li><a href={isHome ? '#testimonials' : '/#testimonials'} onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a></li>
          <li><Link to="/#booking" className="nav-cta" onClick={() => setMenuOpen(false)}>Book Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}
