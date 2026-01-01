import type { Entity } from "@game/shared";
import { create } from "zustand";

type GameStore = {
  scores: Record<Entity, number>;
  updateScore: (entity: Entity, score: number) => void;
  replaceScores: (scores: Record<Entity, number>) => void;
  removeScores: (entity: Entity) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  scores: {},

  updateScore: (entity, score) =>
    set((state) => ({
      scores: { ...state.scores, [entity]: score },
    })),

  replaceScores: (scores) => set({ scores }),
  removeScores: (entity) =>
    set((state) => {
      const { [entity]: _, ...rest } = state.scores;
      return { scores: rest };
    }),
}));

