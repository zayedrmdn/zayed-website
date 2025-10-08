// components/layout/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={true}
      disableTransitionOnChange={true}
      storageKey="zayed-portfolio-theme"
      themes={["light", "dark", "system"]}
    >
      {children}
    </NextThemesProvider>
  );
}

// Export the hook from next-themes directly
export { useTheme } from "next-themes";