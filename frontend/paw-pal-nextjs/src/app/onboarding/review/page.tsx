"use client";

import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save all onboarding data to backend
    router.push("/onboarding/loading");
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
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Final Review
          </h2>
          <p className="text-gray-700 text-center mb-8">
            Review your information before entering the app
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Your Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Your Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Location</span>
                  <p className="text-gray-900">San Francisco, CA</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Bio</span>
                  <p className="text-gray-900">
                    Dog lover who enjoys long walks in the park
                  </p>
                </div>
              </div>
            </div>

            {/* Your Dog Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Dog</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Name</span>
                  <p className="text-gray-900">Max</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Breed</span>
                  <p className="text-gray-900">Golden Retriever</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Age</span>
                  <p className="text-gray-900">2 years, 3 months</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Gender</span>
                  <p className="text-gray-900">Male</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Size</span>
                  <p className="text-gray-900">Large (50-100 lbs)</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Personality</span>
                  <p className="text-gray-900">Playful, Friendly, Energetic</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Looking For</span>
                  <p className="text-gray-900">Friends, Walk buddies</p>
                </div>
              </div>
            </div>

            {/* Match Preferences Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Match Preferences
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Age Range</span>
                  <p className="text-gray-900">1-5 years</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Breed</span>
                  <p className="text-gray-900">Any</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Gender</span>
                  <p className="text-gray-900">Any</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Size</span>
                  <p className="text-gray-900">Medium to Large</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Personality</span>
                  <p className="text-gray-900">Playful, Friendly, Social</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Looking For</span>
                  <p className="text-gray-900">Friends, Training partners</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors cursor-pointer"
              >
                Enter App
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
