import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../i18n/LanguageProvider";
import type { JudgeResult } from "../types/game";

interface JudgeFeedbackProps {
  latestResult: JudgeResult | null;
}

export default function JudgeFeedback({ latestResult }: JudgeFeedbackProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      {latestResult && (
        <motion.div
          key={latestResult.attempt}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`
            w-full px-5 py-3 rounded-xl text-center
            ${
              latestResult.correctCount === latestResult.total
                ? "bg-emerald-50 border border-emerald-200"
                : "bg-amber-50 border border-amber-200"
            }
          `}
        >
          <span
            className={`
              text-sm sm:text-base font-semibold
              ${
                latestResult.correctCount === latestResult.total
                  ? "text-emerald-700"
                  : "text-amber-700"
              }
            `}
          >
            {latestResult.correctCount === latestResult.total
              ? `${t("game.allCorrect")} ${t("game.bottlesPlaced")}`
              : `${t("game.correct")} ${latestResult.correctCount}${t("game.of")}${latestResult.total}`}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
