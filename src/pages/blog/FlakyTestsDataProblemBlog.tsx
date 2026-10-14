import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Hourglass,
  Layers,
  ClipboardList,
  Wrench,
  Archive,
  Bot,
  Repeat,
  CircleCheck,
  Github,
} from "lucide-react";

/**
 * Blog: Flaky Tests Are a Data Problem, Not a Timing Problem
 * Slug: /blog/flaky-tests-are-a-data-problem
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

const FlakyTestsDataProblemBlog = () => {
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
    title: "Flaky Tests Are a Data Problem, Not a Timing Problem | Digital Jaydeep",
    description:
      "Adding another sleep is not a fix. Classify every flaky test failure by root cause, keep a flake ledger, and the pattern will tell you where your automation suite is actually broken. A practical guide for QA and automation engineers.",
    keywords:
      "flaky tests, test automation, root cause analysis, Selenium explicit wait, test stability, flake ledger, test quarantine, deterministic tests",
    canonicalUrl: "https://jaydeepai.github.io/blog/flaky-tests-are-a-data-problem",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Flaky Tests Are a Data Problem, Not a Timing Problem",
      datePublished: "2026-10-16",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "symptom-fix", label: "Why \"Just Add a Wait\" Is a Symptom Fix" },
    { id: "four-buckets", label: "Four Root-Cause Buckets" },
    { id: "flake-ledger", label: "Build a Flake Ledger" },
    { id: "fix-by-bucket", label: "Fix by Bucket, Not by Test" },
    { id: "quarantine", label: "Quarantine, Fix or Delete" },
    { id: "ai-help", label: "Where AI Helps and Where It Doesn't" },
    { id: "determinism", label: "Make Determinism a Design Goal" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const buckets = [
    {
      name: "Locators & UI state",
      example:
        "A test clicks \"Save\" using a locator that matches two buttons. Depending on render order, it hits the visible one or a hidden duplicate in a modal. Same test, same build, different outcome.",
    },
    {
      name: "Synchronization & timing",
      example:
        "The test reads a status label right after a click, while the app is still waiting on an API call. On a quiet machine the response wins the race; on a busy CI agent it loses.",
    },
    {
      name: "Test data & shared state",
      example:
        "Two tests use the same seeded account. One changes its address while the other asserts on it. Run alone, both pass. Run in parallel, one of them fails, and which one depends on scheduling.",
    },
    {
      name: "Environment & infrastructure",
      example:
        "A shared test environment restarts a dependent service during a deployment, or a browser node runs out of memory. The test did nothing wrong; the ground moved under it.",
    },
  ];

  const codeSample = `// Illustrative example: Selenium WebDriver (Java), generic names

// BEFORE: a fixed sleep guesses how long the app needs
@Test
void savesProfile_withFixedSleep() throws InterruptedException {
    profilePage.clickSave();
    Thread.sleep(5000); // too slow on a fast run, too short on a slow one
    assertEquals("Saved", profilePage.statusText());
}

// AFTER: wait for the exact condition the assertion depends on
private static final By SAVE_STATUS = By.cssSelector("[data-testid='save-status']");

@Test
void savesProfile_withExplicitWait() {
    profilePage.clickSave();

    new WebDriverWait(driver, Duration.ofSeconds(10))
        .until(ExpectedConditions.textToBePresentInElementLocated(SAVE_STATUS, "Saved"));

    assertEquals("Saved", driver.findElement(SAVE_STATUS).getText());
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
            QA &amp; Test Automation Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Flaky Tests
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Root Cause
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Flaky Tests Are a Data Problem, Not a Timing Problem
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Every flaky failure is a clue. Most teams throw the clue away and add another sleep.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 16, 2026
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
          "A flaky test is not random. It is a failure whose cause you have not recorded yet."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every automation team has the conversation. A test fails in the nightly run, someone reruns it, it passes,
            and the verdict is delivered with a shrug: "flaky". The word sounds like a diagnosis. It is actually the
            absence of one. It means "this failed for a reason we did not look for".
          </p>
          <p>
            The usual response is to treat flakiness as bad luck with timing. Add a sleep, raise a timeout, wrap the
            test in a retry, move on. I think that framing is wrong, and expensive. Flakiness is far more often a data
            problem: you have failures, but you are not collecting the evidence that would explain them. Once you start
            classifying every flake by root cause and writing it down, the "random" failures stop looking random. They
            cluster, and the clusters point straight at the parts of your suite that are actually broken.
          </p>
        </div>

        {/* Section 1 */}
        <section id="symptom-fix" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Hourglass className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why "Just Add a Wait" Is a Symptom Fix</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A fixed sleep is a guess about how long the application needs. Guesses are wrong in both directions. On a
              fast run, the test sits idle for seconds it did not need. On a slow run, the guess is still too short and
              the test fails anyway, now with a longer runtime attached. Multiply that by a few hundred tests and you
              have a suite that is slower every month and no more stable than before.
            </p>
            <p>
              Retries are subtler and, in my view, more dangerous. An automatic retry turns a red result into a green
              one without anyone looking at why it was red. Sometimes the cause was harmless. Sometimes it was a real
              race condition in the product that users will also hit, just less often. The retry hides both equally
              well. You have traded a visible problem for an invisible one.
            </p>
            <p>
              And the root cause stays alive. If the failure came from shared test data, the sleep does nothing about
              the data. If it came from an ambiguous locator, the timeout only changes how long the test waits before
              clicking the wrong element. The patch addresses a symptom that may not even be related to the cause.
            </p>
          </div>

          <div className="border-l-4 border-blue-400/60 bg-blue-500/5 rounded-r-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">The honest test: </span>
              if you cannot say which category of cause a fix addresses, you have not fixed anything. You have only
              changed the odds.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="four-buckets" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Four Root-Cause Buckets</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              You do not need a perfect taxonomy. You need a small one that everyone on the team can apply in under a
              minute. I use four buckets. Almost every flaky UI or end-to-end failure I have looked at fits one of them,
              and when it genuinely fits two, you record both.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {buckets.map((b, i) => (
              <div key={b.name} className="bg-indigo-500/5 border border-indigo-500/15 rounded-2xl p-5">
                <p className="text-indigo-300 font-semibold text-sm mb-2">
                  <span className="text-white/30 font-mono mr-2">B{i + 1}</span>
                  {b.name}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{b.example}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The point of buckets is that each one has a different kind of fix and often a different owner. Locator
              problems belong to whoever maintains the page objects, and sometimes to the developers who control the
              markup. Timing problems belong to the framework. Data problems belong to whoever designs test setup.
              Environment problems usually belong to a platform or DevOps team. "Flaky" has no owner. "Shared state in
              the checkout tests" does.
            </p>
            <p>
              To make classification quick, it helps to map what you see in the failure to the most likely bucket and
              the first thing worth checking. This is the table I keep next to the triage queue.
            </p>
          </div>

          {/* Signature visual: symptom -> bucket -> first check */}
          <div className="overflow-x-auto rounded-2xl border border-blue-500/25">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-500/10 text-blue-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Symptom you see</th>
                  <th className="text-left px-5 py-3 font-semibold">Likely bucket</th>
                  <th className="text-left px-5 py-3 font-semibold">First thing to check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white/80">Element not found, but the screenshot shows it on screen</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-xs">Sync &amp; timing</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Was the lookup done before rendering finished? Look for a fixed sleep or no wait.</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Element not intercepting clicks, or another element would receive the click</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs">Locators &amp; UI state</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Overlays, spinners or toasts covering the target; does the locator match more than one element?</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Passes alone, fails in the full or parallel run</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs">Data &amp; shared state</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Which records does it share with other tests? Does it depend on run order?</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Assertion fails on a value that "should" be there, like a duplicate name or an unexpected count</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs">Data &amp; shared state</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Leftover data from a previous run; cleanup that failed silently.</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Stale element reference after an action</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs">Locators &amp; UI state</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Is the page object caching elements across a re-render? Look elements up when used.</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Connection refused, 5xx responses, session or grid errors</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 text-xs">Environment</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Deployments or restarts during the run window; node health and resource limits.</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/80">Many unrelated tests fail in the same few minutes</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 text-xs">Environment</span>
                  </td>
                  <td className="px-5 py-3 text-white/60">Treat it as one incident, not many flakes. Check the environment timeline first.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section id="flake-ledger" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Build a Flake Ledger</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the habit that changes everything, and it is almost embarrassingly simple. Every flaky failure
              gets a row. Not a Slack message, not a mental note: a row in a shared table, a spreadsheet, or a tracker
              with a dedicated label. The format matters less than the discipline of filling it in every time.
            </p>
            <p>
              Each row needs only a handful of fields: the test name, the date, your best bucket, the evidence that
              supports it, whether a rerun passed, and who owns the follow-up. Evidence is the important column. "Looked
              like timing" is not evidence. "Screenshot shows spinner still visible at time of click" is.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Test</th>
                  <th className="text-left px-4 py-3 font-semibold">Bucket</th>
                  <th className="text-left px-4 py-3 font-semibold">Evidence</th>
                  <th className="text-left px-4 py-3 font-semibold">Rerun passed?</th>
                  <th className="text-left px-4 py-3 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-mono text-xs">
                <tr>
                  <td className="px-4 py-3 text-white/80">checkout_appliesCoupon</td>
                  <td className="px-4 py-3 text-cyan-300">Data</td>
                  <td className="px-4 py-3 text-white/60">Coupon already redeemed by parallel test</td>
                  <td className="px-4 py-3 text-white/60">Yes</td>
                  <td className="px-4 py-3 text-white/60">Checkout suite owner</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/80">profile_savesAddress</td>
                  <td className="px-4 py-3 text-blue-300">Sync</td>
                  <td className="px-4 py-3 text-white/60">Status read before save response</td>
                  <td className="px-4 py-3 text-white/60">Yes</td>
                  <td className="px-4 py-3 text-white/60">Framework owner</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/80">search_filtersByDate</td>
                  <td className="px-4 py-3 text-indigo-300">Locator</td>
                  <td className="px-4 py-3 text-white/60">Locator matches two date pickers</td>
                  <td className="px-4 py-3 text-white/60">No</td>
                  <td className="px-4 py-3 text-white/60">Search page objects</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/80">reports_exportsCsv</td>
                  <td className="px-4 py-3 text-slate-300">Env</td>
                  <td className="px-4 py-3 text-white/60">File service restarted during run</td>
                  <td className="px-4 py-3 text-white/60">Yes</td>
                  <td className="px-4 py-3 text-white/60">Platform team</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-white/40 mb-6">Illustrative rows with generic test names.</p>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              After about two weeks of honest entries, the pattern usually shows itself. You will find that a handful
              of tests produce most of the rows. You will find that one bucket dominates. Very often it is data, not
              timing, which is why I named this article the way I did. And you will find failures that were never flaky
              at all: tests that failed consistently on one environment and got labelled flaky because they passed
              somewhere else.
            </p>
            <p>
              The ledger also changes the conversation with your team and your manager. "The suite is flaky" is a
              complaint. "Most of our flaky failures in the last two weeks came from shared test accounts in three
              suites" is a plan.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="fix-by-bucket" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Fix by Bucket, Not by Test</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Fixing flaky tests one at a time is how teams stay busy without getting ahead. If thirty tests are flaky
              because they share data, patching each test is thirty small fixes that each might regress. Fixing how the
              suite creates data is one larger fix that removes the whole class. The ledger tells you which class to
              attack first.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                bucket: "Sync & timing",
                fix: "Replace fixed sleeps with waits on a specific condition: an element is clickable, a text appears, a request completes, a spinner disappears. Put these waits in page objects so tests never deal with timing directly.",
              },
              {
                bucket: "Data & shared state",
                fix: "Give each test its own data, created through an API or a builder at setup time, with unique identifiers. Never let two tests depend on the same mutable record.",
              },
              {
                bucket: "Locators & UI state",
                fix: "Prefer dedicated test ids or accessible roles and names over long positional XPath. Look elements up when you use them rather than caching them across re-renders.",
              },
              {
                bucket: "Environment",
                fix: "Add a health check before the suite starts and fail fast with a clear message if dependencies are down. Coordinate deployment windows with test runs.",
              },
            ].map((item) => (
              <div key={item.bucket} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 text-xs font-semibold shrink-0 w-36 text-center">
                  {item.bucket}
                </span>
                <p className="text-white/65 text-sm leading-relaxed">{item.fix}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            The synchronization fix is the one people know best and apply least. Here is the difference in its simplest
            form: a fixed sleep versus an explicit wait on the condition the assertion actually needs.
          </p>

          <div className="bg-black/40 border border-blue-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              ProfileSaveTest.java — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-blue-100/90 font-mono">
              <code>{codeSample}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice that the second version is not just faster on a good day. It states intent. A reader can see
              exactly what the test is waiting for, and if the wait times out, the failure message names the condition
              that never became true. That alone makes the next triage quicker.
            </p>
            <p>
              One caution: an explicit wait is not a license to raise timeouts until things pass. If a condition
              regularly needs a very long time, that is either a performance issue worth reporting or a sign the test is
              waiting for the wrong thing.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="quarantine" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Archive className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Quarantine, Fix or Delete</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Some flaky tests cannot be fixed today. Leaving them in the main run poisons trust in every red build, so
              you need a place to put them. That place is quarantine: a separate run or tag where the test still
              executes and reports, but does not block the pipeline.
            </p>
            <p>
              Quarantine is useful exactly as long as it is temporary. The failure mode I see most often is the
              quarantine folder that quietly becomes a graveyard. Tests go in, nobody owns them, and months later the
              team has a second suite of tests that run, fail, and are ignored. That is worse than deleting them,
              because it still costs runtime and still looks like coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-300 font-semibold text-sm mb-2">Quarantine</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Only with a named owner, a ledger row and a deadline. When the deadline arrives, the test must leave
                quarantine one way or the other.
              </p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5">
              <p className="text-blue-300 font-semibold text-sm mb-2">Fix</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Fix the bucket, then prove it: run the test repeatedly, in parallel with its neighbors, before
                returning it to the main suite.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/80 font-semibold text-sm mb-2">Delete</p>
              <p className="text-white/60 text-sm leading-relaxed">
                If nobody can explain what risk the test covers, or another test covers it reliably, delete it.
                Version control remembers it if you were wrong.
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Write the policy down and keep it short enough to fit on a screen. The rule that matters most is the last
            one: no test lives in quarantine forever. Every quarantined test is a small, explicit decision that must be
            renewed or resolved.
          </p>
        </section>

        {/* Section 6 */}
        <section id="ai-help" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where AI Helps and Where It Doesn't</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Flake triage is a pattern-reading job, and pattern reading is something language models are good at.
              Give an assistant a batch of failure messages and stack traces, and it can group the ones that look alike,
              point out that twelve failures share the same exception from the same helper, and suggest a likely bucket
              for each group. That turns a pile of red into a short list of themes, which is the hardest part of
              starting a ledger.
            </p>
            <p>
              It can also draft the evidence column. Asked well, a model will point at the line in the log that
              supports its guess, which gives you something concrete to verify.
            </p>
            <p>
              What it cannot know is your environment's history. It does not know that the shared test environment was
              redeployed at two in the morning, that one team reuses a seeded account, or that the grid has a node that
              misbehaves. Those facts live in people's heads, chat threads and deployment logs it has never seen. So the
              model suggests a bucket and a human confirms the cause before it enters the ledger as fact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-purple-300 font-semibold mb-3">Hand it to AI</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Clustering similar failure logs</li>
                <li>Suggesting a bucket per cluster</li>
                <li>Pointing at supporting log lines</li>
                <li>Summarizing a week of ledger rows</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-3">Keep for a human</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Confirming the actual cause</li>
                <li>Linking failures to environment events</li>
                <li>Deciding quarantine, fix or delete</li>
                <li>Judging whether it is a real product bug</li>
              </ul>
            </div>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mt-4">
            One practical note: redact tokens, credentials and any customer data from logs before you paste them into
            any assistant.
          </p>
        </section>

        {/* Section 7 */}
        <section id="determinism" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Repeat className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Make Determinism a Design Goal</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Everything above is about cleaning up flakiness that already exists. The longer game is designing the
              suite so it has fewer ways to become flaky in the first place. That means treating determinism as a
              requirement of the framework, the same way you treat readability or speed.
            </p>
            <p>
              In practice, a deterministic suite follows a few rules that are easy to state and surprisingly hard to
              keep without review. They belong in your framework conventions and in your code review checklist.
            </p>
          </div>

          <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6 mb-6">
            <p className="text-green-300 font-semibold mb-4">A deterministic test...</p>
            <div className="space-y-3">
              {[
                "is independent: it passes alone, in any order, and in parallel with its neighbors",
                "has idempotent setup: running setup twice leaves the system in the same state",
                "has no hidden ordering: it never relies on another test having run first",
                "uses deterministic data: unique, created for itself, never a shared mutable record",
                "controls time and randomness: fixed clocks or seeds where the behavior depends on them",
                "waits on conditions, never on durations",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            A cheap way to enforce this is to run the suite in a randomized order now and then, and in parallel as
            often as you can afford. Hidden ordering and shared state show up quickly under those conditions, and it is
            far better to find them on purpose than in a release-day pipeline.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Flakiness feels like weather: something that happens to your suite and that you can only endure. I do not
              think that is true. Most flaky failures have ordinary causes, and ordinary causes leave evidence. The
              problem is that teams discard the evidence the moment a rerun goes green.
            </p>
            <p>
              Classify every flake. Write it down. Fix the bucket, not the test. Put a deadline on every quarantine. Use
              AI to sort the pile faster, and keep the final call for someone who knows the environment. Then design
              the next tests so they do not need any of this.
            </p>
            <p>
              If you want one thing to try this week: start the ledger today, with the next flaky failure you see. Do
              not fix anything for two weeks unless it is urgent. Just record. Then read the ledger and decide where to
              start.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-blue-200 text-lg font-semibold">
              You do not fix flakiness by being patient. You fix it by keeping score.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Fighting a suite nobody trusts anymore?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about turning flaky failures into data and getting your pipeline back to a signal you believe.
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

export default FlakyTestsDataProblemBlog;
