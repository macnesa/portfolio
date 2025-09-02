"use client"

import { useUserStore } from "@/store/database/userStore";
import { useTopTracksStore } from "@/store/spotify/userStore";
import TopArtistsList from "./TopArtistsList";
import TopTrackCard from "./TopTrackCard";
import { useEffect } from "react";
import isEmpty from 'lodash/isEmpty'
import ProfileCard from "./ProfileCard";
import { Text } from "../atoms/Text";
import Link from "next/link";
  

export default function Home() {
  const { data, fetch, loading } = useUserStore();
  const { data: topTracks, fetch: fetchB, loading: loadingB } = useTopTracksStore();

  
  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);
  
  useEffect(() => {
    if (!topTracks) fetchB();
  }, [topTracks, fetchB]);
  
  if (loading || isEmpty(data) || isEmpty(topTracks)) return null;
  
  const displayName = data.username;
  const avatarSrc = data.spotify_accounts?.avatar_url ?? 'https://media.istockphoto.com/id/1164822188/vector/male-avatar-profile-picture.jpg?s=612x612&w=0&k=20&c=KPsLgVIwEGdDvf4_kiynCXw96p_PhBjIGdU68qkpbuI='

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-700">
      {/* Header ala GitHub */}
      <header className="w-full bg-white text-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-200">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          {/* <a href="#" className="text-gray-800 text-2xl">🐱</a> */}
          <img src="https://static.thenounproject.com/png/2470574-200.png" alt="Spotify" className="w-6 h-6 mr-2"/>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="hover:text-gray-600">Home</a>
            <a href="#" className="hover:text-gray-600">Discover</a>
          </nav>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 max-w-sm mx-6">
          <input
            type="text"
            placeholder="Search or jump to..."
            className="w-full bg-gray-50 text-sm text-gray-800 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-600">+</button>
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </header>


      {/* Body Layout */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="hidden w-80 p-6 flex flex-col gap-6 bg-white  border-red-400">
          <div className="flex flex-col items-center">
            <img
              src={avatarSrc}
              alt="Profile"
              className="rounded-full w-60 h-60"
            />
            <h1 className="text-2xl font-semibold mt-4">{displayName}</h1>
            {/* <p className="text-gray-500 mt-1">@Marcoo09</p> */}
            {/* <p className="text-gray-600 mt-2 text-center">
              Software Engineer | Mobile Developer
            </p> */}
          </div>

          {/* <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <p>📍 Montevideo</p>
            <p>📧 marcofiorito1@gmail.com</p>
            <p>
              🔗{" "}
              <a
                href="https://medium.com/@maarcoo09"
                className="text-blue-500 hover:underline"
              >
                Medium
              </a>
            </p>
          </div> */}

        </aside>

        {/* Main Content */}
        <main className="flex-1 pl-64 flex flex-col gap-8">
          
          {/* About Me */}
          {/* <div>
            <h2 className="text-lg text-gray-700 mb-2">About Me</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p>
                Hi guys, I'm Marco Fiorito. I'm a Software Engineer from
                Montevideo 🇺🇾.
              </p>
              <p>
                📌 Currently working on{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Howdy
                </a>
              </p>
              <p>
                📧 Reach me at{" "}
                <a
                  href="mailto:marcofiorito1@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  marcofiorito1@gmail.com
                </a>
              </p>
            </div>
          </div> */}

          {/* Pinned */}
          {/* <div>
            <h2 className="text-lg text-gray-700 mb-2">Pinned</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border p-3 rounded border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  MetaLabs-inc/flutter-base-project
                </div>
                <div className="border p-3 rounded border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  MetaLabs-inc/react-native-base-project
                </div>
              </div>
            </div>
          </div> */}

          {/* Contributions */}
          <div>
            <ProfileCard/>
          </div>
          
          <Text className="font-bold ">My Top Tracks</Text>
          <div className=" w-full box-border overflow-hidden pb-2  border-yellow-300  grid items-center grid-flow-cols  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topTracks.items.slice(0,9).map((each, index) => (
          // onDoubleClick={() => playMusic(each.track)} ${isPreviewAvailable(each.track)}
          <button key={index} className={` teer border-[rgba(222,222,222,0.5)] dark:border-[rgba(222,222,222,0.1)] border-t hover:bg-[rgba(222,222,222,0.1)] hover:text-white text-unfocus-500  mx-2 focus:bg-[rgba(222,222,222,0.3)] cursor-pointer`}>
            <div className="px-3 py-2 flex border-white">
              <img src={each.album.images[1]?.url} className="rounded-sm" width={40} height={40} alt="" />
              <div className="ml-4 p-0 flex flex-col text-start border-white justify-center truncate">
                <Text className="text-sm flex  border-red-300"> {each.name} </Text>
                <span className="dark:text-[rgba(255,255,255,0.9)] text-[rgba(0,0,0,0.6)] text-xs border-red-300"> 
                  <Link href={`/album/${each.album.id}`} className='hover:underline'>{each.album.name}</Link> -  { new Date(each.album.release_date).getFullYear()} 
                  </span>
              </div>
            </div>
          </button>
          ))}
        </div>
          
          
          {/* Contributions */}
          <div>
            {/* <TopTrackCard/> */}
          </div>
          
          
          {/* Contributions */}
          <div>
            {/* <TopArtistsList/> */}
          </div>
          
        </main>
      </div>
    </div>
  );
}
