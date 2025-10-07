"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("theme.dark");
    const stored = raw === "1" ? true : raw === "0" ? false : null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? prefersDark;
    setDark(Boolean(initial));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme.dark", dark ? "1" : "0");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
      aria-label="Toggle theme"
      title="Toggle light/dark"
    >
      {dark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"} mode</span>
    </button>
  );
}
