import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Timer,
  Scale,
  Bot,
  Users,
  ListOrdered,
  Layers,
  MessageSquare,
  CircleCheck,
  Github,
} from "lucide-react";

/**
 * Blog: Risk-Based Testing Gets a Co-Pilot: Deciding What to Test When Time Runs Out
 * Slug: /blog/risk-based-testing-with-an-ai-copilot
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

const RiskBasedTestingCopilotBlog = () => {
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
    title: "Risk-Based Testing Gets a Co-Pilot: Deciding What to Test When Time Runs Out | Digital Jaydeep",
    description:
      "You never have time to test everything. AI can summarize changes, list impacted areas and propose test ideas, but only you know what a failure would cost the business. A practical likelihood x impact approach to risk-based testing with an AI co-pilot.",
    keywords:
      "risk-based testing, test strategy, AI copilot, test prioritization, release testing, likelihood and impact, residual risk, QA planning",
    canonicalUrl: "https://jaydeepai.github.io/blog/risk-based-testing-with-an-ai-copilot",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Risk-Based Testing Gets a Co-Pilot: Deciding What to Test When Time Runs Out",
      datePublished: "2026-10-28",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "release-week", label: "The Reality of Release Week" },
    { id: "risk-model", label: "A Simple Risk Model: Likelihood x Impact" },
    { id: "ai-inputs", label: "Inputs AI Can Help With" },
    { id: "human-inputs", label: "Inputs Only Humans Have" },
    { id: "ranked-list", label: "Build the Ranked List and Cut the Line" },
    { id: "depth", label: "Choose the Right Depth per Risk" },
    { id: "residual-risk", label: "Communicate Residual Risk" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  // Rows are impact (high at top), columns are likelihood (low to high)
  const matrix = [
    {
      impact: "High impact",
      cells: [
        {
          level: "Medium",
          cls: "bg-amber-500/15 border-amber-500/30",
          labelCls: "text-amber-300",
          items: ["Login flow (unchanged, but everyone uses it)"],
        },
        {
          level: "High",
          cls: "bg-red-500/15 border-red-500/30",
          labelCls: "text-red-300",
          items: ["Invoice export (small change in shared code)"],
        },
        {
          level: "Critical",
          cls: "bg-red-500/25 border-red-500/50",
          labelCls: "text-red-200",
          items: ["Checkout payment step (rewritten this sprint)", "Tax calculation rule change"],
        },
      ],
    },
    {
      impact: "Medium impact",
      cells: [
        {
          level: "Low",
          cls: "bg-green-500/10 border-green-500/25",
          labelCls: "text-green-300",
          items: ["Profile settings page"],
        },
        {
          level: "Medium",
          cls: "bg-amber-500/15 border-amber-500/30",
          labelCls: "text-amber-300",
          items: ["Search filters (minor UI tweak)"],
        },
        {
          level: "High",
          cls: "bg-red-500/15 border-red-500/30",
          labelCls: "text-red-300",
          items: ["Email notification templates (new provider)"],
        },
      ],
    },
    {
      impact: "Low impact",
      cells: [
        {
          level: "Low",
          cls: "bg-green-500/10 border-green-500/25",
          labelCls: "text-green-300",
          items: ["Help page copy"],
        },
        {
          level: "Low",
          cls: "bg-green-500/10 border-green-500/25",
          labelCls: "text-green-300",
          items: ["Footer links"],
        },
        {
          level: "Medium",
          cls: "bg-amber-500/15 border-amber-500/30",
          labelCls: "text-amber-300",
          items: ["Admin dashboard chart colors"],
        },
      ],
    },
  ];

  const plan = [
    {
      slot: "Day 1, morning",
      focus: "Checkout payment step",
      depth: "Exploratory session plus targeted automated checks",
      why: "Critical cell: rewritten code on the money path",
    },
    {
      slot: "Day 1, afternoon",
      focus: "Tax calculation rule change",
      depth: "Rule-driven boundary cases written from the requirement",
      why: "Critical cell: a wrong number is a compliance problem",
    },
    {
      slot: "Day 2, morning",
      focus: "Invoice export and email templates",
      depth: "Focused regression on the changed paths, one exploratory pass",
      why: "High cells: shared code and a new external dependency",
    },
    {
      slot: "Day 2, early afternoon",
      focus: "Full automated regression run",
      depth: "Existing suite, failures triaged the same day",
      why: "Safety net for the stable, unchanged areas",
    },
    {
      slot: "Day 2, late afternoon",
      focus: "Residual-risk note to stakeholders",
      depth: "Written summary of covered, partly covered and not covered",
      why: "The decision belongs to the people who carry the risk",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Risk-Based Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Test Strategy
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Risk-Based Testing Gets a Co-Pilot: Deciding What to Test When Time Runs Out
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The model can tell you what changed. It cannot tell you what a failure would cost. That second part is the
          whole job.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 28, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
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
          "Coverage is what you tested. Risk is what you should have."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every tester eventually learns the same uncomfortable truth: you will never test everything. Not because
            you are slow, and not because the team is careless, but because the number of things that could go wrong in
            a real product is effectively unlimited, and the calendar is not. The question was never "did we test it
            all?" It was always "did we test the right things, and do we know what we skipped?"
          </p>
          <p>
            Risk-based testing is the discipline of answering that question on purpose instead of by accident. It is
            not new. What is new is that AI assistants can now do a good share of the reading and summarizing that used
            to eat the first day of release week. That is genuinely useful. It is also dangerous, because a tidy
            AI-generated list of "areas to test" looks like a risk assessment while missing the most important input:
            what a failure would actually cost. This article is about using the co-pilot for what it is good at and
            keeping your hands on the part it cannot reach.
          </p>
        </div>

        {/* Section 1 — Release week */}
        <section id="release-week" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Timer className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Reality of Release Week</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Release week has a shape most QA engineers recognize. The date is fixed, usually by someone outside the
              team. The scope is not, because features land late, a "small" fix touches a shared module, and a
              dependency gets upgraded on Tuesday. The surface area you could test grows while the time you have
              shrinks.
            </p>
            <p>
              Under that pressure, teams fall back on one of two default strategies, and both are bad. The first is
              "test in the order things were built": start at the top of the ticket list and keep going until time runs
              out. Whatever happens to sit at the bottom of the list gets no attention, regardless of how important it
              is. The second is "run everything and hope": kick off the full regression suite, treat green as done, and
              assume the suite was designed for this specific release. It usually was not.
            </p>
            <p>
              Both strategies share the same flaw. They make the decision about what not to test implicitly, by
              accident, and nobody writes it down. When something escapes, the post-mortem discovers that the risky
              area was never looked at, and nobody can say whether that was a choice or an oversight.
            </p>
            <p>
              Risk-based testing flips that. You decide explicitly what matters most, test that first and deepest, and
              make the leftover risk visible to the people who own the release decision. It does not give you more
              time. It makes sure the time you have is spent where a miss would hurt most.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-green-300 font-semibold">The shift: </span>
              you are always choosing what not to test. Risk-based testing just makes you choose with your eyes open.
            </p>
          </div>
        </section>

        {/* Section 2 — Risk model */}
        <section id="risk-model" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Simple Risk Model: Likelihood x Impact</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              You do not need a heavy framework. You need two questions per item, answered honestly, on a scale small
              enough that people can agree on it quickly. I use three levels for each: low, medium, high.
            </p>
            <p>
              <span className="text-white font-medium">Likelihood</span> asks how probable it is that this area is
              broken. The useful inputs are concrete: how big the change is, how complex the code or logic is, how many
              other things depend on it, whether it touches an integration or a third-party service, and whether this
              area has a history of defects. A rewritten payment step is high likelihood. A copy change on a help page
              is low.
            </p>
            <p>
              <span className="text-white font-medium">Impact</span> asks how bad it would be if it is broken. The
              inputs here are about consequences: how many users would hit it, whether money moves through it, whether
              it affects safety, reputation or legal and compliance obligations, and whether the damage is reversible.
              A wrong tax figure on an invoice is high impact even if only a few customers ever see it. A misaligned
              icon is low impact even if everyone sees it.
            </p>
            <p>
              Multiply the two, or simply place the item in a grid, and you get a priority. The point of the grid is
              not mathematical precision. It is to force a conversation about two different things that people tend to
              blur together. "This feature is complicated" is a likelihood statement. "This feature is important" is an
              impact statement. You need both.
            </p>
          </div>

          {/* Signature visual — 3x3 matrix */}
          <div className="my-8 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-widest text-green-300 font-semibold mb-1">
              Likelihood x Impact Matrix
            </p>
            <p className="text-white/40 text-xs mb-5">Illustrative release, generic example items</p>

            <div className="overflow-x-auto">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 text-xs min-w-[560px]">
              <div />
              <div className="text-center text-white/40 uppercase tracking-wide font-semibold py-1">Low likelihood</div>
              <div className="text-center text-white/40 uppercase tracking-wide font-semibold py-1">Medium likelihood</div>
              <div className="text-center text-white/40 uppercase tracking-wide font-semibold py-1">High likelihood</div>

              {matrix.map((row) => (
                <div key={row.impact} className="contents">
                  <div className="flex items-center pr-2 w-20 text-white/40 uppercase tracking-wide font-semibold leading-tight">
                    {row.impact}
                  </div>
                  {row.cells.map((cell, ci) => (
                    <div key={ci} className={`rounded-xl border p-3 min-h-[96px] ${cell.cls}`}>
                      <p className={`font-semibold uppercase tracking-wide mb-2 ${cell.labelCls}`}>{cell.level}</p>
                      <ul className="space-y-1">
                        {cell.items.map((it) => (
                          <li key={it} className="text-white/70 leading-snug">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5 text-xs">
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-200">Critical / High: test first, deepest</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300">Medium: targeted checks</span>
              <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-300">Low: rely on regression</span>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Notice the login flow in the top-left cell. Nothing changed there, so likelihood is low, but if it breaks
            nobody can use the product. That is why "only test what changed" is not a complete strategy either. Low
            likelihood times high impact still earns a quick check, and usually your automated regression suite is the
            right tool for it.
          </p>
        </section>

        {/* Section 3 — AI inputs */}
        <section id="ai-inputs" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Inputs AI Can Help With</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Most of the likelihood side is reading work, and reading is where AI assistants are strongest. Before a
              risk session, I want to know what changed, where it changed, and what that code is connected to.
              Gathering that by hand means scrolling through merged pull requests, release notes and ticket comments.
              An assistant can compress that into a first draft in minutes.
            </p>
            <p>Four jobs I am comfortable handing to a co-pilot:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Summarize the change set",
                desc: "Give it the list of merged changes or the release notes and ask for a plain-language summary grouped by feature area. You get a map of the release instead of a pile of commits.",
              },
              {
                title: "List impacted areas",
                desc: "Ask which screens, APIs or shared modules a change is likely to touch. It is good at spotting that a utility used in five places was edited, which is exactly the kind of hidden blast radius humans miss under pressure.",
              },
              {
                title: "Point at past defect themes you provide",
                desc: "Paste a summary of past defects for the area (sanitized, no customer data) and ask which themes might apply to this release. It can only work with the history you give it, and that is fine.",
              },
              {
                title: "Draft test charters",
                desc: "For each risky item, ask for an exploratory charter: a mission, areas to probe and questions to ask. It turns a vague 'test checkout' into a focused session plan you can edit.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-5">
                <p className="text-blue-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two cautions. First, the model only sees what you show it. If a change was made through a configuration
              flag or a database script that never appeared in the material you pasted, the summary will not mention
              it. Treat the output as a draft map, and ask the developers "what is missing from this list?" Second, the
              model tends to make everything sound equally important. A summary that lists twelve areas in confident,
              uniform prose has not prioritized anything. Prioritizing is the next step, and it needs inputs the model
              does not have.
            </p>
          </div>
        </section>

        {/* Section 4 — Human inputs */}
        <section id="human-inputs" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Inputs Only Humans Have</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Impact is a business judgment, and almost none of the information needed to make it lives in the code or
              the tickets. It lives in people's heads, in contracts, in support conversations and in the history of the
              organization. A co-pilot can ask good questions about impact. It cannot answer them.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Human-only input</th>
                  <th className="text-left px-5 py-3 font-semibold">Why the model cannot know it</th>
                  <th className="text-left px-5 py-3 font-semibold">Who usually knows</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Business criticality</td>
                  <td className="px-5 py-3 text-white/70">Which flows bring in revenue or keep customers is not written in code</td>
                  <td className="px-5 py-3 text-white/50">Product owner, business analyst</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Customer promises</td>
                  <td className="px-5 py-3 text-white/70">A feature promised to a key customer for this release looks like any other ticket</td>
                  <td className="px-5 py-3 text-white/50">Account and delivery managers</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Regulatory exposure</td>
                  <td className="px-5 py-3 text-white/70">Which fields, reports or retention rules carry legal weight depends on your domain and region</td>
                  <td className="px-5 py-3 text-white/50">Compliance, legal, domain experts</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Political context</td>
                  <td className="px-5 py-3 text-white/70">A feature under executive spotlight, or one that failed publicly last time, raises the cost of another miss</td>
                  <td className="px-5 py-3 text-white/50">Team lead, engineering manager</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              That last row is uncomfortable to write down, but it is real. If a report broke in front of an important
              customer last quarter, a second failure in the same report will cost far more trust than the first, even
              if the defect itself is minor. No model reading your repository will ever know that.
            </p>
            <p>
              The practical move is simple: run a short impact conversation with the people who carry the consequences.
              Show them the AI-drafted list of changed areas and ask one question per item: "if this were broken in
              production tomorrow, how bad would that be, and for whom?" Fifteen focused minutes with a product owner
              will improve your risk ranking more than any amount of extra summarizing.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-purple-300 font-semibold">The split: </span>
              AI informs likelihood. Humans own impact. If your risk list was produced without anyone answering the
              impact question, it is a change log, not a risk assessment.
            </p>
          </div>
        </section>

        {/* Section 5 — Ranked list */}
        <section id="ranked-list" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Build the Ranked List and Cut the Line</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Once every item has a likelihood and an impact, the mechanics are almost boring, and that is the point.
              Score each item (low = 1, medium = 2, high = 3, multiply), sort the list from highest to lowest, and
              estimate roughly how long a sensible test of each item takes. Then walk down the list adding up time until
              you reach the time you actually have. Draw a line there.
            </p>
            <p>
              Everything above the line gets tested at the depth its risk deserves. Everything below the line does not,
              or gets only what the automated suite already covers. The line is not a failure. It is the most honest
              artifact your team will produce all week.
            </p>
            <p>
              Here is what a time-boxed plan looks like when the matrix above meets two remaining days. Treat it as an
              illustrative shape, not a template to copy hour for hour.
            </p>
          </div>

          {/* Signature visual — time-boxed plan */}
          <div className="rounded-2xl border border-green-500/25 overflow-hidden mb-6">
            <div className="bg-green-500/10 px-5 py-3 flex items-center justify-between">
              <p className="text-green-300 text-sm font-semibold">Time-boxed test plan: two days left</p>
              <p className="text-white/40 text-xs">Illustrative</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                    <th className="text-left px-5 py-3 font-semibold">Slot</th>
                    <th className="text-left px-5 py-3 font-semibold">Focus</th>
                    <th className="text-left px-5 py-3 font-semibold">Depth</th>
                    <th className="text-left px-5 py-3 font-semibold">Why here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {plan.map((p) => (
                    <tr key={p.slot}>
                      <td className="px-5 py-3 text-green-300 font-mono text-xs whitespace-nowrap">{p.slot}</td>
                      <td className="px-5 py-3 text-white font-medium">{p.focus}</td>
                      <td className="px-5 py-3 text-white/70">{p.depth}</td>
                      <td className="px-5 py-3 text-white/50">{p.why}</td>
                    </tr>
                  ))}
                  <tr className="bg-red-500/5">
                    <td className="px-5 py-3 text-red-300 font-mono text-xs whitespace-nowrap">Below the line</td>
                    <td className="px-5 py-3 text-white font-medium">Profile settings, help copy, footer, chart colors</td>
                    <td className="px-5 py-3 text-white/70">Automated regression only, no manual pass</td>
                    <td className="px-5 py-3 text-white/50">Low score; documented as not tested by hand</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The most important row is the last one. Write down what you chose not to test and why. "Profile settings
              were not tested manually because nothing in that area changed and its impact is medium; automated checks
              passed" is a defensible decision. Silence is not. If something below the line escapes, the written record
              turns a blame conversation into a calibration conversation: was our scoring wrong, or was it a reasonable
              bet that did not pay off?
            </p>
            <p>
              AI can help here too, in a supporting role. Once you have the scored list, ask it to check for items that
              look under-scored given the change summary, or to point out dependencies between items you ranked far
              apart. Treat its comments as a second pair of eyes on the list, not as a reranking.
            </p>
          </div>
        </section>

        {/* Section 6 — Depth */}
        <section id="depth" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Choose the Right Depth per Risk</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Ranking tells you the order. It does not tell you the method. A common mistake is to give every item
              above the line the same treatment, usually "run the related automated tests and click around a bit".
              Different risks deserve different kinds of attention.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                tier: "Stable, low-change areas",
                method: "Automated regression",
                desc: "Let the existing suite carry these. Your job is to triage failures quickly, not to re-test by hand what the automation already checks every run.",
                cls: "border-green-500/20 bg-green-500/5",
                chip: "bg-green-500/15 text-green-300",
              },
              {
                tier: "New or heavily changed, risky areas",
                method: "Exploratory sessions",
                desc: "Automated tests only check what someone thought of in advance. New code needs a human probing it with a charter, looking for the behavior nobody specified. This is where AI-drafted charters save real time.",
                cls: "border-teal-500/20 bg-teal-500/5",
                chip: "bg-teal-500/15 text-teal-300",
              },
              {
                tier: "Critical paths",
                method: "Extra checks on top",
                desc: "Money, data integrity, security and compliance flows get both: automated checks plus deliberate boundary and negative cases written from the requirement, and a second person reviewing the result.",
                cls: "border-red-500/20 bg-red-500/5",
                chip: "bg-red-500/15 text-red-300",
              },
            ].map((t) => (
              <div key={t.tier} className={`rounded-xl border p-5 ${t.cls}`}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <p className="text-white font-semibold text-sm">{t.tier}</p>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${t.chip}`}>{t.method}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              This is also where AI-generated tests deserve extra suspicion. It is tempting to ask a model to "write
              tests for the tax calculation change" and drop them into the critical path. But the expected values on a
              critical path must come from the requirement, not from the model reading the implementation. Use the
              co-pilot to scaffold the cases; write the expectations yourself.
            </p>
            <p>
              Depth also includes who looks. For the highest-risk item, a second tester or a developer pairing on the
              exploratory session catches a different class of problems than one person alone. That is a cheap
              investment for the one or two items where a miss would genuinely hurt.
            </p>
          </div>
        </section>

        {/* Section 7 — Residual risk */}
        <section id="residual-risk" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Communicate Residual Risk</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Testing does not end with a test run. It ends with a decision, and the release decision usually belongs to
              someone who did not see your matrix. Your last job is to hand them a plain statement of what they are
              shipping. Not a pass rate. Not a dashboard screenshot. A short, honest summary in words they can act on.
            </p>
            <p>A useful residual-risk note has three parts:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
              <p className="text-green-300 text-xs uppercase tracking-wide font-semibold mb-2">Covered</p>
              <p className="text-white/70 text-sm leading-relaxed">
                The critical and high items, what was done for each, and what was found and fixed.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-300 text-xs uppercase tracking-wide font-semibold mb-2">Partly covered</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Items tested at reduced depth, with the specific gap stated: "happy path only", "one browser only".
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
              <p className="text-red-300 text-xs uppercase tracking-wide font-semibold mb-2">Not covered</p>
              <p className="text-white/70 text-sm leading-relaxed">
                What was below the line, why, and any known open defects with their likely impact.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI is a decent editor for this note. Give it your raw bullet points and ask for a concise summary for a
              non-technical reader. Then read every sentence, because a model smoothing your notes will happily turn
              "not tested" into "lower priority" and "partly covered" into "covered". Softened language is exactly what
              you are trying to avoid here.
            </p>
            <p>
              The tone matters. You are not asking for permission or covering yourself. You are giving decision-makers
              the information they need to accept the risk, delay the release, or ask for one more targeted check. That
              is a stronger position for a QA engineer than "everything passed", and over time it builds the kind of
              trust that gets you a seat in the release conversation earlier.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
            <p className="text-white font-semibold mb-4">Before you hand over the note, check that...</p>
            <div className="space-y-3">
              {[
                "every critical item has a named test activity and a result",
                "every item below the line is listed, not just implied",
                "open defects are described by impact, not by ticket number alone",
                "nothing says 'covered' when it means 'automated tests passed'",
                "the reader can tell what decision you are asking them to make",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI makes the first half of risk-based testing faster. Summarizing a release, mapping the blast radius of
              a change and drafting charters used to cost a day of reading. Now it costs an hour of reviewing. That is a
              real gain, and I would not go back.
            </p>
            <p>
              But speed on the reading side makes the judgment side more visible, not less. The co-pilot can tell you
              that the tax module changed. It cannot tell you that a wrong tax figure would trigger a compliance issue,
              or that the reporting screen is the one your biggest customer watches. Impact is still a human call, and
              the line on the ranked list is still a human decision that someone has to own and explain.
            </p>
            <p>
              Try it on your next release: draft the change summary with AI, run a short impact conversation with your
              product owner, place each item in the matrix, draw the line, and send a three-part residual-risk note. You
              will test fewer things than "everything", and you will know exactly why.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-green-200 text-lg font-semibold">Testing less is fine. Testing blindly is not.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Facing a release with more risk than time?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about building a risk-first test strategy where AI does the reading and people make the calls.
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

export default RiskBasedTestingCopilotBlog;
