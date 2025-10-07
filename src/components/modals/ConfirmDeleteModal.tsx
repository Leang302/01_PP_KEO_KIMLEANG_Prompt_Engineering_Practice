"use client";
import type { Task } from "@/types/task";
import { ModalBase } from "./ModalBase";

type Props = {
  task: Task | null;
  onCancel: () => void;
  onConfirm: (taskId: string) => void;
};

export function ConfirmDeleteModal({ task, onCancel, onConfirm }: Props) {
  const open = Boolean(task);
  return (
    <ModalBase open={open} onClose={onCancel} title="Delete task">
      {task && (
        <div className="space-y-3 text-sm">
          <p>
            Are you sure you want to delete "{task.title}"? This action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(task.id)}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </ModalBase>
  );
}
