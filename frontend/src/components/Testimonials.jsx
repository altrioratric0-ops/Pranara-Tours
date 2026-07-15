import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');

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

  const handleFlip = (dir) => {
    if (isFlipping || testimonials.length < 2) return;
    setFlipDirection(dir);
    setIsFlipping(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? '#10b981' : 'none'} stroke={i < rating ? '#10b981' : '#cbd5e1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ));
  };

  const LeftContent = ({ data }) => (
    <div className="book-left-content">
      <div className="book-left-visuals">
        {data.images && data.images.map((imgUrl, i) => (
          <div key={i} className="book-polaroid" style={{ backgroundImage: `url(${imgUrl})` }}></div>
        ))}
      </div>
      <div className="book-rating-box">
        <div className="book-rating">{renderStars(data.rating)}</div>
        <p className="book-left-note">{data.note}</p>
      </div>
    </div>
  );

  const RightContent = ({ data }) => (
    <div className="book-right-content">
      <span className="book-right-tagline">{data.tagline}</span>
      <h3 className="book-right-title">{data.subtitle}</h3>
      <p className="book-right-quote">{data.quote}</p>
      <div className="book-right-author">
        <div className="book-author-avatar">{data.avatar_initials || data.name.charAt(0)}</div>
        <div className="book-author-info">
          <h5>{data.name}</h5>
          <p>{data.location}</p>
        </div>
        <div className="book-signature">Thank you Pranara</div>
      </div>
    </div>
  );

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

  if (testimonials.length === 0) return null;

  const nextIndex = (activeIndex + 1) % testimonials.length;
  const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;

  return (
    <section className="testimonials book-testimonials-section" id="testimonials">
      <div className="container">
        <div className="book-header-row">
          <div>
            <h2 className="section-title"><span className="accent">Explorers Say</span></h2>
            <p className="section-subtitle">Read the stories of our travelers in our virtual journal.</p>
          </div>
          <div className="book-navigation">
            <button className="book-nav-btn prev" onClick={() => handleFlip('prev')} aria-label="Previous Page">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button className="book-nav-btn next" onClick={() => handleFlip('next')} aria-label="Next Page">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="book-3d-wrapper">
          <div className="book-hardcover">
            {/* Left Static Page */}
            <div className="book-page book-page-left">
              {isFlipping && flipDirection === 'next' ? (
                <LeftContent data={testimonials[activeIndex]} />
              ) : isFlipping && flipDirection === 'prev' ? (
                <LeftContent data={testimonials[prevIndex]} />
              ) : (
                <LeftContent data={testimonials[activeIndex]} />
              )}
            </div>

            {/* Right Static Page */}
            <div className="book-page book-page-right">
              {isFlipping && flipDirection === 'next' ? (
                <RightContent data={testimonials[nextIndex]} />
              ) : isFlipping && flipDirection === 'prev' ? (
                <RightContent data={testimonials[activeIndex]} />
              ) : (
                <RightContent data={testimonials[activeIndex]} />
              )}
            </div>

            {/* The Flipping Page layer */}
            {isFlipping && (
              <motion.div
                className={`book-page-flipper ${flipDirection}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipDirection === 'next' ? -180 : 180 }}
                transition={{ type: 'spring', stiffness: 45, damping: 14 }}
                onAnimationComplete={() => {
                  setIsFlipping(false);
                  setActiveIndex(flipDirection === 'next' ? nextIndex : prevIndex);
                }}
                style={{
                  transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                  left: flipDirection === 'next' ? '50%' : '12px',
                  right: flipDirection === 'next' ? '12px' : '50%'
                }}
              >
                <div className="flipper-face flipper-front">
                  {flipDirection === 'next' ? (
                    <RightContent data={testimonials[activeIndex]} />
                  ) : (
                    <LeftContent data={testimonials[activeIndex]} />
                  )}
                </div>
                <div className="flipper-face flipper-back">
                  {flipDirection === 'next' ? (
                    <LeftContent data={testimonials[nextIndex]} />
                  ) : (
                    <RightContent data={testimonials[prevIndex]} />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
