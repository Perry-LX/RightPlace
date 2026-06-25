import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Lock,
} from "@phosphor-icons/react";
import { LEVELS } from "../data/levels";
import { useLevelStore } from "../stores/levelStore";
import { useTranslation } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

interface LevelSelectProps {
  onSelectLevel: (levelId: string) => void;
  onBack: () => void;
}

export default function LevelSelect({
  onSelectLevel,
  onBack,
}: LevelSelectProps) {
  const { totalStars, isLevelUnlocked, getLevelStars } = useLevelStore();
  const { t } = useTranslation();
  const maxStars = LEVELS.length * 3;

  // Only show levels that are unlocked
  const visibleLevels = LEVELS.filter((level) => isLevelUnlocked(level.number));

  return (
    <div className="h-dvh flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" />
          <span>{t("levelSelect.back")}</span>
        </button>
        <h1 className="text-sm font-semibold text-zinc-800">{t("levelSelect.title")}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
            <Star size={16} weight="fill" />
            <span className="font-mono">
              {totalStars}/{maxStars}
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Level Grid — only unlocked levels */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          {visibleLevels.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {visibleLevels.map((level, i) => {
                const stars = getLevelStars(level.number);

                return (
                  <motion.button
                    key={level.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.025, duration: 0.25 }}
                    onClick={() => onSelectLevel(level.id)}
                    className="relative flex flex-col items-center gap-1 px-2 py-3 rounded-xl bg-white border border-zinc-200 hover:border-emerald-300 hover:shadow-md cursor-pointer active:scale-[0.97] transition-all duration-150"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 h-4">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          size={10}
                          weight={s <= stars ? "fill" : "regular"}
                          className={
                            s <= stars ? "text-amber-400" : "text-zinc-200"
                          }
                        />
                      ))}
                    </div>

                    {/* Level Number */}
                    <span className="text-sm font-bold text-zinc-800">
                      {level.number}
                    </span>

                    {/* Bottle Count */}
                    <span className="text-[10px] font-medium text-zinc-400">
                      {level.bottleCount}{t("levelSelect.bottles")}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Lock size={32} weight="duotone" className="mx-auto text-zinc-300 mb-3" />
              <p className="text-sm text-zinc-400">{t("levelSelect.noLevels")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
