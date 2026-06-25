import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowCounterClockwise,
  MagnifyingGlass,
  Flask,
  Question,
} from "@phosphor-icons/react";
import { useGameStore } from "../stores/gameStore";
import { THEMES } from "../data/themes";
import { LEVELS } from "../data/levels";
import { useTranslation } from "../i18n/LanguageProvider";
import { getCoachPhase, type CoachPhase } from "./GameCoach";
import Bottle from "./Bottle";
import Timer from "./Timer";
import JudgeFeedback from "./JudgeFeedback";
import JudgeHistory from "./JudgeHistory";
import SettlementPanel from "./SettlementPanel";
import LanguageSwitcher from "./LanguageSwitcher";
import TutorialGuide from "./TutorialGuide";
import GameCoach from "./GameCoach";

interface GameScreenProps {
  onBack: () => void;
}

export default function GameScreen({ onBack }: GameScreenProps) {
  const {
    bottles,
    positions,
    theme,
    bottleCount,
    hasStarted,
    isFinished,
    hasWon,
    startTime,
    judgeCount,
    judgeResults,
    isLevelMode,
    isTestMode,
    isUniformMode,
    levelId,
    selectedPosition,
    selectSlot,
    swapSlots,
    performJudge,
    resetGame,
  } = useGameStore();
  const { t } = useTranslation();

  const [latestResult, setLatestResult] = useState<{
    correctCount: number;
    total: number;
  } | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [showSettlement, setShowSettlement] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameStartRef = useRef(startTime);
  if (startTime) gameStartRef.current = startTime;

  // Auto-show tutorial for free-play first-timers
  useEffect(() => {
    if (isLevelMode || isTestMode) return;
    const key = "rightplace-tutorial-done";
    if (!localStorage.getItem(key)) {
      setShowTutorial(true);
      setIsPaused(true);
    }
  }, [isLevelMode, isTestMode]);

  // Coach phase for visual indicators
  const showCoach = !isLevelMode && !isTestMode && (bottleCount === 4 || bottleCount === 6);
  const coachPhase: CoachPhase | null = showCoach
    ? getCoachPhase(hasStarted, selectedPosition, judgeCount, judgeResults, isFinished, bottleCount)
    : null;

  const handleSelect = (position: number) => {
    if (isFinished) return;
    selectSlot(position);
  };

  const handleDragStart = useCallback((pos: number) => {
    if (isFinished) return;
    setDragFrom(pos);
  }, [isFinished]);

  const handleDrop = useCallback(
    (targetPos: number) => {
      if (dragFrom !== null && dragFrom !== targetPos && !isFinished) {
        swapSlots(dragFrom, targetPos);
      }
      setDragFrom(null);
    },
    [dragFrom, isFinished, swapSlots]
  );

  const handleJudge = useCallback(() => {
    if (isFinished) return;
    const result = performJudge();
    setLatestResult({
      correctCount: result.correctCount,
      total: bottles.length,
    });

    if (result.isWin) {
      setGameStartTime(gameStartRef.current);
      setTimeout(() => setShowSettlement(true), 600);
    }
  }, [isFinished, performJudge, bottles.length]);

  const handleReset = useCallback(() => {
    resetGame();
    setLatestResult(null);
    setShowSettlement(false);
    gameStartRef.current = null;
  }, [resetGame]);

  const handleNextLevel = useCallback(() => {
    if (!levelId) return;
    const currentIdx = LEVELS.findIndex((l) => l.id === levelId);
    const nextLevel = LEVELS[currentIdx + 1];
    if (!nextLevel) return;

    const levelTheme = THEMES[nextLevel.themeId];
    if (!levelTheme) return;

    useGameStore.getState().initLevel(nextLevel.bottleCount, levelTheme, nextLevel.id);
    setLatestResult(null);
    setShowSettlement(false);
    gameStartRef.current = null;
  }, [levelId]);

  const handleRetry = useCallback(() => {
    resetGame();
    setLatestResult(null);
    setShowSettlement(false);
    gameStartRef.current = null;
  }, [resetGame]);

  const themeName = theme?.name ?? "";

  // Calculate end time for settlement
  const endTime = hasWon && startTime ? Date.now() : null;
  const totalTimeMs = startTime && endTime ? endTime - startTime : 0;

  if (!theme && !isTestMode && !isUniformMode) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-zinc-500">{t("game.notInitialized")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" />
          <span className="hidden sm:inline">{t("game.back")}</span>
        </button>

        <div className="flex items-center gap-2">
          {!isTestMode && !isUniformMode && (
            <>
              <Flask size={14} weight="fill" className="text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500">{themeName}</span>
            </>
          )}
          {isTestMode && (
            <span className="text-xs font-semibold text-zinc-500">测试模式</span>
          )}
          {isUniformMode && (
            <span className="text-xs font-semibold text-amber-600">同图挑战</span>
          )}
          {isLevelMode && levelId && (
            <>
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-semibold text-zinc-700">
                {t("levelSelect.level")}{LEVELS.find((l) => l.id === levelId)?.number}{t("game.levelUnit")}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Timer
            startTime={hasStarted ? startTime : null}
            isRunning={hasStarted && !isFinished && !isPaused}
          />
          <button
            onClick={() => { setShowTutorial(true); setIsPaused(true); }}
            className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title={t("tutorial.help")}
          >
            <Question size={18} weight="bold" />
          </button>
          <button
            onClick={handleReset}
            className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title={t("game.restart")}
          >
            <ArrowCounterClockwise size={18} weight="bold" />
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
        {/* Bottle Grid */}
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
          {/* Bottle-area hint */}
          {showCoach && (coachPhase === "initial" || coachPhase === "selected") && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-xs text-indigo-500 font-medium"
            >
              <motion.span
                className="text-sm"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                👇
              </motion.span>
              <span>
                {coachPhase === "initial"
                  ? t("coach.initial")
                  : t("coach.selected")}
              </span>
            </motion.div>
          )}

          <motion.div
            className="relative flex flex-wrap justify-center gap-3 sm:gap-4 max-w-lg p-3 rounded-2xl"
            animate={
              showCoach && (coachPhase === "initial" || coachPhase === "selected")
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(99,102,241,0)",
                      "0 0 0 4px rgba(99,102,241,0.25)",
                      "0 0 0 0 rgba(99,102,241,0)",
                    ],
                    transition: {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : { boxShadow: "0 0 0 0 transparent" }
            }
          >
            {positions.map((bottleId, slotIndex) => {
              const bottle = bottles.find((b) => b.id === bottleId);
              if (!bottle) return null;

              return (
                <motion.div
                  key={bottleId}
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 280,
                      damping: 28,
                    },
                  }}
                  className="relative"
                >
                  {/* Slot number */}
                  <div className="flex flex-col items-center gap-1.5">
                    <Bottle
                      bottle={bottle}
                      isSelected={selectedPosition === slotIndex}
                      position={slotIndex}
                      onSelect={() => handleSelect(slotIndex)}
                      onDragStart={handleDragStart}
                      onDrop={(pos) => handleDrop(pos)}
                      disabled={isFinished || isPaused}
                    />
                    {!isTestMode && (
                      <span className="text-[10px] font-mono text-zinc-300">
                        #{slotIndex + 1}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic coach — 4/6 bottle free play + uniform levels */}
        {showCoach && (
          <div className="w-full max-w-sm mt-4">
            <GameCoach
              hasStarted={hasStarted}
              selectedPosition={selectedPosition}
              judgeCount={judgeCount}
              judgeResults={judgeResults}
              isFinished={isFinished}
              bottleCount={bottleCount}
            />
          </div>
        )}

        {/* Judge Feedback & Controls */}
        <div className="w-full max-w-sm mt-4 space-y-3">
          {/* Judge Feedback */}
          <JudgeFeedback
            latestResult={
              latestResult
                ? {
                    attempt: judgeCount,
                    correctCount: latestResult.correctCount,
                    total: latestResult.total,
                  }
                : null
            }
          />

          {/* Judge History */}
          <JudgeHistory results={judgeResults} />

          {/* Judge Count */}
          {judgeCount > 0 && !hasWon && (
            <div className="text-center text-xs text-zinc-400 font-mono">
              {t("game.judgeCount")}: {judgeCount}
            </div>
          )}

          {/* Judge Button */}
          <div className="relative flex flex-col items-center">
            <motion.button
              onClick={handleJudge}
              disabled={isFinished || isPaused}
              whileTap={isFinished || isPaused ? {} : { scale: 0.97 }}
              className={`
                w-full flex items-center justify-center gap-2 px-5 py-3.5
                rounded-xl font-semibold text-sm transition-all duration-150
                ${
                  isFinished
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-white shadow-lg shadow-zinc-900/10 cursor-pointer"
                }
              `}
            >
              <MagnifyingGlass size={18} weight="bold" />
              <span>{t("game.judge")}</span>
            </motion.button>

            {/* Arrow hint below judge button */}
            {showCoach && coachPhase === "swapped" && (
              <motion.div
                className="flex flex-col items-center gap-0.5 mt-1.5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="text-indigo-400 text-sm leading-none"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  👆
                </motion.span>
                <span className="text-[11px] text-indigo-500 font-medium">
                  {t("coach.swapped")}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Tutorial Guide (free-play first time / help button) */}
      {showTutorial && (
        <TutorialGuide
          onStart={() => {
            localStorage.setItem("rightplace-tutorial-done", "1");
            setShowTutorial(false);
            setIsPaused(false);
          }}
        />
      )}

      {/* Settlement Panel */}
      {showSettlement && hasWon && (
        <SettlementPanel
          timeMs={totalTimeMs || 0}
          onNextLevel={
            isLevelMode && levelId
              ? LEVELS.findIndex((l) => l.id === levelId) < LEVELS.length - 1
                ? handleNextLevel
                : undefined
              : undefined
          }
          onRetry={handleRetry}
          onMenu={onBack}
        />
      )}
    </div>
  );
}
