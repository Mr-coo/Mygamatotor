import { Component } from "./component.js";
export class Paintable extends Component {
    constructor(color = null) {
        super();
        this.color = color;
        this.dirty = false;
    }
}
