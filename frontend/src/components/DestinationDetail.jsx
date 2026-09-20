import { useParams, Link } from 'react-router-dom';
import SEO from './SEO';

const DESTINATION_DATA = {
  munnar: {
    name: 'Munnar',
    title: 'Munnar Tour Packages & Travel Guide | Pranara Tourism',
    description: 'Explore Munnar tea hills, Kolukkumalai sunrise safaris, Eravikulam National Park, and Attukad waterfalls with Pranara Tourism.',
    h1: 'Munnar Travel Guide & Customized Tour Packages',
    overview: 'Nestled in the Western Ghats of Kerala, Munnar is famous for its rolling tea plantations, cool misty climate, rare wildlife, and high-altitude peaks. Experience pristine nature with Pranara Tourism and Pranara Stays.',
    attractions: [
      'Kolukkumalai Sunrise (World\'s Highest Tea Estate)',
      'Eravikulam National Park & Nilgiri Tahr Spotting',
      'Attukad & Lakkom Waterfalls',
      'KDHP Tea Museum & Spice Plantation Walks',
      'Mattupetty Dam & Echo Point Lake'
    ],
    bestTime: 'September to March',
    packagesLink: '/tour/munnar-mist',
    staysLink: '/pranara-stays'
  },
  alleppey: {
    name: 'Alleppey (Alappuzha)',
    title: 'Alleppey Houseboat Packages & Backwater Guide | Pranara Tourism',
    description: 'Book luxury Alleppey houseboat cruises and backwater holiday packages with Pranara Tourism. Experience serene lagoon cruises in Kerala.',
    h1: 'Alleppey Backwater Houseboat Trips & Travel Guide',
    overview: 'Known as the Venice of the East, Alleppey is famous for its intricate network of tranquil backwaters, palm-fringed canals, traditional houseboats, and serene coastal lagoons.',
    attractions: [
      'Overnight Luxury Private Houseboat Cruise',
      'Vembanad Lake Sunset Boating',
      'Shikara Village Canal Ride',
      'Alleppey Beach & Historic Lighthouse',
      'Kuttanad Below-Sea-Level Paddy Fields'
    ],
    bestTime: 'October to March',
    packagesLink: '/tour/alleppey-houseboat-cruises',
    staysLink: '/kerala-tour-packages'
  },
  thekkady: {
    name: 'Thekkady',
    title: 'Thekkady Wildlife Safaris & Tour Packages | Pranara Tourism',
    description: 'Discover Periyar Tiger Reserve wildlife boating, spice garden walks, and jungle trekking in Thekkady with Pranara Tourism.',
    h1: 'Thekkady Wildlife Sanctuary & Spice Plantation Guide',
    overview: 'Thekkady is Kerala\'s eco-tourism hub, home to the Periyar National Park & Wildlife Sanctuary, aromatic spice plantations, bamboo rafting, and elephant sanctuaries.',
    attractions: [
      'Periyar Lake Boat Safari & Wildlife Spotting',
      'Guided Spice Plantation Sensory Walk',
      'Bamboo Rafting & Jungle Trekking',
      'Elephant Interaction & Cultural Kathakali Shows',
      'Gavi Forest Eco-Expedition'
    ],
    bestTime: 'September to May',
    packagesLink: '/tour/thekkady-wildlife-safari',
    staysLink: '/kerala-tour-packages'
  },
  wayanad: {
    name: 'Wayanad',
    title: 'Wayanad Tour Packages & Nature Travel Guide | Pranara Tourism',
    description: 'Explore Wayanad hills, Chembra peak heart lake, Edakkal caves, and cascading waterfalls with Pranara Tourism.',
    h1: 'Wayanad Nature Trails & Mountain Travel Guide',
    overview: 'Wayanad offers mist-clad mountain peaks, ancient caves, spice and coffee plantations, wildlife reserves, and serene lakes in northern Kerala.',
    attractions: [
      'Chembra Peak & Heart-Shaped Lake Trek',
      'Edakkal Caves Prehistoric Petroglyphs',
      'Banasura Sagar Earth Dam & Speed Boating',
      'Soochipara & Meenmutty Waterfalls',
      'Kuruva Island River Rafting'
    ],
    bestTime: 'October to May',
    packagesLink: '/tour/wayanad-hills-waterfalls',
    staysLink: '/kerala-tour-packages'
  }
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const dest = DESTINATION_DATA[slug?.toLowerCase()] || DESTINATION_DATA.munnar;

  const destSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": `https://www.pranaramunnar.com/destinations/${slug}#destination`,
        "name": dest.name,
        "description": dest.description,
        "url": `https://www.pranaramunnar.com/destinations/${slug}`
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
            "name": "Destinations",
            "item": "https://www.pranaramunnar.com/#heritage"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": dest.name,
            "item": `https://www.pranaramunnar.com/destinations/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="seo-page-shell" style={{ padding: '120px 24px 80px', background: '#faf9f5', color: '#1e293b' }}>
      <SEO
        title={dest.title}
        description={dest.description}
        canonical={`https://www.pranaramunnar.com/destinations/${slug}`}
        jsonLd={destSchema}
      />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav className="breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/#heritage" style={{ color: '#166534', textDecoration: 'none' }}>Destinations</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>{dest.name}</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#d97706', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Kerala Destination Guide</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#166534', marginTop: '8px' }}>
            {dest.h1}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '16px auto 0', lineHeight: '1.7' }}>
            {dest.overview}
          </p>
        </header>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '16px' }}>Top Places to Visit &amp; Things to Do in {dest.name}</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {dest.attractions.map((attr, idx) => (
              <li key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', color: '#0f172a' }}>
                ✨ {attr}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '12px' }}>Best Time to Visit {dest.name}</h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
            The recommended season to visit <strong>{dest.name}</strong> is <strong>{dest.bestTime}</strong>, when pleasant weather makes sightseeing, wildlife safaris, and outdoor treks highly enjoyable.
          </p>
        </section>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          <Link to={dest.packagesLink} className="btn btn-primary" style={{ padding: '14px 28px', textDecoration: 'none' }}>
            Explore {dest.name} Tour Packages &rarr;
          </Link>
          <a
            href={`https://wa.me/916374502007?text=${encodeURIComponent(`Hello Pranara Tourism! I am interested in visiting ${dest.name}. Please share details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '14px 28px', textDecoration: 'none' }}
          >
            Enquire via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
