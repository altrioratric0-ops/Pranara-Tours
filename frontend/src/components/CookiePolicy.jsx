import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="terms-page-section">
      <SEO
        title="Cookie Policy | Pranara Travel Co."
        description="Read the Cookie Policy of Pranara Travel Co. to learn how we use cookies and essential tracking technologies."
        canonical="https://pranaratours.com/cookies"
      />
      <div className="container terms-container-box">
        <div className="terms-header">
          <span className="terms-badge">COOKIE COMPLIANCE</span>
          <h1 className="terms-title">Cookie Policy</h1>
          <p className="terms-subtitle">Last Updated: August 2026</p>
          <p className="terms-intro">
            PRANARA uses cookies to make our website work better and provide you with a smooth browsing experience.
          </p>
        </div>

        <div className="terms-content-card">
          <div className="terms-list">
            <div className="terms-item">
              <h3>What Are Cookies?</h3>
              <p>
                Cookies are small files stored on your device when you visit our website. They help us remember your preferences and understand how you use our website.
              </p>
            </div>

            <div className="terms-item">
              <h3>How We Use Cookies</h3>
              <p>We use cookies to:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', lineHeight: '1.8' }}>
                <li>Keep the website working properly.</li>
                <li>Remember your preferences.</li>
                <li>Improve website performance.</li>
                <li>Understand website usage.</li>
                <li>Provide a better travel-planning experience.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>Third-Party Cookies</h3>
              <p>
                Some services such as maps, analytics, payment providers, or other third-party tools may use their own cookies.
              </p>
            </div>

            <div className="terms-item">
              <h3>Managing Cookies</h3>
              <p>
                You can accept, reject, or manage cookies through your browser settings. Disabling some cookies may affect certain website features.
              </p>
            </div>

            <div className="terms-item">
              <h3>Updates</h3>
              <p>
                We may update this Cookie Policy when our services or website features change.
              </p>
              <div style={{ marginTop: '16px', background: 'var(--cream)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(46, 125, 50, 0.15)' }}>
                <strong style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '1.05rem' }}>PRANARA</strong>
                <em style={{ color: 'var(--text-light)', display: 'block' }}>Munnar Vacation Planner</em>
              </div>
            </div>
          </div>

          <div className="terms-submit-wrapper" style={{ marginTop: '36px' }}>
            <Link to="/" className="btn btn-primary terms-submit-btn" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
