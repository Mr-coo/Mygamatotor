import type { Component } from "./component";

export interface Input extends Component{
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}