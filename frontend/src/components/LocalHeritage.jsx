import { useState } from 'react';

const MAP_LOCATIONS = [
  {
    id: 'waterfalls',
    name: 'Kolukkumalai Waterfalls',
    label: 'Kolukad Waterfalls',
    x: 285,
    y: 310,
    dx: -12,
    dy: 4,
    textAnchor: 'end',
    imageUrl: '/assets/munnar_attukad.png',
    caption: 'Hidden Waterfalls',
    desc: 'Trek through high-altitude tea trails to discover these pristine streams.'
  },
  {
    id: 'top-station',
    name: 'Top Station',
    label: 'Top Station',
    x: 215,
    y: 150,
    dx: -12,
    dy: 4,
    textAnchor: 'end',
    imageUrl: '/assets/munnar_top_station.png',
    caption: 'Top Station Sunrise',
    desc: 'Misty hills and a mesmerizing panoramic view of neighboring valleys.'
  },
  {
    id: 'echo-point',
    name: 'Echo Point',
    label: 'Echo Point',
    x: 235,
    y: 190,
    dx: 12,
    dy: 4,
    textAnchor: 'start',
    imageUrl: '/assets/munnar_echo_point.png',
    caption: 'Echo Point Lake',
    desc: 'Listen to your voice echo back across the serene, forested lake waters.'
  },
  {
    id: 'tea-gardens',
    name: 'Tea Gardens',
    label: 'Tea Gardens',
    x: 265,
    y: 270,
    dx: 12,
    dy: 4,
    textAnchor: 'start',
    imageUrl: '/assets/munnar_tea_museum.png',
    caption: 'Lush Tea Gardens',
    desc: 'Stroll among the carpet of tea shrubs and discover how tea is prepared.'
  },
  {
    id: 'mattupetty',
    name: 'Mattupetty Dam',
    label: 'Mattupetty',
    x: 250,
    y: 230,
    dx: -12,
    dy: 4,
    textAnchor: 'end',
    imageUrl: '/assets/munnar_mattupetty.png',
    caption: 'Mattupetty Dam',
    desc: 'A gorgeous reservoir famous for boating, speedboats, and elephant sightings.'
  },
  {
    id: 'marayoor',
    name: 'Marayoor Sandalwood',
    label: 'Marayoor',
    x: 195,
    y: 110,
    dx: 12,
    dy: 4,
    textAnchor: 'start',
    imageUrl: '/assets/munnar_anamudi.png',
    caption: 'Marayoor Sandalwood',
    desc: 'Natural sandalwood forests and stone caves dating back to prehistoric times.'
  },
  {
    id: 'chinnar',
    name: 'Chinnar Wildlife Sanctuary',
    label: 'Chinnar Wildlife Sanctuary',
    x: 175,
    y: 70,
    dx: 12,
    dy: 4,
    textAnchor: 'start',
    imageUrl: '/assets/insta_jeep.png',
    caption: 'Chinnar Safari',
    desc: 'Spot leopards, elephants, and rare grizzled giant squirrels in dry forests.'
  }
];

