export function RouteLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-screen w-full items-center justify-center bg-void-base"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-signal-cyan" />
    </div>
  );
}