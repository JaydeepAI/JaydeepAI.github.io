import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Puzzle,
  Layers,
  CircleHelp,
  RefreshCw,
  ListOrdered,
  ShieldAlert,
  Library,
  MessageSquare,
} from "lucide-react";

/**
 * Blog: Prompt Patterns Every QA Engineer Can Reuse
 * Slug: /blog/reusable-prompt-patterns-for-qa-engineers
 * Category: AI Builder
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

const ReusablePromptPatternsBlog = () => {
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
    title: "Prompt Patterns Every QA Engineer Can Reuse | Digital Jaydeep",
    description:
      "Six reusable prompt patterns that make AI genuinely useful for testing work: context-first, ask-me-questions, critique-then-rewrite, ranked hypotheses, negative-case generator and diff-only edits. Templates included, plus how to keep a shared prompt library in your repo.",
    keywords:
      "prompt engineering, prompt patterns, QA engineering, test automation, AI for testers, prompt templates, productivity",
    canonicalUrl: "https://jaydeepai.github.io/blog/reusable-prompt-patterns-for-qa-engineers",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Prompt Patterns Every QA Engineer Can Reuse",
      datePublished: "2026-11-02",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-patterns", label: "Why Patterns Beat Clever Prompts" },
    { id: "base-shape", label: "The Base Shape Every Pattern Builds On" },
    { id: "ask-questions", label: "Pattern 1: Ask Me Questions First" },
    { id: "critique-rewrite", label: "Pattern 2: Critique Then Rewrite" },
    { id: "ranked-hypotheses", label: "Pattern 3: Ranked Hypotheses" },
    { id: "three-more", label: "Patterns 4 to 6: Negative Cases, Diff-Only Edits, Explain Like a Reviewer" },
    { id: "shared-library", label: "Keep a Shared Library" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const baseShape = [
    { part: "Role", desc: "Who the model should act as", example: "Senior QA engineer reviewing a web checkout." },
    { part: "Context", desc: "What it cannot know on its own", example: "Stack, conventions, the requirement text." },
    { part: "Task", desc: "One clear job", example: "List boundary cases for the coupon field." },
    { part: "Constraints", desc: "What it must and must not do", example: "No invented requirements. Max 15 items." },
    { part: "Output format", desc: "The shape you want back", example: "Table: case, input, expected, reason." },
  ];

  const patterns = [
    {
      n: "01",
      name: "Ask me questions first",
      when: "The task is vague, or you suspect you have left out something important.",
      template:
        "Before you answer, list the questions you need answered to do this well. Ask them all at once, numbered. Do not start the task until I reply.",
    },
    {
      n: "02",
      name: "Critique then rewrite",
      when: "You have a draft (test case, bug report, plan) and want it better, not just different.",
      template:
        "First list the weaknesses of the draft below as bullets, most serious first. Then write a revised version that fixes them. Keep anything that is already correct.",
    },
    {
      n: "03",
      name: "Ranked hypotheses",
      when: "Debugging a failure or triaging an unclear result.",
      template:
        "Give 3 to 5 possible causes, ranked by likelihood. For each: the evidence from the input that supports it, and one cheap check to confirm or rule it out.",
    },
    {
      n: "04",
      name: "Negative-case generator",
      when: "You have the happy path and need what breaks it.",
      template:
        "For the feature below, list negative and edge cases grouped by: boundaries, invalid input, permissions, state and concurrency. Mark which ones the requirement does not answer.",
    },
    {
      n: "05",
      name: "Diff-only edits",
      when: "Asking for changes to existing code you care about.",
      template:
        "Change only what is needed for the task. Return a unified diff, nothing else. Do not rename, reformat or refactor unrelated code. Explain each hunk in one line after the diff.",
    },
    {
      n: "06",
      name: "Explain like a reviewer",
      when: "You inherited unfamiliar code, a test framework or a config.",
      template:
        "Explain this code as a reviewer would: what it does, what it assumes, what could go wrong, and what you would ask the author. Quote the lines you refer to.",
    },
  ];

  const libraryLayout = `# Illustrative layout — a prompt library living next to the tests

prompts/
  README.md                  # how to use, how to propose changes
  _base-shape.md             # role / context / task / constraints / format
  ask-questions-first.md
  critique-then-rewrite.md
  ranked-hypotheses.md       # used for failure triage
  negative-cases.md
  diff-only-edit.md
  explain-like-reviewer.md
  context/
    framework-conventions.md # page objects, naming, waits, locators
    data-rules.md            # what may never go into a prompt`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Prompt Engineering
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Productivity
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Prompt Patterns Every QA Engineer Can Reuse
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Stop hunting for magic words. Start reusing structures that already work, the way you reuse a good helper
          method.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 2, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Builder
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
                  className="flex items-center gap-3 text-white/70 hover:text-purple-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-purple-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "A good prompt is a small spec. Write it like one."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Most advice about prompting is either too vague ("be specific") or too magical ("add this one phrase and
            the model gets smarter"). Neither helps much on a Tuesday afternoon when a test is failing, a bug report
            needs writing and a new feature needs test ideas before standup.
          </p>
          <p>
            What helps is the same thing that helps in test automation: patterns. A small set of structures you
            recognize, reuse and improve over time. This article covers six I keep coming back to for testing work.
            None of them are secret and none of them are guaranteed. They are approaches that tend to produce more
            useful, more checkable output than a one-line request, and they get better the more your team shares and
            refines them.
          </p>
        </div>

        {/* Section 1 — Why patterns */}
        <section id="why-patterns" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Patterns Beat Clever Prompts</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A clever prompt is a one-off. Someone writes a brilliant paragraph that gets a great answer, pastes it
              in a chat, and it is gone. Next week a colleague faces the same problem and starts from scratch. The
              knowledge never compounds.
            </p>
            <p>
              A pattern is different. It names a situation ("I am debugging and I do not know the cause yet") and a
              structure that suits it ("ask for ranked hypotheses with evidence"). The specific words matter less than
              the shape. Because the shape is reusable, the output becomes more predictable, which means it becomes
              easier to review. And reviewability is the whole game when you use AI for quality work.
            </p>
            <p>
              Testers already think this way. We do not write every test from scratch; we use page objects, builders,
              data factories and naming conventions. We trust a structure because we have seen it work many times.
              Prompt patterns are the same idea applied to the instructions you give an assistant.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mt-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Aspect</th>
                  <th className="text-left px-5 py-3 font-semibold">Clever one-off prompt</th>
                  <th className="text-left px-5 py-3 font-semibold">Reusable pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Who can use it</td>
                  <td className="px-5 py-3 text-white/60">The person who wrote it</td>
                  <td className="px-5 py-3 text-purple-200">Anyone on the team</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Output shape</td>
                  <td className="px-5 py-3 text-white/60">Different every time</td>
                  <td className="px-5 py-3 text-purple-200">Consistent and easy to scan</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Improves over time</td>
                  <td className="px-5 py-3 text-white/60">Rarely; it is lost in chat history</td>
                  <td className="px-5 py-3 text-purple-200">Yes, through review and edits</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Easy to review</td>
                  <td className="px-5 py-3 text-white/60">Depends on luck</td>
                  <td className="px-5 py-3 text-purple-200">By design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2 — Base shape + signature grid */}
        <section id="base-shape" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Base Shape Every Pattern Builds On</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Every pattern in this article sits on top of the same five-part base. If you only take one thing away,
              take this. Most bad AI output I see is not caused by a weak model; it is caused by a prompt that skipped
              two or three of these parts and left the model to guess.
            </p>
          </div>

          <div className="space-y-2 mb-6">
            {baseShape.map((row) => (
              <div
                key={row.part}
                className="grid md:grid-cols-[140px_1fr_1.3fr] gap-2 md:gap-4 items-start bg-indigo-500/5 border border-indigo-500/15 rounded-xl px-4 py-3"
              >
                <p className="text-indigo-300 font-semibold text-sm">{row.part}</p>
                <p className="text-white/70 text-sm">{row.desc}</p>
                <p className="text-white/50 text-sm italic">{row.example}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-10">
            <p>
              Context is the part people skip most, and it is the part that matters most. The model does not know
              your framework, your naming rules, your environments or what the requirement actually says. Anything it
              does not know, it will fill with something generic and plausible. In testing, generic and plausible is
              exactly how wrong expected values get into a suite.
            </p>
            <p>
              Output format is the part people underrate. Asking for a table with fixed columns, a numbered list or a
              diff turns a wall of prose into something you can scan in seconds and paste into a ticket or a review.
              It also makes it obvious when something is missing.
            </p>
            <p>Here are the six patterns at a glance. The sections that follow explain when and why each one works.</p>
          </div>

          {/* Signature visual — six pattern cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {patterns.map((p) => (
              <div key={p.n} className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-200 text-xs font-bold font-mono flex items-center justify-center">
                    {p.n}
                  </span>
                  <p className="text-white font-semibold">{p.name}</p>
                </div>
                <p className="text-xs uppercase tracking-wide text-purple-300 font-semibold mb-1">Use when</p>
                <p className="text-white/60 text-sm mb-4">{p.when}</p>
                <div className="mt-auto bg-black/40 border border-white/10 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Template</p>
                  <p className="text-purple-100/90 text-xs font-mono leading-relaxed">{p.template}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Ask questions */}
        <section id="ask-questions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <CircleHelp className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pattern 1: Ask Me Questions First</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Models are eager. Give one a vague task and it will produce a confident, complete-looking answer
              immediately, filling every gap with assumptions. For testing work, those hidden assumptions are the
              problem. "Write test cases for the login page" gets you a list that assumes a password policy, a lockout
              rule and an error message you never specified.
            </p>
            <p>
              This pattern reverses the order. You tell the model not to start the task, but to list what it would
              need to know first. The questions it asks are often the same ones a sharp tester would ask in a
              refinement meeting: what happens after three failed attempts, is the email case-sensitive, what does
              the user see when the account is locked, is single sign-on in scope.
            </p>
            <p>
              Two things make this pattern valuable beyond the final answer. First, the question list itself is a
              useful artifact; you can paste it straight into the ticket as open questions for the product owner.
              Second, it shows you how much you left out. If the model asks twelve questions about a three-line
              request, the request was not ready for anyone, human or machine.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-purple-300 font-semibold">Tip: </span>
              ask for all questions at once, numbered, so you can answer them in one reply. Otherwise you end up in a
              slow back-and-forth that costs more time than it saves.
            </p>
          </div>
        </section>

        {/* Section 4 — Critique then rewrite */}
        <section id="critique-rewrite" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pattern 2: Critique Then Rewrite</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              If you ask a model to "improve" something, you usually get something different, not something better.
              Words change, structure shuffles, and you cannot easily tell what was fixed and what was just rephrased.
              Worse, correct details sometimes get lost in the rewrite.
            </p>
            <p>
              Critique then rewrite splits the job into two visible steps. First, list the weaknesses, most serious
              first. Then produce a revised version that fixes them, keeping anything already correct. Now you can
              read the critique and decide which points you agree with before you even look at the rewrite.
            </p>
            <p>
              I find this especially useful for three QA artifacts: bug reports (is the title specific, are the steps
              reproducible, is expected versus actual clear), test cases (is there an observable expected result, is
              the precondition stated) and test plans (are risks named, is out-of-scope explicit). The critique list
              often teaches more than the rewrite, because it makes the quality bar explicit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">Without the pattern</p>
              <p className="text-white/60 text-sm">
                "Make this bug report better." You get a polished paragraph and no idea what changed or why.
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-blue-300 font-semibold mb-2">With the pattern</p>
              <p className="text-white/70 text-sm">
                A numbered list of weaknesses you can accept or reject, then a revision that addresses the ones you
                kept.
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            One rule: the rewrite must not add facts. If your bug report did not mention the browser, the rewrite
            should flag that it is missing, not invent one. Put that constraint in the prompt every time.
          </p>
        </section>

        {/* Section 5 — Ranked hypotheses */}
        <section id="ranked-hypotheses" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pattern 3: Ranked Hypotheses</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              When a test fails and you paste the log into a chat with "why did this fail?", you usually get one
              answer, stated confidently. Sometimes it is right. Sometimes it latches onto the loudest error in the
              log, which is often a downstream symptom rather than the cause. A single verdict invites you to stop
              thinking.
            </p>
            <p>
              Ranked hypotheses fixes that. You ask for several possible causes, ordered by likelihood, and for each
              one you require two things: the specific evidence in your input that supports it, and one cheap check
              that would confirm or rule it out. The evidence requirement keeps the model anchored to what you
              actually gave it. The cheap check turns the answer into a short investigation plan.
            </p>
            <p>
              Always verify the quoted evidence against the real log. Models can misquote or paraphrase a line in a
              way that makes it look more relevant than it is. If a hypothesis cites a line you cannot find, drop that
              hypothesis. This pattern works because it makes the model's reasoning checkable, so check it.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mt-6 font-mono text-xs md:text-sm text-purple-100/90 leading-relaxed">
            <p className="text-white/40 mb-2">Expected output shape (illustrative)</p>
            <p>1. Stale element after re-render — evidence: line quoted from log — check: rerun with a wait on the list refresh</p>
            <p>2. Test data collision — evidence: duplicate key message — check: run the test alone with fresh data</p>
            <p>3. Environment slow to start — evidence: timeout on first request — check: inspect service health at run time</p>
          </div>
        </section>

        {/* Section 6 — Three more */}
        <section id="three-more" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Patterns 4 to 6: Negative Cases, Diff-Only Edits, Explain Like a Reviewer
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-pink-300 font-semibold mb-3">Pattern 4: Negative-case generator</p>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Happy paths are easy to think of and easy to automate. The defects live elsewhere. This pattern asks
                  the model to generate negative and edge cases in fixed categories: boundaries, invalid input,
                  permissions, state, and concurrency. The categories matter. Without them, the list tends to cluster
                  around invalid input and forget that two users editing the same record at once is a test case too.
                </p>
                <p>
                  The most useful instruction in this template is the last one: mark which cases the requirement does
                  not answer. Those marked cases are not test cases yet. They are questions. That turns the model into
                  a spec reviewer as well as a brainstorming partner, and it stops you from quietly inventing expected
                  results the product owner never agreed to.
                </p>
              </div>
            </div>

            <div>
              <p className="text-pink-300 font-semibold mb-3">Pattern 5: Diff-only edits</p>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  When you ask an assistant to change a file, the default is often to return the whole file, lightly
                  rewritten. Variables get renamed, formatting shifts, an import moves. The change you asked for is in
                  there somewhere, buried in noise you now have to review.
                </p>
                <p>
                  Diff-only edits constrain the output to a unified diff touching only what the task needs, with a
                  one-line explanation per change. Reviewing becomes fast and safe: you see exactly what moved. It also
                  discourages the model from "helpfully" refactoring code you did not ask it to touch, which in a test
                  framework can quietly change behavior across many tests.
                </p>
              </div>
            </div>

            <div>
              <p className="text-pink-300 font-semibold mb-3">Pattern 6: Explain like a reviewer</p>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Inheriting an unfamiliar test framework, a CI config or a tangled utility class is a normal part of
                  QA work. Asking "what does this do?" gets a summary. Asking the model to explain it as a reviewer
                  gets something more useful: what it does, what it assumes, what could go wrong, and what it would
                  ask the author, with quoted lines for each point.
                </p>
                <p>
                  The reviewer framing pushes the model toward risks and assumptions instead of a friendly paraphrase.
                  The quoted lines let you jump straight to the relevant code and check whether the concern is real.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 mt-8">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-pink-300 font-semibold">Common thread: </span>
              all six patterns make the output easier to check. That is the real reason they work. A prompt that
              produces checkable output is worth more than one that produces impressive output.
            </p>
          </div>
        </section>

        {/* Section 7 — Shared library */}
        <section id="shared-library" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Library className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Keep a Shared Library</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A pattern that lives in one person's head is barely better than a clever prompt. The step that makes
              patterns compound is putting them where the team already collaborates: the repository. Plain markdown
              files, one per pattern, next to the tests they serve.
            </p>
            <p>
              Treat them like code. Changes go through pull requests. When a template produces a bad result, someone
              proposes a fix and explains why. Shared context files, such as your framework conventions and your data
              rules, sit alongside so anyone can paste them in. Over time the library becomes a quiet record of what
              your team has learned about working with AI.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" /> prompts/ — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-teal-100/90 font-mono">
              <code>{libraryLayout}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two rules keep a library healthy. First, include a data rule file and reference it from every template:
              no credentials, no customer data, no production records in prompts, ever. Second, keep templates short.
              A template that grows into a page of special cases stops being reused, because nobody wants to read it.
              If it keeps growing, it is probably two patterns.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Prompting is not a dark art and it is not a separate profession. For QA engineers, it is a familiar
              skill in a new place: writing a clear, bounded specification and then checking that what comes back
              matches it. The six patterns here are just structures that make that easier.
            </p>
            <p>
              Start with the base shape on every request. Add ask-me-questions when the task is fuzzy and ranked
              hypotheses when something is failing. Use critique then rewrite on your bug reports for a week and see
              what the critique teaches you. Then put the ones that earn their place into the repo where your team can
              use and improve them.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-purple-200 text-lg font-semibold">
              Reuse your best prompts the way you reuse your best helpers.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Building a prompt library for your test team?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about turning one-off prompts into shared, reviewable patterns that make AI useful for QA work.
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

export default ReusablePromptPatternsBlog;
