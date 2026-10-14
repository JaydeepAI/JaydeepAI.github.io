import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  TrendingDown,
  FileCode,
  Crosshair,
  Ban,
  Target,
  RefreshCw,
  FileText,
  CircleX,
  CircleCheck,
  ChevronRight,
  Github,
} from "lucide-react";

/**
 * Blog: Prompting an LLM to Write Selenium Tests That Don't Rot
 * Slug: /blog/prompting-llms-for-selenium-tests-that-dont-rot
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

const PromptingLLMSeleniumBlog = () => {
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
    title: "Prompting an LLM to Write Selenium Tests That Don't Rot | Digital Jaydeep",
    description:
      "Most AI-written UI tests decay within weeks. The fix is in the prompt: give the model your framework conventions, your locator rules, a ban list of bad habits and, most of all, the expected behavior it cannot guess. Includes a reusable prompt template.",
    keywords:
      "Selenium, prompt engineering, AI test generation, Page Object Model, LLM test automation, locator strategy, explicit waits, QA automation",
    canonicalUrl: "https://jaydeepai.github.io/blog/prompting-llms-for-selenium-tests-that-dont-rot",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Prompting an LLM to Write Selenium Tests That Don't Rot",
      datePublished: "2026-10-18",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-rot", label: "Why Generated UI Tests Rot" },
    { id: "your-framework", label: "Give It Your Framework, Not a Blank Page" },
    { id: "locator-rules", label: "Put Locator Rules in the Prompt" },
    { id: "ban-habits", label: "Ban the Bad Habits" },
    { id: "supply-oracle", label: "Supply the Oracle" },
    { id: "review-loop", label: "The Review Loop" },
    { id: "template", label: "A Reusable Template" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const rotCauses = [
    {
      title: "Brittle locators",
      desc: "Long absolute XPath, nth-child selectors and auto-generated class names. They work on the day of generation and break on the first layout change.",
    },
    {
      title: "Fixed sleeps",
      desc: "The model has seen a lot of public code with Thread.sleep in it, so it reaches for it. Every sleep is a future flaky failure or a permanent slowdown.",
    },
    {
      title: "Duplicated steps",
      desc: "Each generated test logs in, navigates and fills forms with its own copy of the same steps. One UI change now needs twenty edits.",
    },
    {
      title: "Logic inside tests",
      desc: "Loops, conditionals and try/catch blocks inside test methods. The test starts making decisions, and a test that decides can quietly decide to pass.",
    },
  ];

  const banList = [
    { rule: "No Thread.sleep or fixed waits", why: "Wait on a named condition in the page object instead." },
    { rule: "One behavior per test", why: "A failing test should tell you which behavior broke from its name alone." },
    { rule: "No assertions inside page objects", why: "Page objects describe the page; tests decide what is correct." },
    { rule: "No conditionals or loops in test methods", why: "If the test needs a branch, it is probably two tests." },
    { rule: "No catching exceptions to keep going", why: "A swallowed exception is a failure you agreed not to see." },
    { rule: "No new helpers when one already exists", why: "Reuse the framework; do not grow a parallel one." },
  ];

  const promptTemplate = `# ROLE
You are writing Selenium WebDriver tests in Java (JUnit 5) for an existing
test framework. Follow its conventions exactly. Do not invent new patterns.

# CONTEXT: FRAMEWORK
Here is a representative page object from this framework:
<paste one real page object>

Here is a representative test that follows our conventions:
<paste one real test class>

Existing helpers you must reuse instead of re-implementing:
<list: login helper, test data builder, wait utilities>

# FRAMEWORK RULES
- New UI interactions go into page objects, never directly in tests.
- Page objects expose actions and read values. They contain NO assertions.
- Waits live inside page objects and wait on explicit conditions.
- Never use Thread.sleep or any fixed delay.
- One behavior per test. Test names describe the behavior and the outcome.
- No loops, conditionals or try/catch in test methods.

# LOCATOR RULES (in order of preference)
1. data-testid attributes
2. Accessible role and name, or a label associated with the field
3. Stable id or name attributes
4. Short CSS selectors scoped to a stable container
Never use absolute XPath, index-based selectors or generated class names.
If no stable locator exists, say so in a TODO comment instead of guessing.

# TASK
Write tests for this behavior:
<feature or user story, in plain language>

# EXPECTED RESULTS (the oracle; do NOT infer these from the page)
- <expected outcome 1, taken from the requirement>
- <expected outcome 2, including the exact message or value>
- <negative case: what must happen for invalid input>
- <boundary case: the limit and what happens on each side of it>

# CONSTRAINTS
- Only use the expected results above for assertions.
- If something needed for an assertion is unclear, list it as a question.
- Do not modify existing files except to add methods to page objects.

# OUTPUT FORMAT
1. A short plan: which page objects and tests you will add or change.
2. The code, one file per block, with the file path above each block.
3. A list of open questions and assumptions.`;

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
            Selenium
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Prompt Engineering
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Prompting an LLM to Write Selenium Tests That Don't Rot
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Your generated tests are not decaying because the model is weak. They are decaying because the prompt left
          every important decision to chance.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 18, 2026
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
          "The model writes the code you describe. If you describe nothing, it describes itself."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Ask an LLM to "write Selenium tests for the login page" and you will get something that compiles, runs and
            probably passes. Run the same suite a month later, after a couple of UI changes, and a good share of it will
            be red for reasons that have nothing to do with bugs. The locators broke, the sleeps were too short, and the
            same five steps were copied into every test, so fixing them means editing everything.
          </p>
          <p>
            The common conclusion is that AI-written UI tests are low quality. I think that is the wrong diagnosis.
            The model filled every gap you left with the most common pattern it has seen, and the most common pattern in
            public UI test code is not the pattern you want to maintain. Rot comes from missing constraints. Supply the
            constraints, and the same model produces tests that look like your best engineer wrote them, and keep
            working long after the demo.
          </p>
        </div>

        {/* Section 1 */}
        <section id="why-rot" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Generated UI Tests Rot</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              "Rot" is a useful word because it describes a process, not a defect. A rotting test was fine when it was
              written. It degrades because it was built on assumptions that the next change in the application will
              break. Four assumptions show up again and again in generated code.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {rotCauses.map((c) => (
              <div key={c.title} className="border-l-2 border-teal-400/50 pl-5 py-2">
                <p className="text-teal-300 font-semibold text-sm mb-1">{c.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            None of these are things the model does because it is careless. It does them because nobody told it not
            to, and because without your framework in front of it, it has no idea what "the right way" looks like in
            your repository. Every section below closes one of these gaps, directly in the prompt.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            It is also worth being honest that the same four problems appear in hand-written suites. AI did not invent
            brittle locators or copy-pasted login steps. What it changed is the rate. A person writing tests slowly
            notices the third duplicated login block and extracts a helper. A model generating a dozen tests in one
            response never gets bored enough to refactor. Speed removes the friction that used to push us toward
            better structure, so the structure has to be stated up front.
          </p>
        </section>

        {/* Section 2 */}
        <section id="your-framework" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <FileCode className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Give It Your Framework, Not a Blank Page</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The single most effective change you can make is to paste real examples. One representative page object
              and one representative test class from your framework teach the model more than a page of written rules.
              It sees how you name methods, where waits live, how tests get data, how you structure setup, and it copies
              all of it.
            </p>
            <p>
              Pick the examples carefully. They should be your best code, not your oldest. If the example page object
              has a sleep in it, the generated one will too. If your best test uses a data builder and a login helper,
              the model will reach for the same helpers, especially if you name them explicitly and say "reuse these".
            </p>
            <p>
              Here is the difference between a typical prompt and one that gives the model something to copy.
            </p>
          </div>

          {/* Signature visual: weak vs strong prompt */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleX className="w-5 h-5 text-red-400" />
                <p className="text-xs uppercase tracking-wide text-red-300 font-semibold">Weak prompt</p>
              </div>
              <p className="font-mono text-xs text-white/70 bg-black/30 rounded-lg p-4 leading-relaxed mb-4">
                Write Selenium tests in Java for the login page. Cover the main scenarios.
              </p>
              <ul className="space-y-2 text-sm text-white/55">
                <li>No framework: the model invents its own structure</li>
                <li>No locator rules: it picks whatever matches today</li>
                <li>No wait rules: sleeps appear</li>
                <li>No expected results: it guesses them from the page</li>
                <li>"Main scenarios" means the happy path</li>
              </ul>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/25 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleCheck className="w-5 h-5 text-teal-300" />
                <p className="text-xs uppercase tracking-wide text-teal-300 font-semibold">Strong prompt</p>
              </div>
              <p className="font-mono text-xs text-white/75 bg-black/30 rounded-lg p-4 leading-relaxed mb-4">
                Using the attached LoginPage and LoginTest as conventions, add tests for account lockout. Use
                data-testid locators. No sleeps; waits go in the page object. Expected: after 5 failed attempts the
                message "Account locked. Try again in 15 minutes." appears and the 6th valid attempt is rejected.
              </p>
              <ul className="space-y-2 text-sm text-white/65">
                <li>Real conventions to copy</li>
                <li>An explicit locator rule</li>
                <li>An explicit wait rule</li>
                <li>Expected results from the requirement</li>
                <li>A specific behavior, including its boundary</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-white/40 mb-6">
            Illustrative prompts. The lockout rule is an example requirement, not a recommendation.
          </p>

          <p className="text-white/70 leading-relaxed">
            The strong prompt is longer, but it is not clever. There are no magic phrases. It simply removes the
            decisions the model would otherwise make for you, and every one of those decisions is a place where rot
            starts.
          </p>
        </section>

        {/* Section 3 */}
        <section id="locator-rules" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Crosshair className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Put Locator Rules in the Prompt</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Locators are where generated UI tests die first. A model looking at HTML will happily produce an XPath
              like "the third div inside the second section", because that path does uniquely identify the element
              right now. It has no way of knowing which attributes in your application are stable contracts and which
              are build artefacts that change every release.
            </p>
            <p>
              So tell it. State your locator preference as an ordered rule, and state what is forbidden. The ordering
              matters because it gives the model a decision procedure instead of a vague instruction to "use good
              locators".
            </p>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 mb-6">
            <p className="text-cyan-300 font-semibold text-sm mb-4">Locator preference, in the order you state it</p>
            <div className="space-y-2">
              {[
                { rank: "1", text: "Dedicated test attributes such as data-testid", tone: "text-teal-300" },
                { rank: "2", text: "Accessible role and name, or the label tied to a form field", tone: "text-teal-300" },
                { rank: "3", text: "Stable id or name attributes", tone: "text-cyan-300" },
                { rank: "4", text: "Short CSS scoped to a stable container", tone: "text-cyan-300" },
                { rank: "Never", text: "Absolute XPath, index positions, generated class names", tone: "text-red-300" },
              ].map((l) => (
                <div key={l.rank} className="flex items-center gap-4 bg-black/20 rounded-lg px-4 py-2.5">
                  <span className={`font-mono text-xs font-bold w-12 ${l.tone}`}>{l.rank}</span>
                  <span className="text-white/70 text-sm">{l.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Add one more instruction that saves a lot of pain: if no stable locator exists, the model should say so
              rather than guess. A TODO comment that reads "no test id on the submit button, ask developers to add one"
              is far more useful than a fragile XPath that silently works until it doesn't. It also turns the model into
              a small source of evidence for the locator conversation you should be having with your developers anyway.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="ban-habits" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Ban className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ban the Bad Habits</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Positive instructions tell the model what to do. A ban list tells it what it is not allowed to do, and for
              UI tests, I think the ban list does more of the work. These are the habits I forbid explicitly
              in every test-generation prompt.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Banned</th>
                  <th className="text-left px-5 py-3 font-semibold">Why, in one line</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {banList.map((b) => (
                  <tr key={b.rule}>
                    <td className="px-5 py-3 text-red-300 font-medium">
                      <span className="flex items-center gap-2">
                        <Ban className="w-3.5 h-3.5 shrink-0" />
                        {b.rule}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white/65">{b.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            The rule about assertions in page objects deserves a word. Generated page objects often include methods like
            "verifyLoginSuccessful" that both act and assert. It feels convenient. It also hides the oracle inside a
            helper, so a reviewer reading the test cannot see what is being checked, and different tests end up
            asserting slightly different things through the same method. Keep page objects as descriptions of the page,
            and keep every decision about correctness visible in the test.
          </p>
        </section>

        {/* Section 5 */}
        <section id="supply-oracle" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Supply the Oracle</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Everything so far fixes maintainability. This section fixes correctness, and it is the one most people
              skip.
            </p>
            <p>
              When you do not tell the model what the expected result is, it has to get it from somewhere. Usually it
              gets it from the page: the HTML you pasted, the text on a screenshot, the behavior of the code. That means
              the test asserts what the application currently does, not what it should do. If the current behavior is
              wrong, you now have a test that defends the bug.
            </p>
            <p>
              The fix is to supply expected results from the requirement, explicitly, in a separate block of the
              prompt. The exact message text. The value after the discount. What happens on the attempt after the
              limit. What an unauthorized user should see. Then add a constraint that the model may only use those
              expected results in assertions, and must list a question when something it needs is missing.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-6 mb-6">
            <p className="text-amber-200 font-semibold mb-2">The oracle rule</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Stimulus can be generated. Expectations must be supplied. If the expected value in a test cannot be traced
              to something you gave the model, treat it as a guess until proven otherwise.
            </p>
          </div>

          <p className="text-white/70 leading-relaxed">
            This also changes what you spend your own time on. Writing three precise expected results takes a few
            minutes of thinking about the requirement, which is exactly the thinking a tester should be doing. Writing
            the clicks, waits and page objects is the part you can hand off.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Include the negative and boundary expectations too, not only the happy path. Left alone, a model will
            usually write one test for the success case and perhaps one for an obviously invalid input. The cases that
            find real defects, the attempt exactly at the limit, the user with almost the right permission, the empty
            list, only appear when you ask for them by name. If you do not know the expected behavior for a boundary,
            that is not a prompt problem. It is a question for the product owner, and the prompt just helped you find
            it.
          </p>
        </section>

        {/* Section 6 */}
        <section id="review-loop" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Review Loop</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            A good prompt reduces how much you need to fix. It does not remove the need to check. Every generated test
            goes through the same short loop before it is merged.
          </p>

          <div className="flex flex-col md:flex-row items-stretch gap-2 mb-8">
            {[
              { step: "Run it", desc: "Green, several times, and alongside its neighbors." },
              { step: "Break it", desc: "Change the behavior in a branch. The test must go red." },
              { step: "Read the diff", desc: "Every line, especially locators and assertions." },
              { step: "Fix the prompt", desc: "Repeated problems become new rules." },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex flex-col md:flex-row items-center gap-2 flex-1">
                <div className="w-full bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 h-full">
                  <p className="text-teal-300 text-xs font-mono mb-1">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-white font-semibold text-sm mb-1">{s.step}</p>
                  <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
                </div>
                {i < arr.length - 1 && <ChevronRight className="hidden md:block w-4 h-4 text-teal-400/60 shrink-0" />}
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              "Break it" is the step that separates real tests from decorations. Change the message text, remove the
              validation, alter the calculation, and confirm the test fails with a clear message. If it stays green, the
              assertion is not checking what you think it is.
            </p>
            <p>
              The last step is the one that compounds. When you find yourself hand-patching the same kind of problem in
              every output, a sleep here, a positional locator there, stop patching and add a rule to the prompt
              instead. Hand-patching fixes one test. A rule fixes every test you generate from then on. Over a few weeks,
              your prompt becomes a compact, executable version of your team's conventions.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="template" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Reusable Template</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is the full template, assembled from everything above. It has five parts: context, framework rules,
            task, constraints and output format, with locator rules and the oracle block given their own sections because
            they matter most. Replace the angle-bracket placeholders with your own material.
          </p>

          <div className="bg-black/40 border border-teal-500/25 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-teal-300/70 font-mono">
              selenium-test-prompt.md — illustrative template
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-teal-50/90 font-mono">
              <code>{promptTemplate}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Two details are easy to miss. The output format asks for a plan first, which gives you a cheap moment to
              stop the model before it writes code you will reject. And it asks for open questions and assumptions,
              which is where the model tells you what it was unsure about. Read that list. It is often the most valuable
              part of the response.
            </p>
            <p>
              Keep the template in your repository next to the tests, not in someone's personal notes. Review changes to
              it the way you review framework code. It is framework code now.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI can write good Selenium tests. What it cannot do is guess your conventions, your locator contracts or
              your requirements. When those are missing, it fills the gaps with the average of public code, and the
              average of public UI test code rots.
            </p>
            <p>
              Give it your framework to copy. Tell it how to find elements and what is forbidden. Supply the expected
              results yourself. Prove every test can fail. And when the same problem keeps appearing, fix the prompt,
              not the output. The result is not just better tests today, but a prompt that encodes how your team writes
              tests, which is worth more than any single suite it generates.
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-teal-200 text-lg font-semibold">
              Stop tuning the output. Tune the instructions, and the outputs tune themselves.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Generating UI tests that keep breaking?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about prompts and conventions that make AI-written Selenium tests last past the next release.
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

export default PromptingLLMSeleniumBlog;
