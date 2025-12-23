import type { Component } from "../components/component";

export class World {
    tick = 0;
    nextEntityId = 0;
    entities: Set<number> = new Set();
    components: Map<string, Map<number, Component>> = new Map();

    createEntity(): number {
        const entityId = this.nextEntityId++;
        this.entities.add(entityId);
        return entityId;
    }

    addComponent<T extends Component>(e: number, name: string, data: T) {
        if (!this.components.has(name)) {
            this.components.set(name, new Map());
        }
        this.components.get(name)!.set(e, data);
    }

    getComponent<T>(name: string): Map<number, T> {
        return this.components.get(name) as Map<number, T>;
    }
}