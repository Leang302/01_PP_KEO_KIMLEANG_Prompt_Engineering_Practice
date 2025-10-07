"use client";
import { motion } from "framer-motion";
import { BoltIcon, CalendarIcon } from "@heroicons/react/24/outline";

type Priority = "urgent" | "normal" | "low";

export type TaskCardProps = {
  name: string;
  deadline: string; // formatted string
  assignedBy: string;
  classLabel: string;
  type: string;
  priority?: Priority;
  canSubmit?: boolean;
  canEdit?: boolean;
  onSubmit?: () => void;
  onEdit?: () => void;
};

const priorityStyles: Record<
  Priority,
  { ring: string; text: string; chip: string }
> = {
  urgent: {
    ring: "ring-red-200",
    text: "text-red-600",
    chip: "bg-red-50 text-red-600 border-red-200",
  },
  normal: {
    ring: "ring-neutral-200",
    text: "text-neutral-600",
    chip: "bg-neutral-50 text-neutral-700 border-neutral-200",
  },
  low: {
    ring: "ring-emerald-200",
    text: "text-emerald-600",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export function TaskCard({
  name,
  deadline,
  assignedBy,
  classLabel,
  type,
  priority = "normal",
  canSubmit = false,
  canEdit = false,
  onSubmit,
  onEdit,
}: TaskCardProps) {
  const p = priorityStyles[priority];
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-5 ring-1 ${p.ring}`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
        <BoltIcon className={`${p.text} w-4 h-4`} />
        <span className={`${p.text}`}>{priority}</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
        {name}
      </h3>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <CalendarIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
          </span>
          <div>
            <div className="text-neutral-500 dark:text-neutral-400">
              Deadline
            </div>
            <div className="font-medium text-neutral-900 dark:text-white">
              {deadline}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            {/* person icon via unicode */}
            <span className="text-neutral-600 dark:text-neutral-300">👤</span>
          </span>
          <div>
            <div className="text-neutral-500 dark:text-neutral-400">
              Assigned By
            </div>
            <div className="font-medium text-neutral-900 dark:text-white">
              {assignedBy}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-300">📚</span>
          </span>
          <div>
            <div className="text-neutral-500 dark:text-neutral-400">Class</div>
            <div className="font-medium text-neutral-900 dark:text-white">
              {classLabel}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-300">🏷️</span>
          </span>
          <div>
            <div className="text-neutral-500 dark:text-neutral-400">Type</div>
            <div className="font-medium text-neutral-900 dark:text-white">
              {type}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${p.chip}`}
        >
          <span className="h-2 w-2 rounded-full bg-current" /> {priority}
        </span>
        <div className="flex items-center gap-2">
          {canSubmit && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              className="rounded-xl bg-brand-600 text-white px-3 py-1.5 text-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Submit work"
            >
              Submit
            </motion.button>
          )}
          {canEdit && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onEdit}
              className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Edit task"
            >
              Edit
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
