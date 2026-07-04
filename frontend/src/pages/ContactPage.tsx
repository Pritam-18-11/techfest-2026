import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { SuccessCheck, ErrorBanner } from "@/components/ui/FormFeedback";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function submitContact(payload: ContactPayload) {
  return api.post<ContactPayload>("/contact", payload);
}

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { status, message: statusMessage, fieldErrors, submit, reset } = useFormSubmit(submitContact);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({ name, email, subject, message });
  }

  function startOver() {
    reset();
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact"
        description="Questions about an event, sponsorship, or press? Reach the organizing committee directly."
      />

      <div className="mx-auto grid max-w-5xl gap-10 px-6 pb-28 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <InfoCard label="General Inquiries" value="hello@techfest2026.in" />
          <InfoCard label="Sponsorship" value="sponsors@techfest2026.in" />
          <InfoCard label="Media & Press" value="press@techfest2026.in" />
          <InfoCard label="Venue" value="Indian Institute of Technology" />
        </div>

        <div className="glass-strong rounded-2xl p-6 md:p-10">
          {status === "success" ? (
            <>
              <SuccessCheck message={statusMessage ?? "Message sent."} />
              <button
                data-cursor="hover"
                onClick={startOver}
                className="mx-auto block rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
              >
                Send Another Message
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && statusMessage && <ErrorBanner message={statusMessage} />}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={fieldErrors.name}>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </Field>
                <Field label="Email" error={fieldErrors.email}>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Subject" error={fieldErrors.subject}>
                <input
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Message" error={fieldErrors.message}>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input resize-none"
                  placeholder="Tell us what's on your mind…"
                />
              </Field>

              <button
                type="submit"
                data-cursor="hover"
                disabled={status === "loading"}
                className="w-full rounded-full bg-signal-gradient py-3.5 font-mono text-xs uppercase tracking-widest2 text-void-base shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-50"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-mist/40">{label}</p>
      <p className="mt-1 font-body text-sm text-mist">{value}</p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest2 text-mist/50">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block font-body text-xs text-signal-magenta">{error}</span>}
    </label>
  );
}