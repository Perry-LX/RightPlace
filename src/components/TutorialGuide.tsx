import { motion } from "motion/react";
import {
  ArrowsLeftRight,
  MagnifyingGlass,
  Lightbulb,
  Trophy,
} from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";

interface TutorialGuideProps {
  onStart: () => void;
}

const STEPS = [
  { icon: ArrowsLeftRight, key: "step1" as const },
  { icon: MagnifyingGlass, key: "step2" as const },
  { icon: Lightbulb, key: "step3" as const },
  { icon: Trophy, key: "step4" as const },
];

export default function TutorialGuide({ onStart }: TutorialGuideProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85dvh] overflow-y-auto hide-scrollbar"
      >
        {/* Title */}
        <div className="pt-6 pb-3 px-5 text-center">
          <h2 className="text-lg font-bold text-zinc-800">
            {t("tutorial.title")}
          </h2>
        </div>

        {/* Steps */}
        <div className="px-6 pb-2 space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex gap-3.5">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} weight="bold" className="text-emerald-600" />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-100" />
                  )}
                </div>
                <div className="pb-3 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-700 mb-0.5">
                    {t(`tutorial.${step.key}.title`)}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t(`tutorial.${step.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Note about uniform-bottle levels */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 -mx-1">
            <p className="text-[11px] text-amber-700 leading-relaxed">
              {t("tutorial.note")}
            </p>
          </div>
        </div>

        {/* Start button */}
        <div className="px-6 pb-7 pt-3">
          <button
            onClick={onStart}
            className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-xl transition-colors duration-150 cursor-pointer"
          >
            {t("tutorial.start")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
