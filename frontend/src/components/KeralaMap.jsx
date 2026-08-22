import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MUNNAR_EXPERIENCES = [
  {
    id: 1,
    name: 'TOP STATION',
    dist: '32 km | 1.5 hrs',
    slug: 'top-station',
    desc: 'Panoramic views of the Western Ghats where the clouds meet the mountains.',
    thumb: '/assets/munnar_top_station.png'
  },
  {
    id: 2,
    name: 'ECHO POINT',
    dist: '16 km | 45 min',
    slug: 'echo-point',
    desc: 'Unique natural echo phenomenon amidst rolling green hills.',
    thumb: '/assets/tour_echo_ponit.jpeg'
  },
  {
    id: 3,
    name: 'CHOKRAMUDI PEAK',
    dist: '18 km | 1 hr',
    slug: 'chokramudi-peak',
    desc: 'Trek through shola forests to the highest peak in Munnar.',
    thumb: '/assets/munnar_chokkarmudi_trek.jpg'
  },
  {
    id: 4,
    name: 'MATTUPETTY DAM',
    dist: '13 km | 35 min',
    slug: 'mattupetty-dam',
    desc: 'Scenic dam views with boat rides and relaxing surroundings.',
    thumb: '/assets/tour_mattupetty_dam.jpeg'
  },
  {
    id: 5,
    name: 'TEA GARDEN TRAILS',
    dist: '5 km | 15 min',
    slug: 'tea-estate',
    desc: 'Walk through lush tea estates and experience plantation life.',
    thumb: '/assets/tour_tea_estate.jpeg'
  },
  {
    id: 6,
    name: 'KUNDALA LAKE',
    dist: '17 km | 40 min',
    slug: 'kundala-lake',
    desc: 'Enjoy boating, horse rides and picturesque landscapes.',
    thumb: '/assets/munnar_kundala.png'
  },
  {
    id: 7,
    name: 'ATTUKAD WATERFALLS',
    dist: '9 km | 25 min',
    slug: 'attukad-waterfalls',
    desc: 'A short trek to a beautiful waterfall hidden in the forest.',
    thumb: '/assets/tour_attukad_waterfalls.jpeg'
  },
  {
    id: 8,
    name: 'MARAYOOR',
    dist: '40 km | 1.5 hrs',
    slug: 'marayoor',
    desc: 'Discover ancient dolmens and the scent of sandalwood.',
    thumb: '/assets/tour_munnar.png'
  },
  {
    id: 9,
    name: 'ANAYIRANGAL DAM',
    dist: '28 km | 1 hr',
    slug: 'anayirangal-dam',
    desc: 'A quiet picnic spot surrounded by nature’s calm.',
    thumb: '/assets/tour_munnar.png'
  },
  {
    id: 10,
    name: 'CHINNAR WILDLIFE SANCTUARY',
    dist: '45 km | 1.5 hrs',
    slug: 'eravikulam-national-park',
    desc: 'Home to rare wildlife and rich biodiversity.',
    thumb: '/assets/tour_eravikulam_national_park.jpeg'
  },
  {
    id: 11,
    name: 'BLOSSOM PARK',
    dist: '12 km | 30 min',
    slug: 'flower-garden',
    desc: 'A paradise of flowers with stunning valley views.',
    thumb: '/assets/tour_flower_garden.jpeg'
  },
  {
    id: 12,
    name: 'LOCAL VILLAGE TRAIL',
    dist: '3 km | 10 min',
    slug: 'bamboo-hut',
    desc: 'Walk through villages, meet locals and experience local life.',
    thumb: '/assets/tour_rustic_bamboo_hut.jpeg'
  }
];

export default function KeralaMap() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(MUNNAR_EXPERIENCES[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  const handleSelectExp = (exp) => {
    setSelectedExp(exp);
  };

  const handleNavigateExp = (slug) => {
    if (slug) {
      navigate(`/gallery/${slug}`);
    }
  };

  return (
    <section className="munnar-map-section" id="kerala-map">
      <div className="munnar-map-container">
        {/* Section Header */}
        <div className="munnar-map-header">
          <span className="map-badge">EXPEDITION MAP</span>
          <h2 className="map-title">MUNNAR EXPERIENCE MAP</h2>
          <p className="map-subtitle">
            Handpicked places. Real experiences. Only with Pranara Base Camp.
          </p>
        </div>

        {/* Map Visual Wrapper */}
        <div className="munnar-map-card-wrapper">
          <div className="map-image-container" onClick={() => setIsLightboxOpen(true)}>
            <img
              src="/assets/munnar_experience_map.jpg"
              alt="Munnar Experience Map - Handpicked places & real experiences by Pranara"
              className="munnar-map-img"
              loading="lazy"
            />

            <div className="map-hover-overlay">
              <span className="map-zoom-prompt">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Tap to View High-Res Map
              </span>
            </div>
          </div>

          {/* Quick Experience Selector Chips */}
          <div className="map-exp-drawer">
            <div className="map-exp-header">
              <h3 className="exp-drawer-title">12 EXPERIENCES AT A GLANCE</h3>
              <span className="exp-drawer-tip">Click location to explore photos</span>
            </div>

            <div className="map-exp-grid">
              {MUNNAR_EXPERIENCES.map((exp) => {
                const isSelected = selectedExp.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    className={`exp-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectExp(exp)}
                  >
                    <span className="chip-num">{exp.id}</span>
                    <span className="chip-name">{exp.name}</span>
                    <span className="chip-dist">{exp.dist}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Card */}
            {selectedExp && (
              <div className="map-selected-card">
                <div className="selected-card-content">
                  <div className="selected-card-badge">Location #{selectedExp.id}</div>
                  <h4 className="selected-card-title">{selectedExp.name}</h4>
                  <span className="selected-card-dist">📍 {selectedExp.dist}</span>
                  <p className="selected-card-desc">{selectedExp.desc}</p>
                </div>
                <button
                  type="button"
                  className="selected-card-cta"
                  onClick={() => handleNavigateExp(selectedExp.slug)}
                >
                  Explore Gallery &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Key Legend Footer */}
        <div className="map-footer-legend">
          <div className="legend-item">
            <span className="legend-icon">📅</span>
            <div>
              <strong>Best Time to Visit</strong>
              <p>September – May</p>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📶</span>
            <div>
              <strong>Mobile Network</strong>
              <p>Available in most areas</p>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚘</span>
            <div>
              <strong>Road Conditions</strong>
              <p>Scenic but hilly</p>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-icon">💚</span>
            <div>
              <strong>Travel Tip</strong>
              <p>Slow down. Soak it all in.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="map-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="map-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="map-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Map View"
            >
              &times;
            </button>
            <div className="map-lightbox-scroll">
              <img
                src="/assets/munnar_experience_map.jpg"
                alt="Munnar Experience Map - Full Resolution"
                className="map-lightbox-img"
              />
            </div>
            <div className="map-lightbox-caption">
              <span>PRANARA BASE CAMP — MUNNAR EXPERIENCE MAP</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
