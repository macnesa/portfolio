import Link from "next/link"
import { FaSpotify, FaLastfm } from "react-icons/fa"

export default function SandboxTiga() {
  return (
    // px-8 md:px-32
    <section className="min-h-[1000px]  border-black grid grid-cols-[0.3fr_1fr] justify-center   text-gray-900">
        
        <div>
          <img className="h-full object-cover " src="https://plus.unsplash.com/premium_photo-1664013263421-91e3a8101259?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D"></img>
        </div>
        <div className="px-8 md:px-28 grid content-center text-center md:text-left  border-black">
          <p className="text-3xl leading-relaxed text-gray-700">
            <span className="font-bold">hello!</span> i am
          </p>
          <p className="text-9xl font-extrabold mb-6 leading-[0.5] tracking-tight text-gray-900">
            macnesa.
          </p>
          <p className=" mt-4 leading-relaxed text-gray-700">
            and welcome to a quiet little corner where I <span className="font-bold">collect</span>  thoughts, tinker with <span className="font-bold">ideas</span>, and keep pieces of who I am.
          </p>

          {/* Center: Navigation */}
          <nav className="flex gap-6 mt-30 justify-start border-t border-neutral-100 pt-5">
            <Link href="/career" className="text-neutral-400 hover:text-gray-600">about mac</Link>
            <Link href="/career" className="text-neutral-400 hover:text-gray-600">career</Link>
            <Link href="#" className="text-neutral-400 hover:text-gray-600">my vision</Link>
            <Link href="#" className="text-neutral-400 hover:text-gray-600">blogs</Link>
          </nav>


          {/* Social icons – hidden for now */}
          <div className="hidden space-x-6 mb-8 justify-center md:justify-start text-indigo-600 text-2xl">
            <a href="https://spotify.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <FaSpotify />
            </a>
            <a href="https://last.fm/user/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Last.fm">
              <FaLastfm />
            </a>
          </div>

          {/* CTA buttons – hidden for now */}
          <div className="hidden justify-center md:justify-start space-x-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-50 transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
 


    
  )
}