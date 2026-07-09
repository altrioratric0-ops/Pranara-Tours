import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchTour } from '../api/client';


export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    fetchTour(id)
      .then(setTour)
      .catch(() => setTour(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="tour-detail-loading">
        <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '16px', color: '#64748b' }}>Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="tour-detail-error">
        <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
          <h2>Tour Not Found</h2>
          <p style={{ color: '#64748b', margin: '16px 0' }}>The tour package you're looking for doesn't exist or has been removed.</p>
          <Link to="/#tours" className="btn btn-primary">Back to Packages</Link>
        </div>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleBooking = () => {
    navigate('/?book=' + tour.id);
  };

  return (
    <div className="tour-detail-page">

      {/* ─── Hero Banner ─── */}
      <section
        className="tour-detail-hero"
        style={{
          background: tour.image_url
            ? `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.8)), url(${tour.image_url}) center/cover no-repeat`
            : 'linear-gradient(135deg, #0f172a, #065f46)',
        }}
      >
        <div className="container">
          <Link to="/#tours" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Packages
          </Link>
          <div className="tour-detail-hero-content">
            <div className="tour-detail-breadcrumb">
              <span>Home</span>
              <span className="sep">/</span>
              <span>Packages</span>
              <span className="sep">/</span>
              <span className="current">{tour.title}</span>
            </div>
            <h1>{tour.title}</h1>
            {tour.subtitle && <p className="tour-subtitle">{tour.subtitle}</p>}
            <p className="tour-hero-desc">{tour.description}</p>
            <div className="tour-hero-meta">
              <div className="hero-meta-item">
                <span className="meta-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </span>
                <div>
                  <strong>{tour.price.toLocaleString()}</strong>
                  <small>/ person</small>
                </div>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <div>
                  <strong>{tour.duration}</strong>
                  <small>Duration</small>
                </div>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </span>
                <div>
                  <strong>{tour.rating}</strong>
                  <small>({tour.reviews} reviews)</small>
                </div>
              </div>
              <div className="hero-meta-item">
                <span className="meta-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <div>
                  <strong>Max {tour.max_people}</strong>
                  <small>Per group</small>
                </div>
              </div>
            </div>
            <button onClick={handleBooking} className="btn btn-primary btn-lg">
              Book This Package
            </button>
          </div>
        </div>
      </section>

      <div className="container tour-detail-body">

        {/* ─── Quick Info Bar ─── */}
        <div className="tour-info-bar">
          <div className="info-bar-item">
            <span className="info-bar-label">Difficulty</span>
            <span className="info-bar-value">{tour.difficulty}</span>
          </div>
          <div className="info-bar-item">
            <span className="info-bar-label">Meeting Point</span>
            <span className="info-bar-value">{tour.meeting_point}</span>
          </div>
          <div className="info-bar-item">
            <span className="info-bar-label">Cancellation</span>
            <span className="info-bar-value">{tour.cancellation}</span>
          </div>
        </div>

        {/* ─── Highlights ─── */}
        {tour.highlights && tour.highlights.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Trip Highlights</h2>
            <div className="highlights-grid">
              {tour.highlights.map((h, i) => (
                <div className="highlight-card" key={i}>
                  <span className="highlight-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Photo Gallery ─── */}
        <section className="detail-section">
          <h2 className="detail-section-title">Photo Gallery</h2>
          <div className="tour-gallery-grid">
            {[
              { src: '/assets/munnar_top_station.png', alt: 'Top Station Valley View' },
              { src: '/assets/munnar_kolukkumalai.png', alt: 'Kolukkumalai Sunrise above the clouds' },
              { src: '/assets/munnar_tea_museum.png', alt: 'Munnar Tea Museum & Gardens' },
              { src: '/assets/munnar_eravikulam.png', alt: 'Eravikulam National Park Nilgiri Tahr' },
              { src: '/assets/munnar_mattupetty.png', alt: 'Mattupetty Dam & Lake' },
              { src: '/assets/munnar_attukad.png', alt: 'Attukad Waterfalls' }
            ].map((img, i) => (
              <div className="tour-gallery-item" key={i}>
                <div
                  className="tour-gallery-img"
                  style={{
                    background: `url(${img.src}) center/cover no-repeat`,
                    paddingBottom: '66%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open(img.src, '_blank')}
                  title={img.alt}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Itinerary ─── */}
        {tour.itinerary && tour.itinerary.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Detailed Itinerary</h2>
            <div className="itinerary">
              {tour.itinerary.map((day, i) => (
                <div className="itinerary-day" key={i}>
                  <div className="itinerary-day-dot">
                    <span className="dot"></span>
                    {i < tour.itinerary.length - 1 && <span className="dot-line"></span>}
                  </div>
                  <div className="itinerary-day-content">
                    <div className="itinerary-day-header">
                      <span className="itinerary-day-label">Day {day.day}</span>
                      <h3>{day.title}</h3>
                    </div>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Inclusions & Exclusions ─── */}
        <section className="detail-section">
          <div className="inclusion-grid">
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="inclusion-card">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> What's Included
                </h3>
                <ul className="inclusion-list">
                  {tour.inclusions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="inclusion-card exclusion">
                <h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> What's Excluded
                </h3>
                <ul className="inclusion-list">
                  {tour.exclusions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ─── FAQs ─── */}
        {tour.faqs && tour.faqs.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {tour.faqs.map((faq, i) => (
                <div
                  className={`faq-item${activeFaq === i ? ' active' : ''}`}
                  key={i}
                  onClick={() => toggleFaq(i)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <span className="faq-arrow">{activeFaq === i ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer" style={{ maxHeight: activeFaq === i ? '300px' : '0' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── CTA ─── */}
        <section className="detail-section detail-cta">
          <div className="cta-box">
            <h2>Ready to Experience {tour.title}?</h2>
            <p>Book now and create memories that last a lifetime with Pranara's expert guides and premium services.</p>
            <div className="cta-actions">
              <button onClick={handleBooking} className="btn btn-primary btn-lg">
                Book Now — &#8377;{tour.price.toLocaleString()}/person
              </button>
              <Link to="/#tours" className="btn btn-outline">Browse All Packages</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
