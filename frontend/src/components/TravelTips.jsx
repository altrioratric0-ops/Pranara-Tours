import { useState } from 'react';

const TIPS = [
  {
    key: 'best-time',
    label: 'Best Time to Visit',
    icon: '📅',
    title: 'When to Explore God\'s Own Country',
    content: 'September to March is the peak tourist season in Kerala when the weather is pleasant, cool, and ideal for backwater cruising and hill treks. June to August is the monsoon season, which is perfect for traditional Ayurvedic wellness therapies and witnessing roaring waterfalls.'
  },
  {
    key: 'packing',
    label: 'What to Pack',
    icon: '🧳',
    title: 'Essential Items for Kerala Trips',
    content: 'Lightweight cotton clothing is recommended for beaches and backwaters. Carry light woolens if you plan to stay overnight in hill stations like Munnar or Vagamon. Do not forget umbrella/rainwear, sunscreen, sunglasses, insect repellent, and sturdy walking shoes for spice garden walks and forest trekking.'
  },
  {
    key: 'weather',
    label: 'Weather Guide',
    icon: '🌤️',
    title: 'Kerala Climate & Seasons',
    content: 'Kerala enjoys a tropical climate. Coastal areas are humid and warm (28°C to 34°C) year-round. Hill stations are significantly cooler, dropping to 10°C to 18°C during winter evenings. Monsoons are heavy but make the landscapes exceptionally green.'
  },
  {
    key: 'transport',
    label: 'Transportation',
    icon: '🚗',
    title: 'How to Get Around Kerala',
    content: 'Pre-booked private AC cabs are the most comfortable way to navigate hilly terrains and remote resorts. Inter-city travel can also be done using local trains (especially along the coast to Varkala). Auto-rickshaws are available for short-distance town commutes.'
  },
  {
    key: 'food',
    label: 'Local Food',
    icon: '🍲',
    title: 'Authentic Cuisines You Must Try',
    content: 'Do not miss Karimeen Pollichathu (pearl spot fish baked in banana leaves), Kerala Parotta with beef or chicken curry, Appam with stew, and traditional vegetarian Sadya served on banana leaves. Coconut is a key ingredient in almost every local dish.'
  },
  {
    key: 'safety',
    label: 'Safety Tips',
    icon: '🛡️',
    title: 'Staying Safe During Your Trip',
    content: 'Kerala is one of the safest states in India for travelers. Keep maps offline when traveling through deep reserve forests. Always swim in designated beach areas and listen to lifeguards at Varkala and Kovalam, as currents can be strong.'
  },
  {
    key: 'budget',
    label: 'Budget Planning',
    icon: '💵',
    title: 'Managing Your Travel Expenses',
    content: 'Daily expenses vary depending on your choice of stays. Economy packages start from ₹2,000 per day including homestays. Carry sufficient cash as smaller spice vendors and tea stalls in remote hill stations do not accept credit cards (though UPI digital payments are widely active).'
  }
];

export default function TravelTips() {
  const [activeTab, setActiveTab] = useState('best-time');
  const activeTip = TIPS.find(t => t.key === activeTab);

  return (
    <section className="travel-tips-section" id="tips" style={{ padding: '100px 0', background: '#fff' }}>
      <div className="container">
        <h2 className="section-title">Kerala <span className="accent">Travel Tips</span></h2>
        <p className="section-subtitle">Practical advice from our local experts to ensure a smooth, unforgettable journey</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '40px',
          marginTop: '40px',
          alignItems: 'start'
        }} className="tips-grid-container">
          
          {/* Tabs Menu */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: 'var(--cream)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border)'
          }}>
            {TIPS.map((tip) => {
              const isActive = tip.key === activeTab;
              return (
                <button
                  key={tip.key}
                  onClick={() => setActiveTab(tip.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '14px 18px',
                    border: 'none',
                    borderRadius: '10px',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-dark)',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{tip.icon}</span>
                  {tip.label}
                </button>
              );
            })}
          </div>

          {/* Details Content Box */}
          <div style={{
            background: 'var(--cream)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: 'var(--shadow)',
            minHeight: '280px',
            textAlign: 'left'
          }}>
            {activeTip && (
              <div>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>{activeTip.icon}</span>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-dark)',
                  marginBottom: '16px',
                  fontWeight: '700'
                }}>
                  {activeTip.title}
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-light)',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {activeTip.content}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
