import { useEffect, useState } from "react";

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Create abort controller
    const controller = new AbortController();

    // Hook event listener
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (e) => {
        setIsDarkMode(e.matches);
      },
      { signal: controller.signal }
    );

    // Unhook event listener
    return () => controller.abort();
  }, []);

  return isDarkMode;
}
