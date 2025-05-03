"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";

export default function LocationPage() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    let map: google.maps.Map | null = null;
    let autocomplete: google.maps.places.Autocomplete | null = null;
    let marker: google.maps.Marker | null = null;

    const initMap = async () => {
      try {
        if (!mapContainerRef.current) return;

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();

        // Create a new div for the map
        const mapDiv = document.createElement("div");
        mapDiv.style.width = "100%";
        mapDiv.style.height = "100%";
        mapContainerRef.current.appendChild(mapDiv);

        // Initialize map
        map = new google.maps.Map(mapDiv, {
          center: { lat: 37.0902, lng: -95.7129 },
          zoom: 4,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Initialize Autocomplete
        if (inputRef.current) {
          autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ["(cities)"],
            componentRestrictions: { country: "us" },
          });

          // Handle place selection
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete?.getPlace();
            if (place?.geometry?.location && map) {
              const location = place.geometry.location;
              map.setCenter(location);
              map.setZoom(12);

              // Remove existing marker if it exists
              if (marker) {
                marker.setMap(null);
              }

              // Create new marker
              marker = new google.maps.Marker({
                position: location,
                map: map,
                animation: google.maps.Animation.DROP,
              });
              setLocation(place.formatted_address || "");
              setError(null);
            }
          });
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err);
        setError("Failed to load map. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
      if (map) {
        google.maps.event.clearInstanceListeners(map);
      }
      // Clear the map container
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      // TODO: Save location to state/backend
      console.log("Location submitted:", location);
      router.push("/onboarding/your-info/bio");
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
              ref={mapContainerRef}
              className="w-full h-48 bg-gray-100 rounded-lg mb-4 relative"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Location Input */}
            <div>
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black"
                placeholder="Enter your city"
                required
                autoFocus
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!location.trim() || isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                location.trim() && !isLoading
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
