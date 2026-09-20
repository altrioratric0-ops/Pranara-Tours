import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function NotFoundPage() {
  return (
    <div className="not-found-page" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 60px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #FAF9F5 0%, #F1EFE9 100%)',
    }}>
      <SEO
        title="404 Page Not Found | Pranara Travel Co."
        description="The page you are looking for does not exist or has been moved. Explore our Kerala tour packages and travel experiences."
        noindex={true}
      />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '6rem',
          fontWeight: 800,
          color: '#166534',
          margin: 0,
          lineHeight: 1,
          fontFamily: "'Cinzel', 'Playfair Display', serif"
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '1.8rem',
          color: '#1e293b',
          margin: '16px 0 12px',
          fontWeight: 700
        }}>
          Destination Not Found
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          Looks like you've wandered off the trail. The page you are looking for doesn't exist or may have been moved.
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Return Home
          </Link>
          <Link to="/#packages" className="btn btn-secondary" style={{
            textDecoration: 'none',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155'
          }}>
            Browse Tour Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
