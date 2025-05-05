"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DogAge {
  years: number;
  months: number;
  ageInMonths: number;
}

export default function AgePage() {
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const ageData: DogAge = {
        years: parseInt(years) || 0,
        months: parseInt(months) || 0,
        ageInMonths: (parseInt(years) || 0) * 12 + (parseInt(months) || 0),
      };
      // TODO: Save age to state/backend
      console.log("Age submitted:", ageData);
      router.push("/onboarding/your-dog/gender");
    }
  };

  const isFormValid = () => {
    const hasYears = years.trim() !== "" && !isNaN(Number(years));
    const hasMonths = months.trim() !== "" && !isNaN(Number(months));
    return hasYears || hasMonths;
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
            How old is your dog?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Enter your dog&apos;s age
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              {/* Years Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Months Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Months
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-700 focus:outline-none transition-colors text-black"
                  placeholder="0"
                  min="0"
                  max="11"
                />
              </div>
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
