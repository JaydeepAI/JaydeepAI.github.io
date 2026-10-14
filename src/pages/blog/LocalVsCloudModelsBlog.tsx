import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  ShieldCheck,
  Laptop,
  Scale,
  ClipboardList,
  ScrollText,
  Eraser,
  Layers,
  Server,
  Cloud,
  ArrowDown,
  Github,
} from "lucide-react";

/**
 * Blog: Local Models vs Cloud Models for QA Work: Privacy, Quality and Convenience
 * Slug: /blog/local-models-vs-cloud-models-for-qa
 * Category: AI Architecture
 */

function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  schema,
}: {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", canonicalUrl, true);
    if (ogImage) {
      setMeta("og:image", ogImage, true);
      setMeta("twitter:image", ogImage);
    }
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let ldScript = document.getElementById("blog-json-ld") as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "blog-json-ld";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      ...(schema ?? {}),
    });

    return () => {
      document.title = "Digital Jaydeep";
    };
  }, [title, description, keywords, canonicalUrl, ogImage, schema]);
}

type Rating = "good" | "mixed" | "hard";

const chipClass: Record<Rating, string> = {
  good: "bg-green-500/15 border border-green-500/25 text-green-300",
  mixed: "bg-amber-500/15 border border-amber-500/25 text-amber-300",
  hard: "bg-red-500/15 border border-red-500/25 text-red-300",
};

