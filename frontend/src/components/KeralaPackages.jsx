import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function KeralaPackages() {
  const packagesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": "https://www.pranaramunnar.com/kerala-tour-packages#list",
        "name": "Kerala Tour Packages by Pranara Tourism",
        "url": "https://www.pranaramunnar.com/kerala-tour-packages",
        "description": "Curated Kerala tour packages, honeymoon trips, family vacation packages, and customized itineraries by Pranara Tourism."
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
            "name": "Kerala Tour Packages",
            "item": "https://www.pranaramunnar.com/kerala-tour-packages"
          }
        ]
      }
    ]
  };

  const toursList = [
    {
      id: 'munnar-mist',
      title: 'Munnar Tea Hills Escape',
      duration: '3 Days / 2 Nights',
      destinations: 'Munnar, Kolukkumalai, Attukad Waterfalls',
      description: 'Experience mist-laden tea hills, private estate walks, and chilly mountain breakfasts in pristine Munnar.',
      price: '₹14,999'
    },
    {
      id: 'kolukkumalai-jeep-safari',
      title: 'Kolukkumalai Sunrise 4x4 Jeep Safari',
      duration: '1 Day Expedition',
      destinations: 'Kolukkumalai Sunrise Peak & Tea Factory',
      description: 'Early morning 4x4 Thar Jeep drive above cloud level to witness South India\'s most famous mountain sunrise.',
      price: '₹3,499'
    },
    {
      id: 'alleppey-houseboat-cruises',
      title: 'Alleppey Backwater Houseboat Cruise',
      duration: '2 Days / 1 Night',
      destinations: 'Alleppey Backwaters & Vembanad Lake',
      description: 'Glide through tranquil palm-fringed lagoons on a luxury private houseboat with authentic traditional Kerala meals.',
      price: '₹11,500'
    },
    {
      id: 'thekkady-wildlife-safari',
      title: 'Thekkady Wildlife & Spice Plantation Tour',
      duration: '2 Days / 1 Night',
      destinations: 'Periyar Tiger Reserve & Spice Gardens',
      description: 'Dense spice forest walks, elephant sanctuary visits, and Periyar lake boating inside Thekkady wildlife reserve.',
      price: '₹8,999'
    },
    {
      id: 'wayanad-hills-waterfalls',
      title: 'Wayanad Nature & Waterfall Trail',
      duration: '3 Days / 2 Nights',
      destinations: 'Chembra Peak, Edakkal Caves, Banasura Dam',
      description: 'Trek heart-shaped lake peaks, explore prehistoric cave etchings, and relax near cascading mountain waterfalls.',
      price: '₹12,499'
    }
  ];

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title="Kerala Tour Packages | Customized Holidays & Trips by Pranara"
        description="Browse handcrafted Kerala tour packages by Pranara Tourism. Honeymoon itineraries, family travel packages, and private sightseeing in Munnar, Alleppey & Wayanad."
        canonical="https://www.pranaramunnar.com/kerala-tour-packages"
        jsonLd={packagesSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Kerala Tour Packages</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Handcrafted Itineraries</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            Kerala Tour Packages &amp; Customized Travel Experiences
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            Explore our featured Kerala tour packages crafted by <strong>Pranara Tourism</strong>. Whether planning a romantic honeymoon, a family holiday, or an offroad adventure, we cover every detail.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {toursList.map((t) => (
            <div key={t.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>{t.duration}</span>
                <h2 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '12px 0 6px' }}>{t.title}</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '10px' }}>📍 {t.destinations}</p>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{t.description}</p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#166534' }}>{t.price} <small style={{ fontWeight: '400', fontSize: '0.75rem', color: '#64748b' }}>/ person</small></span>
                <Link to={`/tour/${t.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', textDecoration: 'none' }}>
                  View Itinerary &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginTop: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '12px' }}>Need a 100% Customized Itinerary?</h2>
          <p style={{ color: '#475569', maxWidth: '650px', margin: '0 auto 24px', lineHeight: '1.6' }}>
            We customize trip durations, resort choices, pick-up points, and activities according to your exact budget and travel schedule.
          </p>
          <a
            href={`https://wa.me/916374502007?text=${encodeURIComponent('Hello Pranara Tourism! I would like to request a custom Kerala trip plan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: '12px' }}
          >
            Request Custom Trip Plan via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
