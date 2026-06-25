import { motion, AnimatePresence } from "motion/react";
import { Sparkle, CaretRight } from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";
import type { JudgeResult } from "../types/game";

interface GameCoachProps {
  hasStarted: boolean;
  selectedPosition: number | null;
  judgeCount: number;
  judgeResults: JudgeResult[];
  isFinished: boolean;
  bottleCount: number;
}

export type CoachPhase =
  | "initial"
  | "selected"
  | "swapped"
  | "judged"
  | "close"
  | "won";

export function getCoachPhase(
  hasStarted: boolean,
  selectedPosition: number | null,
  judgeCount: number,
  judgeResults: JudgeResult[],
  isFinished: boolean,
  bottleCount: number,
): CoachPhase {
  if (isFinished) return "won";

  if (judgeCount > 0) {
    const last = judgeResults[judgeResults.length - 1];
    if (last.correctCount === bottleCount) return "won";
    if (last.correctCount >= bottleCount - 1) return "close";
    return "judged";
  }

  if (hasStarted && selectedPosition !== null) return "selected";
  if (hasStarted) return "swapped";
  return "initial";
}

export default function GameCoach(props: GameCoachProps) {
  const { t } = useTranslation();
  const phase = getCoachPhase(
    props.hasStarted,
    props.selectedPosition,
    props.judgeCount,
    props.judgeResults,
    props.isFinished,
    props.bottleCount,
  );

  const last = props.judgeResults[props.judgeResults.length - 1];
  const params =
    last ? { correct: last.correctCount, total: props.bottleCount } : undefined;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`
          flex items-start gap-2.5 px-4 py-2.5 rounded-xl text-sm
          ${phase === "won"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-indigo-50/70 text-indigo-700 border border-indigo-100"
          }
        `}
      >
        <span className="mt-0.5 flex-shrink-0">
          {phase === "won" ? (
            <Sparkle size={16} weight="fill" className="text-emerald-500" />
          ) : (
            <CaretRight size={16} weight="fill" className="text-indigo-400" />
          )}
        </span>
        <span className="text-xs sm:text-sm leading-relaxed">
          {t(`coach.${phase}`, params)}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
