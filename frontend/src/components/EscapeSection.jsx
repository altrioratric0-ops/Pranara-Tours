import React from 'react';

const escapePackages = [
  {
    title: 'ESCAPE PACKAGES',
    subtitle: 'Disconnect to reconnect.',
    checklist: ['Scenic Stays', 'Tea Garden Retreats', 'Peaceful Hideouts'],
    price: 'From ₹6,999 / night',
    imageUrl: '/assets/tour_munnar.png',
  },
  {
    title: 'TOUR & TRAVEL PACKAGES',
    subtitle: 'Curated journeys. Local stories.',
    checklist: ['Sightseeing', 'Local Experiences', 'Comfortable Travel'],
    price: 'From ₹9,999 / person',
    imageUrl: '/assets/tour_thekkady.png',
  },
  {
    title: 'OFFROAD ADVENTURE PACKAGES',
    subtitle: 'For the thrill seekers.',
    checklist: ['Thar Offroad Drive', 'Hidden Trails', 'Adrenaline Rush'],
    price: 'From ₹12,999 / person',
    imageUrl: '/assets/tour_offroad.png',
  }
];

const adventureItems = [
  {
    title: 'OFFROAD DRIVES',
    desc: 'Conquer rugged terrains.',
    imageUrl: '/assets/tour_offroad.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M12 2v9M8 5h8M6 11V7a3 3 0 0 1 6 0v4M18 11V7a3 3 0 0 0-3-3h-3" />
        <circle cx="7.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    )
  },
  {
    title: 'TREKKING',
    desc: 'Trails that test, views that heal.',
    imageUrl: '/assets/munnar_top_station.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 15l3-3-3-3" />
        <path d="M22 12H13" />
      </svg>
    )
  },
  {
    title: 'HIKING',
    desc: 'One step closer to nature.',
    imageUrl: '/assets/munnar_kolukkumalai.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20L17 11L14 14L11 8L3 20H20Z" />
        <circle cx="12" cy="5" r="1.5" />
      </svg>
    )
  },
  {
    title: 'ZIPLINE',
    desc: 'Fly high. Feel alive.',
    imageUrl: '/assets/munnar_zipline.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3L21 21M10 10l2 2-2 4 4-2 2 2" />
      </svg>
    )
  },
  {
    title: 'CAMP FIRE',
    desc: 'Stories. Stars. Unforgettable nights.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22l8-8M16 22L8 14" strokeWidth="2" />
        <path d="M12 2C10 5 9 8 10 11C11.5 12 12.5 12.5 13.5 11C15 9 14 5 12 2Z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: 'NATURAL ESCAPES',
    desc: 'Pure air. Green everywhere.',
    imageUrl: '/assets/munnar_eravikulam.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C12 22 20 18 20 12C20 6.5 15.5 2 12 2C8.5 2 4 6.5 4 12C4 18 12 22 12 22Z" />
        <path d="M12 2V22M12 12c2-2 4-2 5 0M12 15c-2-2-4-2-5 0" />
      </svg>
    )
  },
  {
    title: 'WATERFALLS',
    desc: 'Raw. Powerful. Magical.',
    imageUrl: '/assets/munnar_attukad.png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12M8 5v10M16 5v10M4 18c3-1 5-1 8 0s5 1 8 0" />
      </svg>
    )
  }
];

const SectionTitle = ({ title }) => (
  <div className="escape-title-wrapper">
    <div className="leaf-decor left-decor">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 14C10 14 18 10 26 5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10C5 7 8 5 9 6C8 8 7 10 7 10Z" fill="var(--primary)"/>
        <path d="M15 8C13 5 16 3 17 4C16 6 15 8 15 8Z" fill="var(--primary)"/>
        <path d="M22 6C20 3 23 1 24 2C23 4 22 6 22 6Z" fill="var(--primary)"/>
      </svg>
    </div>
    <h2 className="escape-section-heading">{title}</h2>
    <div className="leaf-decor right-decor">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M2 14C10 14 18 10 26 5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10C5 7 8 5 9 6C8 8 7 10 7 10Z" fill="var(--primary)"/>
        <path d="M15 8C13 5 16 3 17 4C16 6 15 8 15 8Z" fill="var(--primary)"/>
        <path d="M22 6C20 3 23 1 24 2C23 4 22 6 22 6Z" fill="var(--primary)"/>
      </svg>
    </div>
  </div>
);

export default function EscapeSection() {
  return (
    <section className="escape-section" id="escapes">
      <div className="container">
        {/* Subsection 1: Packages */}
        <div className="escape-packages-container">
          <SectionTitle title="PACKAGES FOR EVERY KIND OF ESCAPE" />
          
          <div className="escape-packages-grid">
            {escapePackages.map((pkg, idx) => (
              <div className="escape-card" key={idx}>
                <div className="escape-card-image-wrapper">
                  <div 
                    className="escape-card-image" 
                    style={{ backgroundImage: `url(${pkg.imageUrl})` }}
                  />
                </div>
                <div className="escape-card-body">
                  <h3 className="escape-card-title">{pkg.title}</h3>
                  <p className="escape-card-subtitle">{pkg.subtitle}</p>
                  
                  <ul className="escape-card-checklist">
                    {pkg.checklist.map((item, i) => (
                      <li key={i} className="escape-checklist-item">
                        <svg className="check-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="9" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1.5" />
                          <path d="M6 10L9 13L14 7" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="escape-card-footer">
                    <span className="escape-card-price">{pkg.price}</span>
                    <a href="#booking" className="btn-escape-explore">EXPLORE</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 2: Adventures */}
        <div className="escape-adventures-container">
          <SectionTitle title="ADVENTURES THAT STAY WITH YOU" />
          
          <div className="adventure-carousel-container">
            <div className="adventure-carousel-track">
              {adventureItems.map((item, idx) => (
                <div className="adventure-card" key={`orig-${idx}`}>
                  <div className="adventure-image-wrapper">
                    <div 
                      className="adventure-image" 
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                  </div>
                  <div className="adventure-body">
                    <h4 className="adventure-title">{item.title}</h4>
                    <p className="adventure-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
              {/* Duplicated for infinite scroll effect */}
              {adventureItems.map((item, idx) => (
                <div className="adventure-card" key={`dup-${idx}`}>
                  <div className="adventure-image-wrapper">
                    <div 
                      className="adventure-image" 
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                  </div>
                  <div className="adventure-body">
                    <h4 className="adventure-title">{item.title}</h4>
                    <p className="adventure-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subsection 3: Trust Features Banner */}
        <div className="trust-features-banner">
          <div className="trust-features-grid">
            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>HANDPICKED EXPERIENCES</h5>
                <p>Curated with love & local insight</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>BEST PRICE GUARANTEE</h5>
                <p>Honest prices. No hidden fees.</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>SAFE & RELIABLE</h5>
                <p>Your safety is our priority</p>
              </div>
            </div>

            <div className="trust-feature-item">
              <div className="trust-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="trust-feature-info">
                <h5>LOCAL EXPERTS</h5>
                <p>Guides who know the land</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
