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
          <div className="editorial-header-text">
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
          <div className="header-nav-arrows">
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

        {/* 3D Testimonial Card Carousel */}
        <div className="testimonial-carousel-wrapper">
          <div className="testimonial-cards-container">
            {testimonials.map((item, idx) => {
              // Calculate relative position
              let diff = idx - activeIndex;
              const len = testimonials.length;
              if (diff < -len / 2) diff += len;
              if (diff > len / 2) diff -= len;

              // Determine card positioning classes
              let positionClass = '';
              if (diff === 0) positionClass = 'active';
              else if (diff === -1) positionClass = 'prev-1';
              else if (diff === 1) positionClass = 'next-1';
              else if (diff === -2) positionClass = 'prev-2';
              else if (diff === 2) positionClass = 'next-2';
              else positionClass = 'hidden';

              return (
                <div
                  key={item.id}
                  className={`testimonial-card ${positionClass}`}
                  onClick={() => {
                    if (diff !== 0) setActiveIndex(idx);
                  }}
                >
                  {/* Top destination badge/pill */}
                  <div className="card-dest-badge">
                    <span className="pin-icon">📍</span>
                    <span className="dest-text">{item.destination}</span>
                  </div>

                  {/* Avatar wrapper with check badge */}
                  <div className="card-avatar-container">
                    <div className="card-avatar-wrapper">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="card-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/logo.png';
                        }}
                      />
                      <div className="verified-badge" title="Verified Guest">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="card-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className="card-star-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#D4AF37"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote content */}
                  <div className="card-quote-wrapper">
                    <span className="card-quote-mark">“</span>
                    <p className="card-quote-text">"{item.quote}"</p>
                  </div>

                  {/* Divider */}
                  <div className="card-divider" />

                  {/* Author meta */}
                  <div className="card-author-info">
                    <h4 className="card-author-name">{item.name}</h4>
                    <p className="card-author-location">{item.location}</p>
                  </div>

                  {/* Play video trigger if available */}
                  {item.videoUrl && diff === 0 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoPlayingUrl(item.videoUrl);
                      }}
                      className="video-play-trigger-card"
                      aria-label="Play video testimonial"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch Journey</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`testimonial-dot ${activeIndex === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
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
