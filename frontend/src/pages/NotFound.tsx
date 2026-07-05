import { Link } from "react-router-dom";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function NotFound() {
  useDocumentHead({ title: "Page Not Found" });

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-void-base px-6 text-center">
      <p className="font-mono text-8xl font-black text-gradient">404</p>
      <p className="mt-4 font-body text-mist/60">
        This coordinate doesn't exist in the TechFest galaxy.
      </p>
      <Link
        to="/"
        data-cursor="hover"
        className="mt-8 rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
      >
        Back to Home
      </Link>
    </main>
  );
}