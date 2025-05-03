"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";

export default function LocationPage() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initAutocomplete = async () => {
      try {
        if (!inputRef.current) return;

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();

        if (!isMounted) return;

        // Initialize Autocomplete
        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["(cities)"],
            componentRestrictions: { country: "us" },
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place?.formatted_address) {
            setLocation(place.formatted_address);
            setError(null);
          }
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading Google Places:", err);
        if (isMounted) {
          setError("Failed to load location search. Please try again later.");
          setIsLoading(false);
        }
      }
    };

    initAutocomplete();

    // Cleanup function
    return () => {
      isMounted = false;
      if (autocompleteRef.current) {
        autocompleteRef.current = null;
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
