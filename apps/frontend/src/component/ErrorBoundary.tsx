import { Component, type ReactNode } from "react";
import { useErrorStore } from "../store/error.store";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    useErrorStore.getState().showError(error.message || "An unexpected error occurred.");
  }

  render() {
    return this.props.children;
  }
}
