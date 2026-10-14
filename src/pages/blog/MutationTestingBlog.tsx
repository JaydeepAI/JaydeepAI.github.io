import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  EyeOff,
  Dna,
  Shuffle,
  Microscope,
  Sprout,
  Hammer,
  Bot,
  ArrowRight,
  ArrowDown,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Mutation Testing for People Who Think They Have Good Coverage
 * Slug: /blog/mutation-testing-for-teams-with-good-coverage
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

const MutationTestingBlog = () => {
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
    title: "Mutation Testing for People Who Think They Have Good Coverage | Digital Jaydeep",
    description:
      "Coverage tells you code ran, not that a bug would be noticed. Mutation testing breaks your code on purpose to see whether your tests care. A practical introduction for QA and automation engineers, including a manual version for UI and E2E suites.",
    keywords:
      "mutation testing, code coverage, test quality, surviving mutants, PIT, Stryker, test automation, AI-generated tests",
    canonicalUrl: "https://jaydeepai.github.io/blog/mutation-testing-for-teams-with-good-coverage",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Mutation Testing for People Who Think They Have Good Coverage",
      datePublished: "2026-11-01",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "coverage-blind-spot", label: "Coverage's Blind Spot" },
    { id: "what-is-a-mutant", label: "What a Mutant Is (and Why You Want It Dead)" },
    { id: "mutation-types", label: "The Mutation Types Worth Knowing" },
    { id: "read-survivors", label: "Reading the Survivors" },
    { id: "start-small", label: "Start Small: One Critical Module" },
    { id: "manual-version", label: "The Manual Version for UI and E2E Tests" },
    { id: "ai-written-tests", label: "Why This Matters More With AI-Written Tests" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const flowSteps = [
    { title: "Mutate", desc: "Make one tiny deliberate change to the production code." },
    { title: "Run tests", desc: "Run the tests that cover that code, unchanged." },
    { title: "Check survivors", desc: "Any mutant that leaves the suite green has survived." },
    { title: "Strengthen", desc: "Add or sharpen the assertion that should have noticed." },
  ];

  const mutationTypes = [
    {
      type: "Boundary change",
      example: "if (age >= 18) becomes if (age > 18)",
      notices: "A test that uses exactly 18, the value on the edge of the rule.",
    },
    {
      type: "Negated condition",
      example: "if (isActive) becomes if (!isActive)",
      notices: "Tests for both branches, each asserting a different outcome.",
    },
    {
      type: "Removed call",
      example: "auditLog.record(event); is deleted",
      notices: "A check that the side effect actually happened, not just that nothing crashed.",
    },
    {
      type: "Changed constant",
      example: "DISCOUNT = 0.10 becomes 0.0 or 1.10",
      notices: "An expected value computed from the rule, not copied from the output.",
    },
    {
      type: "Flipped boolean / return",
      example: "return true; becomes return false;",
      notices: "An assertion on the returned value, in both the allow and deny cases.",
    },
  ];

  const mutantSample = `// Illustrative example — generic Java, JUnit style

// Production code
public BigDecimal shippingFee(BigDecimal orderTotal) {
    if (orderTotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0) {
        return BigDecimal.ZERO;
    }
    return STANDARD_FEE;
}

// Mutant: boundary change (>= becomes >)
//     if (orderTotal.compareTo(FREE_SHIPPING_THRESHOLD) > 0)

// This test lets the mutant SURVIVE: it never touches the edge
@Test
void largeOrderShipsFree() {
    assertEquals(BigDecimal.ZERO, calc.shippingFee(new BigDecimal("500.00")));
}

// This test KILLS the mutant: it checks the exact threshold
@Test
void orderExactlyAtThresholdShipsFree() {
    assertEquals(BigDecimal.ZERO, calc.shippingFee(FREE_SHIPPING_THRESHOLD));
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Mutation Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Test Quality
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Mutation Testing for People Who Think They Have Good Coverage
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Your coverage report says the code was visited. It never said anyone was paying attention.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 1, 2026
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
          "If you can break the code and the suite stays green, the suite is not protecting that code."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every team I talk to has a coverage number, and almost every team is a little proud of it. The number goes
            up when tests are added, it shows up on a dashboard, and it gives managers something to track. The problem
            is that coverage answers a question nobody really cares about. It tells you which lines executed while the
            tests ran. It does not tell you whether a single one of those tests would have noticed if those lines were
            wrong.
          </p>
          <p>
            Mutation testing answers the question you actually care about. It breaks your code on purpose, one small
            change at a time, and checks whether your tests complain. If they do, good. If they do not, you have found
            a place where your suite is decorative. This article explains the idea, the common mutation types, how to
            read the results without drowning in them, and how to apply the same thinking by hand to UI and end-to-end
            tests where tooling does not reach.
          </p>
        </div>

        {/* Section 1 — Coverage blind spot */}
        <section id="coverage-blind-spot" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Coverage's Blind Spot</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Line coverage, branch coverage and their cousins all measure the same thing: execution. A line counts as
              covered when a test caused it to run. That is useful information. A line that never runs in any test is
              definitely untested, and coverage reports are good at pointing out those gaps.
            </p>
            <p>
              The trap is reading the reverse. A covered line is not a tested line. Imagine a test that calls a
              pricing method with a sensible input and then asserts that the result is not null. Every line in that
              method ran. Coverage is perfect. But you could double the price, halve it, or return the wrong currency,
              and the test would still pass, because it never checked the number.
            </p>
            <p>
              This is not a rare edge case. It is the natural shape of tests written under time pressure, tests copied
              from a template, and tests generated in bulk. They exercise the code and assert something easy: that the
              page loaded, that no exception was thrown, that a list is not empty. Execution without verification. The
              coverage report cannot tell the difference, because it was never designed to.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">Coverage asks</p>
              <p className="text-white/70 text-sm">"Did this line run during the tests?"</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-blue-300 font-semibold mb-2">Mutation testing asks</p>
              <p className="text-white/70 text-sm">"If this line were wrong, would any test notice?"</p>
            </div>
          </div>
        </section>

        {/* Section 2 — What a mutant is */}
        <section id="what-is-a-mutant" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Dna className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What a Mutant Is (and Why You Want It Dead)</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A mutant is a copy of your code with one tiny, deliberate change. A greater-than becomes a
              greater-than-or-equal. A condition gets negated. A method call disappears. A constant changes. Each
              mutant simulates the kind of small mistake a real developer makes on a tired afternoon.
            </p>
            <p>
              Then you run your existing tests against the mutant. If at least one test fails, the mutant is{" "}
              <span className="text-white font-medium">killed</span>: your suite noticed the bug. If every test still
              passes, the mutant <span className="text-white font-medium">survived</span>: you just proved that a real
              defect of that shape could ship without anyone finding out. A mutation tool repeats this for many
              mutants and reports which ones survived and where.
            </p>
            <p>
              The mindset flip is important. In normal testing, a failure is bad news. In mutation testing, a failure
              is exactly what you want. You are testing the tests, and a test that fails when the code is broken is a
              test doing its job.
            </p>
          </div>

          {/* Signature visual 1 — four-step flow */}
          <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-5">The mutation loop</p>
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              {flowSteps.map((step, i) => (
                <div key={step.title} className="flex flex-col md:flex-row items-center gap-3 flex-1">
                  <div className="w-full bg-[#0b1230] border border-blue-500/30 rounded-xl p-4 h-full">
                    <p className="text-blue-300 font-mono text-xs mb-1">STEP {i + 1}</p>
                    <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <>
                      <ArrowRight className="hidden md:block w-5 h-5 text-blue-400 shrink-0" />
                      <ArrowDown className="md:hidden w-5 h-5 text-blue-400 shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-5">
              Repeat for each mutant. The output is not a pass rate for your product; it is a map of where your tests
              are not looking.
            </p>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            You do not have to build this machinery yourself. Tools exist for most mainstream stacks, for example PIT
            for Java and Stryker for JavaScript and TypeScript. I am not going to compare them or list features here;
            the concept matters more than the tool, and every tool's documentation explains its own setup better than
            a blog post can.
          </p>
        </section>

        {/* Section 3 — Mutation types */}
        <section id="mutation-types" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Mutation Types Worth Knowing</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Tools ship with many mutation operators, but most of the insight comes from a handful. Each one maps to a
            family of real bugs, and each one has a matching kind of test that catches it. The right-hand column is
            the useful part: it tells you what a good test looks like.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-blue-500/20 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-500/10 text-blue-200 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Mutation</th>
                  <th className="text-left px-5 py-3 font-semibold">Example change</th>
                  <th className="text-left px-5 py-3 font-semibold">What a good test notices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {mutationTypes.map((row) => (
                  <tr key={row.type}>
                    <td className="px-5 py-3 text-blue-300 font-medium whitespace-nowrap">{row.type}</td>
                    <td className="px-5 py-3 text-white/70 font-mono text-xs">{row.example}</td>
                    <td className="px-5 py-3 text-white/60">{row.notices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Look at the pattern in that last column. Boundary mutants are killed by boundary tests. Negated
              conditions are killed by testing both sides of a decision. Removed calls are killed by asserting side
              effects. Changed constants are killed by expected values that come from the rule rather than from the
              current output. None of this is new testing theory. Mutation testing simply makes the absence of these
              habits visible and specific.
            </p>
            <p>
              Here is the boundary case in code. The first test looks reasonable and gives the method full coverage.
              It still lets the mutant live.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mt-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              ShippingFeeTest.java — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-blue-100/90 font-mono">
              <code>{mutantSample}</code>
            </pre>
          </div>
        </section>

        {/* Section 4 — Read survivors */}
        <section id="read-survivors" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Microscope className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Reading the Survivors</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The first mutation report on a real codebase can be humbling. It is tempting to treat the mutation score
              as the new coverage number and start chasing it. Please do not. The score is a summary; the value is in
              the individual survivors, and they are not all equal. Every survivor deserves a short triage, and it
              usually falls into one of three groups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
              <p className="text-purple-300 font-semibold text-sm mb-2">Missing assertion</p>
              <p className="text-white/60 text-sm leading-relaxed">
                The code runs in a test but the result is never checked, or is checked too loosely. This is the most
                common and most valuable finding. Fix it by asserting the actual outcome.
              </p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
              <p className="text-purple-300 font-semibold text-sm mb-2">Missing case</p>
              <p className="text-white/60 text-sm leading-relaxed">
                The assertions are fine but no test uses the input that would expose the change: the boundary value,
                the false branch, the empty list. Add the case.
              </p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
              <p className="text-purple-300 font-semibold text-sm mb-2">Equivalent mutant</p>
              <p className="text-white/60 text-sm leading-relaxed">
                The change does not alter any observable behavior, so no test could ever kill it. Mark it, ignore it,
                and move on. No test is missing here.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Equivalent mutants deserve a moment, because they are where people lose faith in the technique. Suppose
              a loop condition changes from "less than" to "not equal" and, given how the loop is written, both stop
              at the same place. The code is different, the behavior is identical. No test can tell them apart, and
              none should. Treat these as noise, not as failures of your suite.
            </p>
            <p>
              There is a fourth outcome worth naming: the survivor in code that does not matter. Logging statements,
              debug helpers, defensive code that can never be reached in practice. A surviving mutant there is real,
              but killing it may cost more than it is worth. That is a judgment call, and it is your call, not the
              tool's. Mutation testing gives you evidence. It does not set your priorities.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">A useful triage question: </span>
              "If this exact mutation shipped to production, would anyone care?" If yes, a test is missing. If no,
              either the mutant is equivalent or the code is low-risk enough to leave alone.
            </p>
          </div>
        </section>

        {/* Section 5 — Start small */}
        <section id="start-small" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start Small: One Critical Module</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The quickest way to give up on mutation testing is to point it at the entire codebase on day one. Think
              about what it does: for every mutant, it runs the relevant tests again. Many mutants times many tests
              adds up quickly, and mutation runs can be slow on large projects. You will also get a report so long
              that nobody reads it.
            </p>
            <p>
              Instead, choose one module where a defect would really hurt: pricing, permissions, a calculation that
              feeds an invoice, a validation that protects data. Run mutation testing only there. Triage every
              survivor. Fix the meaningful ones. You will learn more from one carefully read report on important code
              than from a project-wide score.
            </p>
            <p>
              Once the team has seen it work, decide how it fits into your rhythm. Some teams run it on a schedule
              rather than on every commit. Some run it only against the files changed in a pull request. Some keep it
              as a periodic audit tool for critical areas. All of these are reasonable. Making it a blocking gate on
              every build before anyone understands the output is usually not.
            </p>
          </div>

          <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6 mt-6">
            <p className="text-green-300 font-semibold mb-4">A sensible first run</p>
            <div className="space-y-3">
              {[
                "Pick one high-risk module with existing unit tests.",
                "Run mutation testing on that module only.",
                "Triage every survivor: missing assertion, missing case, equivalent, or low-value.",
                "Fix the meaningful ones and re-run to confirm they are killed.",
                "Share three concrete examples with the team before expanding scope.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Manual version */}
        <section id="manual-version" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Manual Version for UI and E2E Tests</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Mutation tools work at the unit level, against code they can change and recompile. Most QA automation
              engineers live higher up the stack: Selenium or Playwright suites, API tests, end-to-end flows that span
              several services. A tool cannot easily mutate a whole deployed system for you. But the idea transfers
              perfectly, and the manual version is one of the most valuable habits I know.
            </p>
            <p>
              It goes like this. Pick a test that claims to protect a behavior. Create a branch. Break that behavior
              deliberately in the application: change the discount rule, remove a validation, hide the button for the
              wrong role, return the wrong status. Deploy to a test environment, run the test, and watch. If the test
              goes red, it is real protection. If it stays green, you have just found a decoration.
            </p>
            <p>
              You do not need to do this for every test. Do it for the tests that guard the scariest behaviors, for
              new tests before you trust them, and for any test whose assertions look suspiciously thin. Pair with a
              developer if you do not have access to change the application; most developers enjoy this exercise more
              than you would expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {[
              { label: "Remove a validation", check: "Does the negative test now fail because invalid input was accepted?" },
              { label: "Change a calculation", check: "Does the test assert the computed value, or only that a value appeared?" },
              { label: "Swap a permission", check: "Does the role test fail when the wrong user can see the feature?" },
              { label: "Break an error message", check: "Does any test check what the user is told when something fails?" },
            ].map((item) => (
              <div key={item.label} className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-4">
                <p className="text-orange-300 font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-white/60 text-sm">{item.check}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            One caution: always confirm the right test fails for the right reason. If you break the discount rule and
            the test fails because a page took longer to load, you learned nothing. Read the failure message. A test
            that fails noisily for unrelated reasons is almost as misleading as one that never fails.
          </p>
        </section>

        {/* Section 7 — AI-written tests */}
        <section id="ai-written-tests" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why This Matters More With AI-Written Tests</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI assistants are very good at producing tests that look thorough. Clean names, consistent structure,
              setup and teardown in the right place, a test for every public method. Run coverage afterwards and the
              number jumps. It feels like a huge win, and sometimes it is.
            </p>
            <p>
              But a model generating tests from your implementation has a structural weakness. It sees what the code
              does and writes assertions that agree with it. If the code has a bug, the generated expected value often
              contains the same bug. If the method has a boundary, the model may or may not pick the boundary value.
              If a side effect matters, the model may assert the return value and forget the side effect entirely.
              These tests are green, well-formatted and covering, and they can still let every mutant in the table
              above survive.
            </p>
            <p>
              Mutation testing is the honest audit for generated suites. It does not care how readable a test is or
              who wrote it. It asks one blunt question per mutant: did anything notice? That makes it the right check
              to run after any large batch of AI-generated tests, and the manual break-it-on-purpose version is the
              right check for generated UI and API tests.
            </p>
            <p>
              There is also a positive loop here. Surviving mutants make excellent prompts. Instead of asking an
              assistant to "add more tests", give it a specific survivor: "this boundary change survived; write a test
              that fails if the threshold comparison is wrong, with the expected value taken from this rule." That is
              a narrow, verifiable task, which is exactly where AI help is most reliable. You then re-run the mutant
              to confirm the new test kills it.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">The rule I follow: </span>
              a generated test is a claim. A killed mutant is evidence. Do not accept the first without asking for the
              second on anything that matters.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Coverage is not useless. It is a good tool for finding code that nothing touches. It is a bad tool for
              deciding whether your tests protect you, and most teams use it for the second job. Mutation testing,
              automated at the unit level and manual at the UI and API level, is the most direct way I know to answer
              that question honestly.
            </p>
            <p>
              You do not need a big rollout. Pick one critical module, run it once, read every survivor, and fix the
              ones that matter. For your end-to-end suite, pick five tests that guard important behavior and break
              that behavior on purpose in a branch. Whatever you learn will be more specific and more actionable than
              any percentage on a dashboard.
            </p>
            <p>
              And if your suite was written quickly, by a tired human or a tireless model, assume the survivors are
              there until you have proved otherwise.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-blue-200 text-lg font-semibold">
              Don't ask how much your tests cover. Ask what they would notice.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Wondering what your suite would actually notice?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about measuring test strength, not just test volume, in suites written by humans and AI alike.
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

export default MutationTestingBlog;
