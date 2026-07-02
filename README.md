PRANARA TOURS - Full-Stack Web Application
===========================================

Tech Stack:
  - Frontend: React 19 + Vite + React Router
  - Backend: Flask (Python 3.11)
  - Database: Supabase (PostgreSQL)
  - Instagram Integration: oEmbed API + web scraping

Setup Instructions
------------------

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials

# Activate venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Run the server
python app.py
# or: gunicorn app:app
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor and paste the contents of `backend/supabase_schema.sql`
3. Run the SQL to create tables and seed data
4. Copy your project URL and anon key to `.env`

### 4. Instagram Integration

The app supports two methods for Instagram:

**Method 1: Manual URL entry (admin API)**
```
POST /api/gallery/instagram/sync
Body: { "post_urls": ["https://www.instagram.com/p/..."] }
```

**Method 2: Profile scraping (for public profiles)**
```
GET /api/gallery/instagram/sync?profile=pranara_co
```

**Method 3: Instagram Feed Embed**
Visit `/instagram` route to see the Instagram feed embed from the profile.

API Endpoints
-------------

GET    /api/tours           - List all tours
GET    /api/tours/<id>      - Get tour details
POST   /api/bookings        - Submit a booking
GET    /api/bookings        - List bookings (admin)
GET    /api/testimonials    - List testimonials
GET    /api/gallery         - List gallery images
POST   /api/contact         - Submit contact form
GET    /api/instagram/sync?profile=pranara_co - Sync Instagram posts
POST   /api/gallery/instagram/sync - Add Instagram post URLs
GET    /api/health          - Health check
