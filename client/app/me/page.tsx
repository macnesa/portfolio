import Link from "next/link";
import { FaMusic, FaLastfm, FaYoutube, FaLinkedinIn, FaGithub, FaDiscord, FaClock, FaBuilding, FaCode, FaCodeBranch } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock, HiOutlineBuildingOffice2 } from "react-icons/hi2"

export default function Me() {



  const commits = [
    {
      message: "Fix bug on login page",
      repo: "my-project/frontend",
      time: "2 hours ago",
    },
    {
      message: "Add unit tests for user service",
      repo: "my-project/backend",
      time: "1 day ago",
    },
    {
      message: "Update README.md",
      repo: "my-project",
      time: "3 days ago",
    },
  ];

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[0.3fr_1fr] bg-white text-gray-900">

      {/* Left - Fixed Width Image */}
      <div className="w-full h-full">
        <img
          className="w-full h-full object-cover  brightness-90"
          src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1348&auto=format&fit=crop"
          alt="portrait"
        />
      </div>

      {/* Right - Text Content */}
      <div className="px-8  border-red-400 md:px-10  py-10 animate-fade-in space-y-5">

        <div className="border border-neutral-200 rounded-md p-5 md:p-10 flex flex-col justify-center space-y-2">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-snug">
            hi 👋 call me <span className="italic text-gray-500">mac</span>.
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            i like quiet mornings, good music, long walks, and figuring out how things work.
            <br />
            sometimes i write. sometimes i build things. often, i overthink. but mostly, i try to stay curious.
            <br />
            i believe in slow growth, deep work, and surrounding yourself with people who make you feel at home.
            <br /><br />
            if you're here, thanks for stopping by. really.
          </p>

        </div>

        <div className="grid grid-cols-[max-content_1fr] gap-10">


          <div className="h-max grid grid-cols-1 gap-4 w-fit text-sm   boder-black px-5 py-5 text-gray-800">
            {/* office */}
            <div className="flex items-center gap-3 group">
              <HiOutlineBuildingOffice2 className="text-lg " />
              <a
                href="https://zicare.id"
                className="group-hover:underline font-semibold"
              >
                @zicare
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <HiOutlineMapPin className="text-lg" />
              <span>Jakarta, Indonesia</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 group">
              <HiOutlineEnvelope className="text-lg " />
              <a
                href="mailto:your.email@example.com"
                className="group-hover:underline group-hover:text-blue-500"
              >
                mmacnesa@gmail.com
              </a>
            </div>

            {/* Discord */}
            <div className="flex items-center gap-3 group">
              <HiOutlineClock className="text-lg " />
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="group-hover:underline group-hover:text-blue-500"
              >
                13.42 <span className="text-gray-500"> - 5h behind</span>
              </a>
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-3 group">
              <FaYoutube className="text-lg " />
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                className="group-hover:underline group-hover:text-blue-500"
              >
                bangcurious
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3 group">
              <FaLinkedinIn className="text-lg " />
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                className="group-hover:underline group-hover:text-blue-500"
              >
                Lintang Macnesa
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3 group">
              <FaGithub className="text-lg " />
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="group-hover:underline group-hover:text-blue-500"
              >
                @macnesa
              </a>
            </div>



          </div>





          <div className="px-5 py-5 grid  content-start justify-start gap-4 border border-gray-200 rounded-xl">



            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white rounded-lg w-60 h-40 py-5 px-4 shadow-sm flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-sm text-blue-300">
                <FaCode size={14} />
                <span className="uppercase text-xs font-semibold tracking-widest opacity-80">Total Coding Time</span>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold tracking-tight">3.020 hrs</p>
                {/* <p className="text-sm font-medium text-blue-200">25 minutes</p> */}
              </div>

              <p className="text-[10px] text-blue-400 mt-1">
                Source:{" "}
                <a
                  href="https://wakatime.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300"
                >
                  WakaTime
                </a>
              </p>
            </div>



            <div className="w-72 h-40 rounded-lg px-6 py-4 bg-gradient-to-r from-[#ff4c4c] to-[#d51007] text-white shadow-lg flex items-center space-x-5">

              {/* Icon */}
              <div className="flex-shrink-0">
                <FaLastfm size={28} />
              </div>

              {/* Text Container */}
              <div className="flex flex-col">
                <span className="uppercase text-xs font-semibold tracking-widest opacity-80">
                  Total Scrobbling
                </span>
                <span className="text-3xl font-extrabold leading-none drop-shadow-md">
                  37,083 times
                </span>
                {/* <span className="text-sm font-medium opacity-90 -mt-1">
                  5 minutes
                </span> */}

                <p className="text-[10px] opacity-75 mt-2">
                  Source:{" "}
                  <a
                    href="https://wakatime.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-300"
                  >
                    Last.fm
                  </a>
                </p>
              </div>
            </div>


            <div className="hidden w-80 bg-white p-5 rounded-lg  font-sans text-gray-900">
              <h2 className="text-lg font-semibold mb-6 border-b border-gray-200 pb-2">
                GitHub Commit Timeline
              </h2>

              <div className="relative ml-4">
                {/* Garis vertikal timeline */}
                <div className="absolute left-2 top-0 w-0.5 h-full bg-gray-300"></div>

                <ul className="space-y-8">
                  {commits.map(({ message, repo, time }, idx) => (
                    <li key={idx} className="flex items-start space-x-4 relative">
                      {/* Titik timeline */}
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>

                      {/* Icon commit */}
                      <FaCodeBranch className="mt-1 text-blue-500" size={18} />

                      {/* Info commit */}
                      <div>
                        <p className="font-medium">{message}</p>
                        <p className="text-xs text-gray-400">{repo}</p>
                        <p className="text-xs text-gray-400">{time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>


        </div>


      </div>


    </section>

  );
}
