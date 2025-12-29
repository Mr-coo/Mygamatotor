import { Component } from "../components/component.js";
import { Entity } from "../entities/entity.js";

export class RemoveEntityDto {
    entities: Entity[];

    constructor(entities: Entity[]) {
        this.entities = entities;
    }
}