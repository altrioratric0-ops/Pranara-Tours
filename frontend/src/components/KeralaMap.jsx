import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const MAP_DESTINATIONS = [
  {
    name: 'Bekal',
    latLng: [12.3833, 75.0333],
    description: 'Northern gateway featuring the iconic keyhole-shaped Bekal Fort and pristine beaches along the Arabian Sea.',
    weather: 'Clear 29°C',
    travelTime: 'Kochi to Bekal: ~8 hrs (Train/Drive)',
    bestSeason: 'Oct to May',
    altitude: 'Sea level',
    highlights: ['Bekal Fort — largest fort in Kerala', 'Bekal Beach & backwaters', 'Valiyaparamba backwater cruise', 'Chandragiri Fort', 'Ananthapura Lake Temple'],
    idealFor: 'History buffs, beach lovers, families',
    nearbyAttractions: 'Kappil Beach, Nityanandashram Caves, POS-80B project',
    rating: 4.6
  },
  {
    name: 'Wayanad',
    latLng: [11.6854, 76.1320],
    description: 'Misty hills, cascading waterfalls, ancient Edakkal caves with 6000-year-old petroglyphs, and rich wildlife sanctuaries.',
    weather: 'Mist 22°C',
    travelTime: 'Kochi to Wayanad: ~6.5 hrs (Drive)',
    bestSeason: 'Oct to May',
    altitude: '700–2,100 m',
    highlights: ['Edakkal Caves — Neolithic petroglyphs', 'Meenmutty & Soochipara Waterfalls', 'Muthanga Wildlife Sanctuary', 'Pookode Lake', 'Chembra Peak Heart-shaped Lake'],
    idealFor: 'Nature lovers, trekkers, families, couples',
    nearbyAttractions: 'Banasura Sagar Dam, Kuruva Island, Pazhassi Raja Tomb',
    rating: 4.7
  },
  {
    name: 'Athirappilly',
    latLng: [10.2851, 76.5698],
    description: 'Home to the spectacular Athirappilly Waterfalls, the largest waterfall in Kerala — often called the Niagara of India.',
    weather: 'Humid 27°C',
    travelTime: 'Kochi to Athirappilly: ~1.5 hrs (Drive)',
    bestSeason: 'June to Nov',
    altitude: '~100 m',
    highlights: ['Athirappilly Waterfalls — 80 ft drop', 'Vazhachal Waterfalls', 'Forest trekking through Sholayar forests', 'Birdwatching — hornbills & kingfishers', 'River rafting during monsoon'],
    idealFor: 'Adventure travelers, photographers, families',
    nearbyAttractions: 'Charpa Falls, Malakkappara, Sholayar Dam, Valparai',
    rating: 4.5
  },
  {
    name: 'Munnar',
    latLng: [10.0889, 77.0595],
    description: 'Breathtaking hill station famous for rolling tea estates, exotic flora, waterfalls, and cool mountain weather year-round.',
    weather: 'Cool 18°C',
    travelTime: 'Kochi to Munnar: ~3.5 hrs (Drive)',
    bestSeason: 'Sept to May',
    altitude: '1,600 m',
    highlights: ['Tea Museum & sprawling tea gardens', 'Kolukkumalai — highest tea estate in the world', 'Eravikulam National Park & Nilgiri Tahrs', 'Mattupetty Dam & Echo Point', 'Top Station — panoramic valley views'],
    idealFor: 'Couples, honeymooners, families, photographers',
    nearbyAttractions: 'Chinnar Wildlife Sanctuary, Marayoor Sandalwood Forest, Pallivasal Falls',
    rating: 4.8
  },
  {
    name: 'Kochi',
    latLng: [9.9312, 76.2673],
    description: 'Historic port city showcasing Chinese fishing nets, Dutch palaces, Jewish synagogues, Portuguese churches, and colonial spice markets.',
    weather: 'Warm 30°C',
    travelTime: 'Kochi Airport to City: ~1 hr (Drive)',
    bestSeason: 'Oct to April',
    altitude: 'Sea level',
    highlights: ['Chinese Fishing Nets — iconic symbol of Kochi', 'Fort Kochi & colonial architecture', 'Mattancherry Dutch Palace', 'Jew Town & Paradesi Synagogue', 'Marine Drive & Vembanad sunset'],
    idealFor: 'History lovers, culture seekers, foodies, solo travelers',
    nearbyAttractions: 'Cherai Beach, Willingdon Island, Mangalavanam Bird Sanctuary, Kerala Kathakali Centre',
    rating: 4.5
  },
  {
    name: 'Vagamon',
    latLng: [9.6917, 76.9056],
    description: 'Peaceful hill station with dense pine forests, rolling green meadows, misty valleys, and paragliding hotspots away from tourist crowds.',
    weather: 'Pleasant 20°C',
    travelTime: 'Kochi to Vagamon: ~3 hrs (Drive)',
    bestSeason: 'Sept to May',
    altitude: '1,100 m',
    highlights: ['Vagamon Pine Forest — straight out of a movie', 'Paragliding over green meadows', 'Thangal Hill & Ulipooni Rock viewpoints', 'Marmala Waterfall', 'Camping & campfire experiences'],
    idealFor: 'Adventure seekers, couples, friends group, digital detox',
    nearbyAttractions: 'Elaveezha Poonchira Valley, Kurisumala Ashram, Murugan Hill',
    rating: 4.6
  },
  {
    name: 'Thekkady',
    latLng: [9.6031, 77.1615],
    description: 'Periyar wildlife sanctuary, guided elephant rides, aromatic spice gardens, bamboo boating, and Kathakali cultural performances.',
    weather: 'Cool 21°C',
    travelTime: 'Munnar to Thekkady: ~3 hrs (Drive)',
    bestSeason: 'Oct to April',
    altitude: '~900 m',
    highlights: ['Periyar Tiger Reserve — boat safari on Periyar Lake', 'Spice plantation tour — cardamom, pepper, cinnamon', 'Bamboo rafting in reserve forests', 'Kathakali & Kalaripayattu shows', 'Elephant ride and bathing'],
    idealFor: 'Wildlife enthusiasts, families, spice lovers',
    nearbyAttractions: 'Mangala Devi Temple, Suruli Falls, Ramakkalmedu, Vandanmedu',
    rating: 4.7
  },
  {
    name: 'Kumarakom',
    latLng: [9.5925, 76.4224],
    description: 'Lush backwater lagoons on Vembanad Lake, famous for the Kumarakom Bird Sanctuary and world-class luxury waterfront resorts.',
    weather: 'Cloudy 28°C',
    travelTime: 'Kochi to Kumarakom: ~1.5 hrs (Drive)',
    bestSeason: 'Nov to Feb',
    altitude: 'Sea level',
    highlights: ['Kumarakom Bird Sanctuary — Siberian cranes & herons', 'Vembanad Lake sunset cruise', 'Houseboat stay in exclusive lagoon', 'Ayurvedic spa at waterfront resorts', 'Traditional toddy shop experience'],
    idealFor: 'Bird watchers, luxury travelers, couples, nature lovers',
    nearbyAttractions: 'Pathiramanal Island, Thanneermukkom Bund, Aruvikkuzhi Waterfall',
    rating: 4.6
  },
  {
    name: 'Alleppey',
    latLng: [9.4981, 76.3388],
    description: 'The "Venice of the East," world-famous for premium houseboat cruises through labyrinth backwater canals and the vibrant Nehru Trophy Snake Boat race.',
    weather: 'Humid 28°C',
    travelTime: 'Kochi to Alleppey: ~1.5 hrs (Drive)',
    bestSeason: 'Oct to March',
    altitude: 'Sea level',
    highlights: ['Overnight luxury houseboat cruise', 'Alleppey Beach & pier', 'Punnamada Lake — Nehru Trophy venue', 'Village canoe ride through narrow canals', 'Kerala toddy & seafood feast'],
    idealFor: 'Couples, honeymooners, friends, photographers',
    nearbyAttractions: 'Kuttanad — rice bowl of Kerala, Ambalapuzha Temple, Marari Beach, Pathiramanal Island',
    rating: 4.9
  },
  {
    name: 'Varkala',
    latLng: [8.7303, 76.7118],
    description: 'Dramatic red laterite cliffs rising 30m above the Arabian Sea, featuring mineral springs, spiritual beaches, cliffside cafes, and ayurvedic wellness.',
    weather: 'Sunny 30°C',
    travelTime: 'Kochi to Varkala: ~4 hrs (Drive/Train)',
    bestSeason: 'Oct to March',
    altitude: '~30 m cliffs',
    highlights: ['Varkala Cliff — 30m high red cliffs along the sea', 'Janardhana Swamy Temple — 2000 years old', 'Papanasam Beach — holy dip for purification', 'Black sand & mineral water springs', 'Sunset yoga & cliffside cafes'],
    idealFor: 'Solo travelers, spiritual seekers, backpackers, yogis',
    nearbyAttractions: 'Kappil Lake, Anjengo Fort, Sivagiri Mutt, Edava Beach',
    rating: 4.7
  },
  {
    name: 'Kovalam',
    latLng: [8.4004, 76.9787],
    description: 'Iconic crescent-shaped sandy bays, shallow safe waters, Ayurvedic massage centers, and the famous red-and-white Vizhinjam Lighthouse.',
    weather: 'Sunny 31°C',
    travelTime: 'Varkala to Kovalam: ~1.5 hrs (Drive)',
    bestSeason: 'Sept to March',
    altitude: 'Sea level',
    highlights: ['Lighthouse Beach — iconic red & white lighthouse', 'Hawah Beach — serene and uncrowded', 'Samudra Beach — pristine & secluded', 'Ayurvedic massage — 1 hour session', 'Fresh seafood at cliffside restaurants'],
    idealFor: 'Beach lovers, families, Ayurveda seekers, sunbathers',
    nearbyAttractions: 'Vizhinjam Marine Aquarium, Kovalam Art Gallery, Neyyar Dam, Karamana River',
    rating: 4.7
  },
  {
    name: 'Poovar',
    latLng: [8.3188, 77.0784],
    description: 'Tranquil coastal village where the Neyyar river estuary meets gold-sand beach and the Arabian Sea — a unique confluence of river, lake, sea, and beach.',
    weather: 'Clear 30°C',
    travelTime: 'Kovalam to Poovar: ~0.5 hrs (Drive)',
    bestSeason: 'Oct to April',
    altitude: 'Sea level',
    highlights: ['Estuary boat ride through golden mangroves', 'Poovar Island resort experience', 'Unspoiled golden sand beach', 'Sunset dolphin spotting', 'Backwater cruise to the Arabian Sea mouth'],
    idealFor: 'Couples, honeymooners, peace seekers, luxury travelers',
    nearbyAttractions: 'Vizhinjam Port, Kovalam Beaches, Neyyar Wildlife Sanctuary, Aazhimala Shiva Temple',
    rating: 4.5
  }
];

