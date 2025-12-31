import type { Entity } from "@game/shared";
import { create } from "zustand";

type GameStore = {
  scores: Record<Entity, number>;
  updateScore: (entity: Entity, score: number) => void;
  replaceScores: (scores: Record<Entity, number>) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  scores: {},

  updateScore: (entity, score) =>
    set((state) => ({
      scores: { ...state.scores, [entity]: score },
    })),

  replaceScores: (scores) => set({ scores }),
}));

