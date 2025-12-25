import type { NetworkClient } from "../../network/client";
import { EventSocket, Input } from "@game/shared/";
import type { World } from "../world";

let seq = 0;

export function inputSystem(world: World, networkClient: NetworkClient, tick: number) {
  for(const e of world.query(Input)) {
    const inputs = world.get(e, Input) as Input;

    if(inputs.down || inputs.up || inputs.left || inputs.right ) {      
      networkClient.sendCommand(EventSocket.Input, inputs);
    }

  }
}
