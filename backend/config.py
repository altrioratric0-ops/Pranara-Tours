"""
Configuration module for Pranara Tours backend.
Loads settings from environment variables with sensible defaults.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration."""
    
    # Supabase
    SUPABASE_URL = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
    
    # Instagram
    INSTAGRAM_PROFILE = os.getenv("INSTAGRAM_PROFILE", "pranara_co")
    
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "pranara-tours-dev-key-change-in-production")
    PORT = int(os.getenv("FLASK_PORT", "5000"))
    DEBUG = os.getenv("FLASK_ENV", "development") == "development"
    
    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
    
    @classmethod
    def has_supabase(cls):
        return bool(cls.SUPABASE_URL and cls.SUPABASE_ANON_KEY)
