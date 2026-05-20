import { Component } from "./component.js";
export class Painter extends Component {
    constructor(color, radius = 100) {
        super();
        this.color = color;
        this.radius = radius;
    }
}
