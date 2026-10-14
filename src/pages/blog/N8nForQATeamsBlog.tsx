import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Timer,
  Workflow,
  Zap,
  Brain,
  LifeBuoy,
  Lock,
  Code,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

/**
 * Blog: n8n for QA Teams: Workflows That Save Real Hours
 * Slug: /blog/n8n-for-qa-teams-workflows-that-save-hours
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

const N8nForQATeamsBlog = () => {
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
    title: "n8n for QA Teams: Workflows That Save Real Hours | Digital Jaydeep",
    description:
      "Workflow automation can take over the repetitive glue work around testing: report digests, failure summaries, ticket triage and reminders. Five n8n workflows worth building first, where AI steps belong, and the reliability and security basics that keep them safe.",
    keywords:
      "n8n, workflow automation, QA operations, test reporting, AI workflows, test automation, QA productivity, no-code automation",
    canonicalUrl: "https://jaydeepai.github.io/blog/n8n-for-qa-teams-workflows-that-save-hours",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "n8n for QA Teams: Workflows That Save Real Hours",
      datePublished: "2026-11-04",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "glue-tax", label: "The Glue-Work Tax" },
    { id: "what-is-n8n", label: "What n8n Is, in Plain Words" },
    { id: "starter-workflows", label: "Five Starter Workflows" },
    { id: "ai-steps", label: "Where to Place AI Steps" },
    { id: "reliability", label: "Reliability Basics" },
    { id: "security", label: "Security Basics" },
    { id: "when-code", label: "When Code Is Better" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const chain = [
    { label: "Trigger", sub: "Schedule or webhook", tone: "trigger" },
    { label: "Fetch", sub: "Test results from CI", tone: "plain" },
    { label: "AI summarize", sub: "Group and describe failures", tone: "ai" },
    { label: "Approve", sub: "Human checks the draft", tone: "human" },
    { label: "Notify", sub: "Post to team chat", tone: "plain" },
  ];

  const toneClass: Record<string, string> = {
    trigger: "bg-orange-500/15 border-orange-500/40 text-orange-200",
    plain: "bg-white/5 border-white/15 text-white",
    ai: "bg-purple-500/15 border-purple-500/40 text-purple-200",
    human: "bg-teal-500/15 border-teal-500/40 text-teal-200",
  };

  const workflows = [
    {
      name: "Nightly test-report digest",
      trigger: "Schedule, after the nightly run",
      steps: "Fetch results, compute pass/fail by area, AI writes a short summary, post to chat",
      risk: "Low",
    },
    {
      name: "Failed-build summary",
      trigger: "Webhook from CI on failure",
      steps: "Fetch failing tests and log excerpts, AI groups similar failures, post with links",
      risk: "Low",
    },
    {
      name: "Ticket triage suggestions",
      trigger: "New bug ticket created",
      steps: "Read ticket text, AI suggests component and possible duplicates, add as a comment for a human",
      risk: "Medium",
    },
    {
      name: "Release checklist reminders",
      trigger: "Schedule before a release date",
      steps: "Read checklist status, list open items and owners, send reminders",
      risk: "Low",
    },
    {
      name: "Flaky-test ledger updates",
      trigger: "Test passes on rerun after failing",
      steps: "Append a row to the ledger with test, run link and date; flag repeat offenders",
      risk: "Medium",
    },
  ];

  const riskClass: Record<string, string> = {
    Low: "bg-green-500/15 text-green-300",
    Medium: "bg-orange-500/15 text-orange-300",
  };

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
            Workflow Automation
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            QA Operations
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          n8n for QA Teams: Workflows That Save Real Hours
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The most tedious part of testing is often not the testing. It is everything you do around it.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 4, 2026
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
          "Automate the glue, not the judgment."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            QA teams are good at automating tests. We are often bad at automating the work around tests. Somebody
            copies the nightly results into a chat message. Somebody reminds three people that the release checklist
            is still open. Somebody reads every failed build and writes the same kind of summary they wrote yesterday.
            None of this is hard. All of it is repetitive, and it quietly eats time that should go to testing.
          </p>
          <p>
            Workflow automation tools are built for exactly this glue work. This article uses n8n as the example
            because it is visual, can be self-hosted and supports AI steps, which makes it a comfortable fit for
            engineering teams. The ideas apply to similar tools too. I will cover five workflows worth building first,
            where AI belongs in them, and the reliability and security basics that stop a helpful workflow from
            becoming a new source of incidents.
          </p>
        </div>

        {/* Section 1 — Glue tax */}
        <section id="glue-tax" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Timer className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Glue-Work Tax</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Glue work is the connective tissue between tools and people. It does not show up in sprint planning and
              rarely has an owner, but somebody does it every day. In QA it tends to look like this: moving results from
              one system to another, summarizing the same kind of information for different audiences, and chasing
              people for status.
            </p>
            <p>
              Each task is small. That is the trap. Five minutes to copy results, ten minutes to write a failure
              summary, a few minutes of reminders. Nobody would approve a project to save five minutes, so nobody
              does. But the tasks repeat every day, they interrupt focused work, and they are exactly the kind of thing
              people forget when they are busy, which is when the information matters most.
            </p>
            <p>
              There is also a quality cost that is easy to miss. When a human writes the failure summary from memory
              at the end of a long day, the summary varies. Sometimes it is detailed, sometimes it is one line,
              sometimes it does not get written at all. A workflow produces the same shape every time. Consistency is
              not exciting, but it is what lets people trust a message enough to stop double-checking it.
            </p>
            <p>
              Before you build anything, spend a week writing down every piece of glue work you do and roughly how
              often. Do not estimate time savings yet. Just make the list. The best candidates usually stand out on
              their own: they repeat daily, they follow the same steps each time, and nobody enjoys doing them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-6">
            {[
              { k: "Copying", v: "Results from CI into chat, spreadsheets or tickets." },
              { k: "Summarizing", v: "The same failure overview, rewritten for every audience." },
              { k: "Nudging", v: "Reminders about checklists, reviews and stale tickets." },
            ].map((item) => (
              <div key={item.k} className="border-l-2 border-orange-400/60 bg-white/5 rounded-r-xl px-4 py-3">
                <p className="text-orange-300 font-semibold text-sm">{item.k}</p>
                <p className="text-white/60 text-sm mt-1">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — What is n8n + signature chain */}
        <section id="what-is-n8n" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What n8n Is, in Plain Words</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              n8n is a workflow automation tool. You build a workflow on a visual canvas out of nodes connected by
              lines. A <span className="text-white font-medium">trigger</span> starts the workflow: a schedule, a
              webhook from another system, or an event such as a new ticket. Each following{" "}
              <span className="text-white font-medium">node</span> does one thing: fetch data from an API, filter it,
              transform it, send a message. The <span className="text-white font-medium">connections</span> pass data
              from one node to the next.
            </p>
            <p>
              Two things make it interesting for engineering teams. It can be self-hosted, which matters when test
              results and logs should not leave your own infrastructure. And it can include AI steps, so a node can
              summarize a block of text or classify an item before the workflow continues. That combination, plain
              integration plus a small amount of language understanding, covers a lot of QA glue work.
            </p>
            <p>A typical QA workflow looks like this:</p>
          </div>

          {/* Signature visual — node chain */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-2">
              {chain.map((node, i) => (
                <div key={node.label} className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto md:flex-1">
                  <div className={`w-full border rounded-xl px-3 py-3 text-center ${toneClass[node.tone]}`}>
                    <p className="font-semibold text-sm">{node.label}</p>
                    <p className="text-white/50 text-xs mt-1">{node.sub}</p>
                  </div>
                  {i < chain.length - 1 && (
                    <>
                      <ArrowRight className="hidden md:block w-4 h-4 text-orange-400 shrink-0" />
                      <ArrowDown className="md:hidden w-4 h-4 text-orange-400 shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-orange-500/40" /> Trigger
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500/40" /> AI step
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-teal-500/40" /> Human gate
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white/20" /> Plain integration
              </span>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Notice where the AI node and the human node sit. The AI produces a draft. A person approves it before
            anything is sent. For low-risk internal digests you may drop the approval step once you trust the output;
            for anything that reaches other teams or changes a ticket, keep it.
          </p>
        </section>

        {/* Section 3 — Starter workflows */}
        <section id="starter-workflows" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Five Starter Workflows</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            These five share a profile: they repeat often, they mostly read and summarize, and when they go wrong the
            damage is small and easy to notice. That is exactly the profile you want for your first automations.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-orange-500/25 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-500/10 text-orange-200 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Workflow</th>
                  <th className="text-left px-5 py-3 font-semibold">Trigger</th>
                  <th className="text-left px-5 py-3 font-semibold">Steps</th>
                  <th className="text-left px-5 py-3 font-semibold">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {workflows.map((w) => (
                  <tr key={w.name} className="align-top">
                    <td className="px-5 py-4 text-white font-medium">{w.name}</td>
                    <td className="px-5 py-4 text-white/60">{w.trigger}</td>
                    <td className="px-5 py-4 text-white/70">{w.steps}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${riskClass[w.risk]}`}>{w.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The <span className="text-white font-medium">nightly digest</span> is the easiest place to start. It
              only reads, it runs on a schedule, and the output is a message people can ignore if it is wrong. The{" "}
              <span className="text-white font-medium">failed-build summary</span> is similar but event-driven, and it
              saves the person on duty from opening the same logs every morning.
            </p>
            <p>
              <span className="text-white font-medium">Ticket triage suggestions</span> and{" "}
              <span className="text-white font-medium">flaky-test ledger updates</span> are rated medium because they
              write somewhere other people look. Keep triage as a suggestion in a comment, never an automatic field
              change, and make the ledger append-only so a mistake adds a wrong row rather than overwriting history.
              <span className="text-white font-medium"> Release reminders</span> are low risk but high value, because
              forgotten checklist items tend to surface at the worst moment.
            </p>
          </div>
        </section>

        {/* Section 4 — AI steps */}
        <section id="ai-steps" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where to Place AI Steps</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Adding an AI node to a workflow is easy, which is exactly why it needs a rule. Mine is the pull-quote at
              the top: AI steps should summarize and classify, not decide and execute. A summary that is slightly off is
              an annoyance. An automated action based on a misread log is an incident.
            </p>
            <p>
              Think of it as a spectrum. On the left are tasks where a language model shines and the cost of a mistake
              is small. On the right are tasks that need judgment, context the model does not have, or that cannot be
              undone.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-4 text-center text-xs font-semibold uppercase tracking-wide">
              <div className="bg-green-500/20 text-green-200 py-2">Summarize</div>
              <div className="bg-teal-500/20 text-teal-200 py-2">Classify</div>
              <div className="bg-orange-500/20 text-orange-200 py-2">Decide</div>
              <div className="bg-red-500/20 text-red-200 py-2">Execute</div>
            </div>
            <div className="grid grid-cols-4 text-xs text-white/60">
              <div className="p-3 border-r border-white/10">Digest of results, grouped failures, plain-language recap.</div>
              <div className="p-3 border-r border-white/10">Suggest a component, a likely flake bucket, a possible duplicate.</div>
              <div className="p-3 border-r border-white/10">Severity, release go or no-go, who is at fault. Keep for humans.</div>
              <div className="p-3">Closing tickets, rerunning pipelines, deleting data. Gate or avoid.</div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Two more habits help. Always pass the AI step only the data it needs, not everything the workflow fetched.
            And always keep a link back to the source, so whoever reads the summary can check the real log in one
            click. A summary without a source link asks people to trust the model; a summary with one lets them verify
            it.
          </p>
        </section>

        {/* Section 5 — Reliability */}
        <section id="reliability" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Reliability Basics</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Workflows fail like any other software. APIs time out, tokens expire, payloads change shape. The
              difference is that a workflow often fails silently: the digest simply does not arrive, and nobody notices
              for a week. Treat each workflow as a small production system and give it the basics.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                t: "Handle errors explicitly",
                d: "Decide what happens when a node fails: stop, skip the item, or send to an error path. Do not rely on the default without knowing what it is.",
              },
              {
                t: "Make retries safe",
                d: "A retry must not post the same message twice or create the same ticket comment twice. Check whether the action already happened before repeating it.",
              },
              {
                t: "Design for idempotency",
                d: "Running the workflow twice for the same input should produce the same end state. Use stable keys such as build id or ticket id to detect duplicates.",
              },
              {
                t: "Alert when the workflow itself fails",
                d: "Send failures of the automation to a channel someone watches. A broken reminder workflow that fails quietly is worse than no workflow, because people stop checking manually.",
              },
            ].map((item, i) => (
              <div key={item.t} className="flex items-start gap-4 bg-teal-500/5 border border-teal-500/15 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium text-sm">{item.t}</p>
                  <p className="text-white/60 text-sm mt-1">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Security */}
        <section id="security" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Security Basics</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A workflow tool connected to CI, your tracker and your chat holds a lot of keys. That makes it a target
              and a liability if it is set up carelessly. None of the basics are exotic; they are the same rules you
              would apply to any service account, applied consistently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                t: "Use the credential store",
                d: "Keep tokens in the tool's credential management, not pasted into node settings, expressions or notes.",
              },
              {
                t: "Least-privilege tokens",
                d: "A digest workflow needs read access to results, not admin on the tracker. Create separate tokens per workflow where you can.",
              },
              {
                t: "No secrets in workflow text",
                d: "Exported workflows get shared and committed. Check that nothing sensitive is embedded before sharing one.",
              },
              {
                t: "Mind what reaches the AI step",
                d: "Logs can contain tokens, personal data or customer details. Filter or mask before sending text to a model, and know where that model runs.",
              },
            ].map((item) => (
              <div key={item.t} className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                <p className="text-red-300 font-semibold text-sm mb-2">{item.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-orange-300 font-semibold">Also remember: </span>
              text coming from tickets or logs is untrusted input. If an AI step reads it, the content could include
              instructions the model might follow. Another reason to keep AI steps limited to summarizing, with no
              power to take actions on their own.
            </p>
          </div>
        </section>

        {/* Section 7 — When code is better */}
        <section id="when-code" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Code className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">When Code Is Better</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Visual workflows are wonderful for wiring services together. They become painful when they turn into
              programs. If you find yourself with many branches, nested loops, long custom code nodes and complex data
              reshaping, you have built software inside a tool that was not designed to test or review it well.
            </p>
            <p>
              As a QA engineer, my test for this is simple: does this logic need tests? If the answer is yes, it
              belongs in a repository, with version control, code review and automated tests. The workflow can still
              call it, but the logic itself should live where you can verify it.
            </p>
            <p>
              There is a quieter version of the same problem: ownership. A workflow built by one enthusiastic person
              on a canvas nobody else opens becomes a single point of failure the day that person goes on leave. Give
              each workflow a named owner, a one-paragraph description of what it does, and a place in the team's
              documentation. If a workflow is important enough to miss, it is important enough to document.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Situation</th>
                  <th className="text-left px-5 py-3 font-semibold">Better fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white/70">Connect CI, tracker and chat with light filtering</td>
                  <td className="px-5 py-3 text-orange-300 font-medium">Workflow</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/70">Scheduled reminders and digests</td>
                  <td className="px-5 py-3 text-orange-300 font-medium">Workflow</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/70">Complex business rules or calculations</td>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Code in a repo</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/70">Heavy data processing across many records</td>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Code in a repo</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/70">Anything that needs its own test suite</td>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Code in a repo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Workflow automation is not glamorous, and that is its strength. It does not promise to replace testers or
              make release decisions. It takes the copying, summarizing and nudging off people's plates so they can
              spend that attention on testing.
            </p>
            <p>
              Start with one read-only workflow, probably the nightly digest. Put an AI step in it only to summarize,
              keep a link to the source, and add error alerts from day one. Once it has run reliably for a while and
              the team relies on it, build the next one. Keep judgment with people and keep complex logic in code.
            </p>
            <p>
              The payoff is not only time. It is attention. Every reminder you no longer have to send and every summary
              you no longer have to write is a small interruption removed from your day, and testing is work that
              rewards uninterrupted focus more than most.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-orange-200 text-lg font-semibold">
              A workflow that quietly saves ten minutes a day pays for itself by Friday.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Drowning in QA glue work?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about workflows that take the copying and chasing off your plate, with AI in the right place
            and humans in charge of the judgment.
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

export default N8nForQATeamsBlog;
