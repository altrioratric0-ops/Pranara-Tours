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
            "description": "A quick escape to the misty tea gardens, viewpoints, and waterfalls of Munnar. Perfect for weekend travelers.",
            "price": 4999, "duration": "2 Days 1 Night", "tag": "Weekend Gateway", "featured": True,
            "image_url": "/assets/tour_munnar.png",
        },
        {
            "id": 2, "title": "Munnar + Thekkady",
            "description": "Explore the rolling hills of Munnar combined with wildlife safari, spice plantation tours, and boating in Thekkady.",
            "price": 7999, "duration": "3 Days 2 Nights", "tag": "Popular", "featured": True,
            "image_url": "/assets/tour_thekkady.png",
        },
        {
            "id": 3, "title": "Munnar + Alleppey",
            "description": "The quintessential Kerala tour. Walk the misty hills of Munnar and stay overnight in a premium houseboat on Alleppey's backwaters.",
            "price": 11999, "duration": "4 Days 3 Nights", "tag": "Trending", "featured": True,
            "image_url": "/assets/tour_alleppey.png",
        },
        {
            "id": 4, "title": "Complete Kerala Tour",
            "description": "A comprehensive journey covering Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and the stunning beaches of Varkala and Kovalam.",
            "price": 24999, "duration": "7 Days 6 Nights", "tag": "Best Value", "featured": True,
            "image_url": "/assets/tour_kerala.png",
        },
    ],
    "testimonials": [
        {"id": 1, "name": "Arjun & Sneha", "location": "Bangalore", "avatar_initials": "AS", "rating": 5,
         "quote": "Our Munnar honeymoon was perfectly organized. Every detail from the luxury resort stay to the private guides was handled flawlessly. Highly recommend Pranara!"},
        {"id": 2, "name": "Priya & Family", "location": "Chennai", "avatar_initials": "PF", "rating": 5,
         "quote": "The itinerary covered every beautiful place without feeling rushed. The houseboat in Alleppey and the tea estate walks in Munnar were outstanding highlights!"},
        {"id": 3, "name": "Vikram S.", "location": "Mumbai", "avatar_initials": "VS", "rating": 5,
         "quote": "Excellent hotels, smooth transport, and amazing support. The 24/7 travel coordination was incredibly comforting during our Poovar and Kovalam trip."},
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
        {"id": 1, "image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf4?w=800&q=80", "caption": "Lush Tea Estates of Munnar", "source": "manual"},
        {"id": 2, "image_url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80", "caption": "Houseboats in Alleppey Backwaters", "source": "manual"},
        {"id": 3, "image_url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80", "caption": "Majestic Athirappilly Waterfalls", "source": "manual"},
        {"id": 4, "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", "caption": "Serene Wayanad Hills", "source": "manual"},
        {"id": 5, "image_url": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80", "caption": "Deep Pine Forests of Vagamon", "source": "manual"},
        {"id": 6, "image_url": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80", "caption": "Periyar Wildlife Sanctuary Sanctuary", "source": "manual"},
        {"id": 7, "image_url": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80", "caption": "Traditional Kerala Cuisine on Banana Leaf", "source": "manual"},
        {"id": 8, "image_url": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", "caption": "Hilltop Campfire and Stargazing", "source": "manual"},
        {"id": 9, "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", "caption": "Kolukkumalai Offroad Jeep Ride", "source": "manual"},
        {"id": 10, "image_url": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80", "caption": "Spectacular Western Ghats Sunrise", "source": "manual"},
    ],
    "contact_messages": [],
    "_next_id": {"tours": 5, "testimonials": 4, "bookings": 1, "gallery": 11, "contact_messages": 1},
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


# ---------------------------------------------------------------------------
# API Routes - Tours
# ---------------------------------------------------------------------------
@app.route("/api/tours", methods=["GET"])
def get_tours():
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
    table = db_table("tours")
    if table:
        try:
            resp = table.select("*").eq("id", tour_id).execute()
            if resp.data:
                return json_response(resp.data[0])
            return error_response("Tour not found", 404)
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
