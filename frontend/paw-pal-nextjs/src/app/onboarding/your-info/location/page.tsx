"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";

export default function LocationPage() {
  const [location, setLocation] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });
        setMap(newMap);
      }
    });
  }, []);

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLocation = e.target.value;
    setLocation(newLocation);

    if (newLocation.trim() && map) {
      const geocoder = new google.maps.Geocoder();
      try {
        const response = await geocoder.geocode({ address: newLocation });
        if (response.results[0]) {
          const location = response.results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(12);

          // Remove existing marker if it exists
          if (marker) {
            marker.setMap(null);
          }

          // Create new marker
          const newMarker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP,
          });
          setMarker(newMarker);
        }
      } catch (error) {
        console.error("Error geocoding:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      // TODO: Save location to state/backend
      console.log("Location submitted:", location);
      router.push("/onboarding/your-info/birthday");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center py-6">
        <h1 className="text-3xl font-bold text-black">Paw Pal</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-black text-center mb-2">
            Where are you located?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            This helps us find matches near you
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Map Preview */}
            <div
              ref={mapRef}
              className="w-full h-48 bg-gray-100 rounded-lg mb-4"
            />

            {/* Location Input */}
            <div>
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black"
                placeholder="Enter your location"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!location.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                location.trim()
                  ? "bg-amber-700 text-white hover:bg-amber-800"
                  : "bg-amber-700 text-white opacity-50 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
