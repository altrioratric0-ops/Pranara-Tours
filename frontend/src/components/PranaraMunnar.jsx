import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function PranaraMunnar() {
  const munnarSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": "https://www.pranaramunnar.com/pranara-munnar#destination",
        "name": "Pranara Munnar",
        "url": "https://www.pranaramunnar.com/pranara-munnar",
        "description": "Pranara Munnar brings you the best of Munnar tourism: tea plantation walks, Kolukkumalai sunrise 4x4 safaris, Attukad waterfalls, and private sightseeing tours.",
        "image": "https://www.pranaramunnar.com/assets/tour_munnar.png"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pranaramunnar.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Pranara Munnar",
            "item": "https://www.pranaramunnar.com/pranara-munnar"
          }
        ]
      }
    ]
  };

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title="Pranara Munnar | Munnar Tourism, Stays & Tour Packages"
        description="Explore Munnar with Pranara. Experience Kolukkumalai sunrise Jeep safaris, tea plantation retreats, Attukad waterfalls, and customized Munnar tour packages."
        canonical="https://www.pranaramunnar.com/pranara-munnar"
        jsonLd={munnarSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Pranara Munnar</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Destination Highlight</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            Pranara Munnar — Tea Hills, Cloud Sunrises &amp; Nature Adventures
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            Discover <strong>Pranara Munnar</strong>, your ultimate local guide to exploring South India's premier hill station. From high-altitude tea gardens to offroad mountain Jeep drives, experience Munnar with trusted local experts.
          </p>
        </header>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Top Experiences in Pranara Munnar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Kolukkumalai Sunrise 4x4 Jeep Safari</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Conquer rugged mountain trails early morning in a 4x4 Thar to witness a breathtaking sunrise above the clouds at the world's highest tea estate.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Tea Garden Walks &amp; Museum Tour</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Stroll through emerald tea estates, learn 100+ years of tea processing history at the KDHP museum, and savor fresh cardamom tea.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Waterfalls &amp; Wildlife Reserves</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Visit cascading Attukad &amp; Lakkom waterfalls and spot the rare endangered Nilgiri Tahr mountain goat inside Eravikulam National Park.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Frequently Asked Questions — Munnar Travel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: '0 0 6px' }}>What is the best time to visit Munnar?</h3>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>September to March offers pleasant chilly weather, clear skies, and prime views for tea garden walks and Kolukkumalai sunrise safaris.</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: '0 0 6px' }}>How many days are recommended for Munnar?</h3>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>A 2 to 3-day itinerary allows you to enjoy major sightseeing spots, tea gardens, Kolukkumalai offroad safari, and relaxed stay experiences.</p>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          <Link to="/pranara-stays" className="btn btn-outline" style={{ padding: '14px 28px', textDecoration: 'none' }}>
            Explore Pranara Stays in Munnar &rarr;
          </Link>
          <a
            href={`https://wa.me/916374502007?text=${encodeURIComponent('Hi Pranara Munnar! I would like to book a Munnar tour package / Kolukkumalai safari.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '14px 28px', textDecoration: 'none' }}
          >
            Enquire Munnar Package
          </a>
        </div>
      </div>
    </div>
  );
}
