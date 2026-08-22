const NEW_HERO_VIDEO = '/assets/background.mp4';
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-video-wrap">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src={NEW_HERO_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-mist"></div>
      <div className="hero-content">
        <h1>
          Explore the Magic of<br />
          <span>Kerala</span> with Pranara
        </h1>
        <p>
          Discover handcrafted journeys through Munnar Kerala's hidden gem. We create personalized travel experiences that let you relax while we take care of every detail.
        </p>
        <div className="hero-actions">
          <a
            href="#escapes"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('escapes')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            Book Your Experience
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </section>
  );
}
