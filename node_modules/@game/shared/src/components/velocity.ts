import type { Component } from "./component";

export interface Velocity  extends Component {
  dx: number;
  dy: number;
}