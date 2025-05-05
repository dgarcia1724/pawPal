"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Gender = "male" | "female";

export default function GenderPage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gender) {
      // TODO: Save gender to state/backend
      console.log("Gender submitted:", gender);
      router.push("/onboarding/your-dog/size");
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
            What&apos;s your dog&apos;s gender?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Select your dog&apos;s gender
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Male Option */}
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`p-6 rounded-lg border-2 transition-colors cursor-pointer ${
                  gender === "male"
                    ? "border-amber-700 bg-amber-50 text-amber-700"
                    : "border-gray-300 text-gray-700 hover:border-amber-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-2">♂</span>
                  <span className="font-medium">Male</span>
                </div>
              </button>

              {/* Female Option */}
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`p-6 rounded-lg border-2 transition-colors cursor-pointer ${
                  gender === "female"
                    ? "border-amber-700 bg-amber-50 text-amber-700"
                    : "border-gray-300 text-gray-700 hover:border-amber-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-2">♀</span>
                  <span className="font-medium">Female</span>
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={!gender}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                gender
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
