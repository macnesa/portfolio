"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "./TransitionLink";

export default function SandboxTiga() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  const navParent = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  };

  const navItem = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const pageVariants = {
    initial: { scale: 1, opacity: 1, x: 0, y: 0, filter: "blur(0px) saturate(100%)" },
    exit: {
      scale: 0.95,
      opacity: 0,
      x: -50,
      y: -30,
      filter: "blur(8px) saturate(40%)",
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
    },
    enter: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) saturate(100%)",
      transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const handleNavigate = (href: string) => {
    setAnimating(true);
  
    setTimeout(() => {
      router.push(href); // langsung pakai parameter
      // setTimeout(() => {
      //   setAnimating(false);
      // }, 1000);
    }, 700);
  };
  

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="sandbox-tiga"
        initial="initial"
        animate={animating ? "exit" : "enter"}
        variants={pageVariants}
        className="grid grid-cols-1 md:grid-cols-[0.4fr_1fr] min-h-screen text-neutral-900 dark:text-neutral-100 relative overflow-hidden"
      >
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden md:block relative"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1674168531636-f44ecced6e13?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Artistic painting"
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Right: Content */}
        <div className="p-8 md:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-8xl mb-6 font-base"
          >
            <Typewriter
              options={{
                strings: [
                  "i craft ideas.",
                  "i resolve gaps.",
                  "i am macnesa.",
                  "welcome to my page",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
                delay: 50,
              }}
            />
          </motion.div>
 
          <motion.nav
            variants={navParent}
            initial="hidden"
            animate="show"
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-wrap gap-6 justify-end border-t pt-6 border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm"
          >
            {[
              { href: "/me", label: "about me" },
              { href: "/career", label: "portfolio" },
              { href: "#", label: "vision" },
              { href: "#", label: "blog" },
            ].map((link, idx) => (
              <motion.div key={idx} variants={navItem}>
                <button
                  onClick={() => handleNavigate(link.href)}
                  className="relative group transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-0.5 h-[2px] bg-neutral-700 dark:bg-neutral-200 transition-all duration-500 ease-out group-hover:w-full w-0 group-hover:left-0" />
                </button>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
