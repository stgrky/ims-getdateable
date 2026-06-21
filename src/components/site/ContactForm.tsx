"use client";

import { FormEvent, useState } from "react";

/**
 * Contact form — name / email / phone / message. Front-end only for now;
 * shows a friendly confirmation on submit. Wire to HubSpot (or email) in a
 * later step; the onSubmit is the single integration point.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(integration): POST these fields to HubSpot / an email handler.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "var(--color-accent-soft)" }}
      >
        <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
          Got it — talk soon. 💌
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          We read every note and reply personally.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-2 border-[var(--color-foreground)]/10 bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        placeholder="Full name"
        aria-label="Full name"
        className={inputClass}
      />
      <input
        type="email"
        required
        placeholder="Email"
        aria-label="Email"
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        aria-label="Phone number"
        className={inputClass}
      />
      <textarea
        required
        rows={5}
        placeholder="What's on your mind?"
        aria-label="Message"
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
      >
        Send it
      </button>
    </form>
  );
}
