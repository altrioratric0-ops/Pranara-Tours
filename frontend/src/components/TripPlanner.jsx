import { useState, useEffect } from 'react';

export default function TripPlanner() {
  const [formData, setFormData] = useState({
    destination: 'Munnar',
    days: '3',
    budget: 'Standard',
    travelers: 'Couple',
    hotel: 'Premium Resort',
    activities: ['sightseeing', 'trekking']
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const handleSelectDestination = (e) => {
      const selectedDest = e.detail;
      setFormData((prev) => ({
        ...prev,
        destination: selectedDest,
      }));
    };

    window.addEventListener('pranaraSelectDestination', handleSelectDestination);
    return () => {
      window.removeEventListener('pranaraSelectDestination', handleSelectDestination);
    };
  }, []);

  const handleActivityChange = (activity) => {
    const active = formData.activities.includes(activity);
    if (active) {
      setFormData({
        ...formData,
        activities: formData.activities.filter(a => a !== activity)
      });
    } else {
      setFormData({
        ...formData,
        activities: [...formData.activities, activity]
      });
    }
  };

  const generateItinerary = (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);

    // Simulate AI generation wait
    setTimeout(() => {
      const daysCount = parseInt(formData.days);
      const generatedDays = [];
      const dest = formData.destination;

      const activitiesText = formData.activities.join(', ');

      for (let i = 1; i <= daysCount; i++) {
        let title = '';
        let desc = '';
        let details = [];

        if (dest === 'Munnar') {
          if (i === 1) {
            title = 'Arrival & Tea Gardens Exploration';
            desc = 'Check-in to your hotel. Afternoon visit to the KDHP Tea Museum followed by a tranquil walk through Munnar town and local spice markets.';
            details = ['Private Cab transfer from Kochi Airport', 'Premium tea tasting session', 'Spiced tea buying'];
          } else if (i === 2) {
            title = 'Sunrise Jeep Ride & Kolukkumalai Trek';
            desc = 'An early 4:30 AM jeep ride to the world\'s highest organic tea garden at Kolukkumalai to witness the golden sunrise above the clouds. Afternoon walk in Lockhart Gap.';
            details = ['4WD offroad adventure', 'Fresh hilltop breakfast', 'Scenic photography guides'];
          } else if (i === 3) {
            title = 'Eravikulam Wildlife Safari & Kundala Lake';
            desc = 'Visit Rajamalai inside the Eravikulam National Park to spot the endangered Nilgiri Tahr. Enjoy Kashmiri Shikara boating at Kundala Lake in the afternoon.';
            details = ['National Park entry tickets', 'Shikara boat cruise', 'Photo stop at Echo Point'];
          } else {
            title = 'Attukad Waterfalls Trekking & Departure';
            desc = 'Trek through high cliff paths to reach the base of Attukad Waterfalls for a refreshing bath, followed by checkout and return transfer.';
            details = ['Guided forest trekking', 'Traditional Sadhya lunch on banana leaf', 'Airport transfer'];
          }
        } else if (dest === 'Alleppey') {
          if (i === 1) {
            title = 'Premium Houseboat Boarding & Backwater Cruise';
            desc = 'Embark on your private luxury houseboat from Punnamada Jetty. Cruise through the scenic backwater canals of Vembanad Lake while enjoying fresh fish preparations.';
            details = ['Traditional welcome drink & coconut juice', 'Chef-prepared meals onboard', 'Overnight anchoring in the lake'];
          } else if (i === 2) {
            title = 'Coir Village Walk & Canoeing Adventure';
            desc = 'Take a country canoe ride through narrow palm-canopied canals. Visit a traditional village to witness coir rope weaving and local toddy tapping.';
            details = ['Country boat canal exploration', 'Toddy tasting (optional)', 'Authentic Kerala lunch at home'];
          } else {
            title = 'Alleppey Beach Sunset & Departure';
            desc = 'Explore the old lighthouse ruins on Alleppey beach, enjoy street food, and purchase local handicrafts before heading to your departure station.';
            details = ['Beachside walk', 'Visit to international coir museum', 'Drop-off transfer'];
          }
        } else {
          // General Kerala Itinerary
          if (i === 1) {
            title = `Welcome to Kerala & ${dest} Arrival`;
            desc = `Arrive in Kerala and check-in to your resort in ${dest}. Spend the evening relaxing and enjoying the beautiful views of God's Own Country.`;
            details = ['Meet & greet at arrival gate', 'Resort check-in assistance', 'Leisure evening'];
          } else if (i === 2) {
            title = 'Local Immersive Sightseeing & Guided Experiences';
            desc = `A full-day guided exploration of ${dest}'s finest viewpoints, culture walks, and outdoor activities matching your interests: ${activitiesText}.`;
            details = ['AC private car with driver', 'English/Hindi speaking local guide', 'Fresh juice breaks'];
          } else if (i === 3) {
            title = 'Nature Trail & Spice Garden Walk';
            desc = 'Learn about Kerala spices like cardamom and cinnamon during a walk through a local plantation, followed by a boat ride or forest walk.';
            details = ['Spice garden tickets', 'Rejuvenating herbal tea', 'Scenic photo points'];
          } else {
            title = 'Souvenir Shopping & Departure';
            desc = 'A final shopping session for Kerala sarees, spices, and tea before wrapping up your memories and boarding your return flight.';
            details = ['Local market guidance', 'Departure cab drop-off'];
          }
        }

        generatedDays.push({
          day: i,
          title,
          description: desc,
          details
        });
      }

      setItinerary({
        destination: dest,
        days: daysCount,
        budget: formData.budget,
        travelers: formData.travelers,
        hotel: formData.hotel,
        daysList: generatedDays
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="trip-planner-section" id="planner" style={{ padding: '90px 0', background: 'var(--cream)' }}>
      <div className="container">
        <h2 className="section-title">AI <span className="accent">Trip Planner</span></h2>
        <p className="section-subtitle">Craft your personalized dream itinerary instantly with our automated planner</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginTop: '40px',
          alignItems: 'start'
        }} className="planner-grid-container">
          
          {/* Form Side */}
          <form 
            onSubmit={generateItinerary}
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: 'var(--shadow)',
              textAlign: 'left'
            }}
          >
            <h3 style={{
              fontSize: '1.4rem',
              color: 'var(--primary-dark)',
              marginBottom: '24px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600'
            }}>Plan Your Custom Journey</h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>Select Destination</label>
              <select 
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }}
              >
                <option value="Munnar">Munnar (Hills & Tea Estates)</option>
                <option value="Alleppey">Alleppey (Backwater Houseboats)</option>
                <option value="Thekkady">Thekkady (Wildlife & Spices)</option>
                <option value="Wayanad">Wayanad (Forests & Caves)</option>
                <option value="Vagamon">Vagamon (Pine Meadows)</option>
                <option value="Varkala">Varkala (Cliff Beaches)</option>
                <option value="Kovalam">Kovalam (Lighthouse Beach)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>Number of Days</label>
                <select 
                  value={formData.days}
                  onChange={(e) => setFormData({...formData, days: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>Budget Category</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="Economy">Economy (Budget Stays)</option>
                  <option value="Standard">Standard (Comfort Hotels)</option>
                  <option value="Premium">Premium (Boutique Resorts)</option>
                  <option value="Luxury">Luxury (5-Star & Heritage)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>Traveler Type</label>
                <select 
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="Solo">Solo Traveler</option>
                  <option value="Couple">Couple / Honeymoon</option>
                  <option value="Family">Family Trip</option>
                  <option value="Friends">Friends Group</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>Preferred Hotel</label>
                <select 
                  value={formData.hotel}
                  onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="Standard Hotel">Standard Hotel</option>
                  <option value="Boutique Homestay">Boutique Homestay</option>
                  <option value="Premium Resort">Premium Resort</option>
                  <option value="Luxury Heritage Palace">Luxury Heritage Palace</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '12px' }}>Preferred Activities</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['sightseeing', 'trekking', 'wildlife', 'wellness', 'backwaters', 'culture'].map((act) => (
                  <label key={act} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.activities.includes(act)}
                      onChange={() => handleActivityChange(act)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span style={{ textTransform: 'capitalize' }}>{act}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center', gap: '8px', boxShadow: 'var(--shadow)' }}
              disabled={loading}
            >
              {loading ? (
                <>⏳ Generating Itinerary...</>
              ) : (
                <>✨ Generate My Trip</>
              )}
            </button>
          </form>

          {/* Results Side */}
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: 'var(--shadow)',
            minHeight: '450px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: itinerary || loading ? 'flex-start' : 'center',
            alignItems: itinerary || loading ? 'stretch' : 'center',
            textAlign: itinerary || loading ? 'left' : 'center'
          }} className="planner-results-box">
            
            {!loading && !itinerary && (
              <div style={{ color: 'var(--text-light)', padding: '20px' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>🗺️</span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '10px', fontWeight: '600' }}>Your Custom Plan Awaits</h4>
                <p style={{ fontSize: '0.95rem' }}>Select your options on the left and click "Generate" to construct a customized daily daily plan.</p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid var(--primary-light)',
                  borderTop: '4px solid var(--primary)',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '20px'
                }} className="spinner" />
                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '8px', fontWeight: '600' }}>Crafting Your Kerala Dream Trip</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>Our planner is tailoring hotels, routes, and activities to your custom budget...</p>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            )}

            {!loading && itinerary && (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '20px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>
                      {itinerary.destination} Escape
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {itinerary.days} Days • {itinerary.travelers} • {itinerary.budget} Budget
                    </span>
                  </div>
                  <span style={{
                    background: 'var(--primary-light)',
                    color: 'var(--primary-dark)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {itinerary.hotel}
                  </span>
                </div>

                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {itinerary.daysList.map((d) => (
                    <div key={d.day} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--primary-dark)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          zIndex: 2
                        }}>
                          {d.day}
                        </div>
                        <div style={{
                          flex: 1,
                          width: '2px',
                          background: 'var(--primary-light)',
                          marginTop: '4px',
                          marginBottom: '4px'
                        }} />
                      </div>
                      
                      <div style={{ flex: 1, paddingBottom: '10px' }}>
                        <h5 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0 0 6px 0', fontWeight: '600' }}>
                          {d.title}
                        </h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.5', marginBottom: '10px' }}>
                          {d.description}
                        </p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {d.details.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              style={{
                                fontSize: '0.75rem',
                                color: 'var(--primary-dark)',
                                background: 'var(--primary-light)',
                                padding: '4px 10px',
                                borderRadius: '100px',
                                fontWeight: '500'
                              }}
                            >
                              ✓ {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>Estimated Package Cost</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                      ₹{itinerary.days * (itinerary.budget === 'Luxury' ? 6000 : itinerary.budget === 'Premium' ? 4500 : itinerary.budget === 'Standard' ? 3000 : 2000)} / person
                    </strong>
                  </div>
                  
                  <a 
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      // Auto-fill booking comments with planner details
                      const msgTextarea = document.getElementById('bookingMessage');
                      if (msgTextarea) {
                        msgTextarea.value = `Hi Pranara, I generated an itinerary for a ${itinerary.days}-day trip to ${itinerary.destination} (Budget: ${itinerary.budget}, Hotel: ${itinerary.hotel}, Travelers: ${itinerary.travelers}). Please contact me with details.`;
                      }
                      const nameInput = document.getElementById('bookingName');
                      if (nameInput) nameInput.focus();
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn btn-primary"
                    style={{ padding: '12px 24px', fontSize: '0.9rem' }}
                  >
                    Confirm & Book Trip
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
