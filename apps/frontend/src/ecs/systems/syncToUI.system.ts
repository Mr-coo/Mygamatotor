// ecs/sync.ts
import { Player, Score, type Entity } from "@game/shared";
import { useGameStore } from "../../store/game.store";
import type { World } from "../world";

export function syncToUI(world : World) {
  const players = world.query(Player, Score);
  
  for (const p of players) {
    const score = world.get(p, Score)!;

    useGameStore.getState().updateScore(p, score.value);
  }
}
