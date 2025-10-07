export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
}

export type TaskFilter = "all" | "active" | "completed";
