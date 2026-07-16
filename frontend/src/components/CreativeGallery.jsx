import { useState, useEffect, useRef } from 'react';

const DESTINATIONS = [
  {
    id: 'Munnar',
    name: 'Munnar',
    tagline: 'Misty Valleys & Tea Gardens',
    desc: 'Witness a golden sunrise above the clouds at Kolukkumalai, trek through high cliff waterfall paths, and explore historic tea plantations wrapped in refreshing mountain fog.',
    bg: '/assets/munnar_kolukkumalai.png',
    thumb: '/assets/munnar_top_station.png',
    cards: [
      { num: '01', title: 'Tea Museum', desc: 'Step back in time to witness colonial tea-making heritage.' },
      { num: '02', title: 'Jeep Sunrise', desc: 'A thrilling 4WD climb to Kolukkumalai peaks above the clouds.' },
      { num: '03', title: 'Nilgiri Safari', desc: 'Spot the rare, endangered Nilgiri Tahr in Eravikulam.' },
      { num: '04', title: 'Attukad Trek', desc: 'Hike through thick green forests to secret cascading falls.' },
      { num: '05', title: 'Misty Resort', desc: 'Unwind in wood-cabins looking over emerald valleys.' }
    ]
  },
  {
    id: 'Alleppey',
    name: 'Alleppey',
    tagline: 'Serene Houseboats & Backwaters',
    desc: 'Glide through palm-fringed emerald canals on your private luxury houseboat, feel the gentle lake breeze, and experience authentic village life along the banks.',
    bg: '/assets/tour_alleppey.png',
    thumb: '/assets/insta_houseboat.png',
    cards: [
      { num: '01', title: 'Houseboat Stay', desc: 'Sleep on a luxury wooden boat moored in the silent waters.' },
      { num: '02', title: 'Canal Canoe', desc: 'Paddle through narrow, quiet waterways under coco-palms.' },
      { num: '03', title: 'Coir Weaving', desc: 'Learn local traditional rope-weaving from native masters.' },
      { num: '04', title: 'Toddy Dining', desc: 'Taste spicy local pearl spot fish and fresh sweet toddy.' },
      { num: '05', title: 'Vembanad Sunset', desc: 'Witness a breathtaking golden hour across Kerala\'s largest lake.' }
    ]
  },
  {
    id: 'Thekkady',
    name: 'Thekkady',
    tagline: 'Untamed Forests & Spice Havens',
    desc: 'Boating on the serene Periyar Lake to spot wild elephant herds, trekking through dense cardamom plantations, and immersing in traditional martial arts and dances.',
    bg: '/assets/tour_thekkady.png',
    thumb: '/assets/insta_jeep.png',
    cards: [
      { num: '01', title: 'Periyar Boating', desc: 'Cruise the lake while spotting wild herds along the water edge.' },
      { num: '02', title: 'Spice Walk', desc: 'Inhaling sweet smells of cardamom, cinnamon, and pepper.' },
      { num: '03', title: 'Kathakali Play', desc: 'Watch ancient stories depicted through expressive mime dances.' },
      { num: '04', title: 'Bamboo Rafting', desc: 'Row through deep sanctuary zones with expert forest guides.' },
      { num: '05', title: 'Jungle Border', desc: 'Listen to calls of birds and monkeys from a forest resort.' }
    ]
  },
  {
    id: 'Wayanad',
    name: 'Wayanad',
    tagline: 'Mystical Caves & Green Forests',
    desc: 'Unearth prehistoric secrets in the Edakkal Caves, hike to the iconic heart-shaped lake on Chembra Peak, and listen to the jungle symphony from a high treehouse.',
    bg: '/assets/tour_wayanad.png',
    thumb: '/assets/tour_wayanad.png',
    cards: [
      { num: '01', title: 'Edakkal Caves', desc: 'Climb to stone age carvings dating back 8,000 years.' },
      { num: '02', title: 'Banasura Dam', desc: 'Enjoy speedboating at India\'s largest earthern reservoir.' },
      { num: '03', title: 'Chembra Trek', desc: 'Hike to the misty, natural lake that never dries up.' },
      { num: '04', title: 'Kuruva Island', desc: 'Float on bamboo rafts down the Kabini river tributary.' },
      { num: '05', title: 'Treehouse Stay', desc: 'Sleep high in a rainforest canopy looking out at wildlife.' }
    ]
  },
  {
    id: 'Vagamon',
    name: 'Vagamon',
    tagline: 'Endless Pine Glens & Meadows',
    desc: 'Walk hand-in-hand through dense tall pine woods, glide over lush rolling meadows, and enjoy cool, crisp breezes away from all tourist crowds.',
    bg: '/assets/tour_vagamon.png',
    thumb: '/assets/tour_vagamon.png',
    cards: [
      { num: '01', title: 'Pine Forest', desc: 'Walk under towering pine canopies casting long shadows.' },
      { num: '02', title: 'Rolling Meadows', desc: 'Run along green velvet slopes extending as far as you see.' },
      { num: '03', title: 'Kurisumala Farm', desc: 'Visit a silent dairy farm run by monks in the mountains.' },
      { num: '04', title: 'Paragliding', desc: 'Fly tandem over green peaks and foggy valleys below.' },
      { num: '05', title: 'Foggy Cottages', desc: 'Sip warm tea in eco-dwellings completely blanketed in mist.' }
    ]
  },
  {
    id: 'Kovalam',
    name: 'Kovalam',
    tagline: 'Golden Beaches & Cliffs',
    desc: 'Relax on crescent-shaped sands beside the blue Arabian sea, climb the historic red-and-white lighthouse, and indulge in healing herbal oil spa treatments.',
    bg: '/assets/tour_kovalam.png',
    thumb: '/assets/tour_kovalam.png',
    cards: [
      { num: '01', title: 'Lighthouse Beach', desc: 'Gaze at the sea from the balcony of the iconic lighthouse tower.' },
      { num: '02', title: 'Hawa Beach', desc: 'Bask under palm trees and watch traditional net fishing.' },
      { num: '03', title: 'Ayurvedic Spa', desc: 'Heal your body and soul with warm, customized oil massages.' },
      { num: '04', title: 'Catamaran Ride', desc: 'Sail out with local fishermen on traditional wooden log boats.' },
      { num: '05', title: 'Seafood Dining', desc: 'Eat grilled ocean catch on open cliffs under the starlight.' }
    ]
  }
];

