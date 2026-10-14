import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  ScrollText,
  Funnel,
  Scissors,
  Search,
  Quote,
  TriangleAlert,
  EyeOff,
  Terminal,
  Coins,
  Gauge,
  Brain,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Feeding Long Logs to an LLM: Context Windows, Chunking and Summaries
 * Slug: /blog/feeding-long-logs-to-an-llm
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

const LongLogsLLMBlog = () => {
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
    title: "Feeding Long Logs to an LLM: Context Windows, Chunking and Summaries | Digital Jaydeep",
    description:
      "Giant logs do not fit neatly into a prompt, and the line that matters is rarely where you expect. Practical techniques for trimming, chunking, searching and summarizing logs, test reports and stack traces for an LLM without losing the evidence or leaking secrets.",
    keywords:
      "LLM log analysis, context window, chunking, summarization, test failure logs, log redaction, prompt engineering, AI debugging",
    canonicalUrl: "https://jaydeepai.github.io/blog/feeding-long-logs-to-an-llm",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Feeding Long Logs to an LLM: Context Windows, Chunking and Summaries",
      datePublished: "2026-11-11",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "paste-it-all", label: "The Problem With \"Paste It All\"" },
    { id: "shrink", label: "Start by Shrinking" },
    { id: "chunk", label: "Chunk and Summarize" },
    { id: "search-first", label: "Search First, Read Second" },
    { id: "evidence", label: "Preserve Evidence" },
    { id: "failure-modes", label: "Know the Failure Modes" },
    { id: "redact", label: "Redact Before You Send" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const trimCode = `# Illustrative: keep only the failure window and the noisy-but-useful levels
grep -E "ERROR|WARN|Exception" app.log \\
  | awk '$2 >= "10:42:00" && $2 <= "10:47:00"' \\
  | uniq \\
  > trimmed.log`;

  const chunkCode = `# Illustrative pseudo-code
chunks = split(log, at = test_boundaries, max_lines = N)
for chunk in chunks:
    notes += summarize(chunk,
        "List errors and state changes. Quote each with its line number.")
answer = ask(notes,
    "Rank likely causes. Cite the line numbers that support each.")`;

  const searchCode = `# Illustrative: find the test, then read around it
grep -n "test_id=checkout_saved_card" app.log
# say the first failure is near line 1200:
sed -n '1150,1260p' app.log > context.log`;

  const strategies = [
    {
      name: "Trim",
      icon: Funnel,
      best: "You know roughly when and where it failed: a test id, a time window, an error level.",
      risk: "You cut away the cause because it happened earlier, or was logged at a 'harmless' level.",
      code: trimCode,
      label: "trim.sh",
    },
    {
      name: "Chunk and summarize",
      icon: Scissors,
      best: "You have no idea where the problem is and need an overview of a long run first.",
      risk: "The one important line gets summarized away, and every later step trusts the summary.",
      code: chunkCode,
      label: "chunk.pseudo",
    },
    {
      name: "Search then read",
      icon: Search,
      best: "There is a clear anchor: a test id, an exception name, a request id or an error code.",
      risk: "You search for the symptom you expect and miss a different one you didn't.",
      code: searchCode,
      label: "search.sh",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Context Window
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Log Analysis
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Feeding Long Logs to an LLM: Context Windows, Chunking and Summaries
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The model can read faster than you. It still can't find a needle you buried under the whole haystack.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 11, 2026
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
                  className="flex items-center gap-3 text-white/70 hover:text-teal-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-teal-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "More context is not better context. The right 200 lines beat the wrong 20,000."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            The first time most of us try to debug a failed test run with an LLM, we do the obvious thing. Open the log,
            select all, paste, and ask "why did this fail?" Sometimes it works. Often the answer is vague, or it blames
            the loudest error in the file, or the paste is simply rejected for being too long. And even when it works,
            you have just sent an entire unfiltered log, secrets and all, to a service outside your machine.
          </p>
          <p>
            Logs, test reports and stack traces are some of the most useful inputs you can give a model when you are
            investigating a failure. They are also some of the worst-shaped: long, repetitive, noisy, and full of lines
            that look alarming but mean nothing. This article is about preparing that material properly. Trimming it,
            chunking it, searching it, keeping the evidence traceable and stripping out what should never leave your
            hands. None of it depends on a particular model; it is about the shape of what you send.
          </p>
        </div>

        {/* Section 1 */}
        <section id="paste-it-all" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Problem With "Paste It All"</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Every model works with a context window: a limit on how much text it can consider at once, covering your
              instructions, the material you paste and the answer it writes. Limits differ between models and change
              over time, so I won't quote any. What matters is that there is always a limit, and a busy test log can
              exceed it easily. When it does, something has to be cut, either by you or by the tool you are using,
              and you would rather be the one choosing.
            </p>
            <p>
              Even when everything fits, "paste it all" has three costs that are easy to ignore.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: Gauge,
                t: "Limits",
                d: "Big inputs hit the context limit, get truncated, or crowd out the room the model needs for your instructions and its answer.",
              },
              {
                icon: Coins,
                t: "Cost and speed",
                d: "Most AI services bill by the amount of text processed, and longer inputs take longer to process. Sending the same huge log repeatedly adds up.",
              },
              {
                icon: Brain,
                t: "Fading attention",
                d: "Models tend to use very long inputs less reliably than short ones. A key detail buried in the middle of a giant paste can be overlooked.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-teal-500/5 border border-teal-500/15 rounded-2xl p-5">
                <c.icon className="w-5 h-5 text-teal-300 mb-3" />
                <p className="text-white/90 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The third point is the one people underestimate. A larger context window is a bigger desk, not a better
              reader. If most of what you paste is startup noise, health checks and debug chatter
              from unrelated components, you have made the model's job harder, not easier. The question is never "how
              much can I fit?" It is "what is the smallest input that still contains the answer?"
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="shrink" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Funnel className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start by Shrinking</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Before any clever technique, do the boring thing: make the input smaller with ordinary tools. Most logs can
              be cut down dramatically without losing anything relevant, and plain filtering has a big advantage over
              asking a model to do it. It is deterministic. You know exactly what was removed and you can explain it.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <p className="text-cyan-300 font-semibold mb-4">Shrinking checklist</p>
            <div className="space-y-3">
              {[
                ["Time window", "Keep a few minutes either side of the failure, not the whole night's run."],
                ["Test or request id", "If your logs carry a test id, correlation id or thread name, filter on it."],
                ["Level", "Start with errors and warnings, then widen to info if the cause isn't visible."],
                ["Repetition", "Collapse identical repeated lines into one line with a count."],
                ["Known noise", "Drop health checks, heartbeat messages and banners you have confirmed are irrelevant."],
                ["Stack traces", "Keep the top frames and the 'caused by' chain; framework frames in the middle rarely help."],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">
                    <span className="text-white/90 font-semibold">{k}: </span>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              There is one trap. Filtering assumes you know what is irrelevant, and sometimes the cause hides in exactly
              the place you filtered out. A connection pool warning logged twenty minutes before the failure. A
              configuration line printed at info level at startup. So shrink in steps: start narrow, and if the
              trimmed version doesn't explain the failure, widen the window or lower the level before you conclude
              anything. Record what you filtered, so you can say later what the model did and did not see.
            </p>
            <p>
              Test reports deserve the same treatment as raw logs. A full report of a large suite is mostly passing
              tests, and passing tests rarely explain a failure. Extract the failed and skipped cases, their error
              messages and their durations, and leave the rest behind. If the report format is structured, such as XML or
              JSON, parse it with a small script rather than pasting it whole; structure is something code handles
              perfectly and models handle merely well.
            </p>
            <p>
              Once you have a shrinking recipe that works for your project, save it as a script in the test repository.
              The next person investigating a failure, possibly you at the end of a long day, should not have to rebuild
              it from memory.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="chunk" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Chunk and Summarize</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Sometimes you genuinely need the whole thing. A long nightly run with dozens of failures, or a soak test
              where the problem developed slowly. There is no single test id to filter on, and the cause may be
              spread across hours. That is where chunking comes in: split the input into pieces, have each piece
              summarized, then reason over the summaries.
            </p>
          </div>

          <div className="relative border-l-2 border-emerald-500/30 ml-3 space-y-6 mb-6">
            {[
              {
                t: "Split on meaningful boundaries",
                d: "Cut at test boundaries, request boundaries or time intervals, not at an arbitrary character count. A chunk that ends halfway through a stack trace produces a confused summary.",
              },
              {
                t: "Summarize each chunk with a fixed brief",
                d: "Ask the same thing every time: errors, warnings, state changes, anything unusual. Ask for each item to be quoted with its original line number.",
              },
              {
                t: "Keep the references",
                d: "Every summary line should point back to a line range in the original log. Without that, the summaries become a story you can't check.",
              },
              {
                t: "Reason over the summaries",
                d: "Now the combined notes are small enough to look at together. Ask for patterns, ordering and likely causes, again with line references.",
              },
              {
                t: "Go back to the source",
                d: "When a hypothesis emerges, pull the referenced lines from the raw log and read them yourself, or send that exact window back for a closer look.",
              },
            ].map((s, i) => (
              <div key={s.t} className="pl-6 relative">
                <span className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-white/90 font-semibold text-sm mb-1">{s.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The line numbers are the whole point. Summarization is lossy by design. That is fine as long as you can
              always get from a summary claim back to the raw evidence. A summary that says "database timeouts began
              around line 8,400" is a useful pointer. A summary that says "there were some database issues" is a
              dead end.
            </p>
            <p>
              Chunk size is a judgment call. Too small, and each chunk lacks the context to make sense of itself; too
              large, and you are back to the original problem. Splitting by test is usually the most natural unit for
              test logs, because a test is already a self-contained story with a beginning, an action and an outcome.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="search-first" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Search First, Read Second</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              My favorite technique is also the least glamorous. Instead of asking the model to find the problem, find
              the likely area yourself with a plain text search, then send only the surrounding context. Search for the
              failing test's name, the exception type, a request id from the error message, or an error code from the
              API response. Then cut a generous window around the first hit and send that.
            </p>
            <p>
              This works because humans and grep are both very good at finding anchors, and models are very good at
              explaining what is happening near an anchor. Splitting the work this way plays to both strengths. It is
              also cheaper and faster, and it keeps the input small enough that you can read it yourself to check the
              model's explanation.
            </p>
            <p>
              Here are the three strategies side by side. In practice I combine them: search to find the area, trim to
              clean it up, and only reach for chunking when there is no anchor at all.
            </p>
            <p>
              How wide should the window be? Wider than feels necessary. The interesting line is often well before the
              failure: the moment a connection was dropped, a cache was cleared or a background job started. A window
              that starts at the first error frequently starts too late. I would rather send a bit more context around a
              strong anchor than a perfectly tight slice that cuts off the cause.
            </p>
          </div>

          {/* Signature visual: three strategy cards */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            {strategies.map((st) => (
              <div key={st.name} className="bg-teal-500/5 border border-teal-500/20 rounded-2xl overflow-hidden flex flex-col">
                <div className="px-5 pt-5 pb-3 flex items-center gap-2">
                  <st.icon className="w-5 h-5 text-teal-300" />
                  <p className="text-teal-200 font-semibold">{st.name}</p>
                </div>
                <div className="px-5 pb-4 space-y-3 text-sm flex-1">
                  <p className="text-white/70">
                    <span className="text-xs uppercase tracking-wide text-emerald-300/80 font-semibold block mb-1">Best when</span>
                    {st.best}
                  </p>
                  <p className="text-white/60">
                    <span className="text-xs uppercase tracking-wide text-amber-300/80 font-semibold block mb-1">Risk</span>
                    {st.risk}
                  </p>
                </div>
                <div className="bg-black/40 border-t border-white/10">
                  <div className="px-4 py-2 border-b border-white/10 text-[11px] text-white/40 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" /> {st.label} — illustrative
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-teal-100/90 font-mono">
                    <code>{st.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section id="evidence" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <Quote className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Preserve Evidence</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              An explanation you cannot check is an opinion. When you ask a model to analyze a log, ask it to quote. Every
              claim about what happened should come with the exact line it is based on, and its line number in the input
              you sent. Number the lines before you send them so the model has something stable to refer to.
            </p>
            <p>
              This changes the output from a narrative into a set of checkable statements. Instead of "the test failed
              because the payment service was unavailable", you get "line 214: connection refused from the payment
              service; line 216: the checkout step times out two seconds later". You can open the log, jump to those
              lines and confirm in seconds.
            </p>
          </div>

          <div className="border border-sky-500/20 bg-sky-500/5 rounded-2xl p-6 mb-6">
            <p className="text-sky-300 font-semibold text-sm mb-3">Instructions worth adding to every log prompt</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Quote the exact line for every claim, with its line number.</li>
              <li>If something is not in the log, say "not in the provided log". Do not guess what it would say.</li>
              <li>Separate what the log shows from what you infer from it.</li>
              <li>List the two or three most likely causes, not one verdict.</li>
              <li>For each cause, suggest one cheap check that would confirm or rule it out.</li>
            </ul>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The second instruction matters as much as the first. A model asked "what caused this?" will usually produce
              an answer, even when the cause is not visible in what you gave it. Giving it explicit permission to say
              "the evidence isn't here" makes that honest answer far more likely, and it is often the most useful thing
              it can tell you: widen the window, or look somewhere else.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="failure-modes" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <TriangleAlert className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Know the Failure Modes</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Even with good preparation, this process fails in recognizable ways. Knowing them is most of the defense.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {[
              {
                t: "The summary drops the key detail",
                d: "A chunk summary lists five errors and leaves out the one warning that actually mattered, because it looked routine. Everything downstream reasons from an incomplete picture. Defense: line references and going back to the source for any hypothesis you plan to act on.",
              },
              {
                t: "Invented lines",
                d: "The model quotes a log line that is not in the log, or quotes a real line with the details subtly changed. It reads plausibly because it looks like the lines around it. Defense: check every quoted line against the raw file. A short script that searches for each quote is easy to write.",
              },
              {
                t: "Anchoring on the loudest error",
                d: "Logs are full of scary messages that are always there. The model, like a tired human, latches onto the most dramatic one. Defense: ask for ranked alternatives and compare with a log from a passing run.",
              },
              {
                t: "Over-trusting a confident summary",
                d: "The output is fluent, structured and sure of itself, so we stop checking. Confidence in the wording says nothing about correctness. Defense: treat the analysis as a set of leads, not a conclusion, until you have confirmed it.",
              },
            ].map((f) => (
              <div key={f.t} className="border-l-4 border-amber-400/50 bg-amber-500/5 rounded-r-2xl p-5">
                <p className="text-amber-200 font-semibold text-sm mb-2">{f.t}</p>
                <p className="text-white/65 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A trick I find useful: when the failure is in a test that normally passes, prepare the same window from a
              recent passing run and send both. "What is different between these two?" is a much easier and more
              grounded question than "what is wrong with this one?", and it neutralizes the always-present scary
              messages because they appear in both.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="redact" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Redact Before You Send</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Logs are dangerous to share. They routinely contain things that were never meant to leave the system:
              access tokens in request headers, passwords in failed connection strings, session ids, email addresses,
              names, account numbers, internal hostnames. Test environments are supposed to be clean of real data, and
              often they are not entirely.
            </p>
            <p>
              Before any log goes to an AI service, especially one outside your organization, redact it. And don't rely
              on remembering to do it by hand. Build redaction into the same script that trims and prepares the input,
              so the only path to the model goes through the filter. Replace sensitive values with consistent
              placeholders, such as the same token becoming the same placeholder everywhere, so the model can still
              follow the flow without seeing the value.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              "Tokens, API keys and authorization headers",
              "Passwords and connection strings",
              "Session ids and cookies",
              "Names, emails, phone numbers, addresses",
              "Account, order or customer identifiers from real systems",
              "Internal hostnames, IP addresses and file paths",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-rose-500/5 border border-rose-500/15 rounded-xl px-4 py-3">
                <EyeOff className="w-4 h-4 text-rose-300 shrink-0" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Pattern-based redaction catches most of these, but not all. Review a sample of the redacted output now and
              then to see what slipped through, and add patterns as you find gaps. Also check your organization's
              policy on which AI tools may receive which kinds of data. Redaction lowers the risk; it does not replace
              the rules.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The value of an LLM in log analysis is real. It reads quickly, it recognizes patterns across many lines, and
              it explains unfamiliar errors well. But its output can only be as good as the input you prepare, and a raw
              log is a poor input.
            </p>
            <p>
              So prepare it. Shrink it with ordinary tools first. Search for an anchor and send the neighborhood. Chunk
              only when you must, and keep line references through every step. Demand quotes, allow "not in the log" as
              an answer, and verify before you act. Redact automatically, every time. That pipeline takes an afternoon
              to script, and it will make every future investigation faster and safer.
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 text-center">
            <p className="text-teal-200 text-lg font-semibold">Give the model a clean desk, not a landfill.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Drowning in test logs?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about scripts and prompts that turn noisy failure output into evidence you can act on.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default LongLogsLLMBlog;
