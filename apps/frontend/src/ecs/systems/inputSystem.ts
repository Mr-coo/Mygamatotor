import type { NetworkClient } from "../../network/client";
import type { InputCommand } from "@game/shared/";
import { Input } from "@game/shared/";
import type { World } from "../world";

let seq = 0;

export function inputSystem(world: World, networkClient: NetworkClient, tick: number) {
  for(const e of world.query(Input)) {
    const inputs = world.get(e, Input) as Input;

    if(inputs.down || inputs.up || inputs.left || inputs.right ) {
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
      
      networkClient.sendCommand(inputs);
    }

  }
}
