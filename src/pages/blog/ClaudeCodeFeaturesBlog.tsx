// src/pages/blog/claude-code-features.tsx
// Place this file at: src/pages/blog/ClaudeCodeFeatures.tsx
// Route: /blog/claude-code-features

import { useEffect } from "react";

// ─── SEO Head Helper (inline, no extra dep needed) ──────────────────────────
function useSEO({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
}: {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
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

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description: description,
      image: ogImage,
      author: { "@type": "Person", name: "Jaydeep Patel", url: "https://jaydeepai.github.io/" },
      publisher: {
        "@type": "Person",
        name: "Jaydeep Patel",
        url: "https://jaydeepai.github.io/",
      },
      datePublished: "2025-06-18",
      dateModified: "2025-06-18",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      keywords: keywords,
      articleSection: "AI Tools",
    };
    let script = document.getElementById("blog-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [title, description, keywords, ogImage, canonicalUrl]);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    id: "claude-md",
    emoji: "📄",
    tag: "Always-On",
    title: "CLAUDE.md — Persistent Project Memory",
    subtitle: "Auto-loaded every session, no trigger needed",
    color: "from-blue-500/20 to-cyan-500/10",
    accent: "#60a5fa",
    description:
      "CLAUDE.md is a plain Markdown file Claude Code reads automatically at session start. It carries your standing instructions: tech stack, naming conventions, run commands, and architecture. Commit it to share with the whole team.",
    bullets: [
      "Always on — zero config, no frontmatter required",
      "Commit to git — every teammate gets it instantly",
      "Personal config layered on top of project config",
    ],
    locations: ["./CLAUDE.md  (project-level, commit)", "~/.claude/CLAUDE.md  (personal, all projects)"],
    codeExample: `# Angular E-Commerce App
## Tech Stack
- Angular 17 + TypeScript 5.4
- NX monorepo | Tailwind CSS | Jest
## Conventions
- Always use OnPush change detection
- Services: providedIn: 'root'
- Prefer standalone components
## Commands
npm run test   (Jest unit tests)
npm run build  (Production bundle)`,
  },
  {
    id: "skills",
    emoji: "🧠",
    tag: "On-Demand",
    title: "Skills (SKILL.md) — Procedural Knowledge",
    subtitle: "Loaded only when the task matches",
    color: "from-purple-500/20 to-violet-500/10",
    accent: "#a78bfa",
    description:
      "A Skill is a folder with SKILL.md (YAML frontmatter + instructions) plus optional scripts. Claude reads descriptions at startup and pulls a skill only when the task matches — keeping the context window lean until needed.",
    bullets: [
      "YAML description drives automatic activation",
      "Include helper scripts and templates in same folder",
      "Personal skills overlay project-level skills",
    ],
    locations: [
      "./.claude/skills/<name>/SKILL.md  (project)",
      "~/.claude/skills/<name>/SKILL.md  (personal)",
    ],
    codeExample: `---
name: figma-to-angular
description: >
  Convert Figma frame to Angular
  component. Use when user shares
  a Figma URL or mentions
  'implement this design'.
tools: Read, Write, Edit, Bash
---
# Figma to Angular Skill
## Steps
1. Extract tokens via Figma MCP
2. Map colors/spacing to Tailwind
3. Scaffold component + spec file`,
  },
  {
    id: "commands",
    emoji: "⚡",
    tag: "User-Triggered",
    title: "Commands — Custom /Slash Shortcuts",
    subtitle: "Parameterized, user-triggered, team-shareable",
    color: "from-yellow-500/20 to-orange-500/10",
    accent: "#fbbf24",
    description:
      "Commands are Markdown files that define custom /slash commands. Use $ARGUMENTS to accept dynamic input. They run in the main thread and are ideal for repetitive scaffolding or any workflow you want as a one-liner.",
    bullets: [
      "Triggered by /command-name in chat",
      "Accept dynamic input via $ARGUMENTS",
      "Commit to repo to share with the team",
    ],
    locations: [
      "./.claude/commands/<name>.md  (project)",
      "~/.claude/commands/<name>.md  (personal)",
    ],
    codeExample: `---
name: new-component
description: Scaffold Angular
  component with spec, scss,
  and barrel export update.
---
Create an Angular component named:
  $ARGUMENTS
Include:
- component.ts  (OnPush, standalone)
- component.spec.ts  (describe/it)
- component.scss  (BEM naming)
# Usage in chat:
/new-component UserProfileCard`,
  },
  {
    id: "subagents",
    emoji: "🤖",
    tag: "Delegated",
    title: "Subagents — Isolated Task Assistants",
    subtitle: "Scoped system prompt, restricted tools, clean main thread",
    color: "from-green-500/20 to-emerald-500/10",
    accent: "#34d399",
    description:
      "A subagent runs in a separate context window with its own focused system prompt and a restricted toolset. Delegate sub-tasks to it — ideal for review passes or audits that should not pollute the main session.",
    bullets: [
      "Separate context window — no main-thread noise",
      "Restrict tools to exactly what the agent needs",
      "Proactive: Claude decides when to invoke it",
    ],
    locations: [
      "./.claude/agents/<name>.md  (project)",
      "~/.claude/agents/<name>.md  (personal)",
    ],
    codeExample: `---
name: a11y-reviewer
description: Reviews Angular
  templates for accessibility.
  Use after editing .html files.
tools: Read, Grep, Glob
model: sonnet
---
You are an accessibility specialist.
When invoked:
- Read the changed .html templates
- Check: aria-* attrs, semantic
  elements, focus management
- REPORT ONLY. Do not edit files.`,
  },
  {
    id: "hooks",
    emoji: "🔗",
    tag: "Lifecycle",
    title: "Hooks — Lifecycle Shell Commands",
    subtitle: "Guaranteed execution on pre/post tool events",
    color: "from-red-500/20 to-pink-500/10",
    accent: "#f87171",
    description:
      "Hooks fire shell commands on Claude Code lifecycle events: PreToolUse, PostToolUse, PreCompact, PostCompact, Stop, Notification. Run formatters automatically, enforce linting, block writes to protected paths.",
    bullets: [
      "Trigger on: PreToolUse, PostToolUse, Stop, Notification",
      "Block writes to protected files",
      "Run auto-format on every file edit",
    ],
    locations: ["Defined inside .claude/settings.json"],
    codeExample: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier
          --write $FILE"
      }]
    }]
  }
}`,
  },
  {
    id: "mcp",
    emoji: "🔌",
    tag: "External Tools",
    title: "MCP Server — External Tools & Live Data",
    subtitle: "The open standard for AI tool integration",
    color: "from-cyan-500/20 to-teal-500/10",
    accent: "#22d3ee",
    description:
      "MCP (Model Context Protocol) connects Claude to external tools and live data. For UI devs, Figma Dev Mode MCP is the standout: live design tokens, code, and variables — no manual copy-paste from Figma ever again.",
    bullets: [
      "Open standard — any service can expose tools",
      "Tools namespaced as mcp__server__tool_name",
      "Commit .mcp.json to share the setup with team",
    ],
    locations: ["./.mcp.json  (team server config)", "~/.claude/settings  (personal registrations)"],
    codeExample: `// .mcp.json (commit for team)
{
  "mcpServers": {
    "figma": {
      "type": "sse",
      "url": "http://127.0.0.1:3845/sse"
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mcp/server-github"]
    }
  }
}`,
  },
  {
    id: "settings",
    emoji: "⚙️",
    tag: "Config",
    title: "settings.json — Central Config",
    subtitle: "Model, permissions, env vars, and hooks in one place",
    color: "from-slate-500/20 to-gray-500/10",
    accent: "#94a3b8",
    description:
      "settings.json is Claude Code's main configuration file. Define the default model, session environment variables, which tools are allowed or blocked, and all hook definitions. Project settings in .claude/ automatically override your personal defaults.",
    bullets: [
      "Set default model, token budget, and API key",
      "Allow / deny specific tools for safety",
      "Inject env vars available to Claude and all hooks",
    ],
    locations: [".claude/settings.json  (project-level)", "~/.claude/settings.json  (personal defaults)"],
    codeExample: `{
  "model": "claude-sonnet-4-6",
  "maxTokens": 8192,
  "permissions": {
    "allow": ["Read", "Write", "Bash"],
    "deny": ["WebFetch"]
  },
  "env": {
    "NODE_ENV": "development",
    "API_URL": "http://localhost:3000"
  }
}`,
  },
  {
    id: "plugins",
    emoji: "📦",
    tag: "Bundle",
    title: "Plugins — Bundle Everything, Install Once",
    subtitle: "Skills + agents + hooks + commands + MCP in one package",
    color: "from-indigo-500/20 to-blue-500/10",
    accent: "#818cf8",
    description:
      "A Plugin packages your entire workflow into one installable unit. One teammate runs the install command and instantly has the Figma skill, the a11y agent, lint hooks, the /new-component command, and the MCP connection.",
    bullets: [
      "One install gives the whole team the full workflow",
      "Versioned and maintainable like an npm package",
      "Distribute via marketplace or private registry",
    ],
    locations: ["my-plugin/.claude-plugin/plugin.json"],
    codeExample: `my-angular-figma-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── figma-to-angular/SKILL.md
