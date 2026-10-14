import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  ScrollText,
  Sprout,
  Library,
  Bot,
  Users,
  ChartColumn,
  TriangleAlert,
  Lock,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Where I'd Use AI in a QA Team of Five: A Practical Adoption Plan
 * Slug: /blog/where-id-use-ai-in-a-qa-team-of-five
 * Category: AI Strategy
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

const AIInQATeamOfFiveBlog = () => {
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
    title: "Where I'd Use AI in a QA Team of Five: A Practical Adoption Plan | Digital Jaydeep",
    description:
      "A phased, low-drama 90-day plan for bringing AI into a small QA team: ground rules first, safe wins next, shared assets after, guarded automation last. Includes roles, what to measure, and the pitfalls to avoid.",
    keywords:
      "AI adoption, QA team, AI roadmap, test automation AI, AI governance, prompt library, QA leadership, small team AI",
    canonicalUrl: "https://jaydeepai.github.io/blog/where-id-use-ai-in-a-qa-team-of-five",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Where I'd Use AI in a QA Team of Five: A Practical Adoption Plan",
      datePublished: "2026-11-08",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "ground-rules", label: "Start With Ground Rules" },
    { id: "phase-1", label: "Phase 1 (Days 1-30): Low-Risk Wins" },
    { id: "phase-2", label: "Phase 2 (Days 31-60): Shared Assets" },
    { id: "phase-3", label: "Phase 3 (Days 61-90): Guarded Automation" },
    { id: "roles", label: "Roles: Who Owns What" },
    { id: "measure", label: "What to Measure" },
    { id: "pitfalls", label: "Pitfalls to Avoid" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const phases = [
    {
      days: "Days 1-30",
      name: "Low-risk wins",
      goal: "Everyone uses AI for drafting and summarizing, inside the rules.",
      actions: [
        "Draft test ideas from user stories",
        "Summarize failed runs and long logs",
        "Clean up bug reports from rough notes",
        "Help with documentation and test plans",
      ],
      done: "Each person can name one task where AI saves them effort and one where it failed them.",
    },
    {
      days: "Days 31-60",
      name: "Shared assets",
      goal: "Turn individual tricks into team assets that live in the repo.",
      actions: [
        "Prompt library in version control",
        "Project instructions file for coding assistants",
        "Review checklists for AI-assisted work",
        "Short team demo of what works",
      ],
      done: "A new teammate could use the library and checklists without asking anyone.",
    },
    {
      days: "Days 61-90",
      name: "Guarded automation",
      goal: "Automate one or two pieces of glue work with approval gates.",
      actions: [
        "One read-only workflow (e.g. a run digest)",
        "One small agent that drafts, never acts",
        "Approval gates and logs on everything",
        "Retro: keep, change or stop each one",
      ],
      done: "Every automation has an owner, a log someone reads, and an off switch.",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold tracking-wide uppercase">
            AI Strategy Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            QA Team
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            AI Adoption
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Where I&apos;d Use AI in a QA Team of Five: A Practical Adoption Plan
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          No big launch, no tool shopping spree. Rules first, small wins second, automation last, and a way to tell
          whether any of it is working.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 8, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 13 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Strategy
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
                  className="flex items-center gap-3 text-white/70 hover:text-pink-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-pink-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Adopt AI the way you'd adopt any powerful tool: with rules first and enthusiasm second."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            In most small QA teams, AI adoption has already happened, just not on purpose. One person uses a chat
            assistant to draft test cases. Another has a coding assistant in the IDE. A third avoids it entirely and
            quietly worries about it. Nobody has agreed what data is allowed in a prompt, nobody shares what works, and
            nobody knows whether any of it is helping. That is not adoption. It is drift.
          </p>
          <p>
            This article is the plan I would recommend for a QA team of about five people who want to move from drift
            to deliberate use. It is a hypothetical plan written from a practitioner&apos;s point of view, not a case
            study of a real team, so there are no results to report here. Instead, each phase ends with what "done"
            looks like and what to measure, so a team that follows it can produce its own evidence. The plan is
            phased over roughly ninety days, and the order matters more than the dates.
          </p>
        </div>

        {/* Signature visual: 90-day roadmap */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-4">The 90-day roadmap at a glance</p>
          <div className="grid md:grid-cols-3 gap-4">
            {phases.map((phase, i) => (
              <div key={phase.days} className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-pink-300/80">{phase.days}</span>
                  <span className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-200 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <p className="text-white font-semibold mb-2">{phase.name}</p>
                <p className="text-white/60 text-sm mb-4">
                  <span className="text-pink-300/90 font-medium">Goal: </span>
                  {phase.goal}
                </p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {phase.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-pink-500/20 pt-3">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <span className="text-pink-200 font-semibold">Done when: </span>
                    {phase.done}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-xs text-white/50 text-center">
            Phase 0 runs before all of this: ground rules agreed and written down.
          </div>
        </div>

        {/* Section 1 */}
        <section id="ground-rules" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start With Ground Rules</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The first week is not about AI at all. It is about agreeing three things in writing, short enough to fit
              on one page: what data may never go into a prompt, which tools are approved, and what must be reviewed by
              a human before it counts. Without these, every later step rests on individual judgment, and individual
              judgment varies most exactly when people are busy.
            </p>
            <p>
              Write the rules with the team, not for it. A team of five can do this in a single meeting. The people
              who are skeptical about AI are especially valuable here, because they will ask the questions the
              enthusiasts skip. If your organization already has an AI or data policy, start from it and translate it
              into concrete QA examples; do not invent a parallel set of rules.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-pink-500/10 border border-pink-500/25 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-pink-300" />
                <p className="text-pink-200 font-semibold text-sm">Never in a prompt</p>
              </div>
              <ul className="space-y-1.5 text-sm text-white/65">
                <li>Passwords, tokens, keys</li>
                <li>Customer or personal data</li>
                <li>Production data dumps</li>
                <li>Internal hostnames and URLs</li>
                <li>Anything under contract restrictions</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Approved tools</p>
              <p className="text-sm text-white/65 leading-relaxed">
                A short list of assistants the organization has cleared for work data, with the account type to use.
                Anything not on the list is for personal experiments with public or synthetic data only.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Review requirements</p>
              <p className="text-sm text-white/65 leading-relaxed">
                AI-assisted code goes through normal code review. AI-drafted bug reports are checked against your own
                notes. Nothing AI-generated is sent outside the team without a human reading it.
              </p>
            </div>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-pink-300 font-semibold">Before you start: </span>
              record a simple baseline of the things you want to improve, such as time spent on suite maintenance or
              how many failures go untriaged each week. Without a "before", nobody will be able to say honestly whether
              the "after" is better.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="phase-1" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Phase 1 (Days 1-30): Low-Risk Wins</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The first phase is deliberately boring. The goal is for every person on the team to use AI regularly for
              tasks where a mistake is cheap and easy to spot. Drafting and summarizing are ideal: the human is
              already in the loop by definition, because they read the draft before using it.
            </p>
            <p>
              Four kinds of work fit this phase well. Drafting test ideas from a user story, then pruning the list with
              your own risk judgment. Summarizing a failed test run or a long log into a short starting point for
              investigation. Turning rough bug notes into a clean report, without letting the tool add facts. And
              documentation help: test plans, onboarding notes, explanations of an unfamiliar part of the framework.
            </p>
            <p>
              Ask each person to keep a tiny log: what they tried, whether it helped, and where it went wrong. Not as
              surveillance, but because those notes are the raw material for Phase 2. The failures are as valuable as
              the successes. A prompt that confidently invented a log line is a lesson the whole team should hear.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Task</th>
                  <th className="text-left px-5 py-3 font-semibold">Why it is safe to start here</th>
                  <th className="text-left px-5 py-3 font-semibold">Watch out for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-rose-300 font-medium">Test idea drafts</td>
                  <td className="px-5 py-3 text-white/70">Output is a list a tester filters anyway</td>
                  <td className="px-5 py-3 text-white/50">Long lists that feel complete but miss the real risk</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-rose-300 font-medium">Failure summaries</td>
                  <td className="px-5 py-3 text-white/70">A starting point, verified against the real log</td>
                  <td className="px-5 py-3 text-white/50">Anchoring on the loudest error</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-rose-300 font-medium">Bug report cleanup</td>
                  <td className="px-5 py-3 text-white/70">Reporter checks every line against their notes</td>
                  <td className="px-5 py-3 text-white/50">Invented steps or environment details</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-rose-300 font-medium">Documentation</td>
                  <td className="px-5 py-3 text-white/70">Internal, reviewed, easy to correct</td>
                  <td className="px-5 py-3 text-white/50">Confident descriptions of how your system works</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section id="phase-2" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Library className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Phase 2 (Days 31-60): Shared Assets</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              By the end of the first month, each person will have found a few prompts and habits that work for them.
              Phase 2 turns those private tricks into team assets. This is the step most teams skip, and it is the one
              that makes the difference between five people using AI and a team using AI.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">A prompt library in the repo</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Store the prompts that worked as plain text files next to the test code, one per task: triage a
                failure, draft test ideas from a story, clean up a bug report, review a generated test. Changes go
                through pull requests like any other code, so improvements are visible and reviewable.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">A project instructions file</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Coding assistants work much better when they know your conventions. A short instructions file in the
                test repo, describing how tests are run, naming rules, the locator strategy, data rules and what not
                to touch, saves everyone from correcting the same mistakes repeatedly.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">Agreed review checklists</p>
              <p className="text-white/70 text-sm leading-relaxed">
                A short checklist for reviewing AI-assisted work: does each assertion trace to a requirement, has the
                test been seen to fail, are there fixed sleeps, are locators stable, did any invented detail slip in.
                The checklist turns review from a vague feeling into a repeatable step.
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            End the phase with a short team session where each person demonstrates one thing that works and one thing
            that failed. In a team of five, this is also where quieter or more skeptical members get a voice, and
            where the library gets its first real round of improvements.
          </p>
        </section>

        {/* Section 4 */}
        <section id="phase-3" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Phase 3 (Days 61-90): Guarded Automation</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Only now, with rules, shared prompts and review habits in place, does it make sense to let AI run
              without a person typing each request. The temptation is to start here, because automation is the
              exciting part. Starting here is how teams end up with an agent nobody trusts and nobody owns.
            </p>
            <p>
              Pick one or two pieces of glue work, the repetitive tasks around testing rather than testing itself. A
              nightly digest of test results posted to the team channel. A workflow that summarizes a failed build and
              suggests a likely category. A small agent that drafts a bug report from a failed run for a human to
              review. In every case, start read-only: the automation reads results and produces a draft or a message,
              but it does not change tickets, data or code.
            </p>
            <p>
              Add write actions only after the read-only version has run for a while and the owner trusts its output.
              Even then, put an approval gate in front of anything that changes state, and keep a log that someone
              actually reads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl p-5">
              <p className="text-fuchsia-300 font-semibold text-sm mb-3">Good first automations</p>
              <ul className="space-y-1.5 text-sm text-white/70">
                <li>Nightly run digest (read-only)</li>
                <li>Failed-build summary to chat</li>
                <li>Draft bug report for human review</li>
                <li>Release checklist reminders</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/80 font-semibold text-sm mb-3">Not in the first 90 days</p>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li>Auto-closing or reprioritizing tickets</li>
                <li>Changing test data or environments</li>
                <li>Merging generated code without review</li>
                <li>Anything touching production</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="roles" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Roles: Who Owns What</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              In a team of five, nobody can be a full-time "AI lead", and nobody should be. But shared things without
              owners decay. The rules go stale, the prompt library fills with half-working experiments, and the
              automation logs pile up unread. Assign light, named ownership and rotate it if that suits the team.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-pink-500/20 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-500/10 text-pink-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Role</th>
                  <th className="text-left px-5 py-3 font-semibold">Owns</th>
                  <th className="text-left px-5 py-3 font-semibold">Typical holder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-pink-300 font-medium">Rules owner</td>
                  <td className="px-5 py-3 text-white/70">The one-page ground rules; aligning with company policy; answering "is this allowed?"</td>
                  <td className="px-5 py-3 text-white/50">Team lead</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-pink-300 font-medium">Library maintainer</td>
                  <td className="px-5 py-3 text-white/70">Prompt library, instructions file, review checklists; merging improvements</td>
                  <td className="px-5 py-3 text-white/50">An engineer who enjoys tooling, rotated</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-pink-300 font-medium">Automation owner</td>
                  <td className="px-5 py-3 text-white/70">One named person per workflow or agent; reads its logs; holds the off switch</td>
                  <td className="px-5 py-3 text-white/50">Whoever built it</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-pink-300 font-medium">Everyone</td>
                  <td className="px-5 py-3 text-white/70">Following the rules, reviewing their own AI-assisted output, reporting failures</td>
                  <td className="px-5 py-3 text-white/50">The whole team</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            The last row is the important one. Accountability for AI-assisted work does not move to the tool or to the
            library maintainer. If a generated test is weak or a drafted report contains an invented step, the person
            who submitted it owns that, exactly as they would for work they wrote by hand.
          </p>
        </section>

        {/* Section 6 */}
        <section id="measure" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <ChartColumn className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Measure</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              "Everyone feels faster" is not a result. Feelings about AI tools are notoriously unreliable in both
              directions: enthusiasts overestimate the gain, skeptics overlook it. A small team does not need a
              dashboard, but it does need a handful of signals compared against the baseline it recorded before Phase
              1. Look at trends over weeks, not single data points.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Maintenance time",
                desc: "How much of the week goes into fixing broken tests and updating locators. If AI help is real, this should trend down or free time for new coverage.",
              },
              {
                title: "Review rejection rate",
                desc: "How often AI-assisted changes are sent back in review. Rising rejections mean people are trusting output too quickly.",
              },
              {
                title: "Escaped defects",
                desc: "Bugs found after release that testing should have caught. Speed that increases escapes is not a gain.",
              },
              {
                title: "Flake trend",
                desc: "Whether the suite is getting more or less stable. Generated tests with hidden timing problems show up here first.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-violet-500/5 border border-violet-500/15 rounded-2xl p-5">
                <p className="text-violet-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            Pair the numbers with a short monthly conversation: what did AI make easier, what did it make worse, what
            should we stop. The combination of a few measured trends and honest team feedback is far more useful than
            either on its own.
          </p>
        </section>

        {/* Section 7 */}
        <section id="pitfalls" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <TriangleAlert className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pitfalls to Avoid</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Most AI adoption problems in small teams are not technical. They are habits that creep in when nobody is
            watching for them. These five are the ones I would watch most closely.
          </p>

          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-500/30 rounded-2xl p-6 mb-6">
            <p className="text-pink-200 font-semibold mb-5">Pitfalls card</p>
            <div className="space-y-4">
              {[
                {
                  title: "Tool sprawl",
                  desc: "Every person uses a different assistant, plugin and workflow. Nothing is shared, nothing is reviewed, and the data rules become impossible to enforce. Fix: a short approved list and a reason required to add to it.",
                },
                {
                  title: "No review",
                  desc: "Generated tests and reports go straight in because they look professional. Fix: the review checklist from Phase 2, applied every time.",
                },
                {
                  title: "Over-trust",
                  desc: "People start believing confident output, especially summaries and root-cause guesses. Fix: verify against the source, every time, and celebrate catches of AI mistakes.",
                },
                {
                  title: "Skill atrophy",
                  desc: "Junior testers who always generate never learn to design tests or debug. Fix: some work is done by hand on purpose, and reviews ask \"why\" as well as \"what\".",
                },
                {
                  title: "Ignoring team concerns",
                  desc: "Worries about job security, quality or privacy are dismissed as resistance. Fix: put concerns on the agenda; they often point at real risks.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-pink-300/70 font-mono text-xs mt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <CircleCheck className="w-5 h-5 text-pink-300 mt-0.5 shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              A healthy sign at day 90: the team can point to tasks where it stopped using AI because it did not help.
              Deliberate adoption includes deliberate rejection.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I&apos;ve Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The order in this plan is the point. Rules before tools, because without them every later step depends
              on luck. Individual wins before shared assets, because you cannot standardize what nobody has tried.
              Shared assets before automation, because an agent is only as good as the prompts, conventions and review
              habits behind it.
            </p>
            <p>
              None of this requires a budget, a new platform or a dedicated role. It requires a team of five agreeing
              how they want to work, writing it down, and checking every month whether it is paying off. That is
              exactly the kind of discipline QA teams already bring to everything else.
            </p>
            <p>
              If you lead or work in a small QA team, the first step costs one meeting: agree what may never go into a
              prompt, and write it on a single page.
            </p>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-pink-200 text-lg font-semibold">
              A small team doesn&apos;t need more AI. It needs better habits with the AI it already has.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Bringing AI into your QA team?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let&apos;s talk about a calm, phased rollout with ground rules, shared assets and guardrails that hold.
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

export default AIInQATeamOfFiveBlog;
