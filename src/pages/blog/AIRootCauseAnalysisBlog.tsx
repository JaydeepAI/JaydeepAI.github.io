import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Timer,
  FileText,
  EyeOff,
  ListOrdered,
  TriangleAlert,
  RefreshCw,
  Terminal,
  CircleCheck,
  CircleX,
  ArrowRight,
  Github,
} from "lucide-react";

/**
 * Blog: AI-Assisted Root-Cause Analysis: Feeding Failed Test Logs to an LLM
 * Slug: /blog/ai-assisted-root-cause-analysis-for-failed-tests
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

const AIRootCauseAnalysisBlog = () => {
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
    title: "AI-Assisted Root-Cause Analysis: Feeding Failed Test Logs to an LLM | Digital Jaydeep",
    description:
      "An LLM can read a failure faster than you can. It can also confidently blame the wrong thing. How to give it the right evidence, redact what must never leave your machine, and demand ranked hypotheses you can verify against the real log.",
    keywords:
      "root cause analysis, failed test logs, LLM debugging, AI test triage, test automation, log redaction, ranked hypotheses, QA",
    canonicalUrl: "https://jaydeepai.github.io/blog/ai-assisted-root-cause-analysis-for-failed-tests",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "AI-Assisted Root-Cause Analysis: Feeding Failed Test Logs to an LLM",
      datePublished: "2026-10-20",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "triage-tax", label: "The Triage Tax" },
    { id: "what-to-give", label: "What to Give the Model" },
    { id: "what-to-redact", label: "What to Redact First" },
    { id: "ranked-hypotheses", label: "Ask for Ranked Hypotheses With Evidence" },
    { id: "how-it-goes-wrong", label: "How It Goes Wrong" },
    { id: "close-the-loop", label: "Close the Loop" },
    { id: "prompt-template", label: "A Triage Prompt Template" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const evidence = [
    {
      title: "Test name and failing step",
      desc: "Not just the method name. The step that failed, in plain words: \"clicked Save on the profile form, waited for the success toast\".",
    },
    {
      title: "Error message and stack trace",
      desc: "The full exception, trimmed of framework noise but not of the frames that point into your own code.",
    },
    {
      title: "A relevant log window",
      desc: "Application and test logs from a short window before and after the failure, with timestamps intact so ordering survives.",
    },
    {
      title: "Recent changes",
      desc: "What changed since the last green run: a commit summary, a config change, a dependency bump, a new environment variable.",
    },
    {
      title: "Environment details",
      desc: "Which environment, browser, build, and whether the failure reproduces locally or only in the pipeline.",
    },
    {
      title: "Expected behavior",
      desc: "What should have happened, from the requirement. Without it the model has to guess what \"working\" means.",
    },
  ];

  const redactionSnippet = `# Illustrative redaction pass, run BEFORE anything leaves your machine
import re
import sys

PATTERNS = [
    (r"(?i)bearer\\s+[a-z0-9._\\-]+", "Bearer <TOKEN>"),
    (r"(?i)(password|passwd|pwd)\\s*[=:]\\s*\\S+", "\\\\1=<REDACTED>"),
    (r"(?i)(api[_-]?key|secret)\\s*[=:]\\s*\\S+", "\\\\1=<REDACTED>"),
    (r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "<EMAIL>"),
    (r"\\b\\d{1,3}(\\.\\d{1,3}){3}\\b", "<IP>"),
    (r"(?i)\\b[a-z0-9-]+\\.internal\\.[a-z.]+\\b", "<INTERNAL_HOST>"),
]

text = sys.stdin.read()
for pattern, replacement in PATTERNS:
    text = re.sub(pattern, replacement, text)
sys.stdout.write(text)`;

  const promptTemplate = `ROLE
You are helping a QA engineer triage a failed automated test.
You are an analyst, not a judge. Propose hypotheses; do not declare a verdict.

CONTEXT
- Test: <test name>
- Failing step: <what the test was doing, in plain words>
- Expected behavior (from the requirement): <what should have happened>
- Environment: <env name, browser, build id, local or pipeline>
- Reproduces locally: <yes / no / not tried>
- Recent changes since last green run: <commits, config, dependencies>

EVIDENCE (already redacted)
--- error and stack trace ---
<paste>
--- log window (timestamps kept) ---
<paste>

TASK
1. List up to 4 hypotheses for the root cause, ranked by likelihood.
2. For each hypothesis give:
   - Evidence: quote the exact log line(s) that support it.
     If no line supports it, write "no direct evidence".
   - Against: anything in the evidence that argues against it.
   - Cheap check: one quick action that would confirm or kill it.
   - Bucket: product defect / test defect / test data / environment.
3. Say what information is missing that would change the ranking.

RULES
- Quote only lines that appear in the evidence above. Never paraphrase
  a log line as if it were a quote.
- Do not assume the first error in the log is the cause.
- If the evidence is insufficient, say so instead of guessing.

OUTPUT FORMAT
A numbered list of hypotheses, then a short "Missing information" list.`;

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
            Root Cause Analysis
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            LLM Debugging
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          AI-Assisted Root-Cause Analysis: Feeding Failed Test Logs to an LLM
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The model reads a stack trace in seconds. Whether it reads it correctly depends almost entirely on what you
          hand it and what you ask it to return.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 20, 2026
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
          "Ask for hypotheses, not verdicts. A verdict ends your thinking; a ranked list starts it."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Pasting a failed test log into a chat window has become a reflex for a lot of automation engineers,
            including me. It is a reasonable reflex. Reading a long stack trace, lining it up against an application
            log and noticing that the timeout happened two seconds after a connection reset is pattern reading, and
            pattern reading is something large language models genuinely do well.
          </p>
          <p>
            The problem is the shape of the request. "Why did this fail?" invites a single confident answer, and a
            single confident answer is exactly what you should not trust. Models anchor on the first plausible cause,
            they gravitate to the loudest error in the log, and they will occasionally describe a line that is not
            there. None of that makes them useless for triage. It means the input and the output both need structure.
            This article is the structure I would recommend: what to send, what to strip out first, what to ask for,
            and how to stop the same investigation from happening twice.
          </p>
        </div>

        {/* Section 1 — Triage tax */}
        <section id="triage-tax" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Timer className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Triage Tax</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Think about the last time a nightly run came back red and you had to explain why. Very little of that
              time went into actual reasoning. Most of it went into gathering: finding the right build, downloading the
              artifacts, opening the screenshot, scrolling the test log to the failing step, then switching to the
              application log and hunting for the matching timestamp, then checking what was merged yesterday, then
              asking someone whether the environment was redeployed.
            </p>
            <p>
              That gathering is the triage tax. It is paid on every failure, whether the cause turns out to be a real
              product defect, a stale locator or an environment that fell over at 2 a.m. The thinking part, the moment
              where you look at the assembled evidence and say "this is a data collision, not a timing issue", is often
              short. It is the assembly that hurts.
            </p>
            <p>
              This matters because it tells you where an LLM can help and where it cannot. A model does not fetch your
              artifacts unless you build tooling for that, and it does not know your environment's history. What it
              can do is read the assembled evidence quickly and propose candidate explanations you might not have
              considered. That is valuable, but only if the evidence you assemble is the right evidence. Garbage in,
              confident garbage out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {[
              { label: "Gather", desc: "Artifacts, logs, screenshots, recent changes", tone: "slow, manual" },
              { label: "Think", desc: "Line up evidence, form hypotheses, rank them", tone: "where AI can help" },
              { label: "Confirm", desc: "Run a cheap check, kill or keep each idea", tone: "always yours" },
            ].map((step, i) => (
              <div key={step.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-green-300 font-mono text-xs mb-1">STEP {i + 1}</p>
                <p className="text-white font-semibold">{step.label}</p>
                <p className="text-white/60 text-sm mt-1">{step.desc}</p>
                <p className="text-white/40 text-xs mt-3 italic">{step.tone}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — What to give */}
        <section id="what-to-give" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Give the Model</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The most common mistake is sending only the stack trace. A stack trace tells you where the test gave
              up, which is rarely where the problem started. A Selenium timeout waiting for a button is the symptom;
              the cause might be a failed API call three seconds earlier, a feature flag that changed, or a test that
              ran in parallel and deleted the record you were editing. If the model never sees those, it will explain
              the timeout with the only thing it has: "the element took too long to load, consider increasing the
              wait". That is the answer that keeps flaky suites flaky.
            </p>
            <p>
              Six pieces of evidence cover most failures. You will not always have all six, and that is fine, but you
              should notice which ones are missing and say so in the prompt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {evidence.map((item, i) => (
              <div key={item.title} className="bg-teal-500/5 border border-teal-500/15 rounded-2xl p-5">
                <p className="text-teal-300 font-semibold text-sm mb-2">
                  <span className="text-white/30 font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two of these deserve extra attention. The <span className="text-white font-medium">log window</span>{" "}
              should be a window, not the whole file. Dumping thousands of lines into a prompt buries the signal and
              makes it more likely that the model latches onto an unrelated warning that happens to look scary. Take a
              slice around the failure timestamp, keep the timestamps, and if the run involves several services,
              include the matching slice from each one.
            </p>
            <p>
              The <span className="text-white font-medium">expected behavior</span> is the piece people skip most
              often, and it is the one that most changes the quality of the answer. If the test expected a validation
              error and got a success message, the model needs to know which of those the requirement actually calls
              for. Otherwise it may happily conclude that the test is wrong and the application is right, which is
              sometimes true and sometimes the exact defect you were supposed to catch.
            </p>
          </div>
        </section>

        {/* Section 3 — What to redact (signature visual) */}
        <section id="what-to-redact" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Redact First</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Test logs are leakier than people think. Debug logging captures request headers, which carry bearer
              tokens. Failed login tests print the credentials they used. Data-driven tests log the rows they read,
              and if anyone ever seeded a test environment from a production export, those rows may contain real
              names, emails and addresses. Internal hostnames and IP ranges describe your infrastructure to anyone who
              reads the log.
            </p>
            <p>
              Before any of that goes into a prompt, it has to be removed. Your organization's policy on which AI tools
              are approved, and for which data, comes first; if there is no policy, that is a conversation to have
              before you build any of this. Within whatever is allowed, the rule I recommend is simple: redaction is a
              habit and a script, not a memory. If it depends on you remembering to scan the log by eye at the end of a
              long day, it will fail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-500/10 border border-green-500/25 rounded-2xl p-6">
              <p className="text-green-300 font-semibold mb-4 flex items-center gap-2">
                <CircleCheck className="w-5 h-5" /> Include
              </p>
              <div className="space-y-3">
                {[
                  "Test name, failing step and assertion message",
                  "Exception type and stack frames from your own code",
                  "Timestamped log lines around the failure",
                  "Summary of recent commits or config changes",
                  "Environment name, browser and build identifier",
                  "Expected behavior quoted from the requirement",
                  "Whether a rerun passed and whether it reproduces locally",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl p-6">
              <p className="text-orange-300 font-semibold mb-4 flex items-center gap-2">
                <CircleX className="w-5 h-5" /> Redact
              </p>
              <div className="space-y-3">
                {[
                  "Access tokens, session cookies and API keys",
                  "Passwords, including test-account passwords",
                  "Personal data: names, emails, phone numbers, addresses",
                  "Any customer data, even in a test environment",
                  "Internal hostnames, IP addresses and connection strings",
                  "Signed URLs and anything with a secret in the query string",
                  "Proprietary business rules you have not been cleared to share",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleX className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            A small script you pipe every log through is enough to start. It will not catch everything, so treat it as
            the first layer, not the only one, and add a pattern every time you find something it missed.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              redact_log.py — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-green-100/90 font-mono">
              <code>{redactionSnippet}</code>
            </pre>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-orange-300 font-semibold">Placeholders, not deletions: </span>
              replace sensitive values with labelled placeholders such as &lt;TOKEN&gt; or &lt;EMAIL&gt; rather than
              deleting them. The model still needs to know that a token was present, or that two log lines refer to
              the same user. It just does not need the real value.
            </p>
          </div>
        </section>

        {/* Section 4 — Ranked hypotheses */}
        <section id="ranked-hypotheses" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ask for Ranked Hypotheses With Evidence</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Here is the change that makes the biggest difference. Instead of asking what caused the failure, ask for
              a short ranked list of possible causes, and require three things for each one: the exact log line that
              supports it, anything in the evidence that argues against it, and a cheap check that would confirm or
              kill it.
            </p>
            <p>
              Each requirement does a specific job. Quoting the supporting line forces the model to ground its claim
              in the evidence, and makes it trivial for you to verify: either that line is in the log or it is not.
              Asking for evidence against pushes back on anchoring, because the model has to look for reasons its
              favourite theory might be wrong. And the cheap check turns the output from an opinion into a plan. You
              do not have to agree with the ranking. You just run the checks, cheapest first.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">#</th>
                  <th className="text-left px-5 py-3 font-semibold">Hypothesis</th>
                  <th className="text-left px-5 py-3 font-semibold">Supporting Line</th>
                  <th className="text-left px-5 py-3 font-semibold">Cheap Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-green-300 font-mono">1</td>
                  <td className="px-5 py-3 text-white/80">Save request failed server-side, so the toast never appeared</td>
                  <td className="px-5 py-3 text-white/60 font-mono text-xs">POST /profile returned 500</td>
                  <td className="px-5 py-3 text-white/60">Replay the request against the same build</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-green-300 font-mono">2</td>
                  <td className="px-5 py-3 text-white/80">Another parallel test edited the same test user</td>
                  <td className="px-5 py-3 text-white/60 font-mono text-xs">Same user id in two test threads</td>
                  <td className="px-5 py-3 text-white/60">Run the test alone; check data isolation</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-green-300 font-mono">3</td>
                  <td className="px-5 py-3 text-white/80">Toast locator changed in the latest UI build</td>
                  <td className="px-5 py-3 text-white/60 font-mono text-xs">no direct evidence</td>
                  <td className="px-5 py-3 text-white/60">Inspect the toast element in that build</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-xs mb-6 italic">Illustrative example of the output shape, not a real investigation.</p>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice hypothesis three. "No direct evidence" is a perfectly good answer, and you want the model to be
              comfortable giving it. A hypothesis without evidence is still worth listing if it is cheap to check, but
              it should never be ranked first just because it is the most common cause of UI test failures in general.
              Your log is not the average log.
            </p>
            <p>
              Ask it to tag each hypothesis with a bucket as well: product defect, test defect, test data or
              environment. It costs nothing, and it makes the next step, recording the confirmed cause, much easier.
            </p>
          </div>
        </section>

        {/* Section 5 — How it goes wrong */}
        <section id="how-it-goes-wrong" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <TriangleAlert className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">How It Goes Wrong</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Even with good input and a structured request, an LLM will get triage wrong in a few predictable ways.
            Knowing the patterns in advance is what lets you catch them quickly.
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-red-400/60 bg-red-500/5 rounded-r-2xl p-5">
              <p className="text-red-300 font-semibold mb-2">The confident wrong cause</p>
              <p className="text-white/70 text-sm leading-relaxed">
                The explanation is fluent, specific and plausible, and it is wrong. Fluency is not evidence. A model
                writes a wrong diagnosis in exactly the same tone as a right one, so the tone tells you nothing. Judge
                the claim by the line it cites and the result of the cheap check, never by how sure it sounds.
              </p>
            </div>
            <div className="border-l-4 border-red-400/60 bg-red-500/5 rounded-r-2xl p-5">
              <p className="text-red-300 font-semibold mb-2">Anchoring on the loudest error</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Logs are full of errors that do not matter: a deprecated-API warning, a retried connection, a missing
                favicon. The model tends to grab the most dramatic-looking one, or the first one, and build a story
                around it. Real causes are often quiet: a config value that changed, a response that was empty rather
                than failed. This is why the prompt says explicitly not to assume the first error is the cause.
              </p>
            </div>
            <div className="border-l-4 border-red-400/60 bg-red-500/5 rounded-r-2xl p-5">
              <p className="text-red-300 font-semibold mb-2">The invented log line</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Occasionally the model "quotes" a line that does not exist, usually a reasonable-sounding blend of
                several real lines or a message it expects a framework to print. This is the most dangerous failure,
                because a quoted line looks like proof. The defence is mechanical: search the original log for every
                quoted line. If it is not there, the hypothesis loses its evidence.
              </p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">The verification rule: </span>
              nothing the model says becomes a conclusion until it has been checked against the real log or the real
              system. Not the summary you pasted, not the model's restatement of it. The original artifact.
            </p>
          </div>
        </section>

        {/* Section 6 — Close the loop */}
        <section id="close-the-loop" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Close the Loop</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Once you have confirmed a cause, the investigation is only half done. The other half is writing it down
              somewhere the next investigation can find it. A flake ledger or defect log with a row per confirmed
              cause is enough: the test, the bucket, the evidence that proved it, the fix and the date.
            </p>
            <p>
              This has two payoffs. For people, it turns individual failures into patterns. When the same test data
              collision shows up for the fourth time, you stop fixing tests and start fixing the data strategy. For the
              model, it becomes context. The next time a similar failure appears, you can include a few relevant past
              causes in the prompt, and the hypotheses start from your system's real history instead of the generic
              history of every test suite on the internet.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-2 mb-6">
            {["Failure", "Evidence + redaction", "Ranked hypotheses", "Cheap checks", "Confirmed cause", "Ledger row"].map(
              (step, i, arr) => (
                <div key={step} className="flex flex-col md:flex-row items-center gap-2 flex-1">
                  <div className="w-full bg-teal-500/10 border border-teal-500/20 rounded-xl px-3 py-3 text-center text-xs text-teal-200 font-medium">
                    {step}
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-white/30 shrink-0 rotate-90 md:rotate-0" />}
                </div>
              )
            )}
          </div>

          <p className="text-white/70 leading-relaxed">
            The arrow that matters most is the last one, from the ledger back into the next prompt. Without it, every
            triage session starts from zero, and the model's suggestions stay generic forever.
          </p>
        </section>

        {/* Section 7 — Prompt template */}
        <section id="prompt-template" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Triage Prompt Template</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is the full template. Keep it in your repository next to your test utilities, so it is versioned,
            reviewed and improved like any other shared asset. Fill in the angle-bracket fields, paste only redacted
            evidence, and resist the urge to trim the rules section; it is the part doing the most work.
          </p>

          <div className="bg-black/40 border border-green-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-green-300/70 font-mono">
              triage-prompt.txt — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-green-100/90 font-mono">
              <code>{promptTemplate}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A few notes on using it well. Run it once, run your cheapest check, then come back with the result and
              ask the model to re-rank. Triage is a conversation, and the second round, with real evidence from the
              first check, is often where the useful answer appears. If the model asks for information you do not
              have, take that seriously: it usually points at a gap in your logging that will hurt you again.
            </p>
            <p>
              And if a template keeps producing poor answers for a certain kind of failure, fix the template, not the
              output. Add the missing context field, tighten a rule, include an example. That improvement then helps
              everyone on the team who uses it.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Using an LLM for failure triage is not a question of whether, but of how. The model is fast at reading,
              broad in the patterns it recognizes and tireless with long logs. It is also blind to your environment's
              history, prone to anchoring, and capable of quoting things that do not exist. Both of those are true at
              the same time, and a good triage process is designed around both.
            </p>
            <p>
              The process fits on an index card. Assemble the six pieces of evidence. Redact with a script. Ask for
              ranked hypotheses, each with a quoted line, a counter-argument and a cheap check. Verify every quote
              against the original artifact. Record the confirmed cause, and feed it into the next prompt.
            </p>
            <p>
              Do that, and the model stops being an oracle you hope is right and becomes what it is good at: a fast,
              well-read colleague who helps you think, while you stay responsible for the conclusion.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-green-200 text-lg font-semibold">Let the model read faster. Keep the verdict for yourself.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Spending too long on red builds?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about failure triage workflows that use AI for speed and keep humans in charge of the verdict.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default AIRootCauseAnalysisBlog;
