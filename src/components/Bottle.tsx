import { motion } from "motion/react";
import { useState } from "react";
import type { Bottle as BottleType } from "../types/game";

interface BottleProps {
  bottle: BottleType;
  isSelected: boolean;
  position: number;
  onSelect: () => void;
  onDragStart: (pos: number) => void;
  onDrop: (pos: number) => void;
  disabled?: boolean;
}

export default function Bottle({
  bottle,
  isSelected,
  position,
  onSelect,
  onDragStart,
  onDrop,
  disabled,
}: BottleProps) {
  const [imgError, setImgError] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", String(position));
    e.dataTransfer.effectAllowed = "move";
    onDragStart(position);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(position);
  };

  const handleClick = () => {
    if (disabled) return;
    onSelect();
  };

  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <motion.div
      animate={
        isSelected
          ? {
              scale: 1.08,
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }
          : { scale: 1, y: 0 }
      }
      className={disabled ? "opacity-50" : ""}
    >
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        draggable={!disabled}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDropEvent}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`
          cursor-pointer select-none rounded-lg flex items-center justify-center relative
          ${disabled ? "cursor-not-allowed" : ""}
          ${isSelected ? "ring-2 ring-emerald-400/60" : ""}
        `}
      >
        {imgError ? (
          <div className="w-[76px] h-[140px] sm:w-[88px] sm:h-[160px] flex items-center justify-center bg-zinc-100 rounded-lg text-4xl">
            🍾
          </div>
        ) : (
          <img
            key={bottle.imageIndex}
            src={`/bottles/bottle${bottle.imageIndex}.png`}
            alt=""
            draggable={false}
            onError={handleImgError}
            className="w-[76px] h-[140px] sm:w-[88px] sm:h-[160px] object-contain"
          />
        )}
      </div>
    </motion.div>
  );
}
