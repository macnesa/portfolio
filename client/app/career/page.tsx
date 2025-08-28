"use client"

import Link from "next/link"
import { FaSpotify, FaLastfm } from "react-icons/fa"
import { SiPostgresql, SiVuedotjs, SiMysql, SiRabbitmq, SiSocketdotio, SiJavascript, SiPhp, SiRedis, SiDocker, SiExpress, SiNodedotjs, SiReact, SiJest, SiMongodb, SiTypescript, SiTailwindcss, SiGraphql, SiSequelize } from "react-icons/si";

import { Dialog } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from "react";


export default function Career() {


  const images = [
    'https://plus.unsplash.com/premium_photo-1756181211629-a024a0154173?q=80&w=2392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1755429518361-1d6060edcf3c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1755603642127-d48faaa51493?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1755429518361-1d6060edcf3c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length)

  const goPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )



  return (
    <section className="min-h-[1000px]  border-black grid grid-cols-[0.3fr_1fr] justify-center   text-gray-900">
      <div>
        <img className="h-full object-cover grayscale-100" src="https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
      </div>


      <section className="px-12   border-black">


        <div className="relative max-w-4xl h-full pt-12  space-y-12  border-red-200">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold tracking-tight leading-relaxed">
              the path i've <span className="italic border-b border-gray-400">taken</span>
            </h2>
          </div>

          {/* Career Blocks Container */}
          <div className="flex flex-col divide-y divide-gray-300 relative z-10">

            {/* Zicare Block */}
            <div className="flex items-stretch py-6">
              <div className="w-20 pr-4 border-r border-gray-200 text-sm text-gray-500 whitespace-nowrap">
                jun '23
              </div>
              <div className="pl-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 items-center">
                  <img
                    className="h-10 black grayscale-50"
                    src="https://zicare.id/upload/website/logo_header.svg"
                    alt="zi.care logo"
                  />
                  <h3 className="text-xl text-right">full stack engineer</h3>
                </div>
                <p className="text-gray-600 mt-4">
                  i started my career as a full stack developer at zi.care, a health-tech company focused on building digital infrastructure for healthcare providers, During my time at Zicare, I helped develop a backoffice system tailored for hospitals. I contributed to a full migration of their database infrastructure from MySQL to PostgreSQL and worked on creating an integrated system to support public health centers (puskesmas) in streamlining their operations.
                </p>
                <div className="mt-4 grid grid-flow-col gap-5 items-center justify-end">
                  <SiJavascript size={20} className="text-neutral-400" />
                  <SiPhp size={20} className="text-neutral-400" />
                  <SiMysql size={20} className="text-neutral-400" />
                  <SiVuedotjs size={20} className="text-neutral-400" />
                  <SiRabbitmq size={20} className="text-neutral-400" />
                  <SiSocketdotio size={20} className="text-neutral-400" />
                  <SiRedis size={20} className="text-neutral-400" />
                  <SiDocker size={20} className="text-neutral-400" />
                </div>
              </div>
            </div>

            {/* Hacktiv8 Block */}
            <div className="flex items-stretch py-6">
              <div className="w-20 pr-4 border-r border-gray-200 text-sm text-gray-500 whitespace-nowrap">
                march '23
              </div>
              <div className="pl-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 items-center">
                  <img className="w-72 grayscale-50" src="https://www.hacktiv8.com/footer_logo.svg" alt="hacktiv8 logo" />
                  <h3 className="text-xl text-right">full stack immersive program</h3>
                </div>
                <p className="text-gray-600 mt-4">
                  completed the fullstack javascript program at hacktiv8 — an intensive, structured bootcamp, During my time at Zicare, I helped develop a backoffice system tailored for hospitals. I contributed to a full migration of their database infrastructure from MySQL to PostgreSQL and worked on creating an integrated system to support public health centers (puskesmas) in streamlining their operations.
                </p>
                <div className="mt-4 grid grid-flow-col gap-5 items-center justify-end">
                  <SiJavascript size={20} className="text-neutral-400" />
                  <SiNodedotjs size={20} className="text-neutral-400" />
                  <SiTypescript size={20} className="text-neutral-400" />
                  <SiPostgresql size={20} className="text-neutral-400" />
                  <SiMongodb size={20} className="text-neutral-400" />
                  <SiReact size={20} className="text-neutral-400" />
                  <SiVuedotjs size={20} className="text-neutral-400" />
                  <SiExpress size={20} className="text-neutral-400" />
                  <SiRabbitmq size={20} className="text-neutral-400" />
                  <SiSocketdotio size={20} className="text-neutral-400" />
                  <SiSequelize size={20} className="text-neutral-400" />
                  <SiGraphql size={20} className="text-neutral-400" />
                  <SiRedis size={20} className="text-neutral-400" />
                  <SiJest size={20} className="text-neutral-400" />
                  <SiDocker size={20} className="text-neutral-400" />
                  <SiTailwindcss size={20} className="text-neutral-400" />
                </div>
              </div>
            </div>

            {/* Closing Line */}
            <div className="flex items-stretch py-6">
              <div className="w-20 pr-4 border-r border-gray-200 text-sm text-gray-500 whitespace-nowrap" />
              <div className="pl-6">
                <p className="text-xl text-neutral-300 italic">
                  can't wait to see the next chapter unfold!
                </p>
              </div>
            </div>
          </div>

          {/* Mini Background Carousel - Fixed Bottom Right */}
          <div className="absolute bottom-0 w-full cursor-pointer z-0">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={4}
              spaceBetween={0}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[16/9] overflow-hidden  shadow-md">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover grayscale-50"
                      onClick={() => openModal(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Modal Preview */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto p-4">
          <Dialog.Panel className="relative bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain bg-black"
            />

            {/* Controls */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              ✕
            </button>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              ›
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
          </div>
        </div>


      </section>

    </section>
  )
}