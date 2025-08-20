"use client";

import { useTracksStore } from "@/store/useTracksStore";
import { useEffect } from "react";

export default function TopTracksList() {
  const { data, fetch, loading } = useTracksStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (!data?.items?.length) return <></>;

  const items = data.items;
  const topThree = items.slice(0, 3).map(item => item.name).join(", ");
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section v-if="false" style={{background: "#2f2e60"}} className="mt-10 h-auto rounded-2xl w-full box-border overflow-hidden shadow-xl border-[2px] border-[rgba(173,167,181,0.2)] grid">
      <section className="h-auto p-10 min-h-[26rem] w-full box-border overflow-hidden shadow-xl border-red-200 grid lg:grid-flow-col lg:grid-cols-[max-content_1fr]">
        <div className="grid items-center self-end">
          <div style={{boxShadow: "-1px -1px 30px -9px rgba(0,0,0,1)"}} className="w-[20rem] h-[20rem] border-l-blue-200 grid grid-flow-col grid-cols-[1fr_1fr] grid-rows-[1fr_1fr]">
            {items.slice(0, 4).map((track, idx) => (<img key={idx} src={track.album.images[1].url} className="w-[100%] h-[100%]" alt="" />))}
          </div>
        </div>
        <div className="border-l-fuchsia-600 flex flex-col justify-end lg:px-4">
          <p className="text-base font-semibold text-white">THIS IS YOUR</p>
          <p className="text-4xl lg:text-8xl mb-4 font-sans font-bold text-white">MOST LISTENED</p>
          <p style={{color: "rgba(255, 255, 255, 0.666)"}} className="text-sm mb-2 font-sans font-normal">Featured {topThree}, and more</p>
          <div className="text-sm font-semibold text-white flex items-center">
            <img className="w-6 h-6 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"/>
            <span>Spotify</span>
            {/* @ts-ignore */}
            <ion-icon className="w-1 h-1 mx-1" name="ellipse" />
            <span className="font-normal">{items.length} Songs</span>
            <p style={{background: "rgba(255, 255, 255, 0.666)", color: "black"}} className="text-[0.6rem] border-white px-1 py-[1px] font-semibold ml-2 font-sans rounded-sm">PREVIEW</p>
          </div>
        </div>
      </section>
      <div style={{background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(14,13,13,1) 33%, rgba(31,30,30,0.9) 70%, rgba(35,34,34,0.8) 85%, rgba(41,41,41,0.4) 100%)"}} className="relative overflow-x-auto px-4 pt-4 pb-4">
        <table className="w-full text-sm text-left border-white text-unfocus-500">
          <thead className="border-b border-[rgba(222,222,222,0.1)] text-gray-400"></thead>
          <tbody>
            {items.map((each, idx) => (
              <tr key={each.id || idx} onDoubleClick={() => {/* panggil playMusic(each) */}} className={`${each.preview_url ? "" : "teer"} border-none cursor-pointer text-gray-400 dark:focus:bg-gray-800 font-sans rounded-xl hover:bg-[rgba(222,222,222,0.1)] hover:text-white`}>
                <th style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}} className="px-3 py-3 text-end font-normal border-white whitespace-nowrap">{idx + 1}</th>
                <td className="pr-6 py-2 flex border-white">
                  <img src={each.album.images[1].url} width={40} height={40} className="rounded-sm" alt="" />
                  <div className="ml-2 p-0 flex flex-col justify-center">
                    <p className="font-normal font-sans text-sm flex text-white">{each.name}</p>
                    <a className="hover:underline hover:cursor-pointer font-normal font-sans text-xs">
                      {each.artists.map((o, i) => o.name + (i + 1 !== each.artists.length ? ", " : ""))}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-2 text-sm font-normal font-sans">{each.album.name}</td>
                <td style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}} className="px-6 py-2 text-sm font-normal border-white">{formatTime(each.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
