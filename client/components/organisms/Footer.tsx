"use client";
import { motion } from "framer-motion";

import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";

export default function Footer() {

  const icons = [
    {
      icon: SiGithub,
      link: "https://github.com/macnesa",
      color: "#cfcfcf", // Github black
    },
    {
      icon: SiGmail,
      link: "mailto:mmacnesa@gmail.com",
      color: "#EA4335", // Gmail red
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/lintang-macnesa-74a3b3282/",
      color: "#0077B5", // LinkedIn blue
    },
  ];

  return (
    <footer className="relative dark:border-neutral-800 bg-white/70 dark:bg-neutral-900 backdrop-blur-xl">
      <div className="mx-auto max-w-screen-xl px-6 py-10 md:py-14">
        {/* Top area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:flex md:items-center md:justify-between"
        >
          <a href="/" className="text-2xl font-bold tracking-tight dark:text-white">
            macnesa
          </a>

          {/* Nav links */}
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-2 md:mt-0">
            <div>
              <h2 className="mb-4 text-sm font uppercase text-neutral-800 dark:text-neutral-200">
                Pages
              </h2>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li><a href="/" className="relative group">Home<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
                <li><a href="/me" className="relative group">About<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font uppercase text-neutral-800 dark:text-neutral-200">
                Explore
              </h2>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li><a href="/career" className="relative group">Portfolio<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
                <li><a href="/vision" className="relative group">Vision<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
              </ul>
            </div>

            {/* <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200">
                Socials
              </h2>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li><a href="https://linkedin.com/in/username" className="relative group">LinkedIn<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
                <li><a href="https://twitter.com/username" className="relative group">Twitter<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all group-hover:w-full"></span></a></li>
              </ul>
            </div> */}

          </div>

        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Bottom area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 sm:flex-row"
        >
         <p className="text-xs text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} lintang macnesa. glad you’re here — stay awesome 🤝
        </p>

          {/* Socials */}
          <div className="flex gap-6">
            {icons.map(({ icon: Icon, link, color }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
              >
                <Icon
                  size={20}
                  className="text-neutral-500 dark:text-neutral-400 transition-colors duration-200"
                  style={{
                    color: undefined, // default abu-abu
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                />
              </a>
            ))}
          </div>


        </motion.div>
      </div>
    </footer>
  );
}
