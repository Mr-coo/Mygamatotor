import { Entity, EventSocket, Position, PositionDto } from '@game/shared';
import { World } from '../world';

export function sendPosition(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  const record: Record<Entity, Position> = {};

  for (const e of world.query(Position)) {
    const pos = world.get(e, Position)!;
    record[e] = pos;
  }

  broadCastData(EventSocket.POSITION, new PositionDto(record));
}
