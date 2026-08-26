import { useMemo, useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DESTINATIONS } from './CreativeGallery';
import SEO from './SEO';

export default function SubGallery() {
  const { categoryId } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const destination = useMemo(() => {
    return DESTINATIONS.find((item) => item.slug === categoryId) || DESTINATIONS[0];
  }, [categoryId]);

  const images = destination.images;

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  // Slideshow auto-play effect in lightbox modal
  useEffect(() => {
    if (selectedIndex === null || !isAutoPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [selectedIndex, isAutoPlaying, handleNext]);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `https://www.pranaramunnar.com/gallery/${categoryId}#gallery`,
        "name": `${destination.name} Gallery`,
        "description": destination.desc,
        "url": `https://www.pranaramunnar.com/gallery/${categoryId}`,
        "image": images.map((img) => `https://www.pranaramunnar.com${img.startsWith('/') ? '' : '/'}${img}`)
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
            "name": "Gallery",
            "item": "https://www.pranaramunnar.com/#gallery"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": destination.name,
            "item": `https://www.pranaramunnar.com/gallery/${categoryId}`
          }
        ]
      }
    ]
  };

  return (
    <section style={{ padding: '100px 20px 40px', minHeight: '100vh', background: '#07111d', color: '#f8fafc' }}>
      <SEO
        title={`${destination.name} Photos & Travel Guide | Kerala Tourism | Prana Munnar`}
        description={`Explore stunning photos and scenic views of ${destination.name} in Kerala. ${destination.desc}`}
        canonical={`https://www.pranaramunnar.com/gallery/${categoryId}`}
        ogImage={destination.bg || images[0]}
        jsonLd={gallerySchema}
      />
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
                alt={`${destination.name} scenic view ${index + 1} - Pranara Kerala Tours`}
                onClick={() => setSelectedIndex(index)}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
              />
            </div>
          ))}
        </div>

        {selectedIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.88)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              zIndex: 1000
            }}
            onClick={() => {
              setSelectedIndex(null);
              setIsAutoPlaying(false);
            }}
          >
            <div
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedIndex(null);
                  setIsAutoPlaying(false);
                }}
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  zIndex: 10
                }}
              >
                ×
              </button>

              <img
                src={images[selectedIndex]}
                alt={`Expanded gallery view ${selectedIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '16px' }}
              />

              {/* Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                  title="Previous Photo"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                  title="Next Photo"
                >
                  →
                </button>
              </div>

              <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '8px' }}>
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
