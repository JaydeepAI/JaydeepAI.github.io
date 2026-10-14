import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Gauge,
  Network,
  Compass,
  CodeXml,
  FileCheck,
  GraduationCap,
  CalendarDays,
  TriangleAlert,
  CircleCheck,
  CircleX,
} from "lucide-react";

/**
 * Blog: API Testing From Zero: An Honest Learning Roadmap With AI as the Tutor
 * Slug: /blog/api-testing-roadmap-from-zero
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

const APITestingRoadmapBlog = () => {
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
    title: "API Testing From Zero: An Honest Learning Roadmap With AI as the Tutor | Digital Jaydeep",
    description:
      "A learner's roadmap for UI-automation engineers picking up API testing properly: HTTP fundamentals, exploring with a request tool, Java code-level tests, what to assert beyond status 200, and how to use AI as a tutor without outsourcing the thinking. Includes a 30-day plan.",
    keywords:
      "API testing, REST API, HTTP basics, REST Assured, Postman, learning roadmap, test automation, AI tutor",
    canonicalUrl: "https://jaydeepai.github.io/blog/api-testing-roadmap-from-zero",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "API Testing From Zero: An Honest Learning Roadmap With AI as the Tutor",
      datePublished: "2026-11-03",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "ui-ceiling", label: "Why UI-Only Testers Hit a Ceiling" },
    { id: "http-fundamentals", label: "HTTP Fundamentals First" },
    { id: "explore-first", label: "Explore Before You Automate" },
    { id: "move-to-code", label: "Move to Code" },
    { id: "what-to-assert", label: "What to Assert (Hint: Not Just 200)" },
    { id: "ai-tutor", label: "Using AI as a Tutor, Not a Ghostwriter" },
    { id: "thirty-day-plan", label: "The 30-Day Plan" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const httpBasics = [
    { term: "Methods", desc: "GET reads, POST creates, PUT replaces, PATCH updates part, DELETE removes. Know what each one promises." },
    { term: "Status codes", desc: "2xx success, 3xx redirect, 4xx the client did something wrong, 5xx the server failed. The family matters as much as the number." },
    { term: "Headers", desc: "Metadata about the request and response: content type, authorization, caching, correlation ids." },
    { term: "JSON bodies", desc: "Nested objects and arrays. Learn to read them fluently and to spot a missing or wrongly typed field." },
    { term: "Authentication", desc: "Who you are (authentication) versus what you may do (authorization). Tokens, sessions and API keys at a concept level." },
    { term: "Idempotency", desc: "Sending the same request twice should or should not change the result twice. It decides how retries behave." },
  ];

  const codeSample = `// Illustrative example — REST Assured + JUnit style, generic endpoint
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

class UserApiTest {

    @Test
    void getUser_returnsExpectedFields() {
        given()
            .baseUri(BASE_URL)
            .header("Authorization", "Bearer " + tokenFor("reader"))
        .when()
            .get("/users/42")
        .then()
            .statusCode(200)
            .contentType("application/json")
            .body("id", equalTo(42))
            .body("email", containsString("@"))
            .body("roles", hasItem("reader"));
    }

    @Test
    void getUser_withoutToken_isRejected() {
        given()
            .baseUri(BASE_URL)
        .when()
            .get("/users/42")
        .then()
            .statusCode(401);
    }
}`;

  const plan = [
    {
      week: "Week 1",
      focus: "HTTP fundamentals",
      task: "Read the methods and status code families; call a public practice API from a request tool and from the command line.",
      done: "You can explain what every part of one request and response means, without notes.",
    },
    {
      week: "Week 2",
      focus: "Explore by hand",
      task: "Pick one API and walk through create, read, update, delete. Send bad input, missing auth and wrong ids on purpose.",
      done: "You have a written list of behaviors, including at least five negative cases and what the API returned.",
    },
    {
      week: "Week 3",
      focus: "Move to code",
      task: "Set up a small Java project with an API testing library. Automate the cases from week 2 with clean request and data setup.",
      done: "Tests run from the command line, are independent of each other and clean up what they create.",
    },
    {
      week: "Week 4",
      focus: "Assert properly",
      task: "Add body, schema, header and error-message checks. Add authorization boundary tests. Break one assertion on purpose to see it fail.",
      done: "Every test checks more than status, and you can explain why each assertion exists.",
    },
  ];

  const mistakes = [
    "Asserting only the status code and calling the test done.",
    "Chaining tests so one test's output is the next test's input.",
    "Hard-coding ids that only exist in one environment.",
    "Ignoring negative and authorization cases until later (later rarely comes).",
    "Committing tokens or passwords into the test project.",
    "Copying AI-generated tests without running them against the real API.",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            API Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Learning
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          API Testing From Zero: An Honest Learning Roadmap With AI as the Tutor
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          A learner's map, not an expert's lecture: how a UI-automation engineer can pick up the layer underneath,
          properly.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 3, 2026
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
          "Status 200 is not a test result. It is a greeting."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Let me be upfront: I am early on this path. My background is UI automation with Java and Selenium, and
            API testing is a layer I am learning deliberately rather than one I have mastered. This article is the
            roadmap I wish someone had handed me at the start, written from the learner's seat. It does not pretend
            to be an expert guide. It is a structured way to learn the layer properly, without skipping the parts that
            matter.
          </p>
          <p>
            It is also about a new temptation. AI assistants can generate API tests in seconds, which makes it very
            easy to look productive while learning almost nothing. Used well, the same tools are the most patient
            tutor you will ever have. The difference is entirely in how you use them, and I will be specific about
            that.
          </p>
        </div>

        {/* Section 1 — UI ceiling */}
        <section id="ui-ceiling" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why UI-Only Testers Hit a Ceiling</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              UI tests are valuable. They are the closest automated thing to what a real user does. But if UI is the
              only layer you can test, you will keep running into the same three walls.
            </p>
            <p>
              <span className="text-white font-medium">They are slow.</span> Every UI test launches a browser, loads
              pages, waits for rendering and clicks through screens just to reach the behavior you care about. That
              cost adds up across a suite, and it limits how many cases you can afford to check.
            </p>
            <p>
              <span className="text-white font-medium">They are fragile.</span> Layout changes, timing, animations
              and locators all break UI tests for reasons unrelated to the business logic. A lot of UI maintenance is
              fighting the interface rather than testing the product.
            </p>
            <p>
              <span className="text-white font-medium">They are blind to the layer where most logic lives.</span>{" "}
              Validation rules, permissions, calculations and data handling usually sit behind an API. The UI shows
              you a summary of what the API decided. If the API returns a field the UI ignores, or accepts input the UI
              never sends, a UI test will never know. Learning to test the API means testing the decision itself, not
              just its reflection on the screen.
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-teal-300 font-semibold">The good news for automation engineers: </span>
              most of what you already know transfers. Test design, data setup, independence, clear assertions and
              Java itself all carry over. You are not starting from zero; you are starting one layer lower.
            </p>
          </div>
        </section>

        {/* Section 2 — HTTP fundamentals */}
        <section id="http-fundamentals" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Network className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">HTTP Fundamentals First</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              It is tempting to jump straight into a testing library. Do not. Libraries are thin wrappers around HTTP,
              and if you do not understand what they wrap, every unexpected response becomes a mystery. A week spent on
              the fundamentals pays back every week afterwards.
            </p>
            <p>These six ideas are the minimum. You should be able to explain each one in your own words.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {httpBasics.map((item) => (
              <div key={item.term} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-blue-300 font-semibold text-sm mb-1">{item.term}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Pay special attention to status code families and idempotency. Many real defects hide there: an endpoint
            that returns 200 with an error message in the body, a validation failure reported as 500 instead of a 4xx,
            or a POST that creates a duplicate record when a client retries. Once you know what correct looks like,
            these jump out at you.
          </p>
        </section>

        {/* Section 3 — Explore first */}
        <section id="explore-first" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Explore Before You Automate</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Before writing a single line of test code, send requests by hand. A request tool such as Postman, or
              even a command-line client, lets you build a request, send it, and read the full response: status,
              headers and body. This is the API equivalent of clicking through an application before automating it.
            </p>
            <p>
              Exploration is where you learn how the API actually behaves, which is not always how the documentation
              says it behaves. Create a record, read it back, update it, delete it, then try to read it again. Send a
              field with the wrong type. Leave out a required field. Use an expired token. Ask for an id that does not
              exist. Write down what happened each time.
            </p>
            <p>
              That written list becomes your first test plan. It is also a good source of questions for developers:
              "Is a 200 with an empty body really what we want when the id does not exist?" Those conversations are
              where you start being useful at this layer, long before your first automated test.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-6">
            {[
              { k: "Happy path", v: "Does the basic flow work end to end?" },
              { k: "Bad input", v: "What happens with missing, extra or wrongly typed fields?" },
              { k: "Wrong user", v: "What happens without a token, or with a token for a different role?" },
            ].map((item) => (
              <div key={item.k} className="bg-teal-500/5 border border-teal-500/15 rounded-xl p-4">
                <p className="text-teal-300 font-semibold text-sm mb-1">{item.k}</p>
                <p className="text-white/60 text-sm">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Move to code */}
        <section id="move-to-code" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <CodeXml className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Move to Code</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Once you understand the API by hand, move to code. For someone with a Java automation background, a Java
              API testing library is the natural choice, because your existing build tools, test runner and reporting
              all carry over. REST Assured is one well-known example; it reads in a given, when, then style that will
              feel familiar if you have written behavior-style tests before.
            </p>
            <p>
              Structure matters more than the library. Keep base URLs and credentials in configuration, never in test
              code. Build request data with small builder or factory methods rather than giant inline JSON strings.
              Make each test create the data it needs and clean up after itself, so tests can run in any order. These
              are the same habits that make UI suites maintainable, applied one layer down.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              UserApiTest.java — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-teal-100/90 font-mono">
              <code>{codeSample}</code>
            </pre>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Notice the second test. It checks that the API refuses a request without a token. That one test protects
            more than many happy-path checks, because an endpoint that forgets authorization is a serious defect, and
            a UI that always sends a token will never reveal it.
          </p>
        </section>

        {/* Section 5 — What to assert */}
        <section id="what-to-assert" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Assert (Hint: Not Just 200)</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The most common beginner API test sends a request and asserts the status is 200. It feels like a test.
              It mostly proves the server is awake. An endpoint can return 200 with the wrong data, missing fields, a
              leaked internal field or an error message stuffed into the body. Status is the first check, not the
              only one.
            </p>
            <p>A useful API test usually checks several of these, chosen based on what the endpoint promises:</p>
          </div>

          <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6">
            <div className="space-y-3">
              {[
                ["Status", "The exact code, and the right family for the situation."],
                ["Body fields", "Key values match what the request or the rule says they should be."],
                ["Schema", "Required fields present, types correct, no unexpected sensitive fields."],
                ["Headers", "Content type, caching or security headers where they matter."],
                ["Error messages", "Bad input produces a clear, correct message, not a stack trace."],
                ["Negative cases", "Invalid, missing and boundary inputs are rejected properly."],
                ["Authorization boundaries", "Each role can do what it should and nothing more."],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">
                    <span className="text-white font-medium">{k}: </span>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            The same oracle rule applies here as in UI testing: expected values must come from the requirement or the
            API contract, not from whatever the API returned the first time you called it. If you copy the response
            into the assertion, you have written a test that will protect whatever bugs existed on that day.
          </p>
        </section>

        {/* Section 6 — AI tutor */}
        <section id="ai-tutor" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Using AI as a Tutor, Not a Ghostwriter</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the part that is different from how anyone learned API testing a few years ago. An AI assistant
              can explain an unfamiliar response, define a header, compare two status codes, or walk through why a
              request failed, at any hour and with endless patience. That is a remarkable learning aid.
            </p>
            <p>
              It can also write the whole test suite for you, and that is where learning quietly stops. If the model
              writes the tests, you learn to paste. When one fails in CI, you will not know why, and you will paste
              again. The line I try to hold is simple: AI may explain, quiz and review; I write the tests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-5">
              <p className="text-teal-300 font-semibold text-sm mb-3">Good tutor uses</p>
              <div className="space-y-2">
                {[
                  "Explain this response line by line.",
                  "Quiz me on status codes, then tell me what I got wrong.",
                  "Review my test: what is it not checking?",
                  "What negative cases would you add, and why?",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CircleCheck className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <p className="text-red-300 font-semibold text-sm mb-3">Ghostwriter traps</p>
              <div className="space-y-2">
                {[
                  "Write all the tests for this API.",
                  "Fix this failing test (without explaining why it failed).",
                  "Accepting explanations without checking the docs.",
                  "Pasting real tokens or customer data into the chat.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CircleX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            One more habit: verify every claim against a real call or the official documentation. Models can be
            confidently wrong about how a specific library method behaves or what a particular API returns. When the
            tutor says something surprising, test it. That verification step is itself excellent practice.
          </p>
        </section>

        {/* Section 7 — 30-day plan */}
        <section id="thirty-day-plan" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The 30-Day Plan</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is the plan as a table. It assumes a few focused hours a week alongside a normal job. Stretch it if
            you need to; the order matters more than the speed. Each week has a "done when" line, because a plan
            without an exit condition is just a wish list.
          </p>

          {/* Signature visual — plan table */}
          <div className="overflow-x-auto rounded-2xl border border-teal-500/25 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-500/10 text-teal-200 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Week</th>
                  <th className="text-left px-5 py-3 font-semibold">Focus</th>
                  <th className="text-left px-5 py-3 font-semibold">Practice task</th>
                  <th className="text-left px-5 py-3 font-semibold">Done when</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {plan.map((row) => (
                  <tr key={row.week} className="align-top">
                    <td className="px-5 py-4 text-teal-300 font-semibold whitespace-nowrap">{row.week}</td>
                    <td className="px-5 py-4 text-white font-medium">{row.focus}</td>
                    <td className="px-5 py-4 text-white/70">{row.task}</td>
                    <td className="px-5 py-4 text-white/60">{row.done}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TriangleAlert className="w-5 h-5 text-orange-400" />
              <p className="text-orange-300 font-semibold">Common beginner mistakes</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {mistakes.map((m) => (
                <div key={m} className="flex items-start gap-2 bg-black/20 rounded-lg px-3 py-2">
                  <CircleX className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{m}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              How do you know whether the month worked? Not by counting tests. Generated tests make that number
              meaningless. Measure progress by tests you can explain: for each one, can you say what it sends, what
              it checks, why that expected value is correct, and what defect would make it fail? If you can do that
              for ten tests, you have learned more than someone who generated two hundred.
            </p>
            <p>
              A good final exercise is to break something on purpose. If you have access to a test environment where
              you can change the API, alter a validation rule and see which of your tests notice. If not, change your
              expected values and confirm the tests fail with clear messages. Either way, you are checking that your
              tests are capable of catching something, which is the whole point.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              I am still working through this roadmap myself, and I expect to revise it as I learn. What I am already
              sure of is the order: fundamentals before tools, exploration before automation, meaningful assertions
              before volume. Skip any of those and you end up with tests that run but do not protect anything.
            </p>
            <p>
              AI makes this the best time in history to learn a new technical layer, as long as you keep the thinking
              for yourself. Let it explain, quiz and review. Write the tests with your own hands until you can explain
              every line. The speed will come later, and it will be real speed, not borrowed speed.
            </p>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-teal-200 text-lg font-semibold">Learn the layer, not just the tool.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Learning API testing too?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's compare notes on moving from UI automation to the API layer, and on using AI to learn faster without
            skipping the thinking.
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

export default APITestingRoadmapBlog;
