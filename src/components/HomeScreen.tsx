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
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          🍾
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-2">
          {t("app.title")}
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-[280px] mx-auto leading-relaxed">
          {t("app.subtitle")}
        </p>
      </motion.div>

      {/* Novice Mode Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        onClick={onStartNoviceMode}
        className="w-full max-w-xs flex items-center justify-between gap-3 px-5 py-4 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-violet-200 mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <GraduationCap size={22} weight="fill" />
          <div className="text-left">
            <div className="text-sm">{t("home.noviceMode")}</div>
            <div className="text-[10px] opacity-75 font-normal">
              {t("home.noviceModeDesc")}
            </div>
          </div>
        </div>
        <ArrowRight size={18} weight="bold" />
      </motion.button>

      {/* Start Game Button — jump straight to latest unlocked level */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125, duration: 0.4 }}
        onClick={() => onStartLatestLevel(latestUnlockedId)}
        className="w-full max-w-xs flex items-center justify-between gap-3 px-5 py-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-sky-200 mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <RocketLaunch size={22} weight="fill" />
          <div className="text-left">
            <div className="text-sm">{t("home.startGame")}</div>
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
        className="w-full max-w-xs flex items-center justify-between gap-3 px-5 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-emerald-200 mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <GridFour size={22} weight="fill" />
          <div className="text-left">
            <div className="text-sm">{t("home.levelMode")}</div>
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
        className="w-full max-w-xs flex items-center justify-between gap-3 px-5 py-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-amber-200 mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <CopySimple size={22} weight="fill" />
          <div className="text-left">
            <div className="text-sm">{t("home.uniform")}</div>
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
        className="w-full max-w-xs flex items-center justify-between gap-3 px-5 py-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold rounded-2xl transition-all duration-150 shadow-lg shadow-indigo-200 mb-4 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Users size={22} weight="fill" />
          <div className="text-left">
            <div className="text-sm">{t("home.multiplayer")}</div>
            <div className="text-[10px] opacity-75 font-normal">
              {t("home.multiplayerDesc")}
            </div>
          </div>
        </div>
        <ArrowRight size={18} weight="bold" />
      </motion.button>
    </div>
  );
}
