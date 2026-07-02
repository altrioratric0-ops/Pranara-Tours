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
        <div className="hero-badge">&#127748; Explore Kerala</div>
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
            &#128073; Plan My Trip
          </a>
          <a
            href="#tours"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            &#128065; Explore Packages
          </a>
        </div>
      </div>
      <div className="scroll-indicator">&#8964;</div>
    </section>
  );
}
