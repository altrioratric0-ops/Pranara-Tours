import { useState, useEffect } from 'react';
import keralaMonsoon from '../assets/kerala_monsoon.png';

export default function SeasonalOffer() {
  // Target date: August 25, 2026 18:00:00 IST (+05:30)
  const targetDate = new Date('2026-08-25T18:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '30',
    seconds: '45'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="offers-page-section">
      <div className="offers-container">
        
        {/* Section Header */}
        <div className="offers-header">
          <div className="offers-eyebrow">LIMITED TIME</div>
          <h2 className="offers-heading">Seasonal Offers &amp; What&apos;s New</h2>
          <p className="offers-subheading">
            Handpicked deals, fresh experiences, and the latest from the hills and backwaters of Kerala.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="offers-banner">
          <img className="offers-banner-img" src={keralaMonsoon} alt="Monsoon Getaway in Kerala" />
          
          <div className="offers-content-wrapper">
            <div className="offers-banner-overlay">
              
              {/* Badge / Pill */}
              <div className="offers-badge-pill">
                <span className="offers-badge-text">MONSOON SPECIAL</span>
              </div>

              {/* Title & Sub */}
              <h3 className="offers-banner-title">Save up to 30% on Monsoon Getaways</h3>
              <p className="offers-banner-sub">
                Misty hills, lush backwaters, and cozy stays — the most magical season to explore Kerala.
              </p>

              {/* Countdown Timer */}
              <div className="offers-countdown">
                <div className="countdown-box">
                  <span className="countdown-num">{timeLeft.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">
                  <span className="countdown-num">{timeLeft.hours}</span>
                  <span className="countdown-label">Hrs</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">
                  <span className="countdown-num">{timeLeft.minutes}</span>
                  <span className="countdown-label">Min</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">
                  <span className="countdown-num">{timeLeft.seconds}</span>
                  <span className="countdown-label">Sec</span>
                </div>
              </div>

              {/* CTA Button */}
              <a 
                href="https://wa.me/916374502007" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="offers-cta-btn"
              >
                <span className="offers-cta-text">Grab This Deal</span>
                <svg className="offers-cta-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7845 9.59689L10.722 14.6594C10.5634 14.8179 10.3485 14.907 10.1243 14.907C9.90013 14.907 9.68515 14.8179 9.52664 14.6594C9.36813 14.5009 9.27908 14.2859 9.27908 14.0617C9.27908 13.8376 9.36813 13.6226 9.52664 13.4641L13.1484 9.84369H2.8125C2.58872 9.84369 2.37411 9.7548 2.21588 9.59656C2.05764 9.43833 1.96875 9.22372 1.96875 8.99994C1.96875 8.77616 2.05764 8.56155 2.21588 8.40332C2.37411 8.24508 2.58872 8.15619 2.8125 8.15619H13.1484L9.52805 4.53369C9.36954 4.37518 9.28049 4.1602 9.28049 3.93603C9.28049 3.71187 9.36954 3.49689 9.52805 3.33838C9.68655 3.17987 9.90154 3.09082 10.1257 3.09082C10.3499 3.09082 10.5649 3.17987 10.7234 3.33838L15.7859 8.40088C15.8645 8.47937 15.9269 8.57263 15.9695 8.67531C16.012 8.77798 16.0338 8.88804 16.0337 8.99918C16.0335 9.11031 16.0115 9.22032 15.9687 9.3229C15.9259 9.42547 15.8633 9.51859 15.7845 9.59689Z" fill="currentColor"/>
                </svg>
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
