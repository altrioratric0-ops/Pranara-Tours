import { useState, useEffect } from 'react';

const EXPERIENCES = [
  {
    id: 1,
    title: "Tea Plantation Walk",
    description: "Walk among the lush tea estates of Munnar, learn about the processing, and taste fresh tea.",
    icon: "🌱"
  },
  {
    id: 2,
    title: "Houseboat Stay",
    description: "Unwind in a luxurious wooden Kettuvallam and drift along Alleppey's backwaters.",
    icon: "⛵"
  },
  {
    id: 3,
    title: "Jeep Safari",
    description: "High-altitude off-roading in Kolukkumalai to reach the highest organic tea gardens in the world.",
    icon: "🛞"
  },
  {
    id: 4,
    title: "Spice Garden Tour",
    description: "Discover cardamom, cinnamon, pepper, and vanilla plants in their natural habitat in Thekkady.",
    icon: "🌿"
  },
  {
    id: 5,
    title: "Waterfall Trekking",
    description: "Trek through forested streams to hidden waterfalls, safe for swimming and exploring.",
    icon: "🌊"
  },
  {
    id: 6,
    title: "Wildlife Safari",
    description: "Take a boat cruise or guided trek to spot elephants, bisons, and Nilgiri tahrs in Periyar.",
    icon: "🐘"
  },
  {
    id: 7,
    title: "Kathakali Show",
    description: "Witness the vibrant and intense classical dance-drama of Kerala performed by local masters.",
    icon: "🎭"
  },
  {
    id: 8,
    title: "Ayurvedic Spa",
    description: "Indulge in authentic rejuvenating herbal massages and wellness treatments by experts.",
    icon: "💆"
  },
  {
    id: 9,
    title: "Bamboo Rafting",
    description: "A tranquil rafting and trekking experience along the reserve lakes of Thekkady and Wayanad.",
    icon: "🛶"
  },
  {
    id: 10,
    title: "Sunrise Viewpoints",
    description: "Stand above the clouds at Top Station or Kolukkumalai for a golden sunrise.",
    icon: "🌅"
  },
  {
    id: 11,
    title: "Camping",
    description: "Sleep under the stars on misty hilltops in Munnar or Vagamon with a cozy campfire.",
    icon: "⛺"
  },
  {
    id: 12,
    title: "Zipline Adventure",
    description: "Fly over lush green valleys and tea gardens on Kerala's longest zipline courses.",
    icon: "🧗"
  }
];

export default function Experiences() {
  return (
    <section className="experiences" id="experiences" style={{ padding: '100px 0', background: 'var(--cream)' }}>
      <div className="container">
        <h2 className="section-title">Kerala <span className="accent">Experiences</span></h2>
        <p className="section-subtitle">Immersive activities that showcase the true essence of God's Own Country</p>
        
        <div className="experience-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          {EXPERIENCES.map((exp) => (
            <div 
              key={exp.id} 
              className="experience-card"
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '30px 24px',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
              }}
            >
              <div 
                className="experience-icon-wrapper"
                style={{
                  fontSize: '2.5rem',
                  marginBottom: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-dark)'
                }}
              >
                {exp.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary-dark)',
                marginBottom: '10px',
                fontWeight: '600'
              }}>
                {exp.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-light)',
                lineHeight: '1.5'
              }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
