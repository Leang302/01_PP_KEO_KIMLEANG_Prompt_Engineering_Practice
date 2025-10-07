"use client";
import type { Task, TaskPriority } from "@/types/task";
import { useEffect, useRef, useState } from "react";
import { ModalBase } from "./ModalBase";

type Props = {
  task: Task | null;
  onCancel: () => void;
  onSave: (partial: {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
  }) => void;
  hasDuplicateTitle: (title: string, exceptId?: string) => boolean;
};

export function EditTaskModal({
  task,
  onCancel,
  onSave,
  hasDuplicateTitle,
}: Props) {
  const open = Boolean(task);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [error, setError] = useState<string | null>(null);
  const [dup, setDup] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description ?? "");
    setPriority(task.priority);
    setError(null);
    setDup(false);
    setTimeout(() => titleRef.current?.focus(), 0);
  }, [task]);

  useEffect(() => {
    if (!task) return;
    setDup(Boolean(title.trim()) && hasDuplicateTitle(title.trim(), task.id));
  }, [title, task, hasDuplicateTitle]);

  function handleSave() {
    if (!task) return;
    const t = title.trim();
    if (!t) {
      setError("Title is required");
      titleRef.current?.focus();
      return;
    }
    onSave({
      id: task.id,
      title: t,
      description: description.trim(),
      priority,
    });
  }

  return (
    <ModalBase open={open} onClose={onCancel} title="Edit task">
      {task && (
        <div className="space-y-3">
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "edit-title-error" : undefined}
            placeholder="Title"
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full min-h-[90px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm text-neutral-600 dark:text-neutral-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {error && (
            <div id="edit-title-error" className="text-red-600 text-sm">
              {error}
            </div>
          )}
          {dup && !error && (
            <div className="text-amber-600 text-sm">
              A task with this title already exists.
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2 text-neutral-900 dark:text-white">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-brand-600 text-black dark:text-white shadow hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </ModalBase>
  );
}
