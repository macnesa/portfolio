"use client";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-60 h-screen bg-amber-500 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div id="sidebar" className="h-full px-2 pt-4 pb-24 overflow-y-auto bg-white dark:bg-dark">
        {/* Logo */}
        <ul>
          <li className="border-white">
            <Link href="/" className="flex border-white items-center px-2 text-base font-normal rounded-lg text-white">
              <Image src="/assets/images/spotify-white.png" alt="logo" width={20} height={20} />
              <p style={{ letterSpacing: "-1px" }} className="ml-1 dark:text-white text-gray-800">Spotify</p>
              <p style={{ letterSpacing: "-1px", fontWeight: "bold" }} className="ml-1 text-emerald-200">Insight</p>
            </Link>
          </li>
        </ul>
        {/* Navigation */}
        <ul className="space-y-2 rounded-lg">
          <li>
            <Link href="/" className="flex mt-8 items-center p-2 text-xs transition duration-75 font-normal rounded-lg text-gray-800 dark:text-unfocus-500 dark:hover:text-white">
              {/* @ts-ignore */}
              <ion-icon aria-hidden="true" class="w-4 h-4" name="home-outline"></ion-icon>
              <span className="ml-3">Home</span>
            </Link>
          </li>

          <li>
            <Link href="/search" className="flex items-center p-2 text-xs transition duration-75 font-normal rounded-lg text-gray-800 dark:text-unfocus-500 dark:hover:text-white">
              {/* @ts-ignore */}
              <ion-icon aria-hidden="true" class="w-4 h-4" name="search-outline"></ion-icon>
              <span className="ml-3">Search</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}