import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Receipt,
  Type,
  SlidersHorizontal,
  Calculator,
  Flame,
  Gauge,
  Target,
  CircleCheck,
  Github,
} from "lucide-react";

/**
 * Blog: AI Cost Literacy for Engineers: Tokens, Usage Pricing and Surprise Bills
 * Slug: /blog/ai-cost-literacy-for-engineers
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

const AICostLiteracyBlog = () => {
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
    title: "AI Cost Literacy for Engineers: Tokens, Usage Pricing and Surprise Bills | Digital Jaydeep",
    description:
      "AI features and scripts are billed by usage. A small loop, a long prompt or a retry storm can cost far more than you expect. Learn to reason about tokens, cost levers and back-of-envelope estimates before you ship.",
    keywords:
      "AI costs, LLM tokens, usage-based pricing, AI budget, cost estimation, LLM engineering, rate limits, prompt caching",
    canonicalUrl: "https://jaydeepai.github.io/blog/ai-cost-literacy-for-engineers",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "AI Cost Literacy for Engineers: Tokens, Usage Pricing and Surprise Bills",
      datePublished: "2026-11-16",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "engineering-concern", label: "Why Cost Is an Engineering Concern" },
    { id: "tokens", label: "Tokens in Plain Words" },
    { id: "levers", label: "The Cost Levers" },
    { id: "estimate", label: "Estimate Before You Build" },
    { id: "explosions", label: "Common Ways Bills Explode" },
    { id: "controls", label: "Controls That Actually Work" },
    { id: "quality-metric", label: "Cost as a Quality Metric" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const levers = [
    {
      lever: "Input size",
      what: "Everything you send is read and billed: instructions, history, documents, examples.",
      control: "Send only what the task needs. Trim history, filter documents, avoid pasting whole files.",
    },
    {
      lever: "Output size",
      what: "Generated text is billed too, often at a different rate from input.",
      control: "Ask for concise formats, set a maximum output length, request structured fields rather than essays.",
    },
    {
      lever: "Number of calls",
      what: "Cost scales with every request, so per-user and per-event designs multiply quickly.",
      control: "Combine steps where sensible, avoid calling the model for things plain code can do.",
    },
    {
      lever: "Retries",
      what: "Each retry is a full new call. Automatic retries can silently double or triple usage.",
      control: "Cap retries, back off between them, and log every retry so you can see the pattern.",
    },
    {
      lever: "Model choice",
      what: "Larger, more capable models usually cost more per token than smaller ones.",
      control: "Use the smallest model that meets the quality bar for each task; test that bar explicitly.",
    },
    {
      lever: "Caching",
      what: "Repeated identical work, such as the same long instructions or the same question, can often be reused.",
      control: "Cache results for repeated inputs and use any provider caching features where they fit.",
    },
    {
      lever: "Batching",
      what: "Some providers offer cheaper, slower processing for work that doesn't need an instant answer.",
      control: "Move non-urgent jobs like nightly report summaries into batch processing if available.",
    },
  ];

  const tokenDemo = ["The", " test", " failed", " because", " the", " login", " button", " was", " dis", "abled", "."];

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
            AI Costs
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Tokens
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          AI Cost Literacy for Engineers: Tokens, Usage Pricing and Surprise Bills
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The model doesn't know your budget. The loop you wrote around it definitely doesn't.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 16, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
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
          "Every call has a price. Every loop multiplies it."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Most engineers have a rough instinct for what things cost in traditional software. A database query is
            cheap. A server is a monthly line item. A bug in a loop wastes some CPU, gets noticed in a profiler and gets
            fixed. Nobody worries that a for-loop will produce an invoice.
          </p>
          <p>
            AI changes that. Calls to hosted language models are typically billed by usage, which means every design
            decision you make, how much context you send, how many times you call, how many retries you allow, shows up
            directly as money. A test-data script that loops over a large file, an agent that keeps retrying a task it
            can't finish, or a feature that sends an entire document with every message can all cost far more than
            anyone expected. This article is about building the instinct to see that coming. I deliberately won't quote
            real prices: they vary by provider and model and change over time, so any number I gave you would be stale.
            Instead, we'll reason with symbols, which is the skill that actually transfers.
          </p>
        </div>

        {/* Section 1 */}
        <section id="engineering-concern" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Cost Is an Engineering Concern</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              It's tempting to treat AI spending as a finance problem: someone sets a budget, someone else watches the
              invoice. That arrangement fails because the people who control the cost are not the people watching it. The
              cost of an AI feature is set in code reviews and design discussions, in decisions like "let's include the
              full conversation history" or "let's retry until we get valid JSON". By the time finance sees the bill, those
              decisions have already shipped.
            </p>
            <p>
              Usage-based billing turns design choices into spending choices. That's the key mental shift. When you add a
              database index, you're thinking about latency. When you add context to a prompt, you should also be thinking
              about cost, because every extra paragraph is billed on every call, for every user, forever, until someone
              removes it.
            </p>
            <p>
              Testers have a role here too. A QA engineer who notices that a feature makes five model calls where one would
              do, or that a failing scenario triggers a retry loop, has found a real defect, even if every functional
              assertion passes. Cost is a property of the system's behaviour, and behaviour is what we test.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="tokens" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <Type className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tokens in Plain Words</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Language models don't read characters or words directly. They read tokens: small pieces of text, often a
              whole short word, sometimes part of a longer word, sometimes a punctuation mark or a space attached to a word.
              Usage is usually counted in tokens, both the ones you send in and the ones the model writes back.
            </p>
          </div>

          <div className="bg-white/5 border border-pink-500/20 rounded-2xl p-6 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Illustrative split, not a real tokenizer</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tokenDemo.map((t, i) => (
                <span
                  key={i}
                  className={
                    i % 2 === 0
                      ? "px-2 py-1 rounded-md bg-pink-500/20 border border-pink-500/30 text-pink-100 font-mono text-sm whitespace-pre"
                      : "px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-100 font-mono text-sm whitespace-pre"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Each chip is one piece the model reads. Real tokenizers differ between models, so the same sentence can
              produce a different count on a different model. Use your provider's token counting tools when you need
              accuracy.
            </p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Three facts about tokens matter for cost. First, input and output are usually priced separately, and output
              is often the more expensive of the two per token. That means a prompt asking for a long, chatty answer can
              cost more than one asking for a short structured answer, even with identical input.
            </p>
            <p>
              Second, input includes everything you send, not just the user's question. System instructions, examples,
              conversation history, retrieved documents and tool descriptions all count. In many applications, the hidden
              parts of the prompt are much bigger than the part the user typed.
            </p>
            <p>
              Third, prices vary by model and change over time. Never hard-code a price into your mental model or your
              spreadsheet without a date next to it. Before you estimate anything real, open the provider's current
              pricing page and check.
            </p>
            <p>
              A practical consequence: conversation features grow more expensive with every turn. If each new message
              re-sends the full history, the tenth message carries the nine before it. Users don't see this, and
              developers testing with three-message conversations don't either. A tester who runs a long, realistic
              conversation and looks at the token counts per call will see the curve immediately. That's the kind of
              observation that changes a design, for example towards summarising older turns or dropping them once
              they're no longer relevant.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="levers" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Cost Levers</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Once you think in tokens and calls, the drivers of cost become a short list. I find it useful to think of
              them as levers: each one can be pushed up or down by design decisions, and most cost problems come from one
              or two levers left at their maximum without anyone noticing.
            </p>
          </div>

          {/* Signature visual: cost levers table */}
          <div className="overflow-x-auto rounded-2xl border border-pink-500/25 mb-6">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-pink-500/15 to-rose-500/10">
                <tr>
                  <th className="p-4 text-pink-200 font-semibold w-36">Lever</th>
                  <th className="p-4 text-pink-200 font-semibold">What it does</th>
                  <th className="p-4 text-pink-200 font-semibold">How to control it</th>
                </tr>
              </thead>
              <tbody>
                {levers.map((l) => (
                  <tr key={l.lever} className="border-t border-white/10 align-top">
                    <td className="p-4">
                      <span className="inline-flex px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/25 text-pink-200 text-xs font-semibold">
                        {l.lever}
                      </span>
                    </td>
                    <td className="p-4 text-white/65">{l.what}</td>
                    <td className="p-4 text-white/65">{l.control}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The levers interact. A bigger model might need fewer retries because it follows instructions more reliably,
              which could make it cheaper overall for a particular task. Caching might make a long system prompt affordable
              where it otherwise wouldn't be. You won't know without measuring, which is why cost should be part of how you
              evaluate a feature rather than an afterthought.
            </p>
            <p>
              The most important lever is often the most boring one: number of calls. A design that calls the model once
              per user action has a very different cost profile from one that calls it once per record in a list, or once
              per message in a background sync. Draw the call graph before you write the code.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="estimate" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Estimate Before You Build</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              You don't need a sophisticated model to estimate AI cost. A back-of-envelope calculation done before you
              build is worth far more than a precise one done after the bill arrives. The basic shape is: calls per day,
              times tokens per call, times price per token, plus a safety margin for retries, growth and things you forgot.
            </p>
            <p>
              Here is a worked example. Every number below is a placeholder symbol on purpose. Swap in your own measured
              token counts and your provider's current prices when you do this for real.
            </p>
          </div>

          {/* Signature visual: worked example */}
          <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-transparent to-fuchsia-500/10 p-6 mb-8">
            <p className="text-pink-200 font-semibold mb-1">Worked example: a "summarise this failed test run" button</p>
            <p className="text-white/40 text-xs mb-6">All values are symbolic placeholders, not real prices or counts.</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                { k: "Clicks per day", v: "N" },
                { k: "Input tokens per call (instructions + trimmed log)", v: "X" },
                { k: "Output tokens per call (short summary)", v: "Y" },
                { k: "Price per input token", v: "P_in" },
                { k: "Price per output token", v: "P_out" },
                { k: "Average retries per call", v: "R" },
              ].map((a) => (
                <div key={a.k} className="flex items-center justify-between gap-3 bg-black/20 border border-white/10 rounded-xl px-4 py-3">
                  <span className="text-white/65 text-sm">{a.k}</span>
                  <span className="font-mono text-pink-200 text-sm">{a.v}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="bg-black/30 rounded-xl px-4 py-3 text-white/80">
                <span className="text-white/40">1. cost per call = </span>(X × P_in) + (Y × P_out)
              </div>
              <div className="bg-black/30 rounded-xl px-4 py-3 text-white/80">
                <span className="text-white/40">2. calls per day = </span>N × (1 + R)
              </div>
              <div className="bg-black/30 rounded-xl px-4 py-3 text-white/80">
                <span className="text-white/40">3. daily cost = </span>calls per day × cost per call
              </div>
              <div className="bg-pink-500/15 border border-pink-500/30 rounded-xl px-4 py-3 text-pink-100">
                <span className="text-pink-300/70">4. budget = </span>daily cost × days × safety margin M
              </div>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Even with symbols, this exercise is useful because it reveals which term dominates. If X is large because the
              whole raw log goes in, trimming the log is your biggest win. If R is high because the output often fails
              validation, fixing the prompt or the parser saves more than switching models. If N grows with your user
              base, you need per-user limits before you need anything else.
            </p>
            <p>
              Measure X and Y rather than guessing. Run the feature on a realistic sample of inputs, record the token
              counts your provider reports, and use typical and worst-case values. Worst-case matters: the largest log in
              your sample might be many times the average, and a long tail of huge inputs can dominate the total.
            </p>
            <p>
              The safety margin M is not a fudge factor to make you feel comfortable. It's an explicit acknowledgment that
              usage grows, prompts get longer as features are added, and someone will eventually call the feature in a
              way you didn't anticipate. Write down the assumptions next to the estimate so the next person can update it.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="explosions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Ways Bills Explode</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Surprise bills rarely come from steady, well-understood usage. They come from behaviour nobody designed on
              purpose. These are the patterns I'd look for first in any system that calls a model:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { t: "Unbounded loops", d: "A script that calls the model per row, per file or per message, run on an input much larger than the one it was tested with." },
              { t: "Agents that never give up", d: "An agent retries a failing step, tries another approach, retries again, with no limit on steps or spend." },
              { t: "Huge pasted context", d: "Entire logs, full documents or complete conversation histories sent on every single call." },
              { t: "Forgotten scheduled jobs", d: "A nightly experiment someone set up months ago is still running, quietly, every night." },
              { t: "No per-user limits", d: "One heavy user, one buggy client or one automated caller can consume the budget meant for everyone." },
              { t: "Retry storms", d: "A provider error triggers immediate retries from many clients at once, multiplying calls exactly when things are failing." },
            ].map((c) => (
              <div key={c.t} className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-5">
                <p className="text-orange-300 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/65 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice that most of these are ordinary software bugs with a new consequence. An infinite loop used to waste
              CPU; now it also spends money per iteration. An over-eager retry used to add load; now it adds load and cost.
              That's good news for testers, because these are exactly the conditions we already know how to provoke: large
              inputs, failing dependencies, repeated actions, edge cases in loop termination.
            </p>
            <p>
              A useful test to add to any AI-powered feature: point it at a dependency that always fails, and count how
              many model calls happen before it stops. If the answer is "it doesn't stop", you've found your most expensive
              bug before production did.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="controls" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Controls That Actually Work</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Good cost control is layered. No single mechanism catches everything, so you combine limits in the code with
              limits at the account level and visibility across both. The controls below are the ones I'd want in place
              before an AI feature reaches real users.
            </p>
          </div>

          <div className="bg-white/5 border border-pink-500/20 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              {[
                "Budgets and alerts at the provider or account level, set below the amount that would hurt",
                "Rate limits per user, per feature and per API key, so one caller can't consume everything",
                "Maximum step and retry limits for agents and loops, enforced in code, not just in the prompt",
                "Maximum input and output sizes, with a clear error when input is too large rather than silent truncation",
                "Caching for repeated inputs, and reuse of identical instructions where the provider supports it",
                "Smaller models for simple tasks like classification or extraction, verified against a quality bar",
                "Usage logging per feature and per call type, so you can see where the tokens actually go",
              ].map((x) => (
                <div key={x} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" />
                  <p className="text-white/75 text-sm">{x}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The logging point deserves emphasis. A single monthly total tells you that you spent too much. Usage broken
              down by feature, endpoint and call type tells you why. Record input tokens, output tokens, model and retry
              count for every call, tagged with the feature that made it. That data makes every other control tunable.
            </p>
            <p>
              And treat limits as product behaviour that needs tests. What does the user see when they hit the rate
              limit? What does the agent do when it reaches its maximum steps: fail clearly, or leave a half-finished mess?
              Limits that exist but behave badly will be removed by the first frustrated team that trips over them.
            </p>
            <p>
              One more control is cultural rather than technical: make the cost visible to the people making the
              decisions. If the team reviewing a pull request can see that a change adds a model call to every page load,
              the conversation happens at the right time. A short "expected usage impact" line in the description of any
              change that touches prompts, models or call patterns costs almost nothing and prevents a lot of surprises.
              Personal scripts and experiments deserve the same discipline; use separate keys with their own small limits
              so that a mistake in a weekend script can't touch a production budget.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="quality-metric" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Cost as a Quality Metric</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Cost per call is a tempting metric because it's easy to compute. It's also misleading. A cheap call that
              produces a wrong answer, which the user then retries three times or abandons, is not cheap. A slightly more
              expensive call that gets it right first time might be the best deal in the system.
            </p>
            <p>
              The more honest metric is cost per successful outcome. For a summarisation feature, that might be cost per
              summary the user accepted without regenerating. For an agent, cost per task completed correctly. For a test
              generation tool, cost per generated test that survived review and was merged. Defining "successful" forces
              you to connect spending to value, and that connection is what lets you make sensible trade-offs.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-pink-500/15 to-rose-500/10 border border-pink-500/25 p-6 mb-6 text-center">
            <p className="font-mono text-pink-100 text-lg">cost per outcome = total spend ÷ successful outcomes</p>
            <p className="text-white/50 text-sm mt-2">Track it per feature, over time, next to your quality metrics.</p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Once you track this, cost becomes a normal part of evaluating changes. A prompt change that improves answer
              quality but doubles input size is a trade-off to discuss with data, not a surprise to discover later. A model
              switch that lowers price per token but increases retries might be a net loss. Put cost in the same dashboard
              as accuracy and latency, and review it with the same seriousness.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI cost literacy isn't about memorising prices. Prices change. It's about understanding what drives usage,
              tokens in, tokens out, number of calls, retries, model choice, and recognising the patterns that multiply
              it. With that understanding, a five-minute estimate with placeholder symbols will catch most expensive
              designs before they ship.
            </p>
            <p>
              Build limits into the code, alerts into the account and logging into every call. Test the failure paths
              where loops and retries hide. And measure cost against outcomes, not just requests, so that spending
              decisions are quality decisions too.
            </p>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-pink-200 text-lg font-semibold">
              If you can't explain what one request costs, you aren't ready to scale it.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Building AI features on a budget?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about estimating usage, adding sensible limits and testing the paths where AI costs quietly
            multiply.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default AICostLiteracyBlog;