export default function KeralaMap() {
  const [selected, setSelected] = useState(MAP_DESTINATIONS[3]); // Default to Munnar
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const location = useLocation();

  // Handle URL param selection (e.g. ?mapDest=Munnar)
  useEffect(() => {
    if (!mapReady || !window.L) return;
    const params = new URLSearchParams(location.search);
    const destName = params.get('mapDest');
    if (destName) {
      const found = MAP_DESTINATIONS.find(d => d.name.toLowerCase() === destName.toLowerCase());
      if (found) {
        setSelected(found);
        if (mapRef.current) {
          mapRef.current.flyTo(found.latLng, 8.5, { duration: 1.2 });
        }
      }
    }
  }, [location.search, mapReady]);

  // Handle custom event selection from same-page clicks
  useEffect(() => {
    if (!mapReady || !window.L) return;
    const handleSelectDest = (e) => {
      const destName = e.detail;
      const found = MAP_DESTINATIONS.find(d => d.name.toLowerCase() === destName.toLowerCase());
      if (found) {
        setSelected(found);
        if (mapRef.current) {
          mapRef.current.flyTo(found.latLng, 8.5, { duration: 1.2 });
        }
        const el = document.getElementById('kerala-map');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('select-map-destination', handleSelectDest);
    return () => window.removeEventListener('select-map-destination', handleSelectDest);
  }, [mapReady]);

  // Poll for Leaflet availability to handle dynamic script loading
  useEffect(() => {
    if (window.L) {
      setMapReady(true);
      return;
    }
    const interval = setInterval(() => {
      if (window.L) {
        setMapReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
    if (!mapReady || !window.L) return;

    if (!mapRef.current) {
      const map = window.L.map('real-map-container', {
        center: [10.2, 76.4],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false
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
              width: 28px;
              height: 28px;
              border: 2px solid #2E7D32;
              border-radius: 50%;
              animation: map-pulse 1.8s infinite ease-out;
              background: rgba(46, 125, 50, 0.2);
            "></div>
          ` : ''}
          <div style="
            width: ${isSelected ? '16px' : '12px'};
            height: ${isSelected ? '16px' : '12px'};
            background-color: ${isSelected ? '#1B5E20' : '#2E7D32'};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.3s;
          "></div>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: `custom-marker-${dest.name.toLowerCase()}`,
        html: markerHtml,
        iconSize: isSelected ? [28, 28] : [16, 16],
        iconAnchor: isSelected ? [14, 14] : [8, 8]
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
    <section className="kerala-map-section" id="kerala-map" style={{ padding: '90px 0', background: '#fff' }}>
      <div className="container">
        <h2 className="section-title">Interactive <span className="accent">Kerala Map</span></h2>
        <p className="section-subtitle">Click markers on the map or tap a destination below to explore weather, highlights, and travel details</p>

        <div className="map-grid-container" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1.1fr',
          gap: '0',
          alignItems: 'stretch',
          marginTop: '40px',
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          
          {/* Map Column */}
          <div style={{
            background: '#f1f5f9',
            minHeight: '520px',
            position: 'relative'
          }}>
            <div 
              id="real-map-container" 
              style={{
                width: '100%',
                height: '520px',
                zIndex: 1
              }}
            />
            <style>{`
              @keyframes map-pulse {
                0% { transform: scale(0.5); opacity: 1; }
                100% { transform: scale(2.2); opacity: 0; }
              }
              .leaflet-div-icon {
                background: transparent !important;
                border: none !important;
              }
              .leaflet-control-zoom a { 
                background: white !important; 
                color: #1B5E20 !important; 
                border-color: #e2e8f0 !important; 
              }
              .leaflet-control-zoom a:hover { background: #f8faf8 !important; }
            `}</style>
          </div>

          {/* Details Card Column */}
          <div className="map-detail-card" style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflowY: 'auto',
            maxHeight: '520px',
            background: '#fff'
          }}>
            {/* Destination Badge + Name */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div>
                <span style={{
                  background: '#E8F5E9',
                  color: '#1B5E20',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'inline-block'
                }}>
                  {selected.name}
                </span>
                <h3 style={{
                  fontSize: '1.65rem',
                  color: '#1B5E20',
                  margin: '12px 0 6px 0',
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.2'
                }}>
                  Explore {selected.name}
                </h3>
              </div>
              {/* Rating badge */}
              <div style={{
                background: '#1B5E20',
                color: '#fff',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {selected.rating}
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.95rem',
              color: '#4A5D4C',
              lineHeight: '1.65',
              marginBottom: '20px'
            }}>
              {selected.description}
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '22px'
            }}>
              <div className="map-stat-item" style={{
                background: '#FAFAF8',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500' }}>Weather</div>
                  <div style={{ fontSize: '0.88rem', color: '#1A2E1C', fontWeight: '600' }}>{selected.weather}</div>
                </div>
              </div>
              <div className="map-stat-item" style={{
                background: '#FAFAF8',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500' }}>Altitude</div>
                  <div style={{ fontSize: '0.88rem', color: '#1A2E1C', fontWeight: '600' }}>{selected.altitude}</div>
                </div>
              </div>
              <div className="map-stat-item" style={{
                background: '#FAFAF8',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500' }}>Travel Time</div>
                  <div style={{ fontSize: '0.88rem', color: '#1A2E1C', fontWeight: '600' }}>{selected.travelTime.replace('Kochi to ', '').replace('~', '')}</div>
                </div>
              </div>
              <div className="map-stat-item" style={{
                background: '#FAFAF8',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500' }}>Best Season</div>
                  <div style={{ fontSize: '0.88rem', color: '#1A2E1C', fontWeight: '600' }}>{selected.bestSeason}</div>
                </div>
              </div>
            </div>

            {/* Highlights section */}
            <div style={{ marginBottom: '18px' }}>
              <strong style={{
                display: 'block',
                fontSize: '0.85rem',
                color: '#1B5E20',
                marginBottom: '10px',
                fontFamily: "'Poppins', sans-serif"
              }}>
                Top Attractions
              </strong>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                {selected.highlights.slice(0, 4).map((h, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: '#4A5D4C',
                    lineHeight: '1.4'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal for + nearby */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: '#E8F5E9',
                padding: '10px 14px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500', marginBottom: '2px' }}>Ideal For</div>
                <div style={{ fontSize: '0.82rem', color: '#1B5E20', fontWeight: '600' }}>{selected.idealFor}</div>
              </div>
              <div style={{
                background: '#FAFAF8',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#4A5D4C', fontWeight: '500', marginBottom: '2px' }}>Nearby</div>
                <div style={{ fontSize: '0.82rem', color: '#1A2E1C', fontWeight: '500' }}>{selected.nearbyAttractions.split(',')[0]}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              <a 
                href="#tours"
                onClick={(e) => {
                  e.preventDefault();
                  const tourSelect = document.getElementById('tour');
                  if (tourSelect) {
                    const options = Array.from(tourSelect.options);
                    const matchingOpt = options.find(opt => opt.text.toLowerCase().includes(selected.name.toLowerCase()));
                    if (matchingOpt) {
                      tourSelect.value = matchingOpt.value;
                      const event = new Event('change', { bubbles: true });
                      tourSelect.dispatchEvent(event);
                    }
                  }
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                  padding: '12px 24px',
                  fontSize: '0.9rem',
                  gap: '8px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Book {selected.name} Trip
              </a>
            </div>

            {/* Destination quick jump */}
            <div style={{ width: '100%', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e2e8f0' }}>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: '#4A5D4C', marginBottom: '10px', fontWeight: '500' }}>
                Jump to destination:
              </strong>
              <div style={{
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '4px'
              }} className="destination-quick-jump">
                {MAP_DESTINATIONS.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => selectFromList(d)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '100px',
                      border: d.name === selected.name ? '1px solid #1B5E20' : '1px solid #e2e8f0',
                      background: d.name === selected.name ? '#1B5E20' : '#fff',
                      color: d.name === selected.name ? '#fff' : '#1A2E1C',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                      flexShrink: 0
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
    </section>
  );
}
