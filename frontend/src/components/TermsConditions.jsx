import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

export default function TermsConditions() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) {
      setError('You must agree to the Terms & Conditions to proceed.');
      return;
    }
    setError('');
    
    // Direct notification message to WhatsApp number 7397532574
    const message = "Hi Pranara, I have read, understood, and agree to the Booking Terms & Conditions. Please proceed with my booking.";
    const waUrl = `https://wa.me/917397532574?text=${encodeURIComponent(message)}`;
    
    alert('Thank you for accepting the Booking Terms & Conditions! Opening WhatsApp to send your confirmation...');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    navigate('/');
  };

  return (
    <section className="terms-page-section">
      <SEO
        title="Terms & Conditions | Pranara Travel Co."
        description="Read the terms and conditions for booking Kerala tour packages and travel experiences with Pranara Travel Co."
        canonical="https://pranaratours.com/terms"
      />
      <div className="container terms-container-box">
        <div className="terms-header">
          <span className="terms-badge">LEGAL COMPLIANCE</span>
          <h1 className="terms-title">Booking Terms &amp; Conditions</h1>
          <p className="terms-subtitle">Effective Date: August 2026</p>
          <p className="terms-intro">
            By making a booking with Pranara, you confirm that you have read, understood, and agreed to these Terms &amp; Conditions.
          </p>
        </div>

        <div className="terms-content-card">
          <div className="terms-list">
            <div className="terms-item">
              <h3>1. Booking Confirmation</h3>
              <p>A booking is confirmed only upon successful payment and receipt of a confirmation from Pranara. All bookings are subject to availability.</p>
            </div>

            <div className="terms-item">
              <h3>2. Payments</h3>
              <p>All prices are quoted in the applicable currency and are subject to applicable taxes unless otherwise stated. Pranara reserves the right to revise prices before a booking is confirmed.</p>
            </div>

            <div className="terms-item">
              <h3>3. Cancellations, Rescheduling &amp; Refunds</h3>
              <ul>
                <li>Cancellation requests must be made in writing at least <strong>24 hours</strong> before the scheduled departure, activity, or accommodation check-in.</li>
                <li>Cancellations received <strong>less than 24 hours</strong> before the scheduled experience, or failure to arrive (no-show), are <strong>not eligible for a refund</strong>.</li>
                <li>Bookings made within 24 hours of the scheduled departure or activity are final and non-refundable.</li>
                <li>Refunds, where applicable, will be processed after deducting any non-recoverable expenses already paid to accommodation providers, transport operators, guides, permits, entry tickets, or other third-party partners.</li>
                <li>Approved refunds will be processed through the original payment method within a reasonable processing period.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>4. Itinerary Changes</h3>
              <p>Pranara reserves the right to modify, substitute, postpone, or cancel any itinerary, route, accommodation, activity, vehicle, guide, or schedule due to weather conditions, road closures, forest department regulations, wildlife movement, government restrictions, operational requirements, safety concerns, or any circumstances beyond our reasonable control.</p>
            </div>

            <div className="terms-item">
              <h3>5. Adventure Activities</h3>
              <p>Activities including jeep safaris, off-road experiences, trekking, hiking, camping, nature walks, waterfalls, and other outdoor adventures involve inherent risks. By participating, guests voluntarily accept these risks and agree to follow all safety instructions provided by Pranara, its guides, drivers, and partner operators. Guests who are pregnant or who have serious medical, heart, spinal, mobility, or other health conditions should seek medical advice before participating.</p>
            </div>

            <div className="terms-item">
              <h3>6. Transportation &amp; Accommodation</h3>
              <p>Transportation and accommodation may be provided directly by Pranara or through carefully selected third-party partners. Vehicle models, seating arrangements, accommodations, and room allocations are subject to operational availability. Pickup and travel timings are approximate and may vary due to traffic, weather, road conditions, or operational requirements.</p>
            </div>

            <div className="terms-item">
              <h3>7. Guest Responsibilities</h3>
              <p>Guests are responsible for:</p>
              <ul>
                <li>Providing accurate booking information.</li>
                <li>Carrying valid identification and any required travel documents.</li>
                <li>Arriving at the designated meeting point on time.</li>
                <li>Following all instructions issued by guides, drivers, and staff.</li>
                <li>Respecting local communities, wildlife, the environment, accommodation providers, and fellow travellers.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>8. Prohibited Conduct</h3>
              <p>For the safety and comfort of everyone, the following are strictly prohibited:</p>
              <ul>
                <li>Violence, threats, abusive, offensive, or discriminatory behaviour.</li>
                <li>Damage to vehicles, accommodation, equipment, or property.</li>
                <li>Carrying illegal drugs, prohibited substances, weapons, or hazardous materials.</li>
                <li>Smoking, alcohol consumption, or intoxication where it compromises safety or violates local rules.</li>
                <li>Distracting or interfering with the driver while a vehicle is in motion.</li>
                <li>Standing, leaning outside vehicles, reckless behaviour, or ignoring safety instructions.</li>
                <li>Littering, vandalism, feeding wildlife, or violating forest, environmental, or local regulations.</li>
              </ul>
              <p className="terms-clause-emphasis">
                Pranara reserves the right to refuse service or immediately remove any guest whose behaviour endangers themselves, other guests, staff, property, or the environment. Such removal may be <strong>without refund</strong>, and guests shall be responsible for any damage, loss, penalties, or additional costs arising from their actions.
              </p>
            </div>

            <div className="terms-item">
              <h3>9. Personal Belongings</h3>
              <p>Guests are solely responsible for their baggage, valuables, travel documents, electronics, and personal belongings. Pranara is not liable for items that are lost, stolen, forgotten, or damaged during the trip.</p>
            </div>

            <div className="terms-item">
              <h3>10. Force Majeure</h3>
              <p>Pranara shall not be held liable for delays, modifications, or cancellations caused by natural disasters, heavy rainfall, landslides, floods, pandemics, strikes, transport disruptions, wildlife movement, government or forest authority orders, or any other event beyond our reasonable control.</p>
            </div>

            <div className="terms-item">
              <h3>11. Liability</h3>
              <p>Pranara exercises reasonable care in organizing travel experiences. However, participation in travel and adventure activities is voluntary and at the guest's own risk. To the fullest extent permitted by applicable law, Pranara shall not be liable for losses, injuries, delays, expenses, or damages resulting from inherent risks of travel, actions of third-party service providers, force majeure events, or circumstances beyond Pranara's reasonable control.</p>
            </div>

            <div className="terms-item">
              <h3>12. Photography</h3>
              <p>Photographs and videos taken during the experience may be used by Pranara for promotional purposes unless guests notify us in writing before the experience begins.</p>
            </div>

            <div className="terms-item">
              <h3>13. Governing Law</h3>
              <p>These Terms &amp; Conditions are governed by the laws of India. Any dispute arising from a booking shall be subject to the jurisdiction of the competent courts in Kerala, India.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="terms-agreement-form">
            <div className="terms-acknowledgement-text">
              By clicking &quot;Book Now&quot;, &quot;Proceed to Payment&quot;, or &quot;Confirm Booking&quot;, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
            </div>

            <div className="terms-checkbox-container">
              <label className="checkbox-label-wrapper">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked);
                    if (e.target.checked) setError('');
                  }}
                  className="terms-checkbox"
                />
                <span className="checkbox-custom-text">
                  I have read, understood, and agree to the Booking Terms &amp; Conditions.
                </span>
              </label>
            </div>

            {error && <div className="terms-error-message">{error}</div>}

            <div className="terms-submit-wrapper">
              <button type="submit" className="btn btn-primary terms-submit-btn">
                Accept &amp; Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