export default function LocalHeritage() {
  const [activeLoc, setActiveLoc] = useState(MAP_LOCATIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadStory = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleExploreNow = (e) => {
    e.preventDefault();
    // Scroll to booking form
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="heritage-section" id="heritage">
      <div className="container">
        <div className="heritage-grid">
          
          {/* Column 1: Our Story Card */}
          <div className="heritage-story-card">
            <div className="story-content">
              <span className="story-tagline">Our Story</span>
              <h2 className="story-heading">We know Munnar because we grew up here.</h2>
              <p className="story-paragraph">
                For over 10 years, we've been exploring these roads, guiding travellers and collecting stories. 
                Pranara is our way of sharing the Munnar that maps don't show.
              </p>
            </div>
            <a href="#story" onClick={handleReadStory} className="btn-read-story">
              READ OUR STORY &rarr;
            </a>

            {/* Stamp Badge */}
            <div className="stamp-badge-container">
              <svg width="110" height="110" viewBox="0 0 120 120" className="stamp-badge">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,3" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <path id="stamp-path" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                <text fill="currentColor" fontSize="6.8" fontWeight="600" letterSpacing="0.4">
                  <textPath href="#stamp-path" startOffset="0%">BORN IN MUNNAR • 10+ YEARS OF EXPERIENCE • THE LOCAL EXPERTS •</textPath>
                </text>
                <g transform="translate(43, 44)" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="17 8 25 21 9 21" />
                  <polygon points="21 12 27 21 15 21" />
                </g>
              </svg>
            </div>

            {/* Framed Picture in Story Card */}
            <div className="story-frame-container">
              <img 
                src="/assets/munnar_guides_jeep.png" 
                alt="Pranara Local Guides Jeep" 
                className="story-framed-img" 
              />
            </div>
          </div>

          {/* Column 2: Places We Call Home Map Card */}
          <div className="heritage-map-card">
            <div className="map-header">
              <h2 className="map-heading">PLACES WE CALL HOME</h2>
              <p className="map-subtitle">Click or hover on any place to explore stories, photos, local tips and the best time to visit.</p>
            </div>

            <div className="map-visual-container">
              {/* Map Illustration (Interactive SVG) */}
              <div className="interactive-map-wrapper">
                <svg viewBox="0 0 500 400" className="heritage-svg-map">
                  {/* Kerala Map Outline */}
                  <path 
                    d="M325.8 877.2l-0.1 0.6-0.7 0 0-0.4 0.8-0.2zm0 0l0.8 0.2 0 0.4-0.8 0 0-0.6zm-0.6-0.4l0.3 0.4-1.1 0.4-0.1-0.2 0.9-0.6zm-1.8-8.6l0.5 0.5 0.1 0.6-0.6-0.1 0-1zm-2.4-2.7l0.4 0.2 0.4 0.8-0.6-0.1-0.2-0.9zm-0.5-1.2l0.3 0.2 0.2 0.7-0.4 0.2-0.1-1.1zm-37.7-76.5l0.5 0.1 0.3-0.2 1.6-0.6 0.5 0.2 0.9-0.4 0.1 0.7-0.4 0.6 0.3 0.7 0.9-0.1 0.3 0.1 0.2 0.8-0.3 0 0.1 0.7 0.6 0.1 0.4-0.2 0-0.7 0.5-0.1 0.3 0.5 0.8 0.1 0.5 0.2-0.3 0.6 0.1 0.7 0.4 0.1 0.4-0.4 0.5 0.1-0.1 0.5 0.3 0.3 0.1 0.7 0.7 0.2 1.1-1.3 0.6 0.3 0.4 0.9-0.6-0.2-0.6 0.6 0.3 1 0.6 0 0 0.6 0.5 0.2 0.4 0.1 0.1 0.6 0 0.3 0.4-0.1 0.5-0.5 0.1-0.3 0.1-0.1 0.2-0.1 0.3-0.1 0.1 0.2 0.3-0.2 0.3 0.9-0.3 0.3-0.3 0.2-0.3 0.1-0.7-0.2 0.1 0.1-0.1 1.1 0.3 0.6 0.5 0.2 0.2 0.1 0 0.1 0.4 0.1 0.1 0.2-0.2 0.5-0.1 0.2 0.4 0.8 0.2 0.2-0.3 0.4 0.3-0.1 0.3 0 0.7-0.1 0.4 0.2 0.3 0.6 0.3 0.1 0.2 0.2 0 0.1 0.2 0.4 0 0.1 0.1 0.1 0.1 0.3 0.3 0.3-0.1 0.3 0.2 0.1 0.1 0.1 0.2 0.2 0.3 0.5 0.5 0.4 0.3 0.2 0.1 0 0.3-0.1 0.5 0.1 0.1 0.1 0.2 0 0.2 0.3 0 0.3 0.5 0.8 0.3 0 0.5-0.3 0.3 0.4 0.1 0.1 0.2 0.4 0.1 0.2 1.3-0.5 0.9 0.2 0.1 1.2 0.7 0.7 0 0.6 0.5 0.4 0.2 0.3 0.7 0.5 1.5 0.3 0.4-0.1 0.8 0.2 0.6 0.1 0.2-0.3 0.7 0 1.2-0.8 0.5 0 0.4-0.2 0 3.3 0.5 0.2 0.4-0.4 1.2-0.2 0.5 0.5 0.1 0.8 0.3 0.5 0.8 0.2 0.8-0.2 0.2 0.4 0.5 0.3 0.3 0.9 0.6 0.4 0.6-0.3 0.5 0.1 0.8-0.4 0.4 0.8-0.4 0.4 0 0.7 0.2 0.5 0.4 0.2 0.2 0.7-0.3 0.2-1.1 0.1-0.3 0.8-1 0.4-0.1-0.3-0.9 0.7-0.2-0.4-0.5-0.4-1.3 0.8 0.5 1.1-0.3 0.2 0.4 0.7-0.2 0.9 0.5-0.3 0.6-0.1 1.1 0.9 0.4-0.4 0.8 0.3 0.8 0.5 0.5-0.1-0.1 0.5 1.1 0.9 1.7 0.6 0 0.4 0.8-0.1 0 0.8-0.7 1.7-1.8 0.8-0.1 0.9 0.3 0.5 0.3-0.5 1.1-0.1 0.4 0.4 1.6-0.2 0.6 0 0.6 0.3 2-1.3 0.9 0.7-0.2 0.6-0.4 0.2-0.6 0.6 0.3 0.7 1.2 0.6-0.1 0.5 0.3 0.2-0.3 0.6 0 0.4 0.4 0.1 0.2 0.6-1.2-0.2-0.6 0.4-0.3 0.5-0.1 0.5-0.5 0.6-0.2 1.1 0.9 0.5 0.4 0 0.9 0.6 1.1 0 0.4 0.3 0.8 0.2 0.8 1-0.2 0.3 0.6 0.5 0.8-0.1 0.2 0.9-0.1 0.5-0.5 1.2-0.5 1 0.4 0.2 0 1-1.8 0.1 0 0.3 0.3 0.7 0.4 0.1-0.2 1.4 0.2 0.2-0.3 1.1-0.1 1.4-0.2 0.7 0.4 0.6-0.2 0.2 0.6 0.7-0.3 0.6-0.2 1.2 0.3 0.3 0.9 0.1 0 0.4 0.6 0.3 0.2 0.6 0.5 0.3 0.5-0.2 0.8 0.3 0.6 0 1-0.6 0.6-0.2 0.2-0.7 0.7-0.6 1.2-0.4 1.3-1 1.6 0.1-0.2 1 1 1.5 0 0.8 0.5 0 0.3 0.4-0.4 0.8-0.2 0.7 0.1 0.7-0.2 0.5-0.7-0.2-1.1 0.7 0.2 0.6 0.2 0.1 1.3 1.5-0.3 0.3 0.3 0.9 0.3 0.2-0.3 0.6-0.3 0-0.5 0.6-0.5 0.8-0.1 0.7 0.7 0.7-0.2 0.8 0.4 0.7-0.6 0.2 0.1 0.7-0.2 0.9-0.5 0.2 0.1 0.8-0.3 0.7-0.4 0.4-0.3 0.9 0 0.4 0.5 0.1 0.3-0.2 1 0.9 1.1 0.2 0.7-0.6 0.5-0.2 0.4 0.7 0.8 0.8 0 0.4 0.6 0.5 0.7 0.3-0.4 0.5 0.1 0.3-0.4 0.6-0.5-0.1-0.5 0.5-0.4 0.7 0.2 0.3-0.2 0.5 0 0.7-0.9 1.2-0.6 0.5 0.1 0.8-0.3 1 0.2 0.5-0.4 0.5 0 1.3-0.5 0.7-0.6 0.3-0.4 0.5-0.1 0.7-0.3 0.5-0.8 0.3-0.5 0.6 0 0.4 0.7 0.6 0.1 0.4 0.5 0.4 0 0.9 0.3-0.2 0.4 0.8 0.5 0.3 0.4 0.4 0.2 1-0.8 1-0.1 0.6-1 1.1-0.6-0.1 0.3 0.9 0.3 0.2 0.6 1.6 0.8 0.8 0 0.4 0.6 0.8 0.4 0.9-0.5 1-0.7 0.3-0.4-0.4-0.4 0.4 0.5 1.4-0.6 0.1-0.2 0.7-0.8 0.9-0.5 0 0.6 0.9-0.2 0.6-0.7 0-0.5 0.6-0.4 0.1-2-1.6-0.4-0.4-0.6-0.3-0.5-1-2-2.4-0.7-0.9-2.1-2.6-0.5-0.7-1.8-2.2-0.6-1-1.7-2.2-0.7-0.6-0.7-0.2-0.4-0.4-0.3-0.6-0.4-1.4-0.2-1.4-0.3-0.3-0.7-1.8-0.6-1.3-1.4-3.1-1.6-3.5-0.6-2-0.5-2-0.3-1.8-0.5-4.5-0.6-3.6-0.7-2.4l0.7 0.1c0.2 0.8 0.7 0.3-0.2 0.5-0.8 0.1 0.3 0.9 0.4-0.1 0.2-0.6 1.1 0.6 0.3 0.4 0 0.6 0.8 0.5-0.3 0.6 0.2 0.5 0.1 1-0.1 0.4 0 0.9 0.2 0.3 0.5 0.1 0 0.6-0.7 1.3 0 0.8-0.2 0.2-0.2 1 0.1 0.4 4-0.1-2.3-0.9 0-0.3 0.3-1.1-0.3-0.7-0.4-0.3 0-0.7 0.3-0.7-0.8-0.2 0.2-1-0.2-0.5-0.3-0.4-0.1-0.6 0.4-0.4 0-0.9-0.6-1.4-0.2-0.5-0.6-0.1 0.3 0.8-0.7-0.1-0.1-0.7-0.4-0.6-0.2-0.2-0.6-1.3 0-0.7-0.5-0.7-0.1-0.4 0.3-0.5 0-0.4-1.1-1.1-0.5-0.2 1 2.9-0.1 0.6 0.2 0.6-0.5 0.3-0.2-0.9-0.4-1.3-0.6-2.1-0.6-1.6-0.6-2-0.6-2.3-1-2.4-2.2-4.5-0.1-0.3-1.7-3.8-0.6-1.5-0.9-4.3-0.6-2.3-0.3-1.1-0.3-1.1-0.7-1.6-0.2 0-0.8-2.2-0.7-2.1-0.3-0.5 0.1-0.4-1-1.9-0.6-0.9-0.9-0.5-0.4 0.2-0.4-0.4 0-0.4-0.9-2.5-0.8-2.1-0.7-1.4-0.6-0.8-1-0.8-0.5-0.2-0.3-0.8-1-1.1-0.8-0.6-0.3l0.2-1.1-1.5-0.7-1 0.1-0.6-0.4-0.7-0.7-0.6 0.4-0.4 0.6 0.2 0.3-1-0.2-0.1-0.1-0.1-0.1-0.2 0.5-0.6-0.2-0.4 0.3-0.2 0.3 0.2 0.2 0.1 0.4-0.3 0.5-0.4 0.3 0 0-0.2 0.3 0.1 0.3-0.2-0.1-0.2-0.3-0.2-0.3 0-0.1 0-0.2 0.3-0.5-0.1-0.6-0.1-0.1 0-0.3 0.2 0 0.1-0.7 0.5-0.2 0.4-0.3-0.1-0.3-0.1-0.2 0.1-0.2-0.1-0.1-0.1-0.4 0.2-0.1 0.1 0.1 0.4 0 0.2 0 0.1 0 0.6 0.1 0.3 0.1 0.6-0.7 0.5-0.5-0.9-0.3-1.3-0.1-0.9-0.5-0.9-0.1-0.6-0.4-0.5-0.2-0.7-0.3l0.2-1.2-3.2-0.8-1.7-0.8-1-0.6-1.5-0.5-0.8-0.4-1-1.4-3.5-0.7-1.5-0.5-1.2z"
                    fill="rgba(46, 125, 50, 0.1)"
                    stroke="none"
                    transform="translate(150, 20) scale(2.6) translate(-282.8, -786.9)"
                    className="kerala-outline-path"
                  />

                  {/* Compass Rose top right */}
                  <g className="map-compass" transform="translate(320, 2)" stroke="rgba(43, 58, 47, 0.4)" strokeWidth="1" fill="none">
                    <circle cx="20" cy="20" r="16" strokeDasharray="2,2" />
                    <line x1="20" y1="0" x2="20" y2="40" />
                    <line x1="0" y1="20" x2="40" y2="20" />
                    <polygon points="20 4 23 20 20 17" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="20 36 23 20 20 23" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="4 20 20 23 17 20" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="36 20 20 23 23 20" fill="rgba(43, 58, 47, 0.4)" />
                    <text x="20" y="-3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="rgba(43, 58, 47, 0.85)" stroke="none">N</text>
                    <text x="20" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(43, 58, 47, 0.85)" stroke="none">S</text>
                  </g>

                  {/* Location Points Markers */}
                  {MAP_LOCATIONS.map((loc) => {
                    const isActive = activeLoc.id === loc.id;
                    return (
                      <g 
                        key={loc.id} 
                        className={`map-marker-group ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveLoc(loc)}
                        onMouseEnter={() => setActiveLoc(loc)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Glowing backdrop circle */}
                        {isActive && (
                          <circle 
                            cx={loc.x} 
                            cy={loc.y} 
                            r="12" 
                            fill="var(--primary)" 
                            opacity="0.25" 
                            className="marker-pulse-ring" 
                          />
                        )}
                        {/* Point node */}
                        <circle 
                          cx={loc.x} 
                          cy={loc.y} 
                          r={isActive ? "6.5" : "5"} 
                          fill={isActive ? "#1B5E20" : "var(--primary)"} 
                          stroke="#ffffff" 
                          strokeWidth="1.8" 
                          style={{ transition: 'all 0.2s ease' }}
                        />
                        {/* Text Label Backdrop Shadow Stroke for legibility */}
                        <text 
                          x={loc.x + loc.dx} 
                          y={loc.y + loc.dy} 
                          textAnchor={loc.textAnchor} 
                          fontSize="12.5" 
                          fontWeight="700" 
                          stroke="#ffffff"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                          opacity="0.95"
                          style={{ pointerEvents: 'none', transition: 'all 0.2s ease' }}
                        >
                          {loc.label}
                        </text>
                        {/* Actual Text Label */}
                        <text 
                          x={loc.x + loc.dx} 
                          y={loc.y + loc.dy} 
                          textAnchor={loc.textAnchor} 
                          fontSize="12.5" 
                          fontWeight={isActive ? "800" : "700"} 
                          fill={isActive ? "#1B5E20" : "#2E7D32"} 
                          style={{ pointerEvents: 'none', transition: 'all 0.2s ease' }}
                        >
                          {loc.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Overlapping Polaroid Preview Card */}
              <div className="map-polaroid-preview-container">
                <div className="polaroid-preview-card">
                  <div 
                    className="polaroid-preview-img" 
                    style={{ backgroundImage: `url(${activeLoc.imageUrl})` }}
                  ></div>
                  <div className="polaroid-preview-body">
                    <h4 className="polaroid-preview-title">{activeLoc.caption}</h4>
                    <p className="polaroid-preview-desc">{activeLoc.desc}</p>
                    <a href="#booking" onClick={handleExploreNow} className="polaroid-explore-link">
                      Explore Now &rarr;
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Heritage Story Modal */}
      {isModalOpen && (
        <div className="heritage-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="heritage-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <span className="modal-tagline">Since 2016</span>
            <h3 className="modal-heading">The Spirit of Pranara</h3>
            
            <div className="modal-body">
              <p>
                Pranara Tours was founded by a small group of childhood friends who spent their youth exploring the forest trails, tea corridors, and secret cascades of Munnar. 
                We observed that standard travel packages often bypassed the real beauty of our homeland—the stories of tea harvesters, prehistoric dolmens, and pathless forest ridges.
              </p>
              <p>
                We decided to share our passion and build a tour service built on <strong>conservation, local community integration, and authentic storytelling</strong>. 
                Today, our team of guides are local residents who know the terrain as their own backyard, providing safe, rich, and truly unforgettable experiences.
              </p>
              <div className="modal-img-row">
                <div className="modal-img" style={{ backgroundImage: "url('/assets/munnar_top_station.png')" }}></div>
                <div className="modal-img" style={{ backgroundImage: "url('/assets/munnar_guides_jeep.png')" }}></div>
              </div>
            </div>
            
            <button className="btn-modal-close" onClick={() => setIsModalOpen(false)}>
              Back to Exploration
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
