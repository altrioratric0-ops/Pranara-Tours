import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SeasonalOffer from './components/SeasonalOffer';
import Features from './components/Features';
import EscapeSection from './components/EscapeSection';
import LocalHeritage from './components/LocalHeritage';
import CreativeGallery from './components/CreativeGallery';
import SubGallery from './components/SubGallery';
import Testimonials from './components/Testimonials';

import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Footer from './components/Footer';
import TourDetail from './components/TourDetail';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import SEO from './components/SEO';
import NotFoundPage from './components/NotFoundPage';

const API_BASE = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL || 'https://pranara-tours.onrender.com')
  : '';

function HomePage() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.pranaramunnar.com/#organization",
        "name": "Pranara Travel Co.",
        "alternateName": "Prana Munnar",
        "url": "https://www.pranaramunnar.com",
        "logo": "https://www.pranaramunnar.com/assets/logo.png",
        "image": "https://www.pranaramunnar.com/assets/insta_resort.png",
        "description": "Premium Kerala travel planner specializing in customized tour packages for Munnar, Kolukkumalai jeep safari, Alleppey backwater houseboats, Thekkady, and Wayanad.",
        "telephone": "+91-6374502007",
        "email": "pranara@travel.com",
        "priceRange": "₹₹",
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Munnar" },
          { "@type": "AdministrativeArea", "name": "Alleppey" },
          { "@type": "AdministrativeArea", "name": "Thekkady" },
          { "@type": "AdministrativeArea", "name": "Wayanad" },
          { "@type": "AdministrativeArea", "name": "Kerala" }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Munnar",
          "addressLocality": "Munnar",
          "addressRegion": "Kerala",
          "postalCode": "685612",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.0616615,
          "longitude": 77.0129831
        },
        "sameAs": [
          "https://www.instagram.com/pranara_co",
          "https://wa.me/916374502007"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.pranaramunnar.com/#website",
        "url": "https://www.pranaramunnar.com",
        "name": "Pranara Travel Co. | Prana Munnar",
        "publisher": {
          "@id": "https://www.pranaramunnar.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Pranara | Premium Kerala & Munnar Tour Packages | Customized Travel Planner"
        description="Plan your dream Kerala vacation with Prana Munnar. Handcrafted tour packages for Munnar tea hills, Kolukkumalai sunrise jeep safari, Alleppey backwater houseboats, and Wayanad."
        canonical="https://www.pranaramunnar.com/"
        jsonLd={homeSchema}
      />
      <Hero />
      <About />
      <SeasonalOffer />
      <Features />
      <EscapeSection />
      <LocalHeritage />
      <CreativeGallery />
      <Testimonials />
      <FAQ />
      <Booking />
    </>
  );
}

const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
};

function AuthPage({ mode }) {
  const navigate = useNavigate();

  // Common UI State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up inputs
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Email verification flow
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.error("Firebase Google sign-in error:", err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error("Firebase login error:", err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      navigate('/');
    } catch (err) {
      console.error("Firebase signup error:", err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-page-shell">
      <SEO
        title={mode === 'signin' ? 'Sign Up | Pranara Travel Co.' : 'Login | Pranara Travel Co.'}
        description="Access your Pranara Travel account to manage bookings and customized Kerala tour packages."
        noindex={true}
      />
      <div className="auth-card">
        <Link to="/" className="auth-back-link">← Back Home</Link>
        {pendingVerification ? (
          <>
            <h2>Verify your Email</h2>
            <p>Please enter the verification code sent to {email}.</p>
            <form className="auth-form" onSubmit={handleVerifySubmit}>
              <input 
                type="text" 
                placeholder="Verification Code" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: '4px 0' }}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>
          </>
        ) : mode === 'signin' ? (
          <>
            <h2>Create Account</h2>
            <p>Start your Kerala journey with us.</p>
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: '4px 0' }}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', gap: '8px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#334155',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <h2>Welcome Back</h2>
            <p>Log in to continue your travel plans.</p>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <div className="auth-extra-row">
                <label><input type="checkbox" /> Remember Me</label>
                <a href="#">Forgot Password?</a>
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: '4px 0' }}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', gap: '8px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#334155',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </>
        )
      }
      </div>
    </div>
  );
}



function App() {
  const location = useLocation();

  useEffect(() => {
    const sessionCounted = sessionStorage.getItem('pranara_session_counted');
    if (!sessionCounted) {
      sessionStorage.setItem('pranara_session_counted', 'true');
      fetch(`${API_BASE}/api/visits`, { method: 'POST' })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (data && typeof data.count === 'number') {
            localStorage.setItem('pranara_visitor_count', data.count.toString());
            window.dispatchEvent(new CustomEvent('pranaraVisitorCountUpdated', { detail: data.count }));
          }
        })
        .catch(err => {
          console.warn('Visitor counter offline:', err.message);
        });
    } else {
      fetch(`${API_BASE}/api/visits`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (data && typeof data.count === 'number') {
            localStorage.setItem('pranara_visitor_count', data.count.toString());
            window.dispatchEvent(new CustomEvent('pranaraVisitorCountUpdated', { detail: data.count }));
          }
        })
        .catch(err => {
          console.warn('Visitor counter offline:', err.message);
        });
    }
  }, []);

  // Ensure browser moves to Home section automatically on page refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/gallery/:categoryId" element={<SubGallery />} />
        <Route path="/tour/:id" element={<TourDetail />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      {/* Floating WhatsApp Logo */}
      <a
        href={`https://wa.me/916374502007?text=${encodeURIComponent('Hello Pranara! I would like to inquire about your Kerala tour packages and customized itineraries. Please share details and pricing.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="whatsapp-icon" width="30" height="30">
          <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.117-2.887-6.983A9.782 9.782 0 0 0 12.008 1.83C6.57 1.83 2.148 6.254 2.144 11.696c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.728-.977zm11.367-6.625c-.328-.164-1.94-.959-2.242-1.07-.301-.11-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-1.68-.838-2.798-1.488-3.916-3.407-.294-.507.294-.47.842-.989.155-.147.228-.246.34-.469.113-.223.056-.419-.028-.583-.084-.164-.739-1.78-.999-2.41-.253-.61-.51-.527-.7-.537-.179-.009-.384-.01-.589-.01a1.135 1.135 0 0 0-.822.384c-.282.31-1.078 1.054-1.078 2.57 0 1.517 1.103 2.983 1.258 3.192.155.209 2.17 3.313 5.257 4.646.734.317 1.308.507 1.753.648.738.235 1.41.202 1.94.123.59-.088 1.94-.794 2.215-1.562.275-.768.275-1.426.192-1.562-.083-.137-.301-.219-.63-.383z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
