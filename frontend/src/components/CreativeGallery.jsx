import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DESTINATIONS = [
  {
    id: 'Munnar',
    slug: 'munnar',
    name: 'Munnar',
    tagline: 'Misty Valleys & Tea Gardens',
    desc: 'A golden sunrise above the clouds, trek through high cliff, and explore tea plantations.',
    bg: '/assets/munnar_kolukkumalaigallery.jpeg',
    thumb: '/assets/munnar_kolukkumalaigallery.jpeg',
    images: ['/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/tour_Kolukkumalai.jpg', '/assets/tour_echo_ponit.jpeg']
  },
  {
    id: 'Attukad Waterfalls',
    slug: 'attukad-waterfalls',
    name: 'Attukad Waterfalls',
    tagline: 'Breathtaking Waterfall Views',
    desc: 'Experience the beauty of Attukad Waterfalls, surrounded by lush greenery and A perfect destination for photography and nature lovers.',
    bg: '/assets/tour_attukad_waterfalls.jpeg',
    thumb: '/assets/tour_attukad_waterfalls.jpeg',
    images: ['/assets/tour_attukad_waterfalls.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_echo_ponit.jpeg']
  },
  {
    id: 'Tea Estate',
    slug: 'tea-estate',
    name: 'Tea Estate',
    tagline: 'A Journey Through Emerald Hills',
    desc: 'Walk through endless green hills, breathe the fresh mountain air, and experience the timeless beauty of Munnar’s tea gardens.',
    bg: '/assets/tour_tea_estate.jpeg',
    thumb: '/assets/tour_tea_estate.jpeg',
    images: ['/assets/tour_tea_estate.jpeg', '/assets/tour_mattupetty_dam.jpeg', '/assets/tour_attukad_waterfalls.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/tour_flower_garden.jpeg']
  },
  {
    id: 'Pothamedu View',
    slug: 'pothamedu-view',
    name: 'Pothamedu View ',
    tagline: 'Panoramic Tea Valley Views',
    desc: 'Witness a endless tea plantations, rolling hills, and mist covered mountains from one of the most scenic viewpoints in Munnar.',
    bg: '/assets/tour_pothamedu.jpeg',
    thumb: '/assets/tour_pothamedu.jpeg',
    images: ['/assets/tour_pothamedu.jpeg', '/assets/tour_echo_ponit.jpeg', '/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_attukad_waterfalls.jpeg']
  },
  {
    id: 'Kolukkumalai',
    slug: 'kolukkumalai',
    name: 'Kolukkumalai',
    tagline: 'Misty Valleys & Tea Gardens',
    desc: 'Witness a golden sunrise above the clouds at Kolukkumalai, trek through high cliff waterfall paths, and explore historic tea plantations.',
    bg: '/assets/tour_Kolukkumalai.jpg',
    thumb: '/assets/tour_Kolukkumalai.jpg',
    images: ['/assets/tour_Kolukkumalai.jpg', '/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_echo_ponit.jpeg']
  },
  {
    id: ' Bamboo Hut',
    slug: 'bamboo-hut',
    name: 'Bamboo Hut',
    tagline: 'Tranquil Retreat in the Hills',
    desc: 'Immerse yourself in the charm of a traditional bamboo hut. A perfect escape from the hustle and bustle of city life.',
    bg: '/assets/tour_rustic_bamboo_hut.jpeg',
    thumb: '/assets/tour_rustic_bamboo_hut.jpeg',
    images: ['/assets/tour_rustic_bamboo_hut.jpeg', '/assets/tour_flower_garden.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_attukad_waterfalls.jpeg', '/assets/tour_pothamedu.jpeg']
  },
  {
    id: 'Echo Point',
    slug: 'echo-point',
    name: 'Echo Point',
    tagline: 'Breathtaking Scenic Views',
    desc: 'Experience the stunning beauty of Munnar from one of the most popular viewpoints. Enjoy panoramic vistas and mist-covered mountains.',
    bg: '/assets/tour_echo_ponit.jpeg',
    thumb: '/assets/tour_echo_ponit.jpeg',
    images: ['/assets/tour_echo_ponit.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/tour_Kolukkumalai.jpg', '/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_mattupetty_dam.jpeg']
  },
  {
    id: 'Flower Garden',
    slug: 'flower-garden',
    name: 'Flower Garden',
    tagline: 'A World of Colorful Blooms',
    desc: 'Stroll through the vibrant colors of the flower garden, where exotic blooms create a mesmerizing spectacle.',
    bg: '/assets/tour_flower_garden.jpeg',
    thumb: '/assets/tour_flower_garden.jpeg',
    images: ['/assets/tour_flower_garden.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_rustic_bamboo_hut.jpeg', '/assets/tour_echo_ponit.jpeg', '/assets/tour_attukad_waterfalls.jpeg']
  },
  {
    id: 'Mattupetty Dam',
    slug: 'mattupetty-dam',
    name: 'Mattupetty Dam',
    tagline: 'Scenic Dam Views',
    desc: 'Enjoy the breathtaking views of Mattupetty Dam, surrounded by lush greenery and the soothing sounds of nature.',
    thumb: '/assets/tour_mattupetty_dam.jpeg',
    images: ['/assets/tour_mattupetty_dam.jpeg', '/assets/tour_attukad_waterfalls.jpeg', '/assets/tour_pothamedu.jpeg', '/assets/tour_tea_estate.jpeg', '/assets/tour_flower_garden.jpeg']
  },
  {
    id: 'Eravikulam National Park',
    slug: 'eravikulam-national-park',
    name: 'Eravikulam National Park',
    tagline: 'Breathtaking Scenic Views',
    desc: 'Explore the diverse wildlife and stunning landscapes of Eravikulam National Park, home to the endangered Nilgiri Tahr.',
    bg: '/assets/tour_eravikulam_national_park.jpeg',
    thumb: '/assets/tour_eravikulam_national_park.jpeg',
    images: ['/assets/tour_eravikulam_national_park.jpeg', '/assets/tour_Kolukkumalai.jpg', '/assets/tour_mattupetty_dam.jpeg', '/assets/munnar_kolukkumalaigallery.jpeg', '/assets/tour_pothamedu.jpeg']
  }
];

