// components/ui/ThemeSelector.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

interface ThemeSelectorProps {
  variant?: "dropdown" | "tabs";
  showLabels?: boolean;
}

export default function ThemeSelector({ 
  variant = "dropdown", 
  showLabels = false 
}: ThemeSelectorProps) {
  const { theme, setTheme, resolvedTheme, systemTheme, themes, forcedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return variant === "dropdown" ? (
      <div className="w-24 h-8 bg-muted rounded animate-pulse" />
    ) : (
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-8 h-8 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  // If theme is forced, show disabled state
  const disabled = !!forcedTheme;

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case "light":
        return <Sun size={16} />;
      case "dark":
        return <Moon size={16} />;
      case "system":
        return <Monitor size={16} />;
      default:
        return null;
    }
  };

  const getThemeLabel = (themeName: string) => {
    switch (themeName) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return `System (${systemTheme || "unknown"})`;
      default:
        return themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  };

  if (variant === "dropdown") {
    return (
      <div className="relative">
        <select
          value={theme || "system"}
          onChange={(e) => setTheme(e.target.value)}
          disabled={disabled}
          className={`
            px-3 py-2 pr-8 bg-card 
            border border-border 
            rounded-lg text-sm
            text-foreground
            focus:ring-2 focus:ring-primary focus:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          `}
          aria-label="Select theme"
        >
          {themes.map((themeName) => (
            <option key={themeName} value={themeName}>
              {getThemeLabel(themeName)}
            </option>
          ))}
        </select>
        {disabled && (
          <div className="absolute inset-0 bg-muted/20 rounded-lg" />
        )}
      </div>
    );
  }

  // Tab variant
  return (
    <div className="flex bg-muted rounded-lg p-1 gap-1">
      {themes.map((themeName) => {
        const isActive = theme === themeName;
        return (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
              transition-all duration-200
              ${isActive 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            aria-label={`Switch to ${getThemeLabel(themeName)}`}
            title={themeName === "system" ? `System theme (currently ${systemTheme})` : `${getThemeLabel(themeName)} theme`}
          >
            {getThemeIcon(themeName)}
            {showLabels && (
              <span className="hidden sm:inline">
                {getThemeLabel(themeName)}
              </span>
            )}
          </button>
        );
      })}
      
      {/* Show current resolved theme for system */}
      {theme === "system" && (
        <div className="flex items-center px-2 text-xs text-muted-foreground">
          → {resolvedTheme}
        </div>
      )}
    </div>
  );
}

// Hook for theme-aware image sources (handles hydration properly)
export function useThemeImage(lightSrc: string, darkSrc: string, fallbackSrc?: string) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return empty image during hydration to avoid mismatch
    return fallbackSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  return resolvedTheme === 'dark' ? darkSrc : lightSrc;
}