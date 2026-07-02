import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/client';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        &#9733;
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title">What <span className="accent">Explorers Say</span></h2>
          <p className="section-subtitle">Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What <span className="accent">Explorers Say</span></h2>
        <p className="section-subtitle">Real experiences from fellow travelers</p>
        {testimonials.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="stars">{renderStars(t.rating)}</div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <div className="avatar">{t.avatar_initials}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