export default function CreativeGallery() {
  const [activeIdx, setActiveIdx] = useState(DESTINATIONS.length);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollMode, setScrollMode] = useState('smooth');
  const sectionRef = useRef(null);
  const cardRowRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const loopedDestinations = [...DESTINATIONS, ...DESTINATIONS];
  const activeBaseIdx = activeIdx % DESTINATIONS.length;
  const activeDest = DESTINATIONS[activeBaseIdx];

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
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      setActiveIdx((current) => {
        const next = current + 1;

        if (next >= DESTINATIONS.length * 2) {
          setScrollMode('auto');
          return DESTINATIONS.length;
        }

        setScrollMode('smooth');
        return next;
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    const row = cardRowRef.current;
    const activeCard = cardRefs.current[activeIdx];

    if (!row || !activeCard) return;

    const topOffset = activeCard.offsetTop - row.offsetTop;
    const targetTop = Math.max(0, Math.min(topOffset - 18, row.scrollHeight - row.clientHeight));

    row.scrollTo({ top: targetTop, behavior: scrollMode });
  }, [activeIdx, scrollMode]);

  const handleMouseMove = (event) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const handleSelect = (destination, idx) => {
    setScrollMode('smooth');
    setActiveIdx(idx);
    navigate(`/gallery/${destination.slug}`);
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
        <div
          className="gallery-bg-slide active"
          style={{
            backgroundImage: `url(${activeDest.bg})`,
            transform: `scale(1.08) translate(${parallax.x * -12}px, ${parallax.y * -12}px)`
          }}
        />
      </div>

      <div className="gallery-overlay"></div>

      <div className="gallery-shell">
        <div
          className="gallery-copy"
          style={{
            transform: `translate(${parallax.x * 16}px, ${parallax.y * 16}px)`
          }}
        >
          <span className="gallery-badge">Luxury Escape</span>
          <h1>{activeDest.name}</h1>
          <h2>{activeDest.tagline}</h2>
          <p>{activeDest.desc}</p>

          <button onClick={() => handlePlanTrip(activeDest.id)} className="gallery-cta">
            <span>Explore {activeDest.name}</span>
          </button>
        </div>

        <div className="gallery-card-stack" aria-label="Gallery previews">
          <div className="gallery-card-row" ref={cardRowRef}>
            {loopedDestinations.map((destination, idx) => {
              const isActive = idx === activeIdx;
              const isPrev = idx < activeIdx;
              const isNext = idx > activeIdx;

              return (
                <button
                  key={`${destination.id}-${idx}`}
                  ref={(element) => {
                    cardRefs.current[idx] = element;
                  }}
                  type="button"
                  className={`gallery-card-item ${isActive ? 'active' : ''} ${isPrev ? 'prev' : isNext ? 'next' : ''}`}
                  onClick={() => handleSelect(destination, idx)}
                >
                  <img src={destination.thumb} alt={destination.name} />
                  <div className="gallery-card-gradient" />
                  <span className="gallery-card-title">{destination.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>


    </section>
  );
}
