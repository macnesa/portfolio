"use client";

import { useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { usePathname } from "next/navigation";

// Component TypingText yang aman
const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState<React.ReactNode[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  
  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;

    const typeNext = () => {
      if (i >= text.length) return;

      const char = text[i];
      setDisplayed(prev =>
        char === "\n"
          ? [...prev, <br key={i} />]
          : [...prev, <span key={i}>{char}</span>]
      );

      i++;
      const isSentenceEnd = [".", "!", "?"].includes(char);
      const delay = isSentenceEnd ? 200 + Math.random() * 300 : 25;
      timeout = setTimeout(typeNext, delay);
    };

    typeNext();

    return () => {
      clearTimeout(timeout);
      setDisplayed([]); // reset biar nggak double di rerender
    };
  }, [text]);

  return <span>{displayed}</span>;
};

export default function MePage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  // Variants untuk Framer Motion
  const pageVariants = {
    hidden: { opacity: 0, scale: 1, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7 } },
  };

  const contentParent = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  const paragraphs = [
    `HELLO THERE 👋 you can call me mac. Ever since high school, I’ve been fascinated by breaking down complex problems, always curious to understand how things really work.\n\nI started with design, messing around in Photoshop, creating visuals, experimenting with colors and shapes. Then I wanted more than static images, I wanted them to move and feel alive, so I dove into programming.\n\nCoding became my way to bring ideas to life, not just to work, but to feel alive, smooth and precise. I love thinking about complex systems, analyzing, breaking things apart, and putting them back together until everything makes sense.\n\nAfter high school, I joined a healthtech startup in Jakarta as a full stack developer. That’s where I really learned how a team works under pressure, juggling deadlines, dealing with real users, and building products that actually matter. I figured out how companies operate, how to prioritize tasks, handle feedback, and push features live without losing sanity.\n\nOutside of code, I enjoy swimming and diving into new music—things that keep my head clear and my perspective wide.\n\nThat’s me in short. The rest, maybe, we can figure out together.`,
  ];

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="min-h-screen grid grid-cols-1 md:grid-cols-[0.5fr_0.5fr] text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      {/* Left - Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-64 md:h-auto overflow-hidden"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full"
        >
           <motion.img
            src="https://i.imgur.com/BkM66XQ.jpeg"
            alt="macnesa's profile image"
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          /> 
          
        </motion.div>
      </motion.div>

      {/* Right - Content */}
      <motion.div
        className="px-6 md:px-10 py-10 space-y-6"
        variants={contentParent}
      >
        {/* <p className="text-base italic font-light dark:text-neutral-500">who's behind the keyboard</p> */}
        {paragraphs.map((p, idx) => (
          <motion.p
            key={idx}
            className="font-[fira_code] text-sm md:text-base border-l border-neutral-700 pl-4 text-neutral-600 dark:text-neutral-300 leading-relaxed"
            variants={contentItem}
          >
            <TypingText text={p} />
          </motion.p>
        ))}
      </motion.div>
    </motion.section>
  );
}
