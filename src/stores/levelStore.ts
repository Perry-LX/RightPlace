import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelSaveData, BestRecord } from "../types/game";

interface LevelStore extends LevelSaveData {
  completeLevel: (
    levelNum: number,
    stars: number,
    time: number,
    judges: number
  ) => void;
  isLevelUnlocked: (levelNum: number) => boolean;
  getLevelStars: (levelNum: number) => number;
  getBestRecord: (levelNum: number) => BestRecord | null;
}

const DEFAULT_DATA: LevelSaveData = {
  levels: {},
  totalStars: 0,
};

export const useLevelStore = create<LevelStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_DATA,

      completeLevel(levelNum, stars, time, judges) {
        set((state) => {
          const existing = state.levels[levelNum];
          const currentBest = existing?.stars ?? 0;
          const newStars = Math.max(currentBest, stars);

          const existingRecord = existing?.bestRecord;
          const newRecord: BestRecord = {
            bestTime: existingRecord
              ? Math.min(existingRecord.bestTime, time)
              : time,
            bestJudges: existingRecord
              ? Math.min(existingRecord.bestJudges, judges)
              : judges,
            completedAt: Date.now(),
          };

          const oldStarsForLevel = existing?.stars ?? 0;
          const starDiff = newStars - oldStarsForLevel;

          return {
            levels: {
              ...state.levels,
              [levelNum]: {
                stars: newStars,
                bestRecord: newRecord,
              },
            },
            totalStars: state.totalStars + starDiff,
          };
        });
      },

      isLevelUnlocked(levelNum: number): boolean {
        if (levelNum === 1) return true;
        const prevLevel = get().levels[levelNum - 1];
        return prevLevel !== undefined && prevLevel.stars >= 1;
      },

      getLevelStars(levelNum: number): number {
        return get().levels[levelNum]?.stars ?? 0;
      },

      getBestRecord(levelNum: number): BestRecord | null {
        return get().levels[levelNum]?.bestRecord ?? null;
      },
    }),
    {
      name: "rightplace-level-progress",
    }
  )
);
