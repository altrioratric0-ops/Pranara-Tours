import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function TravelGuides() {
  const guideSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pranaramunnar.com/travel-guides#guide",
        "headline": "Ultimate Kerala Travel Guide & Itinerary Planner",
        "url": "https://www.pranaramunnar.com/travel-guides",
        "description": "Comprehensive Kerala travel guide covering best time to visit, trip itineraries, Munnar stay tips, Alleppey houseboats, and local cultural experiences.",
        "author": {
          "@type": "Organization",
          "name": "Pranara Tourism"
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
            "name": "Travel Guides",
            "item": "https://www.pranaramunnar.com/travel-guides"
          }
        ]
      }
    ]
  };

  const articles = [
    {
      title: 'Best Time to Visit Munnar & Top Attractions Guide',
      excerpt: 'Discover monthly weather patterns, tea garden bloom periods, and how to plan a 3-day Munnar itinerary.',
      link: '/destinations/munnar'
    },
    {
      title: 'Complete Guide to Booking Alleppey Houseboat Cruises',
      excerpt: 'Learn about luxury private houseboats, overnight backwater routes, food inclusions, and ideal cruising seasons.',
      link: '/destinations/alleppey'
    },
    {
      title: 'Kolukkumalai Sunrise 4x4 Thar Jeep Expedition',
      excerpt: 'Everything you need to know before taking the 4 AM mountain Jeep safari to the world’s highest tea estate.',
      link: '/pranara-munnar'
    },
    {
      title: 'Thekkady Spice Gardens & Periyar Wildlife Safari Guide',
      excerpt: 'A complete traveler\'s guide to Periyar tiger reserve boat safaris, spice walks, and jungle bamboo rafting.',
      link: '/destinations/thekkady'
    }
  ];

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title="Kerala Travel Guides & Itinerary Tips | Pranara Tourism"
        description="Read essential Kerala travel guides by Pranara Tourism. Discover trip itineraries, best time to visit Munnar & Alleppey, stay tips, and local secrets."
        canonical="https://www.pranaramunnar.com/travel-guides"
        jsonLd={guideSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Travel Guides</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Travel Knowledge &amp; Insights</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            Kerala Travel Guides &amp; Vacation Planning
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            Expert travel advice, itinerary breakdowns, destination insights, and local tips curated by <strong>Pranara Tourism</strong> to help you plan the perfect trip to Kerala.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {articles.map((art, idx) => (
            <div key={idx} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '10px', lineHeight: '1.4' }}>{art.title}</h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{art.excerpt}</p>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Link to={art.link} style={{ color: '#166534', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>
                  Read Guide &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
