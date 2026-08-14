import os
from functools import wraps
from flask import request, jsonify
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    project_id = os.getenv("FIREBASE_PROJECT_ID")
    client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
    private_key = os.getenv("FIREBASE_PRIVATE_KEY")

    if private_key:
        # Convert escaped newlines back to actual newlines
        private_key = private_key.replace("\\n", "\n")

    if project_id and client_email and private_key:
        try:
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": project_id,
                "private_key": private_key,
                "client_email": client_email,
                "token_uri": "https://oauth2.googleapis.com/token",
            })
            firebase_admin.initialize_app(cred)
            print("Firebase Admin initialized successfully.")
        except Exception as e:
            print(f"Error initializing Firebase Admin: {e}")
    else:
        print("Warning: Firebase Admin environment variables are missing. Firebase Auth will not be active.")

def firebase_required(f):
    """Decorator to protect Flask routes with Firebase Authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = None
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Unauthorized: No token provided"}), 401

        try:
            decoded_token = auth.verify_id_token(token)
            # Make decoded user info available to the Flask request
            request.user = decoded_token
            # Map clerk_user_id to the Firebase UID to support existing database schema
            request.clerk_user_id = decoded_token.get("uid")
        except Exception as e:
            return jsonify({"error": f"Unauthorized: Invalid or expired token: {str(e)}"}), 401

        return f(*args, **kwargs)
    return decorated
