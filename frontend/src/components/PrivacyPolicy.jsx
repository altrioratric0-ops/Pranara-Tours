import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="terms-page-section">
      <SEO
        title="Privacy Policy | Pranara Travel Co."
        description="Read the Privacy Policy of Pranara Travel Co. to learn how we protect your personal information and privacy."
        canonical="https://www.pranaramunnar.com/privacy"
      />
      <div className="container terms-container-box">
        <div className="terms-header">
          <span className="terms-badge">PRIVACY &amp; DATA PROTECTION</span>
          <h1 className="terms-title">Privacy Policy</h1>
          <p className="terms-subtitle">Last Updated: 17 August 2026</p>
          <p className="terms-intro">
            PRANARA (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal information you provide while using our website, vacation planning services, and related features.
          </p>
          <p className="terms-intro" style={{ marginTop: '12px' }}>
            This Privacy Policy explains what information we collect, how we use it, how we protect it, and your choices regarding your information.
          </p>
        </div>

        <div className="terms-content-card">
          <div className="terms-list">
            <div className="terms-item">
              <h3>1. Information We Collect</h3>
              <p>
                When you use PRANARA, we may collect information that you voluntarily provide, including your name, email address, phone number, travel preferences, booking details, and other information required to provide our services.
              </p>
              <p>
                We may also automatically collect limited technical information such as your IP address, browser type, device information, pages visited, and website usage information.
              </p>
            </div>

            <div className="terms-item">
              <h3>2. How We Use Your Information</h3>
              <p>
                We use the information we collect to provide and improve our vacation planning services, process bookings and enquiries, communicate with you about your trips, provide customer support, personalize travel recommendations, process payments, and improve the performance and security of our website.
              </p>
              <p>
                We may also use your information to send important service-related notifications and, where permitted, promotional communications.
              </p>
            </div>

            <div className="terms-item">
              <h3>3. Booking Information</h3>
              <p>
                When you make a booking through PRANARA, we may collect information necessary to complete and manage your reservation.
              </p>
              <p>
                This may include traveller details, selected packages, travel dates, contact information, and payment-related information.
              </p>
              <p>
                We only use this information for legitimate business and service purposes.
              </p>
            </div>

            <div className="terms-item">
              <h3>4. Payment Information</h3>
              <p>
                Payments may be processed through secure third-party payment providers.
              </p>
              <p>
                PRANARA does not intentionally store complete credit card, debit card, banking passwords, or other sensitive payment credentials on its own servers.
              </p>
              <p>
                Payment information is handled according to the security and privacy practices of the relevant payment provider.
              </p>
            </div>

            <div className="terms-item">
              <h3>5. Location Information</h3>
              <p>
                Some PRANARA features may use location information to help you discover destinations, attractions, routes, and nearby experiences.
              </p>
              <p>
                Location access will only be requested when necessary for a particular feature. You can manage location permissions through your device or browser settings.
              </p>
            </div>

            <div className="terms-item">
              <h3>6. Cookies and Similar Technologies</h3>
              <p>
                PRANARA may use cookies and similar technologies to remember preferences, understand website usage, improve functionality, and provide a better user experience.
              </p>
              <p>
                You can control or disable cookies through your browser settings. However, disabling certain cookies may affect some website features.
              </p>
            </div>

            <div className="terms-item">
              <h3>7. Sharing of Information</h3>
              <p>
                We do not sell or rent your personal information to third parties.
              </p>
              <p>
                We may share necessary information with trusted service providers, payment processors, travel partners, accommodation providers, technology providers, or other partners when required to provide the services you request.
              </p>
              <p>
                We may also disclose information when required by law, legal proceedings, or to protect the rights, safety, and security of PRANARA, our users, or others.
              </p>
            </div>

            <div className="terms-item">
              <h3>8. Data Security</h3>
              <p>
                We take reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no internet-based service can guarantee complete security. You should avoid sharing sensitive information through unsecured communication channels.
              </p>
            </div>

            <div className="terms-item">
              <h3>9. Data Retention</h3>
              <p>
                We retain personal information only for as long as reasonably necessary to provide our services, maintain business and transaction records, resolve disputes, comply with legal obligations, and protect our legitimate business interests.
              </p>
              <p>
                When information is no longer required, we may securely delete or anonymize it.
              </p>
            </div>

            <div className="terms-item">
              <h3>10. Third-Party Services and Links</h3>
              <p>
                Our website may contain links to third-party websites, services, maps, payment providers, accommodation providers, or travel partners.
              </p>
              <p>
                PRANARA is not responsible for the privacy practices, security, or content of external websites. We encourage users to review the privacy policies of those services before providing personal information.
              </p>
            </div>

            <div className="terms-item">
              <h3>11. Children&apos;s Privacy</h3>
              <p>
                PRANARA is not intentionally designed to collect personal information from children without appropriate consent.
              </p>
              <p>
                If you believe that a child has provided personal information to us without appropriate authorization, please contact us so that we can take reasonable steps to remove the information.
              </p>
            </div>

            <div className="terms-item">
              <h3>12. Your Privacy Rights</h3>
              <p>
                Depending on applicable laws, you may have the right to request access to, correction of, deletion of, or information about the personal data we hold about you.
              </p>
              <p>
                You may also request that we stop using your information for certain purposes where applicable.
              </p>
              <p>
                To make a privacy-related request, please contact us using the details provided on our Contact page.
              </p>
            </div>

            <div className="terms-item">
              <h3>13. Marketing Communications</h3>
              <p>
                You may choose not to receive promotional emails or other marketing communications from PRANARA by using the unsubscribe option provided in those communications or by contacting us directly.
              </p>
              <p>
                You may continue to receive essential communications relating to bookings, payments, account activity, or services you have requested.
              </p>
            </div>

            <div className="terms-item">
              <h3>14. Changes to This Privacy Policy</h3>
              <p>
                PRANARA may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or business practices.
              </p>
              <p>
                When we make significant changes, we may update the &ldquo;Last Updated&rdquo; date displayed at the beginning of this policy.
              </p>
              <p>
                We encourage you to review this page periodically.
              </p>
            </div>

            <div className="terms-item">
              <h3>15. Contact Us</h3>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or the way your information is handled, please contact the PRANARA team through our website&apos;s Contact section.
              </p>
              <div style={{ marginTop: '16px', background: 'var(--cream)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(46, 125, 50, 0.15)' }}>
                <strong style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>PRANARA</strong>
                <em style={{ color: 'var(--text-light)', display: 'block', marginBottom: '8px' }}>Kerala Vacation Planner</em>
                <p style={{ margin: '4px 0' }}><strong>Website:</strong> PRANARA Official Website</p>
                <p style={{ margin: '4px 0' }}><strong>Contact:</strong> Through the Contact section of our website</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px stroke var(--border-light, #e2e8f0)', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', lineHeight: '1.5' }}>
            <strong>Note:</strong> This Privacy Policy is general website copy and should be reviewed by a qualified legal professional before being used as PRANARA&apos;s final legally binding privacy policy, particularly if you process online payments, collect precise location data, or operate across multiple countries.
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
