import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { fetchTestimonials } from '../api/client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

/* ─── Star rating component ─── */
function StarRating({ rating = 5 }) {
  return (
    <div className="coverflow-stars-row" aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="coverflow-star-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#D4AF37' : 'none'}
          stroke={i < rating ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (!data || data.length === 0) return;
        const merged = data.map((t, idx) => {
          const s = STATIC_TESTIMONIALS[idx % STATIC_TESTIMONIALS.length];
          return {
            ...s,
            ...t,
            avatar: t.avatar || s.avatar,
            destination: t.destination || s.destination || 'Kerala, India',
          };
        });
        setTestimonials(merged);
      })
      .catch(() => {
        /* Keep static fallback */
      });
  }, []);

  return (
    <section className="testimonials-coverflow-section" id="testimonials">
      {/* Background ambient glow shapes */}
      <div className="coverflow-bg-ambient" aria-hidden="true">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <div className="testimonials-container">
        {/* Section Header */}
        <div className="coverflow-header-wrapper">
          <div className="coverflow-header-text">
            <div className="coverflow-badge">
              <span className="badge-dot" />
              <span>GUEST EXPERIENCES & STORIES</span>
            </div>
            <h2 className="coverflow-section-title">
              Voices of <span className="text-gold-gradient">Luxury Travel</span>
            </h2>
            <p className="coverflow-section-subtitle">
              Discover how explorers from around the globe experienced Kerala’s breathtaking beauty with Pranara’s bespoke journeys.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="coverflow-nav-controls">
            <button
              ref={prevRef}
              className="coverflow-nav-btn prev-btn"
              aria-label="Previous Testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="coverflow-nav-btn next-btn"
              aria-label="Next Testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3D Coverflow Swiper Carousel */}
        <div className="coverflow-carousel-wrapper">
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            speed={750}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 12,
              stretch: 0,
              depth: 220,
              modifier: 1.25,
              slideShadows: false,
            }}
            pagination={{
              el: '.coverflow-swiper-pagination',
              clickable: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.15,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.3,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 2.7,
                spaceBetween: 40,
              },
            }}
            className="testimonial-coverflow-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="testimonial-coverflow-slide">
                <div className="testimonial-card-luxury">
                  {/* Decorative background quote element */}
                  <div className="card-quote-watermark" aria-hidden="true">“</div>

                  {/* Destination Pill Badge */}
                  <div className="card-destination-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{item.destination}</span>
                  </div>

                  {/* Circular Traveler Photo */}
                  <div className="traveler-photo-wrapper">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="traveler-photo-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/logo.png';
                      }}
                    />
                    <div className="traveler-photo-ring" />
                    <div className="verified-badge" title="Verified Explorer">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <StarRating rating={item.rating || 5} />

                  {/* Review Text Quote */}
                  <blockquote className="traveler-review-text">
                    "{item.quote}"
                  </blockquote>

                  {/* Card Footer: Traveler Details */}
                  <div className="traveler-meta-block">
                    <h4 className="traveler-name">{item.name}</h4>
                    <p className="traveler-location">{item.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots */}
          <div className="coverflow-swiper-pagination" />
        </div>
      </div>
    </section>
  );
}

