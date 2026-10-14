import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  EyeOff,
  FileText,
  Scale,
  Timer,
  WandSparkles,
  Search,
  MessageSquare,
  CircleCheck,
  CircleX,
} from "lucide-react";

/**
 * Blog: Jira + AI: Writing Bug Reports Developers Actually Act On
 * Slug: /blog/writing-bug-reports-developers-act-on
 * Category: QA & Test Automation
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

const JiraBugReportsBlog = () => {
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
    title: "Jira + AI: Writing Bug Reports Developers Actually Act On | Digital Jaydeep",
    description:
      "A good bug report is a reproducible story with evidence. AI can tidy your notes into a clear template, as long as it never invents a step you did not take. A practical guide to titles, steps, severity vs priority, duplicates and tone.",
    keywords:
      "bug reports, Jira, bug report template, severity vs priority, QA communication, AI for QA, defect reporting",
    canonicalUrl: "https://jaydeepai.github.io/blog/writing-bug-reports-developers-act-on",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Jira + AI: Writing Bug Reports Developers Actually Act On",
      datePublished: "2026-11-05",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-ignored", label: "Why Good Bugs Get Ignored" },
    { id: "anatomy", label: "Anatomy of a Strong Report" },
    { id: "severity-priority", label: "Severity vs Priority: Two Questions, Two Owners" },
    { id: "five-minute-test", label: "The Five-Minute Reproduction Test" },
    { id: "ai-editor", label: "Using AI as an Editor, Not an Author" },
    { id: "duplicates", label: "Search Before You File" },
    { id: "tone", label: "Tone: Describe the System, Not the Person" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const bugTemplate = `Title:    [Area] What breaks, under which condition
          e.g. [Checkout] Discount code is ignored when cart contains a gift card

Environment
  Build / version:   <exact build you tested>
  Environment:       <test / staging / local>
  Browser / device:  <name and version, OS>
  User / role:       <role and relevant permissions; never a real password>
  Test data:         <order id, account type, feature flags>

Preconditions
  - <state that must exist before step 1>

Steps to reproduce
  1. <one action per line, in the order you did it>
  2. ...
  3. ...

Expected result
  <what should happen, and where that expectation comes from:
   ticket, spec, previous behavior>

Actual result
  <what happened, quoted exactly; error text copied, not paraphrased>

Reproducibility
  <always / intermittent (how often you saw it) / once>

Evidence
  - Screenshot or short recording
  - Console / network error (relevant lines only)
  - Log excerpt with timestamp

Impact
  <who is affected and what they cannot do>

Severity:  <set by reporter>     Priority: <set by triage / product>
Related:   <linked issues, the change that may have caused it>`;

  const aiPrompt = `You are editing a bug report. You are an editor, not a witness.

Rewrite my rough notes below into the bug template that follows.

Rules:
- Use ONLY facts present in my notes. Do not add steps, results,
  error messages, versions or environment details I did not write.
- If a template field is missing from my notes, write "MISSING"
  and list it under "Questions for the reporter".
- Keep my wording for error messages exactly as written.
- Propose 2 alternative titles: specific, under 90 characters,
  describing behavior, not blame.
- Neutral tone. No guesses about the cause.

Template:
<paste template>

My notes:
<paste redacted notes>`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Bug Reports
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Jira
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Jira + AI: Writing Bug Reports Developers Actually Act On
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Finding the bug is half the job. Getting someone to fix it is the other half, and that half is mostly
          writing.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 5, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> QA &amp; Test Automation
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
                  className="flex items-center gap-3 text-white/70 hover:text-green-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-green-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "The best bug report is the one a developer can reproduce before finishing their coffee."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every QA engineer has watched a real defect sit in the backlog for weeks while a trivial cosmetic issue
            gets fixed the same afternoon. It is tempting to blame priorities, or developers, or the sprint process.
            Sometimes that is fair. More often, if you look honestly at the two tickets side by side, the difference is
            the report itself. One was easy to act on. The other was a puzzle.
          </p>
          <p>
            A bug report is not a note to yourself. It is a request for someone else&apos;s time, written for a reader
            who was not there when you saw the problem. AI tools can now help you write that request faster and more
            cleanly, and I use them for exactly that. But there is a line they must never cross: an AI may edit your
            report, it may never testify in it. This article covers what a strong report looks like, how to use AI as
            an editor, and the habits that make developers pick your tickets first.
          </p>
        </div>

        {/* Section 1 */}
        <section id="why-ignored" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Good Bugs Get Ignored</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A developer opening a ticket is doing a quick cost estimate. How long will it take me to even see this
              happen? If the answer is "I have no idea", the ticket loses to anything with a clearer path. That is not
              laziness. It is the same triage instinct testers use every day when deciding what to explore first.
            </p>
            <p>
              Most ignored bugs fail that estimate in one of four predictable ways.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            {[
              {
                title: "Missing steps",
                desc: "The report jumps from \"logged in\" to \"the total is wrong\". Everything in between, the data, the clicks, the order of actions, lives only in the reporter's head.",
              },
              {
                title: "Vague titles",
                desc: "\"Checkout broken\" or \"Error on save\" tells the reader nothing about where, when or how badly. Vague titles also make the bug impossible to find later.",
              },
              {
                title: "No evidence",
                desc: "No screenshot, no error text, no log line, no timestamp. The developer has to trust a description of something they cannot see.",
              },
              {
                title: "Blame in the tone",
                desc: "\"Someone obviously didn't test this.\" A defensive reader spends energy on the tone instead of the defect, and the ticket quietly drifts down the list.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-green-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice that none of these are about the bug being unimportant. They are all about friction. A report is
              ignored when the effort of understanding it is higher than the effort of doing something else. Your job
              as the reporter is to make that effort as close to zero as you can.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="anatomy" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Anatomy of a Strong Report</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              A strong report reads like a short, reproducible story with evidence attached. It has a specific title,
              the environment it happened in, numbered steps, a clear contrast between expected and actual, proof, an
              honest statement of impact, and a severity the reporter can defend. Nothing more, nothing less.
            </p>
            <p>
              The easiest way to see the difference is to put two reports for the same defect next to each other.
            </p>
          </div>

          {/* Signature visual: bad vs good */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleX className="w-5 h-5 text-red-400" />
                <p className="text-xs uppercase tracking-wide text-red-300 font-semibold">Gets ignored</p>
              </div>
              <p className="text-white font-semibold text-sm mb-3">Discount not working!!</p>
              <div className="space-y-2 text-sm text-white/60 leading-relaxed">
                <p>Tried a discount at checkout and it didn&apos;t apply. This is a big problem, customers will be
                  angry. Pretty sure this worked before the last release, someone must have broken it.</p>
                <p>Please fix ASAP.</p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-xs text-red-200/70">
                <p>No environment or build</p>
                <p>No steps or data</p>
                <p>No expected vs actual</p>
                <p>No evidence, guessed cause, blame</p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleCheck className="w-5 h-5 text-green-400" />
                <p className="text-xs uppercase tracking-wide text-green-300 font-semibold">Gets fixed</p>
              </div>
              <p className="text-white font-semibold text-sm mb-3">
                [Checkout] Discount code ignored when cart contains a gift card
              </p>
              <div className="space-y-2 text-sm text-white/70 leading-relaxed">
                <p><span className="text-green-300">Env:</span> staging, latest build, Chrome on Windows, standard
                  customer account.</p>
                <p><span className="text-green-300">Steps:</span> 1. Add any physical product. 2. Add a gift card.
                  3. Apply a valid percentage discount code. 4. View order summary.</p>
                <p><span className="text-green-300">Expected:</span> discount applies to the physical product (pricing
                  rule in the linked story).</p>
                <p><span className="text-green-300">Actual:</span> code shows "applied", total unchanged.</p>
                <p><span className="text-green-300">Repro:</span> every time with a gift card; never without one.</p>
                <p><span className="text-green-300">Evidence:</span> recording, network response attached.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The good version is not longer because it is padded. It is longer because every line removes a question
              the developer would otherwise have to ask. Look at what the title does in particular: it names the area,
              the broken behavior and the condition. The condition is the most valuable part. "Only when the cart
              contains a gift card" has already done half the debugging.
            </p>
            <p>
              Also notice what the good report does not do. It does not guess at the cause. "Someone must have broken
              it in the last release" is a hypothesis, and unless you have evidence, it belongs in a comment, clearly
              labeled as a guess, not in the body of the report. Facts go in the report. Theories go in the thread.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="severity-priority" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Severity vs Priority: Two Questions, Two Owners</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Severity and priority get mixed up constantly, and the confusion causes real arguments. They answer
              different questions, and in most healthy teams they are owned by different people.
            </p>
            <p>
              <span className="text-white font-medium">Severity</span> is about the defect: how badly does it damage
              the system or the user when it happens? The tester is usually best placed to judge this, because they
              saw it. <span className="text-white font-medium">Priority</span> is about the business: how soon should
              it be fixed, given everything else competing for the same people? That is a call for whoever owns the
              backlog, usually a product owner or a triage group, because it depends on context the tester may not
              have.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Example</th>
                  <th className="text-left px-5 py-3 font-semibold">Severity</th>
                  <th className="text-left px-5 py-3 font-semibold">Priority</th>
                  <th className="text-left px-5 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white/80">Crash in an admin report used once a year</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span></td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">Low</span></td>
                  <td className="px-5 py-3 text-white/50">Serious failure, but nobody needs it this month</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Company name misspelled on the login page</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">Low</span></td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span></td>
                  <td className="px-5 py-3 text-white/50">Harmless functionally, visible to every user</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Payments fail for one card type</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span></td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span></td>
                  <td className="px-5 py-3 text-white/50">Damaging and urgent</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Tooltip slightly misaligned</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">Low</span></td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">Low</span></td>
                  <td className="px-5 py-3 text-white/50">Fix when someone is nearby</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The practical rule I follow: set severity honestly, write the impact in plain words, and let the priority
              owner decide. If you inflate severity to jump the queue, you will win once and lose credibility for the
              rest of the release. Teams learn quickly whose "critical" means critical.
            </p>
            <p>
              The impact line is where you earn influence over priority without overstepping. "Any customer who buys a
              gift card together with another product cannot use a discount code" is a sentence a product owner can
              act on. "This is a big problem" is not.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="five-minute-test" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Timer className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Five-Minute Reproduction Test</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Before I press "Create", I run one mental check: could a developer who has never seen this screen
              reproduce the problem within about five minutes, using only what is written in the ticket? The exact
              number does not matter. What matters is imagining a specific reader with no context and walking through
              the report as them.
            </p>
            <p>
              Even better, do it for real. Follow your own steps, literally, from a fresh session. It is surprising how
              often the steps you wrote are not the steps you took. You forgot that you were already logged in as an
              admin, or that a feature flag was on, or that the cart had something in it from earlier. Those hidden
              preconditions are exactly what makes a bug "unreproducible" on someone else&apos;s machine.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              "Start from a clean session or a fresh account, not the one you have been testing in all day.",
              "Follow the steps exactly as written. If you have to improvise, the steps are incomplete.",
              "Note every precondition you rely on: role, flags, data, locale, time-sensitive state.",
              "Reduce the steps to the minimum that still reproduces the problem.",
              "Record how often it happens. \"Always\" and \"twice out of many attempts\" lead to very different investigations.",
            ].map((item, i) => (
              <div key={item} className="flex items-start gap-4 bg-green-500/5 border border-green-500/15 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-green-500/20 text-green-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Minimizing the steps is the underrated part. A twelve-step reproduction with three irrelevant detours
              forces the developer to do the minimization themselves. If you can show that the bug needs only a gift
              card plus a discount code, you have handed them the boundary of the problem.
            </p>
            <p>
              Intermittent bugs deserve honesty rather than silence. If you saw it a couple of times and could not make
              it happen on demand, say so, and attach whatever evidence you captured at the moment it happened. A
              truthful "intermittent, here is the log from the time it failed" is far more useful than a confident set
              of steps that do not actually reproduce it.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="ai-editor" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <WandSparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Using AI as an Editor, Not an Author</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is where AI earns a place in the workflow. Most testers do not struggle to find bugs; they struggle
              to turn rushed notes, typed between test runs, into something tidy. A language model is very good at
              exactly that transformation. Give it your rough notes and a template, and it will return a structured
              report with a sharper title and consistent formatting.
            </p>
            <p>
              The risk is equally clear. Models are trained to produce plausible, complete-looking text. If your notes
              have a gap, the model may fill it with something that sounds right: a browser version, a step you
              "probably" took, an error message that looks like the kind of error that would appear. A plausible
              invented step is worse than a missing one, because nobody knows to question it. A developer who follows
              an invented step and cannot reproduce the bug will reasonably conclude the bug is not real.
            </p>
            <p>
              So the rule is simple: the AI may restructure, tighten and flag gaps. It may never add facts. Every step,
              result, version and environment detail must come from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-green-300 font-semibold mb-3">AI may</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Map rough notes onto the template</li>
                <li>Propose clearer, more specific titles</li>
                <li>Point out missing fields as questions</li>
                <li>Neutralize tone and remove guesses</li>
                <li>Shorten long, rambling steps</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-red-300 font-semibold mb-3">AI may never</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Add a step you did not take</li>
                <li>Invent an error message or result</li>
                <li>Fill in versions, browsers or environments</li>
                <li>Decide the severity for you</li>
                <li>Diagnose the cause as if it were fact</li>
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            Here is the template I recommend keeping in your team&apos;s wiki or Jira issue template. It is generic
            and illustrative; adapt the fields to your own tracker.
          </p>

          <div className="bg-black/40 border border-green-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-green-300/70 font-mono">
              bug-report-template.txt — copy-ready, illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-green-100/90 font-mono">
              <code>{bugTemplate}</code>
            </pre>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            And here is a prompt that keeps the model in the editor&apos;s chair. The important lines are the ones
            that tell it what to do when information is missing.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              editor-prompt.txt — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-purple-100/90 font-mono">
              <code>{aiPrompt}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two habits make this safe. First, redact before you paste: tokens, passwords, customer names, real
              account details and internal hostnames have no business in a prompt, and only use AI tools your
              organization has approved for work data. Second, read the output line by line against your notes before
              filing. If a detail appears that you did not write, delete it. That review takes a minute, and it is the
              whole difference between an editor and a ghostwriter.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="duplicates" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Search Before You File</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Duplicate tickets are a quiet tax on everyone. They split the discussion across two places, they make
              the backlog look bigger than it is, and they make the reporter look like they did not check. Searching
              first takes a couple of minutes and saves considerably more for the people downstream.
            </p>
            <p>
              Search by the behavior, not by your own wording. Someone else may have called the same problem "promo
              code", "coupon" or "voucher". Search by the component, by the error text, and by recently closed issues,
              because a "fixed" bug that has come back is a regression and deserves to be linked to its history.
            </p>
            <p>
              When you find something close but not identical, do not silently file a new ticket and do not silently
              skip it. Link them. A comment on the existing issue with your new condition ("also happens with gift
              cards") can be worth more than a fresh ticket. If it is genuinely different, file it and reference the
              related one so the developer sees the pattern.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">Where AI helps here: </span>
              if your tracker or tooling lets you, a model can compare your draft against a list of open issue
              summaries and suggest possible duplicates. Treat the suggestions as leads to check, not as a verdict. Two
              tickets that sound similar can describe completely different defects.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="tone" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tone: Describe the System, Not the Person</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Bug reports are read by people who wrote the code. Even a perfectly reproducible report can land badly
              if it reads like an accusation. The fix is a simple grammatical habit: make the system the subject of
              every sentence. "The total does not update" instead of "you forgot to update the total". "The page
              returns an error" instead of "this was clearly never tested".
            </p>
            <p>
              Neutral tone is not about being soft. It is about keeping the reader&apos;s attention on the defect. A
              developer who feels attacked will, quite naturally, look for reasons the report is wrong. A developer who
              reads a calm, factual description will look for the bug.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Instead of</th>
                  <th className="text-left px-5 py-3 font-semibold">Write</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-red-200/70">"Who broke checkout again?"</td>
                  <td className="px-5 py-3 text-green-200/90">"Checkout returns an error when the cart contains a gift card."</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-200/70">"Obviously nobody tested this."</td>
                  <td className="px-5 py-3 text-green-200/90">"Not covered by existing regression; suggest adding a case."</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-200/70">"This is a disaster, fix ASAP!!!"</td>
                  <td className="px-5 py-3 text-green-200/90">"Impact: affected customers cannot complete payment."</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-200/70">"Works on my machine, so it&apos;s your environment."</td>
                  <td className="px-5 py-3 text-green-200/90">"Reproduced on staging; not reproduced locally. Env details attached."</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            This is one more place where an AI editor is useful: ask it to flag any sentence that assigns blame or
            speculates about the cause. It is easier to spot emotional wording in your own report when something else
            points at it.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I&apos;ve Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Bug reporting is one of the most visible things a tester produces, and one of the least taught. The good
              news is that it is a learnable skill with a clear shape: a specific title, a minimal set of steps, the
              expected result with its source, the actual result quoted exactly, evidence, honest impact, and a calm
              tone.
            </p>
            <p>
              AI makes that shape cheaper to produce. It can turn a scrappy note into a clean template in seconds and
              tell you which fields you forgot. What it cannot do is witness the bug. The steps, the results and the
              environment are your testimony, and the value of the report depends on every word of that testimony
              being true.
            </p>
            <p>
              Try one thing this week: take the last three bugs you filed and run the five-minute reproduction test on
              them as if you were a developer seeing them for the first time. Whatever you have to guess at is what
              your next report should include.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-green-200 text-lg font-semibold">
              A clear bug report is a gift of time to someone you work with.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Want defect reports your developers trust?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let&apos;s talk about QA workflows where AI speeds up the writing and humans keep the facts honest.
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

export default JiraBugReportsBlog;
