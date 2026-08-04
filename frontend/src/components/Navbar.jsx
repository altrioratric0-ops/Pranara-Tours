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

  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) {
      root.classList.add('navbar-opened');
    } else {
      root.classList.remove('navbar-opened');
    }
  }, [menuOpen]);

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
      navigate(`#${id}`, { replace: true });
      scrollToSection(id);
      return;
    }

    navigate(`/#${id}`);
    setTimeout(() => scrollToSection(id), 250);
  };

  const [activeMenu, setActiveMenu] = useState('Home');

  useEffect(() => {
    if (location.pathname.startsWith('/gallery')) {
      setActiveMenu('Gallery');
      return;
    }

    if (location.pathname !== '/') {
      setActiveMenu('');
      return;
    }

    const sections = [
      { id: 'home', name: 'Home' },
      { id: 'about', name: 'About' },
      { id: 'escapes', name: 'Packages' },
      { id: 'heritage', name: 'Experiences' },
      { id: 'gallery', name: 'Gallery' },
      { id: 'booking', name: 'Contact' }
    ];

    const handleScroll = () => {
      let currentSection = 'Home';
      let minDistance = Infinity;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.name;
            break;
          }
          const topDistance = Math.abs(rect.top - 120);
          if (topDistance < minDistance) {
            minDistance = topDistance;
            currentSection = section.name;
          }
        }
      }
      setActiveMenu(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-opened' : ''}`}>
      <div className="navbar-shell">
        <div className="navbar-header">
          <Link
            to="/"
            className="navbar-brand"
            onClick={(e) => {
              if (window.innerWidth > 1024 && !menuOpen) {
                e.preventDefault();
                setMenuOpen(true);
              } else {
                setMenuOpen(false);
                setDestinationsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
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
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className="nav-label">Home</span>
            </Link>
            <button type="button" className={`nav-link${activeMenu === 'About' ? ' active' : ''}`} onClick={() => handleSectionClick('about')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              <span className="nav-label">About</span>
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Packages' ? ' active' : ''}`} onClick={() => handleSectionClick('escapes')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              <span className="nav-label">Packages</span>
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Experiences' ? ' active' : ''}`} onClick={() => handleSectionClick('heritage')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
              <span className="nav-label">Experiences</span>
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Gallery' ? ' active' : ''}`} onClick={() => handleSectionClick('gallery')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
              <span className="nav-label">Gallery</span>
            </button>
            <div className="nav-group">
              <button
                type="button"
                className={`nav-link${activeMenu === 'Destinations' ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!menuOpen) {
                    setMenuOpen(true);
                    setDestinationsOpen(true);
                  } else {
                    setDestinationsOpen(!destinationsOpen);
                  }
                }}
              >
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="nav-label">
                  Destinations <span className="submenu-arrow">{destinationsOpen ? '▴' : '▾'}</span>
                </span>
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
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              <span className="nav-label">Blog</span>
            </button>
            <button type="button" className={`nav-link${activeMenu === 'Contact' ? ' active' : ''}`} onClick={() => handleSectionClick('booking')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <span className="nav-label">Contact</span>
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
                <a href="https://wa.me/917397532574" target="_blank" rel="noreferrer" aria-label="WhatsApp">
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
                <span>+91 73975 32574</span>
                <span>pranara@travel.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


