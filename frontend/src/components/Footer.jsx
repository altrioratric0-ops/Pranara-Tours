import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappCommunityLink = 'https://chat.whatsapp.com/';
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    let count = localStorage.getItem('pranara_visitor_count');
    if (!count) {
      const baseCount = 1542;
      localStorage.setItem('pranara_visitor_count', baseCount.toString());
      setVisitorCount(baseCount);
    } else {
      const nextCount = parseInt(count, 10) + 1;
      localStorage.setItem('pranara_visitor_count', nextCount.toString());
      setVisitorCount(nextCount);
    }
  }, []);

  const handleJoinCommunity = () => {
    window.open(whatsappCommunityLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer>
      <div className="container footer-shell">
        <div className="footer-card">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo flex-logo">
                <img src="/assets/logo.png" alt="Pranara Logo" className="logo-img" />
                <span>Pranara</span>
              </a>
              <p>Your gateway to Kerala's misty hills, backwaters & scenic beaches. Adventure, nature, and guided tourism crafted for unforgettable memories.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#planner">Planner</a></li>
                <li><a href="#booking">Book Now</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>📞 <a href="tel:+917397532574">+91 73975 32574</a></li>
                <li>💬 <a href="https://wa.me/917397532574" target="_blank" rel="noopener noreferrer">+91 73975 32574</a></li>
                <li>📨 <a href="mailto:hellopranara@gmail.com">hellopranara@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-community-card">
            <div className="footer-community-copy">
              <span className="footer-badge">Get in Touch</span>
              <h3>Begin Your Kerala Story</h3>
              <p>Join Our Community to get the latest updates</p>
              <div className="footer-socials">
                <a href="https://wa.me/917397532574" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.75 13.96c.25-.12 1.4-.56 1.58-.62.18-.06.35-.12.43-.24.07-.12.07-.23.07-.35s-.08-.27-.24-.4c-.16-.13-.39-.16-.57-.16-.18 0-.38.04-.56.12-.18.08-.95.37-1.63.68-.68.31-1.26.51-1.66.52-.39.01-.72.02-.98-.17-.26-.19-.45-.63-.74-1.06-.29-.43-.51-.76-.93-.74-.42.02-.8.26-1.2.47-.4.21-.88.47-1.26.7-.38.24-.64.39-.7.63-.06.24.03.46.13.62.1.16.25.31.42.46.17.15.34.29.48.42.14.06.27.1.37.16.1.06.42.18.4.24.18-.06.56-.2.76-.26.2-.06.38-.1.49-.1.11 0 .23.03.31.08.08.05.14.13.2.27.06.14.15.24.2.46.05.22.09.47.1.71.01.24 0 .57-.11.94z" /></svg></a>
                <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" /></svg></a>
                <a href="mailto:hellopranara@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5.3-8-5.3V6.5l8 5.3 8-5.3z" /></svg></a>
                <a href="https://maps.google.com/?q=Kerala" target="_blank" rel="noopener noreferrer" aria-label="Location"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 11.5z" /></svg></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-9h3l.5-4H13V4.5c0-1.1.5-1.5 1.5-1.5H17V.1c-.3-.1-1.3-.2-2.5-.2-2.7 0-4.5 1.4-4.5 4.5V9H7v4h3v9h3z" /></svg></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12zM5.5 9.5h2.88V18H5.5zm4.73 0h2.76v1.16h.04c.38-.73 1.32-1.5 2.72-1.5 2.91 0 3.45 1.91 3.45 4.39V18h-2.88v-7.57c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.88 1.95-2.88 3.96V18H10.23z" /></svg></a>
              </div>
            </div>
            <div className="footer-offer-card">
              <span className="footer-badge">Seasonal Offers &amp; What&apos;s New</span>
              <h4>Monsoon Special Offer</h4>
              <p>Escape into emerald hills, soothing rains, and unforgettable stays.</p>
              <a href="https://wa.me/917397532574" target="_blank" rel="noopener noreferrer" className="offer-link">Grab the Deal</a>
            </div>
          </div>

          <div className="footer-community-form">
            <h4>Join Our Community</h4>
            <p>Join Our Community to get the latest updates</p>
            <div className="footer-form-row">
              <input type="tel" placeholder="Phone number" />
              <button type="button" onClick={handleJoinCommunity}>Join Now</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {year} Pranara. All rights reserved.</div>
          <div className="footer-visitor-count">
            <span className="visitor-dot" />
            No. of Visitors: <strong>{visitorCount.toLocaleString()}</strong>
          </div>
          <div className="footer-legal-links">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
