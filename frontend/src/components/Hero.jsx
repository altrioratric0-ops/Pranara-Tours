import { useState, useEffect } from 'react';

const BACKGROUND_IMAGES = [
  '/assets/insta_resort.png',
  '/assets/insta_houseboat.png',
  '/assets/insta_waterfall.png',
  '/assets/insta_balloon.png',
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-slides">
        {BACKGROUND_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === bgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-mist"></div>
      <div className="hero-content">
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/logo.png" alt="Pranara Symbol" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
          Explore Kerala
        </div>
        <h1>
          Explore the Magic of<br />
          <span>Kerala</span> with Pranara
        </h1>
        <p>
          Discover handcrafted journeys through Munnar, Alleppey, Wayanad, Thekkady, Vagamon, and Kerala's hidden gems. We create personalized travel experiences that let you relax while we take care of every detail.
        </p>
        <div className="hero-actions">
          <a
            href="#planner"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Plan My Trip
          </a>
          <a
            href="#tours"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Explore Packages
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  );
}
