import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Map as MapIcon,
  Compass,
  CodeXml,
  Wrench,
  Database,
  Brain,
  MessageSquare,
  TrendingUp,
  Minus,
  TrendingDown,
} from "lucide-react";

/**
 * Blog: The SDET Skills Map for 2026: What to Deepen, Maintain and Let Go
 * Slug: /blog/the-sdet-skills-map-for-2026
 * Category: AI Strategy
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

const SDETSkillsMap2026Blog = () => {
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
    title: "The SDET Skills Map for 2026: What to Deepen, Maintain and Let Go | Digital Jaydeep",
    description:
      "AI is shifting what makes an automation engineer valuable. An opinionated, layered skills map for SDETs: testing fundamentals, engineering craft, tooling, data, AI literacy and communication, with clear advice on where to invest, where to keep up and what is becoming commodity.",
    keywords:
      "SDET skills, SDET career, test automation career, QA skills 2026, AI literacy, software testing skills, automation engineer",
    canonicalUrl: "https://jaydeepai.github.io/blog/the-sdet-skills-map-for-2026",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "The SDET Skills Map for 2026: What to Deepen, Maintain and Let Go",
      datePublished: "2026-11-06",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-a-map", label: "Why a Map, Not a List" },
    { id: "fundamentals", label: "Layer 1: Testing Fundamentals" },
    { id: "engineering-craft", label: "Layer 2: Engineering Craft" },
    { id: "automation-tooling", label: "Layer 3: Automation Tooling" },
    { id: "data-systems", label: "Layer 4: Data and Systems" },
    { id: "ai-literacy", label: "Layer 5: AI Literacy" },
    { id: "communication", label: "Layer 6: Communication, and What to Ease Off" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const layers = [
    { n: 6, name: "Communication", advice: "Deepen", width: "w-full" },
    { n: 5, name: "AI literacy", advice: "Build now", width: "w-11/12" },
    { n: 4, name: "Data and systems", advice: "Deepen gradually", width: "w-10/12" },
    { n: 3, name: "Automation tooling", advice: "Maintain", width: "w-9/12" },
    { n: 2, name: "Engineering craft", advice: "Deepen", width: "w-10/12" },
    { n: 1, name: "Testing fundamentals", advice: "Deepen", width: "w-full" },
  ];

  const deepenChip = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold";
  const maintainChip = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/25 text-sky-200 text-xs font-semibold";
  const buildChip = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/25 text-fuchsia-200 text-xs font-semibold";
  const easeChip = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-white/50 text-xs font-semibold";

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
            AI Strategy Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            SDET
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Career &amp; Skills
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          The SDET Skills Map for 2026: What to Deepen, Maintain and Let Go
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Typing code is getting cheaper every month. Knowing which code is worth trusting is not.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 6, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 13 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Strategy
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
          "The more code AI writes, the more valuable the person who can say whether it's right."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Every few months someone announces that automation engineers are finished. The argument goes like this:
            AI can write Selenium code, AI can write API tests, so who needs an SDET? I think that argument gets the
            job description wrong. Writing test code was never the valuable part on its own. Deciding what to test,
            designing checks that can actually fail, and keeping a suite trustworthy over time was the job. The code
            was how we expressed it.
          </p>
          <p>
            What is genuinely changing is the price of each skill. Some are getting cheaper fast, some are holding
            their value, and a few are becoming more valuable precisely because AI produces so much output that
            somebody has to judge. This article is my map of that shift. To be clear up front: it is a point of view
            from a practitioner who builds with these tools, not a forecast and not a survey. Use it to argue with,
            not to obey.
          </p>
        </div>

        {/* Section 1 */}
        <section id="why-a-map" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why a Map, Not a List</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Most career advice for testers arrives as a list: learn this framework, that language, this cloud tool.
              Lists are flat. They suggest every item is equally important and equally independent, which is why people
              end up collecting tool badges while their foundations stay thin.
            </p>
            <p>
              Skills actually sit in layers, and the layers depend on each other. Automation tooling is only useful if
              you can program properly. Programming skill only produces good tests if you understand test design. AI
              literacy is only safe if you can judge the output, which loops back to fundamentals. When you see the
              layers, you also see why the bottom of the stack matters more as the top gets automated.
            </p>
          </div>

          {/* Layer stack */}
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-5">The six layers</p>
            <div className="space-y-2 flex flex-col items-center">
              {layers.map((layer) => (
                <div
                  key={layer.n}
                  className={`${layer.width} flex items-center justify-between bg-indigo-500/15 border border-indigo-400/25 rounded-lg px-4 py-2.5`}
                >
                  <span className="text-sm text-white">
                    <span className="text-indigo-300 font-mono mr-3">L{layer.n}</span>
                    {layer.name}
                  </span>
                  <span className="text-xs text-indigo-200/80">{layer.advice}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Read bottom-up: every layer leans on the ones beneath it.
            </p>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is the full map at a glance. The "AI impact" column describes how I see AI changing the day-to-day
            work in each layer; the last column is my advice, nothing more.
          </p>

          {/* Signature visual: skills table */}
          <div className="overflow-x-auto rounded-2xl border border-indigo-500/25 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-500/10 text-indigo-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Skill layer</th>
                  <th className="text-left px-5 py-3 font-semibold">Examples</th>
                  <th className="text-left px-5 py-3 font-semibold">AI impact</th>
                  <th className="text-left px-5 py-3 font-semibold">My advice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white font-medium">1. Testing fundamentals</td>
                  <td className="px-5 py-3 text-white/60">Test design techniques, risk, oracles, exploratory testing</td>
                  <td className="px-5 py-3 text-white/60">AI can suggest ideas; it cannot decide what matters</td>
                  <td className="px-5 py-3"><span className={deepenChip}><TrendingUp className="w-3 h-3" /> Deepen</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">2. Engineering craft</td>
                  <td className="px-5 py-3 text-white/60">One language well, Git, CI/CD, debugging, code review</td>
                  <td className="px-5 py-3 text-white/60">More generated code means more code to review</td>
                  <td className="px-5 py-3"><span className={deepenChip}><TrendingUp className="w-3 h-3" /> Deepen</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">3. Automation tooling</td>
                  <td className="px-5 py-3 text-white/60">UI and API frameworks, runners, reporting</td>
                  <td className="px-5 py-3 text-white/60">Syntax and boilerplate are increasingly generated</td>
                  <td className="px-5 py-3"><span className={maintainChip}><Minus className="w-3 h-3" /> Maintain</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">4. Data and systems</td>
                  <td className="px-5 py-3 text-white/60">SQL, logs, observability, basic architecture</td>
                  <td className="px-5 py-3 text-white/60">AI helps query and summarize; you still need the model of the system</td>
                  <td className="px-5 py-3"><span className={deepenChip}><TrendingUp className="w-3 h-3" /> Deepen gradually</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">5. AI literacy</td>
                  <td className="px-5 py-3 text-white/60">Prompting, evaluating output, tools and agents, privacy</td>
                  <td className="px-5 py-3 text-white/60">New layer; changes how every other layer is practiced</td>
                  <td className="px-5 py-3"><span className={buildChip}><TrendingUp className="w-3 h-3" /> Build now</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">6. Communication</td>
                  <td className="px-5 py-3 text-white/60">Writing, risk conversations, influencing quality</td>
                  <td className="px-5 py-3 text-white/60">AI polishes words; it does not hold the conversation</td>
                  <td className="px-5 py-3"><span className={deepenChip}><TrendingUp className="w-3 h-3" /> Deepen</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white/70 font-medium">Boilerplate &amp; memorized syntax</td>
                  <td className="px-5 py-3 text-white/50">Hand-written setup code, API signatures from memory</td>
                  <td className="px-5 py-3 text-white/50">Largely commodity</td>
                  <td className="px-5 py-3"><span className={easeChip}><TrendingDown className="w-3 h-3" /> Ease off</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2 */}
        <section id="fundamentals" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 1: Testing Fundamentals</h2>
            <span className={deepenChip}>Deepen</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the layer most likely to be underrated in an AI-heavy world, and the one I would invest in first.
              Test design techniques such as boundary value analysis, equivalence partitioning, state transitions,
              decision tables and pairwise thinking are how you turn a vague feature into a small set of checks that
              actually find defects. Risk analysis is how you decide which of those checks matter this week. And the
              oracle, knowing what "correct" means and where that knowledge comes from, is the part no tool can supply
              on its own.
            </p>
            <p>
              Ask an AI assistant for test ideas and you will get a long, reasonable-looking list. The skill is in
              reading that list and seeing what is missing, what is redundant and what is irrelevant to the risks your
              product actually carries. That requires fundamentals. Without them, you accept the list because it looks
              thorough.
            </p>
            <p>
              Exploratory testing belongs here too. Structured exploration, with charters, time boxes and notes, finds
              the kind of problems that nobody thought to write down as requirements. It is learning about the product
              while testing it, and it is hard to delegate because the value comes from a human noticing that something
              feels wrong.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-indigo-300 font-semibold">How to deepen it: </span>
              pick one technique per month and apply it deliberately to real work. Write the partitions or the state
              model down before you generate any code. Then compare your design with what an AI suggests, and note the
              differences in both directions.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="engineering-craft" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <CodeXml className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 2: Engineering Craft</h2>
            <span className={deepenChip}>Deepen</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              There is a tempting conclusion that if AI writes the code, you need to know less programming. I think the
              opposite is true. When generation is cheap, the volume of code goes up, and every line still has to be
              read, understood, merged, debugged and maintained by someone. Reading code critically is harder than
              writing it, and it depends on knowing the language well enough to spot what is subtly wrong.
            </p>
            <p>
              The craft layer is not about one fashionable language. It is about depth in one, enough to understand its
              type system, its collections, its error handling and its testing ecosystem without looking everything up.
              For many automation engineers that is Java; for others it is TypeScript or Python. Depth in one transfers
              to the next far better than shallow familiarity with five.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Version control", desc: "Small commits, readable history, clean branches, resolving conflicts without fear. Essential when assistants propose large diffs." },
              { title: "CI/CD", desc: "Understanding how your suite runs in the pipeline: stages, parallelism, artifacts, environments and why a test passes locally and fails there." },
              { title: "Debugging", desc: "Reading stack traces, isolating variables, reproducing reliably. AI can suggest hypotheses; you have to confirm them." },
              { title: "Code review", desc: "The core skill of the AI era. Reviewing generated test code for weak assertions, hidden sleeps and wrong-element locators." },
            ].map((item) => (
              <div key={item.title} className="bg-violet-500/5 border border-violet-500/15 rounded-2xl p-5">
                <p className="text-violet-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            If I had to pick a single habit for this layer, it would be reviewing every AI-generated change as if a
            new colleague had submitted it. Read each line. Run it. Break it. The engineers who do this consistently
            will keep getting better; the ones who accept whatever compiles will slowly lose the ability to tell good
            code from plausible code.
          </p>
        </section>

        {/* Section 4 */}
        <section id="automation-tooling" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 3: Automation Tooling</h2>
            <span className={maintainChip}>Maintain</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the layer many SDET job descriptions lead with: Selenium, Playwright, REST Assured, Cypress, test
              runners, reporting tools. It is also the layer where AI has the most direct effect. Assistants are
              familiar with popular frameworks from public code, and they can generate page objects, fixtures and API
              calls quickly. The syntax is getting cheaper.
            </p>
            <p>
              That does not make tool knowledge worthless. It changes what kind of tool knowledge matters. Knowing the
              exact method name for a wait is less valuable. Knowing why condition-based waits beat fixed sleeps, how
              a framework handles browser contexts, where its reports put evidence, and what its failure modes look
              like is still valuable, because that is what lets you judge whether generated code is correct.
            </p>
            <p>
              My advice is to maintain this layer rather than chase it. Stay current with the one or two frameworks
              your team actually uses. Understand their concepts deeply enough to explain them. Resist the urge to
              collect every new tool as a career move; the novelty premium on tool names is shrinking.
            </p>
          </div>

          <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-sky-300 font-semibold">The shift in one line: </span>
              from "I can write this framework" to "I can tell whether this framework code is stable, readable and
              asserting the right thing".
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="data-systems" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 4: Data and Systems</h2>
            <span className={deepenChip}>Deepen gradually</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              UI automation lets you test for years without understanding what happens behind the screen. That is a
              ceiling. Most real defects live in data, integrations and state, and the testers who can follow a
              problem down through the API, the logs and the database are the ones who find root causes instead of
              symptoms.
            </p>
            <p>
              This layer includes SQL good enough to set up and verify test data, comfort reading application logs,
              some familiarity with observability concepts such as metrics, traces and alerts, and a basic mental
              model of the architecture you are testing: which services exist, how they talk, where data is stored and
              what happens when one of them is slow.
            </p>
            <p>
              I say "deepen gradually" because this is a wide area and nobody needs to become a database administrator
              or a platform engineer. The goal is to be able to ask good questions and follow evidence. AI helps here:
              it can explain an unfamiliar query, summarize a noisy log, or describe what a trace is showing. But you
              need enough of a mental model to know when its explanation does not fit the system you actually have.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Write the SQL to verify one test's data by hand before automating the check.",
              "When a test fails, read the application log for that time window before reading the stack trace twice.",
              "Draw your system's main services and data flows on one page, and update it as you learn.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section id="ai-literacy" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 5: AI Literacy</h2>
            <span className={buildChip}>Build now</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the newest layer and the only one where my advice is "build it now" rather than "deepen". If you
              are not using AI assistants in your daily testing work yet, you are learning slower than the people who
              are. But AI literacy is not the same as using a chatbot. It is a set of skills that sit on top of
              everything below.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Skill</th>
                  <th className="text-left px-5 py-3 font-semibold">What it looks like in practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-fuchsia-300 font-medium">Prompting</td>
                  <td className="px-5 py-3 text-white/70">Giving context, constraints and an output format; treating a prompt as a small spec</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-fuchsia-300 font-medium">Evaluating output</td>
                  <td className="px-5 py-3 text-white/70">Spotting confident errors, invented details and weak assertions before they reach the repo</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-fuchsia-300 font-medium">Tools and agents</td>
                  <td className="px-5 py-3 text-white/70">Understanding how assistants call tools, what permissions they need, and where a human must approve</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-fuchsia-300 font-medium">Privacy and data handling</td>
                  <td className="px-5 py-3 text-white/70">Knowing what must never go into a prompt and using only approved tools for work data</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-fuchsia-300 font-medium">Testing AI features</td>
                  <td className="px-5 py-3 text-white/70">Property checks, evaluation sets and rubrics for outputs that are not deterministic</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The last row matters more than people expect. As products ship AI features, someone has to test them, and
              exact-match assertions do not work on output that varies. Testers who learn to evaluate model behavior,
              with rubrics, evaluation sets and adversarial cases, are building a skill that very few teams have yet.
            </p>
            <p>
              In my own daily work, this layer means using tools such as Claude, Claude Code, GitHub Copilot and
              ChatGPT for different jobs, and getting deliberate about which job fits which tool. The specific tools
              will change. The habits, writing clear instructions, reviewing everything, protecting data, will not.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="communication" className="scroll-mt-24 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layer 6: Communication, and What to Ease Off</h2>
            <span className={deepenChip}>Deepen</span>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The top layer is the one that turns everything else into influence. A tester who finds a serious risk and
              cannot explain it clearly to a product owner has found it for nobody. Communication here means writing
              bug reports that get acted on, test summaries that say what is and is not covered, and risk statements a
              non-technical stakeholder can make a decision from.
            </p>
            <p>
              It also means holding conversations that are uncomfortable: telling a team that a release is riskier
              than the dashboard suggests, arguing for testability in a design review, or pushing back when a deadline
              quietly removes testing. AI can polish your words. It cannot sit in the meeting, read the room and hold
              the position. As more of the mechanical work is automated, this human part becomes a larger share of what
              makes a senior SDET senior.
            </p>
          </div>

          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-white/50" />
              <p className="text-white font-semibold">What I would ease off</p>
            </div>
            <div className="space-y-4 text-sm text-white/60 leading-relaxed">
              <p>
                <span className="text-white/80 font-medium">Hand-writing boilerplate.</span> Page object scaffolding,
                getters, setup code, data classes and repetitive configuration are exactly what assistants do well.
                Spending hours typing them by hand is no longer a sign of diligence. Generate them, then review them.
              </p>
              <p>
                <span className="text-white/80 font-medium">Memorizing syntax.</span> Knowing every method signature of
                every framework used to be a mark of experience. Now the signature is one prompt or one autocomplete
                away. Understanding concepts beats recalling names.
              </p>
              <p>
                <span className="text-white/80 font-medium">Tool-collecting as a strategy.</span> Adding framework names
                to a profile matters less when generation lowers the barrier to any of them. Depth and judgment travel;
                logos do not.
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Easing off is not the same as forgetting. You still need to read the boilerplate you generate and
            recognize when the syntax is wrong. The point is to stop spending your scarcest resource, focused
            learning time, on the parts of the job whose price is falling.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I&apos;ve Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Put the map together and a simple pattern appears. The skills losing value are the ones about producing
              code. The skills gaining value are the ones about judging it: test design, deep engineering craft, system
              understanding, critical use of AI, and the ability to explain risk to people who have to make decisions.
            </p>
            <p>
              That is good news for testers, because judgment is what testing has always been about. The job is moving
              back toward its core. If you are planning your learning for the next year, start at the bottom of the
              stack, build AI literacy in parallel, and let the boilerplate go without guilt.
            </p>
            <p>
              A practical first step: write down the six layers, rate yourself honestly on each, and pick one layer to
              deepen this quarter. Not five. One.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-indigo-200 text-lg font-semibold">Invest in judgment. Rent the typing.</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Planning your next step as an SDET?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let&apos;s talk about building the skills that stay valuable as AI takes over the typing.
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

export default SDETSkillsMap2026Blog;
