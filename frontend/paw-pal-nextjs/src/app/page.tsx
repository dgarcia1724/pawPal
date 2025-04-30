import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
          alt="Two dogs playing"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Text Content */}
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-white text-6xl font-bold">Paw Pal</h1>
      </div>
    </div>
  );
}
