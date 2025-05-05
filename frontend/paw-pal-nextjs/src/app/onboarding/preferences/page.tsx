"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Gender = "male" | "female" | "any";
type DogSize = "small" | "medium" | "large" | "extra-large" | "any";
type LookingForOption =
  | "Friends"
  | "Breeding"
  | "Training partners"
  | "Walk buddies";
type PersonalityTrait =
  | "playful"
  | "shy"
  | "energetic"
  | "calm"
  | "friendly"
  | "protective"
  | "independent"
  | "affectionate"
  | "curious"
  | "social";

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
  "Any",
];

const sizeOptions = [
  { value: "small", label: "Small", description: "Under 20 lbs" },
  { value: "medium", label: "Medium", description: "20-50 lbs" },
  { value: "large", label: "Large", description: "50-100 lbs" },
  { value: "extra-large", label: "Extra Large", description: "Over 100 lbs" },
  { value: "any", label: "Any Size", description: "No preference" },
];

const personalityOptions = [
  { value: "playful", label: "Playful", description: "Loves games and toys" },
  { value: "shy", label: "Shy", description: "Takes time to warm up" },
  {
    value: "energetic",
    label: "Energetic",
    description: "Always ready for action",
  },
  { value: "calm", label: "Calm", description: "Relaxed and easygoing" },
  {
    value: "friendly",
    label: "Friendly",
    description: "Gets along with everyone",
  },
  {
    value: "protective",
    label: "Protective",
    description: "Watches over their family",
  },
  {
    value: "independent",
    label: "Independent",
    description: "Does their own thing",
  },
  {
    value: "affectionate",
    label: "Affectionate",
    description: "Loves cuddles and attention",
  },
  { value: "curious", label: "Curious", description: "Always exploring" },
  {
    value: "social",
    label: "Social",
    description: "Loves meeting new friends",
  },
];

const lookingForOptions: LookingForOption[] = [
  "Friends",
  "Breeding",
  "Training partners",
  "Walk buddies",
];

export default function PreferencesPage() {
  const router = useRouter();
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<Gender>("any");
  const [size, setSize] = useState<DogSize>("any");
  const [selectedPersonality, setSelectedPersonality] = useState<
    PersonalityTrait[]
  >([]);
  const [selectedLookingFor, setSelectedLookingFor] = useState<
    LookingForOption[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save preferences to backend
    console.log("Preferences submitted:", {
      ageRange,
      breed,
      gender,
      size,
      personality: selectedPersonality,
      lookingFor: selectedLookingFor,
    });
    router.push("/onboarding/review");
  };

  const handlePersonalityToggle = (trait: PersonalityTrait) => {
    setSelectedPersonality((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleLookingForToggle = (option: LookingForOption) => {
    setSelectedLookingFor((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center py-6">
        <h1 className="text-3xl font-bold text-black">Paw Pal</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl font-bold text-black text-center mb-2">
            Match Preferences
          </h2>
          <p className="text-gray-700 text-center mb-8">
            Set your preferences for potential matches
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Age Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Age Range</h3>
              <div className="flex space-x-4">
                {/* Min Age */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Min Years
                  </label>
                  <input
                    type="number"
                    value={ageRange.min}
                    onChange={(e) =>
                      setAgeRange((prev) => ({ ...prev, min: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-gray-900"
                    placeholder="0"
                    min="0"
                  />
                </div>
                {/* Max Age */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Max Years
                  </label>
                  <input
                    type="number"
                    value={ageRange.max}
                    onChange={(e) =>
                      setAgeRange((prev) => ({ ...prev, max: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-gray-900"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Breed */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Breed</h3>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none text-gray-900"
                placeholder="Enter preferred breed or 'Any'"
              />
              <div className="grid grid-cols-2 gap-2">
                {popularBreeds.map((popularBreed) => (
                  <button
                    key={popularBreed}
                    type="button"
                    onClick={() => setBreed(popularBreed)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-900 text-left cursor-pointer hover:border-amber-700"
                  >
                    {popularBreed}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Gender</h3>
              <div className="grid grid-cols-3 gap-4">
                {(["male", "female", "any"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      gender === g
                        ? "border-amber-700 bg-amber-50 text-gray-900"
                        : "border-gray-300 text-gray-900 hover:border-amber-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {g === "male" && <span className="text-2xl mb-2">♂</span>}
                      {g === "female" && (
                        <span className="text-2xl mb-2">♀</span>
                      )}
                      {g === "any" && <span className="text-2xl mb-2">⚥</span>}
                      <span className="font-medium capitalize">{g}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Size</h3>
              <div className="grid grid-cols-2 gap-4">
                {sizeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSize(option.value as DogSize)}
                    className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      size === option.value
                        ? "border-amber-700 bg-amber-50 text-gray-900"
                        : "border-gray-300 text-gray-900 hover:border-amber-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-gray-700">
                        {option.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Personality
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {personalityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handlePersonalityToggle(option.value)}
                    className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                      selectedPersonality.includes(option.value)
                        ? "border-amber-700 bg-amber-50 text-gray-900"
                        : "border-gray-300 text-gray-900 hover:border-amber-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-gray-700">
                        {option.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Looking For */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Looking For
              </h3>
              <div className="space-y-4">
                {lookingForOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleLookingForToggle(option)}
                    className={`w-full py-4 px-6 rounded-lg border-2 text-left transition-colors cursor-pointer ${
                      selectedLookingFor.includes(option)
                        ? "border-amber-700 bg-amber-50 text-gray-900 hover:bg-amber-100"
                        : "border-gray-200 hover:border-amber-700 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
