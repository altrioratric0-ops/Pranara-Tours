import { useState, useEffect } from 'react';
import { fetchTours, submitBooking } from '../api/client';

export default function Booking() {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', tour: '', people: '2', date: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchTours().then(setTours).catch(() => {});
    // Set min date for date input
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await submitBooking(formData);
      setToast({ type: 'success', message: 'Booking request sent! We\'ll get back to you soon.' });
      setFormData({ name: '', phone: '', email: '', tour: '', people: '2', date: '', message: '' });
    } catch (err) {
      setToast({ type: 'error', message: 'Something went wrong. Please try again or DM us on Instagram.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <section className="booking" id="booking">
      <div className="container">
        <h2 className="section-title">Book Your <span className="accent">Kerala Adventure</span></h2>
        <p className="section-subtitle">Reserve your spot and we'll take care of the rest</p>

        {toast && (
          <div className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? '&#9989; ' : '&#9888; '}{toast.message}
          </div>
        )}

        <div className="booking-grid">
          <div className="booking-info">
            <h3>Get in Touch</h3>
            <p>
              Ready to explore the hills, backwaters, and pristine beaches of Kerala? Fill out the form
              and we'll get back to you within 24 hours with availability,
              pricing, and personalized recommendations.
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
              <span>Call / WhatsApp: <strong>+91 [Contact on Instagram]</strong></span>
            </div>
            <div className="contact-detail">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>Location: <strong>Munnar, Idukki, Kerala</strong></span>
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
                &#128247; Follow @pranara_co
              </a>
              <a
                href="https://wa.me/919447123456?text=Hi%20Pranara,%20I'm%20interested%20in%20booking%20a%20Kerala%20trip!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex', borderColor: '#25D366', color: '#25D366' }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required
                  value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 9X XXX XXXX" required
                  value={formData.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required
                value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tour">Preferred Tour</label>
                <select id="tour" name="tour" value={formData.tour} onChange={handleChange}>
                  <option value="">Select a tour...</option>
                  {tours.map((t) => <option key={t.id} value={t.title}>{t.title}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="people">Number of People</label>
                <select id="people" name="people" value={formData.people} onChange={handleChange}>
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input type="date" id="bookingDate" name="date"
                value={formData.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Special Requests</label>
              <textarea id="message" name="message" placeholder="Any special requirements, dietary needs, or questions..."
                value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? '&#128190; Sending...' : '&#128228; Send Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
