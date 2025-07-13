"use client";

import { ClerkProvider as ModuleClerkProvider } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";
import { dark } from "@clerk/themes";
import { useIsDarkMode } from "@/hooks/use-isDarkMode";

export function ClerkProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode();
  return (
    <Suspense>
      <ModuleClerkProvider
        appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
      >
        {children}
      </ModuleClerkProvider>
    </Suspense>
  );
}
