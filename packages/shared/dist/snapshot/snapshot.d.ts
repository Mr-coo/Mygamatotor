import { Entity } from "../entities/entity.js";
import { Component } from "../components/component.js";
export declare class Snapshot {
    entities: Entity[];
    components: Record<string, Record<Entity, Component>>;
    constructor(components: Map<string, Map<Entity, Component>>, entities: Set<Entity>);
}
