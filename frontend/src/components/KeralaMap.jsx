import { useState, useEffect, useRef } from 'react';

const MAP_DESTINATIONS = [
  {
    name: 'Bekal',
    latLng: [12.3833, 75.0333],
    description: 'Northern gateway featuring the iconic keyhole-shaped Bekal Fort and pristine beaches.',
    weather: 'Clear 29°C',
    travelTime: 'Kochi to Bekal: ~8 hrs (Train/Drive)',
    bestSeason: 'Oct to May'
  },
  {
    name: 'Wayanad',
    latLng: [11.6854, 76.1320],
    description: 'Misty hills, waterfalls, ancient Edakkal caves, and rich wildlife sanctuaries.',
    weather: 'Mist 22°C',
    travelTime: 'Kochi to Wayanad: ~6.5 hrs (Drive)',
    bestSeason: 'Oct to May'
  },
  {
    name: 'Athirappilly',
    latLng: [10.2851, 76.5698],
    description: 'Home to the spectacular Athirappilly Waterfalls, the largest waterfall in Kerala.',
    weather: 'Humid 27°C',
    travelTime: 'Kochi to Athirappilly: ~1.5 hrs (Drive)',
    bestSeason: 'June to Nov'
  },
  {
    name: 'Munnar',
    latLng: [10.0889, 77.0595],
    description: 'Breathtaking hill station famous for rolling tea estates, waterfalls, and cool mountain weather.',
    weather: 'Cool 18°C',
    travelTime: 'Kochi to Munnar: ~3.5 hrs (Drive)',
    bestSeason: 'Sept to May'
  },
  {
    name: 'Kochi',
    latLng: [9.9312, 76.2673],
    description: 'Historic port city showcasing Chinese fishing nets, Dutch palaces, and colonial spice markets.',
    weather: 'Warm 30°C',
    travelTime: 'Kochi Airport to City: ~1 hr (Drive)',
    bestSeason: 'Oct to April'
  },
  {
    name: 'Vagamon',
    latLng: [9.6917, 76.9056],
    description: 'Peaceful hill station with pine forests, green meadows, and paragliding hotspots.',
    weather: 'Pleasant 20°C',
    travelTime: 'Kochi to Vagamon: ~3 hrs (Drive)',
    bestSeason: 'Sept to May'
  },
  {
    name: 'Thekkady',
    latLng: [9.6031, 77.1615],
    description: 'Periyar wildlife sanctuary, elephant rides, spice gardens, and bamboo boating.',
    weather: 'Cool 21°C',
    travelTime: 'Munnar to Thekkady: ~3 hrs (Drive)',
    bestSeason: 'Oct to April'
  },
  {
    name: 'Kumarakom',
    latLng: [9.5925, 76.4224],
    description: 'Lush backwater lagoons on Vembanad Lake, famous for bird watching and luxury resorts.',
    weather: 'Cloudy 28°C',
    travelTime: 'Kochi to Kumarakom: ~1.5 hrs (Drive)',
    bestSeason: 'Nov to Feb'
  },
  {
    name: 'Alleppey',
    latLng: [9.4981, 76.3388],
    description: 'The "Venice of the East," world-famous for premium houseboat cruises in labyrinth backwater canals.',
    weather: 'Humid 28°C',
    travelTime: 'Kochi to Alleppey: ~1.5 hrs (Drive)',
    bestSeason: 'Oct to March'
  },
  {
    name: 'Varkala',
    latLng: [8.7303, 76.7118],
    description: 'Unique seaside red cliffs lining the Arabian Sea, featuring spiritual beaches and cafes.',
    weather: 'Sunny 30°C',
    travelTime: 'Kochi to Varkala: ~4 hrs (Drive/Train)',
    bestSeason: 'Oct to March'
  },
  {
    name: 'Kovalam',
    latLng: [8.4004, 76.9787],
    description: 'Iconic curved sandy bays, shallow safe waters, and the famous red-and-white lighthouse.',
    weather: 'Sunny 31°C',
    travelTime: 'Varkala to Kovalam: ~1.5 hrs (Drive)',
    bestSeason: 'Sept to March'
  },
  {
    name: 'Poovar',
    latLng: [8.3188, 77.0784],
    description: 'Tranquil coastal village where the Neyyar river estuary meets the gold-sand beach and the sea.',
    weather: 'Clear 30°C',
    travelTime: 'Kovalam to Poovar: ~0.5 hrs (Drive)',
    bestSeason: 'Oct to April'
  }
];

