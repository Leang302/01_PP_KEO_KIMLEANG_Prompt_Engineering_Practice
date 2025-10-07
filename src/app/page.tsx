"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter, TaskPriority } from "@/types/task";
import { Header } from "@/components/Header";
import { TaskForm } from "@/components/TaskForm";
import { Filters } from "@/components/Filters";
import { TaskList } from "@/components/TaskList";
import { TaskDetailModal } from "@/components/modals/TaskDetailModal";
import { EditTaskModal } from "@/components/modals/EditTaskModal";
import { ConfirmDeleteModal } from "@/components/modals/ConfirmDeleteModal";
import { loadTasks, saveTasks } from "@/lib/storage";
import { createSeedTasks } from "@/lib/seeds";
import { generateUuid } from "@/lib/uuid";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [persisted, setPersisted] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<
    "createdDesc" | "createdAsc" | "priorityDesc" | "priorityAsc"
  >("createdDesc");

  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  // Initial load + seed if empty
  useEffect(() => {
    const res = loadTasks();
    if (res.ok) {
      let initial = res.value;
      if (initial.length === 0) {
        initial = createSeedTasks();
        saveTasks(initial);
      }
      setTasks(initial);
      setPersisted(res.persisted);
    } else {
      setTasks(createSeedTasks());
      setPersisted(false);
    }
  }, []);

  // Persist on changes
  useEffect(() => {
    if (tasks.length === 0) return; // avoid saving before initial load completes
    const res = saveTasks(tasks);
    setPersisted(res.ok ? res.persisted : false);
  }, [tasks]);

  const counts = useMemo(() => {
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.length - active;
    return { all: tasks.length, active, completed };
  }, [tasks]);

  const hasDuplicateTitle = useCallback(
    (title: string, exceptId?: string) => {
      const lower = title.toLowerCase();
      return tasks.some(
        (t) => t.id !== exceptId && t.title.toLowerCase() === lower
      );
    },
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    let items = tasks;
    if (filter === "active") items = items.filter((t) => !t.completed);
    if (filter === "completed") items = items.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((t) => t.title.toLowerCase().includes(q));
    }
    const priorityWeight: Record<TaskPriority, number> = {
      low: 1,
      medium: 2,
      high: 3,
    };
    if (sort === "createdDesc")
      items = [...items].sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "createdAsc")
      items = [...items].sort((a, b) => a.createdAt - b.createdAt);
    if (sort === "priorityDesc")
      items = [...items].sort(
        (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
      );
    if (sort === "priorityAsc")
      items = [...items].sort(
        (a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]
      );
    return items;
  }, [tasks, filter, search, sort]);

  function addTask(title: string, description: string, priority: TaskPriority) {
    const now = Date.now();
    const newTask: Task = {
      id: generateUuid(),
      title,
      description,
      completed: false,
      priority,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: Date.now() }
          : t
      )
    );
  }

  function saveEdit(partial: {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
  }) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === partial.id
          ? {
              ...t,
              title: partial.title,
              description: partial.description,
              priority: partial.priority,
              updatedAt: Date.now(),
            }
          : t
      )
    );
    setEditTask(null);
  }

  function confirmDelete(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setDeleteTask(null);
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <Header />
        {!persisted && (
          <div
            role="status"
            className="rounded-xl border border-amber-300 bg-amber-50 text-amber-900 px-3 py-2 text-sm"
          >
            Local storage is unavailable. Tasks will not persist across reloads.
          </div>
        )}
        <TaskForm
          onAdd={addTask}
          hasDuplicateTitle={(t) => hasDuplicateTitle(t)}
        />
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card p-4 sm:p-5 border border-neutral-100 dark:border-neutral-800 space-y-4">
          <Filters
            filter={filter}
            counts={counts}
            onChange={setFilter}
            search={search}
            onSearch={setSearch}
            sort={sort}
            onSort={setSort}
          />
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onOpenDetail={setDetailTask}
            onEdit={setEditTask}
            onDelete={setDeleteTask}
          />
        </div>
      </div>

      <TaskDetailModal task={detailTask} onClose={() => setDetailTask(null)} />
      <EditTaskModal
        task={editTask}
        onCancel={() => setEditTask(null)}
        onSave={saveEdit}
        hasDuplicateTitle={hasDuplicateTitle}
      />
      <ConfirmDeleteModal
        task={deleteTask}
        onCancel={() => setDeleteTask(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
