import { useEffect, useState } from "react";

const eventTime = new Date("2026-10-31T16:00:00+03:00").getTime();

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setMounted(true);
    setRemaining(Math.max(0, eventTime - Date.now()));
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, eventTime - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = [
    [mounted ? Math.floor(remaining / 86400000) : 0, "days"],
    [mounted ? Math.floor((remaining / 3600000) % 24) : 0, "hrs"],
    [mounted ? Math.floor((remaining / 60000) % 60) : 0, "min"],
    [mounted ? Math.floor((remaining / 1000) % 60) : 0, "sec"],
  ] as const;

  return (
    <div
      className="grid grid-cols-4 divide-x divide-bone/20 border-y border-bone/20"
      aria-label="Countdown to the event"
    >
      {values.map(([value, label]) => (
        <div
          className={compact ? "px-2 py-2 text-center" : "px-2 py-3 text-center sm:px-5"}
          key={label}
        >
          <div
            suppressHydrationWarning
            className={
              compact
                ? "font-display text-2xl text-bone"
                : "font-display text-3xl text-bone sm:text-5xl"
            }
          >
            {mounted ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
