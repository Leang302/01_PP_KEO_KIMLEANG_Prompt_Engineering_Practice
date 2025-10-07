import type { Task } from "@/types/task";

const STORAGE_KEY = "todo.tasks.v1";

export type StorageResult<T> =
  | {
      ok: true;
      value: T;
      persisted: boolean; // false when using in-memory fallback
    }
  | {
      ok: false;
      error: Error;
      persisted: boolean;
    };

let memoryStore: Task[] | null = null;

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const k = "__ls_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function loadTasks(): StorageResult<Task[]> {
  try {
    if (isLocalStorageAvailable()) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ok: true, value: [], persisted: true };
      const parsed = JSON.parse(raw) as Task[];
      return { ok: true, value: parsed, persisted: true };
    }
    if (!memoryStore) memoryStore = [];
    return { ok: true, value: memoryStore, persisted: false };
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
      persisted: isLocalStorageAvailable(),
    };
  }
}

export function saveTasks(tasks: Task[]): StorageResult<void> {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return {
        ok: true,
        value: undefined,
        persisted: true,
      } as StorageResult<void>;
    }
    memoryStore = tasks;
    return {
      ok: true,
      value: undefined,
      persisted: false,
    } as StorageResult<void>;
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
      persisted: isLocalStorageAvailable(),
    };
  }
}

export function clearTasks(): void {
  if (isLocalStorageAvailable()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  memoryStore = [];
}
