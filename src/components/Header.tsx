"use client";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">
            Tasks
          </span>
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Capture, prioritize, and complete. Offline ready.
        </p>
      </motion.div>
    </header>
  );
}
