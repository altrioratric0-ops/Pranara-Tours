import { useState, useEffect } from 'react';
import { fetchTours } from '../api/client';

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours()
      .then(setTours)
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, []);

  const getTagClass = (tag) => {
    if (!tag) return '';
    const map = { 'popular': 'tag-popular', 'trending': 'tag-trending', 'best value': 'tag-value' };
    return map[tag.toLowerCase()] || '';
  };

  if (loading) {
    return (
      <section className="tours" id="tours">
        <div className="container">
          <h2 className="section-title">Popular <span className="accent">Tour Packages</span></h2>
          <p className="section-subtitle">Loading tours...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tours" id="tours">
      <div className="container">
        <h2 className="section-title">Popular <span className="accent">Tour Packages</span></h2>
        <p className="section-subtitle">Handpicked experiences across Kerala's finest landscapes</p>
        <div className="tour-grid">
          {tours.map((tour) => (
            <div className="tour-card" key={tour.id}>
              <div
                className="tour-card-image"
                style={{
                  background: tour.image_url
                    ? `url(${tour.image_url}) center/cover no-repeat`
                    : 'linear-gradient(135deg, #0f172a, #065f46)',
                }}
              >
                {tour.tag && <span className={`tag ${getTagClass(tour.tag)}`}>{tour.tag}</span>}
              </div>
              <div className="tour-card-body">
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className="tour-meta">
                  <span className="tour-price">&#8377;{tour.price.toLocaleString()} <small>/ person</small></span>
                  <span className="tour-duration">{tour.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
