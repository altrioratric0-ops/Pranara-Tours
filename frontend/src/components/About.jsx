import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL || 'https://pranara-tours.onrender.com')
  : '';

export default function About() {
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('pranara_visitor_count');
    return saved ? parseInt(saved, 10) : 500;
  });

  useEffect(() => {
    const handleCountUpdate = (e) => {
      if (e.detail && typeof e.detail === 'number') {
        setVisitorCount(e.detail);
      }
    };

    window.addEventListener('pranaraVisitorCountUpdated', handleCountUpdate);

    fetch(`${API_BASE}/api/visits`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
          localStorage.setItem('pranara_visitor_count', data.count.toString());
        }
      })
      .catch((err) => {
        console.warn('Could not fetch visitor count:', err.message);
      });

    return () => {
      window.removeEventListener('pranaraVisitorCountUpdated', handleCountUpdate);
    };
  }, []);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img
              src="/assets/insta_resort.png"
              alt="Pranara Luxury Resort and Kerala Tour Experience in Munnar"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '420px',
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
          </div>
          <div>
            <h2>Welcome to <span className="accent">Pranara</span></h2>
            <p style={{ marginTop: '12px', fontSize: '1.05rem', lineHeight: '1.7', color: '#475569' }}>
              Pranara is your trusted travel planner for the breathtaking landscapes of God's Own Country. We specialize in crafting immersive travel experiences that blend adventure, nature, and cultural discovery across Munnar, Alleppey, Thekkady, and Wayanad.
            </p>
            <p style={{ marginTop: '12px', fontSize: '1.05rem', lineHeight: '1.7', color: '#475569' }}>
              Whether you're trekking through mist-laden tea plantations, cruising on luxury houseboats in quiet lagoons, exploring spice gardens, or soaking in coastal cliff views, our guided tours ensure every moment is unforgettable.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">500+</div>
                <div className="stat-label">Happy Explorers</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">12+</div>
                <div className="stat-label">KeralaTrails</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{(visitorCount !== null && visitorCount !== undefined) ? `${visitorCount} +` : '500 +'}</div>
                <div className="stat-label">visitors counts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

