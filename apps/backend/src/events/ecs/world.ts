import { Entity } from "@game/shared";

export class World {
  entities = new Set<Entity>();
  components = new Map<string, Map<Entity, any>>();

  createEntity(id : Entity): Entity {
    this.entities.add(id);
    return id;
  }

  removeEntity(entity: Entity) {
    this.entities.delete(entity);
    for (const map of this.components.values()) {
      map.delete(entity);
    }
  }

  addComponent<T>(entity: Entity, cls: new (...a: any[]) => T, component: T) {
    const key = cls.name;
    if (!this.components.has(key)) {
      this.components.set(key, new Map());
    }
    this.components.get(key)!.set(entity, component);
  }

  get<T>(entity: Entity, cls: new (...a: any[]) => T): T | undefined {
    return this.components.get(cls.name)?.get(entity);
  }

  query(...components: Function[]): Entity[] {
    return [...this.entities].filter(e =>
      components.every(c => this.components.get(c.name)?.has(e)),
    );
  }
}