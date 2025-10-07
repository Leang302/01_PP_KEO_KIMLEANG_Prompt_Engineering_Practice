"use client";
import type { Task } from "@/types/task";
import { AnimatePresence, motion } from "framer-motion";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onOpenDetail: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskList({
  tasks,
  onToggle,
  onOpenDetail,
  onEdit,
  onDelete,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-neutral-500 dark:text-neutral-400 py-8">
        No tasks to show.
      </div>
    );
  }
  return (
    <motion.ul layout className="space-y-3">
      <AnimatePresence initial={false}>
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={onToggle}
            onOpenDetail={onOpenDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
