import { Sun, Moon } from "lucide-react";

export function ThemeToggleIcon() {
  return (
    <span className="relative h-full w-full flex items-center justify-center cursor-pointer">
      {/* Sun — visible in dark mode, rotates in */}
      <Sun className="h-full w-full absolute transition-all duration-200 ease-out opacity-0 rotate-90 dark:opacity-100 dark:rotate-0" />
      {/* Moon — visible in light mode, rotates out */}
      <Moon className="h-full w-full absolute transition-all duration-200 ease-out opacity-100 rotate-0 dark:opacity-0 dark:-rotate-90" />
    </span>
  );
}
