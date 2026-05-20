import { Component } from "./component.js";

export class Paintable extends Component {
  color: string | null;
  dirty: boolean;

  constructor(color: string | null = null) {
    super();
    this.color = color;
    this.dirty = false;
  }
}
