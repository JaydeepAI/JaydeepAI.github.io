import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  AlertTriangle,
  Target,
  Bug,
  Sparkles,
  ListChecks,
  Workflow,
  CheckCircle2,
  Github,
} from "lucide-react";

/**
 * Blog: Your AI-Generated Tests Are Green and Still Wrong: The Oracle Problem
 * Slug: /blog/ai-generated-tests-oracle-problem
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

const AIGeneratedTestsOracleBlog = () => {
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
    title: "Your AI-Generated Tests Are Green and Still Wrong: The Oracle Problem | Digital Jaydeep",
    description:
      "AI can write a hundred passing tests before lunch. The hard part was never writing them. It is deciding what 'correct' means, and that is still your job. A practical guide to the oracle problem for QA and automation engineers.",
    keywords:
      "AI test automation, AI-generated tests, oracle problem, test oracle, QA strategy, Selenium, Playwright, mutation testing",
    canonicalUrl: "https://jaydeepai.github.io/blog/ai-generated-tests-oracle-problem",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Your AI-Generated Tests Are Green and Still Wrong: The Oracle Problem",
      datePublished: "2026-10-14",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "green-illusion", label: "The Green Build Illusion" },
    { id: "oracle-problem", label: "What a Test Actually Is: Stimulus Plus Oracle" },
    { id: "quiet-failures", label: "Six Ways AI-Generated Tests Pass Quietly While Being Wrong" },
    { id: "where-ai-helps", label: "Where AI Genuinely Earns Its Place in QA" },
    { id: "three-questions", label: "A Review Framework: Three Questions for Every Generated Test" },
    { id: "workflow", label: "A Workflow That Works" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const quietFailures = [
    {
      title: "Mirror assertions",
      desc: "The expected value is copied from the current output, so the test asserts the bug along with everything else. If the total was wrong on the day the test was generated, the test now guarantees it stays wrong.",
    },
    {
      title: "Happy-path bias",
      desc: "Generated suites lean toward the flow that obviously works. Boundaries, empty states, permissions, concurrency and bad input get one token test or none at all.",
    },
    {
      title: "Assertion-light tests",
      desc: "The test clicks through a flow and only checks that no exception happened or that an element exists. It proves the page rendered, not that the numbers on it are right.",
    },
    {
      title: "Over-mocking",
      desc: "Everything the feature depends on is mocked, so the test verifies the mock setup rather than the integration that will actually break in production.",
    },
    {
      title: "Wrong-element matches",
      desc: "A loose locator finds some element that satisfies the check, so the test passes on the wrong thing. UI tests are especially prone to this when several elements share text or classes.",
    },
    {
      title: "Snapshot everything",
      desc: "A broad snapshot is captured once, approved by whoever is nearest, and then updated automatically whenever it changes. It records history; it does not defend behavior.",
    },
  ];

  const codeSample = `// Illustrative example — Selenium + JUnit style, generic names

// WEAK: proves the flow ran, not that the result is right
@Test
void submitOrder_showsConfirmation() {
    orderPage.open();
    orderPage.submit();
    assertTrue(orderPage.confirmation().isDisplayed());
}

// STRONG: the expectation comes from the pricing rule, not from the app
@Test
void submitOrder_totalAppliesDiscountRule() {
    int quantity = 4;
    BigDecimal unitPrice = new BigDecimal("25.00");

    orderPage.open();
    orderPage.setQuantity(quantity);
    orderPage.setUnitPrice(unitPrice);
    orderPage.submit();

    // Expected value computed independently from the requirement:
    // "Orders of 4+ units get a 10% discount" (pricing rule, ticket PRICE-12)
    BigDecimal expected = unitPrice
        .multiply(BigDecimal.valueOf(quantity))
        .multiply(new BigDecimal("0.90"));

    assertEquals(0, expected.compareTo(orderPage.displayedTotal()));
}

// Boundary / invalid input: the rule says quantity must be at least 1
@Test
void submitOrder_rejectsZeroQuantity() {
    orderPage.open();
    orderPage.setQuantity(0);
    orderPage.submit();

    assertTrue(orderPage.validationError().isDisplayed());
    assertFalse(orderPage.confirmation().isPresent());
}`;

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
            QA &amp; Test Automation Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            AI Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            QA Strategy
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Your AI-Generated Tests Are Green and Still Wrong: The Oracle Problem
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          AI made writing tests nearly free. It did not make knowing what "correct" means any cheaper.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 14, 2026
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
          "A test that cannot fail for the right reason is not a test. It is a decoration."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Most teams are asking the wrong question about AI and testing. They ask, "Can AI write my test
            automation?" It can. Give a modern model a page object, a user story and a few minutes, and you get a tidy
            suite with sensible names, clean structure and a green run. The question that matters is different: when
            one of those tests passes, what exactly did it prove?
          </p>
          <p>
            This article is about the gap between a test that runs and a test that protects you. That gap has an old
            name in testing theory: the oracle problem. AI did not create it, but AI makes it easy to ignore, because
            it produces the thing that looks like confidence, a wall of green, at almost no cost. If you own automation
            for a living, this is the part of the job that is becoming more important, not less.
          </p>
        </div>

        {/* Section 1 — Green Build Illusion */}
        <section id="green-illusion" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Green Build Illusion</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A passing test suite is evidence only if a failing suite was possible. Before AI, writing a test was slow
              enough that most engineers thought about the assertion while they typed it. The friction was annoying,
              but it forced a decision: what am I checking, and why? When a tool generates fifty tests in a minute, that
              friction disappears, and so does the decision.
            </p>
            <p>
              The result is a familiar pattern. Coverage numbers climb, the pipeline stays green, the dashboard looks
              healthy, and nobody can say which business rules are actually protected. Green stops being a signal and
              becomes a habit. Reviewers skim the generated code because it looks professional, the suite gets merged
              because it passes, and the team quietly starts treating "the tests ran" as if it meant "the product
              works".
            </p>
            <p>
              Coverage makes this worse, not better. Coverage tells you which lines executed during a test run. It says
              nothing about whether anything checked the result of running them. A generated test that walks through
              every branch and asserts nothing meaningful will produce excellent coverage and zero protection.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">The real danger: </span>
              it is not tests that fail. It is tests that cannot.
            </p>
          </div>
        </section>

        {/* Section 2 — Oracle Problem */}
        <section id="oracle-problem" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What a Test Actually Is: Stimulus Plus Oracle</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Every automated test has two halves. The <span className="text-white font-medium">stimulus</span> is what
              you do: open the page, submit the form, call the API. The{" "}
              <span className="text-white font-medium">oracle</span> is how you decide the result is right: the
              expected value, the rule, the comparison. Tools are very good at the stimulus half. Selenium, Playwright
              and REST clients do it reliably, and AI is great at generating it.
            </p>
            <p>
              The oracle half is different, because "expected" has to come from somewhere outside the code under test.
              It comes from a requirement, a contract, a regulation, a customer promise or the judgement of someone who
              understands the domain. A model reading your implementation can tell you what the code does. It cannot
              tell you what the code should do. When the oracle is inferred from the implementation, the test becomes a
              mirror: it passes when the code does what the code does.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">Stimulus</p>
              <p className="text-white/70 text-sm">
                Navigate, click, type, call, wait. Mechanical, repeatable, and something AI generates well from a page
                object or an API schema.
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-blue-300 font-semibold mb-2">Oracle</p>
              <p className="text-white/70 text-sm">
                The expected result and why it is expected. It has to come from outside the code: a rule, a contract,
                a person who knows the domain.
              </p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">Spec vs. code: </span>
              the spec says what it should do. The code says what it does. A test written from the code can only ever
              confirm the second.
            </p>
          </div>
        </section>

        {/* Section 3 — Quiet Failures */}
        <section id="quiet-failures" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Bug className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Six Ways AI-Generated Tests Pass Quietly While Being Wrong
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Each of these produces a green run. None of them would catch the defect you actually care about.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {quietFailures.map((item, i) => (
              <div key={item.title} className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-5">
                <p className="text-orange-300 font-semibold text-sm mb-2">
                  <span className="text-white/30 font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            None of these are exotic. A tired human writes them too. The difference is volume and speed: AI lets you
            produce them faster than any review process was designed to catch. A reviewer who could carefully read ten
            hand-written tests a day is now looking at a hundred generated ones, all of which look clean, and the
            weaknesses above are exactly the kind that look clean.
          </p>
        </section>

        {/* Section 4 — Where AI Helps */}
        <section id="where-ai-helps" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where AI Genuinely Earns Its Place in QA</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            This is not an anti-AI article. I use AI in my own automation work every week, and refusing to would be a
            choice to move slower for no reason. The point is to put it where it is strong.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Task</th>
                  <th className="text-left px-5 py-3 font-semibold">Why AI Is Good at It</th>
                  <th className="text-left px-5 py-3 font-semibold">What Still Needs a Human</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Test idea generation</td>
                  <td className="px-5 py-3 text-white/70">Broad brainstorming of scenarios and edge cases</td>
                  <td className="px-5 py-3 text-white/50">Selecting which risks actually matter</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Boilerplate &amp; page objects</td>
                  <td className="px-5 py-3 text-white/70">Repetitive structure, consistent naming</td>
                  <td className="px-5 py-3 text-white/50">Checking locators are stable and meaningful</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Data variants &amp; parameterization</td>
                  <td className="px-5 py-3 text-white/70">Quickly enumerates combinations</td>
                  <td className="px-5 py-3 text-white/50">Defining which combinations have business meaning</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Failure triage &amp; root-cause hints</td>
                  <td className="px-5 py-3 text-white/70">Reads logs and diffs fast</td>
                  <td className="px-5 py-3 text-white/50">Confirming the cause before the fix</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Refactoring an existing suite</td>
                  <td className="px-5 py-3 text-white/70">Mechanical and safe when tests already exist</td>
                  <td className="px-5 py-3 text-white/50">Verifying behavior is unchanged</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            Notice the pattern. AI is strong wherever the work is mechanical or exploratory, and weak wherever the work
            is deciding what is true. Use it for the first and keep the second.
          </p>
        </section>

        {/* Section 5 — Three Questions */}
        <section id="three-questions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              A Review Framework: Three Questions for Every Generated Test
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Before any AI-written test is accepted into the suite, it should survive three questions. They take a
            minute per test, and they are the cheapest quality gate you will ever add.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">1. What would make this test fail?</p>
              <p className="text-white/70 text-sm leading-relaxed">
                If you cannot name a realistic defect that turns it red, it is not protecting anything. Better still,
                prove it: temporarily break the behavior (change a calculation, remove a validation, flip a condition)
                and confirm the test goes red. This is the manual cousin of mutation testing, and it is the single
                highest-value habit you can build.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">2. Which requirement does the expected value come from?</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Every assertion should trace to a rule, a ticket, a contract or a domain expert, not to "whatever the
                app returned when I ran it". If the only source is the current output, you have a mirror, not an
                oracle.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">3. Who owns this expectation when it changes?</p>
              <p className="text-white/70 text-sm leading-relaxed">
                If the expected value is wrong tomorrow, someone must know it is theirs to update, and the test should
                make the intent obvious enough for them to decide whether the test or the product is wrong.
              </p>
            </div>
          </div>

          <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6">
            <p className="text-green-300 font-semibold mb-4">Accept a generated test only if...</p>
            <div className="space-y-3">
              {[
                "the assertion checks a business outcome, not just that the page loaded",
                "the expected value is written from the requirement, not copied from output",
                "at least one negative or boundary case exists next to the happy path",
                "the test has been seen to fail when the behavior is deliberately broken",
                "locators target the intended element, not any element that happens to match",
                "mocks are limited to true external boundaries",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Workflow */}
        <section id="workflow" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              A Workflow That Works: Humans Own the Oracle, AI Owns the Scaffolding
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            The fix is not to stop using AI. It is to split the work along the line where AI is strong and weak.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: "Write the expectations first",
                desc: "A human writes a short list in plain language: \"a discount over the limit is rejected\", \"a user without permission cannot see the tab\".",
              },
              {
                step: "Let AI build the scaffolding",
                desc: "AI turns each expectation into stimulus code, page objects and data setup.",
              },
              {
                step: "Review the assertions line by line",
                desc: "A human checks every assertion against the three questions above.",
              },
              {
                step: "Break it on purpose",
                desc: "Introduce a small defect in a branch, run the suite, and confirm the right tests fail.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-4"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium text-sm">{item.step}</p>
                  <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            Here is what the difference looks like in practice: the same check, written weakly and strongly.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              OrderTotalTest.java — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-blue-100/90 font-mono">
              <code>{codeSample}</code>
            </pre>
          </div>

          <p className="text-white/70 leading-relaxed">
            The strong version is not harder for AI to <em>write</em>. It is harder for AI to <em>know</em>, because
            the rule lives in the requirement, not in the code. That is exactly why the human step cannot be skipped.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI has changed how fast a QA engineer can produce automation, and anyone who ignores that will fall
              behind. But speed on the mechanical half moves the bottleneck to the judgement half. Writing the test is
              no longer the expensive part. Knowing what it should check is.
            </p>
            <p>
              The engineers who stay valuable will be the ones who can say what correct means, can prove a test is
              capable of failing, and can review generated work with suspicion instead of gratitude. That is not a
              smaller job than writing tests by hand. It is a more important one.
            </p>
            <p>
              One concrete thing to try this week: pick five AI-written tests from your own suite, deliberately break
              the behavior each one claims to protect, and see how many actually fail. The answer will tell you more
              about your suite than any coverage report.
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-teal-200 text-lg font-semibold">Green is cheap now. Trust still has to be earned.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Building a test suite you can actually trust?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about combining AI speed with automation that genuinely catches defects.
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

export default AIGeneratedTestsOracleBlog;
