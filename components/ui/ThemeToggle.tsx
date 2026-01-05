"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme, forcedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-muted w-9 h-9 animate-pulse" />
    );
  }

  // If theme is forced, disable the toggle
  const disabled = !!forcedTheme;

  const handleThemeToggle = () => {
    if (disabled) return;

    // Cycle through themes: light -> dark -> system -> light
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return systemTheme === "dark" ? (
        <Moon size={20} className="text-accent hover:text-accent/80 transition-colors duration-200" />
      ) : (
        <Sun size={20} className="text-accent hover:text-accent/80 transition-colors duration-200" />
      );
    }

    return resolvedTheme === "light" ? (
      <Sun size={20} className="text-accent hover:text-accent/80 transition-colors duration-200" />
    ) : (
      <Moon size={20} className="text-accent hover:text-accent/80 transition-colors duration-200" />
    );
  };

  const getAriaLabel = () => {
    if (theme === "system") {
      return "Using system theme, click to switch to light mode";
    }
    return `Switch to ${theme === "light" ? "dark" : "system"} mode`;
  };

  return (
    <button
      onClick={handleThemeToggle}
      disabled={disabled}
      className={`p-2 rounded-lg bg-secondary hover:bg-accent/10 hover:shadow-md hover:shadow-accent/20 transition-all duration-200 border border-border ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
        }`}
      aria-label={getAriaLabel()}
      title={`Current theme: ${theme} (resolved: ${resolvedTheme})`}
    >
      {getIcon()}
    </button>
  );
}