"""
Supabase setup & sync utility for Pranara Tours.
Run this script after configuring your .env file with Supabase credentials.

Usage:
  python supabase_setup.py        # Test connection and show status
  python supabase_setup.py --sync  # Sync seed data from fallback to Supabase
"""

import os
import sys
import json
import logging
from pathlib import Path

from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger("supabase-setup")

# Load .env
dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path)

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")

# ============================================================
# Seed data matching in-memory fallback from app.py
# ============================================================
SEED_TOURS = [
    {"title": "Munnar 2 Days 1 Night", "description": "A quick escape to the misty tea gardens, viewpoints, and waterfalls of Munnar. Perfect for weekend travelers.", "price": 4999, "duration": "2 Days 1 Night", "tag": "Weekend Gateway", "featured": True, "image_url": "/assets/tour_munnar.png"},
    {"title": "Munnar + Thekkady", "description": "Explore the rolling hills of Munnar combined with wildlife safari, spice plantation tours, and boating in Thekkady.", "price": 7999, "duration": "3 Days 2 Nights", "tag": "Popular", "featured": True, "image_url": "/assets/tour_thekkady.png"},
    {"title": "Munnar + Alleppey", "description": "The quintessential Kerala tour. Walk the misty hills of Munnar and stay overnight in a premium houseboat on Alleppey's backwaters.", "price": 11999, "duration": "4 Days 3 Nights", "tag": "Trending", "featured": True, "image_url": "/assets/tour_alleppey.png"},
    {"title": "Complete Kerala Tour", "description": "A comprehensive journey covering Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and the stunning beaches of Varkala and Kovalam.", "price": 24999, "duration": "7 Days 6 Nights", "tag": "Best Value", "featured": True, "image_url": "/assets/tour_kerala.png"},
]

SEED_TESTIMONIALS = [
    {"name": "The Thompson Family", "location": "London, United Kingdom", "avatar_initials": "TF", "rating": 5, "quote": "From the UK to the heart of Munnar. Thank you for letting us be part of your family's story. See you again, The Pranara Way."},
    {"name": "The Adhikari Family", "location": "Mumbai, India", "avatar_initials": "AF", "rating": 5, "quote": "Every journey becomes special because of the people in it. The pristine river streams, the lush green forests, and the memories we shared in Munnar. Thank you for letting Pranara be a part of yours. Until Next Time..."},
    {"name": "Mr. & Mrs. Sharma", "location": "Delhi, India", "avatar_initials": "MS", "rating": 5, "quote": "We are extremely satisfied with the excellent service provided by Mr. Pradeep. He was very patient and answered all our questions. His impressive knowledge of Munnar - history, culture, attractions & local insights - was outstanding. Professional, friendly, and dedicated throughout the trip, he made our visit to Munnar truly enjoyable and memorable. Highly recommend his services to all visitors!"},
    {"name": "Sarah, Marc & Amit", "location": "Berlin, Germany", "avatar_initials": "SMA", "rating": 5, "quote": "The trek to Chokkarmudi Peak was absolutely unforgettable! Every step was a new experience — the fresh mountain air, the breathtaking views, and the sense of achievement at the top made it truly special. Our guide was incredibly supportive, patient and made the whole journey safe, fun and meaningful. It was more than just a trek, it was an emotion! Highly recommended for anyone who loves nature and adventure."},
    {"name": "Amal & Friends", "location": "Chennai, India", "avatar_initials": "AF", "rating": 5, "quote": "Our group trip to Munnar with Pranara was an absolute blast! From the high-altitude viewpoints to walking through the green tea gardens, the entire experience was perfectly planned and executed. The team made sure we captured the best memories."},
]

SEED_GALLERY = [
    {"image_url": "/assets/munnar_kolukkumalai.png", "caption": "Kolukkumalai Sunrise Viewpoint", "source": "manual"},
    {"image_url": "/assets/munnar_top_station.png", "caption": "Top Station Panoramic Valley", "source": "manual"},
    {"image_url": "/assets/munnar_eravikulam.png", "caption": "Eravikulam National Park", "source": "manual"},
    {"image_url": "/assets/munnar_mattupetty.png", "caption": "Mattupetty Dam & Lake", "source": "manual"},
    {"image_url": "/assets/munnar_echo_point.png", "caption": "Misty Lake Echo Point", "source": "manual"},
    {"image_url": "/assets/munnar_kundala.png", "caption": "Shikara Ride at Kundala Lake", "source": "manual"},
    {"image_url": "/assets/munnar_attukad.png", "caption": "Attukad Waterfalls", "source": "manual"},
    {"image_url": "/assets/munnar_tea_museum.png", "caption": "Munnar Tea Estate Garden", "source": "manual"},
]

