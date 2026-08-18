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
          <div className="about-image" style={{
            backgroundImage: "url('/assets/insta_resort.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px'
          }}>
          </div>
          <div>
            <h2>Welcome to <span className="accent">Pranara</span></h2>
            <div>
              Pranara is your trusted gateway to the breathtaking landscapes of
              God's Own Country. We specialize in crafting immersive travel experiences that blend adventure, nature, and cultural discovery across Munnar
              <p>
                Whether you're trekking through mist-laden tea plantations, cruising on luxury houseboats in quiet lagoons, exploring spice gardens, or soaking in coastal cliff views, our guided tours ensure every moment is unforgettable.
              </p>
            </div>
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
                <div className="stat-label">Kerala Trails</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{(visitorCount !== null && visitorCount !== undefined) ? `${visitorCount} +` : '500 +'}</div>
                <div className="stat-label">visitors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

