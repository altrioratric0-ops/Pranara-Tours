import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-dark-section">
      <div className="footer-container">
        <div className="footer-grid-5col">
          {/* Column 1: Brand & Contact */}
          <div className="footer-col-brand">
            <h3 className="footer-brand-title">PRANARA</h3>
            <p className="footer-brand-desc">
              Our journeys through God's Own Country. Crafted with care since {year}.
            </p>
            <div className="footer-helpline">
              <div className="footer-helpline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="footer-helpline-text">
                <span className="helpline-label">Travel Helpline</span>
                <a href="tel:+91 9497869454" className="helpline-number">+91 9497869454</a>
              </div>
            </div>
            <div className="footer-social-circles">
              <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={`https://wa.me/916374502007?text=${encodeURIComponent('Hello Pranara! I would like to inquire about your tour packages and travel itineraries.')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Location QR Code */}
          <div className="footer-col-qr">
            <a
              href="https://www.google.com/maps/place/Pranara+Munnar/@10.0616148,77.0025719,15z/data=!4m6!3m5!1s0x3b07998bc4d950a7:0xcba33f03627c5605!8m2!3d10.0616615!4d77.0129831!16s%2Fg%2F11zh69596t?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-qr-link"
              title="Open Pranara Munnar on Google Maps"
            >
              <div className="footer-qr-card">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0a2a19&data=${encodeURIComponent("https://www.google.com/maps/place/Pranara+Munnar/@10.0616148,77.0025719,15z/data=!4m6!3m5!1s0x3b07998bc4d950a7:0xcba33f03627c5605!8m2!3d10.0616615!4d77.0129831!16s%2Fg%2F11zh69596t?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D")}`}
                  alt="Pranara Munnar Google Maps Location QR Code"
                  className="footer-qr-img"
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="160"
                />
              </div>
            </a>
          </div>

          {/* Column 3: Explore */}
          <div className="footer-col-nav">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/#heritage">Destinations</Link></li>
              <li><Link to="/#packages">Tour Packages</Link></li>
              <li><Link to="/#adventures">Adventures</Link></li>
              <li><Link to="/#gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="footer-col-nav">
            <h4>Company</h4>
            <ul>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#booking">Contact</Link></li>
              <li><Link to="/#testimonials">Reviews</Link></li>
            </ul>
          </div>

          {/* Column 5: Policies */}
          <div className="footer-col-nav">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policies</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {year} PRANARA Travel Co. All rights reserved.
          </div>
          <div className="footer-tagline">
            Made with care in Kerala, India
          </div>
        </div>
      </div>
    </footer>
  );
}

