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
            <button type="button" className={`nav-link${activeMenu === 'Home' ? ' active' : ''}`} onClick={() => handleSectionClick('home')}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className="nav-label">Home</span>
            </button>
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
            <button type="button" className={`nav-link${activeMenu === 'Blog' ? ' active' : ''}`} onClick={() => { setMenuOpen(false); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
              <Link to="/signin" className="nav-auth-btn nav-auth-btn-outline" onClick={() => { setMenuOpen(false); }}>
                Sign In
              </Link>
              <Link to="/login" className="nav-auth-btn" onClick={() => { setMenuOpen(false); }}>
                Login
              </Link>
            </div>

            <div className="navbar-bottom">
              <div className="navbar-socials">
                <a href="https://wa.me/916374502007" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z" />
                  </svg>
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
