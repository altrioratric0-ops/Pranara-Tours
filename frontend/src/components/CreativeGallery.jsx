import { useEffect, useRef, useState } from 'react';

const DESTINATIONS = [
  {
    id: 'Munnar',
    name: 'Munnar',
    tagline: 'Misty Valleys & Tea Gardens',
    desc: 'Witness a golden sunrise above the clouds at Kolukkumalai, trek through high cliff waterfall paths, and explore historic tea plantations wrapped in refreshing mountain fog.',
    bg: '/assets/munnar_kolukkumalaigallery.jpeg',
    thumb: '/assets/munnar_kolukkumalaigallery.jpeg'
  },
  {
    id: 'Tea Estate',
    name: 'Tea Estate',
    tagline: 'A Journey Through Emerald Hills',
    desc: ' Walk through endless green hills, breathe the fresh mountain air, and experience the timeless beauty of Munnars tea gardens. Savor every moment where nature, peace, and unforgettable memories come together.',
    bg: '/assets/tour_tea_estate.jpeg',
    thumb: '/assets/tour_tea_estate.jpeg'
  },
  {
    id: 'Pothamedu View Point',
    name: 'Pothamedu View Point',
    tagline: 'Panoramic Tea Valley Views',
    desc: 'Witness endless tea plantations, rolling hills, and mist covered mountains from one of the most scenic viewpoints in Munnar. A perfect destination for sunrise, sunset, and unforgettable photography.',
    bg: '/assets/tour_pothamedu.jpeg',
    thumb: '/assets/tour_pothamedu.jpeg'
  },
  {
    id: 'Jeep Safari ',
    name: 'Jeep Safari ',
    tagline: 'Adventure Beyond The Clouds',
    desc: 'Embark on an exhilarating off road jeep safari to the legendary Kolukkumalai. Travel through rugged mountain trails, witness spectacular sunrise views, and explore the worlds highest tea plantations above the clouds.',
    bg: '/assets/tour_jeep_safari.jpeg',
    thumb: '/assets/tour_jeep_safari.jpeg'
  },
  {
    id: 'Rustic Bamboo Hut',
    name: 'Rustic Bamboo Hut',
    tagline: 'Tranquil Retreat in the Hills',
    desc: 'Immerse yourself in the charm of a traditional bamboo hut, surrounded by lush greenery and the soothing sounds of nature. A perfect escape from the hustle and bustle of city life.',
    bg: '/assets/tour_rustic_bamboo_hut.jpeg',
    thumb: '/assets/tour_rustic_bamboo_hut.jpeg'
  },
  {
    id: 'Echo Point',
    name: 'Echo Point',
    tagline: 'Breathtaking Scenic Views',
    desc: 'Experience the stunning beauty of Munnar from one of the most popular viewpoints. Enjoy panoramic vistas of tea plantations, rolling hills, and mist-covered mountains.',
    bg: '/assets/tour_echo_ponit.jpeg',
    thumb: '/assets/tour_echo_ponit.jpeg'
  }
];

export default function CreativeGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [contentKey, setContentKey] = useState(0);
  const sectionRef = useRef(null);

  const activeDest = DESTINATIONS[activeIdx];

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = window.setTimeout(() => setIsAnimating(false), 650);
    return () => window.clearTimeout(timer);
  }, [isAnimating]);

  const handleSelect = (nextIdx, navDirection = 'next') => {
    if (nextIdx === activeIdx) return;
    setDirection(navDirection);
    setIsAnimating(true);
    setActiveIdx(nextIdx);
    setContentKey((prev) => prev + 1);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % DESTINATIONS.length;
    handleSelect(nextIdx, 'next');
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + DESTINATIONS.length) % DESTINATIONS.length;
    handleSelect(prevIdx, 'prev');
  };

  const handlePlanTrip = (destinationId) => {
    const event = new CustomEvent('pranaraSelectDestination', { detail: destinationId });
    window.dispatchEvent(event);

    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`creative-gallery-section ${isVisible ? 'in-view' : ''}`}
      id="gallery"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="gallery-bg-wrapper">
        {DESTINATIONS.map((dest, idx) => (
          <div
            key={dest.id}
            className={`gallery-bg-slide ${idx === activeIdx ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${dest.bg})`,
              transform: `scale(1.1) translate(${idx === activeIdx ? parallax.x * -18 : 0}px, ${idx === activeIdx ? parallax.y * -18 : 0}px)`
            }}
          />
        ))}
      </div>

      <div className="gallery-overlay"></div>

      <div className="gallery-shell">
        <div
          key={contentKey}
          className={`gallery-copy ${isAnimating ? 'is-animating' : ''} ${direction === 'next' ? 'slide-next' : 'slide-prev'}`}
          style={{
            transform: `translate(${parallax.x * 18}px, ${parallax.y * 18}px)`
          }}
        >
          <span className="gallery-badge">Luxury Escape</span>
          <h1>{activeDest.name}</h1>
          <h2>{activeDest.tagline}</h2>
          <p>{activeDest.desc}</p>

          <button
            onClick={() => handlePlanTrip(activeDest.id)}
            className="gallery-cta"
          >
            <span>Explore {activeDest.name}</span>
          </button>
        </div>

        <div
          className="gallery-card-row"
          style={{
            transform: `translate(${parallax.x * 14}px, ${parallax.y * 14}px)`
          }}
        >
          {DESTINATIONS.map((dest, idx) => (
            <button
              key={dest.id}
              type="button"
              className={`gallery-card-item ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => handleSelect(idx, idx > activeIdx ? 'next' : 'prev')}
            >
              <img src={dest.thumb} alt={dest.name} />
              <div className="gallery-card-gradient" />
              <span className="gallery-card-title">{dest.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-nav-controls" aria-label="Gallery navigation">
        <button type="button" className="gallery-nav-btn" onClick={handlePrev} aria-label="Previous destination">
          <span>←</span>
        </button>
        <button type="button" className="gallery-nav-btn" onClick={handleNext} aria-label="Next destination">
          <span>→</span>
        </button>
      </div>

      <div className="gallery-slide-number">{String(activeIdx + 1).padStart(2, '0')}</div>
    </section>
  );
}
