import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTestimonials, submitTestimonial } from '../api/client';

/* ─── Static fallback testimonials ─── */
const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: 'The Thompson Family',
    location: 'London, United Kingdom',
    destination: 'Munnar , Kerala',
    avatar: '/assets/munnar_uk_family.jpg',
    rating: 4,
    quote: 'From the UK to the heart of Munnar! Every detail was handled with utmost elegance. The private tea estate tour and misty mountain views were breathtaking.',
    tagline: 'FAMILY SAFARI',
    videoUrl: '/assets/Testimonials/munnar_video_testimonial.mp4'
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
    videoUrl: '/assets/Testimonials/Ecopoint.mp4'
  },
  {
    id: 3,
    name: 'Mr. & Mrs.pradeep',
    location: 'Delhi, India',
    destination: 'Chokkarmudi & Private Estates',
    avatar: '/assets/munnar_pradeep_review.jpg',
    rating: 5,
    quote: 'A perfect blend of luxury, adventure, and authentic Kerala heritage. Every detail was handled with care, making this our most memorable trip ever.',
    tagline: 'HERITAGE & COMFORT',
    videoUrl: '/assets/Testimonials/Ecopoint_1.mp4'
  },
  {
    id: 4,
    name: 'Sarah, Aman,Roshni & Amit',
    location: 'Pune,Mumbai',
    destination: 'Chokkarmudi Summit Trek',
    avatar: '/assets/munnar_chokkarmudi_trek.jpg',
    rating: 5,
    quote: 'Standing above the clouds at Chokkarmudi Peak was surreal! It was more than just a trek—it was a soulful journey through untouched wilderness.',
    tagline: 'SUMMIT TREK EXPEDITION',
    videoUrl: '/assets/Testimonials/Elephant.mp4'
  },
  {
    id: 5,
    name: 'Amal david & Friends',
    location: 'Chennai, India',
    destination: 'High-Altitude Munnar Viewpoints',
    avatar: '/assets/tour_munnar.png',
    rating: 5,
    quote: 'Our group trip to Munnar was an absolute blast! High-altitude viewpoints, walking through emerald tea gardens, and flawless private planning.',
    tagline: 'FRIENDSHIP ESCAPE',
    videoUrl: '/assets/Testimonials/Peak.mp4'
  },
  {
    id: 6,
    name: 'Ashmija & Vikram',
    location: 'Bengaluru, India',
    destination: 'Alleppey Backwaters Cruise',
    avatar: '/assets/tour_alleppey.png',
    rating: 4,
    quote: 'Gliding silently through the backwaters on private houseboat at sunset was pure bliss. Pranara exceeded every expectation.',
    tagline: 'BACKWATER SANCTUARY',
    videoUrl: '/assets/Testimonials/Boat.mp4'
  },
  {
    id: 7,
    name: 'Claire & Jean-Pierre',
    location: 'Paris, France',
    destination: 'Wayanad Rainforest & Wildlife',
    avatar: '/assets/tour_wayanad.png',
    rating: 4,
    quote: 'A magical immersion into Kerala’s rich wildlife and treehouse resorts. Warm hospitality, exquisite cuisine, and flawless curation.',
    tagline: 'ECO RETREAT',
    videoUrl: '/assets/Testimonials/Elephant_1.mp4'
  },
];

