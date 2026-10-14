import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Repeat,
  BookOpen,
  ListChecks,
  Ban,
  Scissors,
  GitPullRequest,
  FileCode,
  CircleX,
  ArrowRight,
  Github,
} from "lucide-react";

/**
 * Blog: CLAUDE.md for Test Repos: Teaching an AI Your Framework's Rules
 * Slug: /blog/claude-md-for-test-repositories
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

const ClaudeMdForTestReposBlog = () => {
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
    title: "CLAUDE.md for Test Repos: Teaching an AI Your Framework's Rules | Digital Jaydeep",
    description:
      "A short project instructions file turns a generic AI coding assistant into one that knows your commands, naming rules, locator strategy and no-go zones. What belongs in a CLAUDE.md for a test automation repo, what to leave out, and a full sample for a Java Selenium/JUnit project.",
    keywords:
      "CLAUDE.md, Claude Code, project memory, test automation, Selenium, JUnit, AI coding assistant, test framework conventions",
    canonicalUrl: "https://jaydeepai.github.io/blog/claude-md-for-test-repositories",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "CLAUDE.md for Test Repos: Teaching an AI Your Framework's Rules",
      datePublished: "2026-10-29",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "repeating-mistakes", label: "Why a Blank-Slate AI Keeps Repeating Mistakes" },
    { id: "what-its-for", label: "What the File Is For" },
    { id: "what-to-include", label: "What to Include" },
    { id: "what-to-forbid", label: "What to Forbid" },
    { id: "keep-it-short", label: "Keep It Short" },
    { id: "maintain-it", label: "Maintain It Like Code" },
    { id: "sample-file", label: "A Sample File" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const sampleClaudeMd = `# CLAUDE.md — UI test automation repo (illustrative example)

## Stack
- Java 17, Maven, Selenium WebDriver, JUnit 5
- Tests run against the QA environment only (base URL comes from config, never hard-code it)

## Commands
- Build without tests:      mvn -q -DskipTests compile
- Run one test class:       mvn test -Dtest=CheckoutTest
- Run a tagged group:       mvn test -Dgroups=smoke
- Never run the full suite unless asked; it is slow and shares the QA environment

## Layout
- src/main/java/.../pages      page objects, one class per screen
- src/main/java/.../components shared widgets (header, modal, table)
- src/main/java/.../data       test data builders
- src/test/java/.../tests      test classes, grouped by feature
- src/test/resources           config and test data files

## Conventions
- Page objects: <Screen>Page, public methods describe user actions (login, addItem)
- Page objects return values or other page objects; they never assert
- Tests: <Feature>Test; method names read as behavior, e.g. checkout_rejectsExpiredCard
- One behavior per test; arrange data through builders, not inline literals

## Locators
- Prefer data-testid, then accessible role/name, then stable id
- No absolute XPath, no index-based selectors, no text that changes with locale
- If no stable locator exists, stop and tell me; do not invent a fragile one

## Waits
- Explicit waits on a condition only (WebDriverWait + ExpectedConditions)
- Never Thread.sleep, never raise implicit wait to hide a timing problem

## Test data
- Each test creates its own data through builders; no shared accounts
- Never use real customer data; use the synthetic builders in /data

## Definition of done
- Code compiles, the changed tests pass locally
- New test seen failing once when the behavior is broken on purpose
- No new warnings; no unused imports

## Do not
- Do not edit files under src/main/java/.../framework without asking
- Do not modify config files, CI pipeline files or pom.xml dependencies without asking
- Do not commit, push or create branches; I review and commit
- Do not add secrets, tokens or passwords anywhere; read them from env vars
- Do not delete or disable failing tests to make a run green`;

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
            AI Builder Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Claude Code
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Project Memory
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          CLAUDE.md for Test Repos: Teaching an AI Your Framework's Rules
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          A coding assistant starts every session as a talented stranger. One short file can make it a colleague who
          has read the onboarding doc.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 29, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
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
          "Every time an AI makes the same mistake twice, a rule is missing from the file."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            If you use an AI coding assistant on a test automation repo, you have probably had this week. Monday, it
            adds a <span className="font-mono text-indigo-200">Thread.sleep</span> to fix a timing issue and you remove
            it. Tuesday, it writes an absolute XPath and you replace it with a test id. Wednesday, it puts an assertion
            inside a page object. Thursday, it does the sleep thing again. Each mistake is small. Together they cost you
            more review time than the assistant saved.
          </p>
          <p>
            The problem is rarely the model's ability. It is that every session starts from zero, and your framework's
            rules live in your head, in old review comments and in a wiki page nobody opens. Claude Code, like several
            other coding assistants, reads a project instructions file at the start of a session. For Claude Code that
            file is CLAUDE.md. Used well, it is the cheapest quality improvement you can make to AI-assisted test
            automation. Used badly, it is a long document the assistant skims the same way people skim long documents.
          </p>
        </div>

        {/* Section 1 — Repeating mistakes */}
        <section id="repeating-mistakes" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Repeat className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why a Blank-Slate AI Keeps Repeating Mistakes</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              An AI assistant arrives with a huge amount of general knowledge about Selenium, JUnit, Maven and every
              common pattern in public code. What it does not arrive with is your choices. Public code contains every
              style at once: sleeps and explicit waits, XPath and CSS, assertions in page objects and assertions in
              tests. When the model has no signal about which ones your team accepts, it picks whatever is most common
              or most convenient for the task in front of it.
            </p>
            <p>
              It can sometimes infer your conventions by reading existing files, and a good assistant will try. But
              inference is fragile. If the file it happens to open first is an old test written before the team agreed
              on locator rules, it will copy the old style faithfully. Legacy code is a terrible teacher because it
              looks exactly as authoritative as new code.
            </p>
            <p>
              Correcting it in chat helps for that session only. Tomorrow's session does not remember yesterday's
              correction. That is why the same mistake comes back, and why repeating yourself in chat feels so
              frustrating: you are training a colleague who forgets everything overnight.
            </p>
          </div>

          {/* Mini flow */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 my-8">
            {[
              { label: "Session starts", sub: "No knowledge of your rules" },
              { label: "Reads a random file", sub: "Copies whatever style it finds" },
              { label: "You correct it", sub: "Fix lives in chat only" },
              { label: "Next session", sub: "Same mistake returns" },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex flex-col md:flex-row items-center gap-3 flex-1">
                <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-white text-sm font-medium">{s.label}</p>
                  <p className="text-white/50 text-xs mt-1">{s.sub}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 rotate-90 md:rotate-0" />}
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            The fix is to move the correction out of the chat and into the repository, where it survives the session.
          </p>
        </section>

        {/* Section 2 — What it's for */}
        <section id="what-its-for" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What the File Is For</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              In general terms, CLAUDE.md is a plain markdown file of persistent project instructions. Claude Code
              reads it when a session starts, so whatever is in it becomes part of the context for everything the
              assistant does in that repo. It is not code, configuration or a prompt you paste each time. It is
              closer to a standing briefing.
            </p>
            <p>
              The best mental model I have found is the onboarding note you would hand a capable new engineer on day
              one. Not the full architecture document, not the history of every decision, but the page that says: here
              is how you build and run things, here is how we name things, here is what we never do, and here is what
              "done" means. A new human reads that once and asks follow-up questions. An assistant reads it every
              session and, if it is written clearly, follows it.
            </p>
            <p>
              Two things the file is not. It is not a guarantee: the assistant can still misread or ignore an
              instruction, especially a vague one, so review stays your job. And it is not a replacement for linters,
              formatters or CI checks. If a rule can be enforced mechanically, enforce it mechanically and let the file
              explain the intent. Rules that only live in prose are rules that can be skipped.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-indigo-300 font-semibold">Think of it as: </span>
              the difference between telling a contractor your house rules every morning and taping them to the front
              door once.
            </p>
          </div>
        </section>

        {/* Section 3 — What to include */}
        <section id="what-to-include" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Include</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            For a test repository, six kinds of information pay for themselves almost immediately. Each one maps to a
            mistake you have probably already corrected by hand.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Section</th>
                  <th className="text-left px-5 py-3 font-semibold">What it contains</th>
                  <th className="text-left px-5 py-3 font-semibold">Mistake it prevents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Stack &amp; commands</td>
                  <td className="px-5 py-3 text-white/70">Language, build tool, how to compile, run one test, run a group</td>
                  <td className="px-5 py-3 text-white/50">Guessing commands, running the whole slow suite to check one change</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Folder layout</td>
                  <td className="px-5 py-3 text-white/70">Where page objects, components, data builders and tests live</td>
                  <td className="px-5 py-3 text-white/50">New files in the wrong place, duplicate helpers</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Naming &amp; page objects</td>
                  <td className="px-5 py-3 text-white/70">Class and method naming, what page objects may and may not do</td>
                  <td className="px-5 py-3 text-white/50">Assertions inside page objects, inconsistent test names</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Locator strategy</td>
                  <td className="px-5 py-3 text-white/70">Preferred attributes in order, banned selector styles</td>
                  <td className="px-5 py-3 text-white/50">Absolute XPath, index-based and text-based selectors</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Data rules</td>
                  <td className="px-5 py-3 text-white/70">How tests create data, which builders exist, what data is forbidden</td>
                  <td className="px-5 py-3 text-white/50">Shared accounts, hard-coded records, real personal data</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-indigo-300 font-medium">Definition of done</td>
                  <td className="px-5 py-3 text-white/70">What must be true before the assistant reports a task as finished</td>
                  <td className="px-5 py-3 text-white/50">"Done" meaning "compiles", tests never seen failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The commands section deserves special attention. An assistant that can run commands will try to verify
              its work, which is good, but it will guess how if you do not tell it. Giving it the exact command to run a
              single test class means it checks its own change in seconds instead of launching a full regression run
              against a shared environment.
            </p>
            <p>
              The definition of done is the section most teams forget, and in a test repo it carries the most weight.
              "The test passes" is not done. A new test that has never been seen failing has not proven anything. Write
              that expectation down and the assistant will at least attempt to break the behavior and confirm the
              failure, or tell you it could not.
            </p>
          </div>
        </section>

        {/* Section 4 — What to forbid */}
        <section id="what-to-forbid" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Ban className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Forbid</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Positive conventions tell the assistant how to do things. Prohibitions tell it where the edges are, and
              in my view they are the lines that matter most. A model trying to be helpful will take the
              shortest path to a green result. Sometimes that path goes through a file it should never touch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Protected files and folders",
                desc: "Core framework code, CI pipeline definitions, dependency files and shared config. Changes there affect every test and every teammate; require an explicit ask.",
              },
              {
                title: "No committing or pushing",
                desc: "The assistant proposes, you commit. Keeping git in human hands is the simplest safety model there is, and it forces a review of every diff.",
              },
              {
                title: "No secrets, ever",
                desc: "No tokens, passwords or keys in code, config or test data. Credentials come from environment variables or a secrets store the assistant never needs to read.",
              },
              {
                title: "No sleeps, no disabled tests",
                desc: "Fixed sleeps hide timing problems; disabling or deleting a failing test hides everything. Both make a run green while making the suite worse.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5">
                <p className="text-red-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            Write prohibitions as plain, unambiguous sentences: "Do not commit." is better than "Please be careful
            about version control." Where your tooling supports it, back the most important ones with real permission
            settings rather than relying on the instruction alone. A rule in a file is guidance. A permission is a wall.
          </p>
        </section>

        {/* Section 5 — Keep it short */}
        <section id="keep-it-short" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Keep It Short</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The temptation, once you see the file working, is to put everything in it: the architecture overview,
              the full style guide, every edge case anyone ever hit. Resist it. Brevity beats completeness here for the
              same reason it does with humans. A file with two hundred rules has no priorities. The important lines
              drown in the trivia, and instructions that contradict each other get resolved unpredictably.
            </p>
            <p>
              A few practical limits I hold myself to. Every line should be something the assistant would plausibly
              get wrong without it. If a rule restates a default every competent engineer follows, cut it. If two rules
              say similar things in different words, merge them. If a section explains why at length, keep one sentence
              of why and link to the longer doc for humans.
            </p>
            <p>
              Write in the imperative, with concrete examples. "Prefer data-testid, then role and name, then id" is
              actionable. "Use good, maintainable locators" is a wish. The assistant cannot act on a wish any better
              than a new hire can.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">Vague, gets ignored</p>
              <p className="text-white/60 text-sm font-mono leading-relaxed">
                Write clean, robust tests following best practices and make sure they are stable.
              </p>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-indigo-300 font-semibold mb-2">Specific, gets followed</p>
              <p className="text-white/70 text-sm font-mono leading-relaxed">
                Explicit waits on a condition only. Never Thread.sleep. One behavior per test.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 — Maintain it */}
        <section id="maintain-it" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <GitPullRequest className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Maintain It Like Code</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The file is only useful while it is true. A CLAUDE.md that still says the suite uses an old reporting
              library, or points to a folder that was renamed, will actively mislead the assistant. Stale instructions
              are worse than none, because they carry authority.
            </p>
            <p>
              The update rule is the pull-quote at the top of this article: when the assistant makes the same mistake a
              second time, that is a missing or unclear rule. Add a line, or sharpen the existing one. Over a few weeks,
              the file becomes a compact record of exactly the places where your conventions differ from the internet's
              average.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                step: "Notice the repeat",
                desc: "Same correction twice in review or in chat. That is the trigger, not a one-off slip.",
              },
              {
                step: "Write the rule",
                desc: "One imperative line, with an example if the rule is about style or naming.",
              },
              {
                step: "Review it in a pull request",
                desc: "The file changes how every teammate's assistant behaves. It deserves the same review as shared code.",
              },
              {
                step: "Prune on a schedule",
                desc: "Every so often, read it top to bottom and remove anything outdated, duplicated or never relevant.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-teal-500/5 border border-teal-500/15 rounded-xl p-4"
              >
                <span className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium text-sm">{item.step}</p>
                  <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            Commit the file to the repository so the whole team shares one version. Personal preferences, such as how
            verbose you like explanations, belong in your own local settings, not in the shared file. A side effect
            worth noticing: a well-kept CLAUDE.md is often the clearest written description of your framework's rules
            the team has ever had. New human engineers benefit from it too.
          </p>
        </section>

        {/* Section 7 — Sample */}
        <section id="sample-file" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <FileCode className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Sample File</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is a complete example for a generic Java, Selenium and JUnit test repository. Paths and names are
            placeholders. The point is the shape: short sections, imperative lines, concrete examples, and a clear
            "do not" list at the end.
          </p>

          {/* Signature visual — styled CLAUDE.md */}
          <div className="rounded-2xl overflow-hidden border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-8">
            <div className="flex items-center gap-2 px-5 py-3 bg-indigo-500/15 border-b border-indigo-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs text-indigo-200 font-mono">CLAUDE.md</span>
              <span className="ml-auto text-xs text-white/40">illustrative</span>
            </div>
            <pre className="bg-black/50 p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-indigo-100/90 font-mono">
              <code>{sampleClaudeMd}</code>
            </pre>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Notice what is missing. There is no explanation of what Selenium is, no history of the framework, no
            generic advice about clean code. The model already knows all of that. Every line is either specific to
            this repo or a rule the assistant would plausibly break without being told.
          </p>

          {/* Anti-patterns card */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <p className="text-red-300 font-semibold mb-4">Anti-patterns that make the file worse</p>
            <div className="space-y-3">
              {[
                "Copying the whole style guide in, so the five rules that matter are buried in fifty that do not",
                "Vague adjectives like 'clean', 'robust' or 'appropriate' instead of concrete rules",
                "Contradictions between sections, such as one saying 'never touch config' and another asking it to update a URL in config",
                "Outdated commands or folder paths that no longer exist",
                "Secrets, internal hostnames or credentials pasted in 'for convenience'",
                "Personal preferences mixed into the shared team file",
                "Using the file instead of a linter for rules a tool could enforce automatically",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleX className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
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
              Most frustration with AI coding assistants on test repos is not about intelligence. It is about context.
              The assistant does not know your rules because nobody wrote them down in a place it reads. A short,
              specific, maintained CLAUDE.md fixes a surprising share of that, and it costs an afternoon to write the
              first version.
            </p>
            <p>
              It will not make review optional. The assistant can still misread an instruction or meet a situation the
              file never covered. But the corrections you make will shift from the same basic habits every day to
              genuinely new problems, which is where your review time should go anyway.
            </p>
            <p>
              Start small this week: write ten lines covering commands, locators, waits and your "do not" list. Then let
              the repeated mistakes tell you what to add next.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-indigo-200 text-lg font-semibold">
              Write the onboarding doc you wish every new engineer, human or not, had read.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Setting up AI assistants on your test framework?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about project instructions, guardrails and review habits that keep AI-written tests on your
            team's standards.
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

export default ClaudeMdForTestReposBlog;
