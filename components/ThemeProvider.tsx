"use client";

import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Setup dark theme
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark-theme");
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.color = "#f8fafc";
  }, []);

  // Prevent flash while mounting
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
