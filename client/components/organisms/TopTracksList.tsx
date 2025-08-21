"use client";

import { useTopTracksStore } from "@/store/spotify/userStore";
import { useEffect } from "react";
import { Text } from "../atoms/Text";
import Link from "next/link";

export default function TopTracksList() {
  const { data, fetch, loading } = useTopTracksStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  if (!data?.items?.length) return <></>;

  const items = data.items;
  const topThree = items.slice(0, 3).map(item => item.artists[0].name).join(", ");
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section v-if="false"  className="mt-10 h-auto rounded-2xl w-full box-border overflow-hidden  border-[2px] border-[rgba(173,167,181,0)] grid">
      <section className="h-auto p-10 min-h-[26rem] w-full box-border overflow-hidden  border-red-200 grid lg:grid-flow-col lg:grid-cols-[max-content_1fr]">
        <div className="grid items-center self-end">
          <div style={{boxShadow: "-1px -1px 30px -9px rgba(0,0,0,1)"}} className="w-[20rem] h-[20rem] border-l-blue-200 grid grid-flow-col grid-cols-[1fr_1fr] grid-rows-[1fr_1fr]">
            {items.slice(0, 4).map((track, idx) => (<img key={idx} src={track.album.images[1].url} className="w-[100%] h-[100%]" alt="" />))}
          </div>
        </div>
        <div className="border-l-fuchsia-600 flex flex-col justify-end lg:px-4">
          <p className="text-base  text-white">DISCOVER YOUR</p>
          <p className="text-4xl lg:text-8xl mb-4 font-sans font-extrabold text-white">MOST LISTENED</p>
          <p style={{color: "rgba(255, 255, 255, 0.666)"}} className="text-sm  font-sans font-normal">Featuring {topThree}, and more</p>
          
          <div className="text-sm font-semibold text-white flex items-center hidden">
            <img className="w-6 h-6 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"/>
            <span>Spotify</span>
            {/* @ts-ignore */}
            <ion-icon className="w-1 h-1 mx-1" name="ellipse" />
            <span className="font-normal">{items.length} Songs</span>
            <p style={{background: "rgba(255, 255, 255, 0.666)", color: "black"}} className="text-[0.6rem] border-white px-1 py-[1px] font-semibold ml-2 font-sans rounded-sm">PREVIEW</p>
          </div>
          
        </div>
      </section>
      
      <div className=" w-full box-border overflow-hidden  shadow-xl  border-yellow-300  grid items-center grid-flow-cols   md:grid-cols-2 lg:grid-cols-3">
          {items.map((each, index) => (
          // onDoubleClick={() => playMusic(each.track)} ${isPreviewAvailable(each.track)}
          <button key={index} className={` teer border-[rgba(222,222,222,0.1)] border-t hover:bg-[rgba(222,222,222,0.1)] hover:text-white text-unfocus-500  mx-2 focus:bg-[rgba(222,222,222,0.3)] cursor-pointer`}>
            <div className="px-3 py-2 flex border-white">
              <img src={each.album.images[1]?.url} className="rounded-sm" width={40} height={40} alt="" />
              <div className="ml-4 p-0 flex flex-col text-start border-white justify-center truncate">
                <Text className="text-sm flex  border-red-300"> {each.name} </Text>
                <span className="text-[rgba(255,255,255,0.5)] text-xs border-red-300"> 
                  <Link href={`/album/${each.album.id}`} className='hover:underline'>{each.album.name}</Link> -  { new Date(each.album.release_date).getFullYear()} 
                  </span>
              </div>
            </div>
          </button>
          ))}
        </div>
      
      <div style={{background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(14,13,13,0.5) 33%, rgba(31,30,30,0.4) 70%, rgba(35,34,34,0.3) 85%, rgba(41,41,41,0.2) 100%)"}} className="hidden relative overflow-x-auto px-4 pt-4 pb-4">
        <table className="w-full text-sm text-left border-white text-unfocus-500">
          <thead className="border-b border-[rgba(222,222,222,0.1)] text-gray-400"></thead>
          <tbody>
            {items.slice(0,10).map((each, idx) => (
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
