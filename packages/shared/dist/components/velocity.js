import { Component } from "./component.js";
export class Velocity extends Component {
    constructor() {
        super(...arguments);
        this.dx = 0;
        this.dy = 0;
    }
}
