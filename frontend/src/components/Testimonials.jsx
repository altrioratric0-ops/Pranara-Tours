import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTestimonials } from '../api/client';

/* ─── Static fallback testimonials (always shown if API is down) ─── */
const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Nair',
    location: 'Bangalore, India',
    avatar_initials: 'PN',
    rating: 5,
    quote: 'The trek to Chokkarmudi was beyond anything I had imagined. Our guide Rajan knew every hidden trail and shared stories that made the mountain feel alive. Pranara didn\'t just plan a trip — they crafted an emotion.',
    heroImg: '/assets/munnar_top_station.png',
    thumbImg: '/assets/munnar_kolukkumalai.png',
    tagline: 'TREKKING • CHOKKARMUDI PEAK',
    subtitle: 'Voices from the Summit',
    note: '"More than a trek — an emotion!"',
    pageNum: '01',
  },
  {
    id: 2,
    name: 'Rahul & Deepa Menon',
    location: 'Chennai, India',
    avatar_initials: 'RM',
    rating: 5,
    quote: 'Floating through the Alleppey backwaters at golden hour, watching the sun dip behind coconut palms from our private houseboat deck — this is the Kerala that no brochure can fully capture. Absolutely magical.',
    heroImg: '/assets/insta_houseboat.png',
    thumbImg: '/assets/tour_alleppey.png',
    tagline: 'BACKWATERS • ALLEPPEY STAY',
    subtitle: 'Drifting Through Paradise',
    note: '"A magical floating paradise!"',
    pageNum: '02',
  },
  {
    id: 3,
    name: 'Arjun Sharma',
    location: 'Mumbai, India',
    avatar_initials: 'AS',
    rating: 5,
    quote: 'Spotting a family of wild elephants at Thekkady, completely unscripted and raw — that moment will stay with me forever. Pranara\'s naturalist guides made sure we understood the forest, not just saw it.',
    heroImg: '/assets/tour_thekkady.png',
    thumbImg: '/assets/insta_waterfall.png',
    tagline: 'WILDLIFE • THEKKADY SAFARI',
    subtitle: 'Into the Wild',
    note: '"Raw beauty, superbly organised."',
    pageNum: '03',
  },
  {
    id: 4,
    name: 'Sneha & Kiran Pillai',
    location: 'Hyderabad, India',
    avatar_initials: 'SK',
    rating: 5,
    quote: 'Walking hand-in-hand through the endless green carpet of Munnar\'s tea estates, breathing in the crisp mountain air with a freshly brewed cup — our honeymoon was everything and more thanks to Pranara.',
    heroImg: '/assets/munnar_attukad.png',
    thumbImg: '/assets/munnar_mattupetty.png',
    tagline: 'PLANTATION • TEA ESTATE WALK',
    subtitle: 'Misty Trails of Munnar',
    note: '"Walking through a canvas of green!"',
    pageNum: '04',
  },
  {
    id: 5,
    name: 'Vijay Kumar',
    location: 'Delhi, India',
    avatar_initials: 'VK',
    rating: 5,
    quote: 'The Edakkal Caves in Wayanad were unlike anything I\'d seen — prehistoric rock carvings in a forest that felt untouched by time. Our guide brought history to life in a way no museum ever could.',
    heroImg: '/assets/tour_wayanad.png',
    thumbImg: '/assets/munnar_eravikulam.png',
    tagline: 'HERITAGE • EDAKKAL CAVES',
    subtitle: 'Wayanad Wilderness',
    note: '"History carved in stone!"',
    pageNum: '05',
  },
  {
    id: 6,
    name: 'Anjali & Suresh Reddy',
    location: 'Pune, India',
    avatar_initials: 'AR',
    rating: 5,
    quote: 'The pine forests of Vagamon at dawn — silent, tall, and draped in mist — felt like stepping into another world. Pranara found us a little cottage with a fireplace and a view that made time stand still.',
    heroImg: '/assets/munnar_echo_point.png',
    thumbImg: '/assets/munnar_kundala.png',
    tagline: 'RETREAT • PINE FOREST VAGAMON',
    subtitle: 'Echoes of Vagamon',
    note: '"Tranquility at its absolute finest!"',
    pageNum: '06',
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
