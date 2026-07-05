import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Class component (required for error boundaries in React). Wraps
 * SpaceScene/JourneyCanvas so a WebGL context loss, driver crash, or
 * Three.js runtime error degrades to a static fallback rather than
 * white-screening the whole site.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[CanvasErrorBoundary] 3D scene crashed, falling back:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}