const LocalVsCloudModelsBlog = () => {
  const navigate = useNavigate();

  const goHome = (section?: string) => {
    navigate("/");
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useSEO({
    title: "Local Models vs Cloud Models for QA Work: Privacy, Quality and Convenience | Digital Jaydeep",
    description:
      "Where should your AI run: on your laptop, on a company server or in a vendor's cloud? A practical decision framework for QA teams handling sensitive data, covering privacy, capability, setup effort, cost patterns and a pragmatic hybrid.",
    keywords:
      "local LLM, cloud AI, self-hosted models, data privacy, AI architecture, QA teams, open-weight models, data classification",
    canonicalUrl: "https://jaydeepai.github.io/blog/local-models-vs-cloud-models-for-qa",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Local Models vs Cloud Models for QA Work: Privacy, Quality and Convenience",
      datePublished: "2026-11-20",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "data-first", label: "The Data Question Comes First" },
    { id: "what-local-means", label: "What \"Local\" Means" },
    { id: "trade-offs", label: "The Trade-Offs" },
    { id: "qa-tasks", label: "Typical QA Tasks and Where They Fit" },
    { id: "policy", label: "Policy Beats Preference" },
    { id: "sanitize", label: "Sanitize Regardless" },
    { id: "hybrid", label: "A Pragmatic Hybrid" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const dataClasses = [
    { name: "Public", example: "Published docs, open-source code, public bug trackers", color: "text-green-300", bar: "bg-green-400/70 w-1/4" },
    { name: "Internal", example: "Test plans, internal wikis, non-sensitive test results", color: "text-amber-300", bar: "bg-amber-400/70 w-2/4" },
    { name: "Confidential", example: "Unreleased features, source code, architecture, credentials", color: "text-orange-300", bar: "bg-orange-400/80 w-3/4" },
    { name: "Regulated", example: "Personal data, health or financial records, customer data", color: "text-red-300", bar: "bg-red-400/80 w-full" },
  ];

  const rows: { factor: string; cells: { label: string; rating: Rating }[] }[] = [
    {
      factor: "Data sensitivity",
      cells: [
        { label: "Data stays on the device", rating: "good" },
        { label: "Data stays in your network", rating: "good" },
        { label: "Depends on terms and settings", rating: "mixed" },
      ],
    },
    {
      factor: "Quality needs",
      cells: [
        { label: "Limited by what the machine can run", rating: "mixed" },
        { label: "Wider choice, still your hardware", rating: "mixed" },
        { label: "Usually the most capable options", rating: "good" },
      ],
    },
    {
      factor: "Setup effort",
      cells: [
        { label: "Moderate, per person", rating: "mixed" },
        { label: "High, needs a platform team", rating: "hard" },
        { label: "Low, sign up and go", rating: "good" },
      ],
    },
    {
      factor: "Cost pattern",
      cells: [
        { label: "Hardware you already own", rating: "good" },
        { label: "Upfront and running infrastructure", rating: "mixed" },
        { label: "Pay per use, grows with use", rating: "mixed" },
      ],
    },
    {
      factor: "Offline need",
      cells: [
        { label: "Works without a network", rating: "good" },
        { label: "Works inside the company network", rating: "good" },
        { label: "Needs internet access", rating: "hard" },
      ],
    },
    {
      factor: "Maintenance",
      cells: [
        { label: "Each user updates their own", rating: "mixed" },
        { label: "Owned by an internal team", rating: "hard" },
        { label: "Handled by the vendor", rating: "good" },
      ],
    },
    {
      factor: "Team skills",
      cells: [
        { label: "Comfort with local tooling", rating: "mixed" },
        { label: "Infrastructure and operations skills", rating: "hard" },
        { label: "Minimal; mostly policy awareness", rating: "good" },
      ],
    },
  ];

  const tasks = [
    {
      task: "Summarizing test logs",
      fit: "Depends on content",
      note: "Logs often hold tokens, hostnames and user data. Redact first and a cloud tool may be fine; raw production logs belong inside.",
    },
    {
      task: "Drafting test cases from a public or sanitized spec",
      fit: "Cloud is usually fine",
      note: "The input is a description of behavior, not data. Ideal for the most capable model your policy allows.",
    },
    {
      task: "Cleaning up bug report wording",
      fit: "Usually fine after a check",
      note: "Strip customer names, account ids and screenshots with real data before you paste anything.",
    },
    {
      task: "Code review help on proprietary code",
      fit: "Follow policy strictly",
      note: "Source code is often classified as confidential. Only use tools your organization has approved for code.",
    },
    {
      task: "Analysing data exports or database snapshots",
      fit: "Keep inside",
      note: "Real records are exactly what should never leave. Use local or self-hosted options, or synthetic data.",
    },
    {
      task: "Learning a new tool or concept",
      fit: "Cloud is fine",
      note: "Questions about public technology carry no company data. Use whatever helps you learn fastest.",
    },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: "#050816" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back to Blog */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors text-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold tracking-wide uppercase">
            AI Architecture Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Local LLMs
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Privacy
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Local Models vs Cloud Models for QA Work: Privacy, Quality and Convenience
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Before you argue about which model is best, settle a quieter question: where is your data allowed to travel?
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 20, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Architecture
          </span>
        </div>

        {/* Table of Contents */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-14">
          <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">Table of Contents</p>
          <ol className="space-y-2.5">
            {toc.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 text-white/70 hover:text-orange-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-orange-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "The question isn't 'which model is smartest?' It's 'where is this data allowed to go?'"
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every QA team that adopts AI eventually has the same argument. One person wants to run a model on their
            laptop so nothing leaves the building. Another points out that the hosted assistants are more capable and
            take five minutes to set up. A third has already been pasting logs into a chat window for months and is
            quietly hoping nobody asks.
          </p>
          <p>
            All three are reasoning about the wrong thing first. The choice between a local model, a self-hosted one
            and a vendor's cloud service is not mainly a question of intelligence or convenience. It is a question of
            data: what goes into the prompt, who is allowed to see it, and what your organization has agreed to. Once
            that is clear, the rest of the decision becomes surprisingly mechanical. This article walks through a
            framework I find useful, with qualitative trade-offs rather than rankings, because model capabilities and
            offerings change faster than any blog post can keep up with.
          </p>
        </div>

        {/* Section 1 */}
        <section id="data-first" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Data Question Comes First</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Start by looking at what actually goes into your prompts, not at the tools. QA work touches an unusual
              range of material in a single day: public documentation, internal test plans, unreleased feature specs,
              source code, application logs, database snapshots and, sometimes, records that belong to real customers.
              Treating all of that as one category is how teams end up either banning AI entirely or using it
              carelessly.
            </p>
            <p>
              Most organizations already have a data classification scheme, even if nobody in QA has read it
              recently. The labels vary, but they usually look something like this:
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {dataClasses.map((d) => (
              <div key={d.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <p className={"font-semibold text-sm " + d.color}>{d.name}</p>
                  <p className="text-white/50 text-xs">{d.example}</p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={"h-full rounded-full " + d.bar} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The bar is a reminder that sensitivity increases as you go down the list, and so do the restrictions on
              where that material may go. Public content can go almost anywhere. Regulated data may have legal limits on
              where it is stored and processed, and those limits apply to an AI prompt exactly as they apply to an email
              attachment or a spreadsheet upload.
            </p>
            <p>
              The practical step is simple: for each AI task your team does regularly, write down the highest
              classification of data it touches. That single label will narrow your options more than any feature
              comparison.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="what-local-means" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Laptop className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What "Local" Means</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Laptop className="w-6 h-6 text-orange-300 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">Local</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A model runs on your own laptop or workstation. Prompts and outputs never leave the machine.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Server className="w-6 h-6 text-orange-300 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">Self-hosted</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A model runs on servers your organization controls, shared by the team through an internal service.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Cloud className="w-6 h-6 text-orange-300 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">Vendor cloud</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A provider hosts the model. You send prompts over the internet through an app or an API.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              When people say "local model", they usually mean an open-weight model: one whose trained parameters are
              published so that anyone can download and run it, subject to its licence. You load it with a runtime
              tool on your own hardware and talk to it much as you would talk to a hosted assistant. The defining
              feature is not the model itself but the location. The computation happens somewhere you control.
            </p>
            <p>
              Self-hosting is the same idea at team scale. Rather than every tester running a model on their own
              machine, a platform or infrastructure team runs one or more models on company servers or in a private
              cloud account, and people reach it through an internal endpoint. Data stays inside the organization's
              boundary, and the setup work is done once instead of once per laptop.
            </p>
            <p>
              Vendor cloud is what most people picture when they think of AI assistants: a chat app or API run by a
              provider. Some providers offer business plans with different data handling commitments from their
              consumer apps, and some are available through cloud platforms your organization may already use. That
              is why "cloud" is not a single risk level. The same model can be acceptable under one agreement and
              unacceptable under another.
            </p>
            <p>
              It is also worth saying that the boundaries blur. A self-hosted deployment in a company's private cloud
              account is still "cloud" in the infrastructure sense, but it sits inside your control boundary. What
              matters for this decision is not where the server physically lives, but who controls it and what the
              agreements say about your data.
            </p>
          </div>
        </section>

        {/* Section 3 — Decision table */}
        <section id="trade-offs" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Trade-Offs</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is how the three options compare across the factors that matter for a QA team. The ratings are
            qualitative and deliberately general. Green means the option is usually comfortable on that factor, amber
            means it depends, and red means it usually takes real effort or is a poor fit.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-orange-500/25 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-500/10 text-orange-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-semibold">Local</th>
                  <th className="text-left px-4 py-3 font-semibold">Self-hosted</th>
                  <th className="text-left px-4 py-3 font-semibold">Vendor cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r) => (
                  <tr key={r.factor}>
                    <td className="px-4 py-3 text-white font-medium align-top whitespace-nowrap">{r.factor}</td>
                    {r.cells.map((c, i) => (
                      <td key={i} className="px-4 py-3 align-top">
                        <span className={"inline-block px-2.5 py-1 rounded-lg text-xs leading-snug " + chipClass[c.rating]}>
                          {c.label}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-6">
            <span className={"px-2 py-0.5 rounded-lg " + chipClass.good}>usually comfortable</span>
            <span className={"px-2 py-0.5 rounded-lg " + chipClass.mixed}>depends</span>
            <span className={"px-2 py-0.5 rounded-lg " + chipClass.hard}>real effort or poor fit</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              <span className="text-white font-medium">Privacy control versus capability.</span> This is the central
              tension. The more control you keep over where data goes, the more you are limited to models you can run
              yourself. Models that fit on ordinary hardware can be very useful for summarizing, reformatting and
              simple drafting, but the most capable hosted options are often better at harder reasoning and long,
              messy inputs. That gap shifts over time, so test it yourself on your own tasks rather than trusting a
              general claim, including this one.
            </p>
            <p>
              <span className="text-white font-medium">Setup and maintenance.</span> A cloud tool takes minutes. A local
              model takes an afternoon of installing, downloading and experimenting, then occasional updates. A
              self-hosted service is a real system that needs an owner, monitoring, access control and upgrades. Do not
              let a QA team quietly become the operator of an internal AI platform without agreeing that it is their
              job.
            </p>
            <p>
              <span className="text-white font-medium">Cost patterns.</span> The shapes differ more than the totals. Cloud
              services are usually billed per use, so cost grows with adoption and can surprise you. Local models use
              hardware you already have, but they compete with everything else running on that machine. Self-hosting
              moves cost to infrastructure and people, which is predictable but not small.
            </p>
            <p>
              <span className="text-white font-medium">Offline use.</span> For testers working in restricted networks,
              on air-gapped test environments or simply on a train, a local model is the only option that keeps
              working. That is a niche need for most teams and a hard requirement for a few.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="qa-tasks" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Typical QA Tasks and Where They Fit</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Abstract trade-offs become clearer when you map them to the work you actually do. Here is how I would think
            about common QA tasks. Treat it as a starting point for your own list, not a rule book; your
            organization's policy always overrides it.
          </p>

          <div className="space-y-3 mb-6">
            {tasks.map((t) => (
              <div key={t.task} className="grid md:grid-cols-3 gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold text-sm">{t.task}</p>
                <p className="text-orange-300 text-sm font-medium">{t.fit}</p>
                <p className="text-white/60 text-sm leading-relaxed">{t.note}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The pattern is that the task rarely decides the answer on its own. The data inside the task does. "Summarize
              this log" is harmless with a sanitized log from a test environment and risky with a raw production log full
              of session tokens. That is why your team's guidance should be phrased in terms of data, with tasks as
              examples, rather than as a list of allowed and banned activities.
            </p>
            <p>
              One more observation: the highest-value tasks for capable cloud models are often the ones with the least
              sensitive input. Drafting test ideas from a feature description, explaining an unfamiliar framework or
              critiquing a test design involve very little company data and benefit most from strong reasoning. Keeping
              those in the cloud and the data-heavy tasks inside is a natural split.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="policy" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Policy Beats Preference</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Everything above is useful for forming an opinion. None of it is permission. If your organization has an
              AI usage policy, an approved tools list or a data handling standard, that is the starting point, and
              your preferences fit inside it.
            </p>
            <p>
              That cuts both ways. A tester who installs an unapproved local tool to process customer data has not
              solved a privacy problem just because the data stayed on the laptop. Laptops get lost, local tools may
              have their own telemetry, and many policies restrict where certain data may be copied at all. Likewise,
              a team that avoids an approved cloud tool out of vague worry may be giving up real value that the
              organization has already reviewed and accepted.
            </p>
            <p>
              For cloud services in particular, the terms matter as much as the technology. Before relying on one,
              someone should read and understand what the provider says about how prompts and outputs are stored,
              how long they are kept, whether they can be used to improve models, and which settings or plans change
              that. Those details differ between providers and between plans of the same provider, and they change.
              That review is usually a job for your security, privacy or legal colleagues, but QA should know the
              answers for the tools it uses.
            </p>
          </div>

          <div className="border border-red-500/30 bg-red-500/10 rounded-2xl p-6">
            <p className="text-red-200 font-semibold mb-1">If there is no policy yet</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Do not invent one alone, and do not treat silence as approval. Write down what your team would like to
              do, which data each use touches and which tools you would use, and take it to whoever owns security or
              data protection. A one-page proposal gets a faster, better answer than a vague question.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="sanitize" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Eraser className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Sanitize Regardless</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Whichever option you choose, sanitizing input reduces risk. Even a fully local model writes history
              files, and outputs get copied into tickets, chats and documents that travel further than the original
              prompt. The less sensitive material goes in, the less can come out in the wrong place.
            </p>
            <p>
              Two techniques do most of the work. <span className="text-white font-medium">Redaction</span> removes or
              masks the dangerous parts of real material: tokens, passwords, connection strings, email addresses,
              names, account numbers, internal hostnames. Build it into a small script that sits between your logs and
              the prompt, so it happens every time instead of whenever someone remembers.{" "}
              <span className="text-white font-medium">Synthetic data</span> avoids the problem entirely by generating
              realistic but fake records for examples, test inputs and reproductions.
            </p>
            <p>
              Be honest about the limits. Redaction scripts miss patterns they were not written for, and a log can
              reveal sensitive context even with every name removed. Sanitizing lowers the classification of what you
              send; it does not automatically make regulated data public. Check what your policy says about sanitized
              derivatives before you assume they are fair game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
              <p className="text-orange-200 font-semibold text-sm mb-3">Redact before sending</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Tokens, keys and passwords</li>
                <li>Emails, names and phone numbers</li>
                <li>Account, order and customer ids</li>
                <li>Internal hostnames and IP addresses</li>
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
              <p className="text-orange-200 font-semibold text-sm mb-3">Prefer synthetic when you can</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Example records for prompts</li>
                <li>Reproduction data for bug reports</li>
                <li>Edge-case inputs for test ideas</li>
                <li>Demo datasets for training others</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7 — Decision tree */}
        <section id="hybrid" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Pragmatic Hybrid</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              In practice, most teams I would advise end up with a hybrid rather than a single answer. Sensitive
              material stays local or self-hosted. General tasks use an approved cloud service. The important part is
              not the split itself but writing it down so that every tester makes the same call on a busy afternoon.
              This decision tree is the shape I would start from:
            </p>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 mb-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-full md:w-2/3 bg-orange-500/15 border border-orange-500/40 rounded-xl p-4 text-center">
                <p className="text-white font-semibold text-sm">Does the prompt contain confidential or regulated data?</p>
              </div>
              <ArrowDown className="w-5 h-5 text-orange-400/70" />
              <div className="grid md:grid-cols-2 gap-4 w-full">
                <div className="space-y-3">
                  <p className="text-center text-xs uppercase tracking-widest text-red-300 font-semibold">Yes</p>
                  <div className="bg-white/5 border border-white/15 rounded-xl p-4 text-center">
                    <p className="text-white text-sm font-semibold">Would a sanitized or synthetic version do the job?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-500/10 border border-green-500/25 rounded-lg p-3 text-center">
                      <p className="text-green-300 text-xs font-semibold mb-1">Yes</p>
                      <p className="text-white/70 text-xs">Sanitize, then use an approved tool for that level</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/25 rounded-lg p-3 text-center">
                      <p className="text-red-300 text-xs font-semibold mb-1">No</p>
                      <p className="text-white/70 text-xs">Approved local or self-hosted only, or don't use AI</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-center text-xs uppercase tracking-widest text-green-300 font-semibold">No</p>
                  <div className="bg-white/5 border border-white/15 rounded-xl p-4 text-center">
                    <p className="text-white text-sm font-semibold">Is an approved cloud tool available and allowed for this data?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-500/10 border border-green-500/25 rounded-lg p-3 text-center">
                      <p className="text-green-300 text-xs font-semibold mb-1">Yes</p>
                      <p className="text-white/70 text-xs">Use it; offline need aside, this is the easy path</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/25 rounded-lg p-3 text-center">
                      <p className="text-amber-300 text-xs font-semibold mb-1">No</p>
                      <p className="text-white/70 text-xs">Use local or self-hosted, and ask for a review</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs text-center mt-6">
              Every branch sits inside your organization's policy. When in doubt, the answer is "ask", not "try".
            </p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Turn the tree into a short written guide: which tools are approved, for which data classes, with which
              settings, and who to ask when a case does not fit. Keep it to a page. Review it whenever a new tool is
              adopted, a policy changes or someone hits a case the guide did not cover. The guide is more valuable than
              any individual tool choice, because it survives tool changes.
            </p>
            <p>
              A hybrid also lets you compare honestly. When the same sanitized task can run on a local model and on an
              approved cloud model, you can see for yourself whether the difference in output matters for that task. For
              some jobs you will find the local option is good enough and keep everything inside. For others the gap will
              justify the cloud. Either way, you are deciding from your own evidence.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Local versus cloud is a real trade-off, but it is rarely the first decision. The first decision is about
              data: what goes into the prompt and where that data is allowed to go. Once each task has a data label,
              most of the choice falls out. Highly sensitive material stays inside, on a local or self-hosted model or
              not in AI at all. Public and sanitized material can use whatever approved tool does the job best.
            </p>
            <p>
              Around that core sit the practical habits: follow policy rather than preference, read the terms of any
              cloud service you rely on, sanitize input regardless of where it runs, and write the rules down so the
              whole team makes the same call. None of that is glamorous, and all of it matters more than which model
              topped this month's discussion.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-orange-200 text-lg font-semibold">
              Choose the setup you can explain to your security team in one paragraph.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Deciding where your team's AI should run?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about data classification, approved tools and a hybrid setup your security team can sign off on.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </button>
            <button
              onClick={() => window.open("https://github.com/JaydeepAI", "_blank")}
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> See My Projects
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/30 text-xs pt-8 border-t border-white/10">
          © 2026 Jaydeep Patel · Digital Jaydeep. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default LocalVsCloudModelsBlog;
