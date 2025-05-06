"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time and then redirect to dashboard
    const timer = setTimeout(() => {
      router.push("/dashboard/home");
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
          {/* Animated circle */}
          <div className="absolute inset-0 border-4 border-amber-700 rounded-full animate-spin border-t-transparent"></div>
          {/* Paw icon */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            🐾
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Setting up your profile
          </h2>
          <p className="text-gray-700">This will only take a moment...</p>
        </div>
      </div>
    </div>
  );
}
