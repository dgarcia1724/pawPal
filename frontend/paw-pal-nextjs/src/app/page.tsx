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
      <div className="relative h-full flex flex-col items-center justify-between py-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-6xl font-bold">Paw Pal</h1>
          {/* Paw Icon */}
          <svg
            viewBox="0 0 512 512"
            className="w-32 h-32 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7.9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
          </svg>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md flex flex-col gap-4 px-4">
          <button className="w-full py-3 bg-amber-700 text-white rounded-3xl font-bold hover:bg-amber-800 transition-colors cursor-pointer shadow-md hover:shadow-lg">
            Create Account
          </button>
          <p className="text-white text-center cursor-pointer hover:underline font-bold">
            Sign in
          </p>
        </div>
      </div>
    </div>
  );
}
