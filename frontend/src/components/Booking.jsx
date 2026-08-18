import { useEffect, useState } from 'react';

export default function Booking() {
  const whatsappCommunityLink = 'https://chat.whatsapp.com/Lx1kXtArr4N8TKtv9jLSMr';
  const whatsappDirectNumber = '916374502007';
  const helplineNumber = '919497869454';
  const [mobileNumber, setMobileNumber] = useState('');

  const handleJoinCommunity = (e) => {
    if (e) e.preventDefault();
    const message = mobileNumber
      ? `Hi Pranara, my mobile number is ${mobileNumber}. I would like to join your travel community and enquire about Kerala trip bookings.`
      : `Hi Pranara, I would like to join your travel community and enquire about Kerala trip bookings.`;
    const url = `https://wa.me/${whatsappDirectNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectWhatsApp = () => {
    const text = "Hi Pranara! I want to enquire about booking a Kerala vacation / experience.";
    window.open(`https://wa.me/${whatsappDirectNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
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
            <p className="community-subtitle" style={{ marginBottom: '16px' }}>
              WhatsApp is primary channel for booking enquiries,travel packages, and trip assistance.
            </p>

            {/* Direct WhatsApp Enquiry Button */}
            <div style={{ marginBottom: '24px' }}>
              <button
                type="button"
                className="booking-wa-direct-btn"
                onClick={handleDirectWhatsApp}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z" />
                </svg>
                <span>ENQUIRE NOW VIA WHATSAPP (+91 6374502007)</span>
              </button>
            </div>

            {/* Join Community Input Form */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px stroke rgba(0,0,0,0.08)' }}>
              <form className="community-input-box" onSubmit={handleJoinCommunity}>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="community-input"
                  style={{ fontSize: '14px' }}
                />
                <button type="submit" className="community-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  JOIN COMMUNITY
                </button>
              </form>
            </div>
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
