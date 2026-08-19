import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DESTINATIONS } from './CreativeGallery';

export default function SubGallery() {
  const { categoryId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const destination = useMemo(() => {
    return DESTINATIONS.find((item) => item.slug === categoryId) || DESTINATIONS[0];
  }, [categoryId]);

const images = destination.images;

  return (
    <section style={{ padding: '100px 20px 40px', minHeight: '100vh', background: '#07111d', color: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/#gallery" style={{ display: 'inline-block', marginBottom: '16px', color: '#f59e0b', textDecoration: 'none', fontWeight: 700 }}>
          ← Back to Gallery
        </Link>

        <h1 style={{ fontSize: '1.8rem', margin: '0 0 20px' }}>{destination.name}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {images.map((image, index) => (
            <div key={`${destination.slug}-${index + 1}`} style={{ borderRadius: '16px', overflow: 'hidden', background: '#1e293b' }}>
              <img
                src={image}
                alt={`${destination.name} ${index + 2}`}
                onClick={() => setSelectedImage(image)}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              zIndex: 1000
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div
              style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  lineHeight: 1
                }}
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Expanded gallery"
                style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '20px' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
