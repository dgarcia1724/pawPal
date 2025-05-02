"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save name to state/backend
    console.log("Name submitted:", name);
    router.push("/onboarding/your-info/photo");
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
            What&apos;s your name?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            We&apos;ll ask about your dog later.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-2xl text-center border-b-2 border-gray-300 focus:border-amber-700 focus:outline-none transition-colors text-black"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                name.trim()
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
