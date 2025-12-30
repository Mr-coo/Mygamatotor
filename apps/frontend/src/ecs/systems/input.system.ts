import { networkClient } from "../../network/networkClient";
import { EventSocket, Input } from "@game/shared/";
import type { World } from "../world";

export function inputSystem(world: World, dt: number) {
  for(const e of world.query(Input)) {
    const inputs = world.get(e, Input) as Input;
    networkClient.sendCommand(EventSocket.INPUT, inputs);     
  }
}