"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BioPage() {
  const [bio, setBio] = useState("");
  const router = useRouter();
  const mapInitializedRef = useRef(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bio.trim()) {
      // TODO: Save bio to state/backend
      console.log("Bio submitted:", bio);
      router.push("/onboarding/your-dog/name");
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
            Tell us about yourself
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Write a short introduction to help others get to know you
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bio Input */}
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black min-h-[150px] resize-none"
                placeholder="Hi! I'm a dog lover who enjoys long walks in the park and playing fetch. I'm looking to meet other pet parents in my area."
                required
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-2 text-right">
                {bio.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={!bio.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                bio.trim()
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
