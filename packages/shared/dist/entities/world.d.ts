import type { Component } from "../components/component";
export declare class World {
    tick: number;
    nextEntityId: number;
    entities: Set<number>;
    components: Map<string, Map<number, Component>>;
    createEntity(): number;
    addComponent<T extends Component>(e: number, name: string, data: T): void;
    getComponent<T>(name: string): Map<number, T>;
}
