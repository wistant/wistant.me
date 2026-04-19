"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

interface GithubCalendarProps {
  username: string;
}

export function GithubCalendar({ username }: GithubCalendarProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        fontSize={11}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
        theme={{
          dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
          light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        }}
      />
    </div>
  );
}
