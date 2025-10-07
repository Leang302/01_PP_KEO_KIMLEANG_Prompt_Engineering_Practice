"use client";
import type { Task } from "@/types/task";
import { ModalBase } from "./ModalBase";

type Props = {
  task: Task | null;
  onClose: () => void;
};

export function TaskDetailModal({ task, onClose }: Props) {
  const open = Boolean(task);
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title={task ? task.title : "Task details"}
    >
      {task && (
        <div className="space-y-3 text-sm">
          {task.description && (
            <p className="whitespace-pre-wrap">{task.description}</p>
          )}
          <div className="text-neutral-500">
            <div>Priority: {task.priority}</div>
            <div>Created: {new Date(task.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(task.updatedAt).toLocaleString()}</div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ModalBase>
  );
}
