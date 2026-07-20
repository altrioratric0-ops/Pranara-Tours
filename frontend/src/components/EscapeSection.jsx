import React, { useRef, useEffect, useState } from 'react';

const escapePackages = [
  {
    id: 'escape-stays',
    title: 'ESCAPE PACKAGES',
    subtitle: 'Disconnect to reconnect.',
    checklist: ['Scenic Stays', 'Tea Garden Retreats', 'Peaceful Hideouts'],
    imageUrl: '/assets/tour_munnar.png',
    tagline: 'Peaceful Hideouts & Tea Garden Retreats in Pristine Munnar',
    overview: 'Immerse yourself in total serenity with our exclusive escape packages. Wake up to mist-shrouded mountain views, stroll through private tea plantations, and unwind in handpicked luxury eco-resorts & boutique retreats designed for deep relaxation.',
    highlights: [
      '🏡 Luxury Eco-Resorts & Private Plantation Cottages',
      '🍵 Private Tea Tasting & Guided Estate Walks',
      '🌅 Sunrise Viewpoint & Chilly Mountain Breakfast',
      '🧘 Outdoor Yoga & Evening Campfire Under Stars'
    ],
    sites: [
      { name: 'Tea Garden Estate Villa', image: '/assets/tour_munnar.png', desc: 'Lush greenery right outside your window.' },
      { name: 'Kolukkumalai Cloud Sunrise', image: '/assets/munnar_kolukkumalai.png', desc: 'Breathtaking high-altitude valley views.' },
      { name: 'Eravikulam Misty Trails', image: '/assets/munnar_eravikulam.png', desc: 'Tranquil walking trails surrounded by nature.' },
      { name: 'Attukad Waterfall Hideout', image: '/assets/munnar_attukad.png', desc: 'Cascading waters in a serene forest valley.' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Plantation Warm Welcome', desc: 'Check into your scenic tea estate resort, enjoy refreshing local cardamom tea, and relax by the evening campfire.' },
      { day: 'Day 2', title: 'Misty Tea Trail & Waterfall Escape', desc: 'Guided morning walk through private tea gardens followed by a private picnic near Attukad waterfall.' },
      { day: 'Day 3', title: 'Sunrise Cloud View & Departure', desc: 'Catch the magical sunrise over misty hills before enjoying a leisurely breakfast and relaxed departure.' }
    ],
    included: ['Luxury Accommodation', 'Daily Breakfast & Dinner', 'Guided Estate Tour', 'Private Transport', 'Campfire Evening']
  },
  {
    id: 'tour-travel',
    title: 'TOUR & TRAVEL PACKAGES',
    subtitle: 'Curated journeys. Local stories.',
    checklist: ['Sightseeing', 'Local Experiences', 'Comfortable Travel'],
    imageUrl: '/assets/tour_thekkady.png',
    tagline: 'Comprehensive Sightseeing & Cultural Discovery of Munnar',
    overview: 'Experience the finest sights, sounds, and stories of Munnar and surrounding hotspots. From misty peak viewpoints and historical tea museums to wildlife sanctuaries and spice gardens, our expert local guides ensure a rich, hassle-free journey.',
    highlights: [
      '🚘 Private Chauffeur-Driven AC Vehicle Throughout',
      '🎟 Skip-the-Line Entry Tickets to All Top Attractions',
      '🦣 Eravikulam National Park & Rare Nilgiri Tahr Spotting',
      '🍃 Spice Plantation Guided Sensory Walk & Tea Tasting'
    ],
    sites: [
      { name: 'Thekkady Wildlife Reserve', image: '/assets/tour_thekkady.png', desc: 'Dense spice forests & wildlife boating.' },
      { name: 'Top Station Ridge', image: '/assets/munnar_top_station.png', desc: 'Panoramic 360° border view of Western Ghats.' },
      { name: 'KDHP Tea Museum', image: '/assets/munnar_tea_museum.png', desc: 'Discover 100+ years of tea processing history.' },
      { name: 'Mattupetty Lake & Dam', image: '/assets/munnar_mattupetty.png', desc: 'Speed boating surrounded by rolling hills.' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Munnar Heritage & Tea Museum', desc: 'Explore Munnar town, visit the historic Tea Museum, and taste freshly processed Orthodox teas.' },
      { day: 'Day 2', title: 'Top Station, Mattupetty & Eco Point', desc: 'Full day sightseeing covering Mattupetty Dam, Echo Point, Kundala Lake, and Top Station views.' },
      { day: 'Day 3', title: 'Eravikulam National Park & Spice Gardens', desc: 'Morning safari inside Eravikulam Park to spot Nilgiri Tahr, followed by an organic spice garden tour.' }
    ],
    included: ['Dedicated Local Guide/Driver', 'Sightseeing Entry Passes', 'Comfortable AC Vehicle', 'Hotel Pickups & Drops', 'Mineral Water & Snacks']
  },
  {
    id: 'offroad-adventure',
    title: 'OFFROAD ADVENTURE PACKAGES',
    subtitle: 'For the thrill seekers.',
    checklist: ['Thar Offroad Drive', 'Hidden Trails', 'Adrenaline Rush'],
    imageUrl: '/assets/tour_offroad.png',
    tagline: '4x4 Thar Mountain Expeditions & High-Altitude Trekking Trails',
    overview: 'Supercharge your adrenaline with high-octane 4x4 Jeep safaris into rugged terrains unreachable by standard cars. Navigate steep mountain tracks, trek to untouched summit points, and fly high on Munnar’s longest zip line.',
    highlights: [
      '🚙 Open 4x4 Thar Jeep Mountain Safari',
      '⛰ Visit Kolukkumalai - World’s Highest Tea Estate',
      '🧗 Extreme High-Altitude Ridge Trekking',
      '🦅 Zipline Canopy Aerial Glide over Valleys'
    ],
    sites: [
      { name: 'Offroad Thar Safari', image: '/assets/tour_offroad.png', desc: 'Conquer rocky mountain trails in a 4x4 Thar.' },
      { name: 'Zipline Canopy Flight', image: '/assets/munnar_zipline.png', desc: 'High-speed thrill over green tea valleys.' },
      { name: 'Rugged Jeep Trail', image: '/assets/insta_jeep.png', desc: 'Rugged offroad tracks deep into forest hills.' },
      { name: 'Anamudi Peak Trails', image: '/assets/munnar_anamudi.png', desc: 'Majestic views from South India’s highest peak region.' }
    ],
    itinerary: [
      { day: 'Day 1', title: '4x4 Thar Pick-Up & Mountain Expedition', desc: 'Board your custom offroad 4x4 and head into the rugged wilderness for high-altitude trail driving.' },
      { day: 'Day 2', title: 'Kolukkumalai Sunrise & Zipline Adventure', desc: 'Early 4:00 AM Jeep drive to Kolukkumalai peak for clouds sunrise, followed by afternoon zipline aerial thrills.' },
      { day: 'Day 3', title: 'Forest Stream Crossing & Summit Trek', desc: 'Trek along hidden ridge trails and relax near pristine mountain streams before heading back.' }
    ],
    included: ['4x4 Thar Jeep & Expert Offroad Driver', 'Safety Helmets & Gear', 'Zipline Activity Pass', 'High-Altitude Guide', 'First Aid & Safety Support']
  }
];

const adventureItems = [
  {
    title: 'OFFROAD DRIVES',
    desc: 'Conquer rugged terrains in a 4x4 safari.',
    images: [
      '/assets/tour_offroad.png',
      '/assets/insta_jeep.png',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M12 2v9M8 5h8M6 11V7a3 3 0 0 1 6 0v4M18 11V7a3 3 0 0 0-3-3h-3" />
        <circle cx="7.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    )
  },
  {
    title: 'TREKKING',
    desc: 'Trails that test, views that heal.',
    images: [
      '/assets/munnar_top_station.png',
      '/assets/munnar_anamudi.png',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 15l3-3-3-3" />
        <path d="M22 12H13" />
      </svg>
    )
  },
  {
    title: 'HIKING',
    desc: 'One step closer to nature.',
    images: [
      '/assets/munnar_kolukkumalai.png',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20L17 11L14 14L11 8L3 20H20Z" />
        <circle cx="12" cy="5" r="1.5" />
      </svg>
    )
  },
  {
    title: 'ZIPLINE',
    desc: 'Fly high. Feel alive.',
    images: [
      '/assets/munnar_zipline.png',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3L21 21M10 10l2 2-2 4 4-2 2 2" />
      </svg>
    )
  },
  {
    title: 'CAMP FIRE',
    desc: 'Stories. Stars. Unforgettable nights.',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22l8-8M16 22L8 14" strokeWidth="2" />
        <path d="M12 2C10 5 9 8 10 11C11.5 12 12.5 12.5 13.5 11C15 9 14 5 12 2Z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: 'NATURAL ESCAPES',
    desc: 'Pure air. Green everywhere.',
    images: [
      '/assets/munnar_eravikulam.png',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C12 22 20 18 20 12C20 6.5 15.5 2 12 2C8.5 2 4 6.5 4 12C4 18 12 22 12 22Z" />
        <path d="M12 2V22M12 12c2-2 4-2 5 0M12 15c-2-2-4-2-5 0" />
      </svg>
    )
  },
  {
    title: 'WATERFALLS',
    desc: 'Raw. Powerful. Magical.',
    images: [
      '/assets/munnar_attukad.png',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12M8 5v10M16 5v10M4 18c3-1 5-1 8 0s5 1 8 0" />
      </svg>
    )
  }
];

const SectionTitle = ({ title }) => (
  <div className="escape-title-wrapper">
    <div className="leaf-decor left-decor">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 14C10 14 18 10 26 5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10C5 7 8 5 9 6C8 8 7 10 7 10Z" fill="var(--primary)"/>
        <path d="M15 8C13 5 16 3 17 4C16 6 15 8 15 8Z" fill="var(--primary)"/>
        <path d="M22 6C20 3 23 1 24 2C23 4 22 6 22 6Z" fill="var(--primary)"/>
      </svg>
    </div>
    <h2 className="escape-section-heading">{title}</h2>
    <div className="leaf-decor right-decor">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M2 14C10 14 18 10 26 5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10C5 7 8 5 9 6C8 8 7 10 7 10Z" fill="var(--primary)"/>
        <path d="M15 8C13 5 16 3 17 4C16 6 15 8 15 8Z" fill="var(--primary)"/>
        <path d="M22 6C20 3 23 1 24 2C23 4 22 6 22 6Z" fill="var(--primary)"/>
      </svg>
    </div>
  </div>
);

export default function EscapeSection() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [imageIndices, setImageIndices] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImageIdx, setLightboxImageIdx] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const requestRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Card mini-slideshow autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prev => prev.map((idx, i) => {
        const item = adventureItems[i];
        if (item.images && item.images.length > 1) {
          return (idx + 1) % item.images.length;
        }
        return idx;
      }));
    }, 4500); // Crossfade image every 4.5 seconds
    return () => clearInterval(interval);
  }, []);



  // Main slider smooth marquee autoplay effect
  useEffect(() => {
    if (isPaused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    const animateMarquee = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        
        // Only run marquee crawl when not manual scrolling
        if (!isScrollingRef.current) {
          container.scrollLeft += 0.8; // 0.8px per frame crawl

          const halfWidth = container.scrollWidth / 2;
          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft = container.scrollLeft - halfWidth;
          }
        }
      }
      requestRef.current = requestAnimationFrame(animateMarquee);
    };

    requestRef.current = requestAnimationFrame(animateMarquee);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused]);

  const openLightbox = (itemIdx) => {
    setLightboxIndex(itemIdx);
    setLightboxImageIdx(0);
    setIsPaused(true); // pause slider during details inspection
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsPaused(false);
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    const item = adventureItems[lightboxIndex];
    setLightboxImageIdx((prev) => (prev + 1) % item.images.length);
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    const item = adventureItems[lightboxIndex];
    setLightboxImageIdx((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.querySelector('.adventure-card');
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const scrollStep = cardWidth + gap;
        
        isScrollingRef.current = true;
        container.scrollBy({
          left: direction === 'left' ? -scrollStep : scrollStep,
          behavior: 'smooth'
        });

        // Resume continuous scroll loop after transition animation completes (500ms)
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    }
  };

  return (
    <section className="escape-section" id="escapes">
      <div className="container">
        {/* Subsection 1: Packages */}
        <div className="escape-packages-container">
          <SectionTitle title="PACKAGES FOR EVERY KIND OF ESCAPE" />
          
          <div className="escape-packages-grid">
            {escapePackages.map((pkg, idx) => (
              <div className="escape-card" key={idx}>
                <div className="escape-card-image-wrapper">
                  <div 
                    className="escape-card-image" 
                    style={{ backgroundImage: `url(${pkg.imageUrl})` }}
                  />
                </div>
                <div className="escape-card-body">
                  <h3 className="escape-card-title">{pkg.title}</h3>
                  <p className="escape-card-subtitle">{pkg.subtitle}</p>
                  
                  <ul className="escape-card-checklist">
                    {pkg.checklist.map((item, i) => (
                      <li key={i} className="escape-checklist-item">
                        <svg className="check-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="9" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1.5" />
                          <path d="M6 10L9 13L14 7" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="escape-card-footer">
                    <button 
                      type="button" 
                      className="btn-escape-explore" 
                      onClick={() => setSelectedPackage(pkg)}
                      title="Explore Package Details"
                      aria-label={`Explore ${pkg.title}`}
                    >
                      <span className="btn-explore-text">Explore Details</span>
                      <svg className="btn-explore-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 2: Adventures */}
        <div className="escape-adventures-container">
          <div className="adventure-header-row">
            <SectionTitle title="ADVENTURES THAT STAY WITH YOU" />
            <div className="adventure-carousel-controls">
              <button className="adventure-control-btn prev-btn" onClick={() => scroll('left')} aria-label="Previous Adventure">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button className="adventure-control-btn next-btn" onClick={() => scroll('right')} aria-label="Next Adventure">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            className="adventure-carousel-container" 
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="adventure-carousel-track">
              {[...adventureItems, ...adventureItems].map((item, idx) => {
                const origIdx = idx % adventureItems.length;
                return (
                  <div className="adventure-card" key={`item-${idx}`}>
                    <div className="adventure-image-wrapper" onClick={() => openLightbox(origIdx)}>
                      {item.images.map((imgUrl, imgIdx) => (
                        <div 
                          key={imgIdx}
                          className={`adventure-image ${imgIdx === imageIndices[origIdx] ? 'active' : ''}`}
                          style={{ backgroundImage: `url(${imgUrl})` }}
                        />
                      ))}
                      <div className="adventure-icon-badge">
                        {item.icon}
                      </div>
                      <div className="adventure-card-arrow-overlay">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="adventure-body">
                      <h4 className="adventure-title">{item.title}</h4>
                      <p className="adventure-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subsection 3: Trust Features Banner */}
        <div className="trust-features-banner">
          <div className="trust-features-grid">
            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>HANDPICKED EXPERIENCES</h5>
                <p>Curated with love & local insight</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>BEST PRICE GUARANTEE</h5>
                <p>Honest prices. No hidden fees.</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>SAFE & RELIABLE</h5>
                <p>Your safety is our priority</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>LOCAL EXPERTS</h5>
                <p>Guides who know the land</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fullscreen Lightbox Slideshow Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Slideshow">&times;</button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-btn prev-btn" onClick={prevLightboxImage} aria-label="Previous image">&#10094;</button>
            
            <div className="lightbox-slide-wrapper">
              <img 
                src={adventureItems[lightboxIndex].images[lightboxImageIdx]} 
                alt={adventureItems[lightboxIndex].title} 
                className="lightbox-img" 
              />
              <div className="lightbox-caption">
                <h4>{adventureItems[lightboxIndex].title}</h4>
                <p>{adventureItems[lightboxIndex].desc}</p>
                <div className="lightbox-dots">
                  {adventureItems[lightboxIndex].images.map((_, i) => (
                    <span 
                      key={i} 
                      className={`lightbox-dot ${i === lightboxImageIdx ? 'active' : ''}`}
                      onClick={() => setLightboxImageIdx(i)}
                    />
                  ))}
                </div>
                <span className="lightbox-counter">
                  {lightboxImageIdx + 1} / {adventureItems[lightboxIndex].images.length}
                </span>
              </div>
            </div>
            
            <button className="lightbox-btn next-btn" onClick={nextLightboxImage} aria-label="Next image">&#10095;</button>
          </div>
        </div>
      )}
      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="package-modal-overlay" onClick={() => setSelectedPackage(null)}>
          <div className="package-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="package-modal-close" 
              onClick={() => setSelectedPackage(null)} 
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="package-modal-header">
              <span className="package-modal-tagline">{selectedPackage.tagline}</span>
              <h2 className="package-modal-title">{selectedPackage.title}</h2>
              <p className="package-modal-subtitle">{selectedPackage.subtitle}</p>
            </div>

            {/* Overview */}
            <div className="package-modal-section">
              <h3 className="package-section-heading">Overview</h3>
              <p className="package-modal-desc">{selectedPackage.overview}</p>
            </div>

            {/* Highlights */}
            <div className="package-modal-section">
              <h3 className="package-section-heading">Key Highlights</h3>
              <div className="package-highlights-grid">
                {selectedPackage.highlights.map((h, i) => (
                  <div className="package-highlight-chip" key={i}>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Sites & Photos */}
            <div className="package-modal-section">
              <h3 className="package-section-heading">Sites & Attractions Photos</h3>
              <div className="package-sites-grid">
                {selectedPackage.sites.map((site, i) => (
                  <div className="package-site-card" key={i}>
                    <div 
                      className="package-site-img" 
                      style={{ backgroundImage: `url(${site.image})` }} 
                    />
                    <div className="package-site-info">
                      <h4>{site.name}</h4>
                      <p>{site.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary Breakdown */}
            <div className="package-modal-section">
              <h3 className="package-section-heading">Trip Itinerary Breakdown</h3>
              <div className="package-itinerary-list">
                {selectedPackage.itinerary.map((item, i) => (
                  <div className="package-itinerary-item" key={i}>
                    <span className="itinerary-day-badge">{item.day}</span>
                    <div className="itinerary-item-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Facilities */}
            <div className="package-modal-section">
              <h3 className="package-section-heading">What's Included</h3>
              <ul className="package-inclusions-list">
                {selectedPackage.included.map((inc, i) => (
                  <li key={i}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1.5" />
                      <path d="M6 10L9 13L14 7" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="package-modal-actions">
              <button 
                className="btn-modal-book"
                onClick={() => {
                  setSelectedPackage(null);
                  const bookingEl = document.getElementById('booking');
                  if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book This Package
              </button>
              <button 
                className="btn-modal-secondary"
                onClick={() => setSelectedPackage(null)}
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
