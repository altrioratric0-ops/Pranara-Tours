import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function PranaraStays() {
  const staysSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.pranaramunnar.com/pranara-stays#hotel",
        "name": "Pranara Stays",
        "url": "https://www.pranaramunnar.com/pranara-stays",
        "image": "https://www.pranaramunnar.com/assets/insta_resort.png",
        "description": "Pranara Stays provides comfortable, serene accommodation, boutique tea estate resorts, and scenic hideouts in Munnar, Kerala.",
        "telephone": "+91-6374502007",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Munnar Tea Country",
          "addressLocality": "Munnar",
          "addressRegion": "Kerala",
          "postalCode": "685612",
          "addressCountry": "IN"
        }
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
            "name": "Pranara Stays",
            "item": "https://www.pranaramunnar.com/pranara-stays"
          }
        ]
      }
    ]
  };

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title="Pranara Stays | Munnar Accommodation & Tea Plantation Hideouts"
        description="Book scenic accommodation with Pranara Stays in Munnar. Enjoy tea garden views, comfortable rooms, local Kerala dining, and tranquil mountain stays."
        canonical="https://www.pranaramunnar.com/pranara-stays"
        jsonLd={staysSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Pranara Stays</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Accommodations &amp; Retreats</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            Pranara Stays — Scenic Munnar Accommodation &amp; Tea Garden Retreats
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            Disconnect from city noise and reconnect with nature. <strong>Pranara Stays</strong> offers peaceful hideouts, tea plantation cottages, and cozy mountain accommodations in the heart of Munnar.
          </p>
        </header>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Highlights of Staying with Pranara</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Private Tea Estate Views</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Wake up to mist-draped tea hills, morning mountain breezes, and birdsong right outside your window.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Authentic Kerala Hospitality</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Freshly prepared local dishes, hot cardamom tea, evening campfires, and attentive service tailored to your stay.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Convenient Tour Connectivity</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Seamless integration with Pranara Munnar tour packages, Kolukkumalai 4x4 Thar safaris, and local sight-seeing pickups.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Nearby Munnar Attractions</h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '16px' }}>
            When staying at Pranara Stays, you are just minutes away from top scenic destinations including Attukad Waterfalls, Pothamedu Viewpoint, KDHP Tea Museum, and Eravikulam National Park.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
            <Link to="/pranara-munnar" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              Explore Pranara Munnar Experiences &rarr;
            </Link>
            <Link to="/destinations/munnar" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              Munnar Travel Guide &rarr;
            </Link>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href={`https://wa.me/916374502007?text=${encodeURIComponent('Hello! I am inquiring about room availability and packages at Pranara Stays in Munnar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: '12px' }}
          >
            Check Availability via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
