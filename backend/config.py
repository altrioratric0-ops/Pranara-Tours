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
    SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ltfxccotueashelcohnh.supabase.co")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnhjY290dWVhc2hlbGNvaG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTA4NTksImV4cCI6MjA3Mjk4Njg1OX0.JzFf6B9h8jU_rX1m0fMvN5yH7wS0a-Q3yJdJg1L2oM0")
    
    # Instagram
    INSTAGRAM_PROFILE = os.getenv("INSTAGRAM_PROFILE", "pranara_co")
    
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "pranara-tours-dev-key-change-in-production")
    PORT = int(os.getenv("FLASK_PORT", "5000"))
    DEBUG = os.getenv("FLASK_ENV", "development") == "development"
    
    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000,https://pranara13.vercel.app")
    
    # Notifications
    NOTIFICATION_PHONES = [p.strip() for p in os.getenv("NOTIFICATION_PHONES", "+917397532574").split(",") if p.strip()]
    
    @classmethod
    def has_supabase(cls):
        return bool(cls.SUPABASE_URL and cls.SUPABASE_ANON_KEY)
