"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface PersonalityOption {
  value: PersonalityTrait;
  label: string;
  description: string;
}

const personalityOptions: PersonalityOption[] = [
  {
    value: "playful",
    label: "Playful",
    description: "Loves games and toys",
  },
  {
    value: "shy",
    label: "Shy",
    description: "Takes time to warm up",
  },
  {
    value: "energetic",
    label: "Energetic",
    description: "Always ready for action",
  },
  {
    value: "calm",
    label: "Calm",
    description: "Relaxed and easygoing",
  },
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
  {
    value: "curious",
    label: "Curious",
    description: "Always exploring",
  },
  {
    value: "social",
    label: "Social",
    description: "Loves meeting new friends",
  },
];

export default function PersonalityPage() {
  const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
  const router = useRouter();

  const handleTraitClick = (trait: PersonalityTrait) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTraits.length > 0) {
      // TODO: Save personality traits to state/backend
      console.log("Personality traits submitted:", selectedTraits);
      router.push("/onboarding/your-dog/photos");
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
            What&apos;s your dog&apos;s personality?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Select all traits that describe your dog
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {personalityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTraitClick(option.value)}
                  className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedTraits.includes(option.value)
                      ? "border-amber-700 bg-amber-50 text-amber-700"
                      : "border-gray-300 text-gray-700 hover:border-amber-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {option.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={selectedTraits.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedTraits.length > 0
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
