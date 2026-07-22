import React from 'react';
import { motion } from 'framer-motion';
import './keralamtrad.css';

/**
 * Kerala Tradition Section Component (keralamtrad.jsx)
 * 
 * High-end editorial storytelling section for Pranara Travel Website.
 * Celebrates Kerala's cultural heritage, classical arts, backwaters, ayurveda, and hospitality.
 * 
 * Supports optional custom image props (block1Image, block2Image, block3Image, onExploreClick).
 */

// SVG Decorative Elements
const BananaLeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 90C30 70 40 40 90 10C70 40 60 70 10 90Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 65C45 55 60 40 75 25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    <path d="M42 53L55 45" stroke="currentColor" strokeWidth="1"/>
    <path d="M32 62L43 56" stroke="currentColor" strokeWidth="1"/>
    <path d="M52 44L67 35" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const LotusOutlineSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15C55 35 70 45 85 45C70 55 60 75 50 85C40 75 30 55 15 45C30 45 45 35 50 15Z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M50 30C53 42 63 50 75 50C63 58 55 70 50 78C45 70 37 58 25 50C37 50 47 42 50 30Z" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
  </svg>
);

const TraditionalMotifSVG = () => (
  <svg className="kt-traditional-pattern" width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="3" fill="#D4AF37" />
    <circle cx="30" cy="10" r="2" fill="#2F5D50" />
    <line x1="40" y1="10" x2="80" y2="10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3"/>
    <circle cx="90" cy="10" r="2" fill="#2F5D50" />
    <circle cx="110" cy="10" r="3" fill="#D4AF37" />
  </svg>
);

// High Quality SVG Fallback Illustrations for when custom photos are not provided
const DefaultKathakaliArt = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="katGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B3B2B" />
        <stop offset="50%" stopColor="#2F5D50" />
        <stop offset="100%" stopColor="#13261C" />
      </linearGradient>
      <radialGradient id="goldGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#F7E7B4" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#katGrad)" />
    <circle cx="300" cy="200" r="160" fill="url(#goldGlow)" />
    {/* Decorative Crown Arc */}
    <circle cx="300" cy="190" r="120" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 6" fill="none" />
    <circle cx="300" cy="190" r="140" stroke="#D4AF37" strokeWidth="1" opacity="0.5" fill="none" />
    {/* Crown Kireetam outline */}
    <path d="M220 180 L300 60 L380 180 Z" fill="none" stroke="#D4AF37" strokeWidth="3" />
    <circle cx="300" cy="90" r="14" fill="#D4AF37" />
    <circle cx="260" cy="140" r="10" fill="#D4AF37" />
    <circle cx="340" cy="140" r="10" fill="#D4AF37" />
    {/* Facial Vesham Outline */}
    <path d="M230 190 Q300 160 370 190 Q380 270 300 320 Q220 270 230 190 Z" fill="#234032" stroke="#D4AF37" strokeWidth="2" />
    {/* Chutti white beard outline */}
    <path d="M210 190 Q300 340 390 190" fill="none" stroke="#FAF8F2" strokeWidth="6" opacity="0.9" />
    {/* Eyes & Lip detail */}
    <path d="M250 220 Q270 210 285 225" stroke="#D4AF37" strokeWidth="2" fill="none" />
    <path d="M315 225 Q330 210 350 220" stroke="#D4AF37" strokeWidth="2" fill="none" />
    <path d="M275 270 Q300 285 325 270" stroke="#E63946" strokeWidth="4" fill="none" />
    <text x="300" y="380" textAnchor="middle" fill="#FAF8F2" fontFamily="Georgia, serif" fontSize="20" letterSpacing="4" opacity="0.9">KATHAKALI & THEYAM</text>
    <text x="300" y="405" textAnchor="middle" fill="#D4AF37" fontFamily="sans-serif" fontSize="11" letterSpacing="3" opacity="0.8">SACRED RITUAL ARTS</text>
  </svg>
);

