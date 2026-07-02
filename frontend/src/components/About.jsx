export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px'
          }}>
          </div>
          <div>
            <h2>Welcome to <span className="accent">Pranara Kerala</span></h2>
            <p>
              Pranara Kerala is your trusted gateway to the breathtaking landscapes of
              God's Own Country. We specialize in crafting immersive travel experiences that blend adventure, nature, and cultural discovery across Munnar, Alleppey, Wayanad, and beyond.
            </p>
            <p>
              Whether you're trekking through mist-laden tea plantations, cruising on luxury houseboats in quiet lagoons, exploring spice gardens, or soaking in coastal cliff views, our guided tours ensure every moment is unforgettable.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-num">23+</div>
                <div className="stat-label">Expeditions</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">500+</div>
                <div className="stat-label">Happy Explorers</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">12+</div>
                <div className="stat-label">Kerala Trails</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
