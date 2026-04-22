import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center bg-background text-foreground">
        <div className="mx-auto w-full max-w-xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-destructive">
            Error · Fatal
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Something broke.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            The app hit an unexpected error. Try reloading the page — if it
            happens again, the details below might help you track it down.
          </p>

          <pre className="mt-6 overflow-auto rounded-md border bg-muted p-3 font-mono text-xs text-muted-foreground">
            {error.message}
          </pre>

          {import.meta.env.DEV && error.stack && (
            <details className="mt-3">
              <summary className="cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground">
                Stack trace
              </summary>
              <pre className="mt-2 overflow-auto rounded-md border bg-muted p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {error.stack}
              </pre>
            </details>
          )}

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 font-mono text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={this.reset}
              className="inline-flex h-10 items-center rounded-md border px-4 font-mono text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
