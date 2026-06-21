import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { defaultContactPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";
import type { ContactPage } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
};

async function getContact() {
  return safeFetch<ContactPage>(contactPageQuery, {}, defaultContactPage);
}

export default async function ContactPageRoute() {
  const contact = await getContact();

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-[var(--color-accent-strong)]">
              Say hi
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              {contact.heading ?? "Let's connect"}
            </h1>
          </Reveal>
          {contact.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {contact.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="rounded-2xl p-8"
                style={{ background: "var(--color-foreground)" }}
              >
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/60">
                  Reach us directly
                </p>
                <dl className="mt-6 space-y-6 text-white">
                  {contact.email ? (
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-white/50">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-lg underline-offset-4 hover:underline"
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.phone ? (
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-white/50">
                        Phone
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                          className="text-lg underline-offset-4 hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.addressLine ? (
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-white/50">
                        Find us
                      </dt>
                      <dd className="mt-1 text-lg leading-snug">
                        {contact.addressLine}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
