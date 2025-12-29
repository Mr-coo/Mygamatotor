import { Component } from "./component.js";
export class Sprite extends Component {
    constructor(textureId, flipX) {
        super();
        this.textureId = 'dummpy.jpg';
        this.flipX = false;
        this.textureId = textureId;
        this.flipX = flipX;
    }
}
