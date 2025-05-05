"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// List of popular dog breeds
const popularBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Dachshund",
  "German Shorthaired Pointer",
  "Pembroke Welsh Corgi",
  "Yorkshire Terrier",
  "Boxer",
  "Siberian Husky",
  "Doberman Pinscher",
];

export default function BreedPage() {
  const [breed, setBreed] = useState("");
  const [showPopularBreeds, setShowPopularBreeds] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (breed.trim()) {
      // TODO: Save breed to state/backend
      console.log("Breed submitted:", breed);
      router.push("/onboarding/your-dog/age");
    }
  };

  const handleBreedSelect = (selectedBreed: string) => {
    setBreed(selectedBreed);
    setShowPopularBreeds(false);
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
            What breed is your dog?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Select from popular breeds or type your own
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Breed Input */}
            <div>
              <input
                type="text"
                value={breed}
                onChange={(e) => {
                  setBreed(e.target.value);
                  setShowPopularBreeds(e.target.value === "");
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black"
                placeholder="Enter your dog's breed"
                required
                autoFocus
              />
            </div>

            {/* Popular Breeds */}
            {showPopularBreeds && (
              <div className="grid grid-cols-2 gap-2">
                {popularBreeds.map((popularBreed) => (
                  <button
                    key={popularBreed}
                    onClick={() => handleBreedSelect(popularBreed)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-black text-left cursor-pointer hover:border-amber-700"
                  >
                    {popularBreed}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={!breed.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                breed.trim()
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
