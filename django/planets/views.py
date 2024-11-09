from django.shortcuts import render
from django.http import JsonResponse
from .db_connection import get_planet_collection

def planet_list(req):
    try:
        collection = get_planet_collection()

        #fetch all planets
        planets = collection.find()

        planet_data = []
        for planet in planets:
            planet_data.append({
                "name": planet.get("name"),
                "type": planet.get("type"),
                "mass": planet.get("basic_properties", {}).get("mass"),
            })
        return JsonResponse(planet_data, safe=False)
    except Exception as e:
        print(f"error connecting to mongo: {e}")
        return JsonResponse({"error": "Failed to connect to MongoDB"}, status=500)


        
