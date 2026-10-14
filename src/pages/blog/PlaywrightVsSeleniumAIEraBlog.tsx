import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  CircleHelp,
  Anchor,
  Zap,
  Route,
  Bot,
  Layers,
  FlaskConical,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Playwright vs Selenium in the AI Era: What Actually Changes
 * Slug: /blog/playwright-vs-selenium-in-the-ai-era
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

const PlaywrightVsSeleniumAIEraBlog = () => {
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
    title: "Playwright vs Selenium in the AI Era: What Actually Changes | Digital Jaydeep",
    description:
      "Forget the fan war. Both Playwright and Selenium work with AI assistants. The real decision depends on your team, your existing suite, the hidden cost of migration, and the testing discipline that stays the same no matter which tool you pick.",
    keywords:
      "Playwright vs Selenium, Selenium WebDriver, Playwright, test automation framework, AI test automation, test migration, QA tool choice",
    canonicalUrl: "https://jaydeepai.github.io/blog/playwright-vs-selenium-in-the-ai-era",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Playwright vs Selenium in the AI Era: What Actually Changes",
      datePublished: "2026-10-24",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "wrong-question", label: "The Wrong Question" },
    { id: "selenium", label: "Selenium in General Terms" },
    { id: "playwright", label: "Playwright in General Terms" },
    { id: "migration", label: "The Cost Nobody Budgets: Migration" },
    { id: "what-ai-changes", label: "What AI Changes" },
    { id: "what-ai-does-not-change", label: "What AI Does Not Change" },
    { id: "how-to-decide", label: "A Practical Way to Decide" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const decisionRows = [
    {
      situation: "Large existing Java suite that works",
      lean: "Stay on Selenium",
      chip: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      why: "The suite is an asset. Invest in stabilizing it, not replacing it. Pilot Playwright only for genuinely new areas.",
    },
    {
      situation: "New project, small team starting fresh",
      lean: "Lean Playwright",
      chip: "bg-teal-500/15 text-teal-300 border-teal-500/30",
      why: "Built-in waiting, tracing and setup tooling remove a lot of early framework plumbing. Less to build before the first useful test.",
    },
    {
      situation: "Mixed-language team (Java, Python, C#, JS)",
      lean: "Either, decide by the main codebase",
      chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      why: "Both offer several language bindings. Write tests in the language the product developers will actually read and review.",
    },
    {
      situation: "Heavy cross-browser grid needs, real device clouds",
      lean: "Lean Selenium",
      chip: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      why: "The WebDriver standard and Grid model are widely supported by vendors and infrastructure you may already use.",
    },
    {
      situation: "Front-end team writing their own tests in TypeScript",
      lean: "Lean Playwright",
      chip: "bg-teal-500/15 text-teal-300 border-teal-500/30",
      why: "Developer experience and tooling fit a JavaScript-first workflow, which raises the odds developers keep the tests alive.",
    },
    {
      situation: "Unstable suite, constant flakiness",
      lean: "Fix discipline first",
      chip: "bg-orange-500/15 text-orange-300 border-orange-500/30",
      why: "Flakiness usually comes from data, waits and environment. Switching tools moves those problems; it rarely removes them.",
    },
  ];

  const unchanged = [
    { title: "Test design", desc: "Which behaviors deserve a test, at what level, and with which boundaries." },
    { title: "The oracle", desc: "Where the expected result comes from and who owns it when it changes." },
    { title: "Test data", desc: "Isolated, repeatable, owned data that does not leak between tests." },
    { title: "Stability discipline", desc: "Condition-based waits, stable locators, independent tests, no hidden ordering." },
    { title: "Environment control", desc: "Known builds, healthy dependencies, and a way to tell product bugs from infrastructure noise." },
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Playwright vs Selenium
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Tool Choice
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Playwright vs Selenium in the AI Era: What Actually Changes
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          AI can write tests for either tool. That makes the framework decision smaller, and every other decision
          bigger.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 24, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 13 min read
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
                  className="flex items-center gap-3 text-white/70 hover:text-blue-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-blue-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Your framework is a tool choice. Your oracle is a thinking choice. AI only helps with the first."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every few months the same argument comes back to my feed. Someone posts that Selenium is dead. Someone else
            replies that Playwright is a fad. Both sides bring screenshots, both sides are confident, and almost nobody
            in the thread mentions the team, the codebase or the hundreds of existing tests that would have to move if
            the winner were actually chosen.
          </p>
          <p>
            AI assistants have added a new twist. If a model can write a page object for either tool in seconds, does
            the choice still matter? My honest answer is: less than the fan war suggests, and in different places than
            people expect. This article is a builder's comparison. No benchmarks, no version claims, just the
            trade-offs I think matter when you are the one who has to maintain the suite next year.
          </p>
        </div>

        {/* Section 1 */}
        <section id="wrong-question" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <CircleHelp className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Wrong Question</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              "Which is better?" sounds like an engineering question, but it is really a preference question wearing a
              lab coat. Better at what? For whom? Starting from where? A tool that is ideal for a three-person startup
              writing TypeScript can be the wrong call for a team with a mature Java suite wired into a grid, a
              reporting stack and years of habits.
            </p>
            <p>
              The useful question is narrower: which tool fits this team, this codebase and this set of constraints,
              and what would it cost to get there? That question has an answer. It might be different for two teams in
              the same company, and that is fine.
            </p>
            <p>
              When I look at automation suites that are in trouble, the tool is rarely the root cause. The trouble
              comes from tests that share data, waits that guess, locators that depend on layout, and assertions that
              check the page loaded rather than that the result is right. Those problems travel with you. You can
              rewrite a flaky Selenium suite in Playwright and end up with a flaky Playwright suite, faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">The fan-war question</p>
              <p className="text-white/70 text-sm">"Which framework is objectively better?"</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-blue-300 font-semibold mb-2">The useful question</p>
              <p className="text-white/70 text-sm">
                "Which framework can this team maintain, and what will switching cost compared to what it buys?"
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="selenium" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Anchor className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Selenium in General Terms</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Selenium is the long-standing option, and its biggest strength is exactly that it is long-standing. It is
              built around WebDriver, a standard way for a program to drive a browser that browser vendors support. That
              standards foundation is why so much infrastructure speaks Selenium: grids, cloud device providers,
              reporting tools and countless internal frameworks.
            </p>
            <p>
              It offers bindings for several mainstream languages, Java among them, which is why it became the default
              in many enterprise QA teams. If your product is built in Java and your developers review pull requests in
              Java, a Java Selenium suite lives in a language everyone around you can read. That matters more than most
              comparison articles admit.
            </p>
            <p>
              The ecosystem is huge. Most problems you will hit have been hit before, discussed, and solved in public.
              Patterns like the Page Object Model, explicit waits and grid execution are well documented. The trade-off
              is that Selenium gives you building blocks rather than a full kit: you often assemble the runner, the
              reporting, the waiting strategy and the retry policy yourself, and the quality of the suite depends
              heavily on how well that assembly was done.
            </p>
            <p>
              That last point is why some teams experience Selenium as "flaky". In my view, a lot of that flakiness is
              really missing discipline in the framework layer, for example fixed sleeps instead of condition-based
              waits. It is a fair criticism that the tool does not push you toward good habits by default. It is not a
              fair criticism that the tool cannot be stable.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-indigo-300 font-semibold">Strongest fit: </span>
              teams with an existing Java (or other mainstream language) suite that works, broad cross-browser and grid
              needs, and an organization that values standards and a deep ecosystem over the newest developer
              experience.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="playwright" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Playwright in General Terms</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Playwright is the newer option, and it was designed with the lessons of the previous generation in mind.
              Its API is modern, and it builds in behaviors teams used to write themselves. The headline one is
              auto-waiting: actions wait for elements to be ready before acting, which removes a whole class of timing
              mistakes from day one.
            </p>
            <p>
              It also ships tooling around the tests, not just the API. There is a trace viewer for stepping through
              what happened in a failed run, and a code generation tool that records interactions into test code. It
              supports several browser engines and multiple languages, with the JavaScript and TypeScript experience
              being the one most people meet first.
            </p>
            <p>
              The practical effect is quick onboarding. A new project can go from an empty folder to a running test
              with a report and a trace without building much framework plumbing. For a team that has never had a
              working suite, that speed is not a luxury. It is the difference between automation that exists and
              automation that is still being set up next quarter.
            </p>
            <p>
              The trade-offs are real but different. Built-in conventions are helpful until you need to work against
              them. Some teams will find less existing in-house knowledge, and if your developers live in Java, you need
              to check that the Playwright language binding you pick feels natural to them rather than assuming it does.
              Good defaults also do not replace good design: auto-waiting will not save a test that asserts the wrong
              thing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6">
              <p className="text-teal-300 font-semibold text-sm mb-3">What you get out of the box</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Auto-waiting on actions</li>
                <li>Tracing for failed runs</li>
                <li>Code generation from recorded actions</li>
                <li>Quick project setup and reporting</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white/60 font-semibold text-sm mb-3">What you still have to bring</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Meaningful assertions</li>
                <li>Isolated, owned test data</li>
                <li>Stable locator agreements with developers</li>
                <li>A clear structure as the suite grows</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="migration" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Route className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Cost Nobody Budgets: Migration</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Comparison posts usually compare two empty projects. Real teams almost never start from empty. They have
              a suite that runs every night, catches real regressions some of the time, and encodes years of decisions
              about what matters. That suite is an asset, even when it is annoying.
            </p>
            <p>
              Rewriting a large, working suite is a project, not a task. It needs its own plan, its own owner and its
              own risk assessment. While you migrate, you are running two suites, or worse, running a half-finished new
              one and quietly losing protection the old one gave you. Every test that moves has to be re-verified: does
              the new version still fail for the same defect the old one caught? If nobody checks that, the migration
              can look complete and still leave holes.
            </p>
            <p>
              There is also the surrounding work that never shows up in a "hello world" comparison: CI pipeline
              changes, reporting integrations, test data helpers, custom utilities, team training, and documentation.
              Each one is small. Together they are often bigger than the test code itself.
            </p>
            <p>
              None of this means you should never migrate. It means migration has to buy something concrete, such as
              lower maintenance effort, faster debugging or better developer participation, and that benefit has to be
              weighed honestly against the risk of losing coverage during the move.
            </p>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-6 mt-6">
            <p className="text-orange-300 font-semibold mb-4">Before you approve a migration, write down...</p>
            <div className="space-y-3">
              {[
                "the specific problem the current suite has, in plain words",
                "why that problem is caused by the tool rather than by test design or data",
                "how coverage will be protected while both suites exist",
                "how each migrated test will be proven to still catch its defect",
                "who owns the migration and what 'done' means",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="what-ai-changes" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What AI Changes</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Both tools are well represented in public code and documentation, so AI assistants can generate
              reasonable code for either. Ask for a page object, a fixture or a helper and you will get something
              plausible in both worlds. That alone shrinks one of the old arguments: "Playwright is easier to write"
              matters less when nobody is typing every line by hand.
            </p>
            <p>
              AI also lowers the cost of migration mechanics. Translating a Selenium page object into a Playwright one,
              or the reverse, is the kind of structured transformation assistants handle well. For a team that has
              already decided to move, that is a genuine help.
            </p>
            <p>
              Here is the catch. AI lowers the cost of writing and translating. It does not lower the cost of
              reviewing. Every generated or translated test still needs a human to confirm that the locator targets
              the intended element, that the wait condition is meaningful, and that the assertion still checks the
              business rule. If anything, review becomes the bottleneck, because output arrives faster than anyone can
              read it carefully.
            </p>
            <p>
              There is a subtler risk too. When an assistant translates a weak test, you get a weak test in a new
              syntax. Mirror assertions, happy-path bias and sleeps disguised as waits all survive translation
              perfectly. A migration done mostly by AI can feel like progress while carrying every old problem across.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {[
              { label: "Writing new tests", effect: "Cheaper with AI", color: "text-teal-300" },
              { label: "Translating between tools", effect: "Cheaper with AI", color: "text-teal-300" },
              { label: "Reviewing what was produced", effect: "Same cost, more volume", color: "text-orange-300" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white text-sm font-medium mb-1">{item.label}</p>
                <p className={`text-xs font-semibold ${item.color}`}>{item.effect}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section id="what-ai-does-not-change" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What AI Does Not Change</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              If you strip both tools down, they do the same job: drive a browser and report what happened. Everything
              that decides whether your suite is trustworthy sits above that layer, and none of it is solved by picking
              a framework or by asking a model to write code.
            </p>
            <p>
              This is the part of the comparison I wish more people argued about. A team that is excellent at the five
              things below will succeed with either tool. A team that is weak at them will struggle with both, and AI
              will help them struggle at higher speed.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-6">
            <p className="text-blue-300 font-semibold mb-5">What does not change, whichever tool you pick</p>
            <div className="grid md:grid-cols-2 gap-4">
              {unchanged.map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Auto-waiting is a good example of the boundary. It removes one category of timing failure, which is
            valuable. It does not decide what "ready" means for your business flow, it does not isolate your data, and
            it does not tell you whether the number on the screen is the right number.
          </p>
        </section>

        {/* Section 7 */}
        <section id="how-to-decide" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Practical Way to Decide</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Start with your situation, not with the tools. The table below is the lean I would take in each common
              case. It is an opinion, not a rule, and the last row is deliberately there to remind you that sometimes
              the right answer is "neither change is the fix".
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-500/20 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-500/10 text-blue-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Team situation</th>
                  <th className="text-left px-5 py-3 font-semibold">Recommended lean</th>
                  <th className="text-left px-5 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {decisionRows.map((row) => (
                  <tr key={row.situation}>
                    <td className="px-5 py-4 text-white font-medium align-top">{row.situation}</td>
                    <td className="px-5 py-4 align-top">
                      <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${row.chip}`}>
                        {row.lean}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/60 align-top">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              If the table does not settle it, run a pilot. Pick one real, moderately complex flow, the kind with a
              login, some data setup, a wait on something asynchronous and a meaningful assertion. Build it in both
              tools, ideally by the people who will maintain it. Then compare what actually matters for your team.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8">
            {[
              { step: "Pick one real flow", desc: "Login, data, async wait, business assertion." },
              { step: "Build it in both", desc: "Same flow, same people, same rules." },
              { step: "Break it on purpose", desc: "Confirm both versions fail for the right reason." },
              { step: "Live with it", desc: "Change the UI slightly and maintain both for a while." },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex md:flex-col items-center gap-3 flex-1">
                <div className="flex-1 w-full bg-teal-500/5 border border-teal-500/20 rounded-xl p-4">
                  <p className="text-teal-300 text-xs font-mono mb-1">STEP {i + 1}</p>
                  <p className="text-white text-sm font-medium">{item.step}</p>
                  <p className="text-white/60 text-xs mt-1">{item.desc}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-white/30 shrink-0 hidden md:block" />}
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Judge the pilot on maintenance effort and readability, not on how fast the first version was written.
              Which version could a teammate who did not write it debug at the end of a long day? Which one survived the
              small UI change with less effort? Which one made the failure easier to understand? Those answers will be
              more honest than any comparison article, including this one.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Both tools are capable. Selenium brings a standard, language breadth and an ecosystem that many teams
              already depend on. Playwright brings modern defaults and tooling that make a fresh start pleasant. AI makes
              writing and translating code for either one cheaper, which shrinks the framework question rather than
              settling it.
            </p>
            <p>
              What AI does not shrink is the hard part: deciding what to test, where the expected result comes from,
              how the data is isolated, and how the environment is controlled. That is where suites succeed or fail,
              and that work looks the same in both tools.
            </p>
            <p>
              So my advice is boring on purpose. If you have a working suite, stabilize it before you replace it. If you
              are starting fresh, pilot one real flow and let your team's experience decide. And whichever way you go,
              spend more of your review energy on assertions than on syntax.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-blue-200 text-lg font-semibold">
              Pick the tool your team can maintain. Spend the saved energy on what you assert.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Weighing a framework switch?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about piloting the right tool for your team and keeping your coverage safe along the way.
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

export default PlaywrightVsSeleniumAIEraBlog;
