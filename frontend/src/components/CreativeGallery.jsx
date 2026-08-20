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
    images: ['/assets/munnar_kolukkumalaigallery.jpeg','/assets/munnar/Munnar_1.jpeg','/assets/munnar/Munnar_2.jpeg','/assets/munnar/Munnar_3.jpeg','/assets/munnar/Munnar_4.jpeg','/assets/munnar/Munnar_5.jpeg','/assets/munnar/Munnar_6.jpeg','/assets/munnar/Munnar_7.jpeg','/assets/munnar/Munnar_8.jpeg']
  },
  {
    id: 'Attukad Waterfalls',
    slug: 'attukad-waterfalls',
    name: 'Attukad Waterfalls',
    tagline: 'Breathtaking Waterfall Views',
    desc: 'Experience the beauty of Attukad Waterfalls, surrounded by lush greenery and A perfect destination for photography and nature lovers.',
    bg: '/assets/tour_attukad_waterfalls.jpeg',
    thumb: '/assets/tour_attukad_waterfalls.jpeg',
    images: ['/assets/tour_attukad_waterfalls.jpeg', '/assets/Attukad Waterfalls/Attukad_1.jpeg','/assets/Attukad Waterfalls/Attukad_2.jpeg','/assets/Attukad Waterfalls/Attukad_3.jpeg','/assets/Attukad Waterfalls/Attukad_4.jpeg','/assets/Attukad Waterfalls/Attukad_5.jpeg','/assets/Attukad Waterfalls/Attukad_6.jpeg','/assets/Attukad Waterfalls/Attukad_7.jpeg']
  },

  {
    id: 'Tea Estate',
    slug: 'tea-estate',
    name: 'Tea Estate',
    tagline: 'A Journey Through Emerald Hills',
    desc: 'Walk through endless green hills, breathe the fresh mountain air, and experience the timeless beauty of Munnar’s tea gardens.',
    bg: '/assets/tour_tea_estate.jpeg',
    thumb: '/assets/tour_tea_estate.jpeg',
    images: ['/assets/tour_tea_estate.jpeg','/assets/Tea_estate/Tea_estates_1.jpeg','/assets/Tea_estate/Tea_estates_2.jpeg','/assets/Tea_estate/Tea_estates_3.jpeg','/assets/Tea_estate/Tea_estates_4.jpeg','/assets/Tea_estate/Tea_estates_5.jpeg','/assets/Tea_estate/Tea_estates_6.jpeg','/assets/Tea_estate/Tea_estates_7.jpeg','/assets/Tea_estate/Tea_estates_8.jpeg','/assets/Tea_estate/Tea_estates_9.jpeg','/assets/Tea_estate/Tea_estates_10.jpeg','/assets/Tea_estate/Tea_estates_11.jpeg']
  },

  {
    id: 'Pothamedu View',
    slug: 'pothamedu-view',
    name: 'Pothamedu View ',
    tagline: 'Panoramic Tea Valley Views',
    desc: 'Witness a endless tea plantations, rolling hills, and mist covered mountains from one of the most scenic viewpoints in Munnar.',
    bg: '/assets/tour_pothamedu.jpeg',
    thumb: '/assets/tour_pothamedu.jpeg',
    images: ['/assets/tour_pothamedu.jpeg', '/assets/Pothamedu viewpoint/pothamedu viewpoint_2.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_3.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_4.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_5.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_6.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_7.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_8.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_9.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_10.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_11.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_1.jpeg', '/assets/Pothamedu viewpoint/pothamedu viewpoint_12.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_13.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_14.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_15.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_16.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_17.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_18.jpeg','/assets/Pothamedu viewpoint/pothamedu viewpoint_19.jpeg']
  },

  {
    id: 'Kolukkumalai',
    slug: 'kolukkumalai',
    name: 'Kolukkumalai',
    tagline: 'Misty Valleys & Tea Gardens',
    desc: 'Witness a golden sunrise above the clouds at Kolukkumalai, trek through high cliff waterfall paths, and explore historic tea plantations.',
    bg: '/assets/tour_Kolukkumalai.jpg',
    thumb: '/assets/tour_Kolukkumalai.jpg',
    images: ['/assets/tour_Kolukkumalai.jpg', '/assets/Kolukkumalai/Kolukkumalai_1.jpeg','/assets/Kolukkumalai/Kolukkumalai_2.jpeg','/assets/Kolukkumalai/Kolukkumalai_3.jpeg','/assets/Kolukkumalai/Kolukkumalai_4.jpeg','/assets/Kolukkumalai/Kolukkumalai_5.jpeg','/assets/Kolukkumalai/Kolukkumalai_6.jpeg','/assets/Kolukkumalai/Kolukkumalai_7.jpeg','/assets/Kolukkumalai/Kolukkumalai_8.jpeg','/assets/Kolukkumalai/Kolukkumalai_9.jpeg','/assets/Kolukkumalai/Kolukkumalai_10.jpeg','/assets/Kolukkumalai/Kolukkumalai_11.jpeg','/assets/Kolukkumalai/Kolukkumalai_12.jpeg','/assets/Kolukkumalai/Kolukkumalai_13.jpeg','/assets/Kolukkumalai/Kolukkumalai_14.jpeg','/assets/Kolukkumalai/Kolukkumalai_15.jpeg','/assets/Kolukkumalai/Kolukkumalai_16.jpeg','/assets/Kolukkumalai/Kolukkumalai_17.jpeg','/assets/Kolukkumalai/Kolukkumalai_18.jpeg','/assets/Kolukkumalai/Kolukkumalai_19.jpeg','/assets/Kolukkumalai/Kolukkumalai_20.jpeg','/assets/Kolukkumalai/Kolukkumalai_21.jpeg','/assets/Kolukkumalai/Kolukkumalai_22.jpeg','/assets/Kolukkumalai/Kolukkumalai_23.jpeg']
  },
  {
    id: ' Bamboo Hut',
    slug: 'bamboo-hut',
    name: 'Bamboo Hut',
    tagline: 'Tranquil Retreat in the Hills',
    desc: 'Immerse yourself in the charm of a traditional bamboo hut. A perfect escape from the hustle and bustle of city life.',
    bg: '/assets/tour_rustic_bamboo_hut.jpeg',
    thumb: '/assets/tour_rustic_bamboo_hut.jpeg',
    images: ['/assets/tour_rustic_bamboo_hut.jpeg']
  },
  {
    id: 'Echo Point',
    slug: 'echo-point',
    name: 'Echo Point',
    tagline: 'Breathtaking Scenic Views',
    desc: 'Experience the stunning beauty of Munnar from one of the most popular viewpoints. Enjoy panoramic vistas and mist-covered mountains.',
    bg: '/assets/tour_echo_ponit.jpeg',
    thumb: '/assets/tour_echo_ponit.jpeg',
    images: ['/assets/tour_echo_ponit.jpeg', '/assets/Eco point/Echopoint_1.jpeg','/assets/Eco point/Echopoint_2.jpeg','/assets/Eco point/Echopoint_3.jpeg','/assets/Eco point/Echopoint_5.jpeg','/assets/Eco point/Echopoint_6.jpeg','/assets/Eco point/Echopoint_7.jpeg','/assets/Eco point/Echopoint_8.jpeg','/assets/Eco point/Echopoint_9.jpeg','/assets/Eco point/Echopoint_10.jpeg','/assets/Eco point/Echopoint_11.jpeg','/assets/Eco point/Echopoint_12.jpeg', ]
  },
  {
    id: 'Flower Garden',
    slug: 'flower-garden',
    name: 'Flower Garden',
    tagline: 'A World of Colorful Blooms',
    desc: 'Stroll through the vibrant colors of the flower garden, where exotic blooms create a mesmerizing spectacle.',
    bg: '/assets/tour_flower_garden.jpeg',
    thumb: '/assets/tour_flower_garden.jpeg',
    images: ['/assets/tour_flower_garden.jpeg','/assets/flower garden/garden_1.jpeg','/assets/flower garden/garden_2.jpeg', '/assets/flower garden/garden_3.jpeg', '/assets/flower garden/garden_4.jpeg', '/assets/flower garden/garden_5.jpeg', '/assets/flower garden/garden_6.jpeg', '/assets/flower garden/garden_7.jpeg', '/assets/flower garden/garden_8.jpeg', '/assets/flower garden/garden_9.jpeg', '/assets/flower garden/garden_10.jpeg'  ]
  },
  {
    id: 'Mattupetty Dam',
    slug: 'mattupetty-dam',
    name: 'Mattupetty Dam',
    tagline: 'Scenic Dam Views',
    desc: 'Enjoy the breathtaking views of Mattupetty Dam, surrounded by lush greenery and the soothing sounds of nature.',
    bg: '/assets/tour_mattupetty_dam.jpeg',
    thumb: '/assets/tour_mattupetty_dam.jpeg',
    images: ['/assets/tour_mattupetty_dam.jpeg', '/assets/Mattupetty Dam/MattupettyDam_1.jpeg', '/assets/Mattupetty Dam/MattupettyDam_2.jpeg','/assets/Mattupetty Dam/MattupettyDam_3.jpeg','/assets/Mattupetty Dam/MattupettyDam_4.jpeg','/assets/Mattupetty Dam/MattupettyDam_5.jpeg','/assets/Mattupetty Dam/MattupettyDam_6.jpeg','/assets/Mattupetty Dam/MattupettyDam_7.jpeg','/assets/Mattupetty Dam/MattupettyDam_8.jpeg']
  },
  {
    id: 'Eravikulam National Park',
    slug: 'eravikulam-national-park',
    name: 'Eravikulam National Park',
    tagline: 'Breathtaking Scenic Views',
    desc: 'Explore the diverse wildlife and stunning landscapes of Eravikulam National Park, home to the endangered Nilgiri Tahr.',
    bg: '/assets/tour_eravikulam_national_park.jpeg',
    thumb: '/assets/tour_eravikulam_national_park.jpeg',
    images: ['/assets/tour_eravikulam_national_park.jpeg','/assets/eravikulam/eravikulam_0.jpeg','/assets/eravikulam/eravikulam_1.jpeg', '/assets/eravikulam/eravikulam_2.jpeg', '/assets/eravikulam/eravikulam_3.jpeg', '/assets/eravikulam/eravikulam_4.jpeg', '/assets/eravikulam/eravikulam_5.jpeg', '/assets/eravikulam/eravikulam_6.jpeg', '/assets/eravikulam/eravikulam_7.jpeg', '/assets/eravikulam/eravikulam_8.jpeg', '/assets/eravikulam/eravikulam_9.jpeg','/assets/eravikulam/eravikulam_10.jpeg','/assets/eravikulam/eravikulam_11.jpeg',]
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
  const activeDest = DESTINATIONS[activeBaseIdx] || DESTINATIONS[0];
  const bgImage = activeDest?.bg || activeDest?.thumb || '/assets/tour_munnar.png';

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
    }, 1500);

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

  const handleExploreClick = (destination) => {
    if (destination && destination.slug) {
      navigate(`/gallery/${destination.slug}`);
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
            backgroundImage: `url(${bgImage})`,
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
          <h1>{activeDest.name}</h1>
          <h2>{activeDest.tagline}</h2>
          <p>{activeDest.desc}</p>

          <button onClick={() => handleExploreClick(activeDest)} className="gallery-cta">
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
