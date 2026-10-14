import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  BookOpen,
  Compass,
  ScanSearch,
  Bot,
  MessageSquare,
  Dumbbell,
  CircleCheck,
  ArrowRight,
  Github,
} from "lucide-react";

/**
 * Blog: QA Interviews in the Age of AI: What Interviewers Now Probe
 * Slug: /blog/qa-interviews-in-the-age-of-ai
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

const QAInterviewsAIAgeBlog = () => {
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
    title: "QA Interviews in the Age of AI: What Interviewers Now Probe | Digital Jaydeep",
    description:
      "Memorized definitions matter less when everyone has an assistant. QA interviews are shifting toward judgment, review skill and responsible AI use. A practical guide to what interviewers often probe and how to prepare for it.",
    keywords:
      "QA interview, test automation interview, QA career, AI in testing, interview preparation, test design, code review skills, SDET interview",
    canonicalUrl: "https://jaydeepai.github.io/blog/qa-interviews-in-the-age-of-ai",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "QA Interviews in the Age of AI: What Interviewers Now Probe",
      datePublished: "2026-11-14",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "what-changed", label: "What Changed" },
    { id: "fundamentals", label: "Fundamentals Still Win" },
    { id: "scenarios", label: "Scenario Questions and a Framework" },
    { id: "reviewing", label: "Reviewing Generated Work" },
    { id: "ai-honestly", label: "Talking About AI Use Honestly" },
    { id: "show-thinking", label: "Show Your Thinking" },
    { id: "drills", label: "Practice Drills" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const probeTable = [
    {
      ask: "\"Walk me through how you'd test this login form.\"",
      really: "Whether you think in risks and techniques, or just list fields to type into.",
      prepare: "Practice naming the technique behind each idea: boundaries, partitions, state, security, accessibility.",
    },
    {
      ask: "\"This test fails one run in ten. What do you do?\"",
      really: "Diagnostic discipline: evidence first, hypotheses second, fixes last.",
      prepare: "Have a short, repeatable investigation routine you can describe step by step.",
    },
    {
      ask: "\"Here's a test an assistant wrote. Review it.\"",
      really: "Whether you can judge quality in code you didn't write.",
      prepare: "Review generated tests regularly and keep a list of the weaknesses you find.",
    },
    {
      ask: "\"How do you use AI in your work?\"",
      really: "Honesty, boundaries and verification habits, not enthusiasm.",
      prepare: "Prepare a clear answer: what you delegate, what you check, what you never hand over.",
    },
    {
      ask: "\"We release tomorrow and half the suite is red.\"",
      really: "Prioritisation under pressure and the ability to state trade-offs out loud.",
      prepare: "Practice the clarify, risks, plan, trade-offs structure on made-up scenarios.",
    },
    {
      ask: "\"How would you test a feature that uses an LLM?\"",
      really: "Whether you understand non-determinism and the oracle problem.",
      prepare: "Be able to explain why exact-match assertions fail and what to check instead.",
    },
  ];

  const framework = [
    { step: "Clarify", detail: "Ask what matters most, who the users are, what has changed and what constraints exist." },
    { step: "Identify risks", detail: "Name the ways this could hurt users or the business, roughly ranked." },
    { step: "Propose a plan", detail: "Concrete checks, in order, with the cheapest high-value ones first." },
    { step: "State trade-offs", detail: "Say what you are not doing, why, and what would change your mind." },
  ];

  const drills = [
    "Explain a flaky test fix: symptom, evidence, root cause, change, and how you proved it held",
    "Review a generated test and list at least three concrete weaknesses with the fix for each",
    "Outline an API test plan for a single endpoint in five minutes, covering contract, errors and auth",
    "Explain the oracle problem in two minutes to someone who has never heard the term",
    "Answer \"we release tomorrow\" using clarify, risks, plan and trade-offs, out loud, timed",
    "Describe how you use AI at work in under a minute, including one thing you never delegate",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            AI Strategy Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Interviews
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            QA Skills
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          QA Interviews in the Age of AI: What Interviewers Now Probe
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          When anyone can generate a test in seconds, the interesting question is who can tell a good one from a bad one.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 14, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
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
                  className="flex items-center gap-3 text-white/70 hover:text-indigo-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-indigo-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "They're no longer hiring someone who can write the test. They're hiring someone who can tell whether it's any
          good."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            For years, a lot of QA interview preparation looked like flashcards. Define regression testing. List the
            types of locators. Explain the difference between severity and priority. Name the annotations in your test
            framework. Candidates memorised the answers, interviewers ticked the boxes, and everyone went home slightly
            unsure whether they had learned anything about each other.
          </p>
          <p>
            That style of interview is losing its value, and AI assistants are the reason. When any candidate, and any
            employee, can ask a tool for a definition or a boilerplate test class in seconds, recall stops being a
            useful signal. What remains scarce is judgment: knowing what to test, noticing when generated work is
            subtly wrong, and being trustworthy with tools that are fast and confident. This is an opinionated guide to
            what interviewers often probe now, based on how the role is evolving, and how to prepare for it. It is not
            insider knowledge of any particular company's process. Every team runs interviews differently, but the
            direction of travel is fairly consistent.
          </p>
        </div>

        {/* Section 1 */}
        <section id="what-changed" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Changed</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The cost of producing test code has dropped. Page objects, request builders, fixture setup, data
              factories: the repetitive scaffolding that used to take an afternoon can now be drafted in minutes. That
              is genuinely useful. It also changes what an employer is paying for. If typing the code is cheap, the
              value moves to the decisions around the code: which tests deserve to exist, what each one should
              assert, and whether the thing that was generated actually checks what it claims to check.
            </p>
            <p>
              Judgment, by contrast, has not become cheaper. If anything it is scarcer, because there is now more
              plausible-looking output to judge. A team that adopts AI assistants without strong reviewers tends to
              accumulate tests that run green and prove very little. Interviewers who have seen that happen, or who
              simply anticipate it, adjust their questions accordingly. They spend less time on "do you know the
              syntax" and more on "would I trust this person's approval on a pull request".
            </p>
            <p>
              The table below is my summary of the shift. The left column is the kind of question you might hear. The
              middle column is what, in my reading, the interviewer is usually trying to learn. The right column is how
              to prepare for that underlying skill rather than the surface question.
            </p>
          </div>

          {/* Signature visual: three-column table */}
          <div className="overflow-x-auto rounded-2xl border border-indigo-500/20 mb-6">
            <table className="w-full text-sm text-left">
              <thead className="bg-indigo-500/10">
                <tr>
                  <th className="p-4 text-indigo-200 font-semibold">What they ask</th>
                  <th className="p-4 text-indigo-200 font-semibold">What they're really testing</th>
                  <th className="p-4 text-indigo-200 font-semibold">How to prepare</th>
                </tr>
              </thead>
              <tbody>
                {probeTable.map((row) => (
                  <tr key={row.ask} className="border-t border-white/10 align-top">
                    <td className="p-4 text-white/85 italic">{row.ask}</td>
                    <td className="p-4 text-white/65">{row.really}</td>
                    <td className="p-4 text-white/65">{row.prepare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            Notice that none of the right-hand column says "memorise". Every preparation step is a practice activity.
            That is the core message of this article: you cannot cram for judgment, but you can rehearse it.
          </p>
        </section>

        {/* Section 2 */}
        <section id="fundamentals" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Fundamentals Still Win</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              It would be easy to read the last section and conclude that classic testing knowledge no longer matters.
              The opposite is true. The fundamentals are exactly what lets you judge generated work. You cannot spot a
              missing boundary case if you do not think in boundaries. You cannot tell that an assertion is weak if you
              have never thought hard about what a test oracle is.
            </p>
            <p>
              What has changed is how those fundamentals are examined. Reciting "equivalence partitioning divides
              input into classes that should behave the same" is no longer impressive, because anyone can produce that
              sentence. Applying it is. Expect to be handed a small, concrete thing, such as a discount rule, a date
              range filter or a file upload limit, and asked to design tests for it live. The interviewer is watching
              whether techniques show up naturally in your reasoning without being named.
            </p>
            <p>
              The four areas I would make sure you can explain clearly, with an example of your own, are these:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { t: "Test design techniques", d: "Partitions, boundaries, decision tables, state transitions, pairwise. Know when each one earns its place." },
              { t: "Risk-based thinking", d: "Which failure would hurt most, who would notice, and how likely is it? Use that to order your work." },
              { t: "Boundaries and edges", d: "Empty, one, many, maximum, just over maximum, wrong type, wrong format, wrong time zone." },
              { t: "Oracles", d: "How do you know the result is right? Specs, comparisons, invariants, consistency, and human judgment." },
            ].map((f) => (
              <div key={f.t} className="bg-sky-500/5 border border-sky-500/15 rounded-2xl p-5">
                <p className="text-sky-300 font-semibold text-sm mb-2">{f.t}</p>
                <p className="text-white/65 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            The difference between reciting and explaining is the "because". "I'd test 99, 100 and 101 because the rule
            changes at 100 and off-by-one mistakes cluster at the edge" is an explanation. "I'd use boundary value
            analysis" is a label. Interviewers increasingly want the first and are politely unimpressed by the second.
          </p>
        </section>

        {/* Section 3 */}
        <section id="scenarios" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Scenario Questions and a Framework</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Scenario questions are where judgment is easiest to observe, so expect plenty of them. Three families come
              up often in some form. "This test is flaky" probes diagnosis. "This release is tomorrow" probes
              prioritisation under pressure. "This feature uses AI" probes whether you understand that some systems do
              not give the same output twice and need different kinds of checks.
            </p>
            <p>
              The trap with scenarios is answering too fast. A candidate hears "release tomorrow, suite is red" and
              immediately says "I'd rerun the failures and fix the flaky ones". That might even be a reasonable step,
              but it skips everything the interviewer wanted to see. A simple four-step structure helps you slow down
              without rambling:
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8">
            {framework.map((f, i) => (
              <div key={f.step} className="flex md:flex-col items-center gap-3 flex-1">
                <div className="flex-1 w-full bg-indigo-500/10 border border-indigo-500/25 rounded-2xl p-4">
                  <p className="text-indigo-300 font-mono text-xs mb-1">STEP {i + 1}</p>
                  <p className="text-white font-semibold mb-1">{f.step}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{f.detail}</p>
                </div>
                {i < framework.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-indigo-400/60 shrink-0 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Here is how that might sound for the release scenario. Clarify: "Is the red concentrated in one area or
              spread out? Are these new failures since the last green build? Which flows are business-critical for
              this release?" Identify risks: "If the failures are in checkout, that's a blocker until proven otherwise.
              If they're in a reporting screen nobody uses on day one, the risk is lower." Propose a plan: "Triage by
              area, separate known flaky tests from new failures, manually verify the critical flows, and get a
              developer on anything that looks like a real regression." State trade-offs: "We'd be shipping with less
              automated confidence in the low-risk areas, and I'd want that written down and agreed, not assumed."
            </p>
            <p>
              For the AI feature scenario, the same structure works. Clarify what the feature is supposed to do and
              what "good" looks like. Identify risks such as wrong answers, harmful output, data leakage or unpredictable
              behaviour. Propose a plan built on example sets, rubric-based checks and properties that must always hold,
              rather than exact-match assertions. State the trade-off that evaluation is probabilistic and some checks
              will need human review.
            </p>
            <p>
              The framework is not magic, and you should not announce it like a ritual. Its job is to stop you from
              jumping to a solution before you've shown that you understand the problem.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="reviewing" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <ScanSearch className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Reviewing Generated Work</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              If I were designing a QA interview today, this would be the centrepiece. Hand the candidate a test, a
              page object or a bug report that an assistant produced, and ask what's wrong with it. It mirrors real work
              more closely than writing code from a blank page, and it separates people who can read critically from
              people who can only generate.
            </p>
            <p>
              Generated test code often looks excellent at a glance. Names are descriptive, structure is neat, comments
              are tidy. The weaknesses hide in the details, and they tend to be the same kinds of weaknesses each time.
              Practise until you spot these quickly:
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { k: "Weak assertions", v: "Checking that an element is visible, or a response is not null, when the real question is whether the value is correct." },
              { k: "Brittle locators", v: "Long positional paths or styling classes that will break on the next layout change, instead of stable identifiers or roles." },
              { k: "Missing cases", v: "Only the happy path. No empty input, no permission failure, no boundary, no error response." },
              { k: "Hidden waits", v: "Fixed sleeps standing in for a real condition, which makes the test slow and still unreliable." },
              { k: "Shared state", v: "Tests that depend on data created by other tests, or that leave data behind for the next run." },
              { k: "Assertions that can't fail", v: "Comparing a value with itself, or asserting on a mock you configured to return exactly that value." },
            ].map((w) => (
              <div key={w.k} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="text-violet-300 font-semibold text-sm w-40 shrink-0">{w.k}</span>
                <span className="text-white/65 text-sm leading-relaxed">{w.v}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Bug reports get the same treatment. A generated bug report may be fluent and well formatted while missing
              the environment, the exact steps, the expected result or any evidence. It may also state a cause as fact
              when it is really a guess. Being able to say "this reads well, but a developer couldn't reproduce it from
              this" is precisely the skill being tested.
            </p>
            <p>
              When you review in an interview, prioritise. Lead with the issue that would cause the most damage, such
              as a test that cannot fail, then work down to style. Suggest a fix for each point. A list of ten nitpicks
              with no ranking is less convincing than three well-chosen problems with clear remedies.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="ai-honestly" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Talking About AI Use Honestly</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Sooner or later you will be asked how you use AI in your work. There are two bad answers. One is "I don't
              really use it", which can sound like you're avoiding a tool your future colleagues rely on. The other is
              breathless enthusiasm, "I use it for everything", which raises the question of who is checking the
              output. The good answer is specific and bounded.
            </p>
            <p>
              Structure it around four things. What you use it for: drafting boilerplate, generating test data ideas,
              summarising long logs, explaining unfamiliar code. What you check: whether the APIs it used exist,
              whether assertions are meaningful, whether the summary matches the source. What you never delegate:
              final decisions about release readiness, anything involving confidential data that policy says must not
              leave the company, and sign-off on test coverage for critical flows. And finally, a time it was wrong.
            </p>
            <p>
              That last point matters, because it shows that you actually verify. If you have a real example, use it
              and describe it accurately. If you don't, say so and describe a hypothetical instead: "I haven't been
              burned badly yet, but the failure I watch for is a generated test that asserts on the wrong field and still
              passes." Never invent a story to sound experienced. Interviewers ask follow-up questions, and an invented
              anecdote tends to fall apart on the second one. More importantly, honesty about your own tool use is the
              very trait they are trying to assess.
            </p>
          </div>

          <div className="border-l-4 border-indigo-400/60 bg-indigo-500/5 rounded-r-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-indigo-300 font-semibold">A one-line version to rehearse: </span>
              "I use AI to go faster on drafts, I verify everything it produces against the real system, and I keep the
              decisions that carry risk for myself."
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="show-thinking" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Show Your Thinking</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              In a world where the final answer can be generated, the reasoning behind it is the part that shows who
              you are. Interviewers want to hear how you got somewhere, not only where you ended up. Silence followed by
              a perfect answer is less informative than a slightly imperfect answer whose reasoning is out in the open.
            </p>
            <p>
              Narrating well is a skill, and it feels unnatural at first. A few habits help. Say what you're assuming
              before you rely on it: "I'm assuming this endpoint requires authentication; if not, my plan changes."
              Say why you're choosing one approach over another: "I'd start with the API layer because it's faster to
              test and most of the business rules live there." Say when you're unsure: "I don't know how this system
              handles concurrent edits; I'd want to ask the developers before designing tests around it."
            </p>
            <p>
              Admitting uncertainty is not weakness in this context. A tester's whole job is to find the edges of what
              is known. A candidate who confidently fills every gap with a guess is demonstrating the exact behaviour
              that makes AI output risky. A candidate who marks the gap and says how they'd close it is demonstrating
              the opposite.
            </p>
            <p>
              Finally, invite correction. "Does that match how your team works, or would you approach it differently?"
              turns a monologue into a conversation and often surfaces information that improves your answer. It also
              gives the interviewer a preview of what working with you would be like.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="drills" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Practice Drills</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              All of this is learnable, but only through practice. Reading about scenario frameworks does not make you
              fluent in them, the same way reading about boundary analysis does not make you good at spotting off-by-one
              bugs. The drills below are short enough to do in a spare half hour, and each one targets a skill from the
              table at the top of this article.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-500/25 rounded-2xl p-6 mb-6">
            <p className="text-indigo-200 font-semibold mb-1">Practice drills checklist</p>
            <p className="text-white/40 text-xs mb-5">Do each one out loud. Time yourself. Repeat weekly.</p>
            <div className="space-y-3">
              {drills.map((d) => (
                <div key={d} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-white/75 text-sm">{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A good way to get material for the review drill is to ask an assistant to write a test for a small feature
              you know well, then review its output as if a colleague had opened a pull request. Write your findings
              down. Over a few weeks you will build your own catalogue of typical weaknesses, and you will start spotting
              them faster. That catalogue is also excellent interview material, because it's genuinely yours.
            </p>
            <p>
              For the explanation drills, record yourself. It's uncomfortable, and it works. You'll notice filler, long
              detours and places where you used a term without explaining it. Two minutes is a deliberate limit: if you
              can explain the oracle problem clearly in two minutes, you understand it.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              QA interviews are drifting from "can you produce this" to "can you judge this". That's a healthy change.
              It rewards the people who understand testing deeply, and it makes preparation more about practice than
              memorisation. The fundamentals matter more than ever, because they are the lens you judge everything else
              through.
            </p>
            <p>
              Prepare by doing: design tests for small concrete rules, review generated code critically, rehearse
              scenario answers with a simple structure, and get honest about how you use AI. Be clear about what you
              delegate and what you keep. And when you don't know something, say so and explain how you'd find out.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-indigo-200 text-lg font-semibold">
              Be the person who can be trusted with the tool, not just the person who can use it.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Preparing for your next QA role?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about test design, reviewing AI-generated work and building the judgment interviewers look for.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default QAInterviewsAIAgeBlog;
