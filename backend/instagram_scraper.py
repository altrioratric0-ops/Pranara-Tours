"""
Instagram integration module for Pranara Tours.
Fetches posts from public Instagram profiles using:
1. Instagram oEmbed API (for individual post embeds)
2. Web scraping fallback (for profile post list)

Both methods work without authentication for public profiles.
"""

import re
import json
import logging
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

# Instagram oEmbed endpoint
OEMBED_URL = "https://www.instagram.com/p/{shortcode}/embed/captioned/"
OEMBED_API = "https://api.instagram.com/oembed?url={url}"
PROFILE_URL = "https://www.instagram.com/{username}/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def extract_shortcode(url):
    """Extract Instagram post shortcode from a URL."""
    patterns = [
        r'instagram\.com/p/([^/?]+)',
        r'instagram\.com/reel/([^/?]+)',
        r'instagram\.com/tv/([^/?]+)',
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def fetch_oembed_data(post_url):
    """Fetch post data via Instagram oEmbed API (no auth required)."""
    try:
        resp = requests.get(
            OEMBED_API.format(url=post_url),
            headers=HEADERS,
            timeout=10
        )
        if resp.status_code == 200:
            data = resp.json()
            return {
                "title": data.get("title", ""),
                "author_name": data.get("author_name", ""),
                "thumbnail_url": data.get("thumbnail_url", ""),
                "html": data.get("html", ""),
                "width": data.get("width"),
                "height": data.get("height"),
            }
        else:
            logger.warning(f"oEmbed API returned {resp.status_code} for {post_url}")
            return None
    except Exception as e:
        logger.error(f"oEmbed fetch error: {e}")
        return None


def scrape_profile_posts(username, limit=12):
    """
    Scrape recent posts from a public Instagram profile.
    Returns a list of post data dicts.
    
    Note: Instagram may block scraping. This is a best-effort approach.
    """
    try:
        url = PROFILE_URL.format(username=username)
        resp = requests.get(url, headers=HEADERS, timeout=15)
        
        if resp.status_code != 200:
            logger.warning(f"Instagram profile fetch returned {resp.status_code}")
            return []
        
        # Try to extract the JSON data embedded in the page
        soup = BeautifulSoup(resp.text, 'lxml')
        
        # Look for the sharedData script
        patterns = [
            r'window\._sharedData\s*=\s*({.*?});',
            r'<script[^>]*type="application/json"[^>]*>([^<]+)</script>',
            r'__NEXT_DATA__\s*=\s*({.*?});',
        ]
        
        posts = []
        
        for pattern in patterns:
            match = re.search(pattern, resp.text, re.DOTALL)
            if match:
                try:
                    data = json.loads(match.group(1))
                    # Navigate to find posts
                    edges = (
                        data.get('entry_data', {})
                        .get('ProfilePage', [{}])[0]
                        .get('graphql', {})
                        .get('user', {})
                        .get('edge_owner_to_timeline_media', {})
                        .get('edges', [])
                    )
                    for edge in edges[:limit]:
                        node = edge.get('node', {})
                        post = {
                            'id': node.get('id'),
                            'shortcode': node.get('shortcode'),
                            'caption': (
                                node.get('edge_media_to_caption', {})
                                .get('edges', [{}])[0]
                                .get('node', {})
                                .get('text', '')
                            ),
                            'image_url': node.get('display_url'),
                            'thumbnail_url': node.get('thumbnail_src'),
                            'likes': node.get('edge_media_preview_like', {}).get('count', 0),
                            'comments': node.get('edge_media_to_comment', {}).get('count', 0),
                            'timestamp': node.get('taken_at_timestamp'),
                            'is_video': node.get('is_video', False),
                            'video_url': node.get('video_url') if node.get('is_video') else None,
                        }
                        posts.append(post)
                    if posts:
                        break
                except (json.JSONDecodeError, KeyError, IndexError) as e:
                    logger.warning(f"Failed to parse Instagram data: {e}")
                    continue
        
        if not posts:
            # Fallback: try to find image URLs directly in the HTML
            logger.info("Trying HTML-based fallback extraction")
            img_tags = soup.find_all('img', {'src': re.compile(r'instagram\.com|cdninstagram\.com')})
            seen = set()
            for img in img_tags[:limit]:
                src = img.get('src')
                if src and src not in seen and 'profile' not in src:
                    seen.add(src)
                    alt = img.get('alt', '')
                    posts.append({
                        'image_url': src,
                        'thumbnail_url': src,
                        'caption': alt[:200] if alt else 'Instagram Post',
                        'shortcode': None,
                    })
        
        return posts
        
    except requests.RequestException as e:
        logger.error(f"Instagram scraping error: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected scraping error: {e}")
        return []


def fetch_profile_embed(username):
    """
    Fetch Instagram profile embed/follow widget.
    Uses the oEmbed-like approach for profile info.
    """
    try:
        url = PROFILE_URL.format(username=username)
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return None
        
        # Try to extract basic profile info
        soup = BeautifulSoup(resp.text, 'lxml')
        
        meta_desc = soup.find('meta', {'name': 'description'})
        description = meta_desc.get('content', '') if meta_desc else ''
        
        og_image = soup.find('meta', {'property': 'og:image'})
        profile_pic = og_image.get('content', '') if og_image else ''
        
        return {
            'username': username,
            'profile_url': url,
            'description': description,
            'profile_pic': profile_pic,
        }
    except Exception as e:
        logger.error(f"Profile embed fetch error: {e}")
        return None


def format_instagram_post(post_data):
    """Format Instagram post data into a standard gallery entry."""
    caption = post_data.get('caption', '')
    shortcode = post_data.get('shortcode')
    
    return {
        'image_url': post_data.get('image_url', ''),
        'thumbnail_url': post_data.get('thumbnail_url', post_data.get('image_url', '')),
        'caption': caption[:300] if caption else 'Instagram Post',
        'source': 'instagram',
        'instagram_url': f"https://www.instagram.com/p/{shortcode}/" if shortcode else None,
        'instagram_post_id': post_data.get('id') or shortcode,
    }
