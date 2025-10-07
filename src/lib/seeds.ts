import type { Task } from "@/types/task";
import { generateUuid } from "./uuid";

export function createSeedTasks(): Task[] {
  const now = Date.now();
  return [
    {
      id: generateUuid(),
      title: "Plan weekly groceries",
      description: "Make a list of ingredients for 3 dinners and breakfast.",
      completed: false,
      priority: "medium",
      createdAt: now - 1000 * 60 * 60 * 24,
      updatedAt: now - 1000 * 60 * 60 * 24,
    },
    {
      id: generateUuid(),
      title: "Workout: 20-minute run",
      description: "Warm up 5 min, run 15 min at easy pace.",
      completed: false,
      priority: "high",
      createdAt: now - 1000 * 60 * 60 * 3,
      updatedAt: now - 1000 * 60 * 60 * 3,
    },
    {
      id: generateUuid(),
      title: "Read a chapter of a book",
      description: "Continue reading the current novel in the evening.",
      completed: true,
      priority: "low",
      createdAt: now - 1000 * 60 * 60 * 48,
      updatedAt: now - 1000 * 60 * 60 * 36,
    },
  ];
}
