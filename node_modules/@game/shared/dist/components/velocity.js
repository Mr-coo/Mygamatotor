import { Component } from "./component.js";
export class Velocity extends Component {
    constructor(base, dx, dy) {
        super();
        this.base = 0;
        this.dx = 0;
        this.dy = 0;
        this.base = base;
        this.dx = dx !== null && dx !== void 0 ? dx : 0;
        this.dy = dy !== null && dy !== void 0 ? dy : 0;
    }
}
