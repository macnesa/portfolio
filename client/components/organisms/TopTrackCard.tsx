"use client";
import { useTopTracksStore } from "@/store/spotify/userStore";
import { useEffect } from "react";

export default function TopTrackCard() {
  const { data, fetch, loading } = useTopTracksStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (loading || !data?.items.length) return null;

  const topTrack = data.items[6];
  const albumImage = topTrack.album.images?.[0].url || "";
  const artistNames = topTrack.artists.map((a) => a.name).join(", ");

  return (
    // border border-neutral-800 max-w-5xl
    <section className="relative w-full  rounded-2xl overflow-hidden bg-neutral-900   shadow-lg">
      {/* Background gradient / decorative */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-neutral-900 to-neutral-800 opacity-30 pointer-events-none" />

      {/* Album artwork */}
      <div className="absolute -top-10 -right-10 w-[350px] h-[350px] md:w-[400px] md:h-[400px] transform rotate-12 overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={albumImage}
          alt="Album cover"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* subtle glow behind album */}
        <div className="absolute inset-0 bg-rose-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Text content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-[400px] md:h-[450px]">
        <p className="flex items-center text-sm font-semibold text-neutral-300 mb-2">
          <img
            src="/assets/images/spotify-white.png"
            alt="Spotify"
            className="w-6 h-6 mr-2"
          />
          TOP SONG
        </p>
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-2">
          {topTrack.name}
        </h1>
        <p className="text-sm md:text-base text-neutral-400">By {artistNames}</p>
      </div>

      {/* Decorative subtle glow */}
      <div className="absolute -left-8 bottom-8 w-32 h-32 rounded-2xl bg-rose-500/30 opacity-40 blur-3xl pointer-events-none" />
    </section>
  );
}
