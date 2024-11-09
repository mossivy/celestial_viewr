from pymongo import MongoClient
from django.conf import settings

MONGO_CLIENT = settings.MONGO_CLIENT
MONGO_DB_NAME = settings.MONGO_DB_NAME

try:
    MONGO_CLIENT.admin.command('ping')
    print("MongoDB connection successful!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")


mongo_db = MONGO_CLIENT[MONGO_DB_NAME]

def get_planet_collection():
    planets_collection = mongo_db["planets"]
    return planets_collection    



