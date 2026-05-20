import { Entity, EventSocket, PaintDto, Paintable } from '@game/shared';
import { World } from '../world';

export function sendPaint(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  const record: Record<Entity, string> = {};
  let has = false;

  for (const e of world.query(Paintable)) {
    const p = world.get(e, Paintable)!;
    if (!p.dirty) continue;
    record[e] = p.color ?? '';
    p.dirty = false;
    has = true;
  }

  if (has) broadCastData(EventSocket.PAINT, new PaintDto(record));
}
