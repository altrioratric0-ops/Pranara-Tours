import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTestimonials } from '../api/client';

/* ─── Static fallback testimonials ─── */
const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: 'The Thompson Family',
    location: 'London, United Kingdom',
    destination: 'Munnar Tea Safari, Kerala',
    avatar: '/assets/munnar_uk_family.jpg',
    rating: 5,
    quote: 'From the UK to the heart of Munnar! Every detail was handled with utmost elegance. The private tea estate tour and misty mountain views were breathtaking.',
    tagline: 'LUXURY FAMILY SAFARI',
    videoUrl: '/assets/munnar_video_testimonial.mp4'
  },
  {
    id: 2,
    name: 'The Adhikari Family',
    location: 'Mumbai, India',
    destination: 'River Streams & Valley, Munnar',
    avatar: '/assets/munnar_river_family.jpg',
    rating: 5,
    quote: 'Pristine river streams, lush green forests, and unforgettable moments. Pranara made us feel like family while delivering an ultra-luxurious experience.',
    tagline: 'RIVER & NATURE RETREAT',
    videoUrl: '/assets/munnar_video_testimonial_5.mp4'
  },
  {
    id: 3,
    name: 'Mr. & Mrs. Sharma',
    location: 'Delhi, India',
    destination: 'Chokkarmudi & Private Estates',
    avatar: '/assets/munnar_pradeep_review.jpg',
    rating: 5,
    quote: 'A perfect blend of luxury, adventure, and authentic Kerala heritage. Every detail was handled with care, making this our most memorable trip ever.',
    tagline: 'HERITAGE & COMFORT',
  },
  {
    id: 4,
    name: 'Sarah, Marc & Amit',
    location: 'Berlin, Germany',
    destination: 'Chokkarmudi Summit Trek',
    avatar: '/assets/munnar_chokkarmudi_trek.jpg',
    rating: 5,
    quote: 'Standing above the clouds at Chokkarmudi Peak was surreal! It was more than just a trek—it was a soulful journey through untouched wilderness.',
    tagline: 'SUMMIT TREK EXPEDITION',
  },
  {
    id: 5,
    name: 'Amal & Friends',
    location: 'Chennai, India',
    destination: 'High-Altitude Munnar Viewpoints',
    avatar: '/assets/tour_munnar.png',
    rating: 5,
    quote: 'Our group trip to Munnar was an absolute blast! High-altitude viewpoints, walking through emerald tea gardens, and flawless private planning.',
    tagline: 'FRIENDSHIP ESCAPE',
  },
  {
    id: 6,
    name: 'Ananya & Vikram',
    location: 'Bengaluru, India',
    destination: 'Alleppey Backwaters Cruise',
    avatar: '/assets/tour_alleppey.png',
    rating: 5,
    quote: 'Gliding silently through the backwaters on a luxury private houseboat at sunset was pure bliss. Pranara exceeded every expectation.',
    tagline: 'BACKWATER SANCTUARY',
  },
  {
    id: 7,
    name: 'Claire & Jean-Pierre',
    location: 'Paris, France',
    destination: 'Wayanad Rainforest & Wildlife',
    avatar: '/assets/tour_wayanad.png',
    rating: 5,
    quote: 'A magical immersion into Kerala’s rich wildlife and treehouse resorts. Warm hospitality, exquisite cuisine, and flawless curation.',
    tagline: 'LUXURY ECO RETREAT',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlayingUrl, setVideoPlayingUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef(null);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (!data || data.length === 0) return;

        // Deduplicate API response to avoid same-guest repeat reviews
        const uniqueBackend = [];
        const seen = new Set();
        data.forEach((t) => {
          const key = `${t.name}-${t.quote}`.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            uniqueBackend.push(t);
          }
        });

        // Merge backend reviews into corresponding static fallback frames
        const merged = STATIC_TESTIMONIALS.map((s, idx) => {
          if (idx < uniqueBackend.length) {
            const t = uniqueBackend[idx];
            return {
              ...s,
              ...t,
              avatar: t.avatar || s.avatar,
              destination: t.destination || s.destination,
              tagline: t.tagline || s.tagline,
              videoUrl: s.videoUrl // Retain local video URLs if mapped
            };
          }
          return s;
        });

        setTestimonials(merged);
      })
      .catch(() => {
        /* Keep static fallback */
      });
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered || videoPlayingUrl) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    autoplayTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7500);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [testimonials.length, isHovered, videoPlayingUrl]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;
  const activeItem = testimonials[activeIndex];

  return (
    <section 
      className="testimonials-editorial-section" 
      id="testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient glow shapes */}
      <div className="coverflow-bg-ambient" aria-hidden="true">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <div className="testimonials-editorial-container">
        {/* Section Header */}
        <div className="editorial-header">
          <div className="editorial-badge">
            <span className="badge-dot" />
            <span>GUEST EXPERIENCES & STORIES</span>
          </div>
          <h2 className="editorial-title">
            Voices of <span className="text-gold-gradient">Luxury Travel</span>
          </h2>
          <p className="editorial-subtitle">
            Discover how explorers from around the globe experienced Kerala’s breathtaking beauty with Pranara’s bespoke journeys.
          </p>
        </div>

        {/* Split Spotlight Layout */}
        <div className="testimonial-split-layout">
          
          {/* Left Column: Visual Showcase */}
          <div className="testimonial-visual-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="visual-card-inner"
              >
                <div className="visual-image-wrapper">
                  <img
                    src={activeItem.avatar}
                    alt={activeItem.name}
                    className="visual-main-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/logo.png';
                    }}
                  />
                  <div className="visual-overlay" />
                </div>
                
                {/* Tagline & Destination Badges */}
                <div className="visual-badge-overlay">
                  <span className="visual-tagline">{activeItem.tagline || 'BESPOKE EXPERIENCE'}</span>
                  <h3 className="visual-destination">{activeItem.destination}</h3>
                </div>

                {/* Video Play Trigger if video exists */}
                {activeItem.videoUrl && (
                  <button 
                    onClick={() => setVideoPlayingUrl(activeItem.videoUrl)}
                    className="video-play-trigger"
                    aria-label="Play video testimonial"
                  >
                    <div className="play-button-pulse" />
                    <svg className="play-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Journey</span>
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Review Details */}
          <div className="testimonial-content-card">
            {/* Navigation & Fraction indicator */}
            <div className="testimonial-navigation-bar">
              <div className="testimonial-fraction-indicator">
                <span className="current-index">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="divider">/</span>
                <span className="total-count">{String(testimonials.length).padStart(2, '0')}</span>
              </div>
              
              <div className="nav-arrows">
                <button onClick={handlePrev} className="nav-arrow-btn" aria-label="Previous review">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button onClick={handleNext} className="nav-arrow-btn" aria-label="Next review">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="quote-content-wrapper">
              <div className="editorial-quote-mark" aria-hidden="true">“</div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="quote-inner"
                >
                  {/* Rating Stars */}
                  <div className="editorial-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className="editorial-star-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={i < activeItem.rating ? '#D4AF37' : 'none'}
                        stroke="#D4AF37"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Quote Text */}
                  <blockquote className="editorial-quote-text">
                    "{activeItem.quote}"
                  </blockquote>

                  {/* Guest Meta info */}
                  <div className="editorial-author-meta">
                    <h4 className="author-name">{activeItem.name}</h4>
                    <p className="author-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {activeItem.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Bottom Interactive Navigation Grid */}
        <div className="traveler-navigator">
          <p className="navigator-label">DISCOVER STORIES BY TRAVELER</p>
          <div className="navigator-grid">
            {testimonials.map((item, idx) => {
              // Extract short name and destination for clean preview tiles
              const shortName = item.name.split(' & ')[0].split(' Family')[0].split(', ')[0];
              const shortDest = item.destination.split(', ')[0];
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`navigator-tile ${activeIndex === idx ? 'active' : ''}`}
                >
                  <div className="navigator-avatar-wrapper">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="navigator-avatar-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/logo.png';
                      }}
                    />
                    {activeIndex === idx && (
                      <motion.div 
                        layoutId="active-avatar-ring" 
                        className="active-avatar-ring"
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      />
                    )}
                  </div>
                  <div className="navigator-info">
                    <span className="navigator-name">{shortName}</span>
                    <span className="navigator-dest">{shortDest}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Testimonial Overlay Modal */}
      <AnimatePresence>
        {videoPlayingUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-modal-backdrop"
            onClick={() => setVideoPlayingUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal-btn" 
                onClick={() => setVideoPlayingUrl(null)}
                aria-label="Close video player"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="modal-video-wrapper">
                <video src={videoPlayingUrl} controls autoPlay className="modal-video-player" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
