"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LookingForOption =
  | "Friends"
  | "Breeding"
  | "Training partners"
  | "Walk buddies";

export default function LookingForPage() {
  const [selectedOptions, setSelectedOptions] = useState<LookingForOption[]>(
    []
  );
  const router = useRouter();

  const options: LookingForOption[] = [
    "Friends",
    "Breeding",
    "Training partners",
    "Walk buddies",
  ];

  const handleOptionToggle = (option: LookingForOption) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOptions.length > 0) {
      // TODO: Save selected options to backend
      console.log("Selected options:", selectedOptions);
      router.push("/onboarding/preferences");
    }
  };

  const isFormValid = () => selectedOptions.length > 0;

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
            What are you looking for?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Select all that apply
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionToggle(option)}
                  className={`w-full py-4 px-6 rounded-lg border-2 text-left transition-colors cursor-pointer ${
                    selectedOptions.includes(option)
                      ? "border-amber-700 bg-amber-50 text-black hover:bg-amber-100"
                      : "border-gray-200 hover:border-amber-700 text-black hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                isFormValid()
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
