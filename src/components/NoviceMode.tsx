import { motion } from "motion/react";
import { ArrowLeft, Play, GraduationCap } from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";

interface NoviceModeProps {
  onStart: (count: number) => void;
  onBack: () => void;
}

const OPTIONS: { count: number; descKey: "easy" | "normal" | "hard" | "expert" | "hell" }[] = [
  { count: 4, descKey: "easy" },
  { count: 6, descKey: "normal" },
  { count: 8, descKey: "hard" },
  { count: 10, descKey: "expert" },
  { count: 12, descKey: "hell" },
];

export default function NoviceMode({ onStart, onBack }: NoviceModeProps) {
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
          <span>{t("novice.back")}</span>
        </button>
        <h1 className="text-sm font-semibold text-zinc-800">
          {t("novice.title")}
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Description */}
        <div className="text-center max-w-xs">
          <GraduationCap size={32} weight="duotone" className="text-violet-500 mb-3 mx-auto" />
          <h2 className="text-base font-semibold text-zinc-700 mb-1">
            {t("home.noviceMode")}
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {t("home.noviceModeDesc")}
          </p>
        </div>

        {/* Bottle count options */}
        <div className="w-full max-w-xs space-y-2">
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.count}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => onStart(opt.count)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 bg-white hover:bg-violet-50 active:bg-violet-100 border border-zinc-200 hover:border-violet-300 rounded-xl transition-all duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-base font-bold text-violet-600 group-hover:bg-violet-200 transition-colors duration-150">
                  {opt.count}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-zinc-800">
                    {opt.count}{t("home.bottles")}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {t(`home.difficultyDesc.${opt.descKey}`)}
                  </div>
                </div>
              </div>
              <Play size={16} weight="fill" className="text-zinc-300 group-hover:text-violet-400 transition-colors duration-150" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
