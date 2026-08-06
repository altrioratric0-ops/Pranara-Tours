import { useState, useEffect } from 'react';

export default function SeasonalOffer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTarget = localStorage.getItem('seasonal_offer_target');
    let targetTime;
    if (savedTarget && parseInt(savedTarget) > Date.now()) {
      targetTime = parseInt(savedTarget);
    } else {
      // 2 days, 14 hours, 30 mins, 45 secs in ms
      targetTime = Date.now() + (2 * 86400 + 14 * 3600 + 30 * 60 + 45) * 1000;
      localStorage.setItem('seasonal_offer_target', targetTime.toString());
    }

    const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const savedTarget = localStorage.getItem('seasonal_offer_target');
      const targetTime = savedTarget ? parseInt(savedTarget) : Date.now() + (2 * 86400 + 14 * 3600 + 30 * 60 + 45) * 1000;
      const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));

      if (diff <= 0) {
        const newTarget = Date.now() + (2 * 86400 + 14 * 3600 + 30 * 60 + 45) * 1000;
        localStorage.setItem('seasonal_offer_target', newTarget.toString());
      }

      setTimeLeft({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section className="seasonal-offer-section">
      <div className="seasonal-container">
        <div className="seasonal-header-text">
          <span className="seasonal-tag">LIMITED TIME</span>
          <h2 className="seasonal-heading">Seasonal Offers &amp; What&apos;s New</h2>
          <p className="seasonal-subheading">
            Handpicked deals, fresh experiences, and the latest from the hills and backwaters of Kerala.
          </p>
        </div>

        <div className="seasonal-offer-banner">
          <div className="seasonal-banner-content">
            <span className="monsoon-badge">MONSOON SPECIAL</span>
            <h3 className="monsoon-title">Save up to 30% on Monsoon Getaways</h3>
            <p className="monsoon-desc">
              Misty hills, lush backwaters, and cozy stays — the most magical season to explore Kerala.
            </p>

            <div className="countdown-timer-wrapper">
              <div className="countdown-box">
                <span className="countdown-num">{formatDigit(timeLeft.days)}</span>
                <span className="countdown-label">Days</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-box">
                <span className="countdown-num">{formatDigit(timeLeft.hours)}</span>
                <span className="countdown-label">Hrs</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-box">
                <span className="countdown-num">{formatDigit(timeLeft.minutes)}</span>
                <span className="countdown-label">Min</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-box">
                <span className="countdown-num">{formatDigit(timeLeft.seconds)}</span>
                <span className="countdown-label">Sec</span>
              </div>
            </div>

            <a
              href="https://wa.me/916374502007"
              target="_blank"
              rel="noopener noreferrer"
              className="grab-deal-btn"
            >
              Grab This Deal
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="seasonal-banner-image-wrap">
            <img src="/assets/tour_alleppey.png" alt="Monsoon Getaways Houseboat Kerala" className="seasonal-banner-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

