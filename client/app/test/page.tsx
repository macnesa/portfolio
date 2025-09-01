"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Komponen typing per paragraf, delay per titik dan mendukung \n
export const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    let i = 0;
    const chars = text.split(""); // split semua karakter
    const typeNext = () => {
      if (i >= chars.length) return;

      const char = chars[i];
      setDisplayed((prev) => {
        if (char === "\n") {
          return [...prev, <br key={i} />];
        }
        return [...prev, char];
      });

      i++;

      // Delay acak setelah titik, tanda tanya, atau tanda seru
      const isSentenceEnd = char === "." || char === "!" || char === "?";
      const delay = isSentenceEnd ? 200 + Math.random() * 300 : 25;

      setTimeout(typeNext, delay);
    };

    typeNext();
  }, [text]);

  return <span>{displayed}</span>;
};

export default function MeBioTyping() {
  const paragraphs = [
    "Hey, I’m Pow — short for Abi Noval Fauzi.\n\nI’m a self-taught software engineer who got into tech not through a degree or bootcamp, but through a deep love for creating things.\nI found my groove in frontend development, where design meets logic, and where I get to bring ideas to life in a way that looks and feels good.\nThere’s something special about shaping what people see and interact with.",
  ];

  const contentParent = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { staggerChildren: 0.3 }
    },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="px-6 md:px-10 py-10 space-y-6"
      variants={contentParent}
      initial="hidden"
      animate="show"
    >
      {paragraphs.map((p, idx) => (
        <motion.p
          key={idx}
          className="font-[fira_code] text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed"
          variants={contentItem}
        >
          <TypingText text={p} />
        </motion.p>
      ))}
    </motion.div>
  );
}
