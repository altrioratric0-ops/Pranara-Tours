import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function KeralaMap() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <div className="munnar-map-card">
      <div className="map-header">
        <h2 className="map-heading">MUNNAR EXPERIENCE MAP</h2>
        <p className="map-subtitle">Click map to expand full high-resolution map</p>
      </div>

      <div className="map-visual-container" onClick={() => setIsLightboxOpen(true)}>
        <div className="map-image-wrapper">
          <img
            src="/assets/munnar_experience_map.jpg"
            alt="Munnar Experience Map - Pranara"
            className="munnar-map-img"
            loading="lazy"
          />
          <div className="map-hover-overlay">
            <span className="map-zoom-prompt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Click to Enlarge
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal mounted at document.body via Portal */}
      {isLightboxOpen &&
        createPortal(
          <div className="map-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
            <div className="map-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="map-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close Map View"
              >
                &times;
              </button>
              <div className="map-lightbox-scroll">
                <img
                  src="/assets/munnar_experience_map.jpg"
                  alt="Munnar Experience Map - Full Resolution"
                  className="map-lightbox-img"
                />
              </div>
              <div className="map-lightbox-caption">
                <span>PRANARA BASE CAMP — MUNNAR EXPERIENCE MAP</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
