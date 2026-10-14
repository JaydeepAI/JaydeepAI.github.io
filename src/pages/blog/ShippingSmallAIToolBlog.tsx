import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Lightbulb,
  Minimize2,
  Cpu,
  Coins,
  ShieldAlert,
  FlaskConical,
  Ban,
  SquareCheckBig,
  ArrowRight,
} from "lucide-react";

/**
 * Blog: Shipping a Small AI Tool as a Solo Builder: Lessons From the Idea Stage
 * Slug: /blog/shipping-a-small-ai-tool-as-a-solo-builder
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

const ShippingSmallAIToolBlog = () => {
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
    title: "Shipping a Small AI Tool as a Solo Builder: Lessons From the Idea Stage | Digital Jaydeep",
    description:
      "Before you build an AI product, shrink it. A scoping checklist, a risk table covering hallucination, cost, latency, privacy and abuse, and kill criteria for solo builders turning a workday annoyance into a small, honest tool.",
    keywords:
      "solo builder, AI product, scoping, indie hacker AI, AI risk table, kill criteria, LLM cost, AI side project",
    canonicalUrl: "https://jaydeepai.github.io/blog/shipping-a-small-ai-tool-as-a-solo-builder",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Shipping a Small AI Tool as a Solo Builder: Lessons From the Idea Stage",
      datePublished: "2026-11-07",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "own-pain", label: "Start From Your Own Pain" },
    { id: "shrink-scope", label: "Shrink the Scope Until It Feels Embarrassing" },
    { id: "ai-role", label: "Decide the AI's Role (and Where Plain Code Wins)" },
    { id: "cost-model", label: "Know the Cost Model Before You Promise Anything" },
    { id: "risk-table", label: "The Risk Table" },
    { id: "evaluate", label: "Evaluate Before You Share" },
    { id: "kill-criteria", label: "Kill Criteria: Decide in Advance" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const scopingChecklist = [
    "I can name the one person this is for, and it might be me.",
    "I can describe the workflow in a single sentence with one input and one output.",
    "I have done the task by hand enough times to know what a good result looks like.",
    "A script or spreadsheet version exists, or I know exactly why it is not enough.",
    "I know which single step actually needs a model, and which steps are plain code.",
    "I have a rough cost per use and a monthly ceiling I am willing to pay.",
    "I have listed what data goes into the model and confirmed none of it is someone else's private data.",
    "I have a small set of test inputs with known good answers.",
    "I have written down what result would make me stop.",
  ];

  const costSketch = `// Back-of-envelope cost sketch (illustrative; plug in your provider's current prices)

inputTokensPerRun   = prompt + context + user input      // measure, don't guess
outputTokensPerRun  = typical response length            // measure, don't guess
costPerRun          = inputTokensPerRun  * inputPrice
                    + outputTokensPerRun * outputPrice

runsPerUserPerDay   = honest estimate (then double it)
monthlyCost         = costPerRun * runsPerUserPerDay * users * 30

// Questions to answer before sharing:
//  - What is my monthly ceiling, and what happens when it is hit?
//  - Which runs can be cached, batched or skipped?
//  - Does a smaller model pass my evaluation set?
//  - Are retries counted? (Failed calls often still cost money.)`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Solo Builder
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Scoping
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Shipping a Small AI Tool as a Solo Builder: Lessons From the Idea Stage
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The hardest part of building an AI tool alone is not the model. It is saying no to everything that is not
          the first useful version.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 7, 2026
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
                  className="flex items-center gap-3 text-white/70 hover:text-red-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-red-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Your first AI product should be small enough to fail cheaply and useful enough to tell you something."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Let me be upfront about what this article is not. It is not a launch story. I am not going to tell you
            about users, revenue or a growth chart, because that is not where I am. This is about the stage before all
            of that: the idea stage, where a solo builder decides what to build, how small to make it and how to know
            whether it deserves more time. It is the stage most build-in-public content skips, and it is where most
            side projects quietly die.
          </p>
          <p>
            Building with AI makes this stage both easier and more dangerous. Easier, because a working prototype is
            now an evening away. More dangerous, because a prototype that impresses you on three examples can hide
            problems with accuracy, cost and privacy that only appear when someone else uses it. Everything below is
            about shrinking the idea until those problems become visible early, while they are still cheap.
          </p>
        </div>

        {/* Section 1 */}
        <section id="own-pain" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start From Your Own Pain</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The best starting point for a solo AI tool is a task you do repeatedly and understand deeply. Not a
              market you read about, not a trend, not "an AI for X". A specific, recurring annoyance in your own week.
              For a QA engineer that might be turning raw test-run output into a readable summary, drafting the first
              version of a bug report from scattered notes, or sorting a long list of failures into rough groups.
            </p>
            <p>
              Your own pain gives you three advantages nobody else has. You know what a good result looks like, so you
              can judge output without guessing. You have real examples, so you can build an evaluation set on day
              one. And you are the first user, so feedback costs nothing and arrives instantly.
            </p>
            <p>
              The trap is the opposite: building for an imagined user whose work you have never done. You end up
              optimizing for the demo instead of the job, and you have no reliable way to tell whether the output is
              actually useful.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">A quick filter: </span>
              if you cannot write down three real examples of the input and the output you wish you had, the idea is
              not ready to build. Collect examples first. The act of collecting them often reshapes the idea.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="shrink-scope" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Minimize2 className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Shrink the Scope Until It Feels Embarrassing</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Every idea starts too big. "A tool that helps QA teams with reporting" contains a dozen products. The
              useful move is to shrink it to one user, one workflow and one outcome. One user means you, or one
              specific colleague. One workflow means a single path from input to output. One outcome means a single
              artifact the user takes away, such as a summary, a draft or a list.
            </p>
            <p>
              Then do it without the product. Do it by hand a few more times, paying attention to which steps are
              mechanical and which need judgment. Then write a script. A command-line script that reads a file, calls a
              model once and prints the result teaches you most of what a web app would, at a fraction of the effort.
              No login, no database, no UI, no deployment. If the script is not useful to you, a polished app would not
              have been either.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            {[
              { step: "By hand", desc: "Learn what good looks like" },
              { step: "Script", desc: "One input, one call, one output" },
              { step: "Shared script", desc: "One trusted colleague tries it" },
              { step: "Small tool", desc: "Only now: UI, storage, polish" },
            ].map((item, i, arr) => (
              <Fragment key={item.step}>
                <div className="w-full md:flex-1 bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-center">
                  <p className="text-orange-300 font-semibold text-sm">{item.step}</p>
                  <p className="text-white/60 text-xs mt-1">{item.desc}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-white/30 shrink-0 rotate-90 md:rotate-0" />}
              </Fragment>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Before moving past the script stage, run the idea through this checklist. It is deliberately strict; any
            unchecked line is a reason to stay small a little longer.
          </p>

          {/* Signature visual 1: scoping checklist */}
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <SquareCheckBig className="w-5 h-5 text-red-300" />
              <p className="text-red-200 font-semibold">Scoping checklist: before you build anything with a UI</p>
            </div>
            <div className="space-y-3">
              {scopingChecklist.map((item, i) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded border border-red-400/50 text-red-300/70 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-white/75 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="ai-role" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Decide the AI&apos;s Role (and Where Plain Code Wins)</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A common mistake in AI side projects is letting the model do everything. Parsing a file, counting rows,
              formatting dates, applying a fixed rule: all of these are cheaper, faster and more reliable in plain
              code. Every step you hand to a model becomes probabilistic, harder to test and more expensive to run.
            </p>
            <p>
              Models genuinely earn their place where the input is messy natural language and the task is fuzzy:
              summarizing, classifying text that does not follow a pattern, rewriting for tone, extracting meaning from
              inconsistent notes. A useful design rule is to make the model a single, well-defined step in a pipeline
              of ordinary code, with deterministic code before it (cleaning, redacting, trimming) and after it
              (validating the format, checking required fields).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/50 font-semibold mb-3">Plain code wins</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Parsing structured files and logs</li>
                <li>Counting, sorting, filtering, totals</li>
                <li>Fixed business rules and thresholds</li>
                <li>Formatting and templating output</li>
                <li>Redacting known secret patterns</li>
                <li>Validating the model&apos;s output shape</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-red-300 font-semibold mb-3">A model earns its place</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Summarizing long, messy text</li>
                <li>Grouping failures that are worded differently</li>
                <li>Turning rough notes into a structured draft</li>
                <li>Rewriting for clarity or tone</li>
                <li>Suggesting categories a rule cannot express</li>
                <li>Explaining unfamiliar content in plain words</li>
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            The smaller the model&apos;s role, the easier everything else in this article becomes. Cost shrinks
            because fewer tokens are sent. Testing becomes easier because only one step is non-deterministic. And when
            something goes wrong, you know exactly where to look.
          </p>
        </section>

        {/* Section 4 */}
        <section id="cost-model" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Coins className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Know the Cost Model Before You Promise Anything</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Traditional software has a comforting property: once it is built, an extra user costs very little. AI
              tools built on hosted models do not work that way. Most model providers charge by usage, typically by the
              amount of text going in and coming out, so your costs grow with every run. A tool that is cheap for you
              alone can become expensive if a few enthusiastic people start using it all day.
            </p>
            <p>
              You do not need precise numbers at the idea stage, but you do need the shape. Measure how much text a
              typical run sends and receives, look up the current pricing for the model you are using, and multiply it
              out. Then ask what happens at ten times the usage you expect, because the first users of a free tool
              rarely behave the way you planned.
            </p>
          </div>

          <div className="bg-black/40 border border-amber-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-amber-300/70 font-mono">
              cost-sketch.txt — illustrative pseudo-code
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-amber-100/90 font-mono">
              <code>{costSketch}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The practical consequence: do not promise anything free and unlimited before you understand this shape.
              Set a hard spending limit with your provider if it offers one, add a simple usage cap in your own code,
              and decide in advance what the tool does when the cap is hit. A polite "daily limit reached" message is
              far better than a surprise bill.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="risk-table" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Risk Table</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Every AI tool, however small, carries the same five categories of risk. Writing them down with a
            mitigation for each takes half an hour and turns vague worry into a to-do list. This is the table I would
            fill in before showing a tool to anyone else.
          </p>

          {/* Signature visual 2: risk table */}
          <div className="overflow-x-auto rounded-2xl border border-red-500/25 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-red-500/10 text-red-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Risk</th>
                  <th className="text-left px-5 py-3 font-semibold">What can go wrong</th>
                  <th className="text-left px-5 py-3 font-semibold">Mitigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-red-300 font-semibold">Hallucination</td>
                  <td className="px-5 py-3 text-white/70">Confident output that is wrong, or details that were never in the input</td>
                  <td className="px-5 py-3 text-white/60">Ground the prompt in the user&apos;s input only; validate output in code; label results as drafts; keep a human review step</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-300 font-semibold">Cost</td>
                  <td className="px-5 py-3 text-white/70">Usage grows faster than expected; retries and long inputs multiply spend</td>
                  <td className="px-5 py-3 text-white/60">Provider spending limit; per-user caps; trim inputs; cache repeated work; try a smaller model against your evaluation set</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-300 font-semibold">Latency</td>
                  <td className="px-5 py-3 text-white/70">Slow responses make the tool feel broken; timeouts leave users stuck</td>
                  <td className="px-5 py-3 text-white/60">Shorter prompts; stream output where possible; sensible timeouts with a clear message; run long jobs in the background</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-300 font-semibold">Privacy</td>
                  <td className="px-5 py-3 text-white/70">Users paste personal, customer or employer data that ends up with a third party</td>
                  <td className="px-5 py-3 text-white/60">Say clearly what is sent where; redact known patterns before the call; store as little as possible; read your provider&apos;s data terms</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-red-300 font-semibold">Abuse</td>
                  <td className="px-5 py-3 text-white/70">Someone uses your tool as a free general-purpose model, or injects instructions through input</td>
                  <td className="px-5 py-3 text-white/60">Narrow the task in the system prompt; rate limits; input size limits; treat user text as data, not instructions; keep keys server-side</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two of these deserve extra emphasis for solo builders. First, never ship a model API key inside client
              code where anyone can read it; route calls through a small backend you control. Second, if your tool is
              aimed at work tasks, assume people will paste work data into it. Your privacy story has to be honest
              about where that data goes, even if your first user is only you.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="evaluate" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Evaluate Before You Share</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Here is where a testing background becomes an unfair advantage. Most people judge an AI prototype by
              trying it a few times and feeling impressed. A tester knows that a handful of happy-path runs proves very
              little. Before sharing the tool, build a small evaluation set: a list of real inputs, each with a short
              description of what a good output must contain and must not contain.
            </p>
            <p>
              It does not need to be large. A couple of dozen carefully chosen cases, covering typical inputs, edge
              cases and a few deliberately awkward ones, will tell you more than any amount of casual clicking. Run
              the whole set every time you change the prompt or the model, and look at the failures, not just the
              overall impression.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { title: "Typical cases", desc: "The inputs you see every week. These must work reliably or nothing else matters." },
              { title: "Edge cases", desc: "Empty input, very long input, mixed languages, unusual formatting." },
              { title: "Failure examples", desc: "Keep every bad output you have seen. Each one becomes a permanent test case." },
              { title: "Hostile input", desc: "Text that tries to change the tool's instructions or get it to do something unrelated." },
              { title: "Human check", desc: "Read a sample of outputs yourself. Scores and rules miss things a careful reader notices." },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 bg-rose-500/5 border border-rose-500/15 rounded-xl p-4">
                <span className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            The evaluation set is also your best defense against a common solo-builder mistake: changing the prompt
            to fix one annoying example and silently breaking five others. With a fixed set of cases, you see the
            trade-off immediately instead of discovering it weeks later.
          </p>
        </section>

        {/* Section 7 */}
        <section id="kill-criteria" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Ban className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Kill Criteria: Decide in Advance</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Solo projects rarely fail with a clear moment of failure. They fade. You stop opening the repo, you tell
              yourself you will get back to it, and months later it is still half-finished. The antidote is deciding,
              before you start, what result means stop and what result means keep going. Write it down while you are
              still objective, because once you have invested evenings into something, every result starts to look
              encouraging.
            </p>
            <p>
              Kill criteria are not pessimism. They are what make it safe to start lots of small experiments, because
              each one has a defined end.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-red-300 font-semibold mb-3">Stop if...</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>I stop using it myself after the novelty wears off</li>
                <li>It fails my evaluation set on typical cases after honest prompt work</li>
                <li>Checking its output takes as long as doing the task by hand</li>
                <li>The only workable version needs data I should not be sending to a model</li>
                <li>The realistic cost is more than the value to the people who would use it</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-green-300 font-semibold mb-3">Keep going if...</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>I reach for it without thinking during a normal week</li>
                <li>It passes typical cases and fails in ways I understand</li>
                <li>A colleague uses it a second time without being asked</li>
                <li>The next improvement is obvious, not invented</li>
                <li>The cost shape is clear and acceptable</li>
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Notice that none of these criteria involve vanity signals such as likes on a demo video. The questions are
            about real use, real quality and real cost. Set a date for the decision too. An experiment without a
            deadline is just a hobby with guilt attached.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I&apos;ve Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The idea stage is where a solo builder has the most leverage and the least information. The way to use
              that leverage is to shrink: one user, one workflow, one outcome; a script before an app; a model as one
              step rather than the whole system. Shrinking is what makes the hard questions about accuracy, cost and
              privacy answerable early.
            </p>
            <p>
              A QA background is a real asset here. Thinking in evaluation sets, edge cases and failure modes is
              exactly what keeps an AI prototype honest. Use it before you show anything to anyone, and decide in
              advance what result would make you stop.
            </p>
            <p>
              If you have an idea sitting in a notes app right now, try this: write the one-sentence workflow, collect
              three real examples, and build the script version this weekend. Whatever you learn will be more useful
              than another month of planning.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-red-200 text-lg font-semibold">Ship the smallest thing that can teach you something true.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Turning a workday annoyance into an AI tool?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let&apos;s talk about scoping it small, testing it honestly and deciding what is worth building next.
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

export default ShippingSmallAIToolBlog;
