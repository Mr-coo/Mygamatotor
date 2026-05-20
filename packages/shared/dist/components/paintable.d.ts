import { Component } from "./component.js";
export declare class Paintable extends Component {
    color: string | null;
    dirty: boolean;
    constructor(color?: string | null);
}
