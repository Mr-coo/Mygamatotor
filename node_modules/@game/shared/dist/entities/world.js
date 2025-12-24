"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
class World {
    constructor() {
        this.tick = 0;
        this.nextEntityId = 0;
        this.entities = new Set();
        this.components = new Map();
    }
    createEntity() {
        const entityId = this.nextEntityId++;
        this.entities.add(entityId);
        return entityId;
    }
    addComponent(e, name, data) {
        if (!this.components.has(name)) {
            this.components.set(name, new Map());
        }
        this.components.get(name).set(e, data);
    }
    getComponent(name) {
        return this.components.get(name);
    }
}
exports.World = World;
