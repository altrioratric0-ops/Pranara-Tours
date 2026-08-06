import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-dark-section">
      <div className="footer-container">
        <div className="footer-grid-5col">
          {/* Column 1: Brand & Contact */}
          <div className="footer-col-brand">
            <h3 className="footer-brand-title">AUTUMNVALE</h3>
            <p className="footer-brand-desc">
              Luxury journeys through God's Own Country. Crafted with care since {year}.
            </p>
            <div className="footer-helpline">
              <div className="footer-helpline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="footer-helpline-text">
                <span className="helpline-label">Travel Helpline</span>
                <a href="tel:+918807658744" className="helpline-number">+91 8807658744</a>
              </div>
            </div>
            <div className="footer-social-circles">
              <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://wa.me/916374502007" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: QR Code */}
          <div className="footer-col-qr">
            <div className="footer-qr-card">
              <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="120" fill="#ffffff" rx="8" />
                <path fill="#0a2a19" d="
                  M10 10h30v30H10z m5 5v20h20V15z m5 5h10v10H20z
                  M80 10h30v30H80z m5 5v20h20V15z m5 5h10v10H90z
                  M10 80h30v30H10z m5 5v20h20V85z m5 5h10v10H20z
                  M48 12h8v8h-8z M60 12h8v8h-8z M48 24h8v8h-8z M60 28h8v8h-8z M48 36h8v8h-8z
                  M12 48h8v8h-8z M24 48h8v8h-8z M36 48h8v8h-8z M48 48h8v8h-8z M60 48h8v8h-8z M72 48h8v8h-8z M84 48h8v8h-8z M96 48h8v8h-8z
                  M12 60h8v8h-8z M28 60h8v8h-8z M44 60h8v8h-8z M60 60h8v8h-8z M76 60h8v8h-8z M92 60h8v8h-8z
                  M48 72h8v8h-8z M64 72h8v8h-8z M80 72h8v8h-8z M96 72h8v8h-8z
                  M48 84h8v8h-8z M60 84h8v8h-8z M72 84h8v8h-8z M88 84h8v8h-8z M100 84h8v8h-8z
                  M48 96h8v8h-8z M64 96h8v8h-8z M76 96h8v8h-8z M92 96h8v8h-8z
                " />
              </svg>
            </div>
          </div>

          {/* Column 3: Explore */}
          <div className="footer-col-nav">
            <h4>Explore</h4>
            <ul>
              <li><a href="#tours">Destinations</a></li>
              <li><a href="#tours">Tour Packages</a></li>
              <li><a href="#features">Experiences</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="footer-col-nav">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#about">Our Team</a></li>
              <li><a href="#about">Careers</a></li>
              <li><a href="#booking">Contact</a></li>
              <li><a href="#testimonials">Reviews</a></li>
            </ul>
          </div>

          {/* Column 5: Policies */}
          <div className="footer-col-nav">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/terms">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/terms">Cancellation</Link></li>
              <li><Link to="/terms">Refund Policy</Link></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {year} AUTUMNVALE Travel Co. All rights reserved.
          </div>
          <div className="footer-tagline">
            Made with care in Kerala, India 🌴
          </div>
        </div>
      </div>
    </footer>
  );
}

