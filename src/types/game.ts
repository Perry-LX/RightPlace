export interface Bottle {
  id: string;
  name: string;
  imageIndex: number;       // 1-13, maps to /bottle{imageIndex}.png
  correctPosition: number;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  bottles: { name: string; imageIndex: number }[];
}

export interface LevelConfig {
  id: string;
  number: number;
  bottleCount: number;
  themeId: string;
  judgeLimit: number | null;
  timeLimit: number | null;
  /** If set, all bottles in this level use the same imageIndex (test mode). */
  uniformImageIndex?: number;
}

export interface JudgeResult {
  attempt: number;
  correctCount: number;
  total: number;
}

export interface BestRecord {
  bestTime: number;
  bestJudges: number;
  completedAt: number;
}

export interface LevelProgress {
  stars: number;
  bestRecord: BestRecord | null;
}

export interface LevelSaveData {
  levels: Record<number, LevelProgress>;
  totalStars: number;
}

export type Page =
  | "home"
  | "game"
  | "level-select"
  | "multiplayer"
  | "uniform"
  | "novice"
  | "settlement";

export interface DifficultyOption {
  label: string;
  count: number;
  description: string;
}

export const DIFFICULTIES: DifficultyOption[] = [
  { label: "简单", count: 4, description: "新手入门" },
  { label: "普通", count: 6, description: "一般玩家" },
  { label: "困难", count: 8, description: "进阶玩家" },
  { label: "专家", count: 10, description: "硬核玩家" },
  { label: "地狱", count: 12, description: "终极挑战" },
];
