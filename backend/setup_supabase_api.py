"""Create Pranara Tours tables in Supabase using raw SQL via the REST API.
Uses the service-role key endpoint for DDL operations.
"""
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")

# The SQL schema that matches our app.py models
SCHEMA_SQL = """
-- Create tables for Pranara Tours
CREATE TABLE IF NOT EXISTS public.tours (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    duration TEXT NOT NULL,
    tag TEXT,
    featured BOOLEAN DEFAULT false,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    avatar_initials TEXT,
    rating INTEGER DEFAULT 5,
    quote TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id BIGSERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption TEXT,
    source TEXT DEFAULT 'manual',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    tour TEXT,
    people TEXT,
    preferred_date TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.instagram_posts (
    id BIGSERIAL PRIMARY KEY,
    post_url TEXT,
    image_url TEXT,
    caption TEXT,
    likes INTEGER DEFAULT 0,
    posted_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;

-- Allow anon key to read tours, testimonials, gallery, instagram_posts
CREATE POLICY "Allow anon read tours" ON public.tours FOR SELECT USING (true);
CREATE POLICY "Allow anon read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow anon read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow anon read instagram" ON public.instagram_posts FOR SELECT USING (true);

-- Allow anon to insert bookings
CREATE POLICY "Allow anon insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
"""

# Seed data
SEED_TOURS = [
    {"title": "Misty Hills Trek", "description": "A guided trek through Munnar's rolling tea plantations and mist-covered hills. Perfect for nature lovers and photography enthusiasts.", "price": 1499, "duration": "4-5 hrs", "tag": "Popular", "featured": True, "image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=800&q=80"},
    {"title": "Sunrise Valley Expedition", "description": "An early morning expedition to catch the golden sunrise over the valleys of Munnar. Includes tea estate visit and breakfast.", "price": 2499, "duration": "6-7 hrs", "tag": "Trending", "featured": True, "image_url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80"},
    {"title": "Waterfall & Wildlife Trail", "description": "Discover hidden waterfalls and spot exotic birds and wildlife in the lush forests surrounding Munnar.", "price": 1999, "duration": "Full Day", "tag": None, "featured": True, "image_url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80"},
    {"title": "Munnar City & Culture Walk", "description": "Explore Munnar town, spice plantations, local markets, and learn about the rich history and culture of the region.", "price": 1299, "duration": "3-4 hrs", "tag": None, "featured": False, "image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80"},
    {"title": "Tea Estate & Plantation Tour", "description": "Walk through sprawling tea gardens, learn about tea processing, and enjoy freshly brewed tea with panoramic views.", "price": 1799, "duration": "Half Day", "tag": None, "featured": True, "image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80"},
    {"title": "Combo: Hills + Waterfalls", "description": "The ultimate Munnar experience combining misty hill treks and waterfall discovery in one action-packed day.", "price": 2999, "duration": "Full Day", "tag": "Best Value", "featured": True, "image_url": "https://images.unsplash.com/photo-1577717903312-2c86c5a9c20e?w=800&q=80"},
]

SEED_TESTIMONIALS = [
    {"name": "Arjun R.", "location": "Bangalore", "avatar_initials": "AR", "rating": 5, "quote": "An absolutely magical experience! The sunrise trek was breathtaking. Our guide knew all the best spots away from the crowds. Highly recommend Pranara Munnar!"},
    {"name": "Priya M.", "location": "Chennai", "avatar_initials": "PM", "rating": 5, "quote": "The tea plantation walk was the highlight of our Kerala trip. So much history and beauty in every direction. The guide was knowledgeable and friendly."},
    {"name": "Vikram S.", "location": "Mumbai", "avatar_initials": "VS", "rating": 4, "quote": "Great value for money. The combo tour covered everything we wanted to see. The waterfalls were stunning! Would definitely book again."},
    {"name": "Ananya K.", "location": "Delhi", "avatar_initials": "AK", "rating": 5, "quote": "I went solo and felt completely safe and welcomed. The small group size meant we got personal attention. The misty hills trek was out of this world!"},
    {"name": "Rahul P.", "location": "Kochi", "avatar_initials": "RP", "rating": 5, "quote": "As a local, I thought I knew Munnar well, but the guides showed me hidden gems I never knew existed. Truly eye-opening experience."},
]

SEED_GALLERY = [
    {"image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=600&q=80", "caption": "Misty Hills of Munnar", "source": "manual"},
    {"image_url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80", "caption": "Golden Sunrise over Valleys", "source": "manual"},
    {"image_url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80", "caption": "Hidden Waterfall Discovery", "source": "manual"},
    {"image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80", "caption": "Tea Garden Walk", "source": "manual"},
    {"image_url": "https://images.unsplash.com/photo-1577717903312-2c86c5a9c20e?w=600&q=80", "caption": "Adventure Trail", "source": "manual"},
    {"image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80", "caption": "Munnar Landscape", "source": "manual"},
]


def run_sql_via_api(sql: str):
    """Attempt to run SQL via the Supabase REST API."""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    # Try the pg_query endpoint (needs service_role)
    url = f"{SUPABASE_URL}/rest/v1/rpc/pg_query"
    try:
        resp = requests.post(url, json={"query": sql}, headers=headers, timeout=10)
        if resp.status_code == 200:
            print("OK: SQL executed via pg_query")
            return True
        else:
            print(f"pg_query failed: {resp.status_code} {resp.text[:200]}")
    except Exception as e:
        print(f"pg_query error: {e}")
    
    # Try the SQL endpoint
    url2 = f"{SUPABASE_URL}/auth/v1/pg_query"
    try:
        resp = requests.post(url2, json={"query": sql}, headers=headers, timeout=10)
        if resp.status_code == 200:
            print("OK: SQL executed via auth pg_query")
            return True
        else:
            print(f"auth pg_query failed: {resp.status_code} {resp.text[:200]}")
    except Exception as e:
        print(f"auth pg_query error: {e}")
    
    return False


def check_table(table: str) -> bool:
    """Check if a table exists."""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    }
    url = f"{SUPABASE_URL}/rest/v1/{table}?select=id&limit=1"
    resp = requests.get(url, headers=headers, timeout=10)
    return resp.status_code == 200


if __name__ == "__main__":
    # First check what exists
    tables = ["tours", "testimonials", "gallery_images", "bookings", "instagram_posts"]
    existing = [t for t in tables if check_table(t)]
    missing = [t for t in tables if t not in existing]
    
    print(f"Existing tables: {existing}")
    print(f"Missing tables: {missing}")
    
    if missing:
        print("\nTrying to create missing tables via API...")
        # Try to create using supabase client which might have more permissions
        from supabase import create_client
        sb = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        # We can't run CREATE TABLE via anon key, but let's try using raw_sql
        # Actually, let's just try
        if run_sql_via_api(SCHEMA_SQL):
            print("Schema created successfully!")
        else:
            print("\nAPI-based SQL execution failed (expected with anon key).")
            print("Need dashboard access to run SQL.")
    
    # Try to seed if tables exist
    for table, records in [("tours", SEED_TOURS), ("testimonials", SEED_TESTIMONIALS), ("gallery_images", SEED_GALLERY)]:
        if check_table(table):
            from supabase import create_client
            sb = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
            resp = sb.table(table).select("id", count="exact").execute()
            count = resp.count if hasattr(resp, 'count') else len(resp.data) if resp.data else 0
            print(f"\n{table}: {count} rows existing")
            if count == 0:
                print(f"Seeding {table} with {len(records)} records...")
                result = sb.table(table).insert(records).execute()
                if result.data:
                    print(f"  Inserted {len(result.data)} rows")
