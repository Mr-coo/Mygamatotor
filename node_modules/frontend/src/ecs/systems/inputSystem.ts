import type { NetworkClient } from "../../network/client";
import type { InputCommand } from "@game/shared/";
import type { Input } from "@game/shared/";
import type { World } from "@game/shared/";

let seq = 0;

export function inputSystem(world: World, networkClient: NetworkClient, tick: number) {
  const inputs = world.getComponent<Input>('input').get(0);
  if (!inputs) return;
  
  const command : InputCommand = {
    seq: seq++,
    tick: tick,
    moveX: (inputs.right ? 1 : 0) - (inputs.left ? 1 : 0),
    moveY: (inputs.down ? 1 : 0) - (inputs.up ? 1 : 0),
    actions: {
      jump: inputs.jumpPressed || false,
      attack: inputs.attackPressed || false
    }
  }

  networkClient.sendCommand(command);
}
