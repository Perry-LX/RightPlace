import { useState, useCallback } from "react";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useGameStore } from "./stores/gameStore";
import { THEMES } from "./data/themes";
import { LEVELS } from "./data/levels";
import HomeScreen from "./components/HomeScreen";
import LevelSelect from "./components/LevelSelect";
import GameScreen from "./components/GameScreen";
import MultiplayerMode from "./components/MultiplayerMode";
import UniformChallenge from "./components/UniformChallenge";
import NoviceMode from "./components/NoviceMode";
import type { Page } from "./types/game";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const { initFreePlay, initLevel, initTestMode, initUniformGame } = useGameStore();

  const handleStartFreePlay = useCallback(
    (count: number) => {
      const themeIds = Object.keys(THEMES);
      const themeId = themeIds[Math.floor(Math.random() * themeIds.length)];
      const theme = THEMES[themeId];
      initFreePlay(count, theme);
      setPage("game");
    },
    [initFreePlay]
  );

  const handleStartLevelMode = useCallback(() => {
    setPage("level-select");
  }, []);

  const handleStartMultiplayer = useCallback(() => {
    setPage("multiplayer");
  }, []);

  const handleStartLatestLevel = useCallback(
    (levelId: string) => {
      const level = LEVELS.find((l) => l.id === levelId);
      if (!level) return;
      const theme = THEMES[level.themeId];
      if (!theme) return;
      initLevel(level.bottleCount, theme, level.id);
      setPage("game");
    },
    [initLevel]
  );

  const handleSelectLevel = useCallback(
    (levelId: string) => {
      const level = LEVELS.find((l) => l.id === levelId);
      if (!level) return;
      const theme = THEMES[level.themeId];
      if (!theme) return;

      initLevel(level.bottleCount, theme, level.id);
      setPage("game");
    },
    [initLevel]
  );

  const handleBackToMenu = useCallback(() => {
    setPage("home");
  }, []);

  const handleBackFromLevelSelect = useCallback(() => {
    setPage("home");
  }, []);

  const handleStartTestMode = useCallback(() => {
    initTestMode();
    setPage("game");
  }, [initTestMode]);

  const handleStartUniform = useCallback(() => {
    setPage("uniform");
  }, []);

  const handleStartNoviceMode = useCallback(() => {
    setPage("novice");
  }, []);

  const handleNoviceSelect = useCallback(
    (count: number) => {
      const themeIds = Object.keys(THEMES);
      const themeId = themeIds[Math.floor(Math.random() * themeIds.length)];
      const theme = THEMES[themeId];
      initFreePlay(count, theme);
      setPage("game");
    },
    [initFreePlay]
  );

  const handleBackFromNovice = useCallback(() => {
    setPage("home");
  }, []);

  const handleUniformSelect = useCallback(
    (count: number) => {
      initUniformGame(count);
      setPage("game");
    },
    [initUniformGame]
  );

  const handleBackFromMultiplayer = useCallback(() => {
    setPage("home");
  }, []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-zinc-50 to-zinc-100">
      {page === "home" && (
        <HomeScreen
          onStartFreePlay={handleStartFreePlay}
          onStartLevelMode={handleStartLevelMode}
          onStartLatestLevel={handleStartLatestLevel}
          onStartNoviceMode={handleStartNoviceMode}
          onStartMultiplayer={handleStartMultiplayer}
          onStartTestMode={handleStartTestMode}
          onStartUniform={handleStartUniform}
        />
      )}

      {page === "level-select" && (
        <LevelSelect
          onSelectLevel={handleSelectLevel}
          onBack={handleBackFromLevelSelect}
        />
      )}

      {page === "multiplayer" && (
        <MultiplayerMode onBack={handleBackFromMultiplayer} />
      )}

      {page === "uniform" && (
        <UniformChallenge
          onStart={handleUniformSelect}
          onBack={handleBackToMenu}
        />
      )}

      {page === "novice" && (
        <NoviceMode
          onStart={handleNoviceSelect}
          onBack={handleBackFromNovice}
        />
      )}

      {page === "game" && <GameScreen onBack={handleBackToMenu} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
