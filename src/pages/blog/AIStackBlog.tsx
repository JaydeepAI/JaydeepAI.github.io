import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSEO({
  title, description, keywords, ogImage, canonicalUrl,
}: {
  title: string; description: string; keywords: string; ogImage: string; canonicalUrl: string;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    const jsonLd = {
      "@context": "https://schema.org", "@type": "TechArticle",
      headline: title, description, image: ogImage,
      author: { "@type": "Person", name: "Jaydeep Patel", url: "https://jaydeepai.github.io/" },
      publisher: { "@type": "Person", name: "Jaydeep Patel", url: "https://jaydeepai.github.io/" },
      datePublished: "2025-06-24", dateModified: "2025-06-24",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      keywords, articleSection: "AI Development",
    };
    let script = document.getElementById("blog-jsonld") as HTMLScriptElement | null;
    if (!script) { script = document.createElement("script"); script.id = "blog-jsonld"; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);
  }, [title, description, keywords, ogImage, canonicalUrl]);
}

const tocItems = [
  { id: "three-eras", label: "The Four Eras of AI Development" },
  { id: "copilot", label: "GitHub Copilot: The Autocomplete Revolution" },
  { id: "cursor", label: "Cursor: The AI-Native IDE" },
  { id: "claude-code", label: "Claude Code: The Agent Era" },
  { id: "shift", label: "The Shift Most Developers Haven't Noticed" },
  { id: "no-winner", label: "Why There Is No Winner" },
  { id: "stack", label: "The Emerging AI Development Stack" },
  { id: "qa", label: "What This Means for QA Engineers" },
  { id: "conclusion", label: "Final Thoughts" },
];

