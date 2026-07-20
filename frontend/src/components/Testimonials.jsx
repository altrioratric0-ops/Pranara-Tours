import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTestimonials } from '../api/client';

/* ─── Static fallback testimonials (always shown if API is down) ─── */
const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: 'The Thompson Family',
    location: 'London, United Kingdom',
    avatar_initials: 'TF',
    rating: 5,
    quote: 'From the UK to the heart of Munnar. Thank you for letting us be part of your family\'s story. See you again, The Pranara Way.',
    heroImg: '/assets/munnar_uk_family.jpg',
    thumbImg: '/assets/munnar_uk_family.jpg',
    tagline: 'FAMILY JOURNEY • MUNNAR SAFARI',
    subtitle: 'From the UK to the Heart of Munnar',
    note: 'See you again, The Pranara Way!',
    pageNum: '01',
    hideLeftFooter: true,
  },
  {
    id: 2,
    name: 'The Adhikari Family',
    location: 'Mumbai, India',
    avatar_initials: 'AF',
    rating: 5,
    quote: 'Every journey becomes special because of the people in it. The pristine river streams, the lush green forests, and the memories we shared in Munnar. Thank you for letting Pranara be a part of yours. Until Next Time...',
    heroImg: '/assets/munnar_river_family.jpg',
    thumbImg: '/assets/munnar_river_family.jpg',
    tagline: 'PRANARA STORIES • RIVER GETAWAY',
    subtitle: 'Every Journey Becomes Special',
    note: 'Until Next Time... Pranara 🍃',
    pageNum: '02',
    hideLeftFooter: true,
  },
  {
    id: 3,
    name: 'Mr. & Mrs. Sharma',
    location: 'Delhi, India',
    avatar_initials: 'MS',
    rating: 5,
    quote: 'A perfect blend of comfort, adventure, and authentic local experiences. Every detail was handled with care, making this one of our most memorable trips. Highly recommend Pranara for anyone looking to explore Munnar in style and comfort.',
    heroImg: '/assets/munnar_pradeep_review.jpg',
    thumbImg: '/assets/munnar_pradeep_review.jpg',
    tagline: 'TRUSTED GUIDANCE • MEMORABLE JOURNEYS',
    subtitle: 'Trusted Guidance, Memorable Journeys',
    note: 'Highly recommend Mr. Pradeep!',
    pageNum: '03',
    hideLeftFooter: true,
  },
  {
    id: 4,
    name: 'Sarah, Marc & Amit',
    location: 'Berlin, Germany',
    avatar_initials: 'SMA',
    rating: 5,
    quote: 'From scenic tea plantations to breathtaking viewpoints, every experience exceeded our expectations. A premium travel experience we would gladly recommend.',
    heroImg: '/assets/munnar_chokkarmudi_trek.jpg',
    thumbImg: '/assets/munnar_chokkarmudi_trek.jpg',
    tagline: 'TREKKING • CHOKKARMUDI PEAK',
    subtitle: 'Voices from the Summit',
    note: 'It was more than just a trek, it was an emotion!',
    pageNum: '04',
    hideLeftFooter: true,
  },
  {
    id: 5,
    name: 'Amal & Friends',
    location: 'Chennai, India',
    avatar_initials: 'AF',
    rating: 5,
    quote: 'Our group trip to Munnar with Pranara was an absolute blast! From the high-altitude viewpoints to walking through the green tea gardens, the entire experience was perfectly planned and executed. The team made sure we captured the best memories.',
    videoSrc: '/assets/munnar_video_testimonial_5.mp4',
    isVideo: true,
    tagline: 'TRAVEL DIARIES • FRIENDSHIP GETAWAY',
    subtitle: 'Experience the Magic of Munnar',
    note: 'Watch the journey unfold!',
    pageNum: '05',
    hideLeftFooter: true,
  },
];

