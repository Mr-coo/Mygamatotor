import {
  Entity,
  EventSocket,
  Player,
  Position,
  PositionDto,
} from '@game/shared';
import { World } from '../world';

export function sendPosition(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  const record: Record<Entity, Position> = {};

  for (const e of world.query(Position, Player)) {
    const pos = world.get(e, Position)!;
    record[e] = pos;
  }

  broadCastData(EventSocket.POSITION, new PositionDto(record));
}
