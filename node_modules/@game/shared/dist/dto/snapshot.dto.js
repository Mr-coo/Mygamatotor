export class Snapshot {
    constructor(components, entities) {
        this.entities = [...entities];
        this.components = Object.fromEntries([...components.entries()].map(([name, map]) => [
            name,
            Object.fromEntries(map)
        ]));
    }
}