export default function CreativeGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const activeDest = DESTINATIONS[activeIdx];

  // Mouse Parallax Effect
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Scroll visibility observer
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

  const handlePlanTrip = (destinationId) => {
    // Dispatch custom event to select destination in TripPlanner component
    const event = new CustomEvent('pranaraSelectDestination', { detail: destinationId });
    window.dispatchEvent(event);
    
    // Smooth scroll to planner
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
      {/* Background with crossfade transition */}
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

      {/* Modern Overlay Gradient */}
      <div className="gallery-overlay"></div>

      {/* Left Circular Side Gallery */}
      <div 
        className="side-gallery"
        style={{
          transform: `translateY(-50%) translate(${parallax.x * 12}px, ${parallax.y * 12}px)`
        }}
      >
        {DESTINATIONS.map((dest, idx) => (
          <div 
            key={dest.id}
            className={`side-gallery-item ${idx === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
            title={`View ${dest.name}`}
          >
            <img src={dest.thumb} alt={dest.name} />
            <span className="side-gallery-label">{dest.name}</span>
          </div>
        ))}
      </div>

      {/* Middle Animated Text Content */}
      <div 
        className="gallery-content"
        style={{
          transform: `translate(${parallax.x * 20}px, ${parallax.y * 20}px)`
        }}
      >
        <span className="gallery-badge">AI Destinations</span>
        <h1>{activeDest.name}</h1>
        <h3 className="gallery-tagline">{activeDest.tagline}</h3>
        <p>{activeDest.desc}</p>
        
        <button 
          onClick={() => handlePlanTrip(activeDest.id)}
          className="btn btn-primary gallery-cta"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Plan {activeDest.name} Trip
        </button>
      </div>

      {/* Right Glass Gallery */}
      <div 
        className="glass-gallery"
        style={{
          transform: `translateY(-50%) translate(${parallax.x * 28}px, ${parallax.y * 28}px)`
        }}
      >
        {activeDest.cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`glass-card ${idx % 2 === 1 ? 'tall' : ''}`}
            style={{ 
              animationDelay: `${idx * 0.25}s`,
              transitionDelay: `${idx * 0.05}s`
            }}
          >
            <div className="glass-card-inner">
              <span className="glass-card-num">{card.num}</span>
              <div className="glass-card-body">
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            </div>
            {/* Shimmer sweeping reflection element */}
            <div className="glass-card-sheen"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
