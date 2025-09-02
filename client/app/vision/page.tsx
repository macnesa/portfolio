"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Vision() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.10),transparent),radial-gradient(40%_30%_at_80%_20%,rgba(236,72,153,0.10),transparent)]" />

      <motion.section
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-2xl rounded-2xl  border-neutral-200/60 bg-white/70 p-8 backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-900/40"
      >
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          This page is still cooking 🍳
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Think of it as a gentle 404: you found the right place, it’s just not
          finished yet. I’m actively shaping this section—check back soon.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            ← Back to home
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
