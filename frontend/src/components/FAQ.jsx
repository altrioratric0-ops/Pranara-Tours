import { useState } from 'react';

const FAQS = [
  {
    question: 'How many days are enough for Munnar?',
    answer: 'Usually, 2 to 3 days are sufficient to cover Munnar\'s core attractions including the tea gardens, dams, viewpoints, and National Parks. If you wish to trek to Kolukkumalai or explore neighboring forest trails, we recommend adding an extra day.'
  },
  {
    question: 'What is the best season to visit Kerala?',
    answer: 'The ideal season is from September to March when temperatures are pleasant and dry. However, the monsoon season (June to August) is spectacular for viewing rich waterfalls, lush green plantations, and undergoing wellness and Ayurvedic therapy treatments.'
  },
  {
    question: 'Can I customize my travel package?',
    answer: 'Absolutely! All of our itineraries are 100% customizable. You can modify hotel categories, add activities, change the duration of stay, or combine multiple destinations by talking directly to our travel experts via WhatsApp or our booking form.'
  },
  {
    question: 'Are flight tickets included in the packages?',
    answer: 'No, flight tickets are not included in the standard package price. We handle all in-land transfers, AC private cabs, resort reservations, sightseeing entries, and local activity fees, but you will need to book your flights separately.'
  },
  {
    question: 'Do you arrange airport pickups and drop-offs?',
    answer: 'Yes, we arrange hassle-free, private AC taxi pickups and drop-offs directly from Kochi (COK) International Airport or nearby railway stations (Aluva, Ernakulam, Trivandrum) based on your package plan.'
  },
  {
    question: 'Is Kerala safe for solo travelers?',
    answer: 'Yes, Kerala is highly safe and very welcoming for both solo and female travelers. It has a high literacy rate and a very supportive local police presence. We also provide 24/7 dedicated support desk lines so you can reach us anytime during your journey.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="faq-section" id="faq" style={{ padding: '90px 0', background: 'var(--cream)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">Frequently Asked <span className="accent">Questions</span></h2>
        <p className="section-subtitle">Got questions? We have compiled answers to help you plan your journey</p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '40px'
        }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: 'var(--primary-dark)',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    fontSize: '1.5rem',
                    color: 'var(--primary)',
                    fontWeight: '300',
                    transition: 'transform 0.3s',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    display: 'inline-block'
                  }}>
                    ＋
                  </span>
                </button>

                <div style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-out-in, padding 0.3s',
                  background: '#fafafa',
                  borderTop: isOpen ? '1px solid var(--border)' : 'none'
                }}>
                  <p style={{
                    padding: '20px 24px',
                    fontSize: '0.95rem',
                    color: 'var(--text-light)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
