import { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // Scroll to booking section if ?book is in URL
    if (window.location.search.includes('book=')) {
      setTimeout(() => {
        const el = document.getElementById('booking');
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  return (
    <section className="booking" id="booking">
      <div className="container">


        <div className="booking-grid">
          <div className="booking-info">
            <h3>Get in Touch</h3>
            <p>
              Ready to explore the hills, backwaters, and pristine beaches of Kerala? Contact us directly or connect with us on social media and we'll get back to you within 24 hours with availability, pricing, and personalized recommendations.
            </p>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span>Contact: <a href="tel:+919497869454" style={{ color: 'inherit', fontWeight: 'bold' }}>+91 94978 69454</a></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <span>WhatsApp: <a href="https://wa.me/916374502007" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 'bold' }}>+91 63745 02007</a></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/>
                </svg>
              </div>
              <span>Email: <a href="mailto:hellopranara@gmail.com" style={{ color: 'inherit', fontWeight: 'bold' }}>hellopranara@gmail.com</a></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <span>Instagram: <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 'bold' }}>@pranara_co</a></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>Location: <strong>Munnar</strong></span>
            </div>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="https://wa.me/916374502007?text=Hi%20Pranara,%20I'm%20interested%20in%20booking%20a%20Kerala%20trip!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-circle-btn btn-circle-whatsapp"
                title="Chat on WhatsApp"
              >
                <div className="btn-circle-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <span className="btn-circle-label">Chat on WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/pranara_co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-circle-btn btn-circle-instagram"
                title="Follow on Instagram"
              >
                <div className="btn-circle-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <span className="btn-circle-label">Instagram</span>
              </a>
              <a
                href="mailto:hellopranara@gmail.com"
                className="btn-circle-btn btn-circle-email"
                title="Email Us"
              >
                <div className="btn-circle-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                </div>
                <span className="btn-circle-label">Email Us</span>
              </a>
              <a
                href="tel:+919497869454"
                className="btn-circle-btn btn-circle-phone"
                title="Call Us"
              >
                <div className="btn-circle-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <span className="btn-circle-label">Call Us</span>
              </a>
            </div>
          </div>

          <div className="booking-banner-container">
            <img src="/assets/booking_banner.png" alt="Discover Pranara Munnar" className="booking-banner-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
