import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function PranaraTourism() {
  const tourismSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.pranaramunnar.com/pranara-tourism#service",
        "name": "Pranara Tourism",
        "url": "https://www.pranaramunnar.com/pranara-tourism",
        "logo": "https://www.pranaramunnar.com/assets/logo.png",
        "image": "https://www.pranaramunnar.com/assets/insta_resort.png",
        "description": "Pranara Tourism provides customized Kerala travel packages, private sightseeing tours, honeymoon itineraries, and resort stays across Munnar, Alleppey, Thekkady, and Wayanad.",
        "telephone": "+91-6374502007",
        "email": "pranara@travel.com",
        "areaServed": "Kerala, India",
        "priceRange": "₹₹"
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
            "name": "Pranara Tourism",
            "item": "https://www.pranaramunnar.com/pranara-tourism"
          }
        ]
      }
    ]
  };

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title="Pranara Tourism | Kerala Travel Planner & Customized Tour Packages"
        description="Discover God's Own Country with Pranara Tourism. We craft customized travel itineraries, private sightseeing tours, and luxury stays across Munnar, Alleppey, and Wayanad."
        canonical="https://www.pranaramunnar.com/pranara-tourism"
        jsonLd={tourismSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Pranara Tourism</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Official Brand Services</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            Pranara Tourism — Handcrafted Kerala Travel Experiences
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            At <strong>Pranara Tourism</strong>, we design unforgettable Kerala journeys tailored to your budget, travel style, and preferences. From misty hill stations to tranquil backwaters, experience seamless travel planning backed by local expertise.
          </p>
        </header>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>What Pranara Tourism Offers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Customized Kerala Tour Packages</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Handpicked holiday itineraries covering Munnar, Alleppey houseboats, Thekkady wildlife safaris, and Wayanad waterfalls with dedicated private transportation.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Pranara Stays &amp; Accommodation</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Boutique resorts, tea estate villas, and eco-friendly stays in Munnar curated specifically for comfort, breathtaking scenery, and warm local hospitality.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>Pranara Munnar Adventures</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                4x4 Thar Jeep expeditions to Kolukkumalai cloud sunrise, high-altitude trekking, ziplining, tea plantation walks, and campfire evenings.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Top Kerala Destinations Covered</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', listStyle: 'none', padding: 0 }}>
            <li style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <Link to="/destinations/munnar" style={{ textDecoration: 'none', color: '#166534', fontWeight: '700' }}>
                Munnar Tourism Packages &rarr;
              </Link>
            </li>
            <li style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <Link to="/destinations/alleppey" style={{ textDecoration: 'none', color: '#166534', fontWeight: '700' }}>
                Alleppey Houseboat Tours &rarr;
              </Link>
            </li>
            <li style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <Link to="/destinations/thekkady" style={{ textDecoration: 'none', color: '#166534', fontWeight: '700' }}>
                Thekkady Wildlife Safaris &rarr;
              </Link>
            </li>
            <li style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <Link to="/destinations/wayanad" style={{ textDecoration: 'none', color: '#166534', fontWeight: '700' }}>
                Wayanad Nature Trips &rarr;
              </Link>
            </li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href={`https://wa.me/916374502007?text=${encodeURIComponent('Hello Pranara Tourism! I would like to plan a customized Kerala tour package.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: '12px' }}
          >
            Plan Your Kerala Trip via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