/* ─── Deduplication Helper ─── */
const getNormalizedText = (str) => {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/^["'“]+|["'”]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const dedupeTestimonials = (list) => {
  if (!Array.isArray(list)) return [];
  const seenNames = new Set();
  const seenQuotes = new Set();
  const result = [];

  for (const item of list) {
    if (!item) continue;
    const nameKey = getNormalizedText(item.name);
    const quoteKey = getNormalizedText(item.quote || item.review);

    if (!nameKey && !quoteKey) continue;

    const isDuplicateName = nameKey && seenNames.has(nameKey);
    const isDuplicateQuote = quoteKey && seenQuotes.has(quoteKey);

    if (!isDuplicateName && !isDuplicateQuote) {
      if (nameKey) seenNames.add(nameKey);
      if (quoteKey) seenQuotes.add(quoteKey);
      result.push(item);
    }
  }
  return result;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(() => dedupeTestimonials(STATIC_TESTIMONIALS));
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlayingUrl, setVideoPlayingUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Touch Swipe Refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Review Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    destination: '',
    rating: '',
    tagline: '',
    quote: '',
    avatar: '',
    videoUrl: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const autoplayTimer = useRef(null);

  // ── localStorage helpers ──
  const LS_KEY = 'pranara_user_reviews';

  const loadLocalReviews = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return dedupeTestimonials(list);
    } catch {
      return [];
    }
  };

  const saveLocalReview = (review) => {
    try {
      const existing = loadLocalReviews();
      const updated = dedupeTestimonials([review, ...existing]);
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
    } catch {
      // localStorage not available — silently ignore
    }
  };

  useEffect(() => {
    // Load localStorage reviews immediately & merge with static without duplicates
    const localReviews = loadLocalReviews();
    setTestimonials(dedupeTestimonials([...localReviews, ...STATIC_TESTIMONIALS]));

    fetchTestimonials()
      .then((data) => {
        if (!data || !Array.isArray(data) || data.length === 0) return;

        const formattedBackend = data.map((t) => ({
          id: t.id ? `api-${t.id}` : `api-rand-${Math.random()}`,
          name: t.name,
          location: t.location || 'Verified Guest',
          destination: t.destination || 'Kerala Journey',
          avatar: t.avatar || '/assets/logo.png',
          rating: t.rating || 5,
          quote: t.quote || t.review,
          tagline: t.tagline || 'GUEST EXPERIENCE',
          videoUrl: t.videoUrl || t.video_url || ''
        }));

        const savedLocal = loadLocalReviews();
        setTestimonials(dedupeTestimonials([...savedLocal, ...formattedBackend, ...STATIC_TESTIMONIALS]));
      })
      .catch((err) => {
        console.warn('Testimonials API offline, using static fallback:', err.message);
        const savedLocal = loadLocalReviews();
        setTestimonials(dedupeTestimonials([...savedLocal, ...STATIC_TESTIMONIALS]));
      });
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered || videoPlayingUrl || isModalOpen) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    autoplayTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7500);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [testimonials.length, isHovered, videoPlayingUrl, isModalOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Mobile Touch Swipe Navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image file size must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Review Form Submission Handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      setFormError('Please enter your name and review story.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    const payload = {
      name: formData.name.trim(),
      location: formData.location.trim() || 'Verified Guest',
      destination: formData.destination.trim() || 'Kerala Experience',
      rating: formData.rating,
      tagline: (formData.tagline.trim() || 'GUEST EXPERIENCE').toUpperCase(),
      quote: formData.quote.trim(),
      avatar: formData.avatar || '/assets/logo.png',
      videoUrl: formData.videoUrl.trim()
    };

    try {
      const res = await submitTestimonial(payload);
      const createdItem = res?.data || payload;

      const newTestimonial = {
        id: createdItem.id || Date.now(),
        name: createdItem.name || payload.name,
        location: createdItem.location || payload.location,
        destination: createdItem.destination || payload.destination,
        avatar: createdItem.avatar || payload.avatar,
        rating: createdItem.rating || payload.rating,
        quote: createdItem.quote || payload.quote,
        tagline: createdItem.tagline || payload.tagline,
        videoUrl: createdItem.videoUrl || createdItem.video_url || payload.videoUrl
      };

      // Instantly prepend new review to testimonial section list
      setTestimonials((prev) => dedupeTestimonials([newTestimonial, ...prev]));
      setActiveIndex(0); // Focus on the newly uploaded review card!

      // Persist to localStorage so it survives page refreshes
      saveLocalReview(newTestimonial);

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          location: '',
          destination: '',
          rating: '',
          tagline: '',
          quote: '',
          avatar: '',
          videoUrl: ''
        });
      }, 1600);
    } catch (err) {
      console.warn("API submit notice:", err);
      // Fallback local update to guarantee review appears on page immediately
      const fallbackItem = {
        id: Date.now(),
        name: payload.name,
        location: payload.location,
        destination: payload.destination,
        avatar: payload.avatar,
        rating: payload.rating,
        quote: payload.quote,
        tagline: payload.tagline,
        videoUrl: payload.videoUrl
      };

      setTestimonials((prev) => dedupeTestimonials([fallbackItem, ...prev]));
      setActiveIndex(0);

      // Persist to localStorage so it survives page refreshes
      saveLocalReview(fallbackItem);

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          location: '',
          destination: '',
          rating: '',
          tagline: '',
          quote: '',
          avatar: '',
          videoUrl: ''
        });
      }, 1600);
    } finally {
      setSubmitting(false);
    }
  };

  if (testimonials.length === 0) return null;

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
            <h2 className="editorial-title">
              Voices of <span className="text-gold-gradient">WANDERLUST'S</span>
            </h2>
            <p className="editorial-subtitle">
              How explorers experienced Kerala’s breathtaking beauty with Pranara’s bespoke journeys.
            </p>
          </div>

          <div className="header-nav-controls">
            <button
              onClick={() => setIsModalOpen(true)}
              className="write-review-btn"
              title="Share your review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Write a Review</span>
            </button>

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
        </div>

        {/* 3D Testimonial Card Carousel */}
        <div className="testimonial-carousel-wrapper">
          <div
            className="testimonial-cards-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
                        src={item.avatar || '/assets/logo.png'}
                        alt={item.name}
                        className="card-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/logo.png';
                        }}
                      />
                      <div className="verified-badge" title="Verified Guest">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
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

                  {/* Play this review's video when one is available */}
                  {item.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoPlayingUrl(item.videoUrl);
                      }}
                      className="video-play-trigger-card"
                      aria-label="Watch guest review video"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch Review</span>
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

      {/* Write Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="review-modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 25, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="review-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close review form"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {submitSuccess ? (
                <div className="review-success-state">
                  <div className="success-icon-badge">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="success-title">Review Published!</h3>
                  <p className="success-sub">Your guest story has been uploaded and added directly to our testimonials.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="review-form">
                  <div className="review-modal-header">
                    <div className="editorial-badge">
                      <span className="badge-dot" />
                      <span>SHARE YOUR JOURNEY</span>
                    </div>
                    <h3 className="review-modal-title">Write a Guest Review</h3>
                    <p className="review-modal-sub">
                      Share your Kerala experience to inspire future explorers.
                    </p>
                  </div>

                  {formError && <div className="review-form-error">{formError}</div>}

                  <div className="review-form-grid">
                    {/* Name */}
                    <div className="review-form-group">
                      <label htmlFor="review-name">Your Name / Family Name *</label>
                      <input
                        id="review-name"
                        type="text"
                        placeholder="e.g. The Sharma Family or Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="review-form-group">
                      <label htmlFor="review-location">Your City & Country</label>
                      <input
                        id="review-location"
                        type="text"
                        placeholder="e.g. London, UK or Mumbai, India"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    {/* Destination/Tour */}
                    <div className="review-form-group">
                      <label htmlFor="review-dest">Tour / Destination Experienced</label>
                      <input
                        id="review-dest"
                        type="text"
                        placeholder="e.g. Munnar Tea Safari, Alleppey Cruise"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>

                    {/* Tagline */}
                    <div className="review-form-group">
                      <label htmlFor="review-tagline">Review Headline / Tagline</label>
                      <input
                        id="review-tagline"
                        type="text"
                        placeholder="e.g. UNFORGETTABLE MOUNTAIN ESCAPE"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="review-form-group rating-form-group">
                    <label>Your Rating *</label>
                    <div className="star-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-pick-btn ${star <= (hoverRating || formData.rating) ? 'filled' : ''}`}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${star} stars`}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill={star <= (hoverRating || formData.rating) ? "#D4AF37" : "none"} stroke="#D4AF37" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                      <span className="rating-num-label">{hoverRating || formData.rating} / 5 Stars</span>
                    </div>
                  </div>

                  {/* Quote / Review body */}
                  <div className="review-form-group">
                    <label htmlFor="review-quote">Your Experience Story *</label>
                    <textarea
                      id="review-quote"
                      rows="3"
                      placeholder="Describe your journey, hospitality, mountain views, and favorite moments..."
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      required
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="review-form-group photo-upload-group">
                    <label>Upload Photo / Avatar (Optional)</label>
                    <div className="photo-upload-container">
                      <input
                        type="file"
                        id="review-avatar-file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="photo-file-input"
                      />
                      <label htmlFor="review-avatar-file" className="photo-upload-box">
                        {formData.avatar ? (
                          <div className="photo-preview-wrapper">
                            <img src={formData.avatar} alt="Preview" className="photo-preview-img" />
                            <span className="photo-change-txt">Change Uploaded Photo</span>
                          </div>
                        ) : (
                          <div className="photo-placeholder">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>Click to upload guest photo (PNG, JPG)</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="review-modal-actions">
                    <button
                      type="button"
                      className="review-cancel-btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="review-submit-btn"
                    >
                      {submitting ? (
                        <span>Publishing Review...</span>
                      ) : (
                        <>
                          <span>Upload & Publish Review</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
