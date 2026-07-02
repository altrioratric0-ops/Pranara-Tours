const EXPERIENCES = [
  {
    id: 1,
    title: "Tea Plantation Walk",
    description: "Walk among the lush tea estates, learn about the processing, and taste fresh organic tea.",
    imageUrl: "/assets/insta_resort.png"
  },
  {
    id: 2,
    title: "Houseboat Stay",
    description: "Unwind in a luxurious wooden Kettuvallam and drift along Alleppey's palm-fringed backwaters.",
    imageUrl: "/assets/insta_houseboat.png"
  },
  {
    id: 3,
    title: "Jeep Safari & Off-Roading",
    description: "High-altitude off-roading to reach cloud-covered peaks and private viewpoints.",
    imageUrl: "/assets/insta_jeep.png"
  },
  {
    id: 4,
    title: "Hot Air Balloon",
    description: "Fly above the clouds and witness the spectacular 360-degree views of Kerala's tea valleys.",
    imageUrl: "/assets/insta_balloon.png"
  },
  {
    id: 5,
    title: "Waterfall Trekking",
    description: "Trek through forested streams to hidden waterfalls, perfect for wild swimming and exploring.",
    imageUrl: "/assets/insta_waterfall.png"
  },
  {
    id: 6,
    title: "Ayurvedic Spa & Wellness",
    description: "Indulge in authentic rejuvenating herbal massages and wellness retreats by local experts.",
    imageUrl: "/assets/insta_wellness.png"
  }
];

export default function Experiences() {
  return (
    <section className="experiences" id="experiences" style={{ padding: '100px 0', background: 'var(--cream)' }}>
      <div className="container">
        <h2 className="section-title">Kerala <span className="accent">Experiences</span></h2>
        <p className="section-subtitle">Immersive, premium activities sourced directly from our curated adventure plans</p>
        
        <div className="experience-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {EXPERIENCES.map((exp) => (
            <div 
              key={exp.id} 
              className="experience-card"
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                overflow: 'hidden',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
              }}
            >
              {/* Image Section */}
              <div style={{
                height: '240px',
                backgroundImage: `url(${exp.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)'
                }}></div>
              </div>

              {/* Text Section */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-dark)',
                  marginBottom: '10px',
                  fontWeight: '700'
                }}>
                  {exp.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-light)',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  minHeight: '48px'
                }}>
                  {exp.description}
                </p>
                <a 
                  href="https://wa.me/919447123456?text=Hi%20Pranara,%20I'm%20interested%20in%20the%20Kerala%20Experience:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onClick={(e) => {
                    // Append experience title dynamically
                    e.currentTarget.href = `https://wa.me/919447123456?text=Hi%20Pranara,%20I'm%20interested%20in%20the%20${encodeURIComponent(exp.title)}%20experience!`;
                  }}
                >
                  Book via WhatsApp ➔
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
