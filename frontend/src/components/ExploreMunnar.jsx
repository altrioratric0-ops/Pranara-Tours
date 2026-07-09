import { useState, useEffect } from 'react';
import { fetchGallery } from '../api/client';

const STATIC_SIGHTS = [
  { id: 's1', image_url: "/assets/munnar_top_station.png", caption: "Top Station Valley" },
  { id: 's3', image_url: "/assets/munnar_attukad.png", caption: "Attukad Waterfalls" },
  { id: 's4', image_url: "/assets/tour_offroad.png", caption: "Kolukkumalai Offroad Jeep Ride" },
  { id: 's5', image_url: "/assets/munnar_eravikulam.png", caption: "Eravikulam National Park" },
  { id: 's6', image_url: "/assets/munnar_mattupetty.png", caption: "Mattupetty Dam & Lake" },
  { id: 's7', image_url: "/assets/munnar_echo_point.png", caption: "Misty Echo Point Lake" },
  { id: 's8', image_url: "/assets/munnar_kundala.png", caption: "Kundala Lake Shikara Ride" },
  { id: 's9', image_url: "/assets/munnar_lakkom.png", caption: "Lakkom Waterfalls" },
  { id: 's10', image_url: "/assets/munnar_anamudi.png", caption: "Anamudi Peak (Highest in South India)" }
];

const styles = `
.explore-munnar-card {
  aspect-ratio: 4/3;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  border: 1px solid var(--border);
}

.explore-munnar-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.explore-munnar-img {
  position: absolute;
  inset: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.explore-munnar-card:hover .explore-munnar-img {
  transform: scale(1.08);
}

.explore-munnar-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 90%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 24px;
  transition: background 0.3s ease;
  z-index: 2;
}

.explore-munnar-card:hover .explore-munnar-overlay {
  background: linear-gradient(to top, rgba(27, 94, 32, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%);
}

.explore-munnar-caption {
  color: #fff;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
  transition: transform 0.3s ease;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.explore-munnar-card:hover .explore-munnar-caption {
  transform: translateY(-2px);
}
`;

export default function ExploreMunnar() {
  const [sights, setSights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then((data) => {
        const munnarKeywords = ['munnar', 'kolukkumalai', 'top station', 'eravikulam', 'mattupetty', 'echo point', 'kundala', 'attukad', 'tea museum', 'misty hills', 'tea garden'];
        const filtered = (data || []).filter(item => 
          (item.image_url && item.image_url.toLowerCase().includes('munnar')) ||
          (item.caption && munnarKeywords.some(keyword => item.caption.toLowerCase().includes(keyword)))
        );
        
        if (filtered.length === 0) {
          setSights(STATIC_SIGHTS);
        } else {
          // Merge database results, ensuring unique items and prioritizing static list images
          const merged = [...filtered];
          STATIC_SIGHTS.forEach(staticItem => {
            if (!merged.some(m => m.caption?.toLowerCase() === staticItem.caption.toLowerCase())) {
              merged.push(staticItem);
            }
          });
          setSights(merged);
        }
      })
      .catch(() => {
        setSights(STATIC_SIGHTS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="explore-munnar" id="explore-munnar" style={{ padding: '100px 0', background: '#fff' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="container">
        <h2 className="section-title">Explore <span className="accent">Munnar</span></h2>
        <p className="section-subtitle">A showcase of the breathtaking valleys, waterfalls, tea gardens, and viewpoints in and around Munnar</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '40px' }}>Loading attractions...</p>
        ) : (
          <div className="explore-munnar-grid">
            {sights.map((item) => (
              <div
                className="explore-munnar-card"
                key={item.id || item.image_url}
              >
                <div
                  className="explore-munnar-img"
                  style={{
                    background: item.image_url
                      ? `url(${item.image_url}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #1e293b, #065f46)',
                  }}
                />
                <div className="explore-munnar-overlay">
                  <span className="explore-munnar-caption">{item.caption || 'Munnar'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
