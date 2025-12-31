import { Entity, EventSocket, Player, ScoreDto, Score } from '@game/shared';
import { World } from '../world';

export function sendScore(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  const record: Record<Entity, Score> = {};

  for (const e of world.query(Score, Player)) {
    const score = world.get(e, Score)!;
    record[e] = score;
  }

  broadCastData(EventSocket.SCORE, new ScoreDto(record));
}
