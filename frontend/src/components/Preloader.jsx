import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const minTime = 250; // 0.25 seconds minimum load timer

    const handleLoadComplete = () => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, minTime - elapsed);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
          // Also hide static html preloader if present
          const staticOverlay = document.getElementById('static-preloader');
          if (staticOverlay) {
            staticOverlay.style.display = 'none';
          }
        }, 400);
      }, delay);
    };

    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
      const fallbackTimer = setTimeout(handleLoadComplete, 1000);
      return () => {
        window.removeEventListener('load', handleLoadComplete);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? 'preloader-fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo-ring">
          <img src="/assets/logo.png" alt="Pranara Logo" className="preloader-logo-img" />
        </div>
        <div className="preloader-brand">PRANARA</div>
      </div>
    </div>
  );
}
