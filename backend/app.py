"""
Pranara Tours - Flask Backend API
Provides REST API endpoints for the Pranara Tours website.
Integrates with Supabase for data persistence and Instagram for dynamic content.
"""

import os
import json
import logging
from datetime import datetime, date
from functools import wraps

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests

from config import Config
from instagram_scraper import (
    scrape_profile_posts,
    fetch_oembed_data,
    extract_shortcode,
    format_instagram_post,
    fetch_profile_embed,
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("pranara-api")

# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------
app = Flask(__name__, static_folder=None)
app.config.from_object(Config)

# CORS - allow frontend dev server
cors_origins = Config.CORS_ORIGINS.split(",")
CORS(app, origins=cors_origins, supports_credentials=True)

# ---------------------------------------------------------------------------
# Supabase client (lazy init)
# ---------------------------------------------------------------------------
_supabase = None


def get_supabase():
    global _supabase
    if _supabase is None and Config.has_supabase():
        try:
            from supabase import create_client
            _supabase = create_client(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY)
            logger.info("Supabase client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize Supabase: {e}")
    return _supabase


def db_table(table_name):
    """Get a Supabase table reference, or return a fallback storage dict."""
    sb = get_supabase()
    if sb:
        return sb.table(table_name)
    return None


# ---------------------------------------------------------------------------
# In-memory fallback storage (when Supabase is not configured)
# ---------------------------------------------------------------------------
_fallback_db = {
    "tours": [
        {
            "id": 1, "title": "Munnar 2 Days 1 Night",
            "subtitle": "Weekend Gateway to the Misty Hills",
            "description": "A quick escape to the misty tea gardens, viewpoints, and waterfalls of Munnar. Perfect for weekend travelers seeking tranquility and breathtaking landscapes.",
            "price": 4999, "duration": "2 Days 1 Night", "tag": "Weekend Gateway", "featured": True,
            "category": "Experience",
            "image_url": "/assets/tour_munnar.png",
            "rating": 4.8, "reviews": 124,
            "max_people": 10,
            "difficulty": "Easy",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 48 hours before the trip",
            "highlights": [
                "Visit the famous Tea Museum and sprawling tea estates",
                "Sunrise at Kolukkumalai — highest tea plantation in the world",
                "Explore Eravikulam National Park and spot Nilgiri Tahrs",
                "Scenic drive through hairpin bends with misty valley views",
                "Photo stop at Mattupetty Dam and Echo Point"
            ],
            "itinerary": [
                {"day": 1, "title": "Arrival & Munnar Exploration", "description": "Pickup from Kochi (airport/railway). Scenic 3.5 hr drive to Munnar through winding hills. Check into a premium resort. Afternoon visit to Tea Museum and a guided walk through the tea plantations. Evening at leisure — enjoy the cool mountain breeze. Overnight at resort in Munnar."},
                {"day": 2, "title": "Sunrise & Departure", "description": "Early morning visit to Kolukkumalai for a stunning sunrise above the clouds. Return for breakfast. Visit Mattupetty Dam and Echo Point. After checkout, drive back to Kochi with drop-off at airport/railway station by evening."}
            ],
            "inclusions": [
                "Accommodation in a premium resort (1 night)", "All breakfast and dinner meals",
                "Private AC vehicle throughout the trip", "Professional English-speaking guide",
                "All permit charges and parking fees", "Pickup and drop-off from Kochi"
            ],
            "exclusions": [
                "Entry fees to attractions (approx ₹200-500)", "Lunch and personal expenses",
                "Camera fees at monuments", "Tips and gratuities",
                "Anything not mentioned in inclusions"
            ],
            "faqs": [
                {"q": "Is this suitable for solo travelers?", "a": "Absolutely! We welcome solo travelers. The group size is kept small for a personal experience."},
                {"q": "What should I pack?", "a": "Light woolens (Munnar can get chilly), comfortable walking shoes, sunscreen, an umbrella, and a camera."},
                {"q": "Is pickup available from other locations?", "a": "Yes, we can arrange pickup from anywhere in Kochi — hotels, airport, or railway station."}
            ]
        },
        {
            "id": 2, "title": "Munnar + Thekkady",
            "subtitle": "Hills & Wildlife Combo",
            "description": "Explore the rolling hills of Munnar combined with wildlife safari, spice plantation tours, and boating in Thekkady. A perfect blend of nature and adventure.",
            "price": 7999, "duration": "3 Days 2 Nights", "tag": "Popular", "featured": True,
            "category": "Adventures",
            "image_url": "/assets/tour_thekkady.png",
            "rating": 4.9, "reviews": 89,
            "max_people": 8,
            "difficulty": "Moderate",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 48 hours before the trip",
            "highlights": [
                "Boat safari on Periyar Lake to spot wild elephants and bisons",
                "Guided tour through aromatic spice plantations",
                "Sunrise at Kolukkumalai Tea Estate",
                "Bamboo rafting in Thekkady's reserve forests",
                "Kathakali cultural performance in the evening"
            ],
            "itinerary": [
                {"day": 1, "title": "Kochi to Munnar", "description": "Pickup from Kochi. Drive to Munnar (3.5 hrs). Check into resort. Afternoon visit to Tea Museum and plantations. Evening walk through the local market. Overnight at Munnar."},
                {"day": 2, "title": "Munnar to Thekkady", "description": "Early Kolukkumalai sunrise visit. Breakfast and checkout. Drive to Thekkady (3 hrs). Check into resort. Afternoon spice plantation tour. Evening boat safari on Periyar Lake. Kathakali show. Overnight at Thekkady."},
                {"day": 3, "title": "Thekkady & Departure", "description": "Morning bamboo rafting or nature trek. Breakfast and checkout. Visit a spice shop for authentic Kerala spices. Drive back to Kochi. Drop-off by evening."}
            ],
            "inclusions": [
                "Accommodation in premium resorts (2 nights)", "All breakfast and dinner meals",
                "Private AC vehicle throughout", "Professional guide for Munnar and Thekkady",
                "Periyar Lake boat safari tickets", "Spice plantation tour",
                "Pickup and drop-off from Kochi"
            ],
            "exclusions": [
                "Entry fees to Kolukkumalai and Tea Museum", "Lunch and personal expenses",
                "Kathakali show tickets (₹300-500)", "Bamboo rafting charges",
                "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Will we see wild animals in Thekkady?", "a": "The boat safari offers excellent chances to spot elephants, wild boars, bisons, and various bird species in their natural habitat."},
                {"q": "Is the driving distance comfortable?", "a": "Yes, each segment is 3-3.5 hours with scenic stops along the way. All our vehicles are spacious and comfortable."}
            ]
        },
        {
            "id": 3, "title": "Munnar + Alleppey",
            "subtitle": "Hills & Backwaters in One Trip",
            "description": "The quintessential Kerala tour. Walk the misty hills of Munnar and stay overnight in a premium houseboat on Alleppey's serene backwaters.",
            "price": 11999, "duration": "4 Days 3 Nights", "tag": "Trending", "featured": True,
            "category": "Experience",
            "image_url": "/assets/tour_alleppey.png",
            "rating": 4.9, "reviews": 156,
            "max_people": 6,
            "difficulty": "Easy",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 72 hours before the trip",
            "highlights": [
                "Overnight stay in a luxury houseboat on Alleppey backwaters",
                "Sunrise at Kolukkumalai — highest tea estate in the world",
                "Visit Eravikulam National Park and spot the rare Nilgiri Tahr",
                "Candlelight dinner on the houseboat deck under the stars",
                "Traditional Kerala dinner served on the houseboat"
            ],
            "itinerary": [
                {"day": 1, "title": "Kochi to Munnar", "description": "Pickup from Kochi. Scenic drive to Munnar. Check into resort. Afternoon visit to Tea Museum and plantation walks. Overnight at Munnar resort."},
                {"day": 2, "title": "Munnar Exploration", "description": "Early morning Kolukkumalai sunrise trek. Return for breakfast. Visit Eravikulam National Park, Mattupetty Dam, and Echo Point. Evening leisure at resort. Overnight at Munnar."},
                {"day": 3, "title": "Munnar to Alleppey", "description": "Breakfast and checkout. Drive to Alleppey (4 hrs). Board a premium houseboat by noon. Cruise through the scenic backwaters, enjoy lunch and sunset onboard. Overnight on the houseboat."},
                {"day": 4, "title": "Alleppey & Departure", "description": "Breakfast on the houseboat. Disembark by 9 AM. Optional visit to Alleppey beach or back to Kochi for drop-off."}
            ],
            "inclusions": [
                "2 nights accommodation in premium resort (Munnar)", "1 night in luxury houseboat (Alleppey)",
                "All meals as per itinerary — breakfast, lunch, dinner", "Private AC vehicle throughout",
                "English-speaking guide for all sightseeing", "Houseboat crew including chef",
                "Pickup and drop-off from Kochi"
            ],
            "exclusions": [
                "Entry fees to national parks and monuments", "Camera fees at attractions",
                "Personal expenses and shopping", "Tips and gratuities",
                "Lunch on day 1 and day 4"
            ],
            "faqs": [
                {"q": "Is the houseboat private?", "a": "Yes, the houseboat is exclusively for your group. It comes with a dedicated crew including a chef and a captain."},
                {"q": "What if I travel alone?", "a": "Solo travelers are welcome. You may be paired with a small group or opt for a private houseboat at a supplemental cost."},
                {"q": "Can we customize the itinerary?", "a": "Absolutely! We can add or remove destinations and adjust the duration as per your preferences."}
            ]
        },
        {
            "id": 4, "title": "Complete Kerala Tour",
            "subtitle": "The Ultimate Kerala Experience",
            "description": "A comprehensive journey covering Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and the stunning beaches of Varkala and Kovalam.",
            "price": 24999, "duration": "7 Days 6 Nights", "tag": "Best Value", "featured": True,
            "category": "Experience",
            "image_url": "/assets/tour_kerala.png",
            "rating": 5.0, "reviews": 203,
            "max_people": 8,
            "difficulty": "Moderate",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 7 days before the trip",
            "highlights": [
                "7-day grand tour across 5 iconic Kerala destinations",
                "Houseboat night on Alleppey backwaters with gourmet dinner",
                "Wildlife boat safari at Periyar Tiger Reserve, Thekkady",
                "Sunrise at Kolukkumalai — highest tea estate in the world",
                "Beach sunset at Varkala cliff and Kovalam lighthouse",
                "Spice plantation tour and authentic Kerala cooking demo",
                "Kathakali performance and Ayurvedic spa session"
            ],
            "itinerary": [
                {"day": 1, "title": "Arrival in Kochi — Drive to Munnar", "description": "Pickup from Kochi airport or railway station. Scenic drive to Munnar (3.5 hrs). Check into a premium hill resort. Evening walk through tea gardens and local market. Overnight at Munnar."},
                {"day": 2, "title": "Munnar — Full Day Exploration", "description": "Pre-dawn departure to Kolukkumalai for sunrise. Return for breakfast. Visit Eravikulam National Park, Tea Museum, Mattupetty Dam, and Echo Point. Overnight at Munnar."},
                {"day": 3, "title": "Munnar to Thekkady", "description": "Breakfast and checkout. Drive to Thekkady (3 hrs). Check into resort. Afternoon spice plantation tour with aroma tasting. Evening boat safari on Periyar Lake. Kathakali show. Overnight at Thekkady."},
                {"day": 4, "title": "Thekkady to Alleppey", "description": "Morning bamboo rafting or nature trek. Breakfast and checkout. Drive to Alleppey (4 hrs). Board premium houseboat. Cruise through backwaters with lunch and sunset dinner. Overnight on houseboat."},
                {"day": 5, "title": "Alleppey to Varkala", "description": "Breakfast on houseboat. Disembark. Drive to Varkala (3 hrs). Check into cliff-top resort. Afternoon at Varkala beach — swim and explore the cliffside cafes. Sunset on the cliff. Overnight at Varkala."},
                {"day": 6, "title": "Varkala to Kovalam", "description": "Leisurely breakfast. Drive to Kovalam (1.5 hrs). Check into beach resort. Ayurvedic spa session. Visit Lighthouse Beach and Hawah Beach. Evening farewell dinner. Overnight at Kovalam."},
                {"day": 7, "title": "Departure from Trivandrum", "description": "Breakfast at resort. Leisure time at the beach. Checkout and drop at Trivandrum International Airport or Railway Station. Tour ends with wonderful memories."}
            ],
            "inclusions": [
                "6 nights accommodation across premium properties", "All breakfast and dinner meals",
                "1 night in luxury houseboat with all meals", "Private AC vehicle for entire trip",
                "English-speaking guide throughout", "All boat safaris and national park entry fees",
                "Kathakali show tickets", "Ayurvedic spa session (1 per person)",
                "Kerala cooking demonstration", "Pickup from Kochi, drop at Trivandrum"
            ],
            "exclusions": [
                "Lunch on most days (available at cafes along the way)", "Camera fees at monuments and parks",
                "Personal shopping and expenses", "Tips and gratuities",
                "Airfare or train fare to/from Kerala"
            ],
            "faqs": [
                {"q": "Can I join the tour midway?", "a": "We recommend starting from Day 1, but we can arrange pickup at any point along the route with prior coordination."},
                {"q": "Are single rooms available?", "a": "Yes, single occupancy is available at a supplemental cost. Please mention this during booking."},
                {"q": "What is the best season for this tour?", "a": "September to May is ideal. The monsoon season (June-August) offers health benefits but some water activities may be limited."},
                {"q": "Is travel insurance included?", "a": "Travel insurance is not included but we strongly recommend purchasing it for international travelers."}
            ]
        },
        {
            "id": 5, "title": "Wayanad 2 Days 1 Night",
            "subtitle": "Misty Hills & Ancient Caves",
            "description": "Escape to Wayanad's lush green landscapes, ancient Edakkal caves, stunning waterfalls like Meenmutty and Soochipara, and spot wild elephants at Muthanga Wildlife Sanctuary.",
            "price": 5499, "duration": "2 Days 1 Night", "tag": "New", "featured": True,
            "category": "Adventures",
            "image_url": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80",
            "rating": 4.7, "reviews": 78,
            "max_people": 10,
            "difficulty": "Easy",
            "meeting_point": "Kozhikode Airport / Railway Station",
            "cancellation": "Free cancellation up to 24 hours before the trip",
            "highlights": [
                "Explore the 6000-year-old Edakkal Caves with ancient petroglyphs",
                "Trek to Meenmutty and Soochipara waterfalls for a refreshing dip",
                "Jeep safari at Muthanga Wildlife Sanctuary — spot elephants and deer",
                "Visit the scenic Pookode Lake and pedal boat in green surroundings",
                "Walk through sprawling tea and spice plantations"
            ],
            "itinerary": [
                {"day": 1, "title": "Kozhikode to Wayanad", "description": "Pickup from Kozhikode airport/railway. Scenic 2.5 hr drive to Wayanad through winding ghat roads. Check into a nature resort. Afternoon visit to Pookode Lake and Lakkidi viewpoint. Evening guided walk through a spice plantation. Overnight at Wayanad resort."},
                {"day": 2, "title": "Waterfalls & Departure", "description": "Early morning trek to Meenmutty Waterfalls. Return for breakfast. Visit Edakkal Caves for a peek into Neolithic history. After checkout, optional quick stop at a local organic market. Drop-off at Kozhikode by evening."}
            ],
            "inclusions": [
                "Accommodation in a nature resort (1 night)", "All breakfast and dinner meals",
                "Private AC vehicle throughout the trip", "Professional guide for Edakkal Caves",
                "All permit charges and parking fees", "Pickup and drop-off from Kozhikode"
            ],
            "exclusions": [
                "Entry fees to Edakkal Caves and Muthanga sanctuary", "Lunch and personal expenses",
                "Jeep safari charges at Muthanga", "Camera fees at caves",
                "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Is the trek to Meenmutty difficult?", "a": "The trek is moderate — about 2 km through forest terrain. Comfortable walking shoes are recommended."},
                {"q": "What is the best time to visit Wayanad?", "a": "October to May is ideal. The monsoons (June-September) make waterfalls magnificent but forest treks may be restricted."}
            ]
        },
        {
            "id": 7, "title": "Vagamon Weekend Getaway",
            "subtitle": "Serenity in the Pine Forests",
            "description": "Unwind in Vagamon's pristine pine forests, rolling green meadows, and misty hills. Perfect for a quiet weekend surrounded by nature far from the crowds.",
            "price": 3999, "duration": "2 Days 1 Night", "tag": "Budget Friendly", "featured": True,
            "category": "Off Road",
            "image_url": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
            "rating": 4.6, "reviews": 65,
            "max_people": 12,
            "difficulty": "Easy",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 24 hours before the trip",
            "highlights": [
                "Walk through the famous Vagamon Pine Forest — straight out of a movie",
                "Paragliding over the green meadows (optional add-on)",
                "Visit the scenic Thangal Hill and Ulipooni Rock viewpoint",
                "Explore the Marmala Waterfall hidden in dense forest",
                "Campfire and barbecue dinner at the resort"
            ],
            "itinerary": [
                {"day": 1, "title": "Kochi to Vagamon", "description": "Pickup from Kochi. Drive to Vagamon (2.5 hrs). Check into a hillside resort surrounded by pine forests. Afternoon visit to Vagamon Pine Forest for a peaceful walk. Evening at Thangal Hill viewpoint for sunset. Campfire with barbecue dinner at the resort. Overnight at Vagamon."},
                {"day": 2, "title": "Meadows & Departure", "description": "Early morning visit to Ulipooni Hill for panoramic views of the valley. Return for breakfast. Optional paragliding session (at own cost). Visit Marmala Waterfall for a quick swim. After checkout, drive back to Kochi with drop-off by evening."}
            ],
            "inclusions": [
                "Accommodation in a hillside resort (1 night)", "Breakfast and barbecue dinner",
                "Private AC vehicle throughout", "Campfire arrangement",
                "All permit charges", "Pickup and drop-off from Kochi"
            ],
            "exclusions": [
                "Paragliding charges (approx ₹1,500)", "Lunch and personal expenses",
                "Entry fees to Marmala Waterfall", "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Is Vagamon safe for solo female travelers?", "a": "Absolutely. Vagamon is very safe and peaceful. Our guides accompany you throughout."},
                {"q": "How is the mobile network in Vagamon?", "a": "Network is available in town areas but may be patchy in the pine forest — perfect for a digital detox!"}
            ]
        },
        {
            "id": 8, "title": "Kovalam Beach Holiday",
            "subtitle": "Sun, Sand & Ayurveda",
            "description": "Relax on Kovalam's iconic crescent beaches — Lighthouse Beach, Hawah Beach, and Samudra Beach. Combine sunbathing with Ayurvedic spa treatments and seafood dinners.",
            "price": 6999, "duration": "3 Days 2 Nights", "tag": "Trending", "featured": True,
            "category": "Meditation",
            "image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80",
            "rating": 4.7, "reviews": 142,
            "max_people": 8,
            "difficulty": "Easy",
            "meeting_point": "Trivandrum International Airport",
            "cancellation": "Free cancellation up to 48 hours before the trip",
            "highlights": [
                "Relax on the three iconic beaches of Kovalam — Lighthouse, Hawah, Samudra",
                "Rejuvenating Ayurvedic massage session (1 hour included)",
                "Fresh seafood dinner at a cliffside restaurant overlooking the Arabian Sea",
                "Visit the Vizhinjam Marine Aquarium and fishing port",
                "Sunset at the red-and-white Kovalam Lighthouse"
            ],
            "itinerary": [
                {"day": 1, "title": "Arrival & Beach Relaxation", "description": "Pickup from Trivandrum International Airport. Drive to Kovalam (30 mins). Check into a beachfront resort. Afternoon at Lighthouse Beach — swim, sunbathe, and explore. Evening walk along the cliffside shops and cafes. Seafood dinner at a cliff restaurant with sunset views. Overnight at Kovalam."},
                {"day": 2, "title": "Ayurveda & Exploration", "description": "Morning Ayurvedic massage session at the resort. Late breakfast. Visit Vizhinjam Marine Aquarium and the bustling fishing harbor. Afternoon at Hawah Beach. Evening climb to the lighthouse for panoramic sunset views. Overnight at Kovalam."},
                {"day": 3, "title": "Leisure & Departure", "description": "Leisurely breakfast. Free time at Samudra Beach — less crowded and pristine. Checkout by noon. Drop-off at Trivandrum airport or railway station. Tour ends."}
            ],
            "inclusions": [
                "2 nights accommodation in beachfront resort", "All breakfast meals",
                "1 Ayurvedic massage session per person", "Private AC vehicle throughout",
                "All permit charges and parking", "Pickup from Trivandrum airport, drop-off at Trivandrum"
            ],
            "exclusions": [
                "Lunch and dinner meals (many excellent cafes nearby)", "Lighthouse entry fee",
                "Vizhinjam Aquarium entry fee", "Personal expenses and shopping",
                "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Which is the best beach in Kovalam?", "a": "Lighthouse Beach is the most popular with great cafes. Hawah Beach is quieter, and Samudra Beach is the most secluded."},
                {"q": "Is Kovalam good for families?", "a": "Yes! The beaches have gentle waves safe for children, and the resort has family-friendly amenities."}
            ]
        },
        {
            "id": 10, "title": "Kerala North Explorer",
            "subtitle": "Wayanad, Kozhikode & Bekal",
            "description": "Explore the unexplored beauty of North Kerala — the misty hills of Wayanad, the historic spice town of Kozhikode, and the breathtaking Bekal Fort on the Arabian coast.",
            "price": 14999, "duration": "5 Days 4 Nights", "tag": "New", "featured": True,
            "category": "Off Road",
            "image_url": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
            "rating": 4.8, "reviews": 56,
            "max_people": 8,
            "difficulty": "Moderate",
            "meeting_point": "Kozhikode Airport / Railway Station",
            "cancellation": "Free cancellation up to 7 days before the trip",
            "highlights": [
                "Explore the 6000-year-old Edakkal Caves in Wayanad",
                "Walk through the historic Kozhikode spice markets and SM Street",
                "Visit the majestic Bekal Fort — the largest fort in Kerala",
                "Overnight stay at a beach resort near Bekal",
                "Sunset at Kappad Beach — where Vasco da Gama first landed",
                "Cruise along the Valiyaparamba backwaters in Kasaragod"
            ],
            "itinerary": [
                {"day": 1, "title": "Arrival in Kozhikode — Drive to Wayanad", "description": "Pickup from Kozhikode airport/railway. Brief city tour — visit SM Street, the ancient spice market, and Kallayi timber port. Lunch at a traditional Kerala restaurant. Drive to Wayanad (2.5 hrs). Check into resort. Evening at leisure. Overnight at Wayanad."},
                {"day": 2, "title": "Wayanad Full Day", "description": "Early morning trek to Edakkal Caves. Breakfast at resort. Visit Pookode Lake, Lakkidi viewpoint, and Soochipara Waterfalls. Evening spice plantation tour. Overnight at Wayanad."},
                {"day": 3, "title": "Wayanad to Kozhikode to Bekal", "description": "Breakfast and checkout. Drive to Kozhikode (2.5 hrs). Visit Kappad Beach and the Pazhassiraja Museum. Lunch at a beachfront cafe. Continue drive to Bekal (2 hrs). Check into beach resort. Evening at Bekal Beach. Overnight at Bekal."},
                {"day": 4, "title": "Bekal Fort & Backwaters", "description": "Morning guided tour of the magnificent Bekal Fort overlooking the Arabian Sea. Breakfast at the fort cafe. Late morning Valiyaparamba backwater cruise with lunch onboard. Evening shopping at the local Bekal market for kasavu sarees and spices. Farewell dinner at the resort. Overnight at Bekal."},
                {"day": 5, "title": "Departure", "description": "Breakfast at the resort. Checkout. Drive to Mangalore International Airport (1.5 hrs) or Kozhikode airport (2.5 hrs) for departure. Tour ends."}
            ],
            "inclusions": [
                "4 nights accommodation — 2 in Wayanad, 2 in Bekal", "All breakfast and dinner meals",
                "Valiyaparamba backwater cruise with lunch", "Private AC vehicle throughout",
                "English-speaking guide for Wayanad and Bekal", "All permit charges",
                "Pickup from Kozhikode, drop-off at Mangalore/Kozhikode"
            ],
            "exclusions": [
                "Entry fees to Edakkal Caves and Bekal Fort", "Lunch on most days",
                "Personal expenses and shopping", "Camera fees at monuments",
                "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Which airport should I book for arrival and departure?", "a": "Arrive at Kozhikode (CCJ) and depart from Mangalore (IXE) for the most convenient route."},
                {"q": "Is this tour suitable for families?", "a": "Yes, the itinerary is family-friendly with a good mix of history, nature, and beach time."},
                {"q": "Can we extend the stay in Bekal?", "a": "Absolutely! Bekal's beaches are pristine and relaxing. We can arrange additional nights at the beach resort."}
            ]
        },
        {
            "id": 11, "title": "Misty Munnar Meditation & Yoga Retreat",
            "subtitle": "Spiritual Rejuvenation in the Tea Hills",
            "description": "Find your inner peace with daily sunrise meditation above the clouds, yoga sessions in spice gardens, and professional Ayurvedic spa treatments in the cool mountain climate of Munnar.",
            "price": 8499, "duration": "3 Days 2 Nights", "tag": "New", "featured": True,
            "category": "Meditation",
            "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
            "rating": 4.9, "reviews": 34,
            "max_people": 6,
            "difficulty": "Easy",
            "meeting_point": "Kochi Airport / Railway Station",
            "cancellation": "Free cancellation up to 48 hours before the trip",
            "highlights": [
                "Daily yoga and pranayama sessions with certified instructors",
                "Silent meditation walks through historic tea trails",
                "Sunrise meditation at Kolukkumalai Peak",
                "1-hour full body Ayurvedic Abhyanga massage session",
                "Organic vegetarian meals served on banana leaf"
            ],
            "itinerary": [
                {"day": 1, "title": "Arrival & Welcome Wellness", "description": "Pickup from Kochi. Drive to Munnar (3.5 hrs). Check into a tranquil hilltop wellness retreat. Welcome consultation with an Ayurvedic doctor. Afternoon gentle yoga session. Evening meditation and silent dinner. Overnight at retreat."},
                {"day": 2, "title": "Sunrise Meditation & Spa", "description": "Early morning Kolukkumalai sunrise meditation. Return for healthy breakfast. Silent walking meditation in tea gardens. Afternoon traditional Abhyanga oil massage session. Evening sound healing meditation. Overnight at retreat."},
                {"day": 3, "title": "Yoga & Departure", "description": "Morning Hatha Yoga session. Healthy breakfast. Closing meditation circle. Checkout and drive back to Kochi for drop-off by evening."}
            ],
            "inclusions": [
                "2 nights in a premium room at a wellness retreat",
                "All healthy vegetarian organic meals",
                "Daily yoga, meditation, and sound healing sessions",
                "1 professional Ayurvedic massage session per person",
                "Private AC transfers to and from Kochi"
            ],
            "exclusions": [
                "Personal wellness purchases and medications",
                "Tips and gratuities",
                "Anything not explicitly mentioned in inclusions"
            ],
            "faqs": [
                {"q": "Are beginners welcome for yoga and meditation?", "a": "Absolutely. Our certified teachers tailor all sessions to accommodate beginners as well as advanced practitioners."},
                {"q": "Is the diet strictly vegetarian?", "a": "Yes, we serve organic, detoxifying Ayurvedic vegetarian meals to complement your wellness journey."}
            ]
        },
        {
            "id": 12, "title": "Kolukkumalai Off-Road Jeep Safari",
            "subtitle": "Rugged Mountain Adventure",
            "description": "Hold on tight as you conquer the highest organic tea gardens in the world on a rugged 4x4 off-road jeep safari, followed by camping and sunrise above the clouds.",
            "price": 4499, "duration": "2 Days 1 Night", "tag": "Trending", "featured": True,
            "category": "Off Road",
            "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
            "rating": 4.9, "reviews": 92,
            "max_people": 12,
            "difficulty": "Hard",
            "meeting_point": "Munnar Town / Suryanelli",
            "cancellation": "Free cancellation up to 24 hours before the trip",
            "highlights": [
                "Rugged 4x4 jeep off-roading through steep mountain tracks",
                "Camp under the stars on a windy clifftop with a bonfire",
                "Breathtaking sunrise above the cloud bed at Kolukkumalai Peak",
                "Guided tour of the heritage 100-year-old tea factory",
                "Fresh hot cardamom tea brewed at the peak"
            ],
            "itinerary": [
                {"day": 1, "title": "Off-Road Safari & Camping", "description": "Meet at Suryanelli by 2 PM. Board the 4x4 safari jeeps. Scenic, bumpy 1-hour off-road ride up the steep cliffs of Kolukkumalai. Pitch tents at the campsite. Evening campfire with barbecue dinner, stargazing, and music. Overnight in tents."},
                {"day": 2, "title": "Sunrise & Tea Heritage", "description": "Wake up at 5 AM for a short trek to the sunrise point. Witness the sun rising above a thick blanket of clouds. Breakfast. Guided tour of the historic tea factory built in 1935. Off-road jeep descent back to Suryanelli by noon."}
            ],
            "inclusions": [
                "1 night clifftop camping in dual-sharing tents with sleeping bags",
                "Campfire dinner (barbecue + main course) and hot breakfast",
                "4x4 jeep safari transfers from Suryanelli to peak and back",
                "Guided tea factory tour and entry permit fees",
                "Qualified camp coordinator and safety equipment"
            ],
            "exclusions": [
                "Transfers from Kochi/other cities to Suryanelli",
                "Lunch on both days",
                "Tips and gratuities"
            ],
            "faqs": [
                {"q": "Is the off-road ride very bumpy?", "a": "Yes, the route is extremely rugged and rocky. It is not recommended for pregnant women or individuals with severe back issues."},
                {"q": "Are toilets available at the campsite?", "a": "Yes, clean basic western/eastern toilets are available at our base camp near the tents."}
            ]
        }
    ],
    "testimonials": [
        {"id": 1, "name": "Arjun & Sneha", "location": "Bangalore", "avatar_initials": "AS", "rating": 5,
         "quote": "Our Munnar honeymoon was perfectly organized. Every detail from the luxury resort stay to the private guides was handled flawlessly. Highly recommend Pranara!"},
        {"id": 2, "name": "Priya & Family", "location": "Chennai", "avatar_initials": "PF", "rating": 5,
         "quote": "The itinerary covered every beautiful place without feeling rushed. The houseboat in Alleppey and the tea estate walks in Munnar were outstanding highlights!"},
        {"id": 3, "name": "Vikram S.", "location": "Mumbai", "avatar_initials": "VS", "rating": 5,
         "quote": "Excellent hotels, smooth transport, and amazing support. The 24/7 travel coordination was incredibly comforting during our Poovar and Kovalam trip."},
        {"id": 4, "name": "Sarah & Thomas", "location": "London, UK", "avatar_initials": "ST", "rating": 5,
         "quote": "Absolutely top-notch service! Booking the Complete Kerala Tour was the best decision we made. The houseboat experience in Alleppey was dreamlike, and our driver was exceptionally professional."},
        {"id": 5, "name": "Rahul Verma", "location": "Delhi, India", "avatar_initials": "RV", "rating": 5,
         "quote": "Wayanad was beautiful! Edakkal Caves and Muthanga safari were perfectly organized. The local guides provided by Pranara really know their way around."},
        {"id": 6, "name": "Elena G.", "location": "Munich, Germany", "avatar_initials": "EG", "rating": 5,
         "quote": "Vagamon was a peaceful paradise. The pine forest walk was incredibly soothing, and the booking process was seamless. Excellent customer support!"},
    ],
    "destinations": [
        {"id": 1, "name": "Munnar", "description": "Lush green tea plantations, misty valleys, and cool mountain air.", "best_season": "Sept to May", "price": 4999, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=600&q=80"},
        {"id": 2, "name": "Alleppey", "description": "Cruising in traditional houseboats along scenic palm-fringed backwaters.", "best_season": "Oct to March", "price": 7999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80"},
        {"id": 3, "name": "Thekkady", "description": "Periyar national park wildlife safari and rich spice garden explorations.", "best_season": "Oct to April", "price": 5999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&q=80"},
        {"id": 4, "name": "Wayanad", "description": "Waterfalls, ancient caves, tea estates, and wild elephant sightings.", "best_season": "Oct to May", "price": 6499, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80"},
        {"id": 5, "name": "Vagamon", "description": "Pine forests, green meadows, paragliding, and absolute serenity.", "best_season": "Sept to May", "price": 3999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80"},
        {"id": 6, "name": "Kochi", "description": "Historical port town showcasing Portuguese, Dutch, and British history.", "best_season": "Oct to April", "price": 2999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80"},
        {"id": 7, "name": "Kumarakom", "description": "Vembanad Lake luxury bird watching, houseboat stays, and lagoons.", "best_season": "Nov to Feb", "price": 8999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80"},
        {"id": 8, "name": "Varkala", "description": "Unique seaside cliffs, golden beaches, and spiritual beach culture.", "best_season": "Oct to March", "price": 5499, "duration": "3 Days", "image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80"},
        {"id": 9, "name": "Kovalam", "description": "Iconic lighthouse beach, curved bays, and shallow water swimming.", "best_season": "Sept to March", "price": 5999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80"},
        {"id": 10, "name": "Athirappilly", "description": "The majestic Niagara waterfalls of India set in deep green forests.", "best_season": "June to Nov", "price": 3499, "duration": "1 Day", "image_url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80"},
        {"id": 11, "name": "Poovar", "description": "Where the lake, river, sea, and beach meet in a beautiful delta.", "best_season": "Oct to April", "price": 6999, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1577717903312-2c86c5a9c20e?w=600&q=80"},
        {"id": 12, "name": "Bekal", "description": "Keyhole-shaped historical fort and pristine untouched Northern beaches.", "best_season": "Oct to May", "price": 8499, "duration": "2 Days", "image_url": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"}
    ],
    "experiences": [
        {"id": 1, "title": "Tea Plantation Walk", "description": "Walk among the lush tea estates of Munnar, learn about the processing, and taste fresh tea."},
        {"id": 2, "title": "Houseboat Stay", "description": "Unwind in a luxurious wooden Kettuvallam and drift along Alleppey's backwaters."},
        {"id": 3, "title": "Jeep Safari", "description": "High-altitude off-roading in Kolukkumalai to reach the highest organic tea gardens in the world."},
        {"id": 4, "title": "Spice Garden Tour", "description": "Discover cardamom, cinnamon, pepper, and vanilla plants in their natural habitat in Thekkady."},
        {"id": 5, "title": "Waterfall Trekking", "description": "Trek through forested streams to hidden waterfalls, safe for swimming and exploring."},
        {"id": 6, "title": "Wildlife Safari", "description": "Take a boat cruise or guided trek to spot elephants, bisons, and Nilgiri tahrs in Periyar."},
        {"id": 7, "title": "Kathakali Show", "description": "Witness the vibrant and intense classical dance-drama of Kerala performed by local masters."},
        {"id": 8, "title": "Ayurvedic Spa", "description": "Indulge in authentic rejuvenating herbal massages and wellness treatments by experts."},
        {"id": 9, "title": "Bamboo Rafting", "description": "A tranquil rafting and trekking experience along the reserve lakes of Thekkady and Wayanad."},
        {"id": 10, "title": "Sunrise Viewpoints", "description": "Stand above the clouds at Top Station or Kolukkumalai for a golden sunrise."},
        {"id": 11, "title": "Camping", "description": "Sleep under the stars on misty hilltops in Munnar or Vagamon with a cozy campfire."},
        {"id": 12, "title": "Zipline Adventure", "description": "Fly over lush green valleys and tea gardens on Kerala's longest zipline courses."}
    ],
    "attractions": [
        {"id": 1, "name": "Kolukkumalai Sunrise", "description": "Highest tea estate with panoramic sunrise views above the cloud bed.", "destination": "Munnar"},
        {"id": 2, "name": "Mattupetty Dam", "description": "Beautiful lake with speedboating and nearby green pastures.", "destination": "Munnar"},
        {"id": 3, "name": "Echo Point", "description": "Natural echo phenomenon along the misty lake shores.", "destination": "Munnar"},
        {"id": 4, "name": "Top Station", "description": "Highest point in Munnar offering a 360-degree view of Tamil Nadu plains.", "destination": "Munnar"},
        {"id": 5, "name": "Eravikulam National Park", "description": "Sanctuary for the endangered Nilgiri Tahr mountain goat.", "destination": "Munnar"},
        {"id": 6, "name": "Tea Museum", "description": "Trace the history and machinery of tea processing in Munnar since the 1880s.", "destination": "Munnar"},
        {"id": 7, "name": "Kundala Lake", "description": "Pedal boats and Kashmiri-style Shikara boat rides surrounded by hills.", "destination": "Munnar"},
        {"id": 8, "name": "Attukad Waterfalls", "description": "Roaring waterfall nestled between steep hills and tea estates.", "destination": "Munnar"},
        {"id": 9, "name": "Blossom Park", "description": "Lush gardens, cycling tracks, and beautiful flower exhibits.", "destination": "Munnar"},
        {"id": 10, "name": "Chinnar Wildlife Sanctuary", "description": "Dry deciduous scrub forest home to grizzly giant squirrels.", "destination": "Munnar"}
    ],
    "bookings": [],
    "gallery": [
        {"id": 1, "image_url": "/assets/munnar_kolukkumalai.png", "caption": "Kolukkumalai Sunrise Viewpoint", "source": "manual"},
        {"id": 2, "image_url": "/assets/munnar_top_station.png", "caption": "Top Station Panoramic Valley", "source": "manual"},
        {"id": 3, "image_url": "/assets/munnar_eravikulam.png", "caption": "Eravikulam National Park", "source": "manual"},
        {"id": 4, "image_url": "/assets/munnar_mattupetty.png", "caption": "Mattupetty Dam & Lake", "source": "manual"},
        {"id": 5, "image_url": "/assets/munnar_echo_point.png", "caption": "Misty Lake Echo Point", "source": "manual"},
        {"id": 6, "image_url": "/assets/munnar_kundala.png", "caption": "Shikara Ride at Kundala Lake", "source": "manual"},
        {"id": 7, "image_url": "/assets/munnar_attukad.png", "caption": "Attukad Waterfalls", "source": "manual"},
        {"id": 8, "image_url": "/assets/munnar_tea_museum.png", "caption": "Munnar Tea Estate Garden", "source": "manual"},
    ],
    "contact_messages": [],
    "_next_id": {"tours": 13, "testimonials": 7, "bookings": 1, "gallery": 11, "contact_messages": 1},
}

_fallback_gallery_instagram = []

# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------
def json_response(data, status=200):
    return jsonify({"success": True, "data": data}), status


def error_response(message, status=400):
    return jsonify({"success": False, "error": message}), status


# ---------------------------------------------------------------------------
# API Routes - Health
# ---------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health_check():
    return json_response({
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "supabase": Config.has_supabase(),
        "instagram_profile": Config.INSTAGRAM_PROFILE,
    })


_tours_db_outdated = None


def check_tours_db_status():
    global _tours_db_outdated
    if _tours_db_outdated is not None:
        return _tours_db_outdated
    
    sb = get_supabase()
    if not sb:
        _tours_db_outdated = True
        return _tours_db_outdated
    
    try:
        resp = sb.table("tours").select("id, category").execute()
        data = resp.data or []
        if len(data) < len(_fallback_db["tours"]):
            logger.warning(f"Supabase tours table has only {len(data)} rows (expected at least {len(_fallback_db['tours'])}). Using fallback database.")
            _tours_db_outdated = True
        elif any(t.get("category") is None for t in data):
            logger.warning("Supabase tours table has None values in category column. Using fallback database.")
            _tours_db_outdated = True
        else:
            _tours_db_outdated = False
    except Exception as e:
        logger.error(f"Failed to check Supabase tours status: {e}")
        _tours_db_outdated = True
        
    return _tours_db_outdated


# ---------------------------------------------------------------------------
# API Routes - Tours
# ---------------------------------------------------------------------------
@app.route("/api/tours", methods=["GET"])
def get_tours():
    if not check_tours_db_status():
        table = db_table("tours")
        if table:
            try:
                resp = table.select("*").order("id").execute()
                return json_response(resp.data)
            except Exception as e:
                logger.error(f"Supabase tours query error: {e}")
    
    # Fallback
    return json_response(_fallback_db["tours"])


@app.route("/api/tours/<int:tour_id>", methods=["GET"])
def get_tour(tour_id):
    if not check_tours_db_status():
        table = db_table("tours")
        if table:
            try:
                resp = table.select("*").eq("id", tour_id).execute()
                if resp.data:
                    return json_response(resp.data[0])
            except Exception as e:
                logger.error(f"Supabase tour query error: {e}")
    
    # Fallback
    tour = next((t for t in _fallback_db["tours"] if t["id"] == tour_id), None)
    if tour:
        return json_response(tour)
    return error_response("Tour not found", 404)


# ---------------------------------------------------------------------------
# API Routes - Testimonials
# ---------------------------------------------------------------------------
@app.route("/api/testimonials", methods=["GET"])
def get_testimonials():
    table = db_table("testimonials")
    if table:
        try:
            resp = table.select("*").eq("active", True).order("id").execute()
            return json_response(resp.data)
        except Exception as e:
            logger.error(f"Supabase testimonials query error: {e}")
    
    return json_response(_fallback_db["testimonials"])


# ---------------------------------------------------------------------------
# API Routes - Destinations, Experiences, Attractions
# ---------------------------------------------------------------------------
@app.route("/api/destinations", methods=["GET"])
def get_destinations():
    table = db_table("destinations")
    if table:
        try:
            resp = table.select("*").order("id").execute()
            return json_response(resp.data)
        except Exception as e:
            logger.error(f"Supabase destinations query error: {e}")
    return json_response(_fallback_db["destinations"])


@app.route("/api/experiences", methods=["GET"])
def get_experiences():
    table = db_table("experiences")
    if table:
        try:
            resp = table.select("*").order("id").execute()
            return json_response(resp.data)
        except Exception as e:
            logger.error(f"Supabase experiences query error: {e}")
    return json_response(_fallback_db["experiences"])


@app.route("/api/attractions", methods=["GET"])
def get_attractions():
    table = db_table("attractions")
    if table:
        try:
            resp = table.select("*").order("id").execute()
            return json_response(resp.data)
        except Exception as e:
            logger.error(f"Supabase attractions query error: {e}")
    return json_response(_fallback_db["attractions"])


# ---------------------------------------------------------------------------
# API Routes - Gallery
# ---------------------------------------------------------------------------
@app.route("/api/gallery", methods=["GET"])
def get_gallery():
    """Get all gallery images including Instagram-synced ones."""
    table = db_table("gallery")
    all_images = []
    
    if table:
        try:
            resp = table.select("*").order("created_at", desc=True).execute()
            all_images = resp.data or []
        except Exception as e:
            logger.error(f"Supabase gallery query error: {e}")
    
    if not all_images:
        # Combine manual + instagram fallback
        all_images = list(_fallback_db["gallery"])
        all_images.extend(_fallback_gallery_instagram)
    
    return json_response(all_images)


@app.route("/api/gallery/instagram/sync", methods=["GET", "POST"])
def sync_instagram_gallery():
    """
    GET: Scrape Instagram profile for recent posts and return them.
    POST: Add Instagram post URLs to the gallery database.
    
    POST Body: { "post_urls": ["https://instagram.com/p/...", ...] }
    """
    username = Config.INSTAGRAM_PROFILE
    
    if request.method == "GET":
        username = request.args.get("profile", username)
        logger.info(f"Scraping Instagram profile: @{username}")
        
        posts = scrape_profile_posts(username, limit=12)
        
        if not posts:
            logger.warning(f"No posts found for @{username}")
            # Try single oembed as fallback
            embed_data = fetch_profile_embed(username)
            if embed_data:
                return json_response({
                    "message": f"Profile data for @{username}",
                    "posts": [],
                    "profile": embed_data,
                })
            return json_response({"posts": [], "message": f"No posts found for @{username}. The profile may be private or Instagram is blocking requests."})
        
        formatted = []
        for post in posts:
            entry = format_instagram_post(post)
            # Try to get better caption via oEmbed
            if post.get("shortcode"):
                oembed = fetch_oembed_data(f"https://www.instagram.com/p/{post['shortcode']}/")
                if oembed and oembed.get("thumbnail_url"):
                    entry["image_url"] = oembed["thumbnail_url"]
                    entry["thumbnail_url"] = oembed["thumbnail_url"]
                if oembed and oembed.get("title"):
                    entry["caption"] = oembed["title"][:300]
            formatted.append(entry)
        
        # Store in fallback for GET /api/gallery
        global _fallback_gallery_instagram
        _fallback_gallery_instagram = formatted
        
        # Also store in Supabase if available
        table = db_table("gallery")
        if table:
            for entry in formatted:
                try:
                    exists = table.select("id").eq("instagram_post_id", entry.get("instagram_post_id")).execute()
                    if not exists.data:
                        table.insert(entry).execute()
                except Exception as e:
                    logger.warning(f"Failed to store gallery entry: {e}")
        
        return json_response({
            "message": f"Synced {len(formatted)} posts from @{username}",
            "count": len(formatted),
            "posts": formatted,
            "profile": {"username": username},
        })
    
    # POST: Add specific Instagram URLs
    data = request.get_json(silent=True) or {}
    post_urls = data.get("post_urls", [])
    
    if not post_urls:
        return error_response("Provide 'post_urls' array with Instagram post URLs")
    
    added = []
    for url in post_urls:
        shortcode = extract_shortcode(url)
        if not shortcode:
            continue
        
        oembed_data = fetch_oembed_data(url)
        entry = {
            "image_url": oembed_data.get("thumbnail_url", "") if oembed_data else "",
            "thumbnail_url": oembed_data.get("thumbnail_url", "") if oembed_data else "",
            "caption": oembed_data.get("title", "Instagram Post")[:300] if oembed_data else "Instagram Post",
            "source": "instagram",
            "instagram_url": url,
            "instagram_post_id": shortcode,
        }
        
        table = db_table("gallery")
        if table:
            try:
                exists = table.select("id").eq("instagram_post_id", shortcode).execute()
                if not exists.data:
                    result = table.insert(entry).execute()
                    if result.data:
                        entry["id"] = result.data[0].get("id")
            except Exception as e:
                logger.warning(f"Failed to insert gallery entry: {e}")
        else:
            _fallback_gallery_instagram.append(entry)
        
        added.append(entry)
    
    return json_response({"message": f"Added {len(added)} Instagram posts", "count": len(added), "posts": added})


# ---------------------------------------------------------------------------
# API Routes - Bookings
# ---------------------------------------------------------------------------
@app.route("/api/bookings", methods=["GET", "POST"])
def handle_bookings():
    if request.method == "GET":
        table = db_table("bookings")
        if table:
            try:
                resp = table.select("*").order("created_at", desc=True).execute()
                return json_response(resp.data)
            except Exception as e:
                logger.error(f"Supabase bookings query error: {e}")
        return json_response(_fallback_db["bookings"])
    
    # POST - create booking
    data = request.get_json(silent=True) or {}
    
    required = ["name", "phone", "email"]
    for field in required:
        if not data.get(field):
            return error_response(f"'{field}' is required")
    
    booking = {
        "name": data["name"],
        "phone": data["phone"],
        "email": data["email"],
        "tour": data.get("tour", ""),
        "people": data.get("people", "2"),
        "preferred_date": data.get("date") or data.get("preferred_date"),
        "message": data.get("message", ""),
        "status": "pending",
        "created_at": datetime.utcnow().isoformat(),
    }
    
    table = db_table("bookings")
    if table:
        try:
            resp = table.insert(booking).execute()
            if resp.data:
                return json_response({"message": "Booking created successfully", "booking": resp.data[0]}, 201)
        except Exception as e:
            logger.error(f"Supabase booking insert error: {e}")
            return error_response(f"Failed to save booking: {str(e)}", 500)
    
    # Fallback
    bid = _fallback_db["_next_id"]["bookings"]
    _fallback_db["_next_id"]["bookings"] = bid + 1
    booking["id"] = bid
    _fallback_db["bookings"].append(booking)
    
    return json_response({"message": "Booking created successfully", "booking": booking}, 201)


# ---------------------------------------------------------------------------
# API Routes - Contact
# ---------------------------------------------------------------------------
@app.route("/api/contact", methods=["POST"])
def submit_contact():
    data = request.get_json(silent=True) or {}
    
    if not data.get("name") or not data.get("message"):
        return error_response("'name' and 'message' are required")
    
    entry = {
        "name": data["name"],
        "email": data.get("email", ""),
        "phone": data.get("phone", ""),
        "message": data["message"],
        "created_at": datetime.utcnow().isoformat(),
    }
    
    table = db_table("contact_messages")
    if table:
        try:
            resp = table.insert(entry).execute()
            if resp.data:
                return json_response({"message": "Message sent successfully"}, 201)
        except Exception as e:
            logger.error(f"Supabase contact insert error: {e}")
    
    # Fallback
    cid = _fallback_db["_next_id"]["contact_messages"]
    _fallback_db["_next_id"]["contact_messages"] = cid + 1
    entry["id"] = cid
    _fallback_db["contact_messages"].append(entry)
    
    return json_response({"message": "Message sent successfully"}, 201)


# ---------------------------------------------------------------------------
# Instagram Feed Data (for the /instagram route)
# ---------------------------------------------------------------------------
@app.route("/api/instagram/profile", methods=["GET"])
def get_instagram_profile():
    """Get Instagram profile info for embedding."""
    username = request.args.get("profile", Config.INSTAGRAM_PROFILE)
    
    profile_info = fetch_profile_embed(username)
    
    return json_response({
        "username": username,
        "profile_url": f"https://www.instagram.com/{username}/",
        "profile_info": profile_info,
    })


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------
@app.errorhandler(404)
def not_found(e):
    return error_response("Not found", 404)


@app.errorhandler(500)
def server_error(e):
    logger.exception("Internal server error")
    return error_response("Internal server error", 500)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    port = Config.PORT
    debug = Config.DEBUG
    logger.info(f"Starting Pranara Tours API on port {port} (debug={debug})")
    logger.info(f"Supabase: {'configured' if Config.has_supabase() else 'NOT configured (using fallback)'}")
    logger.info(f"Instagram profile: @{Config.INSTAGRAM_PROFILE}")
    
    app.run(host="0.0.0.0", port=port, debug=debug)
