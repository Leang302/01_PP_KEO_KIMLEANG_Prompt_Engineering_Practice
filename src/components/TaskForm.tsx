"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type Props = {
  onAdd: (
    title: string,
    description: string,
    priority: "low" | "medium" | "high"
  ) => void;
  hasDuplicateTitle: (title: string) => boolean;
};

export function TaskForm({ onAdd, hasDuplicateTitle }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState<string | null>(null);
  const [dup, setDup] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDup(Boolean(title.trim()) && hasDuplicateTitle(title.trim()));
  }, [title, hasDuplicateTitle]);

  function handleSubmit() {
    const t = title.trim();
    if (!t) {
      setError("Title is required");
      titleRef.current?.focus();
      return;
    }
    onAdd(t, description.trim(), priority);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setError(null);
    setDup(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card p-4 sm:p-5 border border-neutral-100 dark:border-neutral-800"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "title-error" : undefined}
            placeholder="Task title"
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-fuchsia-500 text-white px-5 py-2.5 shadow shadow-brand-500/20 hover:from-brand-600 hover:via-indigo-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Add task"
          >
            <span className="relative inline-flex items-center">
              <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </span>
            <span className="font-semibold">Add task</span>
          </motion.button>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="min-h-[70px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
        />
        {error && (
          <div
            id="title-error"
            className="flex items-center gap-2 text-red-600 text-sm"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            {error}
          </div>
        )}
        {dup && !error && (
          <div className="flex items-center gap-2 text-amber-600 text-sm">
            <ExclamationTriangleIcon className="w-4 h-4" />A task with this
            title already exists.
          </div>
        )}
      </div>
    </motion.div>
  );
}
