-- ============================================================
-- Pranara Tours - Full Schema Upgrade
-- Drops existing simple tables and recreates with full schema
-- matching the in-memory fallback data in app.py
-- ============================================================

-- Drop ALL existing policies FIRST (tables must exist for this)
DROP POLICY IF EXISTS "Public read tours" ON tours;
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Public read destinations" ON destinations;
DROP POLICY IF EXISTS "Public read experiences" ON experiences;
DROP POLICY IF EXISTS "Public read attractions" ON attractions;
DROP POLICY IF EXISTS "Public insert bookings" ON bookings;
DROP POLICY IF EXISTS "Public insert contact" ON contact_messages;

-- Now drop existing tables
DROP TABLE IF EXISTS attractions, experiences, destinations, gallery, contact_messages, bookings, testimonials, tours CASCADE;

-- 1. TOURS TABLE (full schema)
CREATE TABLE tours (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  tag TEXT,
  category TEXT DEFAULT 'Experience',
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  rating NUMERIC(3,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  max_people INTEGER DEFAULT 10,
  difficulty TEXT DEFAULT 'Easy',
  meeting_point TEXT,
  cancellation TEXT,
  highlights TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TESTIMONIALS TABLE
CREATE TABLE testimonials (
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
CREATE TABLE bookings (
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
CREATE TABLE gallery (
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
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DESTINATIONS TABLE
CREATE TABLE destinations (
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
CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ATTRACTIONS TABLE
CREATE TABLE attractions (
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
-- SEED DATA — Full 9 Packages
-- ============================================================

INSERT INTO tours (id, title, subtitle, description, price, duration, tag, featured, category, image_url, rating, reviews, max_people, difficulty, meeting_point, cancellation, highlights, itinerary, inclusions, exclusions, faqs)
VALUES
(1, 'Munnar 2 Days 1 Night', 'Weekend Gateway to the Misty Hills',
  'A quick escape to the misty tea gardens, viewpoints, and waterfalls of Munnar. Perfect for weekend travelers seeking tranquility and breathtaking landscapes.',
  4999, '2 Days 1 Night', 'Weekend Gateway', true, 'Experience',
  '/assets/tour_munnar.png', 4.8, 124, 6, 'Easy',
  'Munnar Bus Stand / Kochi Airport',
  'Free cancellation up to 48 hours before the trip',
  ARRAY['Visit to top viewpoints — Echo Point, Mattupetty Dam & Kundala Lake', 'Guided walk through tea plantations with a plantation expert', 'Sunrise at Kolukkumalai — highest tea estate in the world', 'Visit to Eravikulam National Park (home of Nilgiri Tahr)', 'Traditional Kerala lunch at a local homestay', 'Photography session at scenic waterfalls and valleys'],
  '[{"day": 1, "title": "Arrival & Munnar Exploration", "description": "Pickup from Munnar bus stand or Kochi airport. Check into a scenic resort surrounded by tea gardens. Visit to Echo Point, Mattupetty Dam, and Kundala Lake. Enjoy a guided walk through the tea plantations. Evening free for leisure or shopping at the local market. Dinner and overnight at the resort."}, {"day": 2, "title": "Sunrise & Departure", "description": "Early morning visit to Kolukkumalai for sunrise. Breakfast at the resort. Visit to Eravikulam National Park. Traditional Kerala lunch at a homestay. Departure by evening."}]',
  ARRAY['1 night at a premium resort with valley view', 'All breakfast meals', 'Private AC vehicle for sightseeing', 'Experienced local guide for plantation walk', 'All parking, tolls, and driver expenses'],
  ARRAY['Entry fees to parks and viewpoints', 'Lunch meals', 'Personal expenses and shopping', 'Tips and gratuities'],
  '[{"q": "Is this suitable for solo travelers?", "a": "Absolutely! Many solo travelers join this tour. Single occupancy supplement may apply."}, {"q": "What should I pack?", "a": "Light woolens (temperature drops to 10°C), walking shoes, sunscreen, and a raincoat."}, {"q": "Can I extend the trip?", "a": "Yes, you can add extra days or combine with Thekkady or Alleppey. Ask our team for custom packages."}]'
),
(2, 'Munnar + Thekkady', 'Hills & Wildlife Combo',
  'Explore the rolling hills of Munnar combined with wildlife safari, spice plantation tours, and boating in Thekkady. A perfect blend of nature and adventure.',
  7999, '3 Days 2 Nights', 'Popular', true, 'Adventures',
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80', 4.7, 98, 8, 'Moderate',
  'Kochi Airport / Railway Station',
  'Free cancellation up to 48 hours before the trip',
  ARRAY['Guided trek through Periyar Wildlife Sanctuary', 'Spice plantation tour with tasting session', 'Boat cruise on Periyar Lake to spot wildlife', 'Visit to the largest spice market in Kerala', 'Tea garden walk in Munnar', 'Elephant ride and bamboo rafting (optional)'],
  '[{"day": 1, "title": "Munnar Exploration", "description": "Pickup from Kochi. Drive to Munnar (4 hours). Visit tea plantations, Mattupetty Dam, and Echo Point. Check into resort. Evening walk through the tea gardens."}, {"day": 2, "title": "Travel to Thekkady", "description": "Breakfast and drive to Thekkady (2 hours). Check into hotel. Spice plantation tour. Afternoon boat cruise on Periyar Lake. Evening Kathakali performance."}, {"day": 3, "title": "Wildlife & Departure", "description": "Early morning guided trek in Periyar Wildlife Sanctuary. Breakfast. Visit spice market. Depart to Kochi."}]',
  ARRAY['2 nights accommodation (1 in Munnar, 1 in Thekkady)', 'All breakfast meals', 'Private AC vehicle throughout', 'Spice plantation tour with guide', 'Periyar Lake boat cruise', 'Wildlife trek with forest guide'],
  ARRAY['Entry fees to Eravikulam National Park', 'Elephant ride fees', 'Lunch and dinner meals', 'Personal expenses'],
  '[{"q": "Is the wildlife trek safe?", "a": "Absolutely. You will be accompanied by experienced forest guides. The trek is moderate and suitable for beginners."}, {"q": "Best time for wildlife spotting?", "a": "October to March is ideal. Early morning boat cruises offer the best sightings of elephants, bisons, and deer."}]'
),
(3, 'Munnar + Alleppey', 'Hills & Backwaters',
  'The quintessential Kerala tour. Walk the misty hills of Munnar and stay overnight in a premium houseboat on Alleppey serene backwaters.',
  11999, '4 Days 3 Nights', 'Trending', true, 'Experience',
  'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80', 4.9, 156, 10, 'Easy',
  'Kochi Airport / Railway Station',
  'Free cancellation up to 72 hours before the trip',
  ARRAY['Overnight houseboat cruise on Alleppey backwaters', 'Sunset over Vembanad Lake with complimentary beverages', 'Guided Munnar tea plantation walk', 'Traditional Kerala lunch on the houseboat', 'Visit to Kumarakom bird sanctuary', 'Candlelight dinner on the houseboat deck'],
  '[{"day": 1, "title": "Arrival & Munnar", "description": "Pickup from Kochi. Drive to Munnar. Afternoon visit to tea plantations and viewpoints. Overnight at Munnar resort."}, {"day": 2, "title": "Munnar Sightseeing", "description": "Sunrise at Top Station. Visit Eravikulam National Park and Mattupetty Dam. Evening drive to Alleppey (4 hours). Board the houseboat."}, {"day": 3, "title": "Houseboat Cruise", "description": "Full day cruising the backwaters. Village visits, canal navigation, and sunset onboard. Candlelight dinner."}, {"day": 4, "title": "Departure", "description": "Breakfast on the houseboat. Disembark by 9 AM. Drop-off at Kochi."}]',
  ARRAY['2 nights in Munnar premium resort', '1 night in luxury houseboat (AC)', 'All meals on houseboat', 'All breakfast at resort', 'Private AC vehicle', 'Candlelight dinner setup'],
  ARRAY['Entry fees to national parks', 'Lunch meals at resort days', 'Alcoholic beverages on houseboat', 'Personal expenses'],
  '[{"q": "Is the houseboat private?", "a": "Yes, the houseboat is exclusively for your group, regardless of size."}, {"q": "Can we customize the menu on the houseboat?", "a": "Absolutely. Inform us of dietary preferences at booking and the chef will prepare accordingly."}]'
),
(4, 'Complete Kerala Tour', 'The Grand Kerala Experience',
  'A comprehensive journey covering Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and the stunning beaches of Varkala and Kovalam.',
  24999, '7 Days 6 Nights', 'Best Value', true, 'Experience',
  'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80', 4.9, 203, 10, 'Moderate',
  'Kochi Airport / Trivandrum Airport',
  'Free cancellation up to 7 days before the trip',
  ARRAY['Munnar tea gardens and viewpoints', 'Thekkady wildlife safari', 'Alleppey overnight houseboat cruise', 'Kovalam beach stay', 'Varkala cliff walk and sunset', 'Kathakali performance', 'Spice plantation tour'],
  '[{"day": 1, "title": "Arrival in Kochi → Munnar", "description": "Pickup from Kochi. Drive to Munnar. Evening tea garden walk."}, {"day": 2, "title": "Munnar", "description": "Full day Munnar sightseeing."}, {"day": 3, "title": "Munnar → Thekkady", "description": "Drive to Thekkady. Spice tour. Boat cruise."}, {"day": 4, "title": "Thekkady → Alleppey", "description": "Wildlife trek. Drive to Alleppey. Houseboat."}, {"day": 5, "title": "Alleppey → Varkala", "description": "Disembark. Drive to Varkala. Cliff sunset."}, {"day": 6, "title": "Varkala → Kovalam", "description": "Beach day. Drive to Kovalam."}, {"day": 7, "title": "Departure", "description": "Breakfast. Drop at Trivandrum airport."}]',
  ARRAY['6 nights accommodation (various properties)', 'Daily breakfast', '1 night houseboat with all meals', 'Private AC vehicle with driver', 'All inter-city transfers', 'English-speaking guide'],
  ARRAY['Flight/train tickets', 'Entry fees to monuments and parks', 'Lunch and dinner (except houseboat)', 'Personal expenses and tips'],
  '[{"q": "Can we start from Trivandrum instead of Kochi?", "a": "Yes, the itinerary can be reversed to start from Trivandrum."}, {"q": "Is this suitable for families with kids?", "a": "Yes, the pace is comfortable and activities are family-friendly."}]'
),
(5, 'Wayanad 2 Days 1 Night', 'Escape to Nature',
  'Escape to Wayanad lush green landscapes, ancient Edakkal caves, stunning waterfalls like Meenmutty and Soochipara, and spot wild elephants at Muthanga Wildlife Sanctuary.',
  5499, '2 Days 1 Night', 'New', true, 'Adventures',
  'https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=800&q=80', 4.6, 87, 8, 'Moderate',
  'Calicut Airport / Kozhikode Railway Station',
  'Free cancellation up to 48 hours before the trip',
  ARRAY['Trek to Meenmutty Waterfalls — one of the tallest falls in Kerala', 'Visit to Edakkal Caves with 6000-year-old petroglyphs', 'Jeep safari at Muthanga Wildlife Sanctuary', 'Walk through Pookode Lake and surrounding gardens', 'Spice plantation tour with organic lunch', 'Sunset at Lakkidi View Point'],
  '[{"day": 1, "title": "Arrival & Exploration", "description": "Pickup from Calicut. Drive to Wayanad. Visit Edakkal Caves and Pookode Lake. Spice plantation walk. Overnight at resort."}, {"day": 2, "title": "Waterfalls & Departure", "description": "Morning trek to Meenmutty Waterfalls. Visit Muthanga Wildlife Sanctuary. Depart by evening."}]',
  ARRAY['1 night at a nature resort', 'All breakfast meals', 'Private AC vehicle', 'Guide for Edakkal Caves trek', 'All parking and tolls'],
  ARRAY['Entry fees to waterfalls and sanctuary', 'Jeep safari charges', 'Lunch and dinner', 'Personal expenses'],
  '[{"q": "Is the trek to Meenmutty difficult?", "a": "The trek is moderate — about 2 km through forest terrain. Comfortable walking shoes are recommended."}, {"q": "What is the best time to visit Wayanad?", "a": "October to May is ideal. The monsoons (June-September) make waterfalls magnificent but forest treks may be restricted."}]'
),
(7, 'Vagamon Weekend Getaway', 'Serenity in the Pine Forests',
  'Unwind in Vagamon pristine pine forests, rolling green meadows, and misty hills. Perfect for a quiet weekend surrounded by nature far from the crowds.',
  3999, '2 Days 1 Night', 'Budget Friendly', false, 'Off Road',
  'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80', 4.5, 62, 6, 'Easy',
  'Kottayam Railway Station / Kochi Airport',
  'Free cancellation up to 24 hours before the trip',
  ARRAY['Walk through the famous Vagamon Pine Forest', 'Visit to Kurisumala Cross with 360-degree valley views', 'Paragliding over the green meadows (optional)', 'Explore the Thangal Para viewpoint', 'Tea estate visit in nearby areas', 'Campfire and stargazing at the resort'],
  '[{"day": 1, "title": "Arrival & Vagamon Exploring", "description": "Pickup from Kottayam. Drive to Vagamon. Visit the Pine Forest and Thangal Para. Check into meadow-view resort. Evening campfire."}, {"day": 2, "title": "Adventure & Departure", "description": "Morning paragliding session (optional). Visit Kurisumala Cross. Tea estate walk. Departure."}]',
  ARRAY['1 night at a meadow-view resort', 'All breakfast meals', 'Private AC vehicle', 'Campfire arrangement', 'Guide for sightseeing'],
  ARRAY['Paragliding charges', 'Lunch and dinner', 'Entry fees', 'Personal expenses'],
  '[{"q": "Is paragliding safe?", "a": "Yes, experienced instructors and proper safety gear are provided. Suitable for beginners."}, {"q": "Can I visit Vagamon in monsoon?", "a": "Yes, Vagamon is beautiful in monsoon but paragliding may not operate during heavy rain."}]'
),
(8, 'Kovalam Beach Holiday', 'Sun, Sand & Ayurveda',
  'Relax on Kovalam iconic crescent beaches — Lighthouse Beach, Hawah Beach, and Samudra Beach. Combine sunbathing with Ayurvedic spa treatments and seafood dinners.',
  6999, '3 Days 2 Nights', 'Trending', true, 'Meditation',
  'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80', 4.7, 143, 8, 'Easy',
  'Trivandrum Airport / Railway Station',
  'Free cancellation up to 48 hours before the trip',
  ARRAY['Sunrise walk along Lighthouse Beach', 'Visit to Hawah Beach and Samudra Beach', 'Ayurvedic massage session (1 hr)', 'Visit to Vizhinjam Fishing Harbour', 'Seafood dinner at beachfront shack', 'Evening Kathakali performance at Kovalam'],
  '[{"day": 1, "title": "Arrival & Beach Time", "description": "Pickup from Trivandrum. Check into beach resort. Afternoon at Lighthouse Beach. Evening beach walk and seafood dinner."}, {"day": 2, "title": "Ayurveda & Culture", "description": "Morning Ayurvedic massage session. Visit Vizhinjam Harbour. Afternoon at Hawah Beach. Evening Kathakali show."}, {"day": 3, "title": "Departure", "description": "Morning swim. Breakfast. Drop at Trivandrum airport."}]',
  ARRAY['2 nights at a beachfront resort', 'All breakfast meals', 'Private AC vehicle', '1 Ayurvedic massage session per person', 'Kathakali show tickets', 'Airport transfers'],
  ARRAY['Lunch and dinner', 'Seafood dinners at shacks', 'Personal expenses', 'Tips'],
  '[{"q": "Is the beach safe for swimming?", "a": "Lighthouse Beach has lifeguards and designated swimming areas. Samudra Beach is more secluded."}, {"q": "Are Ayurvedic treatments safe?", "a": "All sessions are conducted by certified therapists using authentic Kerala oils and herbs."}]'
),
(10, 'Kerala North Explorer', 'Untamed Beauty of North Kerala',
  'Explore the untouched beauty of North Kerala — Bekal Fort, pristine beaches of Kasaragod, Theyyam performances, and serene backwaters of Valiyaparamba.',
  14999, '4 Days 3 Nights', 'Adventure', true, 'Off Road',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', 4.6, 71, 8, 'Moderate',
  'Kannur Airport / Mangalore Airport',
  'Free cancellation up to 72 hours before the trip',
  ARRAY['Guided tour of the iconic Bekal Fort with sunset views', 'Theyyam ritual performance — a 2000-year-old art form', 'Houseboat cruise through Valiyaparamba backwaters', 'Visit to Kappil Beach and Chandragiri Fort', 'Spice plantation walk in Kannur', 'Traditional Kerala sadhya lunch at a local home'],
  '[{"day": 1, "title": "Arrival & Bekal", "description": "Pickup from Kannur. Drive to Bekal. Visit Bekal Fort at sunset. Check into beach resort."}, {"day": 2, "title": "Theyyam & Culture", "description": "Morning visit to Theyyam performance. Afternoon Chandragiri Fort. Evening at Kappil Beach."}, {"day": 3, "title": "Backwaters", "description": "Full day Valiyaparamba houseboat cruise. Fresh seafood onboard."}, {"day": 4, "title": "Departure", "description": "Morning spice plantation walk. Breakfast. Drop at Kannur."}]',
  ARRAY['3 nights accommodation', '1 night houseboat with all meals', 'Daily breakfast', 'Private AC vehicle', 'Theyyam performance tickets', 'English-speaking guide'],
  ARRAY['Flight/train tickets', 'Entry fees to monuments', 'Lunch and dinner (except houseboat)', 'Personal expenses'],
  '[{"q": "What is Theyyam?", "a": "Theyyam is a 2000-year-old ritual dance form of North Kerala, featuring elaborate costumes, face paint, and divine storytelling."}, {"q": "Is North Kerala safe for tourists?", "a": "Absolutely. North Kerala is known for its welcoming locals, pristine beaches, and well-maintained tourism infrastructure."}]'
),
(11, 'Misty Munnar Meditation & Yoga Retreat', 'Spiritual Rejuvenation in the Tea Hills',
  'Find your inner peace with daily sunrise meditation above the clouds, yoga sessions in spice gardens, and professional Ayurvedic spa treatments in the cool mountain climate of Munnar.',
  8499, '3 Days 2 Nights', 'New', true, 'Meditation',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', 4.9, 34, 6, 'Easy',
  'Kochi Airport / Railway Station',
  'Free cancellation up to 48 hours before the trip',
  ARRAY['Daily yoga and pranayama sessions with certified instructors', 'Silent meditation walks through historic tea trails', 'Sunrise meditation at Kolukkumalai Peak', '1-hour full body Ayurvedic Abhyanga massage session', 'Organic vegetarian meals served on banana leaf'],
  '[{"day": 1, "title": "Arrival & Welcome Wellness", "description": "Pickup from Kochi. Drive to Munnar (3.5 hrs). Check into a tranquil wellness retreat. Consultation with Ayurvedic doctor. Gentle yoga session. Evening meditation and silent dinner."}, {"day": 2, "title": "Sunrise Meditation & Spa", "description": "Sunrise meditation at Kolukkumalai. Return for healthy breakfast. Silent tea garden walk. Ayurvedic massage. Sound healing meditation."}, {"day": 3, "title": "Yoga & Closing", "description": "Hatha Yoga session. Closed meditation circle. Checkout and drive back to Kochi."}]',
  ARRAY['2 nights in premium room at wellness retreat', 'All healthy vegetarian organic meals', 'Daily yoga and meditation sessions', '1 Ayurvedic massage session per person', 'Private AC transfers Kochi-Munnar-Kochi'],
  ARRAY['Wellness shop purchases', 'Lunch on travel days', 'Tips and personal expenses'],
  '[{"q": "Are beginners welcome?", "a": "Absolutely. Our certified teachers accommodate all experience levels."}, {"q": "Is the diet strictly vegetarian?", "a": "Yes, we serve fresh organic vegetarian food matching Ayurvedic guidelines."}]'
),
(12, 'Kolukkumalai Off-Road Jeep Safari', 'Rugged Mountain Adventure',
  'Hold on tight as you conquer the highest organic tea gardens in the world on a rugged 4x4 off-road jeep safari, followed by camping and sunrise above the clouds.',
  4499, '2 Days 1 Night', 'Trending', true, 'Off Road',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80', 4.9, 92, 12, 'Hard',
  'Munnar Town / Suryanelli',
  'Free cancellation up to 24 hours before the trip',
  ARRAY['Rugged 4x4 jeep off-roading through steep mountain tracks', 'Camp under the stars on a windy clifftop with a bonfire', 'Breathtaking sunrise above the cloud bed at Kolukkumalai Peak', 'Guided tour of the heritage 100-year-old tea factory', 'Fresh hot cardamom tea brewed at the peak'],
  '[{"day": 1, "title": "Off-Road Safari & Camping", "description": "Meet at Suryanelli. Board 4x4 jeeps for off-road ride up to clifftops. Pitch tents. Campfire, barbecue, stargazing."}, {"day": 2, "title": "Sunrise & Tea Heritage", "description": "Sunrise trek. Guided tour of 1935 tea factory. Off-road descent back by noon."}]',
  ARRAY['1 night clifftop camping with tents and sleeping bags', 'Campfire dinner and hot breakfast', '4x4 jeep safari round trip from Suryanelli', 'Guided tea factory tour and permit fees', 'Qualified camp coordinator'],
  ARRAY['Transfers to/from Suryanelli', 'Lunch on both days', 'Tips and personal expenses'],
  '[{"q": "Is the off-road ride very bumpy?", "a": "Yes, the track is steep and rocky. Not recommended for pregnant women or back issues."}, {"q": "Are there toilets at the campsite?", "a": "Yes, clean basic western/eastern toilets are available at our base camp."}]'
);

-- Reset the sequence to the max ID
SELECT setval('tours_id_seq', (SELECT MAX(id) FROM tours));

-- Seed Testimonials
INSERT INTO testimonials (name, location, avatar_initials, rating, quote) VALUES
  ('Arjun & Sneha', 'Bangalore', 'AS', 5, 'Our Munnar honeymoon was perfectly organized. Every detail from the luxury resort stay to the private guides was handled flawlessly. Highly recommend Pranara!'),
  ('Priya & Family', 'Chennai', 'PF', 5, 'The itinerary covered every beautiful place without feeling rushed. The houseboat in Alleppey and the tea estate walks in Munnar were outstanding highlights!'),
  ('Vikram S.', 'Mumbai', 'VS', 5, 'Excellent hotels, smooth transport, and amazing support. The 24/7 travel coordination was incredibly comforting during our Poovar and Kovalam trip.'),
  ('Ananya & Raj', 'Delhi', 'AR', 5, 'We took the Munnar Honeymoon package and it exceeded every expectation. The candlelight dinner and photoshoot were magical.'),
  ('Ramesh K.', 'Hyderabad', 'RK', 4, 'Great family tour. Kids loved the spice garden and wildlife safari. The vehicle was comfortable and the driver very experienced.'),
  ('Sarah & Thomas', 'London, UK', 'ST', 5, 'Absolutely top-notch service! Booking the Complete Kerala Tour was the best decision we made. The houseboat experience in Alleppey was dreamlike, and our driver was exceptionally professional.'),
  ('Rahul Verma', 'Delhi, India', 'RV', 5, 'Wayanad was beautiful! Edakkal Caves and Muthanga safari were perfectly organized. The local guides provided by Pranara really know their way around.'),
  ('Elena G.', 'Munich, Germany', 'EG', 5, 'Vagamon was a peaceful paradise. The pine forest walk was incredibly soothing, and the booking process was seamless. Excellent customer support!');

-- Seed Gallery
INSERT INTO gallery (image_url, caption, source) VALUES
  ('/assets/munnar_top_station.png', 'Top Station Panoramic Valley', 'manual'),
  ('/assets/munnar_tea_museum.png', 'Munnar Tea Museum & Estates', 'manual'),
  ('/assets/munnar_attukad.png', 'Attukad Waterfalls', 'manual'),
  ('/assets/munnar_kolukkumalai.png', 'Kolukkumalai Sunrise Viewpoint', 'manual'),
  ('/assets/munnar_eravikulam.png', 'Eravikulam National Park', 'manual'),
  ('/assets/munnar_mattupetty.png', 'Mattupetty Dam & Lake', 'manual'),
  ('/assets/munnar_echo_point.png', 'Misty Echo Point Lake', 'manual'),
  ('/assets/munnar_kundala.png', 'Kundala Lake Shikara Ride', 'manual');

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
  ('Houseboat Stay', 'Unwind in a luxurious wooden Kettuvallam and drift along Alleppey backwaters.'),
  ('Jeep Safari', 'High-altitude off-roading in Kolukkumalai to reach the highest organic tea gardens in the world.'),
  ('Spice Garden Tour', 'Discover cardamom, cinnamon, pepper, and vanilla plants in their natural habitat in Thekkady.'),
  ('Waterfall Trekking', 'Trek through forested streams to hidden waterfalls, safe for swimming and exploring.'),
  ('Wildlife Safari', 'Take a boat cruise or guided trek to spot elephants, bisons, and Nilgiri Tahrs in Periyar.'),
  ('Kathakali Show', 'Witness the vibrant and intense classical dance-drama of Kerala performed by local masters.'),
  ('Ayurvedic Spa', 'Indulge in authentic rejuvenating herbal massages and wellness treatments by experts.'),
  ('Bamboo Rafting', 'A tranquil rafting and trekking experience along the reserve lakes of Thekkady and Wayanad.'),
  ('Sunrise Viewpoints', 'Stand above the clouds at Top Station or Kolukkumalai for a golden sunrise.'),
  ('Camping', 'Sleep under the stars on misty hilltops in Munnar or Vagamon with a cozy campfire.'),
  ('Zipline Adventure', 'Fly over lush green valleys and tea gardens on Kerala longest zipline courses.');

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
