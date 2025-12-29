import { Component } from "./component.js";

export class Sprite extends Component {
    textureId : string = 'dummpy.jpg';
    flipX : boolean = false;

    constructor(textureId : string, flipX : boolean){
        super();
        this.textureId = textureId;
        this.flipX = flipX;
    }
}