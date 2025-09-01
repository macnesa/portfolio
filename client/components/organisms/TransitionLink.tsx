import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const pageTransitionVariants = {
  initial: { scale: 1, opacity: 1, x: 0, y: 0, filter: "blur(0px) saturate(100%)" },
  exit: {
    scale: 0.85,
    opacity: 0,
    x: -50,  // geser ke kiri atas, bisa disesuaikan
    y: -30,
    filter: "blur(8px) saturate(40%)",
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
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

export function TransitionLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimating(true);

    setTimeout(() => {
      router.push(href);
      setAnimating(false);
    }, 700);
  };

  return (
    <>
      <a onClick={handleClick} className="cursor-pointer font-semibold">
        {children}
      </a>

      <AnimatePresence>
        {animating && (
          <motion.div
            key="page-transition"
            variants={pageTransitionVariants}
            initial="initial"
            animate="exit"
            exit="enter"
            className="fixed inset-0 z-[999] bg-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