const DefaultHouseboatArt = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="backGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2F5D50" />
        <stop offset="60%" stopColor="#417364" />
        <stop offset="100%" stopColor="#FAF8F2" />
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#backGrad)" />
    {/* Sun */}
    <circle cx="460" cy="140" r="55" fill="#D4AF37" opacity="0.3" />
    <circle cx="460" cy="140" r="40" fill="#FAF8F2" opacity="0.6" />
    {/* Coconut Palms silhouettes */}
    <path d="M60 450 Q90 280 140 180" stroke="#1B3B2B" strokeWidth="8" fill="none" />
    <path d="M140 180 Q80 140 30 160" stroke="#1B3B2B" strokeWidth="3" fill="none" />
    <path d="M140 180 Q140 110 110 90" stroke="#1B3B2B" strokeWidth="3" fill="none" />
    <path d="M140 180 Q200 130 240 160" stroke="#1B3B2B" strokeWidth="3" fill="none" />
    {/* Houseboat silhouette (Kettuvallam) */}
    <path d="M160 330 C220 290 380 290 480 330 L450 360 C360 375 240 375 180 360 Z" fill="#13261C" />
    <path d="M220 300 C270 250 370 250 420 300 Z" fill="#D4AF37" opacity="0.8" />
    {/* Water ripples */}
    <path d="M0 380 Q150 370 300 380 T600 380" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M0 410 Q200 400 400 410 T600 410" stroke="#FAF8F2" strokeWidth="1" fill="none" opacity="0.4" />
    <text x="300" y="420" textAnchor="middle" fill="#234032" fontFamily="Georgia, serif" fontSize="18" letterSpacing="4">TRADITIONAL HOUSEBOATS</text>
  </svg>
);

const DefaultTeaPlantationArt = () => (
  <svg viewBox="0 0 600 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="teaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#234032" />
        <stop offset="50%" stopColor="#2F5D50" />
        <stop offset="100%" stopColor="#3B7363" />
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#teaGrad)" />
    {/* Rolling Hills */}
    <path d="M-50 280 Q150 180 350 280 T700 220 L700 450 L-50 450 Z" fill="#1B3B2B" opacity="0.7" />
    <path d="M-50 330 Q200 240 450 340 L700 450 L-50 450 Z" fill="#13261C" />
    {/* Contour tea plantation lines */}
    <path d="M0 360 Q250 300 500 370" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="8 4" fill="none" opacity="0.6" />
    <path d="M0 390 Q220 340 550 410" stroke="#FAF8F2" strokeWidth="1.5" strokeDasharray="10 5" fill="none" opacity="0.4" />
    {/* Tea leaf / Spice outline */}
    <path d="M300 120 C340 140 360 180 330 220 C290 200 270 160 300 120 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
    <path d="M300 120 L315 210" stroke="#D4AF37" strokeWidth="1.5" />
    <text x="300" y="70" textAnchor="middle" fill="#FAF8F2" fontFamily="Georgia, serif" fontSize="20" letterSpacing="4">TEA PLANTATIONS & CUISINE</text>
    <text x="300" y="95" textAnchor="middle" fill="#D4AF37" fontFamily="sans-serif" fontSize="11" letterSpacing="3">HIGHLAND ESCAPES</text>
  </svg>
);

