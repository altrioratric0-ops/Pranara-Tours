import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function PranaraTourism() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.pranaramunnar.com/",
        "name": "Pranara Tourism",
        "url": "https://www.pranaramunnar.com/",
        "description": "Pranara Tourism is your trusted Kerala travel planner offering customized tour packages, guided sightseeing, and boutique accommodation bookings in Munnar, Alleppey, Thekkady, and Wayanad.",
        "telephone": "+91-6374502007",
        "email": "pranara@travel.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Munnar",
          "addressLocality": "Munnar",
          "addressRegion": "Kerala",
          "postalCode": "685612",
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Kerala, India"
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
            "name": "Pranara Tourism",
            "item": "https://www.pranaramunnar.com/"
          }
        ]
      }
    ]
  };

  return (
    <div className="seo-page-shell" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      <SEO
        title="Pranara Tourism | Kerala Travel Planner & Customized Tour Packages"
        description="Plan your Kerala trip with Pranara Tourism. Discover handcrafted itineraries for Munnar, Alleppey backwaters, Thekkady safaris, and Wayanad hills."
        canonical="https://www.pranaramunnar.com/"
        jsonLd={schema}
      />
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#166534', fontWeight: '600' }}>Home</Link> &nbsp;/&nbsp; <span style={{ color: '#1e293b', fontWeight: '500' }}>Pranara Tourism</span>
        </nav>

        {/* Primary Page Heading */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#166534', marginBottom: '16px', lineHeight: '1.2' }}>
          Pranara Tourism | Kerala Travel Planner & Customized Experiences
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '32px', lineHeight: '1.7' }}>
          Welcome to <strong>Pranara Tourism</strong>, your premier local travel planner and destination manager in Kerala. We specialize in creating personalized, memorable vacation experiences across God's Own Country — from mist-shrouded tea plantations in Munnar to serene houseboat backwaters in Alleppey and wildlife safaris in Thekkady.
        </p>

        {/* Key Offerings Grid */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>
            Why Plan Your Kerala Journey with Pranara Tourism?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>Handcrafted Itineraries</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Every trip is tailored to your preferences, budget, and travel style — whether for honeymoons, family holidays, or solo escapes.</p>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>Local Expertise</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Our experienced local guides and chauffeurs ensure authentic cultural insights and hassle-free navigation.</p>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>Pranara Stays</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Direct booking access to handpicked tea estate villas, boutique eco-resorts, and serene mountain hideouts.</p>
            </div>
          </div>
        </section>

        {/* Featured Destinations Link Network */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>
            Explore Top Kerala Destinations with Pranara
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Link to="/pranara-munnar" style={{ padding: '20px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', textDecoration: 'none', color: '#065f46', fontWeight: '700' }}>
              🌲 Pranara Munnar &rarr;
              <span style={{ display: 'block', fontWeight: '400', fontSize: '0.85rem', color: '#047857', marginTop: '4px' }}>Munnar tour packages, tea gardens & sunrise Jeep safaris.</span>
            </Link>

            <Link to="/pranara-stays" style={{ padding: '20px', borderRadius: '12px', background: '#fef3c7', border: '1px solid #fde68a', textDecoration: 'none', color: '#92400e', fontWeight: '700' }}>
              🏡 Pranara Stays &rarr;
              <span style={{ display: 'block', fontWeight: '400', fontSize: '0.85rem', color: '#b45309', marginTop: '4px' }}>Boutique mountain retreats & tea estate accommodations.</span>
            </Link>

            <Link to="/destinations/alleppey" style={{ padding: '20px', borderRadius: '12px', background: '#e0f2fe', border: '1px solid #bae6fd', textDecoration: 'none', color: '#0369a1', fontWeight: '700' }}>
              🛶 Alleppey Houseboats &rarr;
              <span style={{ display: 'block', fontWeight: '400', fontSize: '0.85rem', color: '#0284c7', marginTop: '4px' }}>Luxury backwater cruises & lagoon stays.</span>
            </Link>

            <Link to="/destinations/thekkady" style={{ padding: '20px', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', textDecoration: 'none', color: '#15803d', fontWeight: '700' }}>
              🐅 Thekkady Wildlife &rarr;
              <span style={{ display: 'block', fontWeight: '400', fontSize: '0.85rem', color: '#16a34a', marginTop: '4px' }}>Periyar tiger reserve safaris & spice garden tours.</span>
            </Link>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>
            Frequently Asked Questions about Pranara Tourism
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b' }}>How do I plan a customized Kerala tour with Pranara Tourism?</h3>
              <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.95rem' }}>You can select one of our curated package templates or reach out directly via WhatsApp to customize your trip duration, stays, and activities.</p>
            </div>

            <div style={{ padding: '16px 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b' }}>Are transportation and guide services included?</h3>
              <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.95rem' }}>Yes, all tour packages with Pranara Tourism include a dedicated, comfortable vehicle with an experienced local driver/guide.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
