import { Component } from "../components/component.js";
import { Entity } from "../entities/entity.js";
export declare class CreateEntityDto {
    entities: Entity[];
    components: Record<string, Record<Entity, Component>>;
    constructor(entities: Entity[], components: Record<string, Record<Entity, Component>>);
}
