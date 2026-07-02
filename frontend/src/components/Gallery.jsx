import { useState, useEffect } from 'react';
import { fetchGallery } from '../api/client';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .catch(() => setImages([]))
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
                <span className="instagram-badge">&#128247; Instagram</span>
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
