import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DESTINATIONS } from './CreativeGallery';

export default function SubGallery() {
  const { categoryId } = useParams();

  const destination = useMemo(() => {
    return DESTINATIONS.find((item) => item.slug === categoryId) || DESTINATIONS[0];
  }, [categoryId]);

  return (
    <section style={{ padding: '100px 20px 40px', minHeight: '100vh', background: '#07111d', color: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-block', marginBottom: '16px', color: '#f59e0b', textDecoration: 'none', fontWeight: 700 }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '1.8rem', margin: '0 0 20px' }}>{destination.name}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {destination.images.map((image, index) => (
            <div key={`${destination.slug}-${index}`} style={{ borderRadius: '16px', overflow: 'hidden', background: '#1e293b' }}>
              <img src={image} alt={`${destination.name} ${index + 1}`} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
