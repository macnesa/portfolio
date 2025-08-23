"use client";

import { useTopArtistsStore } from "@/store/spotify/userStore";
import { useEffect } from "react";

export default function AuroraTopArtistRed() {
  const { data, fetch, loading } = useTopArtistsStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (loading || !data?.items.length) return null;

  const artist = data.items[4];

  return (
    <div className="relative mt-12 w-full min-h-[40vh] md:min-h-[50vh]  overflow-hidden shadow-2xl bg-neutral-900 flex items-center justify-center">
      
      {/* Red aurora waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 opacity-40 rounded-full animate-spin-slow"></div>
        <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 opacity-30 rounded-full animate-spin-reverse-slow"></div>
      </div>

      {/* Floating artist portrait */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white/20 mb-4 animate-bounce-slow">
          <img src={artist.images[0]?.url} alt={artist.name} className="w-full h-full object-cover" />
        </div>

        {/* Artist name */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {artist.name}
        </h2>

        {/* Genres */}
        <p className="mt-2 text-sm md:text-base text-neutral-200 text-center max-w-xl">
          {artist.genres.map(g => g.toUpperCase()).join(" • ")}
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 90s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
