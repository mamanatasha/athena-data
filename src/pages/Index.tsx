import { useState } from "react";
import { Logo } from "@/components/Logo";
import heroImg from "@/assets/hero.jpg";

export default function Index() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Nav ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md bg-primary/95">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center">
            <Logo variant="light" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-primary-foreground/70">
            <a href="#services"  className="hover:text-primary-foreground transition-colors">Services</a>
            <a href="#approach"  className="hover:text-primary-foreground transition-colors">Approach</a>
            <a href="#about"     className="hover:text-primary-foreground transition-colors">About</a>
            <a href="#contact"   className="hover:text-primary-foreground transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex rounded-md px-4 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-gold)" }}
          >
            Start a conversation
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-primary/98 px-6 py-4 flex flex-col gap-1">
            {[
              { href: "#services", label: "Services" },
              { href: "#approach", label: "Approach" },
              { href: "#about",    label: "About" },
              { href: "#contact",  label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground border-b border-white/5 last:border-0 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-md px-4 py-2.5 text-sm font-semibold text-primary text-center transition-opacity hover:opacity-90"
              style={{ background: "var(--gradient-gold)" }}
            >
              Start a conversation
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section
        id="top"
        className="relative flex min-h-screen items-center pt-16"
        style={{ background: "var(--gradient-hero)" }}
      >
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative z-10 container mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 mb-6"
                 style={{ background: "oklch(1 0 0 / 0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
              <span className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">
                Women-Owned · Microsoft Specialists
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-5">
              Your data,{" "}
              <span style={{ color: "var(--gold)" }}>done right.</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/65 max-w-4xl mb-7 leading-relaxed">
              We provide comprehensive expertise in Business Intelligence, Data Analysis, Profiling,
              Modeling, Architecture, and Conversion, alongside Database Design, Maintenance,
              Performance Tuning, Reporting, and System Integration. Our primary specialization lies
              in Microsoft technologies. Our team includes Microsoft Certified Professionals with
              credentials such as Azure Data Fundamentals, Azure Data Engineer Associate, MCP, and
              MCSA. We bring extensive industry experience across manufacturing, finance,
              telecommunications, airline sectors, as well as government services. We are committed
              to delivering innovative, cost-effective solutions that drive business value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md px-7 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
                style={{ background: "var(--gradient-gold)" }}
              >
                Schedule a consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md px-7 py-3 font-semibold border border-primary-foreground/25 text-primary-foreground hover:border-primary-foreground/50 transition-colors"
              >
                Explore services
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {heroBadges.map((b) => (
                <div
                  key={b.label}
                  className="flex items-start gap-3 rounded-xl px-5 py-3 border border-white/10"
                  style={{ background: "oklch(1 0 0 / 0.05)" }}
                >
                  <span className="text-lg leading-none mt-0.5">{b.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-primary-foreground leading-tight">{b.label}</div>
                    <div className="text-xs text-primary-foreground/50 leading-snug mt-0.5">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase">
              Services
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-lg">
              Focused services for<br />complex data work.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-elevated)] transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  {s.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section id="approach" className="py-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-6">

          {/* Header — stacked, description under title */}
          <div className="max-w-2xl mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full border border-gold/30 text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ color: "var(--gold)" }}
            >
              How we work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-5">
              A seasoned, hands-on<br />engagement model.
            </h2>
            <p className="text-primary-foreground/60 leading-relaxed">
              Athena Data brings a focused delivery model to complex data work: the people who scope
              your migration are the same people who design it, execute it, validate it, and stand
              behind the result. No junior bench, no unnecessary handoffs, just experienced
              specialists who reduce risk in the parts of the project that matter most.
            </p>
          </div>

          {/* Step boxes — original dark style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approach.map((step, i) => (
              <div
                key={step.title}
                className="relative p-7 rounded-2xl border border-white/10"
                style={{ background: "oklch(1 0 0 / 0.04)" }}
              >
                <div
                  className="font-display text-5xl font-bold mb-4 leading-none"
                  style={{ color: "var(--gold)", opacity: 0.35 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-lg text-primary-foreground mb-2">{step.title}</h3>
                <p className="text-primary-foreground/55 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase">
                  About Athena Data
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                A women-owned firm of seasoned data practitioners.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Athena Data brings senior, hands-on expertise to data migration, modernization,
                and governance. Our team combines deep Microsoft platform knowledge with practical
                delivery experience across Azure Data, Microsoft Fabric, SQL Server, and enterprise
                data environments where accuracy and accountability matter.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are brought in when the work is complex, the timelines are tight, and the data
                cannot be trusted at face value. That means clear ownership, strong technical
                judgment, and experienced specialists who can profile, map, reconcile, validate,
                and deliver with confidence.
              </p>
            </div>

            {/* Right — credential highlights */}
            <div className="space-y-4">
              {aboutHighlights.map((h) => (
                <div
                  key={h.title}
                  className="flex items-start gap-5 p-6 rounded-xl border border-border bg-card"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    {h.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{h.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{h.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full border border-gold/30 text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "var(--gold)" }}>
                  Let's talk
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6">
                Bring us your hardest data problem.
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed mb-8">
                Whether you're planning a migration, modernizing onto Azure or Fabric, or standing
                up governance from scratch, we'd be glad to take the first conversation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <span className="text-base">✉️</span>
                  <span>info@athenadata.ca</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <span className="text-base">📞</span>
                  <span>416-200-6898</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <span className="text-base">📅</span>
                  <span>By appointment</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <span className="text-base">🌎</span>
                  <span>Serving clients across North America</span>
                </div>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Organization"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-foreground/80 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-foreground/80 mb-1.5">How can we help? *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] resize-none"
                  placeholder="Source platform, target platform, timeline…"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ background: "oklch(0.72 0.13 75 / 0.15)", color: "var(--gold)", border: "1px solid oklch(0.72 0.13 75 / 0.3)" }}>
                  ✅ Message sent! We'll be in touch within one business day.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-lg px-4 py-3 text-sm font-medium bg-red-500/10 text-red-300 border border-red-500/20">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full rounded-lg py-3 font-semibold text-primary transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "var(--gradient-gold)" }}
              >
                {status === "sending" ? "Sending…" : status === "success" ? "Sent!" : "Send inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 bg-primary">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="light" />
          <p className="text-sm text-primary-foreground/40 text-center">
            © {new Date().getFullYear()} Athena Tech Systems Inc. Trading as Athena Data. Women-owned. Microsoft-certified.
            Making technology work for you.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Data ── */

const heroBadges = [
  {
    icon: "⚡",
    label: "20+ years in enterprise data",
    sub: "Hands-on delivery across complex data estates",
  },
  {
    icon: "🎯",
    label: "Microsoft-certified specialists",
    sub: "Azure Data, Microsoft Fabric, SQL Server",
  },
  {
    icon: "🔒",
    label: "Zero tolerance for data loss",
    sub: "Every migration fully profiled, mapped & validated",
  },
];

const services = [
  {
    icon: "🔄",
    title: "Data migration and cutover support",
    description:
      "Support for source profiling, mapping, reconciliation, cutover planning, and post-migration validation.",
  },
  {
    icon: "🏢",
    title: "Legacy to CRM Dynamics migration",
    description:
      "Migration support for organizations moving from legacy systems into Microsoft Dynamics and related business platforms.",
  },
  {
    icon: "☁️",
    title: "Data modernization",
    description:
      "Modernization of data flows, reporting pipelines, and platform components across SQL Server, Azure Data, and Microsoft Fabric.",
  },
  {
    icon: "🛡️",
    title: "Data governance and validation",
    description:
      "Practical governance, controls, reconciliation, and documentation that improve trust in the target environment.",
  },
  {
    icon: "🤝",
    title: "Prime subcontract support",
    description:
      "Specialist delivery support for primes that need short-term, senior migration expertise on modernization programs.",
  },
  {
    icon: "📋",
    title: "Regulatory reporting data support",
    description:
      "Support for the data preparation, validation, reconciliation, and traceability behind regulatory reporting. When reports are tied to compliance obligations, Athena Data helps ensure the underlying data is accurate, defensible, and ready for audit or review.",
  },
];

const approach = [
  {
    title: "Discover",
    description:
      "Working sessions with stakeholders map the data landscape, business priorities, dependencies, and migration risks.",
  },
  {
    title: "Design",
    description:
      "A pragmatic target state and sequenced roadmap define what should be modernized, what should be preserved, and how risk will be managed.",
  },
  {
    title: "Deliver",
    description:
      "Senior specialists work alongside client teams to migrate, modernize, reconcile, and validate with clear accountability and measurable outcomes.",
  },
  {
    title: "Sustain",
    description:
      "Governance, observability, documentation, and enablement help the platform remain stable and useful after delivery.",
  },
];

const aboutBadges = [
  "Women-owned & operated",
  "Microsoft-certified specialists",
  "Seasoned practitioners only",
  "Outcome-based engagements",
];

const aboutHighlights = [
  {
    icon: "🗄️",
    title: "Deep Microsoft platform expertise",
    detail: "Hands-on delivery across Azure Data, Microsoft Fabric, SQL Server, CRM Dynamics, Power BI, and ETL tooling — not advisory, but execution.",
  },
  {
    icon: "✅",
    title: "Senior specialists only",
    detail: "Every engagement is staffed by experienced practitioners. The people who scope the work are the people who do the work.",
  },
  {
    icon: "📐",
    title: "Proven on complex programs",
    detail: "Brought in when the data is messy, timelines are tight, and accuracy is non-negotiable — including government and prime-contractor engagements.",
  },
  {
    icon: "👩‍💼",
    title: "Women-owned and operated",
    detail: "A focused practice founded and led by women with decades of hands-on data engineering experience.",
  },
];
