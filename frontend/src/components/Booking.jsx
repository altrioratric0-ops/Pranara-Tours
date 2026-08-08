import { useEffect, useState } from 'react';

export default function Booking() {
  const whatsappCommunityLink = 'https://chat.whatsapp.com/';
  const [mobileNumber, setMobileNumber] = useState('');

  const handleJoinCommunity = (e) => {
    if (e) e.preventDefault();
    window.open(whatsappCommunityLink, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // Scroll to booking section if ?book is in URL
    if (window.location.search.includes('book=')) {
      setTimeout(() => {
        const el = document.getElementById('booking');
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  return (
    <section className="booking-community-section" id="booking">
      <div className="booking-community-container">
        <div className="community-banner-card">
          <div className="community-content-left">
            <h2 className="community-title">Begin Your Kerala Story</h2>
            <p className="community-subtitle">JOIN OUR COMMUNITY TO KNOW US</p>

            <form className="community-input-box" onSubmit={handleJoinCommunity}>
              <input
                type="tel"
                placeholder="Enter your mobile to join community"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="community-input"
              />
              <button type="submit" className="community-btn">
                JOIN COMMUNITY
              </button>
            </form>
          </div>

          <div className="community-banner-right">
            <div className="community-image-frame">
              <img
                src="/assets/Travel_poster.png"
                alt="Autumnvale Experience Munnar"
                className="community-banner-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

