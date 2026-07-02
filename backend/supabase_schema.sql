-- ============================================================
-- Pranara Tours - Supabase Schema & Seed Data (Kerala Redesign)
-- ============================================================
-- Run this in your Supabase SQL Editor

-- 1. TOURS TABLE
CREATE TABLE IF NOT EXISTS tours (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT,
  tag TEXT,
  featured BOOLEAN DEFAULT false,
  itinerary TEXT[] DEFAULT '{}',
  includes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  avatar_initials TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  quote TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  tour TEXT,
  people TEXT DEFAULT '2',
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  source TEXT DEFAULT 'manual',
  instagram_url TEXT,
  instagram_post_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS destinations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  best_season TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ATTRACTIONS TABLE
CREATE TABLE IF NOT EXISTS attractions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  destination TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read attractions" ON attractions FOR SELECT USING (true);

-- Public insert policies
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Seed Tours
INSERT INTO tours (title, description, price, duration, tag, featured, image_url) VALUES
  ('Munnar 2 Days 1 Night', 'A quick escape to the misty tea gardens, viewpoints, and waterfalls of Munnar. Perfect for weekend travelers.', 4999, '2 Days 1 Night', 'Weekend Gateway', true, 'https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=800&q=80'),
  ('Munnar + Thekkady', 'Explore the rolling hills of Munnar combined with wildlife safari, spice plantation tours, and boating in Thekkady.', 7999, '3 Days 2 Nights', 'Popular', true, 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80'),
  ('Munnar + Alleppey', 'The quintessential Kerala tour. Walk the misty hills of Munnar and stay overnight in a premium houseboat on Alleppey''s backwaters.', 11999, '4 Days 3 Nights', 'Trending', true, 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80'),
  ('Complete Kerala Tour', 'A comprehensive journey covering Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and the stunning beaches of Varkala and Kovalam.', 24999, '7 Days 6 Nights', 'Best Value', true, 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80');

-- Seed Testimonials
INSERT INTO testimonials (name, location, avatar_initials, rating, quote) VALUES
  ('Arjun & Sneha', 'Bangalore', 'AS', 5, 'Our Munnar honeymoon was perfectly organized. Every detail from the luxury resort stay to the private guides was handled flawlessly. Highly recommend Pranara!'),
  ('Priya & Family', 'Chennai', 'PF', 5, 'The itinerary covered every beautiful place without feeling rushed. The houseboat in Alleppey and the tea estate walks in Munnar were outstanding highlights!'),
  ('Vikram S.', 'Mumbai', 'VS', 5, 'Excellent hotels, smooth transport, and amazing support. The 24/7 travel coordination was incredibly comforting during our Poovar and Kovalam trip.');

-- Seed Gallery
INSERT INTO gallery (image_url, caption, source) VALUES
  ('https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=800&q=80', 'Lush Tea Estates of Munnar', 'manual'),
  ('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80', 'Houseboats in Alleppey Backwaters', 'manual'),
  ('https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80', 'Majestic Athirappilly Waterfalls', 'manual'),
  ('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80', 'Serene Wayanad Hills', 'manual'),
  ('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80', 'Deep Pine Forests of Vagamon', 'manual'),
  ('https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80', 'Periyar Wildlife Sanctuary', 'manual'),
  ('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80', 'Traditional Kerala Cuisine on Banana Leaf', 'manual'),
  ('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', 'Hilltop Campfire and Stargazing', 'manual'),
  ('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80', 'Kolukkumalai Offroad Jeep Ride', 'manual'),
  ('https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80', 'Spectacular Western Ghats Sunrise', 'manual');

-- Seed Destinations
INSERT INTO destinations (name, description, best_season, price, duration, image_url) VALUES
  ('Munnar', 'Lush green tea plantations, misty valleys, and cool mountain air.', 'Sept to May', 4999, '3 Days', 'https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=600&q=80'),
  ('Alleppey', 'Cruising in traditional houseboats along scenic palm-fringed backwaters.', 'Oct to March', 7999, '2 Days', 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80'),
  ('Thekkady', 'Periyar national park wildlife safari and rich spice garden explorations.', 'Oct to April', 5999, '2 Days', 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&q=80'),
  ('Wayanad', 'Waterfalls, ancient caves, tea estates, and wild elephant sightings.', 'Oct to May', 6499, '3 Days', 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80'),
  ('Vagamon', 'Pine forests, green meadows, paragliding, and absolute serenity.', 'Sept to May', 3999, '2 Days', 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80'),
  ('Kochi', 'Historical port town showcasing Portuguese, Dutch, and British history.', 'Oct to April', 2999, '2 Days', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80'),
  ('Kumarakom', 'Vembanad Lake luxury bird watching, houseboat stays, and lagoons.', 'Nov to Feb', 8999, '2 Days', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80'),
  ('Varkala', 'Unique seaside cliffs, golden beaches, and spiritual beach culture.', 'Oct to March', 5499, '3 Days', 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80'),
  ('Kovalam', 'Iconic lighthouse beach, curved bays, and shallow water swimming.', 'Sept to March', 5999, '2 Days', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80'),
  ('Athirappilly', 'The majestic Niagara waterfalls of India set in deep green forests.', 'June to Nov', 3499, '1 Day', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80'),
  ('Poovar', 'Where the lake, river, sea, and beach meet in a beautiful delta.', 'Oct to April', 6999, '2 Days', 'https://images.unsplash.com/photo-1577717903312-2c86c5a9c20e?w=600&q=80'),
  ('Bekal', 'Keyhole-shaped historical fort and pristine untouched Northern beaches.', 'Oct to May', 8499, '2 Days', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80');

-- Seed Experiences
INSERT INTO experiences (title, description) VALUES
  ('Tea Plantation Walk', 'Walk among the lush tea estates of Munnar, learn about the processing, and taste fresh tea.'),
  ('Houseboat Stay', 'Unwind in a luxurious wooden Kettuvallam and drift along Alleppey''s backwaters.'),
  ('Jeep Safari', 'High-altitude off-roading in Kolukkumalai to reach the highest organic tea gardens in the world.'),
  ('Spice Garden Tour', 'Discover cardamom, cinnamon, pepper, and vanilla plants in their natural habitat in Thekkady.'),
  ('Waterfall Trekking', 'Trek through forested streams to hidden waterfalls, safe for swimming and exploring.'),
  ('Wildlife Safari', 'Take a boat cruise or guided trek to spot elephants, bisons, and Nilgiri tahrs in Periyar.'),
  ('Kathakali Show', 'Witness the vibrant and intense classical dance-drama of Kerala performed by local masters.'),
  ('Ayurvedic Spa', 'Indulge in authentic rejuvenating herbal massages and wellness treatments by experts.'),
  ('Bamboo Rafting', 'A tranquil rafting and trekking experience along the reserve lakes of Thekkady and Wayanad.'),
  ('Sunrise Viewpoints', 'Stand above the clouds at Top Station or Kolukkumalai for a golden sunrise.'),
  ('Camping', 'Sleep under the stars on misty hilltops in Munnar or Vagamon with a cozy campfire.'),
  ('Zipline Adventure', 'Fly over lush green valleys and tea gardens on Kerala''s longest zipline courses.');

-- Seed Attractions
INSERT INTO attractions (name, description, destination) VALUES
  ('Kolukkumalai Sunrise', 'Highest tea estate with panoramic sunrise views above the cloud bed.', 'Munnar'),
  ('Mattupetty Dam', 'Beautiful lake with speedboating and nearby green pastures.', 'Munnar'),
  ('Echo Point', 'Natural echo phenomenon along the misty lake shores.', 'Munnar'),
  ('Top Station', 'Highest point in Munnar offering a 360-degree view of Tamil Nadu plains.', 'Munnar'),
  ('Eravikulam National Park', 'Sanctuary for the endangered Nilgiri Tahr mountain goat.', 'Munnar'),
  ('Tea Museum', 'Trace the history and machinery of tea processing in Munnar since the 1880s.', 'Munnar'),
  ('Kundala Lake', 'Pedal boats and Kashmiri-style Shikara boat rides surrounded by hills.', 'Munnar'),
  ('Attukad Waterfalls', 'Roaring waterfall nestled between steep hills and tea estates.', 'Munnar'),
  ('Blossom Park', 'Lush gardens, cycling tracks, and beautiful flower exhibits.', 'Munnar'),
  ('Chinnar Wildlife Sanctuary', 'Dry deciduous scrub forest home to grizzly giant squirrels.', 'Munnar');
