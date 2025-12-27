import type { NetworkClient } from "../../network/client";
import { EventSocket, Input } from "@game/shared/";
import type { World } from "../world";


export function inputSystem(world: World, networkClient: NetworkClient, dt: number) {
  for(const e of world.query(Input)) {
    const inputs = world.get(e, Input) as Input;
    networkClient.sendCommand(EventSocket.Input, inputs);     
  }
}