/* ─── Star renderer ─── */
function Stars({ rating }) {
  return (
    <div className="book-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={i < rating ? '#facc15' : 'none'}
          stroke={i < rating ? '#facc15' : 'rgba(255,255,255,0.35)'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Left page: full-bleed hero photo + footer strip ─── */
function LeftPage({ data }) {
  if (data.hideLeftFooter) {
    return (
      <div 
        className="book-left-content" 
        style={{ 
          height: '100%', 
          padding: '24px', 
          boxSizing: 'border-box', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <div 
          className="testimonial-card-frame"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            background: '#fffef9',
            display: 'flex',
            position: 'relative'
          }}
        >
          {data.isVideo ? (
            <video 
              className="book-hero-video"
              src={data.videoSrc}
              controls
              muted
              autoPlay
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div 
              className="book-hero-photo" 
              style={{ 
                width: '100%',
                height: '100%',
                backgroundImage: `url(${data.heroImg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                boxShadow: 'none'
              }} 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="book-left-content">
      <div className="book-hero-photo" style={{ backgroundImage: `url(${data.heroImg})` }} />
      <div className="book-left-footer">
        <div className="book-thumb-photo" style={{ backgroundImage: `url(${data.thumbImg})` }} />
        <div className="book-left-meta">
          <Stars rating={data.rating} />
          <p className="book-left-note">{data.note}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Right page: journal narrative ─── */
function RightPage({ data }) {
  return (
    <div className="book-right-content">
      <span className="book-page-number">— {data.pageNum} —</span>
      <span className="book-right-tagline">{data.tagline}</span>
      <h3 className="book-right-title">{data.subtitle}</h3>
      <blockquote className="book-right-quote">{data.quote}</blockquote>
      <div className="book-right-divider" />
      <div className="book-right-author">
        <div className="book-author-avatar">
          {data.avatar_initials || (data.name ? data.name.charAt(0) : 'P')}
        </div>
        <div className="book-author-info">
          <h5>{data.name}</h5>
          <p>{data.location}</p>
        </div>
        <svg className="book-heart-icon" width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isFlipping, setIsFlipping]     = useState(false);
  const [flipDir, setFlipDir]           = useState('next');

  /* Try to enrich with API data; fall back to static if it fails */
  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (!data || data.length === 0) return; // keep static
        const merged = data.map((t, idx) => {
          const s = STATIC_TESTIMONIALS[idx % STATIC_TESTIMONIALS.length];
          return {
            ...s,
            ...t,
            heroImg:  s.heroImg,
            thumbImg: s.thumbImg,
            tagline:  s.tagline,
            subtitle: s.subtitle,
            note:     s.note,
            pageNum:  String(idx + 1).padStart(2, '0'),
          };
        });
        setTestimonials(merged);
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  const flip = (dir) => {
    if (isFlipping || testimonials.length < 2) return;
    setFlipDir(dir);
    setIsFlipping(true);
  };

  const total   = testimonials.length;
  const nextIdx = (activeIndex + 1) % total;
  const prevIdx = (activeIndex - 1 + total) % total;
  const cur = testimonials[activeIndex];
  const nxt = testimonials[nextIdx];
  const prv = testimonials[prevIdx];

  return (
    <section className="book-testimonials-section" id="testimonials">
      <div className="container">

        {/* ── Header ── */}
        <div className="book-header-row">
          <div>
            <h2 className="section-title"><span className="accent">Explorers Say</span></h2>
            <p className="section-subtitle">
              Leaf through our journal of real travel stories.
            </p>
          </div>
          <div className="book-navigation">
            <button className="book-nav-btn" onClick={() => flip('prev')} aria-label="Previous page">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <span className="book-page-counter">{activeIndex + 1} / {total}</span>
            <button className="book-nav-btn" onClick={() => flip('next')} aria-label="Next page">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── 3D Book ── */}
        <div className="book-3d-wrapper">
          <div className="book-hardcover">

            {/* Static Left Page */}
            <div className="book-page book-page-left">
              <LeftPage data={isFlipping ? (flipDir === 'next' ? nxt : prv) : cur} />
            </div>

            {/* Static Right Page */}
            <div className="book-page book-page-right">
              <RightPage data={isFlipping ? (flipDir === 'next' ? nxt : prv) : cur} />
            </div>

            {/* ── Animated flipper ── */}
            {isFlipping && (
              <motion.div
                key={`flip-${activeIndex}-${flipDir}`}
                className={`book-page-flipper ${flipDir}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipDir === 'next' ? -180 : 180 }}
                transition={{ type: 'spring', stiffness: 42, damping: 13 }}
                onAnimationComplete={() => {
                  setActiveIndex(flipDir === 'next' ? nextIdx : prevIdx);
                  setIsFlipping(false);
                }}
                style={{
                  transformOrigin: flipDir === 'next' ? 'left center' : 'right center',
                  left:  flipDir === 'next' ? '50%' : '0',
                  right: flipDir === 'next' ? '0'   : '50%',
                  width: '50%',
                }}
              >
                {/* Front: the page being turned away */}
                <div className={`flipper-face flipper-front ${flipDir === 'next' ? 'is-right-page' : 'is-left-page'}`}>
                  {flipDir === 'next' ? <RightPage data={cur} /> : <LeftPage data={cur} />}
                </div>
                {/* Back: the destination content */}
                <div className={`flipper-face flipper-back ${flipDir === 'next' ? 'is-left-page' : 'is-right-page'}`}>
                  {flipDir === 'next' ? <LeftPage data={nxt} /> : <RightPage data={prv} />}
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
