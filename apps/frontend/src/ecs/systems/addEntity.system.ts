import { World } from '../world';
import { networkClient } from '../../network/socket/networkClient';
import { bindKeyboard } from '../../util/keyboardbind';

export function addEntity(
  world: World
) {
  world.toAdd.forEach((value, key) => {
    world.entities.add(key);
    value.forEach((comp, name) => {
      world.addComponent(key, name, comp);

      if(key == networkClient.getClientId()){
        bindKeyboard(world, key);
      }
    });
  });

  world.toAdd.clear();
}
