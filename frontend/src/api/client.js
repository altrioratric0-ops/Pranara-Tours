/**
 * API client for Pranara Tours backend.
 * All API calls go through this module.
 * Uses Vite proxy in development, direct URL in production.
 */
import axios from 'axios';

// In dev, Vite proxy handles /api -> backend
// In prod, use the env variable or a configurable base URL
const API_BASE = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
  : '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

/* ---------- Tours ---------- */
export const fetchTours = () => api.get('/api/tours').then(r => r.data.data);
export const fetchTour = (id) => api.get(`/api/tours/${id}`).then(r => r.data.data);

/* ---------- Testimonials ---------- */
export const fetchTestimonials = () => api.get('/api/testimonials').then(r => r.data.data);

/* ---------- Gallery ---------- */
export const fetchGallery = () => api.get('/api/gallery').then(r => r.data.data);

/* ---------- Bookings ---------- */
export const submitBooking = (data) => api.post('/api/bookings', data).then(r => r.data);

/* ---------- Contact ---------- */
export const submitContact = (data) => api.post('/api/contact', data).then(r => r.data);

/* ---------- Instagram ---------- */
export const syncInstagram = (profile = 'pranara_co') =>
  api.get(`/api/gallery/instagram/sync?profile=${profile}`).then(r => r.data);

export const getInstagramProfile = (profile = 'pranara_co') =>
  api.get(`/api/instagram/profile?profile=${profile}`).then(r => r.data.data);

export const addInstagramUrls = (urls) =>
  api.post('/api/gallery/instagram/sync', { post_urls: urls }).then(r => r.data);

/* ---------- Health ---------- */
export const checkHealth = () => api.get('/api/health').then(r => r.data.data);
