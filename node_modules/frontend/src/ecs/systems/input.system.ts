import { networkClient } from "../../network/socket/networkClient";
import { EventSocket, Input } from "@game/shared/";
import type { World } from "../world";

export let needToBeSend = false;

export function inputSystem(world: World, dt: number) {
  const e = networkClient.getClientId();
  if(!e) return;
  const inputs = world.get(e, Input) as Input;
  networkClient.sendCommand(EventSocket.INPUT, inputs);    
}