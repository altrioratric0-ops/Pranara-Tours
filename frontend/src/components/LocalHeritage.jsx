import { useState } from 'react';

const MAP_LOCATIONS = [
  {
    id: 'waterfalls',
    name: 'Kolukkumalai Waterfalls',
    label: 'Kolukad Waterfalls',
    x: 185,
    y: 320,
    imageUrl: '/assets/munnar_attukad.png',
    caption: 'Hidden Waterfalls',
    desc: 'Trek through high-altitude tea trails to discover these pristine streams.'
  },
  {
    id: 'top-station',
    name: 'Top Station',
    label: 'Top Station',
    x: 95,
    y: 135,
    imageUrl: '/assets/munnar_top_station.png',
    caption: 'Top Station Sunrise',
    desc: 'Misty hills and a mesmerizing panoramic view of neighboring valleys.'
  },
  {
    id: 'echo-point',
    name: 'Echo Point',
    label: 'Echo Point',
    x: 275,
    y: 65,
    imageUrl: '/assets/munnar_echo_point.png',
    caption: 'Echo Point Lake',
    desc: 'Listen to your voice echo back across the serene, forested lake waters.'
  },
  {
    id: 'tea-gardens',
    name: 'Tea Gardens',
    label: 'Tea Gardens',
    x: 395,
    y: 145,
    imageUrl: '/assets/munnar_tea_museum.png',
    caption: 'Lush Tea Gardens',
    desc: 'Stroll among the carpet of tea shrubs and discover how tea is prepared.'
  },
  {
    id: 'mattupetty',
    name: 'Mattupetty Dam',
    label: 'Mattupetty',
    x: 235,
    y: 200,
    imageUrl: '/assets/munnar_mattupetty.png',
    caption: 'Mattupetty Dam',
    desc: 'A gorgeous reservoir famous for boating, speedboats, and elephant sightings.'
  },
  {
    id: 'marayoor',
    name: 'Marayoor Sandalwood',
    label: 'Marayoor',
    x: 325,
    y: 360,
    imageUrl: '/assets/munnar_anamudi.png',
    caption: 'Marayoor Sandalwood',
    desc: 'Natural sandalwood forests and stone caves dating back to prehistoric times.'
  },
  {
    id: 'chinnar',
    name: 'Chinnar Wildlife Sanctuary',
    label: 'Chinnar Wildlife Sanctuary',
    x: 435,
    y: 290,
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
              <a href="#story" onClick={handleReadStory} className="btn-read-story">
                READ OUR STORY &rarr;
              </a>
            </div>

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

            {/* Background Graphic Bottom */}
            <div 
              className="story-bg-image" 
              style={{ backgroundImage: "url('/assets/munnar_guides_jeep.png')" }}
            ></div>
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
                  {/* Trail paths connecting elements */}
                  <path 
                    d="M 185 320 C 130 240 85 190 95 135 C 185 90 220 85 275 65 C 330 90 380 100 395 145 C 320 180 270 190 235 200 C 275 285 295 325 325 360 C 375 330 405 320 435 290" 
                    fill="none" 
                    stroke="rgba(43, 58, 47, 0.2)" 
                    strokeWidth="2.5" 
                    strokeDasharray="6,6" 
                  />
                  
                  {/* Map Details - Small hand-drawn pine tree shapes */}
                  <g className="map-tree-decor" stroke="rgba(43, 58, 47, 0.25)" strokeWidth="1" fill="none">
                    {/* Left Trees */}
                    <path d="M 60 170 l 4 10 m -8 0 l 8 0 m -4 -10 l -4 6 m 4 -6 l 4 6 m -4 -2 l -3 4 m 3 -4 l 3 4" />
                    <path d="M 70 180 l 4 10 m -8 0 l 8 0 m -4 -10 l -4 6 m 4 -6 l 4 6 m -4 -2 l -3 4 m 3 -4 l 3 4" />
                    {/* Right Trees */}
                    <path d="M 370 230 l 4 10 m -8 0 l 8 0 m -4 -10 l -4 6 m 4 -6 l 4 6 m -4 -2 l -3 4 m 3 -4 l 3 4" />
                    <path d="M 385 235 l 4 10 m -8 0 l 8 0 m -4 -10 l -4 6 m 4 -6 l 4 6 m -4 -2 l -3 4 m 3 -4 l 3 4" />
                  </g>

                  {/* Compass Rose top right */}
                  <g className="map-compass" transform="translate(410, 60)" stroke="rgba(43, 58, 47, 0.4)" strokeWidth="1" fill="none">
                    <circle cx="20" cy="20" r="16" strokeDasharray="2,2" />
                    <line x1="20" y1="0" x2="20" y2="40" />
                    <line x1="0" y1="20" x2="40" y2="20" />
                    <polygon points="20 4 23 20 20 17" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="20 36 23 20 20 23" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="4 20 20 23 17 20" fill="rgba(43, 58, 47, 0.4)" />
                    <polygon points="36 20 20 23 23 20" fill="rgba(43, 58, 47, 0.4)" />
                    <text x="18" y="-4" fontSize="7" fontWeight="bold" fill="rgba(43, 58, 47, 0.6)">N</text>
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
                          r={isActive ? "6" : "4.5"} 
                          fill={isActive ? "var(--primary-dark)" : "var(--primary)"} 
                          stroke="#ffffff" 
                          strokeWidth="1.5" 
                        />
                        {/* Point text label */}
                        <text 
                          x={loc.x} 
                          y={loc.y - 12} 
                          textAnchor="middle" 
                          fontSize="9.5" 
                          fontWeight={isActive ? "700" : "500"} 
                          fill="var(--primary-dark)" 
                          className="map-marker-label"
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
