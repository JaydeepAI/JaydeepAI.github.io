import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── SEO Hook (same pattern as your other blog posts) ───────────────────────
function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  canonicalUrl,
  jsonLd,
}: {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  jsonLd: object;
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
    setMeta("og:title", ogTitle, true);
    setMeta("og:description", ogDescription, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle);
    setMeta("twitter:description", ogDescription);

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
    ldScript.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = "Digital Jaydeep";
    };
  }, [title, description, keywords, ogTitle, ogDescription, canonicalUrl, jsonLd]);
}

// ─── Scroll helper ───────────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AgenticAIBlog() {
  const navigate = useNavigate();

  useSEO({
    title: "Governing Agentic AI: Workflows, Orchestration & Integration Frameworks | Digital Jaydeep",
    description:
      "A deep-dive into agentic AI architecture — how enterprise teams balance autonomous reasoning with deterministic control, hybrid models, MCP, and governance.",
    keywords:
      "agentic AI, AI workflows, AI agents, MCP, Model Context Protocol, LangGraph, human-in-the-loop, HITL, browser automation, QA automation, AI governance, prompt injection, Jaydeep Patel",
    ogTitle: "Governing Agentic AI: Workflows, Orchestration & Integration Frameworks",
    ogDescription:
      "From deterministic scripts to autonomous agents — a practical breakdown of hybrid architectures, orchestration protocols, and security governance for 2026.",
    canonicalUrl: "https://jaydeepai.github.io/blog/governing-agentic-ai",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Governing Agentic AI: Workflows, Orchestration and Integration Frameworks",
      description:
        "A comprehensive exploration of architectural and operational distinctions between AI agents and AI workflows, hybrid models, MCP, and security governance.",
      author: { "@type": "Person", name: "Jaydeep Patel" },
      publisher: { "@type": "Organization", name: "Digital Jaydeep" },
      datePublished: "2026-06-28",
      url: "https://jaydeepai.github.io/blog/governing-agentic-ai",
    },
  });

  const goHome = (section: string) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const tocItems = [
    { id: "intro", label: "The Core Architectural Shift" },
    { id: "agents-vs-workflows", label: "Agents vs. Workflows" },
    { id: "hybrid", label: "Hybrid Architectures" },
    { id: "browser-stack", label: "The 2026 Browser Automation Stack" },
    { id: "mcp", label: "Model Context Protocol (MCP)" },
    { id: "hitl", label: "Human-in-the-Loop & Governance" },
    { id: "five-tier", label: "Five-Tier Action Taxonomy" },
    { id: "security", label: "Security & Safety" },
    { id: "media", label: "Audio & Video Overview" },
    { id: "roadmap", label: "Learning Roadmap" },
    { id: "conclusion", label: "Conclusion" },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#050816" }}
    >
      {/* ── Back Button ── */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* ── Hero Header ── */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {["AI Architecture", "Agentic AI", "Governance", "Automation"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            Governing Agentic AI: Workflows, Orchestration, and Integration Frameworks
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            How enterprise teams can balance autonomous reasoning with deterministic control — from hybrid
            architectures and the Model Context Protocol to human-in-the-loop governance and prompt-injection
            defences.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-white/10 pb-8">
            <span>Jaydeep Patel</span>
            <span>·</span>
            <span>June 28, 2026</span>
            <span>·</span>
            <span>18 min read</span>
          </div>
        </header>

        {/* ── Table of Contents ── */}
        <nav className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  {i + 1}. {item.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1 — Intro */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="intro" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            The Core Architectural Shift: Determinism vs. Autonomy
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            For anyone who has spent time writing automation scripts — Selenium suites, Playwright flows,
            Jenkins pipelines — the rise of agentic AI represents something more than an upgrade in tooling.
            It is a philosophical shift in how we think about machines taking action.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Traditional automation is <span className="text-white font-medium">deterministic</span>. You define
            the exact selectors, the precise sequence of clicks, and the assertions that must hold. Given the
            same input, the system produces the same output — every time, without deviation. This predictability
            is its greatest strength and its most significant limitation.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Agentic AI, by contrast, operates probabilistically. Instead of encoding{" "}
            <em>how</em> to accomplish a task, you describe <em>what</em> you want achieved. The system reasons
            about the current context, selects tools, sequences actions, and adapts mid-execution. This unlocks
            capabilities that deterministic scripts simply cannot replicate — and introduces failure modes they
            never had to contend with.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2 — Agents vs Workflows */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="agents-vs-workflows" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Agents vs. Workflows: What the Distinction Actually Means
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The industry uses these terms loosely. Here is a precise framing that holds up under engineering scrutiny.
          </p>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg">AI Workflow</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                A predefined execution graph where the human architect specifies nodes, branching logic, and
                control flow. AI is applied at specific nodes — for classification, extraction, or generation —
                but the overall sequence is fixed.
              </p>
              <ul className="space-y-2 text-sm">
                {["Highly reliable & auditable", "Same input → same path", "Easier to test & certify", "Lower token cost per run"].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400 text-xs">✓</span> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg">AI Agent</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                A goal-oriented system that decides its own action sequence at runtime. Given an objective, the
                agent interprets context, selects from available tools, executes, observes the outcome, and
                re-plans. The path is emergent, not prescribed.
              </p>
              <ul className="space-y-2 text-sm">
                {["Handles novel, open-ended tasks", "Resilient to UI/API changes", "Genuinely autonomous", "Higher reasoning capability"].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400 text-xs">✓</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">
            The key insight: neither is universally superior. The choice depends on input variability, consequence
            of error, and unit economics. A bank reconciliation pipeline should be a workflow. An open-ended
            research agent that cross-references dozens of sources should be an agent. Most real systems need
            both.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3 — Hybrid */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="hybrid" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Hybrid Architectures: Reliability with AI Autonomy
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The most mature production deployments in 2026 are neither pure workflows nor pure agents. They are
            what practitioners are calling <span className="text-white font-medium">agentic workflows</span> —
            deterministic backbones with AI-powered nodes inserted at points of maximum value.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Think of it as a factory assembly line. The line itself is deterministic — components move station
            to station in a fixed order. But at certain stations, instead of a fixed-function machine, you have
            an AI reasoning engine that handles the messy, judgment-intensive steps: classifying an ambiguous
            document, extracting structured data from a free-text email, deciding whether an edge case requires
            escalation.
          </p>

          {/* Callout box */}
          <div className="p-6 rounded-2xl border-l-4 border-blue-500 bg-blue-500/5 mb-6">
            <p className="text-gray-200 leading-relaxed italic">
              "The deterministic backbone provides auditability and compliance guarantees. The AI nodes provide
              adaptability where the complexity justifies the cost. This combination is what lets teams ship
              autonomous systems into regulated environments."
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Frameworks like <strong className="text-white">LangGraph</strong> are explicitly designed for this
            pattern — letting you define graph nodes that can either execute deterministic logic or invoke an
            LLM, with full control over which edges are traversed and when human oversight is injected.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4 — Browser Stack */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="browser-stack" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            The 2026 Browser Automation Stack
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The tooling landscape has stratified into three clear tiers. Understanding which tier to reach for —
            and when — is now a core engineering competency.
          </p>

          {/* Tool comparison table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-6 text-gray-400 font-medium">Tool</th>
                  <th className="text-left py-3 pr-6 text-gray-400 font-medium">Approach</th>
                  <th className="text-left py-3 pr-6 text-gray-400 font-medium">Best For</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Cost / Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    tool: "Playwright",
                    approach: "Deterministic",
                    best: "High-volume CI/CD, sub-second execution, 100% reliability on stable UIs",
                    cost: "Zero LLM cost · Milliseconds",
                  },
                  {
                    tool: "Stagehand",
                    approach: "Hybrid",
                    best: "Fragile UIs, structured data extraction via Zod schemas, partial AI augmentation",
                    cost: "$0.01–0.05 / task · Seconds",
                  },
                  {
                    tool: "Browser Use",
                    approach: "Agentic",
                    best: "Complex open-ended tasks, cross-site comparison, exploratory research",
                    cost: "$0.05–0.30+ / task · 5–30s",
                  },
                ].map((row) => (
                  <tr key={row.tool}>
                    <td className="py-4 pr-6 font-semibold text-white">{row.tool}</td>
                    <td className="py-4 pr-6">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          row.approach === "Deterministic"
                            ? "bg-green-500/15 text-green-400"
                            : row.approach === "Hybrid"
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-purple-500/15 text-purple-400"
                        }`}
                      >
                        {row.approach}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-gray-300">{row.best}</td>
                    <td className="py-4 text-gray-400 text-xs">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-300 leading-relaxed">
            The trade-off is real: AI-native tools achieve roughly 70–85% success on novel, unseen tasks
            and are dramatically more resilient to UI changes (no brittle selectors). But they are orders of
            magnitude slower and carry per-task LLM costs that can compound quickly at scale. The engineering
            decision is always about which axis you are optimising for.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5 — MCP */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="mcp" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            The Model Context Protocol: USB-C for AI Integration
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Until recently, connecting an AI agent to an external system — a database, a testing tool, a
            proprietary API — meant writing custom glue code for every integration. The result was a proliferation
            of fragile, one-off connectors that broke whenever either side changed.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <strong className="text-white">Model Context Protocol (MCP)</strong> changes this. Designed as a
            universal interface layer, MCP allows an LLM to dynamically discover available tools and data
            resources without the integration being hard-coded into the system prompt or application logic.
          </p>

          {/* MCP primitives */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: "⚙️",
                title: "Tools",
                desc: "Executable functions the agent can call — run a test, trigger a pipeline, query a database.",
              },
              {
                icon: "📄",
                title: "Resources",
                desc: "Read-only data the agent can consume — logs, documents, API specs, test reports.",
              },
              {
                icon: "💬",
                title: "Prompts",
                desc: "Interaction templates that standardise how the agent interfaces with specific services.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed">
            Platforms like <strong className="text-white">n8n</strong> are already exposing their workflow
            automation nodes as MCP servers, allowing AI agents to trigger, query, and orchestrate automation
            routines without requiring the agent to understand the underlying implementation. This is the "build
            once, integrate many" model the industry has been waiting for.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6 — HITL */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="hitl" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Human-in-the-Loop: A Three-Phase Model
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The central governance challenge with agentic systems is not preventing them from doing wrong things
            occasionally — it is detecting when they begin doing wrong things systematically. Silent drift, where
            an agent's performance degrades gradually as the application it targets evolves, is harder to catch
            than an outright failure.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                phase: "Pre-Execution",
                color: "blue",
                desc: "The agent proposes its action plan before beginning. A human reviewer — or a secondary verifier model — approves, modifies, or rejects the plan. This is particularly valuable for high-stakes, multi-step operations where the cost of mid-flight correction is high.",
              },
              {
                phase: "In-Execution",
                color: "yellow",
                desc: "Real-time interrupts are triggered when the agent encounters a high-risk action (a financial transaction, a data deletion, an irreversible state change) or when model confidence falls below a calibrated threshold. The agent pauses, surfaces the decision to a human, and resumes only on approval.",
              },
              {
                phase: "Post-Execution",
                color: "purple",
                desc: "A sample of completed runs is audited — either by a human reviewer or an automated verifier — to detect drift. Trends in confidence scores, success rates, and action patterns are monitored over time. Anomalies trigger investigation before they become systemic failures.",
              },
            ].map((item) => (
              <div
                key={item.phase}
                className={`p-6 rounded-xl border ${
                  item.color === "blue"
                    ? "border-blue-500/20 bg-blue-500/5"
                    : item.color === "yellow"
                    ? "border-yellow-500/20 bg-yellow-500/5"
                    : "border-purple-500/20 bg-purple-500/5"
                }`}
              >
                <h3
                  className={`font-bold mb-2 ${
                    item.color === "blue"
                      ? "text-blue-300"
                      : item.color === "yellow"
                      ? "text-yellow-300"
                      : "text-purple-300"
                  }`}
                >
                  {item.phase}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 7 — Five-Tier */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="five-tier" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Five-Tier Action Taxonomy
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Not every action an agent takes carries the same risk. A practical governance model classifies
            actions by reversibility and consequence, determining the level of oversight required before
            execution.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { tier: "T0", label: "Read-Only", color: "text-green-400 bg-green-500/10 border-green-500/20", desc: "Observe, query, read. No state change. No oversight required." },
              { tier: "T1", label: "Reversible Write", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", desc: "Create or update with easy rollback. Automated approval acceptable." },
              { tier: "T2", label: "Significant Write", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", desc: "Meaningful state changes. Logging and async review required." },
              { tier: "T3", label: "High-Impact", color: "text-orange-400 bg-orange-500/10 border-orange-500/20", desc: "Financial transactions, user-facing changes. Pre-approval required." },
              { tier: "T4", label: "Regulated / Irreversible", color: "text-red-400 bg-red-500/10 border-red-500/20", desc: "Deletes, compliance actions, data exports. Pre-approval + secondary reviewer mandatory." },
            ].map((item) => (
              <div key={item.tier} className={`flex gap-4 p-4 rounded-xl border ${item.color}`}>
                <span className="font-bold text-sm min-w-[32px] mt-0.5">{item.tier}</span>
                <div>
                  <span className="font-semibold text-white text-sm">{item.label}: </span>
                  <span className="text-gray-300 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed">
            Every automation action should be classified before deployment. This taxonomy prevents goal
            hijacking — where an agent, pursuing its objective, takes a high-consequence action that was never
            explicitly authorised — by making the boundary conditions explicit and machine-enforceable.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 8 — Security */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="security" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Security & Safety for Autonomous Agents
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            When an agent gains the ability to type, click, transact, and communicate autonomously, the attack
            surface expands in ways that traditional application security was not designed to address. The threats
            are qualitatively different.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                threat: "Prompt Injection",
                icon: "🎯",
                desc: "Malicious content embedded in web pages or documents that hijacks the agent's instruction set. The agent reads a page that contains hidden instructions and begins executing an attacker's goals instead of the user's.",
                mitigation: "Input sanitisation, architectural isolation between Planner and Executor components, formal security analysers.",
              },
              {
                threat: "Credential Exfiltration",
                icon: "🔑",
                desc: "Sensitive credentials passed to an LLM for context can be extracted through carefully crafted prompts. Token costs and logs may also leak sensitive data.",
                mitigation: "User-sensitive data replacement — substitute real credentials with canary tokens during inference. Monitor for token patterns in outputs.",
              },
              {
                threat: "Memory Poisoning",
                icon: "🧠",
                desc: "If agents maintain persistent memory across sessions, adversarial content can corrupt stored context, causing the agent to behave incorrectly in future sessions.",
                mitigation: "Treat agent memory as untrusted input. Validate and sanitise before use. Scope memory to minimum required context.",
              },
              {
                threat: "Goal Hijacking",
                icon: "🔄",
                desc: "An agent optimising aggressively for its objective may take unintended actions that technically satisfy the goal but violate intent — especially in open-ended task settings.",
                mitigation: "Five-Tier Action Taxonomy with hard permission boundaries. Pre-execution plan review for multi-step operations.",
              },
            ].map((item) => (
              <div key={item.threat} className="p-6 rounded-xl border border-white/10 bg-white/3">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-semibold text-white">{item.threat}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <p className="text-blue-300 text-xs leading-relaxed">
                  <strong className="text-blue-400">Mitigation: </strong>
                  {item.mitigation}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
            <h3 className="font-semibold text-yellow-300 mb-2">MAESTRO Framework</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The MAESTRO threat modelling framework provides a structured methodology for analysing
              vulnerabilities across all layers of an agentic system — from the foundation model itself, through
              the tool-use layer, to the agent ecosystem and its interactions with external services. Running a
              MAESTRO analysis before deployment surfaces attack vectors that standard security reviews miss.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 9 — MEDIA (Audio + Video placeholders) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="media" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            Audio & Video Overview
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            The concepts above are distilled into a 44-minute deep-dive audio discussion and an 8-minute visual
            explainer. Both were generated from the same source material and cover the architectural divide,
            browser automation evolution, MCP integration, and governance frameworks.
          </p>

          {/* ── Audio Player ─────────────────────────────────────────────── */}
          {/*
            CHANGE REQUIRED — AUDIO:
            Replace the src below with the path to your audio file.
            Place the file in: public/media/agentic-ai-audio.mp3
            Then update src="/media/agentic-ai-audio.mp3"
          */}
          <div className="mb-8 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Audio Discussion</h3>
                <p className="text-gray-400 text-sm">Engineering Secure Agentic Systems · 44:00</p>
              </div>
            </div>
            {/* ↓↓↓ REPLACE src with your actual audio file path ↓↓↓ */}
            <audio
              controls
              className="w-full"
              style={{ filter: "invert(0.1) hue-rotate(200deg)" }}
            >
              <source src="/media/agentic-ai-audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* ── Video Player ─────────────────────────────────────────────── */}
          {/*
            CHANGE REQUIRED — VIDEO:
            Replace the src below with the path to your video file.
            Place the file in: public/media/agentic-ai-video.mp4
            Then update src="/media/agentic-ai-video.mp4"

            OR if using YouTube/Vimeo, replace the <video> tag with an <iframe>:
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              className="w-full aspect-video rounded-xl"
              allowFullScreen
            />
          */}
          <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Video Explainer</h3>
                <p className="text-gray-400 text-sm">Modern AI Agent Stack · 8:37</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-black/40 border border-white/10">
              <video
                controls
                className="w-full aspect-video"
                poster="/media/agentic-ai-poster.jpg"
              >
                {/* ↓↓↓ REPLACE src with your actual video file path ↓↓↓ */}
                <source src="/media/agentic-ai-video.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 10 — Roadmap */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="roadmap" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            A Practical Learning Roadmap
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            For engineers transitioning into the agentic AI landscape, here is a phased roadmap that moves from
            architectural foundations to hands-on tooling, integration protocols, and governance frameworks.
          </p>

          <div className="space-y-6">
            {[
              {
                phase: "Phase 1",
                title: "Foundations of Agentic Architecture",
                color: "blue",
                items: [
                  "Master the Workflows vs. Agents distinction — determinism vs. probabilism",
                  "Understand hybrid agentic workflow design patterns",
                  "Develop decision criteria: input variability, error consequence, unit economics",
                ],
              },
              {
                phase: "Phase 2",
                title: "The 2026 Browser Automation Stack",
                color: "indigo",
                items: [
                  "Playwright for high-volume, stable UI regression suites",
                  "Stagehand: act(), extract(), observe() on top of Playwright",
                  "Browser Use: sense-plan-act loop for open-ended tasks",
                  "Performance auditing: success rate, latency, token cost per task",
                ],
              },
              {
                phase: "Phase 3",
                title: "MCP & Integration Protocols",
                color: "purple",
                items: [
                  "MCP primitives: Tools, Resources, Prompts",
                  "Multi-agent orchestration via n8n MCP servers",
                  "Connecting MCP servers to VS Code, Claude Desktop, CI pipelines",
                ],
              },
              {
                phase: "Phase 4",
                title: "Governance & Human-in-the-Loop",
                color: "yellow",
                items: [
                  "Implement three-phase HITL: Pre / In / Post execution",
                  "Apply Five-Tier Action Taxonomy to every automation",
                  "Confidence calibration using verifier models, not raw LLM probability",
                ],
              },
              {
                phase: "Phase 5",
                title: "Security & Safety Engineering",
                color: "red",
                items: [
                  "MAESTRO framework threat modelling across all system layers",
                  "Mitigating prompt injection: sanitisation, Planner/Executor isolation",
                  "Canary token strategy for credential protection",
                  "Privacy-preserving agent design for PII handling",
                ],
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className={`p-6 rounded-xl border ${
                  phase.color === "blue"
                    ? "border-blue-500/20 bg-blue-500/5"
                    : phase.color === "indigo"
                    ? "border-indigo-500/20 bg-indigo-500/5"
                    : phase.color === "purple"
                    ? "border-purple-500/20 bg-purple-500/5"
                    : phase.color === "yellow"
                    ? "border-yellow-500/20 bg-yellow-500/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      phase.color === "blue"
                        ? "bg-blue-500/20 text-blue-400"
                        : phase.color === "indigo"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : phase.color === "purple"
                        ? "bg-purple-500/20 text-purple-400"
                        : phase.color === "yellow"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {phase.phase}
                  </span>
                  <h3 className="font-bold text-white">{phase.title}</h3>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-gray-500 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 11 — Conclusion */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="conclusion" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The shift from deterministic automation to agentic AI is not a replacement — it is an expansion of
            the design space. The engineers who will build the most impactful systems in this era are those who
            understand both paradigms deeply enough to choose between them deliberately.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Use deterministic workflows for 80% of your automation — the stable, high-volume, compliance-critical
            paths where predictability is the highest-value property. Deploy AI-augmented nodes for the 20%
            where variability, natural language, or genuine reasoning are required. Reserve fully autonomous
            agents for the genuinely open-ended tasks where no human could specify the exact steps in advance.
          </p>
          <p className="text-gray-300 leading-relaxed">
            And above all: instrument everything. The governance models outlined here — HITL checkpoints,
            Five-Tier action taxonomy, MAESTRO threat analysis — are not bureaucratic overhead. They are the
            engineering infrastructure that makes autonomous systems trustworthy enough to deploy at scale.
          </p>
        </section>

        {/* ── CTA ── */}
        <div className="mb-16 p-8 rounded-2xl border border-white/10 bg-white/3 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Building something agentic?</h3>
          <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
            I build AI systems, automation frameworks, and agentic workflows. Let's talk about what you're working on.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-sm"
            >
              Get in Touch
            </button>
            <button
              onClick={() => window.open("https://github.com/JaydeepAI", "_blank")}
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white font-medium transition-colors text-sm"
            >
              See My Projects
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
          © 2026 Jaydeep Patel · Digital Jaydeep. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
