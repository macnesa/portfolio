"use client";

import React, { useEffect } from "react";
import { FaLastfm } from "react-icons/fa";
import { useScrobbleTimeStore } from "@/store/lastfm/userStore";
import { CountUp } from "../atoms/CountUp";
import { motion } from "framer-motion";

export const ScrobbleTime: React.FC = () => {
  const { data, fetch } = useScrobbleTimeStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);

  return (
    <motion.div
      // initial={{ opacity: 0, y: 40 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative h-36 rounded-xl overflow-hidden text-white shadow-xl flex items-center justify-between px-6 py-5"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff4c4c] to-[#d51007]" />

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex gap-5 items-center w-full">
        {/* Pulsing Icon BG */}
        <motion.div
          className="flex-shrink-0 rounded-full p-3 shadow-md"
          animate={{
            backgroundColor: ["#d51007", "#ff4c4c", "#d51007"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaLastfm size={30} className="text-white" />
        </motion.div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-4xl mt-1 font-semibold text-start leading-none drop-shadow-lg">
            {data ? <CountUp value={data.total} /> : "--"}
          </span>
          <span className="uppercase text-xs text-start mt-1 tracking-widest opacity-70">
            scrobbles last week on{" "}
            <a
              className="hover:underline"
              href="https://www.last.fm/"
              target="_blank"
            >
              Last.fm
            </a>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
