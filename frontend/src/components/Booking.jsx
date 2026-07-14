import { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // Scroll to booking section if ?book is in URL
    if (window.location.search.includes('book=')) {
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
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
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/>
                </svg>
              </div>
              <span>DM us on Instagram: <strong>@pranara_co</strong></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span>Call / WhatsApp: <strong>+91 63745 02007</strong></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>Location: <strong>Munnar</strong></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span>Response time: <strong>Within 24 hours</strong></span>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://www.instagram.com/pranara_co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Follow @pranara_co
              </a>
              <a
                href="https://wa.me/916374502007?text=Hi%20Pranara,%20I'm%20interested%20in%20booking%20a%20Kerala%20trip!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex', borderColor: '#25D366', color: '#25D366' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Chat on WhatsApp
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
