import { Component } from "../components/component.js";
import { Entity } from "../entities/entity.js";
export declare class SingleEntityDto {
    entity: Entity;
    components: Record<string, Component>;
    constructor(entity: Entity, components: Record<string, Component>);
}
