"use client";
import type { TaskFilter } from "@/types/task";

type Props = {
  filter: TaskFilter;
  counts: { all: number; active: number; completed: number };
  onChange: (f: TaskFilter) => void;
  search: string;
  onSearch: (v: string) => void;
  sort: "createdDesc" | "createdAsc" | "priorityDesc" | "priorityAsc";
  onSort: (v: Props["sort"]) => void;
};

export function Filters({
  filter,
  counts,
  onChange,
  search,
  onSearch,
  sort,
  onSort,
}: Props) {
  const baseBtn =
    "px-3 py-1.5 rounded-lg text-black border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors text-neutral-900 dark:text-white";
  const activeBtn =
    "bg-brand-600 text-black border-transparent hover:bg-brand-700";
  const idleBtn =
    "bg-white text-neutral-900 text-black dark:text-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800";

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => onChange("all")}
          className={`${baseBtn} ${filter === "all" ? activeBtn : idleBtn}`}
          aria-pressed={filter === "all"}
        >
          All ({counts.all})
        </button>
        <button
          onClick={() => onChange("active")}
          className={`${baseBtn} ${filter === "active" ? activeBtn : idleBtn}`}
          aria-pressed={filter === "active"}
        >
          Active ({counts.active})
        </button>
        <button
          onClick={() => onChange("completed")}
          className={`${baseBtn} ${
            filter === "completed" ? activeBtn : idleBtn
          }`}
          aria-pressed={filter === "completed"}
        >
          Completed ({counts.completed})
        </button>
      </div>
      <div className="flex gap-2 w-full sm:w-auto items-center">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search title..."
          className="flex-1 sm:flex-none sm:w-60 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Search tasks by title"
        />
        <div className="relative">
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onSort(e.target.value as Props["sort"])
            }
            className="appearance-none pr-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Sort tasks"
          >
            <option value="createdDesc">Newest</option>
            <option value="createdAsc">Oldest</option>
            <option value="priorityDesc">Priority High→Low</option>
            <option value="priorityAsc">Priority Low→High</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.114l3.71-3.882a.75.75 0 111.08 1.04l-4.24 4.44a.75.75 0 01-1.08 0l-4.24-4.44a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
