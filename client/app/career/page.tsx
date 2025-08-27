import Link from "next/link"
import { FaSpotify, FaLastfm } from "react-icons/fa"
import { SiPostgresql, SiVuedotjs, SiMysql, SiRabbitmq, SiSocketdotio, SiJavascript, SiPhp, SiRedis, SiDocker, SiExpress, SiNodedotjs, SiReact, SiJest, SiMongodb, SiTypescript, SiTailwindcss, SiGraphql, SiSequelize } from "react-icons/si";

export default function Career() {
  return (
    <section className="min-h-[1000px]  border-black grid grid-cols-[0.3fr_1fr] justify-center   text-gray-900">
      <div>
        <img className="h-full object-cover " src="https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
      </div>


      <div className="px-8 grid justify-start content-start items-start border-black">
        
      
        
        <div className="max-w-4xl mx-auto p-6">
          
        <p className="text-4xl leading-relaxed text-gray-900">
          the path i've <span className="italic border-b border-gray-500">taken</span> 
        </p>

          {/* Career Blocks Container */}
          <div className="flex flex-col divide-y divide-gray-300">

            {/* Zicare Block */}
            <div className="flex items-stretch py-6">
              {/* Timeline */}
              <div className="w-36 pr-4 border-r border-gray-300 text-sm text-gray-500 whitespace-nowrap">
                jun '23
              </div>

              {/* Content */}
              <div className="pl-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 items-center">
                  <img
                    className="h-10"
                    src="https://zicare.id/upload/website/logo_header.svg"
                    alt="zi.care logo"
                  />
                  <h3 className="text-xl text-right">full stack engineer</h3>
                </div>

                <p className="text-gray-600 mt-4">
                  i started my career as a full stack developer at zi.care, a health-tech company focused on building digital infrastructure for healthcare providers. during my time there, i helped build a comprehensive backoffice system for hospitals, led the migration of their database from mysql to postgresql, and contributed to an integrated platform aimed at improving operational efficiency in public health centers (puskesmas).
                </p>

                <div className="mt-4 grid grid-flow-col gap-5 items-center justify-end">
                  <SiJavascript size={20}  className="text-neutral-400 " />
                  <SiPhp size={20}  className="text-neutral-400 " />
                  <SiMysql size={20}  className="text-neutral-400 " />
                  <SiVuedotjs size={20}  className="text-neutral-400 " />
                  <SiRabbitmq size={20}  className="text-neutral-400 " />
                  <SiSocketdotio size={20}  className="text-neutral-400 " />
                  <SiRedis size={20}  className="text-neutral-400 " />
                  <SiDocker size={20}  className="text-neutral-400 " />
                </div>
              </div>
            </div>

            {/* Spotify Block */}
            <div className="flex items-stretch py-6">
              {/* Timeline */}
              <div className="w-36 pr-4 border-r border-gray-300 text-sm text-gray-500 whitespace-nowrap">
                 march '23
              </div>

              {/* Content */}
              <div className="pl-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 items-center">
                  <img
                    className="w-72"
                    src="https://www.hacktiv8.com/footer_logo.svg"
                    alt="zi.care logo"
                  />
                  <h3 className="text-xl text-right">full stack immersive program</h3>
                </div>
                
                <p className="text-gray-600 mt-4">
                  completed the fullstack javascript program at hacktiv8 — an intensive, structured bootcamp that refined my existing skills, solidified my understanding of modern web development, and pushed me to deliver production-ready code under real deadlines
                </p>
                
                {/* import { SiPostgresql, SiVuedotjs, SiMysql, SiRabbitmq, SiSocketdotio, SiJavascript, SiPhp, SiRedis, SiDocker, SiExpress, SiNodedotjs, SiReact, SiJest } from "react-icons/si"; */}
                <div className="mt-4 grid grid-flow-col gap-5 items-center justify-end">
                  <SiJavascript size={20}  className="text-neutral-400 " />
                  <SiNodedotjs size={20} className="text-neutral-400 " />
                  <SiTypescript size={20} className="text-neutral-400 " />
                  <SiPostgresql size={20} className="text-neutral-400 " />
                  <SiMongodb size={20} className="text-neutral-400 " />
                  <SiReact size={20} className="text-neutral-400 " />
                  <SiVuedotjs size={20} className="text-neutral-400 " />
                  <SiExpress size={20} className="text-neutral-400 " />
                  <SiRabbitmq size={20} className="text-neutral-400 " />
                  <SiSocketdotio size={20} className="text-neutral-400 " />
                  <SiSequelize size={20} className="text-neutral-400 " />
                  <SiGraphql size={20} className="text-neutral-400 " />
                  <SiRedis size={20} className="text-neutral-400 " />
                  <SiJest size={20} className="text-neutral-400 " />
                  <SiDocker size={20} className="text-neutral-400 " />
                  <SiTailwindcss size={20} className="text-neutral-400 " />
                </div>
                
                
              </div>

            </div>
            
            
            {/* Spotify Block */}
            <div className="flex items-stretch py-6">
              {/* Timeline */}
              <div className="w-36 pr-4 border-r border-gray-300 text-sm text-gray-500 whitespace-nowrap">
                 
              </div>

              {/* Content */}
              <div className="pl-6  flex justify-center">
                <p className=" text-xl text-neutral-300">cant wait to see upcoming story !</p>
              </div>
            </div>

          </div>
        </div>
      </div> 
      
    </section>
  )
}