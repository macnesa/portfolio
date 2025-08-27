"use client"
import { FaSpotify, FaLastfm } from "react-icons/fa";

export default function Header(){
  return (
    <>
      <header className="w-full text-gray-800 px-6 py-3 grid grid-cols-3 items-center border-b border-gray-200">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src="https://static.thenounproject.com/png/2470574-200.png" alt="Logo" className="w-6 h-6" />
        </div>

        {/* Center: Navigation */}
        <nav className="flex gap-6 text-xs justify-center">
          <a href="#" className="hover:text-gray-600">Home</a>
          <a href="#" className="hover:text-gray-600">Careers</a>
          <a href="#" className="hover:text-gray-600">Vision</a>
        </nav>

        {/* Right: Placeholder or profile */}
        <div></div>
      </header> 
    </>
  )
}