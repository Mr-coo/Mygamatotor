import { Component } from "./component.js";
export class Sprite extends Component {
    constructor() {
        super(...arguments);
        this.textureId = 'dummpy.jpg';
        this.flipX = false;
    }
}
