import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Crosshair,
  Star,
  ArrowRight,
  ArrowCounterClockwise,
  House,
} from "@phosphor-icons/react";
import { useGameStore } from "../stores/gameStore";
import { useLevelStore } from "../stores/levelStore";
import { LEVELS } from "../data/levels";
import { useTranslation } from "../i18n/LanguageProvider";

interface SettlementPanelProps {
  timeMs: number;
  onNextLevel?: () => void;
  onRetry: () => void;
  onMenu: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function calculateStars(judges: number, bottleCount: number): number {
  const bestThreshold = bottleCount * 2;
  const normalThreshold = bottleCount * 3;

  if (judges <= bestThreshold) return 3;
  if (judges <= normalThreshold) return 2;
  return 1;
}

export default function SettlementPanel({
  timeMs,
  onNextLevel,
  onRetry,
  onMenu,
}: SettlementPanelProps) {
  const { judgeCount, bottleCount, isLevelMode, levelId } = useGameStore();
  const { completeLevel } = useLevelStore();
  const { t } = useTranslation();

  const stars = useMemo(() => calculateStars(judgeCount, bottleCount), [judgeCount, bottleCount]);
  const levelNum = levelId
    ? LEVELS.find((l) => l.id === levelId)?.number ?? 0
    : 0;
  const hasNextLevel = levelNum > 0 && levelNum < LEVELS.length;

  // Save progress when settlement mounts
  useEffect(() => {
    if (isLevelMode && levelNum > 0) {
      completeLevel(levelNum, stars, timeMs, judgeCount);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.5,
          }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85dvh] overflow-y-auto hide-scrollbar"
        >
          {/* Stars */}
          <div className="pt-6 pb-4 flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
              {isLevelMode
                ? t("settlement.level", { n: levelNum })
                : t("settlement.freePlay")}
            </span>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2 + s * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  <Star
                    size={36}
                    weight={s <= stars ? "fill" : "regular"}
                    className={
                      s <= stars
                        ? "text-amber-400 drop-shadow-sm"
                        : "text-zinc-200"
                    }
                  />
                </motion.div>
              ))}
            </div>

            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg font-bold text-zinc-800"
            >
              {stars === 3
                ? t("settlement.perfect")
                : stars === 2
                  ? t("settlement.good")
                  : t("settlement.pass")}
            </motion.span>
          </div>

          {/* Stats */}
          <div className="px-6 pb-6 space-y-3">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl">
              <div className="flex items-center gap-2.5 text-zinc-500">
                <Clock size={18} weight="regular" />
                <span className="text-sm">{t("settlement.time")}</span>
              </div>
              <span className="text-sm font-semibold font-mono text-zinc-800">
                {formatTime(timeMs)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl">
              <div className="flex items-center gap-2.5 text-zinc-500">
                <Crosshair size={18} weight="regular" />
                <span className="text-sm">{t("settlement.judgments")}</span>
              </div>
              <span className="text-sm font-semibold font-mono text-zinc-800">
                {judgeCount}{t("game.judgeTimes")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-8 space-y-2.5">
            {isLevelMode && hasNextLevel && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onNextLevel}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-xl transition-colors duration-150 cursor-pointer"
              >
                <span>{t("settlement.nextLevel")}</span>
                <ArrowRight size={18} weight="bold" />
              </motion.button>
            )}

            <div className="flex gap-2.5">
              <button
                onClick={onRetry}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-700 font-medium rounded-xl transition-colors duration-150 cursor-pointer"
              >
                <ArrowCounterClockwise size={16} weight="bold" />
                <span className="text-sm">{t("settlement.retry")}</span>
              </button>
              <button
                onClick={onMenu}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-700 font-medium rounded-xl transition-colors duration-150 cursor-pointer"
              >
                <House size={16} weight="bold" />
                <span className="text-sm">{t("settlement.mainMenu")}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
