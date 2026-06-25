import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageProvider";
import type { JudgeResult } from "../types/game";

interface JudgeHistoryProps {
  results: JudgeResult[];
}

export default function JudgeHistory({ results }: JudgeHistoryProps) {
  const { t } = useTranslation();

  if (results.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {t("game.judgeHistory")}
        </span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className={`
              px-2.5 py-1 rounded-lg text-xs font-semibold font-mono
              ${
                r.correctCount === r.total
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-zinc-100 text-zinc-600"
              }
            `}
          >
            #{r.attempt} {r.correctCount}/{r.total}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