├── agents/
│   └── a11y-reviewer.md
├── commands/
│   └── new-component.md
├── hooks/
│   └── hooks.json
└── .mcp.json`,
  },
];

const comparisonTable = [
  { id: "claude-md", feature: "CLAUDE.md", what: "Always-on instructions & context", when: "Every session, team-shared", scope: "Session-global" },
  { id: "skills", feature: "Skills", what: "On-demand procedural guides", when: "Complex multi-step workflows", scope: "Pulled when task matches" },
  { id: "commands", feature: "Commands", what: "Custom /slash shortcuts + args", when: "Repetitive, parameterized tasks", scope: "User-triggered" },
  { id: "subagents", feature: "Subagents", what: "Isolated assistants, scoped tools", when: "Reviews, parallel analysis", scope: "Delegated sub-task" },
  { id: "hooks", feature: "Hooks", what: "Shell cmds on lifecycle events", when: "Auto-format, lint, block writes", scope: "Guaranteed on events" },
  { id: "mcp", feature: "MCP Server", what: "External tools & live data", when: "APIs, design tools, databases", scope: "Tool calls" },
  { id: "plugins", feature: "Plugins", what: "Bundle: all features in one pkg", when: "Team onboarding & sharing", scope: "Install once" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ClaudeCodeFeaturesBlog() {
  useSEO({
    title: "Claude Code AI Features: CLAUDE.md, Skills, Subagents & MCP — Complete Guide | Jaydeep Patel",
    description:
      "Deep-dive into every Claude Code power feature: persistent CLAUDE.md memory, on-demand Skills, custom /slash Commands, isolated Subagents, lifecycle Hooks, MCP Server integrations, and installable Plugins. Practical code examples for Angular, React, and any stack.",
    keywords:
      "Claude Code, CLAUDE.md, Claude AI features, MCP Server, Subagents, AI development, Anthropic, Claude skills, AI automation, software engineering AI, claude code tutorial, claude code features 2025",
    ogImage: "https://jaydeepai.github.io/og-claude-code.png",
    canonicalUrl: "https://jaydeepai.github.io/blog/claude-code-features",
  });

  // Enable smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Handle smooth scroll to sections
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border border-blue-500/40 text-blue-400 bg-blue-500/10">
            AI Builder Series · June 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Claude Code: Every AI Feature Explained
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            A complete breakdown of CLAUDE.md, Skills, Commands, Subagents, Hooks, MCP Servers, Settings & Plugins — with real code examples for Angular, React, and any stack.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">✍️ Jaydeep Patel</span>
            <span>·</span>
            <span>📅 June 18, 2025</span>
            <span>·</span>
            <span>⏱ 12 min read</span>
            <span>·</span>
            <span>🏷 Claude Code, AI Dev Tools</span>
          </div>
        </div>
      </section>

      {/* ── TOC ── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {features.map((f, i) => (
              <li key={f.id}>
                <a
                  href={`#${f.id}`}
                  onClick={(e) => handleScrollToSection(e, f.id)}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:underline underline-offset-2">{f.title}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#comparison" onClick={(e) => handleScrollToSection(e, "comparison")} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-mono text-gray-500 group-hover:text-white">09</span>
                <span className="group-hover:underline underline-offset-2">When to Use What — Comparison Table</span>
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed">
            Claude Code has rapidly become one of the most powerful AI coding tools available in 2025. But most developers only scratch the surface — using it as a smart autocomplete while its deeper automation features sit unused. This guide unpacks every major feature, with the real config files and code examples you can drop straight into your project today.
          </p>
          <p className="text-gray-400 leading-relaxed mt-4">
            Whether you're building in Angular, React, Node.js, or any other stack, these features fundamentally change how you delegate work to an AI assistant. Let's go deep.
          </p>
        </div>
      </section>

      {/* ── Feature Sections ── */}
      <div className="max-w-4xl mx-auto px-6 space-y-20 mb-20">
        {features.map((f, idx) => (
          <article
            key={f.id}
            id={f.id}
            className="scroll-mt-24"
          >
            {/* Section header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0"
              >
                {f.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `${f.accent}20`, color: f.accent, border: `1px solid ${f.accent}40` }}
                  >
                    {f.tag}
                  </span>
                  <span className="text-xs text-gray-500">Feature {String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{f.title}</h2>
                <p className="text-gray-400 text-base mt-1">{f.subtitle}</p>
              </div>
            </div>

            {/* Content card */}
            <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${f.color} backdrop-blur-sm p-6 md:p-8`}>
              <p className="text-gray-200 leading-relaxed mb-6">{f.description}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-6">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span style={{ color: f.accent }} className="mt-1 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* File locations */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">File Locations</p>
                <div className="space-y-1">
                  {f.locations.map((loc) => (
                    <code
                      key={loc}
                      className="block text-xs font-mono text-gray-300 bg-black/30 rounded px-3 py-1.5 border border-white/5"
                    >
                      {loc}
                    </code>
                  ))}
                </div>
              </div>

              {/* Code example */}
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Example</p>
                <pre className="text-xs font-mono leading-relaxed overflow-x-auto bg-black/40 rounded-xl border border-white/10 p-4 text-green-300 whitespace-pre-wrap">
                  {f.codeExample}
                </pre>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Comparison Table ── */}
      <section id="comparison" className="max-w-4xl mx-auto px-6 mb-24 scroll-mt-24">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
            Quick Reference
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">When to Use What</h2>
          <p className="text-gray-400">A plain-language guide to picking the right Claude Code feature</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Feature</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">What It Does</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">When to Use</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Scope</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? "bg-white/2" : ""}`}
                >
                  <td className="px-4 py-3">
                    <a 
                      href={`#${row.id}`}
                      onClick={(e) => handleScrollToSection(e, row.id)}
                      className="text-blue-400 font-semibold hover:underline cursor-pointer"
                    >
                      {row.feature}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{row.what}</td>
                  <td className="px-4 py-3 text-gray-400">{row.when}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded font-mono">{row.scope}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA / Footer ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Supercharge Your AI Workflow?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            I build AI-powered automation systems and developer tools. If you're looking to integrate Claude Code into your team's workflow, let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/JaydeepAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              See My Projects
            </a>
          </div>
        </div>
      </section>

      {/* ── Tags ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap gap-2">
          {["Claude Code", "AI Dev Tools", "Anthropic", "MCP Server", "Subagents", "CLAUDE.md", "AI Automation", "Developer Productivity", "2025"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              #{tag.replace(/\s/g, "")}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