export default function KeralamTrad({
  block1Image,
  block2Image,
  block3Image,
  onExploreClick,
  headingText = "Experience the timeless traditions of",
  headingHighlight = "Kerala"
}) {

  // Framer Motion Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <section className="keralam-tradition-section" id="kerala-tradition" aria-label="Kerala Tradition and Cultural Heritage">
      {/* Decorative Organic Leaf & Pattern Background */}
      <div className="kt-bg-decorations" aria-hidden="true">
        <div className="kt-bg-pattern" />
        <BananaLeafSVG className="kt-leaf-svg kt-leaf-top-left" />
        <BananaLeafSVG className="kt-leaf-svg kt-leaf-bottom-right" />
        <LotusOutlineSVG className="kt-leaf-svg" style={{ top: '35%', right: '4%', width: '220px', height: '220px', opacity: 0.04 }} />
        
        {/* Subtle Golden Floating Ambient Dots */}
        <div className="kt-golden-dot" style={{ top: '15%', left: '8%', width: '6px', height: '6px', opacity: 0.6 }} />
        <div className="kt-golden-dot" style={{ top: '48%', left: '92%', width: '8px', height: '8px', opacity: 0.5 }} />
        <div className="kt-golden-dot" style={{ top: '82%', left: '5%', width: '5px', height: '5px', opacity: 0.7 }} />
        <div className="kt-golden-dot" style={{ top: '68%', left: '85%', width: '7px', height: '7px', opacity: 0.4 }} />
      </div>

      <div className="kt-container">
        {/* Section Main Header */}
        <motion.header 
          className="kt-header-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
        >
          <div className="kt-subtitle-badge">
            <span className="kt-badge-dot" />
            Cultural Heritage & Living Legacy
            <span className="kt-badge-dot" />
          </div>

          <h2 className="kt-main-heading">
            {headingText}{' '}
            <span className="kt-highlight-green">{headingHighlight}</span>
            <span className="kt-heading-underline" />
          </h2>

          <p className="kt-header-desc">
            Step into God’s Own Country—a sanctuary of ancient dance rituals, tranquil waterways, holistic healing, and warm, unhurried hospitality woven seamlessly across centuries.
          </p>

          <TraditionalMotifSVG />
        </motion.header>

        {/* Editorial Alternating Blocks Container */}
        <div className="kt-blocks-wrapper">
          
          {/* ==========================================
              BLOCK 1: Classical Arts & Sacred Rituals
              Layout: Text Left, Image Right
             ========================================== */}
          <article className="kt-editorial-block">
            {/* Text Side (Left) */}
            <motion.div 
              className="kt-text-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
            >
              <span className="kt-block-tag">Sacred Traditions • Classical Performing Arts</span>
              <h3 className="kt-block-title">Sacred Rhythms, Classical Grace & Ancient Valor</h3>
              
              <p className="kt-paragraph">
                Kerala’s soul resonates in its sacred performing arts, where myth, devotion, and theatrical splendor converge. Under the canopy of rustling <strong>coconut groves</strong>, the hypnotic beat of traditional drums signals the start of <strong>Kathakali</strong>—where grand face-painted masters bring ancient epics to life purely through expressive eyes and intricate mudras.
              </p>

              <p className="kt-paragraph">
                In contrast, <strong>Mohiniyattam</strong> captivates with the gentle, fluid movement of dancers in ivory and gold, evoking the swaying palms. As twilight sets upon ancient temple courtyards during vibrant <strong>temple festivals</strong>, the divine trance of <strong>Theyyam</strong> ignites the night with fiery headdresses, while practitioners of <strong>Kalaripayattu</strong>—one of the world’s oldest martial arts—demonstrate effortless power, balance, and sacred discipline.
              </p>

              <div className="kt-heritage-tags">
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Kathakali</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Mohiniyattam</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Theyyam</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Kalaripayattu</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Temple Festivals</span>
              </div>
            </motion.div>

            {/* Image Side (Right) */}
            <motion.div 
              className="kt-image-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariant}
            >
              <div className="kt-gradient-glow" />
              <motion.div className="kt-image-card" animate={floatingAnimation}>
                <div className="kt-image-inner">
                  {block1Image ? (
                    <img 
                      src={block1Image} 
                      alt="Kerala Kathakali and Classical Heritage Art" 
                      className="kt-img" 
                      loading="lazy" 
                    />
                  ) : (
                    <DefaultKathakaliArt />
                  )}
                  <div className="kt-image-overlay" />
                  <div className="kt-image-caption">
                    <h4 className="kt-caption-title">The Sacred Stage</h4>
                    <p className="kt-caption-sub">Kathakali & Sacred Ritual Arts</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </article>

          {/* ==========================================
              BLOCK 2: Backwaters & Ayurveda Healing
              Layout: Image Left, Text Right (Alternating)
             ========================================== */}
          <article className="kt-editorial-block kt-reverse">
            {/* Image Side (Left on Desktop) */}
            <motion.div 
              className="kt-image-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariant}
            >
              <div className="kt-gradient-glow" />
              <motion.div className="kt-image-card" animate={floatingAnimation}>
                <div className="kt-image-inner">
                  {block2Image ? (
                    <img 
                      src={block2Image} 
                      alt="Traditional Houseboats and Kerala Backwaters" 
                      className="kt-img" 
                      loading="lazy" 
                    />
                  ) : (
                    <DefaultHouseboatArt />
                  )}
                  <div className="kt-image-overlay" />
                  <div className="kt-image-caption">
                    <h4 className="kt-caption-title">Emerald Lagoons</h4>
                    <p className="kt-caption-sub">Kettuvallam & Traditional Healing</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text Side (Right on Desktop) */}
            <motion.div 
              className="kt-text-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
            >
              <span className="kt-block-tag">Emerald Waterways • Holism & Harmony</span>
              <h3 className="kt-block-title">Serene Backwaters, Ancient Healing & Coastal Rhythms</h3>

              <p className="kt-paragraph">
                Life in Kerala moves to the gentle cadence of water. Boarding handcrafted <strong>traditional houseboats</strong> (Kettuvallam) built without a single nail, you drift along labyrinthine canals where authentic <strong>village life</strong> unfolds naturally along the banks—children walking to school by canoe, fishermen casting nets, and golden reflection on tranquil lagoons.
              </p>

              <p className="kt-paragraph">
                During festive harvest seasons, these serene waters turn electric with the legendary <strong>Snake Boat Race</strong> (Vallam Kali), where hundreds of oarsmen row in synchronized passion. Away from the water’s edge, authentic sanctuaries of <strong>Ayurveda</strong> offer centuries-tested herbal therapies, warm medicated oils, and holistic wellness rituals tailored to restore harmony between body, mind, and spirit.
              </p>

              <div className="kt-heritage-tags">
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Traditional Houseboats</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Snake Boat Race</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Ayurveda</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Village Life</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Coconut Groves</span>
              </div>
            </motion.div>
          </article>

          {/* ==========================================
              BLOCK 3: Tea Plantations, Cuisine & Hospitality
              Layout: Text Left, Image Right
             ========================================== */}
          <article className="kt-editorial-block">
            {/* Text Side (Left) */}
            <motion.div 
              className="kt-text-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
            >
              <span className="kt-block-tag">Highland Escapes • Culinary Heritage</span>
              <h3 className="kt-block-title">Misty Tea Plantations, Culinary Spice & Heartfelt Warmth</h3>

              <p className="kt-paragraph">
                Ascending from coastal palm groves into the Western Ghats, mist-clad emerald <strong>tea plantations</strong> carpet rolling hills as far as the eye can see. The crisp mountain air carries the subtle fragrance of green leaves, cardamom, and wild mountain blossoms, inviting quiet morning walks through historic tea estates.
              </p>

              <p className="kt-paragraph">
                Down in coastal and inland kitchens, Kerala’s rich <strong>local cuisine</strong> takes center stage—an aromatic feast served on fresh green banana leaves. Rich coconut gravies, freshly harvested spices, and traditional recipes pass down through generations. Bound together by deep-rooted <strong>hospitality</strong>, every guest is welcomed with sincere warmth as family into a timeless heritage home.
              </p>

              <div className="kt-heritage-tags">
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Tea Plantations</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Local Cuisine</span>
                <span className="kt-tag-pill"><span className="kt-tag-icon" />Warm Hospitality</span>
              </div>
            </motion.div>

            {/* Image Side (Right) */}
            <motion.div 
              className="kt-image-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageVariant}
            >
              <div className="kt-gradient-glow" />
              <motion.div className="kt-image-card" animate={floatingAnimation}>
                <div className="kt-image-inner">
                  {block3Image ? (
                    <img 
                      src={block3Image} 
                      alt="Kerala Tea Plantations and Culinary Heritage" 
                      className="kt-img" 
                      loading="lazy" 
                    />
                  ) : (
                    <DefaultTeaPlantationArt />
                  )}
                  <div className="kt-image-overlay" />
                  <div className="kt-image-caption">
                    <h4 className="kt-caption-title">Misty Heights</h4>
                    <p className="kt-caption-sub">Tea Gardens & Culinary Arts</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </article>

        </div>

        {/* Editorial Quote Strip */}
        <motion.div 
          className="kt-quote-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpVariant}
        >
          <div className="kt-quote-pattern" />
          <div className="kt-quote-icon">“</div>
          <blockquote className="kt-quote-text">
            Kerala does not merely reveal a destination; it whispers ancient rhythms of sacred temple drums, serene waters, and warm smiles that echo forever in your heart.
          </blockquote>
          <div className="kt-quote-author">— Pranara Heritage Collection</div>
        </motion.div>

        {/* Call to Action Button Block */}
        <motion.div 
          className="kt-cta-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariant}
        >
          <a 
            href="#booking" 
            onClick={onExploreClick}
            className="kt-cta-button"
            aria-label="Explore Kerala Heritage Tours"
          >
            <span>Explore Kerala Heritage</span>
            <span className="kt-arrow-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
