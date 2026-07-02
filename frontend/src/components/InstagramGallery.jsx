import { useState, useEffect } from 'react';
import { syncInstagram, getInstagramProfile } from '../api/client';

export default function InstagramGallery() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInstagram = async () => {
      try {
        const [profileData, instagramData] = await Promise.all([
          getInstagramProfile('pranara_co'),
          syncInstagram('pranara_co'),
        ]);

        setProfile(profileData);

        if (instagramData.posts && instagramData.posts.length > 0) {
          setPosts(instagramData.posts);
        }
      } catch (err) {
        setError('Could not load Instagram feed. It may be a private account or Instagram is blocking the request.');
      } finally {
        setLoading(false);
      }
    };

    loadInstagram();
  }, []);

  return (
    <section className="instagram-section" id="instagram">
      <div className="container">
        <h2 className="section-title">
          Follow Us on <span className="accent">Instagram</span>
        </h2>
        <p className="section-subtitle">
          Stay updated with our latest adventures &mdash;{' '}
          <a href="https://www.instagram.com/pranara_co" target="_blank" rel="noopener noreferrer"
             style={{ color: '#059669', fontWeight: 600 }}>
            @pranara_co
          </a>
        </p>

        {profile && (
          <div className="instagram-profile-bar">
            <a
              href={profile.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-follow-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/>
              </svg>
              Follow @pranara_co
            </a>
          </div>
        )}

        {loading && <p style={{ textAlign: 'center', color: '#64748b' }}>Loading Instagram posts...</p>}

        {error && (
          <div className="instagram-fallback">
            <div className="instagram-embed-wrapper">
              <iframe
                src={`https://www.instagram.com/pranara_co/embed/`}
                width="400"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                title="Instagram Feed"
                style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}
              ></iframe>
            </div>
            <p style={{ textAlign: 'center', color: '#64748b', marginTop: '16px', fontSize: '0.9rem' }}>
              Follow us on Instagram for the latest updates!
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="instagram-grid">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.instagram_url || `https://www.instagram.com/pranara_co/`}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-post-card"
              >
                <div
                  className="instagram-post-image"
                  style={{
                    background: post.image_url
                      ? `url(${post.image_url}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #1e293b, #065f46)',
                  }}
                >
                  <div className="instagram-post-overlay">
                    <span>{post.caption?.substring(0, 100) || 'View on Instagram'}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="instagram-fallback">
            <div className="instagram-embed-wrapper">
              <iframe
                src={`https://www.instagram.com/pranara_co/embed/`}
                width="400"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                title="Instagram Feed"
                style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}
              ></iframe>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="https://www.instagram.com/pranara_co"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex' }}
          >
            &#128247; View All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
