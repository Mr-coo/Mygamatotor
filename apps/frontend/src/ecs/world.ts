import type { Entity } from "@game/shared";
import type { Component } from "@game/shared/dist/components/component";

export class World {
  entities = new Set<Entity>();
  components = new Map<string, Map<Entity, Component>>();

  createEntity(id: Entity): Entity {
    this.entities.add(id);
    return id;
  }

  removeEntity(entity: Entity) {
    this.entities.delete(entity);
    for (const map of this.components.values()) {
      map.delete(entity);
    }
  }

  addComponent<T extends Component>(entity: Entity, name: string, component: T) {
    if (!this.components.has(name)) {
      this.components.set(name, new Map());
    }
    this.components.get(name)!.set(entity, component);
  }

  get<T extends Component>(entity: Entity, cls: new (...a: any[]) => T): Component | undefined {
    const value = this.components.get(cls.name);
    if (!value) {
      return undefined;
    }
    return value.get(entity);
  }

  query(...components: Function[]): Entity[] {
    return [...this.entities].filter(e =>
      components.every(c => this.components.get(c.name)?.has(e)),
    );
  }
}