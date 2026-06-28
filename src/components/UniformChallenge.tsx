import { motion } from "motion/react";
import { ArrowLeft, Play, CopySimple } from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";

interface UniformChallengeProps {
  onStart: (count: number) => void;
  onBack: () => void;
}

const BOTTLE_OPTIONS = [4, 6, 8, 10, 12];

function difficultyKey(count: number): "beginner" | "normal" | "advanced" | "expert" | "ultimate" {
  if (count <= 4) return "beginner";
  if (count <= 6) return "normal";
  if (count <= 8) return "advanced";
  if (count <= 10) return "expert";
  return "ultimate";
}

export default function UniformChallenge({
  onStart,
  onBack,
}: UniformChallengeProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" />
          <span>{t("uniform.back")}</span>
        </button>
        <h1 className="text-sm font-semibold text-zinc-800">
          {t("uniform.title")}
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Description */}
        <div className="text-center max-w-xs">
          <CopySimple size={32} weight="duotone" className="text-amber-500 mb-3" />
          <h2 className="text-base font-semibold text-zinc-700 mb-1">
            {t("uniform.subtitle")}
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {t("uniform.desc")}
          </p>
        </div>

        {/* Bottle count options */}
        <div className="w-full max-w-xs space-y-2">
          {BOTTLE_OPTIONS.map((count, i) => (
            <motion.button
              key={count}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => onStart(count)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 bg-white hover:bg-amber-50 active:bg-amber-100 border border-zinc-200 hover:border-amber-300 rounded-xl transition-all duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-base font-bold text-amber-600 group-hover:bg-amber-200 transition-colors duration-150">
                  {count}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-zinc-800">
                    {count}{t("uniform.bottles")}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {t(`uniform.difficulty.${difficultyKey(count)}`)}
                  </div>
                </div>
              </div>
              <Play size={16} weight="fill" className="text-zinc-300 group-hover:text-amber-400 transition-colors duration-150" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
