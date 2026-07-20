export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
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
              <li>📞 <a href="tel:+919497869454">+91 94978 69454</a></li>
              <li>💬 <a href="https://wa.me/916374502007" target="_blank" rel="noopener noreferrer">+91 63745 02007</a></li>
              <li>📨 <a href="mailto:hellopranara@gmail.com">hellopranara@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {year} Pranara. All rights reserved.</div>
          <div>
            Follow us on{' '}
            <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
              @pranara_co
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
