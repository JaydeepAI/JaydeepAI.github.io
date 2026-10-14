import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Eye,
  BookCheck,
  SearchCode,
  Puzzle,
  ShieldAlert,
  FlaskConical,
  GitPullRequest,
  ListChecks,
  Github,
} from "lucide-react";

/**
 * Blog: Reviewing AI-Generated Code: A Tester's Checklist
 * Slug: /blog/reviewing-ai-generated-code-a-testers-checklist
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

const ReviewingAICodeChecklistBlog = () => {
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
    title: "Reviewing AI-Generated Code: A Tester's Checklist | Digital Jaydeep",
    description:
      "AI-generated code looks tidy and compiles, which is exactly why mistakes slip through. A tester's checklist for reviewing code you didn't write: invented APIs, hidden assumptions, edge cases, error handling, security and tests that prove something.",
    keywords:
      "AI generated code, code review, code review checklist, AI coding assistant, software quality, tester mindset, mutation testing, secure code review",
    canonicalUrl: "https://jaydeepai.github.io/blog/reviewing-ai-generated-code-a-testers-checklist",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Reviewing AI-Generated Code: A Tester's Checklist",
      datePublished: "2026-11-18",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "fluency-trap", label: "The Fluency Trap" },
    { id: "claims", label: "Check the Claims First" },
    { id: "assumptions", label: "Hunt the Assumptions" },
    { id: "edges", label: "Edges and Errors" },
    { id: "security", label: "Security and Data" },
    { id: "tests", label: "Tests That Prove Something" },
    { id: "diff", label: "Review the Diff, Not the Vibe" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const smells = [
    { t: "Plausible but invented APIs", d: "A method, option or parameter that sounds exactly right for the library, but doesn't exist in it." },
    { t: "Silent exception swallowing", d: "A catch block that logs nothing, returns a default and lets the caller believe everything worked." },
    { t: "Copy-paste duplication", d: "The same logic repeated with small variations, so a later fix lands in one copy and not the others." },
    { t: "Happy-path only", d: "Code that handles the example in the prompt beautifully and nothing else." },
    { t: "Overly broad try/catch", d: "One giant try around everything, catching every kind of error the same way." },
    { t: "Outdated usage patterns", d: "Approaches that were common in older versions of a library or language and have since been replaced." },
  ];

  const quickScan = [
    "Does it compile and run locally, on your machine, right now?",
    "Do all imported libraries and called methods actually exist?",
    "Is the change the size you expected, or did it touch unrelated files?",
    "Are there hard-coded secrets, URLs, paths or credentials?",
    "Are there empty or catch-all exception handlers?",
    "Do the tests run, and did you see at least one of them fail?",
  ];

  const deepReview = [
    { g: "Assumptions", items: ["Input shape, encoding and size", "Ordering and state", "Time zones, locales and clocks"] },
    { g: "Edges and errors", items: ["Empty, null, huge, duplicate", "Concurrent access", "Failure of every external call"] },
    { g: "Security and data", items: ["Untrusted input handled safely", "Least-privilege permissions", "No sensitive data in logs"] },
    { g: "Tests", items: ["Each test names what it would catch", "Assertions check values, not just presence", "Mutate the code and watch tests fail"] },
  ];

  const swallowSample = `// Illustrative example (TypeScript): looks tidy, hides failure

async function loadUserSettings(userId: string): Promise<Settings> {
  try {
    const response = await api.get("/users/" + userId + "/settings");
    return response.data;
  } catch (error) {
    // Every failure, from a typo in the URL to an expired session,
    // silently becomes "default settings". The caller can't tell.
    return DEFAULT_SETTINGS;
  }
}

// A reviewer's questions:
//  - Which errors are expected here, and which should propagate?
//  - Will anyone ever know this failed? Is it logged with context?
//  - Could a user lose their real settings by saving the defaults back?`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Code Review
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            AI Code
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Reviewing AI-Generated Code: A Tester's Checklist
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Read generated code the way you test software: assume nothing, check everything, and try to break it.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 18, 2026
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
                  className="flex items-center gap-3 text-white/70 hover:text-purple-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-purple-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Code that looks confident isn't code that's correct."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Reviewing human-written code has a familiar rhythm. You know the author, roughly how they think, and where they
            tend to cut corners. The rough edges of the code itself, a clumsy name here, an inconsistent style there, give
            you clues about where to look harder.
          </p>
          <p>
            AI-generated code removes most of those clues. It is consistently formatted, well named and neatly commented.
            It compiles more often than not. And that polish is precisely what makes it dangerous to review casually,
            because our instincts for "this looks fine" were trained on code where polish and care went together. Testers
            are well placed to fix this, because our whole discipline is built around not trusting how things look. This
            article is a checklist for reading code you didn't write, organised the way I'd test a feature: check the
            claims, hunt the assumptions, attack the edges, consider security, and make sure the tests actually prove
            something. I won't make claims about how often generated code is wrong; the patterns below are the ones worth
            watching for whenever it is.
          </p>
        </div>

        {/* Section 1 */}
        <section id="fluency-trap" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Fluency Trap</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Fluency creates trust that hasn't been earned. When a function is called <span className="font-mono text-purple-200 text-sm">validateAndNormalizeEmail</span>, has a tidy
              docstring and handles the example you gave it, your brain fills in the rest: of course it validates
              properly, of course it handles the weird cases. But the name is a promise, not a proof. The model chose a
              good name because good names are common in the code it learned from, not because it verified the behaviour
              matches.
            </p>
            <p>
              The fix is to deliberately separate how code looks from what it does. Treat every generated change as a
              claim to be tested, and look specifically for the kinds of weakness that hide well behind clean formatting.
              These are the smells I watch for:
            </p>
          </div>

          {/* Signature visual: smells grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {smells.map((s, i) => (
              <div
                key={s.t}
                className="relative bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border border-purple-500/20 rounded-2xl p-5"
              >
                <span className="absolute top-4 right-4 text-purple-400/40 font-mono text-xs">S{i + 1}</span>
                <p className="text-purple-200 font-semibold text-sm mb-2 pr-6">{s.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            None of these is unique to AI. Humans write every one of them. The difference is that a human's version usually
            looks a little rushed, which prompts a second look, while the generated version looks finished. Keep this grid
            in mind through the rest of the checklist; most of the sections below are ways of finding one of these six.
          </p>
        </section>

        {/* Section 2 */}
        <section id="claims" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <BookCheck className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Check the Claims First</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Before you think about logic, verify the facts. Every import, library, method, configuration option and
              command-line flag in generated code is a factual claim: "this exists and behaves like this". Language models
              can produce names that are entirely plausible and entirely invented, particularly for less common libraries
              or newer features, and they can mix up how different versions of the same library work.
            </p>
            <p>
              The first check is mechanical: compile it and run it. That catches the outright inventions, at least in
              languages with a compiler. In dynamic languages, an invented method may only fail when that exact line
              executes, which might be in an error branch you never trigger by hand. That's one more reason to run the
              tests and exercise the failure paths, not just the happy path.
            </p>
            <p>
              The second check is reading the real documentation for anything you don't already know well. Not a summary,
              not another AI's explanation: the library's own docs for the version your project actually uses. An option
              might exist but do something subtly different from what the generated comment claims. A method might exist
              but be deprecated, or behave differently with certain inputs. If you can't find a method in the
              documentation, treat it as invented until proven otherwise.
            </p>
            <p>
              The third check is dependencies. If the change adds a new package, ask whether it's needed at all, whether
              it's the package you think it is, and whether it's maintained and acceptable under your team's policies. A
              misspelled or unfamiliar package name deserves real scrutiny before it goes anywhere near your build.
            </p>
            <p>
              Comments are claims too. Generated code often explains itself confidently: "handles all edge cases",
              "thread-safe", "validates input". Each of those sentences is a statement you can test. If a comment says the
              function is safe to call concurrently, either you can see why in the code, or the comment should go. A
              comment that overstates what the code does is worse than no comment, because the next reader will believe it.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="assumptions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <SearchCode className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Hunt the Assumptions</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Generated code is written against the context it was given, and that context is almost always incomplete.
              Whatever the prompt didn't mention, the model filled in with typical defaults. Those defaults become hidden
              assumptions, and hidden assumptions are where production bugs come from.
            </p>
            <p>
              Go through the code and, for each input and each piece of state, ask what it's assuming. Some of the usual
              suspects:
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { k: "Input", v: "Is the input always present, always the expected type, always within a sensible size? What if it comes from a user, a file or another service?" },
              { k: "State", v: "Does the code assume something was initialised first, or that a record exists, or that it's the only process touching this data?" },
              { k: "Ordering", v: "Does it assume a list arrives sorted, events arrive in order, or callbacks fire in a particular sequence?" },
              { k: "Time", v: "Which time zone? Local time or UTC? What happens around daylight-saving changes, month ends or leap days?" },
              { k: "Encoding", v: "Does it assume plain ASCII text? What happens with accented names, other scripts, emoji or a byte-order mark in a file?" },
            ].map((a) => (
              <div key={a.k} className="flex items-start gap-4 border-l-2 border-purple-500/40 pl-4 py-1">
                <span className="text-purple-300 font-semibold text-sm w-20 shrink-0">{a.k}</span>
                <span className="text-white/65 text-sm leading-relaxed">{a.v}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A good trick is to write the assumptions down as a short list in the pull request description, then ask
              whether each one is guaranteed by the rest of the system or just hoped for. Guaranteed assumptions are fine.
              Hoped-for ones need either a check in the code or a test that pins the behaviour.
            </p>
            <p>
              Equally useful: compare the generated code against how your codebase already solves similar problems. If
              the rest of your project handles dates with a particular helper and the new code does its own parsing, that's
              not just a style issue. It's a second implementation with its own assumptions, which will drift from the
              first.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="edges" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Edges and Errors</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is home territory for testers. Run the classic edge list against every function that takes input: empty,
              null or missing, a single item, a huge number of items, duplicates, the maximum allowed value and just above
              it, and two callers at the same time. Generated code often handles the example in the prompt perfectly and
              stumbles on the second most common case.
            </p>
            <p>
              Then look at failure. For every external call, file read, network request, database query, parse, ask:
              what happens when this fails? The answer should be deliberate. Either the error is handled in a way that
              makes sense for the caller, or it propagates with enough context to diagnose it. What you don't want is the
              pattern below, which is common, tidy and quietly harmful.
            </p>
          </div>

          <div className="bg-black/40 border border-purple-500/20 rounded-2xl overflow-x-auto mb-6">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-purple-300 text-xs font-semibold uppercase tracking-wide">Silent swallowing</span>
              <span className="text-white/30 text-xs">illustrative</span>
            </div>
            <pre className="p-5 text-sm text-white/80 font-mono leading-relaxed">
              <code>{swallowSample}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Silent swallowing is a red flag because it converts a visible failure into invisible wrong behaviour. The
              user sees default settings and assumes they were reset. Support can't find an error in the logs because none
              was written. And if the user then saves, the defaults may overwrite real data. A loud failure would have
              been far kinder.
            </p>
            <p>
              Overly broad error handling is the cousin of this smell. One try block around a long function, catching every
              possible error and treating them the same, makes it impossible to tell a timeout from a bug from a permission
              problem. Ask for narrower handling: catch the specific errors you expect and know how to recover from, and
              let the rest surface.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="security" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Security and Data</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Generated code is optimised to work, and making something work is often easiest by making it permissive. That
              tendency shows up in three places worth checking on every review.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { t: "Secrets in code", d: "Example API keys, tokens or passwords written inline \"for now\", or connection strings with credentials embedded. They belong in your secret management, never in the repository." },
              { t: "Unsafe input handling", d: "Building queries, commands, file paths or HTML by joining strings with user input, instead of using the safe, parameterised mechanisms the framework provides." },
              { t: "Over-broad permissions", d: "Wildcard access rules, disabled certificate checks, permissive cross-origin settings or admin-level credentials used where read-only would do." },
            ].map((c) => (
              <div key={c.t} className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
                <p className="text-rose-300 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Data handling deserves its own glance. Does the code log full request bodies, which might include personal
              data or tokens? Does it return more fields than the caller needs? Does it store something sensitive in a
              place that's easy to read, like a browser's local storage or a plain-text file? These are easy to miss because
              the code works perfectly; it just shares more than it should.
            </p>
            <p>
              Treat "temporarily disabled" safety checks with particular suspicion. A comment saying "disable verification
              for local testing" has a way of surviving into production. If the change needs a check relaxed in a test
              environment, that should be controlled by configuration, with the safe setting as the default.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="tests" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tests That Prove Something</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Generated code often arrives with generated tests, and the combination can feel reassuring: green ticks,
              good names, reasonable coverage. But a test written by the same process that wrote the code tends to share
              its assumptions. If the code misunderstands the requirement, the test will usually misunderstand it in the
              same way and pass happily.
            </p>
            <p>
              For each test, ask one question: what bug would this catch? If you can't name one, the test isn't proving
              anything. Common weaknesses are assertions that only check something is not null or is visible, assertions
              against values that came from a mock configured to return exactly those values, and tests that exercise a
              function without asserting anything about the result at all.
            </p>
            <p>
              The most convincing check is to break the code on purpose. Change a comparison from less-than to
              less-than-or-equal. Remove a validation line. Return an empty list instead of the real result. Then run the
              tests. If they still pass, they weren't testing what you thought. This is the manual version of mutation
              testing, and it takes minutes. Revert your change afterwards, obviously.
            </p>
            <p>
              Finally, add the tests that are missing rather than only critiquing the ones that exist. The edge cases from
              the previous sections, the failure paths, the assumption checks: these are exactly the tests generated
              suites tend to leave out, and they're the ones that protect you when the code is changed again later,
              possibly by another round of generation.
            </p>
            <p>
              One habit helps a lot here: write or at least outline the important test cases before you look closely at
              the generated implementation. If you derive the cases from the requirement, they carry your understanding of
              what the code should do, not the model's understanding of what it did. When the two disagree, you've found
              either a bug or an ambiguity in the requirement, and both are worth knowing about before release.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="diff" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <GitPullRequest className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Review the Diff, Not the Vibe</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Generated changes tend to be large, because generating code is cheap. A request to fix one function can come
              back with that function rewritten, two helpers refactored and a formatting change across the file. Large
              diffs are where review quality collapses: past a certain size, people stop reading line by line and start
              judging the overall impression. That's reviewing the vibe.
            </p>
            <p>
              Keep changes small and single-purpose. If the assistant produced more than you asked for, split it, or ask for
              only the part you need. Read the actual diff, not the whole regenerated file. And run everything yourself
              before you commit: the build, the tests, the feature itself. "The assistant said it works" is not evidence.
              Here's the checklist I'd keep next to any review of generated code:
            </p>
          </div>

          {/* Signature visual: two-level checklist card */}
          <div className="rounded-2xl border border-purple-500/30 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-500/20 to-fuchsia-500/10 px-6 py-4 flex items-center gap-3">
              <ListChecks className="w-5 h-5 text-purple-300" />
              <p className="text-white font-semibold">Reviewing AI-generated code</p>
            </div>

            <div className="p-6 border-b border-white/10">
              <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-1">Level 1 · Quick scan</p>
              <p className="text-white/40 text-xs mb-4">Every change, a few minutes. Any "no" stops the review.</p>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2.5">
                {quickScan.map((q) => (
                  <div key={q} className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 rounded border border-purple-400/60 shrink-0" />
                    <p className="text-white/75 text-sm">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <p className="text-fuchsia-300 text-xs font-semibold uppercase tracking-widest mb-1">Level 2 · Deep review</p>
              <p className="text-white/40 text-xs mb-4">Anything that touches real users, data or money.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {deepReview.map((d) => (
                  <div key={d.g} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-fuchsia-200 text-sm font-semibold mb-2">{d.g}</p>
                    <div className="space-y-1.5">
                      {d.items.map((it) => (
                        <div key={it} className="flex items-start gap-2">
                          <span className="w-3.5 h-3.5 mt-0.5 rounded border border-fuchsia-400/60 shrink-0" />
                          <p className="text-white/65 text-sm">{it}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            The two levels exist so the checklist actually gets used. Nobody runs a deep review on a one-line log message
            change, and nobody should skip it on a change to payment logic. The quick scan is the floor; the deep review is
            for anything where being wrong would hurt.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI assistants make writing code faster. They don't make reviewing it optional, and they make one part of
              reviewing harder: the polish removes the visual cues we used to rely on. The answer is to review like a
              tester. Verify that everything the code claims to use actually exists. Write down the assumptions and
              challenge each one. Push on the edges and the failure paths. Look for permissive shortcuts. And demand tests
              that you have personally watched fail.
            </p>
            <p>
              None of this is anti-AI. It's the same discipline we'd apply to any code from any source, applied with a
              little extra suspicion where fluency might be doing the persuading.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-purple-200 text-lg font-semibold">
              Trust the tests you've seen fail, not the code that reads well.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Shipping more AI-written code than you can review?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about review checklists, meaningful tests and quality gates that keep generated code honest.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default ReviewingAICodeChecklistBlog;