SEED_DESTINATIONS = [
    {"name": "Munnar", "description": "Lush green tea plantations, misty valleys, and cool mountain air.", "best_season": "Sept to May", "price": 4999, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=600&q=80"},
    {"name": "Alleppey", "description": "Cruising in traditional houseboats along scenic palm-fringed backwaters.", "best_season": "Oct to March", "price": 7999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80"},
    {"name": "Thekkady", "description": "Periyar national park wildlife safari and rich spice garden explorations.", "best_season": "Oct to April", "price": 5999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&q=80"},
    {"name": "Wayanad", "description": "Waterfalls, ancient caves, tea estates, and wild elephant sightings.", "best_season": "Oct to May", "price": 6499, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80"},
    {"name": "Vagamon", "description": "Pine forests, green meadows, paragliding, and absolute serenity.", "best_season": "Sept to May", "price": 3999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80"},
    {"name": "Kochi", "description": "Historical port town showcasing Portuguese, Dutch, and British history.", "best_season": "Oct to April", "price": 2999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80"},
    {"name": "Kumarakom", "description": "Vembanad Lake luxury bird watching, houseboat stays, and lagoons.", "best_season": "Nov to Feb", "price": 8999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80"},
    {"name": "Varkala", "description": "Unique seaside cliffs, golden beaches, and spiritual beach culture.", "best_season": "Oct to March", "price": 5499, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80"},
    {"name": "Kovalam", "description": "Iconic lighthouse beach, curved bays, and shallow water swimming.", "best_season": "Sept to March", "price": 5999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80"},
    {"name": "Athirappilly", "description": "The majestic Niagara waterfalls of India set in deep green forests.", "best_season": "June to Nov", "price": 3499, "duration": "1 Day", "image_url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80"},
    {"name": "Poovar", "description": "Where the lake, river, sea, and beach meet in a beautiful delta.", "best_season": "Oct to April", "price": 6999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1577717903312-2c86c5a9c20e?w=600&q=80"},
    {"name": "Bekal", "description": "Keyhole-shaped historical fort and pristine untouched Northern beaches.", "best_season": "Oct to May", "price": 8499, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"}
]

SEED_EXPERIENCES = [
    {"title": "Tea Plantation Walk", "description": "Walk among the lush tea estates of Munnar, learn about the processing, and taste fresh tea."},
    {"title": "Houseboat Stay", "description": "Unwind in a luxurious wooden Kettuvallam and drift along Alleppey's backwaters."},
    {"title": "Jeep Safari", "description": "High-altitude off-roading in Kolukkumalai to reach the highest organic tea gardens in the world."},
    {"title": "Spice Garden Tour", "description": "Discover cardamom, cinnamon, pepper, and vanilla plants in their natural habitat in Thekkady."},
    {"title": "Waterfall Trekking", "description": "Trek through forested streams to hidden waterfalls, safe for swimming and exploring."},
    {"title": "Wildlife Safari", "description": "Take a boat cruise or guided trek to spot elephants, bisons, and Nilgiri tahrs in Periyar."},
    {"title": "Kathakali Show", "description": "Witness the vibrant and intense classical dance-drama of Kerala performed by local masters."},
    {"title": "Ayurvedic Spa", "description": "Indulge in authentic rejuvenating herbal massages and wellness treatments by experts."},
    {"title": "Bamboo Rafting", "description": "A tranquil rafting and trekking experience along the reserve lakes of Thekkady and Wayanad."},
    {"title": "Sunrise Viewpoints", "description": "Stand above the clouds at Top Station or Kolukkumalai for a golden sunrise."},
    {"title": "Camping", "description": "Sleep under the stars on misty hilltops in Munnar or Vagamon with a cozy campfire."},
    {"title": "Zipline Adventure", "description": "Fly over lush green valleys and tea gardens on Kerala's longest zipline courses."}
]

SEED_ATTRACTIONS = [
    {"name": "Kolukkumalai Sunrise", "description": "Highest tea estate with panoramic sunrise views above the cloud bed.", "destination": "Munnar"},
    {"name": "Mattupetty Dam", "description": "Beautiful lake with speedboating and nearby green pastures.", "destination": "Munnar"},
    {"name": "Echo Point", "description": "Natural echo phenomenon along the misty lake shores.", "destination": "Munnar"},
    {"name": "Top Station", "description": "Highest point in Munnar offering a 360-degree view of Tamil Nadu plains.", "destination": "Munnar"},
    {"name": "Eravikulam National Park", "description": "Sanctuary for the endangered Nilgiri Tahr mountain goat.", "destination": "Munnar"},
    {"name": "Tea Museum", "description": "Trace the history and machinery of tea processing in Munnar since the 1880s.", "destination": "Munnar"},
    {"name": "Kundala Lake", "description": "Pedal boats and Kashmiri-style Shikara boat rides surrounded by hills.", "destination": "Munnar"},
    {"name": "Attukad Waterfalls", "description": "Roaring waterfall nestled between steep hills and tea estates.", "destination": "Munnar"},
    {"name": "Blossom Park", "description": "Lush gardens, cycling tracks, and beautiful flower exhibits.", "destination": "Munnar"},
    {"name": "Chinnar Wildlife Sanctuary", "description": "Dry deciduous scrub forest home to grizzly giant squirrels.", "destination": "Munnar"}
]



def test_connection():
    """Test the Supabase connection."""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        logger.error("")
        logger.error("  SUPABASE NOT CONFIGURED")
        logger.error("  ======================")
        logger.error("  Edit backend/.env with your Supabase URL and anon key.")
        logger.error("  Get them from: https://supabase.com/dashboard/projects")
        logger.error("  -> Select your project -> Settings -> API")
        logger.error("")
        return False

    if "your-project-id" in SUPABASE_URL:
        logger.error("")
        logger.error("  PLACEHOLDER VALUES DETECTED")
        logger.error("  Please replace the placeholder values in backend/.env")
        logger.error("  with your actual Supabase project credentials.")
        logger.error("")
        return False

    try:
        from supabase import create_client
        sb = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        # Test by counting tours
        resp = sb.table("tours").select("id", count="exact").execute()
        count = len(resp.data) if resp.data else 0
        
        logger.info("")
        logger.info(f"  SUCCESS — Connected to Supabase!")
        logger.info(f"  URL: {SUPABASE_URL}")
        logger.info(f"  Tours: {count} rows")
        logger.info("")
        return True
    except Exception as e:
        logger.error("")
        logger.error(f"  CONNECTION FAILED: {e}")
        logger.error("")
        logger.error("  Troubleshooting:")
        logger.error("  1. Check your SUPABASE_URL and SUPABASE_ANON_KEY in .env")
        logger.error("  2. Make sure you've run the SQL schema in Supabase SQL Editor")
        logger.error("  3. Check that your project is not paused")
        logger.error("  4. Verify Row Level Security policies allow anon access")
        logger.error("")
        return False


def sync_seed_data():
    """Sync seed data from the fallback DB to Supabase tables."""
    if not test_connection():
        return False

    from supabase import create_client
    sb = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

    tables = {
        "tours": SEED_TOURS,
        "testimonials": SEED_TESTIMONIALS,
        "gallery": SEED_GALLERY,
        "destinations": SEED_DESTINATIONS,
        "experiences": SEED_EXPERIENCES,
        "attractions": SEED_ATTRACTIONS,
    }

    all_ok = True
    for table_name, records in tables.items():
        table = sb.table(table_name)
        
        # Check if table has data
        try:
            resp = table.select("id", count="exact").limit(1).execute()
            existing = len(resp.data) if resp.data else 0
        except Exception as e:
            logger.error(f"  Table '{table_name}' may not exist: {e}")
            logger.error(f"  Run the SQL schema first: backend/supabase_schema.sql")
            all_ok = False
            continue

        if existing > 0:
            logger.info(f"  {table_name}: {existing} rows already exist (skipping)")
            continue

        try:
            logger.info(f"  Seeding {table_name} with {len(records)} records...")
            result = table.insert(records).execute()
            if result.data:
                logger.info(f"  ✓ {table_name}: {len(result.data)} rows inserted")
            else:
                logger.warning(f"  ? {table_name}: insert returned no data")
        except Exception as e:
            logger.error(f"  ✗ {table_name}: insert failed — {e}")
            all_ok = False

    return all_ok


def print_setup_instructions():
    """Print Supabase setup instructions."""
    logger.info("")
    logger.info("  ╔══════════════════════════════════════════════╗")
    logger.info("  ║       PRANARA TOURS - SUPABASE SETUP         ║")
    logger.info("  ╚══════════════════════════════════════════════╝")
    logger.info("")
    logger.info("  Step 1: Go to https://supabase.com/dashboard/projects")
    logger.info("  Step 2: Click 'New Project' (or open an existing one)")
    logger.info("  Step 3: Name it 'pranara-tours' and choose a region")
    logger.info("  Step 4: Set a secure database password (save it!)")
    logger.info("  Step 5: Wait for the database to provision (~1-2 min)")
    logger.info("  Step 6: Go to Settings → API in the dashboard")
    logger.info("  Step 7: Copy your 'Project URL' and 'anon public key'")
    logger.info("  Step 8: Paste them into backend/.env")
    logger.info("")
    logger.info("  Step 9: Go to SQL Editor in the dashboard")
    logger.info("  Step 10: Open backend/supabase_schema.sql")
    logger.info("  Step 11: Paste and run the SQL to create tables + seed data")
    logger.info("")
    logger.info("  Step 12: Run this script to verify:")
    logger.info("    python supabase_setup.py")
    logger.info("")


if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv:
        print_setup_instructions()
        sys.exit(0)

    if "--sync" in sys.argv:
        logger.info("")
        logger.info("  Syncing seed data to Supabase...")
        logger.info("")
        if sync_seed_data():
            logger.info("  Sync complete!")
        else:
            logger.info("  Sync had errors (see above).")
            sys.exit(1)
    elif "--instructions" in sys.argv:
        print_setup_instructions()
    else:
        print_setup_instructions()
        test_connection()
