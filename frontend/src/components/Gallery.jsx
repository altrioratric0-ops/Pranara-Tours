import { useState, useEffect } from 'react';
import { fetchGallery } from '../api/client';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then((data) => {
        // Filter to ensure only Munnar sights are shown
        const munnarKeywords = ['munnar', 'kolukkumalai', 'top station', 'eravikulam', 'mattupetty', 'echo point', 'kundala', 'attukad', 'tea museum', 'misty hills', 'tea garden'];
        const filtered = (data || []).filter(item => 
          (item.image_url && item.image_url.toLowerCase().includes('munnar')) ||
          (item.caption && munnarKeywords.some(keyword => item.caption.toLowerCase().includes(keyword)))
        );
        
        if (filtered.length === 0) {
          setImages([
            { id: 1, image_url: "/assets/munnar_top_station.png", caption: "Top Station Valley" },
            { id: 2, image_url: "/assets/munnar_tea_museum.png", caption: "Tea Museum & Estates" },
            { id: 3, image_url: "/assets/munnar_attukad.png", caption: "Attukad Waterfalls" },
            { id: 4, image_url: "/assets/munnar_kolukkumalai.png", caption: "Kolukkumalai Sunrise" },
            { id: 5, image_url: "/assets/munnar_eravikulam.png", caption: "Eravikulam National Park" },
            { id: 6, image_url: "/assets/munnar_mattupetty.png", caption: "Mattupetty Dam & Lake" },
            { id: 7, image_url: "/assets/munnar_echo_point.png", caption: "Misty Echo Point Lake" },
            { id: 8, image_url: "/assets/munnar_kundala.png", caption: "Kundala Lake" }
          ]);
        } else {
          setImages(filtered);
        }
      })
      .catch(() => {
        setImages([
          { id: 1, image_url: "/assets/munnar_top_station.png", caption: "Top Station Valley" },
          { id: 2, image_url: "/assets/munnar_tea_museum.png", caption: "Tea Museum & Estates" },
          { id: 3, image_url: "/assets/munnar_attukad.png", caption: "Attukad Waterfalls" },
          { id: 4, image_url: "/assets/munnar_kolukkumalai.png", caption: "Kolukkumalai Sunrise" },
          { id: 5, image_url: "/assets/munnar_eravikulam.png", caption: "Eravikulam National Park" },
          { id: 6, image_url: "/assets/munnar_mattupetty.png", caption: "Mattupetty Dam & Lake" },
          { id: 7, image_url: "/assets/munnar_echo_point.png", caption: "Misty Echo Point Lake" },
          { id: 8, image_url: "/assets/munnar_kundala.png", caption: "Kundala Lake" }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="section-title">Explore <span className="accent">Munnar</span></h2>
          <p className="section-subtitle">Loading gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <h2 className="section-title">Explore <span className="accent">Munnar</span></h2>
        <p className="section-subtitle">A glimpse into the beauty that awaits you</p>
        <div className="gallery-grid">
          {images.map((item) => (
            <div
              className="gallery-item"
              key={item.id || item.image_url}
              style={{
                background: item.image_url
                  ? `url(${item.image_url}) center/cover no-repeat`
                  : 'linear-gradient(135deg, #1e293b, #065f46)',
              }}
            >
              {item.source === 'instagram' && (
                <span className="instagram-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </span>
              )}
              <div className="gallery-overlay">
                <span>{item.caption || 'Munnar'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
