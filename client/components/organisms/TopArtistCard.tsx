"use client";

import { useTopArtistsStore } from "@/store/spotify/userStore";
import { useEffect, useMemo } from "react";

export default function TopArtistCard() {

  const { data, fetch, loading } = useTopArtistsStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (loading || !data?.items.length) return <></>;
  
  const topArtist = data.items[0];

  // const hasArtist = !!topArtist;

  const topArtistColor = "173, 167, 181"; // contoh; bisa dinamis kalau kamu generate dari img

  

  return (
    <div style={{ boxShadow: `-1px 2px 34px -10px rgba(${topArtistColor},1)` }} className="h-auto min-h-[20vh] mt-10 w-full border-[2px] border-[rgba(173,167,181,0.2)] rounded-2xl box-border overflow-hidden shadow-xl grid">
      <div style={{ filter: "brightness(1)" }} className="p-5 m-12 text-[100%] grid items-center border-white row-start-1 col-start-1">
        <div className="text-gray-800 w-full grid items-center border-black">
          <p className="self-end text-white text-center text-md font-bold">YOUR FAVOURITE ARTIST</p>
          <p className="top_arist max-w-[100%] text-[500%] text-center font-bold bg-clip-text text-transparent bg-center bg-no-repeat bg-cover border-black" style={{ backgroundImage: `url(${topArtist.images[1].url})` }}>{topArtist.name}</p>
          <p className="font-bold top_arist border-black text-center" style={{ backgroundImage: `url(${topArtist.images[1].url})` }}>{topArtist.genres.map(str => str.toUpperCase()).join(" - ")}</p>
        </div>
      </div>
    </div>
  );
}
