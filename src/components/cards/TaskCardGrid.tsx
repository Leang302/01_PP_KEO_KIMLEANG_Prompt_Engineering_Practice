"use client";
import { TaskCard, TaskCardProps } from "./TaskCard";

type Props = {
  items: TaskCardProps[];
};

export function TaskCardGrid({ items }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((it, idx) => (
        <TaskCard key={idx} {...it} />
      ))}
    </div>
  );
}
