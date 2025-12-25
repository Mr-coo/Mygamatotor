import { Entity } from "../entities/entity.js";
import { Component } from "../components/component.js";

export class Snapshot {
  entities: Entity[];
  components: Record<string, Record<Entity, Component>>;

  constructor(
    components: Map<string, Map<Entity, Component>>,
    entities: Set<Entity>
  ) {
    this.entities = [...entities];
    this.components = Object.fromEntries(
      [...components.entries()].map(([name, map]) => [
        name,
        Object.fromEntries(map)
      ])
    );
  }
}
