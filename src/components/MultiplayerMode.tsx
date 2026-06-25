import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Users,
  Flask,
  Play,
} from "@phosphor-icons/react";
import { useTranslation } from "../i18n/LanguageProvider";

interface MultiplayerModeProps {
  onBack: () => void;
}

const BOTTLE_OPTIONS = [8, 9, 10, 11, 12];
const PLAYER_OPTIONS = [2, 3, 4, 5, 6];

export default function MultiplayerMode({ onBack }: MultiplayerModeProps) {
  const { t } = useTranslation();
  const [selectedBottles, setSelectedBottles] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number | null>(null);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" />
          <span>{t("multiplayer.back")}</span>
        </button>
        <h1 className="text-sm font-semibold text-zinc-800">
          {t("multiplayer.title")}
        </h1>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-10">
        {/* Bottle count selection */}
        <div className="w-full max-w-sm">
          <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3 text-center">
            {t("multiplayer.bottleCount")}
          </h2>
          <div className="flex justify-center gap-2.5">
            {BOTTLE_OPTIONS.map((count) => (
              <motion.button
                key={count}
                onClick={() => {
                  setSelectedBottles(count);
                  setSelectedPlayers(null);
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer
                  ${
                    selectedBottles === count
                      ? "bg-emerald-50 border-2 border-emerald-400 shadow-sm"
                      : "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                  }
                `}
              >
                <Flask
                  size={20}
                  weight={selectedBottles === count ? "fill" : "regular"}
                  className={
                    selectedBottles === count
                      ? "text-emerald-500"
                      : "text-zinc-400"
                  }
                />
                <span
                  className={`text-sm font-bold ${
                    selectedBottles === count
                      ? "text-emerald-700"
                      : "text-zinc-700"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Player count selection */}
        <div className="w-full max-w-sm">
          <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3 text-center">
            {t("multiplayer.playerCount")}
          </h2>
          <div className="flex justify-center gap-2.5">
            {PLAYER_OPTIONS.map((count) => (
              <motion.button
                key={count}
                onClick={() => setSelectedPlayers(count)}
                disabled={selectedBottles === null}
                whileTap={selectedBottles !== null ? { scale: 0.95 } : {}}
                className={`
                  flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer
                  ${
                    selectedPlayers === count
                      ? "bg-indigo-50 border-2 border-indigo-400 shadow-sm"
                      : selectedBottles !== null
                        ? "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                        : "bg-zinc-50 border border-zinc-100 opacity-40 cursor-not-allowed"
                  }
                `}
              >
                <Users
                  size={20}
                  weight={selectedPlayers === count ? "fill" : "regular"}
                  className={
                    selectedPlayers === count
                      ? "text-indigo-500"
                      : "text-zinc-400"
                  }
                />
                <span
                  className={`text-sm font-bold ${
                    selectedPlayers === count
                      ? "text-indigo-700"
                      : selectedBottles !== null
                        ? "text-zinc-700"
                        : "text-zinc-300"
                  }`}
                >
                  {count}{t("multiplayer.players")}
                </span>
              </motion.button>
            ))}
          </div>

          {selectedBottles !== null && selectedPlayers === null && (
            <p className="text-xs text-zinc-400 text-center mt-2">
              {t("multiplayer.selectPlayers")}
            </p>
          )}
        </div>

        {/* Create room / placeholder */}
        <motion.button
          onClick={() => {
            if (selectedBottles && selectedPlayers) {
              alert(t("multiplayer.comingSoon"));
            }
          }}
          disabled={!selectedBottles || !selectedPlayers}
          whileTap={
            selectedBottles && selectedPlayers ? { scale: 0.97 } : {}
          }
          className={`
            w-full max-w-sm flex items-center justify-center gap-2 px-5 py-3.5
            rounded-xl font-semibold text-sm transition-all duration-150
            ${
              selectedBottles && selectedPlayers
                ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white shadow-lg shadow-indigo-200 cursor-pointer"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }
          `}
        >
          <Play size={18} weight="fill" />
          <span>{t("multiplayer.createRoom")}</span>
        </motion.button>
      </div>
    </div>
  );
}
