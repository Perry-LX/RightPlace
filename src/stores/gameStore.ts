import { create } from "zustand";
import type { Bottle, JudgeResult, ThemeConfig } from "../types/game";
import { LEVELS } from "../data/levels";

interface GameState {
  // Config
  bottleCount: number;
  theme: ThemeConfig | null;
  levelId: string | null;
  isLevelMode: boolean;
  isTestMode: boolean;
  isUniformMode: boolean;

  // Core data
  bottles: Bottle[];
  positions: (string | null)[];

  // Flow
  hasStarted: boolean;
  isFinished: boolean;
  hasWon: boolean;

  // Timer
  startTime: number | null;

  // Judge
  judgeCount: number;
  judgeResults: JudgeResult[];

  // Selection (click to swap)
  selectedPosition: number | null;

  // Actions
  initFreePlay: (count: number, theme: ThemeConfig) => void;
  initLevel: (count: number, theme: ThemeConfig, levelId: string) => void;
  initTestMode: () => void;
  initUniformGame: (count: number) => void;
  selectSlot: (index: number) => void;
  swapSlots: (from: number, to: number) => void;
  performJudge: () => { correctCount: number; isWin: boolean };
  resetGame: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateBottles(count: number, theme: ThemeConfig): Bottle[] {
  const pool = shuffleArray(theme.bottles);
  const selected = pool.slice(0, count);
  const correctOrder = shuffleArray(selected);

  return correctOrder.map((b, i) => ({
    id: `bottle_${i}`,
    name: b.name,
    imageIndex: b.imageIndex,
    correctPosition: i,
  }));
}

function shufflePositions(
  bottles: Bottle[]
): { positions: (string | null)[]; attempts: number } {
  let positions: (string | null)[];
  let allCorrect = true;
  let attempts = 0;

  do {
    const ids = shuffleArray(bottles.map((b) => b.id));
    positions = ids;
    allCorrect = positions.every(
      (id, idx) => id === bottles.find((b) => b.correctPosition === idx)?.id
    );
    attempts++;
  } while (allCorrect && attempts < 50);

  return { positions, attempts };
}

export const useGameStore = create<GameState>((set, get) => ({
  bottleCount: 4,
  theme: null,
  levelId: null,
  isLevelMode: false,
  isTestMode: false,
  isUniformMode: false,

  bottles: [],
  positions: [],

  hasStarted: false,
  isFinished: false,
  hasWon: false,

  startTime: null,

  judgeCount: 0,
  judgeResults: [],

  selectedPosition: null,

  initFreePlay(count: number, theme: ThemeConfig) {
    const bottles = generateBottles(count, theme);
    const { positions } = shufflePositions(bottles);

    set({
      bottleCount: count,
      theme,
      levelId: null,
      isLevelMode: false,
      isTestMode: false,
      isUniformMode: false,
      bottles,
      positions,
      hasStarted: false,
      isFinished: false,
      hasWon: false,
      startTime: null,
      judgeCount: 0,
      judgeResults: [],
      selectedPosition: null,
    });
  },

  initLevel(count: number, theme: ThemeConfig, levelId: string) {
    const bottles = generateBottles(count, theme);
    // Apply uniform image (same-bottle challenge) if configured
    const lvlCfg = LEVELS.find((l) => l.id === levelId);
    if (lvlCfg?.uniformImageIndex) {
      bottles.forEach((b) => { b.imageIndex = lvlCfg.uniformImageIndex!; });
    }
    const { positions } = shufflePositions(bottles);

    set({
      bottleCount: count,
      theme,
      levelId,
      isLevelMode: true,
      isTestMode: false,
      isUniformMode: false,
      bottles,
      positions,
      hasStarted: false,
      isFinished: false,
      hasWon: false,
      startTime: null,
      judgeCount: 0,
      judgeResults: [],
      selectedPosition: null,
    });
  },

  initTestMode() {
    const count = 8;
    const bottles: Bottle[] = Array.from({ length: count }, (_, i) => ({
      id: `test_${i}`,
      name: "测试瓶子",
      imageIndex: 1,
      correctPosition: i,
    }));
    const { positions } = shufflePositions(bottles);

    set({
      bottleCount: count,
      theme: null,
      levelId: null,
      isLevelMode: false,
      isTestMode: true,
      isUniformMode: false,
      bottles,
      positions,
      hasStarted: false,
      isFinished: false,
      hasWon: false,
      startTime: null,
      judgeCount: 0,
      judgeResults: [],
      selectedPosition: null,
    });
  },

  initUniformGame(count: number) {
    // Pick a random bottle image 2-13 (skip 1, reserved for test mode)
    const img = 2 + Math.floor(Math.random() * 12);

    const bottles: Bottle[] = Array.from({ length: count }, (_, i) => ({
      id: `uniform_${i}`,
      name: "挑战瓶子",
      imageIndex: img,
      correctPosition: i,
    }));
    const { positions } = shufflePositions(bottles);

    set({
      bottleCount: count,
      theme: null,
      levelId: null,
      isLevelMode: false,
      isTestMode: false,
      isUniformMode: true,
      bottles,
      positions,
      hasStarted: false,
      isFinished: false,
      hasWon: false,
      startTime: null,
      judgeCount: 0,
      judgeResults: [],
      selectedPosition: null,
    });
  },

  selectSlot(index: number) {
    const state = get();
    if (state.isFinished) return;

    // Start timer on first interaction
    if (!state.hasStarted) {
      set({ hasStarted: true, startTime: Date.now() });
    }

    const { selectedPosition, positions } = state;

    if (selectedPosition === null) {
      set({ selectedPosition: index });
    } else if (selectedPosition === index) {
      set({ selectedPosition: null });
    } else {
      // Swap
      const newPositions = [...positions];
      const temp = newPositions[selectedPosition];
      newPositions[selectedPosition] = newPositions[index];
      newPositions[index] = temp;
      set({ positions: newPositions, selectedPosition: null });
    }
  },

  swapSlots(from: number, to: number) {
    const state = get();
    if (state.isFinished || from === to) return;

    if (!state.hasStarted) {
      set({ hasStarted: true, startTime: Date.now() });
    }

    const newPositions = [...state.positions];
    const temp = newPositions[from];
    newPositions[from] = newPositions[to];
    newPositions[to] = temp;
    set({ positions: newPositions, selectedPosition: null });
  },

  performJudge() {
    const state = get();
    const { bottles, positions } = state;
    let correctCount = 0;

    for (const bottle of bottles) {
      const currentPosition = positions.indexOf(bottle.id);
      if (currentPosition === bottle.correctPosition) {
        correctCount++;
      }
    }

    const total = bottles.length;
    const isWin = correctCount === total;

    const result: JudgeResult = {
      attempt: state.judgeCount + 1,
      correctCount,
      total,
    };

    set({
      judgeCount: state.judgeCount + 1,
      judgeResults: [...state.judgeResults, result],
      hasWon: isWin,
      isFinished: isWin,
    });

    return { correctCount, isWin };
  },

  resetGame() {
    const state = get();
    if (state.theme) {
      const bottles = generateBottles(state.bottleCount, state.theme);
      const { positions } = shufflePositions(bottles);

      set({
        bottles,
        positions,
        hasStarted: false,
        isFinished: false,
        hasWon: false,
        startTime: null,
        judgeCount: 0,
        judgeResults: [],
        selectedPosition: null,
      });
    }
  },
}));