export default function KeralaMap() {
  const [selected, setSelected] = useState(MAP_DESTINATIONS[3]); // Default to Munnar
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Clean up map instance on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Initialize and update markers
  useEffect(() => {
    if (!window.L) return;

    if (!mapRef.current) {
      // Initialize map instance
      const map = window.L.map('real-map-container', {
        center: [10.2, 76.4],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false // Disable scroll zoom so users can scroll past the map section smoothly
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add new custom divIcon markers
    MAP_DESTINATIONS.forEach((dest) => {
      const isSelected = dest.name === selected.name;

      const markerHtml = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          ${isSelected ? `
            <div style="
              position: absolute;
              width: 24px;
              height: 24px;
              border: 1px solid var(--primary);
              border-radius: 50%;
              animation: map-pulse 1.8s infinite ease-out;
              background: rgba(46, 125, 50, 0.2);
            "></div>
          ` : ''}
          <div style="
            width: ${isSelected ? '14px' : '10px'};
            height: ${isSelected ? '14px' : '10px'};
            background-color: ${isSelected ? 'var(--primary-dark)' : 'var(--primary)'};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            transition: all 0.3s;
          "></div>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: `custom-marker-${dest.name.toLowerCase()}`,
        html: markerHtml,
        iconSize: isSelected ? [24, 24] : [14, 14],
        iconAnchor: isSelected ? [12, 12] : [7, 7]
      });

      const marker = window.L.marker(dest.latLng, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelected(dest);
        map.flyTo(dest.latLng, 8.5, { duration: 1.2 });
      });

      markersRef.current.push(marker);
    });

  }, [selected.name]);

  // Handle sidebar click selection
  const selectFromList = (dest) => {
    setSelected(dest);
    if (mapRef.current) {
      mapRef.current.flyTo(dest.latLng, 8.5, { duration: 1.2 });
    }
  };

  return (
    <section className="kerala-map-section" id="kerala-map" style={{ padding: '100px 0', background: '#fff' }}>
      <div className="container">
        <h2 className="section-title">Interactive <span className="accent">Kerala Map</span></h2>
        <p className="section-subtitle">Click markers on our geographic map to view weather, highlights, and travel times</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'stretch',
          marginTop: '40px',
          background: 'var(--cream)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)'
        }} className="map-grid-container">
          
          {/* Map Column */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            minHeight: '480px',
            position: 'relative'
          }}>
            <div 
              id="real-map-container" 
              style={{
                width: '100%',
                height: '100%',
                minHeight: '480px',
                zIndex: 1
              }}
            />
            {/* Embedded styles for pulse animation */}
            <style>{`
              @keyframes map-pulse {
                0% { transform: scale(0.5); opacity: 1; }
                100% { transform: scale(2.0); opacity: 0; }
              }
              .leaflet-div-icon {
                background: transparent !important;
                border: none !important;
              }
            `}</style>
          </div>

          {/* Details Card Column */}
          <div style={{
            textAlign: 'left',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
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
                    <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Current Weather</strong>
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
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <a 
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  const tourSelect = document.getElementById('tour');
                  if (tourSelect) {
                    const options = Array.from(tourSelect.options);
                    const matchingOpt = options.find(opt => opt.text.toLowerCase().includes(selected.name.toLowerCase()));
                    if (matchingOpt) {
                      tourSelect.value = matchingOpt.value;
                      // Trigger native react synthetic change event if needed
                      const event = new Event('change', { bubbles: True });
                      tourSelect.dispatchEvent(event);
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
              
              {/* Quick Jump List */}
              <div style={{ width: '100%', marginTop: '20px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                  Jump to Destination:
                </strong>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '6px'
                }} className="destination-quick-jump">
                  {MAP_DESTINATIONS.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => selectFromList(d)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '100px',
                        border: '1px solid var(--border)',
                        background: d.name === selected.name ? 'var(--primary)' : '#fff',
                        color: d.name === selected.name ? '#fff' : 'var(--text-dark)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
