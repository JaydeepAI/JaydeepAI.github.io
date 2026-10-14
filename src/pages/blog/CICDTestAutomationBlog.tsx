import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Gauge,
  Layers,
  Workflow,
  FileSearch,
  Split,
  Archive,
  FileCode,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  CircleX,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: CI/CD for Test Automation: Pipelines That Are Fast and Trustworthy
 * Slug: /blog/ci-cd-for-test-automation-pipelines
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

const CICDTestAutomationBlog = () => {
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
    title: "CI/CD for Test Automation: Pipelines That Are Fast and Trustworthy | Digital Jaydeep",
    description:
      "A pipeline nobody trusts gets ignored. How to stage automated tests by cost, fail fast, make failures actionable, parallelize safely, handle flaky tests deliberately and keep your pipeline as reviewed code, so a red build means something every time.",
    keywords:
      "CI/CD, test automation pipeline, Jenkins pipeline, Jenkinsfile, fail fast, quality gates, flaky test quarantine, pipeline as code",
    canonicalUrl: "https://jaydeepai.github.io/blog/ci-cd-for-test-automation-pipelines",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "CI/CD for Test Automation: Pipelines That Are Fast and Trustworthy",
      datePublished: "2026-11-10",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "what-for", label: "What a Pipeline Is For" },
    { id: "stage-by-cost", label: "Stage Your Tests by Cost" },
    { id: "pipeline-diagram", label: "The Pipeline, Gate by Gate" },
    { id: "actionable", label: "Make Failures Actionable" },
    { id: "parallelism", label: "Parallelism and Isolation" },
    { id: "flaky", label: "Handle Flaky Tests Deliberately" },
    { id: "pipeline-as-code", label: "Pipeline as Code" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const stages = [
    { name: "Commit", gate: false, note: "Trigger" },
    { name: "Build", gate: true, note: "Compiles, lints, packages" },
    { name: "Unit", gate: true, note: "Logic in isolation" },
    { name: "API", gate: true, note: "Contracts and rules" },
    { name: "Smoke UI", gate: true, note: "App is alive end to end" },
    { name: "Full regression", gate: true, note: "Broad behavior" },
    { name: "Report", gate: false, note: "Evidence and trend" },
  ];

  const gates = [
    {
      stage: "Build",
      protects: "Everything after it. There is no point running a single test against code that does not compile or a package that is broken.",
    },
    {
      stage: "Unit",
      protects: "Business logic. Fast checks that a calculation, rule or transformation still does what it should, with no network, browser or database involved.",
    },
    {
      stage: "API",
      protects: "Contracts between services and the rules that live behind endpoints: validation, permissions, status codes, data shapes.",
    },
    {
      stage: "Smoke UI",
      protects: "The deployed application as a whole. A handful of critical journeys proving the environment is up and the main paths work before you spend time on the rest.",
    },
    {
      stage: "Full regression",
      protects: "Breadth. The long tail of behavior that changes rarely but matters when it does. Often scheduled, or run before a release rather than on every commit.",
    },
  ];

  const pipelineCode = `// Illustrative declarative pipeline (Jenkins-style). Generic names and commands.
pipeline {
    agent any

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Build') {
            steps { sh './mvnw -B -DskipTests package' }
        }
        stage('Unit tests') {
            steps { sh './mvnw -B test' }
            post { always { junit 'target/surefire-reports/*.xml' } }
        }
        stage('API tests') {
            steps { sh './mvnw -B verify -Papi-tests' }
            post { always { junit 'api-tests/target/failsafe-reports/*.xml' } }
        }
        stage('Smoke UI') {
            steps { sh './mvnw -B verify -Psmoke-ui' }
            post {
                always {
                    junit 'ui-tests/target/failsafe-reports/*.xml'
                    archiveArtifacts artifacts: 'ui-tests/target/screenshots/**', allowEmptyArchive: true
                }
            }
        }
        stage('Full regression') {
            when { branch 'main' }
            steps { sh './mvnw -B verify -Pregression' }
        }
    }

    post {
        failure { echo 'Failed stage owner: see OWNERS file in the test repo' }
    }
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            CI/CD
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Pipelines
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          CI/CD for Test Automation: Pipelines That Are Fast and Trustworthy
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The pipeline is the one place every engineer sees your tests. Design it so what they see is worth believing.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 10, 2026
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
          "A red build should be news. If it's noise, your pipeline has already failed."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every team I have seen struggle with test automation eventually ends up in the same place. The suite exists,
            the pipeline runs it, and nobody looks at the result. A red build is met with "it's probably that flaky
            one again" and a click on rebuild. A green build is met with indifference, because green has stopped
            meaning anything specific. The automation is technically running. It is not doing its job.
          </p>
          <p>
            The usual instinct is to blame the tests. Often the tests are part of it. But in my experience the pipeline
            design matters just as much: what runs when, in what order, how failures are reported and who is expected to
            react. A good pipeline makes a mediocre suite more useful. A bad pipeline can make a good suite invisible.
            This article is about the design choices that make red mean something, using Jenkins-style concepts but
            staying tool-agnostic wherever the idea is general.
          </p>
        </div>

        {/* Section 1 */}
        <section id="what-for" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What a Pipeline Is For</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A pipeline exists to answer one question for the person who just pushed a change: did I break something?
              It should answer it fast, and it should answer it reliably. Everything else, including dashboards,
              trend charts and nicely formatted reports, is secondary to that loop.
            </p>
            <p>
              This sounds obvious, but many pipelines are quietly designed around a different goal: producing a report
              at the end. All the tests run, in whatever order they were added, and an HTML summary arrives an hour later.
              That design optimizes for completeness of the artifact rather than speed of the feedback. By the time the
              report lands, the developer has moved on, and the connection between their change and the failure has
              to be rebuilt by hand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
              <p className="text-purple-300 font-semibold text-sm mb-3">A pipeline is</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2"><CircleCheck className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />A feedback loop for the person who made the change</li>
                <li className="flex gap-2"><CircleCheck className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />A set of gates that stop bad builds moving forward</li>
                <li className="flex gap-2"><CircleCheck className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />A shared, visible definition of "good enough to continue"</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/60 font-semibold text-sm mb-3">A pipeline is not</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex gap-2"><CircleX className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />A report generator that happens to run tests</li>
                <li className="flex gap-2"><CircleX className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />A place to run every test on every commit "just in case"</li>
                <li className="flex gap-2"><CircleX className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />Something only the QA team is expected to read</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="stage-by-cost" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Stage Your Tests by Cost</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Not all tests are equally expensive. A unit test runs in-process, needs no environment and finishes almost
              instantly. An API test needs a running service and some data. A UI test needs a deployed application, a
              browser, test data and a lot of patience. The cost difference shows up in runtime, in infrastructure and,
              most importantly, in how often the test fails for reasons unrelated to the change.
            </p>
            <p>
              So order them by cost. Run the cheap, fast, reliable checks first. Only spend on the expensive ones once
              the cheap ones have passed. If the build is broken, you want to know in the first minute, not after a
              forty-minute UI suite has failed on every single test for the same reason. This is what "fail fast"
              actually means in pipeline terms: not that tests should be quick (though that helps), but that the
              pipeline should stop at the earliest point that gives a clear answer.
            </p>
          </div>

          <div className="space-y-2 mb-6">
            {[
              { label: "Static checks and build", w: "w-[18%]", tone: "bg-purple-500/60" },
              { label: "Unit tests", w: "w-[30%]", tone: "bg-purple-500/50" },
              { label: "API and integration tests", w: "w-[52%]", tone: "bg-fuchsia-500/45" },
              { label: "Smoke UI", w: "w-[68%]", tone: "bg-fuchsia-500/35" },
              { label: "Full UI regression", w: "w-full", tone: "bg-pink-500/30" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <p className="text-xs text-white/60 w-44 shrink-0">{r.label}</p>
                <div className="flex-1 bg-white/5 rounded-full h-4 overflow-hidden">
                  <div className={`h-4 rounded-full ${r.w} ${r.tone}`} />
                </div>
              </div>
            ))}
            <p className="text-xs text-white/40 pt-2">
              Relative cost per stage (runtime, setup, environment dependence). Illustrative shape, not measured values.
            </p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Staging also helps with ownership. A failure in the unit stage almost always belongs to the person who
              made the change. A failure in the full UI regression could belong to the change, the environment, the test
              data or the test itself. When stages are separated by cost, they also tend to separate by kind of failure,
              which makes the first triage question much easier to answer.
            </p>
            <p>
              One practical consequence: not every stage has to run on every commit. Fast stages should, always.
              Expensive stages can run on merges to the main branch, on a schedule, or before a release candidate is
              promoted. That is a deliberate trade-off, and it should be written down so nobody assumes the full suite
              ran when it didn't.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="pipeline-diagram" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Pipeline, Gate by Gate</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Here is the shape I would start from for a typical web application with UI and API automation. Each stage
              is a box; each shield is a gate, meaning that if the stage fails, nothing after it runs and the build is
              marked red at that point.
            </p>
          </div>

          {/* Signature visual: horizontal pipeline with gates */}
          <div className="rounded-2xl border border-purple-500/25 bg-purple-500/5 p-5 mb-6 overflow-x-auto">
            <div className="flex flex-col md:flex-row items-center gap-2 md:min-w-[760px]">
              {stages.map((s, i) => (
                <div key={s.name} className="flex flex-col md:flex-row items-center gap-2">
                  <div className="relative w-40 md:w-24 rounded-xl border border-purple-500/30 bg-[#0b0f24] px-2 py-3 text-center">
                    {s.gate && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500/25 border border-purple-400/50 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-200" />
                      </span>
                    )}
                    <p className="text-purple-100 text-xs font-semibold mt-1">{s.name}</p>
                    <p className="text-white/40 text-[10px] leading-tight mt-1">{s.note}</p>
                  </div>
                  {i < stages.length - 1 && (
                    <>
                      <ChevronRight className="hidden md:block w-4 h-4 text-purple-300/50 shrink-0" />
                      <ChevronDown className="md:hidden w-4 h-4 text-purple-300/50 shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-purple-300" /> Gate: a failure here stops the pipeline and names this
              stage as the reason.
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {gates.map((g) => (
              <div key={g.stage} className="grid md:grid-cols-[150px_1fr] gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <p className="text-purple-300 font-semibold text-sm">{g.stage} gate</p>
                <p className="text-white/65 text-sm leading-relaxed">{g.protects}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The report stage at the end is not a gate. It always runs, pass or fail, because its job is to publish the
              evidence: test results, screenshots, logs, traces and a link back to the change. A pipeline that only
              publishes evidence when it succeeds is useless at exactly the moment you need it.
            </p>
            <p>
              Your shape will differ. Some teams put contract tests between unit and API stages. Some run security or
              accessibility scans in parallel with API tests. Some deploy to a short-lived environment just before the
              smoke stage. The principle stays the same: every gate should protect something specific, and you should be
              able to say in one sentence what that is. If you can't, the stage is probably there by accident.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="actionable" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Make Failures Actionable</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A failure is only useful if someone can act on it quickly. The test of a good pipeline is how long it
              takes a developer who has never seen the failing test to understand what went wrong and whether it is
              their problem. I think of it as the "two-minute rule": within two minutes of opening a red build, the reader
              should know which stage failed, which check failed, what was expected, what happened, and where the
              evidence is.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">Hard to act on</p>
              <div className="font-mono text-xs text-white/50 space-y-1.5">
                <p>Stage: tests</p>
                <p>Result: FAILED (many failures)</p>
                <p>See console output</p>
                <p>... thousands of lines of log ...</p>
              </div>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-indigo-300 text-xs uppercase tracking-widest font-semibold mb-3">Easy to act on</p>
              <div className="font-mono text-xs text-white/70 space-y-1.5">
                <p>Stage: Smoke UI</p>
                <p>Check: checkout completes with saved card</p>
                <p>Expected: order confirmation shown</p>
                <p>Actual: payment step error banner</p>
                <p>Evidence: screenshot, trace, server log link</p>
                <p>Owner: checkout team</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Four things make the difference. <span className="text-white/90">Clear stage names</span> that say what is
              being tested, not "step 3" or "tests". <span className="text-white/90">Readable test names and assertion
              messages</span>, so the failure line itself explains the expectation. <span className="text-white/90">Links
              to evidence</span>: screenshots, browser traces, server logs and recorded requests attached to the build,
              not left on an agent that gets wiped overnight. And an <span className="text-white/90">obvious owner</span>,
              whether that is the author of the change, a team named in an owners file, or a rotating triage role.
            </p>
            <p>
              The owner part is the one most often missing. When a red build belongs to "everyone", it belongs to no
              one, and the rebuild button becomes the default response. Even a simple rule helps: the person whose change
              triggered the build looks first, and hands over if the evidence points elsewhere.
            </p>
            <p>
              Logs deserve their own attention. A test framework that prints every click and every wait at the same
              level produces a console nobody can read. Keep the default output short: stage start and end, one line per
              failing check, and a pointer to the detailed logs for anyone who needs them. Put timestamps on everything,
              because the first question about any environment-related failure is "what else was happening at that
              moment?" And make sure secrets never appear in the output; a pipeline log is read by far more people than
              the configuration it came from.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="parallelism" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Split className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Parallelism and Isolation</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Once the stages are in the right order, the next lever is parallelism: running independent tests at the
              same time across threads, agents or containers. It is the most effective way to shorten a long stage, and
              also the most effective way to create new flakiness if you do it carelessly.
            </p>
            <p>
              Parallel tests are only safe when they are truly independent. That means they do not share mutable data,
              do not depend on running in a particular order, and do not fight over the same environment resources.
              Two tests that both edit the same user account will pass when run one after the other and fail
              unpredictably when run side by side. Nothing about the product changed; you just exposed a hidden
              dependency in the suite.
            </p>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 mb-6">
            <p className="text-cyan-300 font-semibold mb-4">Before you parallelize a stage, check that each test...</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "creates its own data, or uses data no other test writes to",
                "cleans up after itself, and cleanup failures are reported",
                "does not rely on another test running first",
                "does not change shared configuration or feature flags",
                "uses its own browser session and account",
                "can run alone and still pass",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CircleCheck className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              If those conditions are not met, parallelism is not a speed improvement. It is a way of manufacturing
              flaky failures and then spending your saved time investigating them. Fix isolation first, then turn up the
              parallelism gradually and watch the failure pattern. A rise in intermittent failures right after you add
              workers is the suite telling you exactly where its shared state lives.
            </p>
            <p>
              The same thinking applies to environments. If several pipelines deploy to and test against one shared
              environment at the same time, they will interfere with each other. Short-lived environments per build or
              per branch are ideal where you can afford them; where you can't, at least serialize the stages that need
              the shared environment and make that constraint visible.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="flaky" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Archive className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Handle Flaky Tests Deliberately</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Nothing destroys trust in a pipeline faster than flaky tests. A test that sometimes fails for no reason
              you can see teaches everyone that red might be meaningless. After a few weeks of that, real failures are
              rebuilt away along with the fake ones.
            </p>
            <p>
              The tempting fix is a blanket retry: if a test fails, run it again, and only report failure if it fails
              twice. I understand the appeal, and I think it is one of the most damaging defaults a pipeline can have.
              It hides genuine intermittent bugs in the product, it hides growing instability in the suite, and it
              removes the pressure that would otherwise get the root cause fixed. A retry is a decision to stop looking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                t: "Detect",
                d: "Record every test that fails and then passes on a rerun of the same code. That is your flake list, generated from data rather than opinion.",
              },
              {
                t: "Quarantine with an owner",
                d: "Move the flaky test to a separate, non-blocking job. It still runs and still reports. It has a named owner and a date by which it is fixed or deleted.",
              },
              {
                t: "Fix or retire",
                d: "Find the root cause: timing, data, locators or environment. Fix it, then move the test back into its gated stage. If nobody can fix it, delete it honestly.",
              },
            ].map((c, i) => (
              <div key={c.t} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                <p className="text-amber-300 font-mono text-xs mb-1">STEP {i + 1}</p>
                <p className="text-white/90 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Quarantine is the key idea. It protects the gate without pretending the problem is gone. The test is out
              of the blocking path, so it can't train people to ignore red, but it is still visible, still owned and
              still on a clock. The danger is a quarantine that becomes a graveyard. Review it regularly, and treat a
              growing quarantine list as a signal about the suite's health, not as a place to hide things.
            </p>
            <p>
              If you do allow retries anywhere, make them explicit and visible: a test that passed on retry should show
              up in the report as "passed after retry", with a count over time. That turns a hidden problem into a
              tracked one.
            </p>
            <p>
              Agree the policy before you need it. Who is allowed to quarantine a test? How long can it stay there?
              What happens when the deadline passes? Writing those answers down in advance turns a stressful release-day
              argument into a routine step. It also protects testers from the quiet pressure to "just make the build
              green", because the team has already agreed on what green is allowed to hide and what it isn't.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="pipeline-as-code" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <FileCode className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pipeline as Code</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The last principle is the one that keeps the others from eroding: the pipeline definition lives in the
              repository, next to the code it builds, and changes to it go through the same review as any other change.
              Most modern CI tools support this in some form; in Jenkins it is a declarative Jenkinsfile, in other
              tools a YAML file. The format matters less than the habit.
            </p>
            <p>
              Pipelines configured by clicking through a web interface drift. Someone adds a retry to unblock a
              release, someone else disables a stage "temporarily", and six months later nobody knows why the pipeline
              behaves the way it does. When the pipeline is code, every one of those changes has an author, a reason and
              a review, and you can roll it back like anything else.
            </p>
            <p>
              Here is a short, generic example in declarative Jenkins style that follows the staging described above.
              It is illustrative, not a template to paste: your build tool, profiles and report paths will differ.
            </p>
          </div>

          <div className="bg-black/40 border border-purple-500/20 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              Jenkinsfile — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-purple-100/90 font-mono">
              <code>{pipelineCode}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A few things worth noticing. Each stage has a name that says what it tests. Test results are published
              in an "always" block, so they appear whether the stage passed or failed. Screenshots are archived as
              build artifacts. The full regression only runs on the main branch, a written-down trade-off rather than
              a hidden one. And there is a global timeout, because a hung pipeline gives no feedback at all.
            </p>
            <p>
              Treat this file like production code. Review it, keep it readable, avoid clever logic, and resist the urge
              to solve every special case with another conditional. When the pipeline starts to need its own tests to
              understand, it has grown too complicated.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              A fast pipeline that nobody trusts is just a fast way to be ignored. A trustworthy pipeline that takes all
              afternoon is a report nobody waits for. You need both properties, and they come from design rather than
              from more tests.
            </p>
            <p>
              Order stages by cost. Give every gate a clear purpose. Make every failure readable in two minutes with the
              evidence one click away. Parallelize only what is truly isolated. Quarantine flaky tests with owners and
              deadlines instead of hiding them behind retries. Keep the whole thing in version control, reviewed like the
              code it protects. Do that, and red stops being background noise. It becomes the thing people stop and read.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
            <p className="text-purple-200 text-lg font-semibold">Speed gets people to look. Trust gets them to act.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Is your pipeline green, red, or just ignored?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about staging, gates and flaky-test policies that make your build results worth reading again.
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

export default CICDTestAutomationBlog;
