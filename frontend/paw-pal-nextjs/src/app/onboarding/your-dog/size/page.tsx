"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DogSize = "small" | "medium" | "large" | "extra-large";

interface SizeOption {
  value: DogSize;
  label: string;
  description: string;
  weightRange: string;
}

const sizeOptions: SizeOption[] = [
  {
    value: "small",
    label: "Small",
    description: "Perfect for apartment living",
    weightRange: "Under 20 lbs",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Great for most homes",
    weightRange: "20-50 lbs",
  },
  {
    value: "large",
    label: "Large",
    description: "Ideal for active families",
    weightRange: "50-100 lbs",
  },
  {
    value: "extra-large",
    label: "Extra Large",
    description: "Best for spacious homes",
    weightRange: "Over 100 lbs",
  },
];

export default function SizePage() {
  const [size, setSize] = useState<DogSize | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (size) {
      // TODO: Save size to state/backend
      console.log("Size submitted:", size);
      router.push("/onboarding/your-dog/personality");
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
            What&apos;s your dog&apos;s size?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Select the size that best matches your dog
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {sizeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSize(option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  size === option.value
                    ? "border-amber-700 bg-amber-50 text-amber-700"
                    : "border-gray-300 text-gray-700 hover:border-amber-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-lg">{option.label}</span>
                  <span className="text-sm text-gray-500">
                    {option.weightRange}
                  </span>
                  <span className="text-sm mt-1">{option.description}</span>
                </div>
              </button>
            ))}

            <button
              type="submit"
              disabled={!size}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                size
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
