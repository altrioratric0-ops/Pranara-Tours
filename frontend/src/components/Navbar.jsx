import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DESTINATION_LINKS = [
  { label: 'Munnar', path: '/gallery/munnar' },
  { label: 'Tea Estate', path: '/gallery/tea-estate' },
  { label: 'Kolukkumalai', path: '/gallery/kolukkumalai' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 90;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  const handleSectionClick = (id) => {
    setMenuOpen(false);
    setDestinationsOpen(false);
    if (isHome) {
      scrollToSection(id);
      return;
    }

    navigate('/');
    setTimeout(() => scrollToSection(id), 250);
  };

  const activeMenu = location.pathname.startsWith('/gallery')
    ? 'Gallery'
    : location.hash === '#about'
      ? 'About'
      : location.hash === '#escapes'
        ? 'Packages'
        : location.hash === '#heritage'
          ? 'Experiences'
          : location.hash === '#gallery'
            ? 'Gallery'
            : location.hash === '#booking'
              ? 'Contact'
              : isHome
                ? 'Home'
                : 'Home';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-opened' : ''}`}>
      <div className="navbar-shell">
        <div className="navbar-header">
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => {
              setMenuOpen(false);
              setDestinationsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src="/assets/logo.png" alt="Pranara Logo" className="navbar-logo" />
            <span className="navbar-brand-text">Pranara</span>
          </Link>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (menuOpen) setDestinationsOpen(false);
            }}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`navbar-menu-container${menuOpen ? ' open' : ''}`}>
          <div className="navbar-menu">
            <Link to="/" className={`nav-link${activeMenu === 'Home' ? ' active' : ''}`} onClick={() => { setMenuOpen(false); setDestinationsOpen(false); }}>
              Home
            </Link>
            <button type="button" className={`nav-link${activeMenu === 'About' ? ' active' : ''}`} onClick={() => handleSectionClick('about')}>
              About
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Packages' ? ' active' : ''}`} onClick={() => handleSectionClick('escapes')}>
              Packages
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Experiences' ? ' active' : ''}`} onClick={() => handleSectionClick('heritage')}>
              Experiences
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Gallery' ? ' active' : ''}`} onClick={() => handleSectionClick('gallery')}>
              Gallery
            </button>
            <div className="nav-group">
              <button
                type="button"
                className={`nav-link${activeMenu === 'Destinations' ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setDestinationsOpen(!destinationsOpen);
                }}
              >
                Destinations <span className="submenu-arrow">{destinationsOpen ? '▴' : '▾'}</span>
              </button>
              <div className={`nav-submenu${destinationsOpen ? ' open-mobile' : ''}`}>
                {DESTINATION_LINKS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="nav-submenu-link"
                    onClick={() => {
                      setMenuOpen(false);
                      setDestinationsOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <button type="button" className={`nav-link${activeMenu === 'Blog' ? ' active' : ''}`} onClick={() => { setMenuOpen(false); setDestinationsOpen(false); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Blog
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Contact' ? ' active' : ''}`} onClick={() => handleSectionClick('booking')}>
              Contact
            </button>
          </div>

          <div className="navbar-footer">
            <div className="navbar-auth">
              <Link to="/signin" className="nav-auth-btn nav-auth-btn-outline" onClick={() => { setMenuOpen(false); setDestinationsOpen(false); }}>
                Sign In
              </Link>
              <Link to="/login" className="nav-auth-btn" onClick={() => { setMenuOpen(false); setDestinationsOpen(false); }}>
                Login
              </Link>
            </div>

            <div className="navbar-bottom">
              <div className="navbar-socials">
                <a href="https://wa.me/916374502007" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.75 13.96c.25-.12 1.4-.56 1.58-.62.18-.06.35-.12.43-.24.07-.12.07-.23.07-.35s-.08-.27-.24-.4c-.16-.13-.39-.16-.57-.16-.18 0-.38.04-.56.12-.18.08-.95.37-1.63.68-.68.31-1.26.51-1.66.52-.39.01-.72.02-.98-.17-.26-.19-.45-.63-.74-1.06-.29-.43-.51-.76-.93-.74-.42.02-.8.26-1.2.47-.4.21-.88.47-1.26.7-.38.24-.64.39-.7.63-.06.24.03.46.13.62.1.16.25.31.42.46.17.15.34.29.48.42.14.06.27.1.37.16.1.06.42.18.4.24.18-.06.56-.2.76-.26.2-.06.38-.1.49-.1.11 0 .23.03.31.08.08.05.14.13.2.27.06.14.15.24.2.46.05.22.09.47.1.71.01.24 0 .57-.11.94z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-9h3l.5-4H13V4.5c0-1.1.5-1.5 1.5-1.5H17V.1c-.3-.1-1.3-.2-2.5-.2-2.7 0-4.5 1.4-4.5 4.5V9H7v4h3v9h3z" /></svg>
                </a>
              </div>
              <div className="navbar-contact">
                <span>+91 63745 02007</span>
                <span>pranara@travel.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


