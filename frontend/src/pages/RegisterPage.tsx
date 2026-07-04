import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { SuccessCheck, ErrorBanner } from "@/components/ui/FormFeedback";
import { EVENTS } from "@/lib/eventsData";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";

type TeamMember = { name: string; email: string };

type RegistrationPayload = {
  eventSlug: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  institution: string;
  teamMembers: TeamMember[];
};

function submitRegistration(payload: RegistrationPayload) {
  return api.post<RegistrationPayload>("/registrations", payload);
}

export function RegisterPage() {
  const [params] = useSearchParams();
  const preselectedSlug = params.get("event") ?? "";

  const [eventSlug, setEventSlug] = useState(preselectedSlug);
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([{ name: "", email: "" }]);

  const { status, message, fieldErrors, submit, reset } = useFormSubmit(submitRegistration);

  const selectedEvent = useMemo(
    () => EVENTS.find((e) => e.slug === eventSlug),
    [eventSlug]
  );

  function updateMember(index: number, field: keyof TeamMember, value: string) {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  }

  function addMember() {
    if (members.length >= 5) return;
    setMembers((prev) => [...prev, { name: "", email: "" }]);
  }

  function removeMember(index: number) {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      eventSlug,
      teamName,
      leaderName,
      leaderEmail,
      leaderPhone,
      institution,
      teamMembers: members.filter((m) => m.name.trim()),
    });
  }

  function startOver() {
    reset();
    setTeamName("");
    setLeaderName("");
    setLeaderEmail("");
    setLeaderPhone("");
    setInstitution("");
    setMembers([{ name: "", email: "" }]);
  }

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Secure Your Spot"
        title="Register"
        description={
          selectedEvent
            ? `Registering for ${selectedEvent.title}`
            : "Pick an event and register your team."
        }
      />

      <div className="mx-auto max-w-2xl px-6 pb-28">
        <div className="glass-strong rounded-2xl p-6 md:p-10">
          {status === "success" ? (
            <>
              <SuccessCheck message={message ?? "Registration received."} />
              <button
                data-cursor="hover"
                onClick={startOver}
                className="mx-auto block rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
              >
                Register Another Team
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && message && <ErrorBanner message={message} />}

              <Field label="Event" error={fieldErrors.eventSlug}>
                <select
                  required
                  value={eventSlug}
                  onChange={(e) => setEventSlug(e.target.value)}
                  className="input"
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {EVENTS.map((event) => (
                    <option key={event.slug} value={event.slug}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Team Name" error={fieldErrors.teamName}>
                <input
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="input"
                  placeholder="e.g. Kernel Panic"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Team Leader Name" error={fieldErrors.leaderName}>
                  <input
                    required
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="input"
                  />
                </Field>
                <Field label="Institution" error={fieldErrors.institution}>
                  <input
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="input"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Leader Email" error={fieldErrors.leaderEmail}>
                  <input
                    required
                    type="email"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    className="input"
                  />
                </Field>
                <Field label="Leader Phone" error={fieldErrors.leaderPhone}>
                  <input
                    required
                    value={leaderPhone}
                    onChange={(e) => setLeaderPhone(e.target.value)}
                    className="input"
                    placeholder="+91 98765 43210"
                  />
                </Field>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-mist/50">
                    Team Members
                  </span>
                  <button
                    type="button"
                    data-cursor="hover"
                    onClick={addMember}
                    className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan disabled:opacity-30"
                    disabled={members.length >= 5}
                  >
                    + Add Member
                  </button>
                </div>
                <div className="space-y-3">
                  {members.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2"
                    >
                      <input
                        value={member.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="Member name"
                        className="input"
                      />
                      <input
                        value={member.email}
                        onChange={(e) => updateMember(i, "email", e.target.value)}
                        placeholder="Member email"
                        type="email"
                        className="input"
                      />
                      {members.length > 1 && (
                        <button
                          type="button"
                          data-cursor="hover"
                          onClick={() => removeMember(i)}
                          className="shrink-0 rounded-full border border-white/15 px-3 font-mono text-mist/50 transition-colors hover:border-signal-magenta hover:text-signal-magenta"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                data-cursor="hover"
                disabled={status === "loading"}
                className="w-full rounded-full bg-signal-gradient py-3.5 font-mono text-xs uppercase tracking-widest2 text-void-base shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-50"
              >
                {status === "loading" ? "Submitting…" : "Submit Registration"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
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