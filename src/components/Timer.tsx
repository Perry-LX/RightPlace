import { useEffect, useState, useRef } from "react";
import { Clock } from "@phosphor-icons/react";

interface TimerProps {
  startTime: number | null;
  isRunning: boolean;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Timer({ startTime, isRunning }: TimerProps) {
  const [display, setDisplay] = useState(0);
  const accumRef = useRef(0);
  const periodStartRef = useRef(0);

  useEffect(() => {
    if (!startTime) {
      setDisplay(0);
      accumRef.current = 0;
      periodStartRef.current = 0;
      return;
    }

    if (!isRunning) {
      // Game just paused/stopped — add the last running period to accumulator
      if (periodStartRef.current > 0) {
        accumRef.current += Date.now() - periodStartRef.current;
        periodStartRef.current = 0;
      }
      // Update display to the frozen accumulated time
      setDisplay(accumRef.current);
      return;
    }

    // Game is running (or resuming)
    periodStartRef.current = Date.now();
    setDisplay(accumRef.current);

    const tick = () => {
      setDisplay(accumRef.current + (Date.now() - periodStartRef.current));
    };

    const interval = setInterval(tick, 200);
    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  if (!startTime) return null;

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm font-medium text-zinc-600">
      <Clock size={16} weight="bold" />
      <span>{formatTime(display)}</span>
    </div>
  );
}
