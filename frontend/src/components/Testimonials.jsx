import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/client';

const TESTIMONIAL_IMAGES = [
  ['/assets/munnar_top_station.png', '/assets/munnar_kolukkumalai.png'],
  ['/assets/insta_houseboat.png', '/assets/tour_alleppey.png'],
  ['/assets/tour_thekkady.png', '/assets/insta_waterfall.png'],
  ['/assets/munnar_attukad.png', '/assets/munnar_mattupetty.png'],
  ['/assets/tour_wayanad.png', '/assets/munnar_eravikulam.png'],
  ['/assets/munnar_echo_point.png', '/assets/munnar_kundala.png']
];

const TESTIMONIAL_METADATA = [
  {
    title: 'Voices from the Summit',
    subtitle: 'TREKKING TO CHOKKARMUDI PEAK',
    tagline: 'THROUGH THEIR EYES, FOREVER IN THEIR HEARTS.',
    note: 'It was more than just a trek, it was an emotion!'
  },
  {
    title: 'Drifting Through Paradise',
    subtitle: 'ALLEPPEY HOUSEBOAT STAY',
    tagline: 'SCENIC BACKWATERS, UNFORGETTABLE SUNSETS.',
    note: 'A magical floating paradise!'
  },
  {
    title: 'Into the Wild',
    subtitle: 'THEKKADY WILDLIFE SAFARI',
    tagline: 'SPOTTING MAJESTIC SPECIES IN THEIR NATURAL HABITAT.',
    note: 'The raw beauty of nature, organized adventure.'
  },
  {
    title: 'Misty Trails',
    subtitle: 'MUNNAR TEA ESTATE WALK',
    tagline: 'LEARN THE ART OF TEA GARDENING & HARVEST.',
    note: 'Walking through a canvas of green!'
  },
  {
    title: 'Wayanad Wilderness',
    subtitle: 'EDAKKAL CAVES EXPLORATION',
    tagline: 'PREHISTORIC ROCK CARVINGS AND FOREST TRAILS.',
    note: 'History carved in stone!'
  },
  {
    title: 'Echoes of Vagamon',
    subtitle: 'PINE FOREST RETREAT',
    tagline: 'SERENE TALL PINES AND SECLUDED TRAILS.',
    note: 'Tranquility at its absolute finest!'
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        const merged = (data || []).map((t, idx) => {
          const meta = TESTIMONIAL_METADATA[idx % TESTIMONIAL_METADATA.length];
          const imgs = TESTIMONIAL_IMAGES[idx % TESTIMONIAL_IMAGES.length];
          return {
            ...t,
            title: meta.title,
            subtitle: meta.subtitle,
            tagline: meta.tagline,
            note: meta.note,
            images: imgs
          };
        });
        setTestimonials(merged);
      })
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title"><span className="accent">Explorers Say</span></h2>
          <p className="section-subtitle">Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[activeIndex];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title"><span className="accent">Explorers Say</span></h2>
        
        {/* Header Block with current testimonial title/subtitle/tagline */}
        <div className="testimonial-header-showcase">
          <span className="testimonial-subtitle-top">{current.title}</span>
          <h3 className="testimonial-main-heading">{current.subtitle}</h3>
          <p className="testimonial-tagline-bottom">{current.tagline}</p>
        </div>

        {/* Carousel Showcase Row */}
        <div className="testimonial-showcase-grid">
          {/* Left testimonial card */}
          <div className="testimonial-quote-card">
            <div className="quote-mark">“</div>
            <div className="quote-body">
              <p className="quote-text">{current.quote}</p>
              {current.note && <p className="quote-note">{current.note}</p>}
              <div className="quote-divider"></div>
              <p className="quote-recommendation">Highly recommended for anyone who loves nature and adventure.</p>
            </div>
            
            <div className="quote-stars-row">
              {renderStars(current.rating)}
            </div>

            <div className="thankyou-signature">
              <svg className="heart-signature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Thank you Pranara for this amazing experience!</span>
            </div>

            <div className="testimonial-card-author">
              <div className="testimonial-author-avatar">{current.avatar_initials}</div>
              <div className="testimonial-author-details">
                <div className="author-name">{current.name}</div>
                <div className="author-location">{current.location}</div>
              </div>
            </div>
          </div>

          {/* Right polaroid photos block */}
          <div className="polaroid-wrapper">
            {current.images && current.images.map((imgUrl, i) => (
              <div key={i} className={`polaroid-card card-${i + 1}`}>
                <div className="polaroid-image" style={{ backgroundImage: `url(${imgUrl})` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="testimonial-carousel-controls">
          <button className="carousel-control-btn prev-btn" onClick={handlePrev} aria-label="Previous Review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button className="carousel-control-btn next-btn" onClick={handleNext} aria-label="Next Review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
