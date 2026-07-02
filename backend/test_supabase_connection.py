"""Test Supabase connection and check existing tables."""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

try:
    from supabase import create_client
except ImportError:
    print("FAIL: supabase package not installed")
    sys.exit(1)

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_ANON_KEY")

if not URL or not KEY:
    print("FAIL: SUPABASE_URL or SUPABASE_ANON_KEY not set in .env")
    sys.exit(1)

sb = create_client(URL, KEY)

tables_to_check = ["tours", "testimonials", "gallery_images", "bookings", "instagram_posts"]

for table in tables_to_check:
    try:
        resp = sb.table(table).select("*", count="exact").limit(1).execute()
        count = resp.count if hasattr(resp, 'count') else len(resp.data) if resp.data else 0
        print(f"OK: {table} exists — {count} rows")
    except Exception as e:
        err = str(e)
        if "relation" in err and "does not exist" in err:
            print(f"MISSING: {table} — table does not exist")
        elif "permission denied" in err.lower() or "policy" in err.lower():
            print(f"RESTRICTED: {table} — {err[:100]}")
        else:
            print(f"ERROR: {table} — {err[:150]}")
