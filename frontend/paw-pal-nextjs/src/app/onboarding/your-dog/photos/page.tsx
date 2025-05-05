"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<(File | null)[]>(Array(3).fill(null));
  const [previews, setPreviews] = useState<string[]>(Array(3).fill(""));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(3).fill(null)
  );
  const router = useRouter();

  const handlePhotoChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newPhotos = [...photos];
      newPhotos[index] = file;
      setPhotos(newPhotos);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.some((photo) => photo !== null)) {
      // TODO: Upload photos to backend
      console.log("Photos submitted:", photos);
      router.push("/onboarding/your-dog/looking-for");
    }
  };

  const isFormValid = () => photos.some((photo) => photo !== null);

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
            Add photos of your dog
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Upload at least one photo of your dog
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    onChange={(e) => handlePhotoChange(index, e)}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handlePhotoClick(index)}
                    className={`w-full aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
                      previews[index]
                        ? "border-transparent"
                        : "border-gray-300 hover:border-amber-700"
                    }`}
                  >
                    {previews[index] ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previews[index]}
                          alt={`Dog photo ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2">+</span>
                        <span className="text-sm text-gray-500">Add photo</span>
                      </div>
                    )}
                  </button>
                </div>
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
