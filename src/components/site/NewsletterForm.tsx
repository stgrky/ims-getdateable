"use client";

import { FormEvent, useState } from "react";

/**
 * Email-capture form. Front-end only for now — shows a friendly confirmation
 * on submit. Wire to HubSpot (or whatever list tool) in a later step; the
 * onSubmit is the single integration point.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(integration): POST the email to HubSpot / list provider here.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p
        className="rounded-full px-6 py-3.5 text-sm font-medium"
        style={{
          background: "var(--color-accent-soft)",
          color: "var(--color-accent-strong)",
        }}
      >
        You&apos;re on the list — talk soon. 💌
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <input
        type="email"
        required
        placeholder="Enter your email"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-full border-2 border-[var(--color-foreground)]/15 bg-[var(--color-surface)] px-5 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
      />
      <button
        type="submit"
        className="rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
      >
        Submit
      </button>
    </form>
  );
}
