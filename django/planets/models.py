from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['solar_system_db']
planets_collection = db['planets']

planet_data = {
    "name": "Earth",
    "description": "Third planet from the Sun.",
    "radius": 6371,  # in km
    "distance_from_sun": 1,  # in AU
    "image_url": "https://example.com/earth.jpg"
}

planets_collection.insert_one(planet_data)

