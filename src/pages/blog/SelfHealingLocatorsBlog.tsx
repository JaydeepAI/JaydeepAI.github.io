import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Wrench,
  Cog,
  CircleCheck,
  OctagonAlert,
  Eye,
  Fingerprint,
  ClipboardCheck,
  CircleX,
  ArrowDown,
  Github,
} from "lucide-react";

/**
 * Blog: Self-Healing Locators: Magic or Technical Debt?
 * Slug: /blog/self-healing-locators-magic-or-technical-debt
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

const SelfHealingLocatorsBlog = () => {
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
    title: "Self-Healing Locators: Magic or Technical Debt? | Digital Jaydeep",
    description:
      "Auto-healing keeps your suite green when the UI shifts. It can also heal onto the wrong element and hide real drift. When self-healing locators help, when they hurt, and how to govern them so every heal happens in the open.",
    keywords:
      "self-healing locators, self-healing tests, UI automation, Selenium locators, test maintenance, flaky tests, test oracle, QA governance",
    canonicalUrl: "https://jaydeepai.github.io/blog/self-healing-locators-magic-or-technical-debt",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Self-Healing Locators: Magic or Technical Debt?",
      datePublished: "2026-10-22",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "maintenance-pain", label: "The Maintenance Pain It Targets" },
    { id: "how-healing-works", label: "How Healing Works, in General Terms" },
    { id: "where-it-helps", label: "Where It Genuinely Helps" },
    { id: "where-it-hurts", label: "Where It Hurts" },
    { id: "heal-in-the-open", label: "Heal as a Suggestion, Not a Secret" },
    { id: "prevent-the-need", label: "Prevent the Need" },
    { id: "questions-to-ask", label: "Questions to Ask Before Adopting a Tool" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const healLog = `# Illustrative heal event, as it should appear in a test report

HEAL EVENT
  test:          checkout_appliesPromoCode
  step:          click "Apply" on the promo code form
  original:      By.id("apply-promo-btn")         -> not found
  healed to:     By.cssSelector("form.promo button[type=submit]")
  matched on:    same form, same button type, similar text
  confidence:    reported by tool (review required)
  screenshot:    attached
  status:        PENDING REVIEW

REVIEW
  reviewer:      <name>
  decision:      ACCEPT / REJECT
  follow-up:     update page object locator, or file UI change question`;

  const locatorSnippet = `<!-- Illustrative markup: a stable contract for tests -->
<button data-testid="apply-promo" type="submit">Apply</button>

// Illustrative Selenium (Java) usage
// Preferred: a dedicated test id agreed with developers
By applyPromo = By.cssSelector("[data-testid='apply-promo']");

// Acceptable fallback: an accessible name a user would recognize
By applyPromoByText = By.xpath("//button[normalize-space()='Apply']");

// Avoid: positional paths that break on any layout change
By fragile = By.xpath("/html/body/div[3]/div[2]/form/div[4]/button[1]");`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Self-Healing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            UI Automation
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Self-Healing Locators: Magic or Technical Debt?
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Healing can save hours of locator maintenance. It can also turn a real UI change into a green run that nobody
          ever questions.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 22, 2026
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
                  className="flex items-center gap-3 text-white/70 hover:text-red-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-red-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "A test that heals silently is a test that lies politely."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Self-healing locators are one of the most appealing promises in UI automation. A developer renames a
            button id, a designer wraps a form in a new container, and instead of a dozen red tests the next morning,
            the suite quietly adapts and stays green. For anyone who has spent a sprint chasing broken selectors, the
            pitch is hard to resist.
          </p>
          <p>
            I am not against healing. I am against healing that nobody sees. The uncomfortable truth is that a heal
            is the tool making a guess about which element you meant, and a test that passes on a guess has quietly
            changed what it is checking. That connects healing directly to the oracle problem: a pass on the wrong
            element is a false pass, and false passes are worse than failures because nobody investigates them. This
            article is about using healing as the maintenance tool it is, without letting it become a quality
            guarantee it is not.
          </p>
        </div>

        {/* Section 1 — Maintenance pain */}
        <section id="maintenance-pain" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Maintenance Pain It Targets</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              UI tests depend on locators, and locators depend on markup that the test team does not control. Front-end
              code changes constantly for perfectly good reasons: refactors, design updates, component library
              upgrades, accessibility fixes. Each change can break selectors that were working yesterday, even though
              nothing a user would notice has changed.
            </p>
            <p>
              Fixing those breaks is some of the least rewarding work in automation. You open the failing test, see
              "element not found", inspect the page, discover the id now has a different prefix, update the page
              object, rerun, and move on to the next one. It is repetitive, it requires little judgment once you have
              confirmed the cause, and in a large suite it can eat a meaningful slice of every week.
            </p>
            <p>
              Worse, the noise hides signal. When the morning report has thirty failures and twenty-five are locator
              drift, the five real defects are buried. Teams start skimming, then ignoring, then rerunning until green.
              That is the problem self-healing tools set out to solve, and it is a real one. Any honest critique of
              healing has to start by admitting the pain is legitimate.
            </p>
          </div>
        </section>

        {/* Section 2 — How healing works */}
        <section id="how-healing-works" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Cog className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">How Healing Works, in General Terms</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Implementations differ between tools, and the details are usually not fully public, so I will describe
              the general idea rather than any specific product. The core mechanism is a fallback. When the primary
              locator fails to find an element, the tool does not fail the step immediately. Instead, it looks for an
              element that probably is the one you meant.
            </p>
            <p>
              To do that, it typically relies on information captured when the test last passed: other attributes of
              the element, its text, its position in the page structure, its neighbours. It compares candidates on the
              current page against that remembered profile, picks the closest match, and continues the test as if the
              original locator had worked.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-2 mb-8">
            {[
              { step: "Primary locator fails", note: "By.id(\"apply-promo-btn\") finds nothing" },
              { step: "Tool gathers candidates", note: "Elements that resemble the one seen in earlier passing runs" },
              { step: "Candidates are compared", note: "Attributes, text, structure, location on the page" },
              { step: "Best match is chosen", note: "Usually the highest similarity above some threshold" },
              { step: "Test continues", note: "The step passes on the substituted element" },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className={`w-full rounded-xl p-4 border ${i === arr.length - 1 ? "bg-red-500/10 border-red-500/30" : "bg-purple-500/5 border-purple-500/20"}`}>
                  <p className="text-white font-medium text-sm">{item.step}</p>
                  <p className="text-white/50 text-xs mt-1 font-mono">{item.note}</p>
                </div>
                {i < arr.length - 1 && <ArrowDown className="w-4 h-4 text-white/30 my-1" />}
              </div>
            ))}
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">The key word is "substituted": </span>
              after a heal, the test is no longer interacting with the element you specified. It is interacting with
              the element a similarity algorithm preferred. Whether that is the same thing is exactly the question the
              test was supposed to answer.
            </p>
          </div>
        </section>

        {/* Section 3 — Where it helps */}
        <section id="where-it-helps" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <CircleCheck className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where It Genuinely Helps</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Healing is at its best when the change is cosmetic and the element's identity is not in doubt. A button
              whose id was renamed during a refactor, a wrapper div added for styling, a class name changed by a CSS
              framework upgrade. In these cases there is exactly one element that could be "the Apply button", the
              tool finds it, and the heal is correct.
            </p>
            <p>
              It also helps in large legacy suites where triage time is the real bottleneck. If you have inherited
              thousands of tests built on brittle selectors, rewriting every locator is a project that will not get
              funded this quarter. Healing can keep the suite running and useful while you migrate the most important
              tests to stable locators one area at a time. Used like that, it is scaffolding for a renovation, not a
              permanent structure.
            </p>
            <p>
              Finally, it helps by reducing noise. If drift failures stop flooding the morning report, the real
              failures become visible again. That benefit is real, with one condition that the rest of this article is
              about: drift must still be reported somewhere. Moving noise out of the failure list is good. Making it
              disappear entirely is not.
            </p>
          </div>
        </section>

        {/* Section 4 — Where it hurts (signature grid) */}
        <section id="where-it-hurts" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <OctagonAlert className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where It Hurts</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The dangerous heals are not the ones that fail. They are the ones that succeed on the wrong element. A
              page with two "Save" buttons, one for a draft and one for publishing. A table where the tool heals onto
              the second row's delete icon because the first row moved. A price field that heals to the strikethrough
              old price because it has a similar class. The step passes, the assertion may even pass, and the test
              has silently stopped testing what its name says.
            </p>
            <p>
              The second harm is subtler. Sometimes a locator breaks because the UI changed in a way the team should
              know about. A field was removed, a button moved behind a menu, a label changed meaning. That is product
              information, and a broken test is often how QA finds out. Silent healing swallows it. The third harm is
              cultural: once healing is on, nobody feels urgency to fix the root locators, so the suite slowly fills
              with tests that only pass because of a fallback nobody reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
              <p className="text-green-300 font-semibold mb-4 flex items-center gap-2">
                <CircleCheck className="w-5 h-5" /> When healing helps
              </p>
              <div className="space-y-3">
                {[
                  "Renamed ids or classes with no visible change",
                  "New wrapper elements from a layout refactor",
                  "Only one plausible match exists on the page",
                  "Large legacy suites mid-migration to stable locators",
                  "Every heal is logged, reported and reviewed",
                  "Accepted heals are written back into the page object",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <p className="text-red-300 font-semibold mb-4 flex items-center gap-2">
                <CircleX className="w-5 h-5" /> When healing hurts
              </p>
              <div className="space-y-3">
                {[
                  "Several similar elements: rows, repeated buttons, lists",
                  "The element's meaning changed, not just its markup",
                  "A field or action was removed or moved on purpose",
                  "Critical flows: payments, permissions, data deletion",
                  "Heals are silent and only visible in a debug log",
                  "Healed locators never get fixed at the source",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Read the two columns side by side and a pattern appears. Healing helps when identity is obvious and the
            heal is visible. It hurts when identity is ambiguous or the heal is hidden. The tool cannot tell you which
            situation you are in. Only a person reviewing the heal can.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            It is worth being precise about why a wrong heal is so damaging. A failing test costs you an
            investigation. A wrongly healed test costs you nothing today, which is exactly the problem. It keeps
            reporting green, it keeps appearing in coverage numbers, and it keeps telling stakeholders that a flow is
            protected when it is not. The cost arrives later, as an escaped defect in the one area everybody believed
            was covered. That is the "lies politely" in the pull-quote: no error, no drama, just a quiet change in what
            the word "passed" means.
          </p>
        </section>

        {/* Section 5 — Heal in the open */}
        <section id="heal-in-the-open" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Heal as a Suggestion, Not a Secret</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The single policy that changes healing from technical debt into a useful tool is this: every heal is a
              suggestion that a human reviews, not a decision the tool makes on its own. The test can continue so the
              run stays useful, but the heal is logged, surfaced in the main report next to passes and failures, and
              marked as pending review.
            </p>
            <p>
              A healed pass should look different from a clean pass. Think of it as a third status, something like
              "passed with heal", that is impossible to miss. Then somebody reviews each heal with the evidence in
              front of them: the original locator, the substituted one, what it matched on, and a screenshot. If the
              heal is right, the reviewer accepts it and the real locator in the page object is updated, so the same
              heal never happens again. If it is wrong, the test is treated as failed and the cause investigated.
            </p>
          </div>

          <div className="bg-black/40 border border-orange-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-orange-300/70 font-mono">
              heal-report-entry.txt — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-orange-100/90 font-mono">
              <code>{healLog}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The write-back step is what keeps healing honest over time. Without it, the fallback becomes load-bearing:
              the suite works only because the tool keeps guessing correctly, and the page objects drift further from
              the real UI every sprint. With it, every heal is a one-time event that leaves the codebase better than it
              found it.
            </p>
            <p>
              For critical flows, I would go further and turn healing off entirely. If a test protects payments,
              permissions or data deletion, a broken locator should fail loudly. The extra maintenance is a price worth
              paying for certainty about what the test touched.
            </p>
          </div>
        </section>

        {/* Section 6 — Prevent the need */}
        <section id="prevent-the-need" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Prevent the Need</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The best heal is the one that never has to happen. Most locator breakage comes from tests depending on
              things that were never meant to be stable: generated class names, deep positional paths, ids that a
              framework creates on the fly. Fix that dependency and the maintenance pain shrinks at the source.
            </p>
            <p>
              Two strategies work well together. The first is dedicated test ids: an attribute such as
              data-testid that exists only for automation and that developers agree not to change casually. The second
              is accessible roles and names: locating elements the way a user or a screen reader would, by their role
              and visible label. That has the side benefit of nudging the product toward better accessibility.
            </p>
            <p>
              Whichever you choose, write the rule down in your framework conventions, so that every new page object,
              whether written by a person or generated by an AI assistant, follows it. A locator strategy that lives
              only in one senior engineer's head will not survive the next wave of new tests.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              locator-strategy — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-teal-100/90 font-mono">
              <code>{locatorSnippet}</code>
            </pre>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-teal-300 font-semibold">The locator contract: </span>
              the most effective change is not technical. It is an agreement with developers that test ids are part of
              the component's interface, reviewed in pull requests like any other contract, and only changed with a
              heads-up to the test team. A short conversation saves more maintenance than any healing algorithm.
            </p>
          </div>
        </section>

        {/* Section 7 — Questions (signature governance checklist) */}
        <section id="questions-to-ask" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Questions to Ask Before Adopting a Tool</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            If you are evaluating a framework or service with healing built in, the demo will show heals succeeding.
            Ask about governance instead. A tool that cannot answer these questions well is asking you to trust it
            blindly, and blind trust is the opposite of testing.
          </p>

          <div className="bg-gradient-to-br from-red-500/15 to-red-500/5 border-2 border-red-500/30 rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-xs uppercase tracking-widest text-red-300 font-semibold mb-1">Governance checklist</p>
            <p className="text-white font-bold text-lg mb-6">Before you switch healing on</p>
            <div className="space-y-4">
              {[
                ["Does it report each heal?", "In the main test report, per test and per step, not only in a debug log."],
                ["Can a healed pass be told apart from a clean pass?", "A distinct status or flag that dashboards and pipelines can see."],
                ["Can you turn it off per test or per suite?", "Critical flows need a hard fail on a broken locator."],
                ["Can you review and approve heals?", "Accept or reject, with the evidence: original locator, new locator, screenshot."],
                ["Does an accepted heal update the real locator?", "Or at least produce a clear change you can apply to the page object."],
                ["Can you see heal history over time?", "Repeated heals on the same element are a sign the locator contract needs work."],
                ["What data does it store and where?", "Page snapshots may contain sensitive test data; know where they go."],
              ].map(([q, a], i) => (
                <div key={q} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-md border border-red-400/50 text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">{q}</p>
                    <p className="text-white/60 text-sm mt-0.5">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            If the honest answer to the first three is "no", I would not adopt the healing feature, however good the
            rest of the tool is. You can live without healing. You cannot live with a suite whose passes you are not
            sure about.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              So, magic or technical debt? Neither, exactly. Self-healing is a maintenance tool. Used in the open, with
              every heal reported, reviewed and written back into the real locator, it removes tedious work and keeps
              noise out of the failure list. Used silently, it becomes debt that compounds: page objects drift, real UI
              changes go unnoticed, and passes start to mean "the tool found something similar" rather than "the
              behavior works".
            </p>
            <p>
              The deeper fix is upstream. Stable test ids, accessible names and a locator contract with your developers
              make most heals unnecessary. Healing then becomes a rare safety net instead of the mechanism holding the
              suite together.
            </p>
            <p>
              A good next step for any team already using healing: pull the list of heals from the last few weeks and
              review them by hand. Count how many were correct, how many were wrong, and how many revealed a UI change
              nobody told you about. That review will tell you which side of the line your suite is on.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-red-200 text-lg font-semibold">Heal in the open, or don't heal at all.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Fighting locator maintenance in a large suite?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about stable locator strategies and healing policies that keep your passes honest.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default SelfHealingLocatorsBlog;
