import { Duration, DurationDto, EventSocket } from '@game/shared';
import { World } from '../world';

export function durationSystem(
  world: World,
  deltaTime: number,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  for (const e of world.query(Duration)) {
    const duration = world.get(e, Duration) as Duration;

    if (duration.remaining > 0) {
      duration.remaining = Math.max(0, duration.remaining - deltaTime);
    }

    broadCastData(EventSocket.DURATION, new DurationDto(duration.remaining, duration.total));
  }
}