export default function AIStackBlog() {
  const navigate = useNavigate();

  useSEO({
    title: "Claude Code vs Cursor vs GitHub Copilot: Understanding the New AI Coding Stack | Jaydeep Patel",
    description: "Most developers are asking the wrong question. It's not which AI tool is best — it's what layer of software development each tool optimizes. A deep-dive into the three tools defining the new AI coding stack.",
    keywords: "Claude Code vs Cursor, GitHub Copilot vs Claude Code, AI coding tools 2025, AI development stack, agentic development, Cursor IDE, Claude Code agent, AI software engineer, QA automation AI",
    ogImage: "https://jaydeepai.github.io/og-ai-stack.png",
    canonicalUrl: "https://jaydeepai.github.io/blog/ai-coding-stack",
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHome = (hash: string) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans">

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Blog
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border border-violet-500/40 text-violet-400 bg-violet-500/10">
            AI Builder Series · June 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-transparent">
            Claude Code vs Cursor vs GitHub Copilot
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
            Understanding the New AI Coding Stack
          </p>
          <p className="text-base text-gray-500 max-w-xl mx-auto mb-8">
            Most developers are asking the wrong question. It's not which tool is best. It's what layer of software development each tool was built to optimize.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            <span>✍️ Jaydeep Patel</span>
            <span>·</span>
            <span>📅 June 24, 2025</span>
            <span>·</span>
            <span>⏱ 18 min read</span>
            <span>·</span>
            <span>🏷 AI Strategy</span>
          </div>
        </div>
      </section>

      {/* ── TOC ── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Table of Contents</h2>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group w-full text-left"
                >
                  <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-mono text-gray-500 group-hover:text-white transition-colors shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:underline underline-offset-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-6 space-y-24 mb-24">

        {/* Opening */}
        <section className="prose-section">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-8 mb-8">
            <p className="text-xl text-gray-200 leading-relaxed font-light italic">
              "For most of software history, a developer's core skill was the ability to write code. Then it became the ability to write code faster. Now, for the first time, it might be the ability to not write code at all — and still ship better software."
            </p>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Something structural is shifting in software development. Not at the surface level of syntax or frameworks — but at the level of the relationship between the developer and the machine.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            For years the progression was linear: better languages, better IDEs, better libraries. The developer was always the primary actor. The tools were extensions of human intent. Then in 2021, GitHub Copilot arrived and quietly introduced a different model — one where the machine began contributing to the work, not just executing it.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Since then, the space has exploded. Cursor reimagined what an IDE could be. Claude Code introduced the concept of an AI that doesn't just suggest code — it pursues outcomes. And somewhere in the noise of product launches and benchmark comparisons, a genuinely important question has been buried: these tools aren't competing. They're operating at entirely different layers of the development process.
          </p>
        </section>

        {/* Era Section */}
        <section id="three-eras" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🕰️</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">Foundation</span>
              <h2 className="text-3xl font-bold text-white mt-2">The Four Eras of AI Development</h2>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">
            To understand where we are, it helps to understand how we got here. The history of AI-assisted development isn't a straight line — it's a series of threshold crossings, each one changing not just what developers could do, but how they thought about their role.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                era: "Era 1", label: "Traditional IDEs", year: "Pre-2021", color: "border-gray-500/30 bg-gray-500/5",
                accent: "#6b7280", tag: "Human writes everything",
                desc: "The developer is the complete author. The IDE is a sophisticated text editor — syntax highlighting, refactoring tools, debuggers. The machine executes. The human creates. Every line of code is a conscious decision.",
              },
              {
                era: "Era 2", label: "AI Autocomplete", year: "2021–2022", color: "border-blue-500/30 bg-blue-500/5",
                accent: "#60a5fa", tag: "AI completes what you start",
                desc: "GitHub Copilot arrives. The machine begins predicting what you're about to type and offers it before you finish. The developer is still the author — but now has a co-author that works at the speed of thought. Productivity increases sharply. The cognitive model stays the same.",
              },
              {
                era: "Era 3", label: "AI Collaboration", year: "2023–2024", color: "border-violet-500/30 bg-violet-500/5",
                accent: "#a78bfa", tag: "AI understands your codebase",
                desc: "Cursor and similar tools change the interface itself. The developer can now have a conversation with their editor. The AI understands the entire codebase, not just the current file. You stop talking to code and start talking about code. The cognitive model begins to shift.",
              },
              {
                era: "Era 4", label: "AI Agents", year: "2024–Present", color: "border-cyan-500/30 bg-cyan-500/5",
                accent: "#22d3ee", tag: "AI pursues outcomes",
                desc: "Claude Code and the emerging agent layer change the fundamental unit of AI interaction. You no longer give instructions line by line. You describe an outcome. The AI plans, executes, iterates, and returns with results. The developer's role transforms from author to director.",
              },
            ].map((e) => (
              <div key={e.era} className={`rounded-2xl border ${e.color} p-6`}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <span className="text-xs font-mono font-bold" style={{ color: e.accent }}>{e.era}</span>
                    <p className="text-white font-bold text-lg leading-tight">{e.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{e.year}</p>
                  </div>
                  <div className="border-l border-white/10 pl-4 flex-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold mb-3 inline-block" style={{ background: `${e.accent}15`, color: e.accent, border: `1px solid ${e.accent}30` }}>{e.tag}</span>
                    <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 leading-relaxed">
            Each era didn't replace the previous one — it layered on top of it. Autocomplete didn't kill traditional IDEs. Cursor didn't kill Copilot. What changes is the ceiling: the maximum level of complexity a single developer can manage, and the speed at which they can manage it.
          </p>
        </section>

        {/* Copilot */}
        <section id="copilot" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🐙</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">Era 2</span>
              <h2 className="text-3xl font-bold text-white mt-2">GitHub Copilot: The Autocomplete Revolution</h2>
              <p className="text-gray-400 mt-1">AI as a coding assistant</p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              When GitHub Copilot launched in 2021, it felt like magic. You'd start typing a function name and the entire implementation would materialize as a ghost suggestion. Accept it with Tab. Move on. It was the first time most developers experienced AI as a direct participant in their workflow — not a chatbot they'd query separately, but something woven into the act of writing itself.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Copilot's philosophy is clear: reduce friction at the point of creation. It lives inside your existing IDE. It doesn't ask you to change how you think about development — it accelerates the development you're already doing. That's not a limitation. That's a deliberate design decision with real consequences.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The mental model Copilot optimizes is still fundamentally <span className="text-white font-medium">developer-as-author</span>. You remain the primary intelligence. Copilot watches what you're doing and offers the next logical continuation. It's powerful because it meets you where you are. It's constrained because it can only see what you're currently looking at.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
              <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">Where It Shines</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {["Boilerplate elimination — tests, types, CRUD", "Pattern continuation within a known codebase", "Keeping flow state during active coding sessions", "Language-agnostic — works across every stack", "Zero context switch — stays inside your IDE"].map(b => (
                  <li key={b} className="flex items-start gap-2"><span className="text-green-400 mt-0.5 shrink-0">▸</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">Where It Falls Short</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {["No understanding of your system's architecture", "Can't reason across multiple files at once", "No memory between sessions", "Suggestions without explanation — hard to audit", "Struggles with novel problem domains"].map(b => (
                  <li key={b} className="flex items-start gap-2"><span className="text-orange-400 mt-0.5 shrink-0">▸</span>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Copilot transformed software development not by changing how developers think, but by reducing the cost of the thinking they were already doing. That's a genuinely significant contribution. But it's also the ceiling of what autocomplete-first AI can achieve.
          </p>
        </section>

        {/* Cursor */}
        <section id="cursor" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🖱️</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">Era 3</span>
              <h2 className="text-3xl font-bold text-white mt-2">Cursor: The AI-Native IDE</h2>
              <p className="text-gray-400 mt-1">AI as a coding collaborator</p>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              Cursor made a bet that most people initially underestimated: what if the IDE itself was reimagined around AI, rather than AI being bolted onto an existing IDE? The result wasn't just a better Copilot. It was a different kind of relationship between developer and tool.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The critical shift Cursor introduced was <span className="text-white font-medium">codebase-level context</span>. Copilot knows what's in your current file. Cursor knows what's in your entire project — and you can ask it about that project in natural language. "Why does this component re-render so often?" "What's the authentication flow?" "Which service handles this?" These are questions about a system, not questions about syntax. Cursor can answer them.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The developer's role begins to shift. You spend less time remembering your own codebase and more time reasoning about what you want it to do. The IDE becomes less of a text editor and more of a technical collaborator — one that holds context you might have forgotten and can surface it when you need it.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">The Mental Model Shift</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-gray-500 text-xs mb-2">Copilot Interaction</p>
                <p className="text-white font-mono text-xs bg-black/30 rounded p-2">"Complete this function"</p>
              </div>
              <div className="flex items-center justify-center text-2xl text-gray-600">→</div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-gray-500 text-xs mb-2">Cursor Interaction</p>
                <p className="text-white font-mono text-xs bg-black/30 rounded p-2">"Refactor this module using the pattern in /utils"</p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Cursor didn't just improve the suggestion quality. It moved the conversation from the line level to the system level. That's a different kind of intelligence amplification — one that becomes more valuable the larger and more complex your codebase becomes.
          </p>
        </section>

        {/* Claude Code */}
        <section id="claude-code" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🤖</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Era 4</span>
              <h2 className="text-3xl font-bold text-white mt-2">Claude Code: The Agent Era</h2>
              <p className="text-gray-400 mt-1">AI as a software engineer</p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              Claude Code doesn't fit neatly into the story of AI coding tools — because it isn't really a coding tool in the traditional sense. Copilot and Cursor are both, fundamentally, interfaces for writing code faster. Claude Code is an interface for achieving outcomes. That difference is not cosmetic. It represents an architectural shift in what AI can be asked to do.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              When you open Copilot, you're about to write code. When you open Cursor, you're about to discuss your code. When you open Claude Code, you might describe a task — migrate this authentication system, add rate limiting to the API, write tests for the payment module — and then step back while it plans, executes, encounters problems, self-corrects, and returns with a result. The mode of engagement is categorically different.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This isn't marketing language. It's a consequence of the underlying architecture — terminal-first, tool-equipped, memory-persistent, and capable of running multi-step autonomous loops. Claude Code isn't predicting your next line. It's reasoning about your next outcome.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                icon: "📄", title: "CLAUDE.md — Persistent Project Intelligence",
                color: "border-blue-500/20 bg-blue-500/5", accent: "#60a5fa",
                desc: "Every session starts with full project context. Tech stack, conventions, architecture decisions, run commands — all loaded automatically. Claude Code doesn't forget what your project is between sessions. Most developers underestimate how much cognitive overhead this eliminates.",
              },
              {
                icon: "🔗", title: "Hooks — Enforced Workflow Automation",
                color: "border-red-500/20 bg-red-500/5", accent: "#f87171",
                desc: "Shell commands that fire on lifecycle events — before and after file writes, on session end, on notifications. Every file Claude Code touches gets auto-formatted. Protected paths can't be modified. The quality bar is enforced at the infrastructure level, not the trust level.",
              },
              {
                icon: "🔌", title: "MCP — Real-World Tool Access",
                color: "border-green-500/20 bg-green-500/5", accent: "#34d399",
                desc: "The Model Context Protocol gives Claude Code access to external systems: Figma design tokens, GitHub issues, databases, APIs. The gap between design and implementation can be closed by a single agent session. This isn't integration — it's workflow collapse.",
              },
              {
                icon: "🤖", title: "Subagents — Parallel Specialized Execution",
                color: "border-purple-500/20 bg-purple-500/5", accent: "#a78bfa",
                desc: "Claude Code can spin up isolated agents for focused tasks — an accessibility reviewer, a security auditor, a test writer — each with its own scoped context and restricted toolset. The main session delegates. The subagent executes. Results are returned without polluting the primary context.",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border ${item.color} p-6`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-black/30 p-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">What an Agentic Session Looks Like</p>
            <div className="space-y-2 font-mono text-xs">
              {[
                { role: "You", color: "text-cyan-400", msg: "Add JWT authentication to the Express API. Follow existing patterns in /middleware." },
                { role: "Claude Code", color: "text-green-400", msg: "Reading codebase structure..." },
                { role: "Claude Code", color: "text-green-400", msg: "Found existing middleware pattern in /middleware/auth.ts" },
                { role: "Claude Code", color: "text-green-400", msg: "Creating jwt.middleware.ts, updating route guards, adding token refresh logic..." },
                { role: "Claude Code", color: "text-green-400", msg: "Running tests... 2 failures found. Fixing edge cases..." },
                { role: "Claude Code", color: "text-green-400", msg: "✓ All tests passing. Updated 6 files. Here's a summary of changes." },
              ].map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`${line.color} font-bold shrink-0 w-24`}>{line.role}:</span>
                  <span className="text-gray-300">{line.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Notice what didn't happen in that session: the developer didn't write a single line. They didn't review suggestions one by one. They didn't manage the state of the task. They described an outcome, set a constraint, and supervised a result. The cognitive shift here is profound — and it's only the beginning of what agentic development looks like.
          </p>
        </section>

        {/* The Shift */}
        <section id="shift" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🔭</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">The Big Picture</span>
              <h2 className="text-3xl font-bold text-white mt-2">The Shift Most Developers Haven't Noticed</h2>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">
            There's a transition happening in software development that most practitioners are in the middle of without fully recognizing it. The nature of the developer's job is changing — not in the apocalyptic "AI replaces programmers" sense that dominates headlines, but in a quieter, more structural way.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { label: "Past", desc: "Write every line.\nThe developer is the complete author of the system.", color: "text-gray-400" },
                { label: "Present", desc: "Review AI output.\nThe developer is the quality filter and architect of intent.", color: "text-blue-400" },
                { label: "Future", desc: "Direct multiple agents.\nThe developer is the systems designer and intelligence orchestrator.", color: "text-cyan-400" },
              ].map((col) => (
                <div key={col.label} className="rounded-xl bg-white/5 p-5">
                  <p className={`text-lg font-bold mb-3 ${col.color}`}>{col.label}</p>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">
            The skills that are becoming more valuable are not the ones that make you faster at writing code. They're the ones that make you better at directing AI systems: <span className="text-white font-medium">context engineering</span> (knowing what information an AI needs to make good decisions), <span className="text-white font-medium">workflow design</span> (structuring tasks so agents can execute them reliably), and <span className="text-white font-medium">result evaluation</span> (knowing whether what the AI produced is actually correct and complete).
          </p>

          <p className="text-gray-400 leading-relaxed">
            The developers who will be most effective in this era aren't necessarily the fastest coders. They're the ones who understand their systems deeply enough to describe outcomes precisely — and who can evaluate AI output with enough confidence to catch what the AI missed.
          </p>
        </section>

        {/* No Winner */}
        <section id="no-winner" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">⚖️</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">The Real Answer</span>
              <h2 className="text-3xl font-bold text-white mt-2">Why There Is No Winner</h2>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">
            The "Claude Code vs Cursor vs Copilot" framing is seductive because comparisons are clean. Benchmarks are satisfying. Winners feel conclusive. But it's the wrong frame — and using it leads developers toward poor tooling decisions.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { tool: "GitHub Copilot", optimizes: "Speed", question: "How do I write this faster?", layer: "Line-level", color: "border-blue-500/30 bg-blue-500/5", accent: "#60a5fa" },
              { tool: "Cursor", optimizes: "Interaction", question: "How do I navigate and transform my codebase?", layer: "System-level", color: "border-violet-500/30 bg-violet-500/5", accent: "#a78bfa" },
              { tool: "Claude Code", optimizes: "Execution", question: "How do I achieve this outcome?", layer: "Outcome-level", color: "border-cyan-500/30 bg-cyan-500/5", accent: "#22d3ee" },
            ].map((row) => (
              <div key={row.tool} className={`rounded-2xl border ${row.color} p-6`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="min-w-[140px]">
                    <p className="text-white font-bold">{row.tool}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Optimizes: <span style={{ color: row.accent }} className="font-semibold">{row.optimizes}</span></p>
                  </div>
                  <div className="border-l border-white/10 pl-4 flex-1">
                    <p className="text-gray-400 text-sm italic mb-1">"{row.question}"</p>
                    <code className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: `${row.accent}15`, color: row.accent }}>{row.layer}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">
            Asking whether Copilot or Claude Code is "better" is like asking whether a calculator or a spreadsheet is better. For a single arithmetic operation, the calculator wins. For modeling a financial system, the spreadsheet is the only tool that makes sense. The question isn't quality — it's fit.
          </p>
          <p className="text-gray-400 leading-relaxed">
            More importantly: using Claude Code for line-by-line completion would be wasteful overkill. Using Copilot for a complex multi-file refactor would be painful and slow. The tools aren't interchangeable. They're complementary — and the developers who recognize this early will build significantly more leverage than those still debating rankings.
          </p>
        </section>

        {/* Stack */}
        <section id="stack" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🏗️</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">Architecture</span>
              <h2 className="text-3xl font-bold text-white mt-2">The Emerging AI Development Stack</h2>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">
            Rather than replacing each other, these tools are beginning to form a coherent stack — each one handling the layer it was built for. Here's what that looks like in practice for a senior developer in 2025:
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-8">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">A Day in the AI-Augmented Stack</p>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { time: "Morning", tool: "Claude Code", task: "Run overnight agent session results. Review a 40-file refactor the agent completed autonomously. Approve, request changes, or reject.", color: "text-cyan-400" },
                { time: "Mid-morning", tool: "Cursor", task: "Deep work session. Designing a new module. Discussing architecture with the AI, reviewing its implementation suggestions, making high-level decisions.", color: "text-violet-400" },
                { time: "Afternoon", tool: "Copilot", task: "Active coding flow. Writing tests, filling in implementation details, rapid iteration. Copilot handles the boilerplate while you handle the logic.", color: "text-blue-400" },
                { time: "End of day", tool: "Claude Code", task: "Kick off another agent session. Define the outcome. Set the constraints. Let it run overnight. Review tomorrow.", color: "text-cyan-400" },
              ].map((row) => (
                <div key={row.time} className="flex gap-4 p-5">
                  <div className="shrink-0 w-28">
                    <p className="text-gray-500 text-xs font-medium">{row.time}</p>
                    <p className={`text-sm font-bold ${row.color}`}>{row.tool}</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{row.task}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed">
            In this model, the developer is never idle — but they're also never the bottleneck. The layers of AI handle different granularities of work simultaneously. The developer's attention becomes the scarce resource that the stack is organized around preserving.
          </p>
        </section>

        {/* QA Section */}
        <section id="qa" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🧪</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">For QA Engineers</span>
              <h2 className="text-3xl font-bold text-white mt-2">What This Means for QA Engineers</h2>
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              If you work in test automation, quality assurance, or SDET roles, the transition described in this article isn't happening around you — it's happening to the core of what you do. The question isn't whether AI will change automation engineering. It already has. The question is whether you'll be the one directing that change or reacting to it.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Selenium engineers who spent years mastering locator strategies and wait conditions are watching AI agents generate those same scripts in seconds. But that's only the surface-level disruption. The deeper shift is that AI agents can now not only write tests — they can reason about test coverage, identify edge cases, maintain test suites as the application changes, and flag regressions before a human reviewer would catch them.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                shift: "From writing tests → to reviewing AI-generated tests",
                detail: "Claude Code can generate comprehensive test suites from a description of behavior. Your value shifts to evaluating whether the generated tests actually capture the right edge cases — a much higher-order skill than writing the tests yourself.",
                color: "border-orange-500/20 bg-orange-500/5",
              },
              {
                shift: "From maintaining selectors → to defining test strategy",
                detail: "Fragile selector maintenance — the bane of UI automation — becomes an agent problem. You define what user journeys matter and at what level of fidelity. The agent handles the implementation details.",
                color: "border-yellow-500/20 bg-yellow-500/5",
              },
              {
                shift: "From running regression suites → to designing quality gates",
                detail: "With hooks and agents, quality checks can be embedded into the development workflow itself. Instead of a QA pass at the end of a sprint, quality enforcement happens continuously — at every file write, every commit, every deployment.",
                color: "border-green-500/20 bg-green-500/5",
              },
              {
                shift: "From reactive bug finding → to proactive system verification",
                detail: "An agent that understands your system's intended behavior can actively probe for inconsistencies — not just after changes, but as a continuous background process. The QA engineer's role becomes designing the verification strategy, not executing it.",
                color: "border-blue-500/20 bg-blue-500/5",
              },
            ].map((item) => (
              <div key={item.shift} className={`rounded-2xl border ${item.color} p-6`}>
                <p className="text-white font-semibold text-sm mb-2">{item.shift}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 leading-relaxed">
            The QA engineers who will thrive in this era are the ones who deeply understand what makes software reliable — not just how to automate checks for it. That domain knowledge becomes dramatically more valuable when you're directing AI agents rather than writing Selenium scripts. The automation still matters. But now you're the architect, not the implementer.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">🧭</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/20">Final Thoughts</span>
              <h2 className="text-3xl font-bold text-white mt-2">Directing Intelligence</h2>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-violet-500/5 p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              The future of software development isn't a world where AI writes all the code and developers become obsolete. It's a world where the leverage available to a single developer — or a small team — becomes extraordinary. A solo developer with a well-configured agentic stack can accomplish what previously required a full engineering team. Not because the work got easier, but because the work got delegatable.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              GitHub Copilot gave us AI that could keep up with our fingers. Cursor gave us AI that could keep up with our thinking. Claude Code gives us AI that can keep up with our intent. Each step is a meaningful expansion of human capability — not a replacement of it.
            </p>
            <p className="text-gray-300 leading-relaxed font-medium">
              The biggest skill of the next decade in software may not be typing speed, or framework knowledge, or even algorithmic thinking. It may be the ability to think clearly about outcomes, communicate them precisely to AI systems, and evaluate the results with enough expertise to know when to trust them and when to push back.
            </p>
          </div>

          <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-6">
            <p className="text-violet-300 text-sm leading-relaxed italic">
              "The most valuable developers of the next decade won't be those who write the most code. They'll be those who most clearly understand what code should do — and who can direct increasingly capable systems to build it."
            </p>
            <p className="text-gray-500 text-xs mt-3">— Jaydeep Patel</p>
          </div>
        </section>

      </div>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/10 to-cyan-600/10 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Building with the Full AI Stack?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            I design and build AI-powered automation systems using the full agent stack. If you're exploring what agentic development could look like for your team, let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </button>
            <button
              onClick={() => window.open("https://github.com/JaydeepAI", "_blank")}
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              See My Projects
            </button>
          </div>
        </div>
      </section>

      {/* ── Tags ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap gap-2">
          {["Claude Code", "Cursor", "GitHub Copilot", "AI Dev Tools", "Agentic Development", "QA Automation", "AI Strategy", "Software Engineering", "2025"].map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
              #{tag.replace(/\s/g, "")}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
