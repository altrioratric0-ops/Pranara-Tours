import { useState } from 'react';
import foundersImg from '../assets/founders image.png';
import KeralaMap from './KeralaMap';

export default function LocalHeritage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadStory = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <section className="heritage-section" id="heritage">
      <div className="container">
        <div className="heritage-grid">

          {/* Column 1: Our Story Card */}
          <div className="heritage-story-card">
            <div className="story-content">
              <span className="story-tagline">Our Story</span>
              <h2 className="story-heading">We know Munnar because we grew up here.</h2>
              <p className="story-paragraph">
                For over 10 years, we've been exploring these roads, guiding travellers and collecting stories.
                Pranara is our way of sharing the Munnar that maps don't show.
              </p>
            </div>
            <a href="#story" onClick={handleReadStory} className="btn-read-story">
              READ OUR STORY &rarr;
            </a>

            {/* Stamp Badge */}
            <div className="stamp-badge-container">
              <svg width="110" height="110" viewBox="0 0 120 120" className="stamp-badge">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,3" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <path id="stamp-path" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                <text fill="currentColor" fontSize="6.8" fontWeight="600" letterSpacing="0.4">
                  <textPath href="#stamp-path" startOffset="0%">BORN IN MUNNAR • 10+ YEAR OF EXPERIENCE • THE LOCAL EXPERT •</textPath>
                </text>
                <g transform="translate(43, 44)" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="17 8 25 21 9 21" />
                  <polygon points="21 12 27 21 15 21" />
                </g>
              </svg>
            </div>

            {/* Framed Picture in Story Card */}
            <div className="story-frame-container">
              <img
                src="/assets/Preview.jpeg"
                alt="Pranara Local Guides Jeep"
                className="story-framed-img"
              />
            </div>
          </div>

          {/* Column 2: Munnar Experience Map */}
          <div className="heritage-map-container-column">
            <KeralaMap />
          </div>

        </div>
      </div>

      {/* Heritage Story Modal */}
      {isModalOpen && (
        <div className="heritage-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="heritage-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <span className="modal-tagline">Since 2016</span>
            <h3 className="modal-heading">The Spirit of Pranara</h3>

            <div className="modal-body">
              <p>
                Pranara Tours was founded by a small group of childhood friends who spent their youth exploring the forest trails, tea corridors, and secret cascades of Munnar.
                We observed that standard travel packages often bypassed the real beauty of our homeland—the stories of tea harvesters, prehistoric dolmens, and pathless forest ridges.
              </p>
              <p>
                We decided to share our passion and build a tour service built on <strong>conservation, local community integration, and authentic storytelling</strong>.
                Today, our team of guides are local residents who know the terrain as their own backyard, providing safe, rich, and truly unforgettable experiences.
              </p>
              <div className="modal-img-row">
                <img
                  src={foundersImg}
                  alt="The Minds Behind Pranara"
                  className="modal-img"
                />
              </div>
            </div>

            <button className="btn-modal-close" onClick={() => setIsModalOpen(false)}>
              Back to Exploration
            </button>
          </div>
        </div>
      )
      }
    </section >
  );
}
