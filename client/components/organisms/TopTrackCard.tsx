"use client";
import { useTopTracksStore } from "@/store/spotify/userStore";
import { useEffect } from "react";

export default function TopTrackCard() {
  const { data, fetch, loading } = useTopTracksStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (loading || !data?.items.length) return null;

  const topTrack = data.items[0];
  const albumImage = topTrack.album.images?.[0].url || "";
  const artistNames = topTrack.artists.map((a) => a.name).join(", ");

  return (
    <section style={{ backgroundImage: "url()", backgroundSize: "cover", background: "linear-gradient(40deg, rgba(178,173,187,1) 0%, rgba(202,196,210,1) 39%, rgba(215,208,226,1) 100%)", border: "2px solid transparent" }} className="grid mt-8 h-[40rem] rounded-2xl border-green-400 overflow-hidden box-border">
      
      <div className="h-full w-full overflow-hidden lg:mt-0 grid items-end justify-end row-start-1 col-start-1">
        <div style={{ transform: "rotate(30deg) translate(270px, -60px)", boxShadow: "-15px 130px 45px -6px rgba(0,0,0,0.31)", transformOrigin: "0 0" }} className="h-[700px] w-[700px] grid grid-flow-col overflow-hidden">
          <span style={{ boxShadow: "-8px 40px 15px -6px rgba(0,0,0,0.31)", transformOrigin: "0 0" }} className="block z-[2] row-start-1 h-full mt-10 ml-5 col-start-1 w-10 bg-[rgb(173,167,181)]" />
          <span className="block row-start-1 -z-1 h-full mt-20 col-start-1 w-5 bg-[rgb(173,167,181)]" />
          <img src={albumImage} alt="Album" style={{ boxShadow: "-5px 40px 20px -6px rgba(0,0,0,0.81)" }} className="z-[3] row-start-1 col-start-1 ml-10 h-full w-full" />
        </div>
      </div>

      <section style={{ filter: "brightness(1)" }} className="grid pl-5 lg:pl-10 py-1 w-[55%] h-full row-start-1 col-start-1 justify-start items-end md:items-center">
        <section className="lg:col-span-7">
          <p className="absolute top-10 text-sm font-semibold text-gray-900 dark:text-white flex items-center">
            <img src="/assets/images/spotify-white.png" className="w-10 h-10 mr-2" alt="Spotify" />
          </p>
          <p className="text-xl font-semibold text-white flex items-center">TOP SONG</p>
          <p className=" mb-4 text-4xl text-black font-bold tracking-tight leading-none md:text-5xl xl:text-[7rem]">{topTrack.name}</p>
          <div className="flex items-center">
            <p className=" text-normal max-w-2xl ml-1 font-normal text-gray-800 dark:text-white">By {artistNames}</p>
          </div>
        </section>
      </section>
    </section>
  );
}
