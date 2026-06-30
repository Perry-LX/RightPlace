import { motion } from "motion/react";
import {
  GridFour,
  ArrowRight,
  Users,
  CopySimple,
  RocketLaunch,
  GraduationCap,
} from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";
import { useLevelStore } from "../stores/levelStore";
import { LEVELS } from "../data/levels";
import LanguageSwitcher from "./LanguageSwitcher";

interface HomeScreenProps {
  onStartFreePlay: (count: number) => void;
  onStartLevelMode: () => void;
  onStartLatestLevel: (levelId: string) => void;
  onStartNoviceMode: () => void;
  onStartMultiplayer: () => void;
  onStartUniform: () => void;
}

export default function HomeScreen({
  onStartFreePlay,
  onStartLevelMode,
  onStartLatestLevel,
  onStartNoviceMode,
  onStartMultiplayer,
  onStartUniform,
}: HomeScreenProps) {
  const { t } = useTranslation();
  const { isLevelUnlocked } = useLevelStore();

  // Find the latest unlocked level (highest level number the player can access)
  let latestUnlockedId = LEVELS[0].id;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (isLevelUnlocked(LEVELS[i].number)) {
      latestUnlockedId = LEVELS[i].id;
      break;
    }
  }

  return (
    <div className="h-dvh flex flex-col items-center px-4 overflow-hidden relative">
      <div className="absolute top-3 right-3">
        <LanguageSwitcher />
      </div>

      {/* Top spacer — pushes title to upper area */}
      <div className="flex-[1.5] min-h-0" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center flex-shrink-0"
      >
        <motion.div
          className="text-5xl sm:text-6xl mb-2 sm:mb-3"
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          🍾
        </motion.div>
        <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-1">
          {t("app.title")}
        </h1>
        <p className="text-xs sm:text-base text-zinc-500 max-w-[280px] mx-auto leading-relaxed">
          {t("app.subtitle")}
        </p>
      </motion.div>

      {/* Mid spacer — gap between title and buttons */}
      <div className="flex-[0.5] min-h-0" />

      {/* Buttons container */}
      <div className="w-full max-w-xs flex flex-col gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Novice Mode Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={onStartNoviceMode}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 sm:py-3.5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-violet-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <GraduationCap size={20} weight="fill" />
            <div className="text-left">
              <div className="text-xs sm:text-sm">{t("home.noviceMode")}</div>
              <div className="text-[10px] opacity-75 font-normal">
                {t("home.noviceModeDesc")}
              </div>
            </div>
          </div>
          <ArrowRight size={18} weight="bold" />
        </motion.button>

        {/* Start Game Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125, duration: 0.4 }}
          onClick={() => onStartLatestLevel(latestUnlockedId)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 sm:py-3.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-sky-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <RocketLaunch size={20} weight="fill" />
            <div className="text-left">
              <div className="text-xs sm:text-sm">{t("home.startGame")}</div>
              <div className="text-[10px] opacity-75 font-normal">
                {t("home.startGameDesc")}
              </div>
            </div>
          </div>
          <ArrowRight size={18} weight="bold" />
        </motion.button>

        {/* Level Mode Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          onClick={onStartLevelMode}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 sm:py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-emerald-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <GridFour size={20} weight="fill" />
            <div className="text-left">
              <div className="text-xs sm:text-sm">{t("home.levelMode")}</div>
              <div className="text-[10px] opacity-75 font-normal">
                {t("home.levelModeDesc")}
              </div>
            </div>
          </div>
          <ArrowRight size={18} weight="bold" />
        </motion.button>

        {/* Uniform Challenge Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onClick={onStartUniform}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 sm:py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-amber-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <CopySimple size={20} weight="fill" />
            <div className="text-left">
              <div className="text-xs sm:text-sm">{t("home.uniform")}</div>
              <div className="text-[10px] opacity-75 font-normal">
                {t("home.uniformDesc")}
              </div>
            </div>
          </div>
          <ArrowRight size={18} weight="bold" />
        </motion.button>

        {/* Multiplayer Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          onClick={onStartMultiplayer}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 sm:py-3.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-indigo-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Users size={20} weight="fill" />
            <div className="text-left">
              <div className="text-xs sm:text-sm">{t("home.multiplayer")}</div>
              <div className="text-[10px] opacity-75 font-normal">
                {t("home.multiplayerDesc")}
              </div>
            </div>
          </div>
          <ArrowRight size={18} weight="bold" />
        </motion.button>
      </div>

      {/* Bottom spacer */}
      <div className="flex-[2] min-h-0" />
    </div>
  );
}
