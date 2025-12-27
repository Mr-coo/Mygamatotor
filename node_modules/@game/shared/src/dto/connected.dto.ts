import { Component } from "../components/component.js";
import { Entity } from "../entities/entity.js";

export class ConnectedDto {
    entities: Entity[];
    components: Record<string, Record<Entity, Component>>;

    constructor(entities: Entity[], components: Record<string, Record<Entity, Component>>) {
        this.entities = entities;
        this.components = components;
    }
} 