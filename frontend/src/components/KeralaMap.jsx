import { useState } from 'react';

const MAP_DESTINATIONS = [
  {
    name: 'Bekal',
    coords: { x: 50, y: 40 },
    description: 'Northern gateway featuring the iconic keyhole-shaped Bekal Fort and pristine beaches.',
    weather: 'Clear 29°C',
    travelTime: 'Kochi to Bekal: ~8 hrs (Train/Drive)',
    bestSeason: 'Oct to May'
  },
  {
    name: 'Wayanad',
    coords: { x: 90, y: 90 },
    description: 'Misty hills, waterfalls, ancient Edakkal caves, and rich wildlife sanctuaries.',
    weather: 'Mist 22°C',
    travelTime: 'Kochi to Wayanad: ~6.5 hrs (Drive)',
    bestSeason: 'Oct to May'
  },
  {
    name: 'Athirappilly',
    coords: { x: 130, y: 160 },
    description: 'Home to the spectacular Athirappilly Waterfalls, the largest waterfall in Kerala.',
    weather: 'Humid 27°C',
    travelTime: 'Kochi to Athirappilly: ~1.5 hrs (Drive)',
    bestSeason: 'June to Nov'
  },
  {
    name: 'Munnar',
    coords: { x: 180, y: 175 },
    description: 'Breathtaking hill station famous for rolling tea estates, waterfalls, and cool mountain weather.',
    weather: 'Cool 18°C',
    travelTime: 'Kochi to Munnar: ~3.5 hrs (Drive)',
    bestSeason: 'Sept to May'
  },
  {
    name: 'Kochi',
    coords: { x: 110, y: 200 },
    description: 'Historic port city showcasing Chinese fishing nets, Dutch palaces, and colonial spice markets.',
    weather: 'Warm 30°C',
    travelTime: 'Kochi Airport to City: ~1 hr (Drive)',
    bestSeason: 'Oct to April'
  },
  {
    name: 'Vagamon',
    coords: { x: 170, y: 220 },
    description: 'Peaceful hill station with pine forests, green meadows, and paragliding hotspots.',
    weather: 'Pleasant 20°C',
    travelTime: 'Kochi to Vagamon: ~3 hrs (Drive)',
    bestSeason: 'Sept to May'
  },
  {
    name: 'Thekkady',
    coords: { x: 195, y: 235 },
    description: 'Periyar wildlife sanctuary, elephant rides, spice gardens, and bamboo boating.',
    weather: 'Cool 21°C',
    travelTime: 'Munnar to Thekkady: ~3 hrs (Drive)',
    bestSeason: 'Oct to April'
  },
  {
    name: 'Kumarakom',
    coords: { x: 125, y: 245 },
    description: 'Lush backwater lagoons on Vembanad Lake, famous for bird watching and luxury resorts.',
    weather: 'Cloudy 28°C',
    travelTime: 'Kochi to Kumarakom: ~1.5 hrs (Drive)',
    bestSeason: 'Nov to Feb'
  },
  {
    name: 'Alleppey',
    coords: { x: 115, y: 265 },
    description: 'The "Venice of the East," world-famous for premium houseboat cruises in labyrinth backwater canals.',
    weather: 'Humid 28°C',
    travelTime: 'Kochi to Alleppey: ~1.5 hrs (Drive)',
    bestSeason: 'Oct to March'
  },
  {
    name: 'Varkala',
    coords: { x: 130, y: 310 },
    description: 'Unique seaside red cliffs lining the Arabian Sea, featuring spiritual beaches and cafes.',
    weather: 'Sunny 30°C',
    travelTime: 'Kochi to Varkala: ~4 hrs (Drive/Train)',
    bestSeason: 'Oct to March'
  },
  {
    name: 'Kovalam',
    coords: { x: 145, y: 335 },
    description: 'Iconic curved sandy bays, shallow safe waters, and the famous red-and-white lighthouse.',
    weather: 'Sunny 31°C',
    travelTime: 'Varkala to Kovalam: ~1.5 hrs (Drive)',
    bestSeason: 'Sept to March'
  },
  {
    name: 'Poovar',
    coords: { x: 155, y: 350 },
    description: 'Tranquil coastal village where the Neyyar river estuary meets the gold-sand beach and the sea.',
    weather: 'Clear 30°C',
    travelTime: 'Kovalam to Poovar: ~0.5 hrs (Drive)',
    bestSeason: 'Oct to April'
  }
];

