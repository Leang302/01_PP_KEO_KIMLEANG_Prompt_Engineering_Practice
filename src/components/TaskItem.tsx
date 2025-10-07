"use client";
import type { Task } from "@/types/task";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onOpenDetail: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskItem({
  task,
  onToggle,
  onOpenDetail,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex items-start gap-3 shadow-sm hover:shadow-card"
    >
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 w-1 ${
          task.completed
            ? "bg-gradient-to-b from-emerald-400 to-emerald-600"
            : "bg-gradient-to-b from-brand-400 to-indigo-500"
        }`}
      />
      <button
        onClick={() => onToggle(task.id)}
        aria-pressed={task.completed}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 ${
          task.completed
            ? "border-neutral-300 bg-brand-600 border-brand-600 text-white"
            : "bg-white border-neutral-300  dark:bg-neutral-900 dark:border-neutral-700"
        }`}
      >
        {task.completed && (
          <div className="text-neutral-300 dark:text-white">
            <CheckCircleIcon className="w-5 h-5" />
          </div>
        )}
      </button>
      <div
        className="flex-1 min-w-0"
        onClick={() => onOpenDetail(task)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") onOpenDetail(task);
        }}
      >
        <p
          className={`font-semibold truncate text-neutral-900 dark:text-white tracking-tight ${
            task.completed ? "line-through opacity-70" : ""
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p
            className={`text-sm text-neutral-600 dark:text-neutral-400 truncate ${
              task.completed ? "line-through opacity-60" : ""
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border ${
              task.priority === "high"
                ? "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200"
                : task.priority === "medium"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {task.priority}
          </span>
          <span className="text-xs text-neutral-500">
            Updated {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-transform group-hover:translate-y-[-1px]"
          aria-label="Edit task"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task)}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform group-hover:translate-y-[-1px]"
          aria-label="Delete task"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.li>
  );
}