export default function KeralaMap() {
  const [selected, setSelected] = useState(MAP_DESTINATIONS[3]); // Default to Munnar

  return (
    <section className="kerala-map-section" id="kerala-map" style={{ padding: '100px 0', background: '#fff' }}>
      <div className="container">
        <h2 className="section-title">Interactive <span className="accent">Kerala Map</span></h2>
        <p className="section-subtitle">Click on the destinations to explore travel times, weather, and key highlights</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
          marginTop: '40px',
          background: 'var(--cream)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)'
        }} className="map-grid-container">
          
          {/* Map Column */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border)'
          }}>
            <svg 
              viewBox="0 0 250 400" 
              style={{
                width: '100%',
                maxHeight: '450px',
                filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.05))'
              }}
            >
              {/* Styled Kerala boundary representation */}
              <path 
                d="M30 30 C 50 20, 80 40, 100 80 C 110 100, 120 150, 130 180 C 140 200, 180 210, 210 230 C 220 240, 170 280, 150 320 C 130 350, 170 380, 160 390 C 150 390, 120 320, 100 270 C 80 220, 50 150, 30 70 Z" 
                fill="var(--primary-light)" 
                stroke="var(--primary)" 
                strokeWidth="1.5"
                opacity="0.4"
              />
              
              {/* Backwaters / Coast indicator line */}
              <path
                d="M100 210 Q 120 250, 110 320"
                fill="none"
                stroke="var(--sky)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
              />

              {/* Connecting path */}
              <path 
                d="M50 40 L 90 90 L 130 160 L 180 175 L 170 220 L 195 235 L 125 245 L 115 265 L 130 310 L 145 335 L 155 350" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="1" 
                strokeDasharray="4 4"
                opacity="0.3"
              />

              {/* Destination Hotspots */}
              {MAP_DESTINATIONS.map((dest) => {
                const isSelected = dest.name === selected.name;
                return (
                  <g 
                    key={dest.name} 
                    transform={`translate(${dest.coords.x}, ${dest.coords.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(dest)}
                  >
                    {/* Ring animation for selected */}
                    {isSelected && (
                      <circle 
                        r="8" 
                        fill="none" 
                        stroke="var(--primary)" 
                        strokeWidth="1.5"
                      >
                        <animate 
                          attributeName="r" 
                          values="4;12;4" 
                          dur="2s" 
                          repeatCount="indefinite" 
                        />
                        <animate 
                          attributeName="opacity" 
                          values="1;0;1" 
                          dur="2s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                    )}
                    {/* Hotspot circle */}
                    <circle 
                      r={isSelected ? "6" : "4.5"} 
                      fill={isSelected ? "var(--primary-dark)" : "var(--primary)"} 
                      stroke="#fff" 
                      strokeWidth="1.5"
                    />
                    {/* Labels */}
                    <text
                      y="-10"
                      textAnchor="middle"
                      style={{
                        fontSize: isSelected ? '8px' : '7px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: isSelected ? '700' : '500',
                        fill: isSelected ? 'var(--primary-dark)' : '#4a5568',
                        background: '#fff'
                      }}
                    >
                      {dest.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Details Card Column */}
          <div style={{
            textAlign: 'left',
            padding: '20px'
          }}>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-dark)',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {selected.name}
            </span>
            
            <h3 style={{
              fontSize: '2rem',
              color: 'var(--primary-dark)',
              margin: '16px 0 12px 0',
              fontFamily: 'var(--font-heading)'
            }}>
              Explore {selected.name}
            </h3>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-light)',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              {selected.description}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.25rem' }}>🌤️</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Current Weather Model</strong>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{selected.weather}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.25rem' }}>🚗</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Estimated Travel Time</strong>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{selected.travelTime}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.25rem' }}>📅</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Best Season to Visit</strong>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{selected.bestSeason}</span>
                </div>
              </div>
            </div>

            <a 
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                // Set the default tour select box if possible
                const tourSelect = document.getElementById('bookingTour');
                if (tourSelect) {
                  // Find option that matches destination
                  const options = Array.from(tourSelect.options);
                  const matchingOpt = options.find(opt => opt.text.toLowerCase().includes(selected.name.toLowerCase()));
                  if (matchingOpt) {
                    tourSelect.value = matchingOpt.value;
                  }
                }
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                boxShadow: 'var(--shadow)',
                padding: '14px 28px'
              }}
            >
              Inquire About {selected.name}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
