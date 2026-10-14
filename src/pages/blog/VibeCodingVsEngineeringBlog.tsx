import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  WandSparkles,
  Lightbulb,
  EyeOff,
  Route,
  ShieldCheck,
  GraduationCap,
  Repeat,
  Flag,
  Rocket,
  CircleCheck,
  Github,
} from "lucide-react";

/**
 * Blog: Vibe Coding vs Engineering: Where QA Keeps It Honest
 * Slug: /blog/vibe-coding-vs-engineering
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

const VibeCodingVsEngineeringBlog = () => {
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
    title: "Vibe Coding vs Engineering: Where QA Keeps It Honest | Digital Jaydeep",
    description:
      "Describing an app to an AI and watching it appear is thrilling. It also skips everything that makes software dependable. Where vibe coding shines, what it skips, and the quality gates that turn a prototype into a product people can rely on.",
    keywords:
      "vibe coding, AI development, software quality, quality gates, prototype to production, QA, AI-generated code, engineering practices",
    canonicalUrl: "https://jaydeepai.github.io/blog/vibe-coding-vs-engineering",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Vibe Coding vs Engineering: Where QA Keeps It Honest",
      datePublished: "2026-11-23",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "what-it-is", label: "What Vibe Coding Is" },
    { id: "where-it-shines", label: "Where It Shines" },
    { id: "what-it-skips", label: "What It Skips" },
    { id: "two-lanes", label: "The Prototype and Product Lanes" },
    { id: "qa-contribution", label: "The QA Contribution" },
    { id: "graduation", label: "The Graduation Checklist" },
    { id: "workflow", label: "A Healthy Workflow" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const prototypeSteps = ["Describe the idea", "Generate", "Click around", "Tweak the prompt", "Demo"];

  const gates = [
    { name: "Requirements", desc: "Written behavior, including errors and limits, that someone other than the author agrees with." },
    { name: "Tests", desc: "Automated checks for the important behavior, each one seen to fail when the behavior breaks." },
    { name: "Security review", desc: "Authentication, authorization, input handling, secrets and dependencies looked at on purpose." },
    { name: "Observability", desc: "Logs, error reporting and basic health signals, so problems are noticed by the team before users report them." },
    { name: "Maintainability", desc: "Code a person can read, change and own, with a structure that does not collapse at the next feature." },
    { name: "Rollback", desc: "A known, tested way to undo a release and to recover data if something goes wrong." },
  ];

  const graduation = [
    "Someone is named as the owner and can explain how the code works.",
    "The intended behavior is written down, including what happens on errors and invalid input.",
    "Critical paths have automated tests, and each test has been seen to fail for the right reason.",
    "Authentication and authorization have been reviewed, and users cannot see each other's data.",
    "No secrets live in the code or the repository; credentials are stored properly.",
    "Real user data is handled according to policy: what is stored, where, for how long and who can access it.",
    "Errors are logged and someone is alerted when things break.",
    "Dependencies are known, reasonably current and from trusted sources.",
    "There is a backup and a rollback plan, and both have been tried at least once.",
    "The code has been read by a human who did not generate it.",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-wide uppercase">
            AI Strategy Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Vibe Coding
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Software Quality
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Vibe Coding vs Engineering: Where QA Keeps It Honest
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Building by describing is a genuine superpower for exploration. Shipping by describing is a different thing,
          and the gap between them is where quality lives.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 23, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
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
          "A demo proves it can work once. A product proves it keeps working."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            There is a particular kind of joy in describing an app to an AI and watching it appear. You type what you
            want, a working screen shows up, you ask for a change and it changes. Ideas that used to take a weekend to
            try now take an evening. For anyone who has spent years waiting for development capacity, it feels like a
            door opening.
          </p>
          <p>
            It is also, quietly, a way to skip almost everything that makes software dependable. Not because the tools
            are bad or the people using them are careless, but because the workflow is optimized for seeing something
            work, and seeing something work is not the same as knowing it works. This article is not an argument
            against vibe coding. I think it is one of the most useful ways to explore ideas that has ever existed. It is
            an argument for knowing which lane you are in, and for the quality gates that should stand between a
            prototype and the people who will depend on it.
          </p>
        </div>

        {/* Section 1 */}
        <section id="what-it-is" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <WandSparkles className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Vibe Coding Is</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Vibe coding is building software by describing your intent to an AI and iterating on the result, with
              little or no manual reading of the code it produces. You judge progress by behavior: does the screen look
              right, does the button do the thing, does the demo flow work. When something is off, you describe the
              problem and let the AI fix it. The code is treated almost as an implementation detail.
            </p>
            <p>
              That is the key distinction from AI-assisted engineering. An engineer using an AI coding assistant still
              reads the diffs, understands the structure, writes or reviews tests and owns every line that ships. A vibe
              coder deliberately trades that understanding for speed. Both are legitimate. They just produce different
              things, with different levels of evidence behind them.
            </p>
            <p>
              The term is informal and people use it loosely, sometimes as praise and sometimes as an insult. I want to
              use it neutrally here: as a description of a workflow, not a judgment of the person using it. Plenty of
              experienced engineers vibe code on purpose for throwaway work, and plenty of newcomers build their first
              useful tool this way. The workflow is fine. The trouble only starts when its output is treated as
              something it is not.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="where-it-shines" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where It Shines</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Vibe coding is at its best when the cost of being wrong is low and the value of learning fast is high. That
            describes more situations than skeptics like to admit.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-200 font-semibold text-sm mb-2">Prototypes</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A clickable version of an idea to show stakeholders beats a slide deck. It surfaces misunderstandings
                before anyone writes a real requirement.
              </p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-200 font-semibold text-sm mb-2">Personal tools</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A small utility only you use, on data you own, where you will notice immediately if it breaks.
              </p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-200 font-semibold text-sm mb-2">Learning</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Seeing a working example of an unfamiliar framework, then reading it to understand how it fits together.
              </p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-200 font-semibold text-sm mb-2">Throwaway scripts and idea validation</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A one-off data conversion, or a quick experiment to see whether an idea is worth building properly.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              For QA specifically, there is a lot to like. Testers can build the small tools they have always wanted
              without waiting for a developer: a test data generator for a local environment, a script that tidies up a
              report, a quick page that visualizes a flaky-test ledger. Prototypes also make excellent testing
              conversations. Showing a product owner a rough working version and asking "what should happen when this
              field is empty?" gets better answers than asking the same question about a paragraph in a ticket.
            </p>
            <p>
              The common thread is that in all of these cases, you are the main user, the risk is contained and the
              artifact is meant to teach you something or save you time, not to carry other people's trust.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="what-it-skips" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What It Skips</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The speed of vibe coding comes from skipping steps. That is not a flaw in the method; it is the method. But
              it is worth naming exactly what gets skipped, because those are precisely the things that separate
              software that works in a demo from software that keeps working.
            </p>
            <p>
              <span className="text-white font-medium">Requirements clarity.</span> The prompt describes the happy path.
              It rarely says what should happen with empty input, duplicate submissions, slow networks or users who do
              things in the wrong order. The AI fills those gaps with plausible guesses, and nobody decided whether those
              guesses are right.
            </p>
            <p>
              <span className="text-white font-medium">Error handling.</span> When the code is judged by whether the demo
              works, failure paths get little attention. Errors may be swallowed silently, shown as raw technical
              messages or leave data half-saved.
            </p>
            <p>
              <span className="text-white font-medium">Tests.</span> Some tools generate tests, but if nobody reads them,
              nobody knows what they check. A suite that has never been seen to fail proves very little.
            </p>
            <p>
              <span className="text-white font-medium">Security thinking.</span> Authentication that works for the happy
              path, authorization that only hides buttons in the interface, secrets pasted into configuration files,
              input passed straight into queries. None of these show up in a demo.
            </p>
            <p>
              <span className="text-white font-medium">Observability.</span> If nobody planned for logs, error reports and
              health checks, the first sign of a problem is a user complaint, and there is little evidence to debug it
              with.
            </p>
            <p>
              <span className="text-white font-medium">Maintainability.</span> Code that nobody has read is code that
              nobody can confidently change. Each new prompt may patch the latest symptom while the structure underneath
              grows more tangled, until a small change breaks something unrelated.
            </p>
            <p>
              None of these gaps are visible from the outside. A vibe-coded app and a carefully engineered one can look
              identical in a demo. They can even behave identically for the first few users who follow the expected
              path. The difference only appears under conditions nobody demonstrated: unusual input, concurrent use,
              a hostile user, a failed dependency, the third feature request. That is exactly why "it works when I try
              it" is such a weak signal on its own, and why testers have always been suspicious of it.
            </p>
          </div>
        </section>

        {/* Section 4 — Two lanes */}
        <section id="two-lanes" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Route className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Prototype and Product Lanes</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The most useful mental model I have found is two lanes running side by side. In the prototype lane, speed is
              the goal and the gates are deliberately absent. In the product lane, the same idea moves more slowly
              because it has to pass through gates that produce evidence. Moving from one lane to the other is a
              conscious decision, not something that happens because a demo went well.
            </p>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-6 space-y-8">
            {/* Prototype lane */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-4 h-4 text-amber-300" />
                <p className="text-amber-200 text-xs uppercase tracking-widest font-semibold">Prototype lane: optimize for learning</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {prototypeSteps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-100 text-xs">{s}</span>
                    {i < prototypeSteps.length - 1 && <span className="text-amber-400/60 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-red-500/30" />

            {/* Product lane */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flag className="w-4 h-4 text-red-300" />
                <p className="text-red-200 text-xs uppercase tracking-widest font-semibold">Product lane: optimize for trust</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white/70 text-xs">Validated idea</span>
                {gates.map((g) => (
                  <div key={g.name} className="flex items-center gap-2">
                    <span className="text-red-400/60 text-xs">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-red-500/15 border-2 border-red-400/50 text-red-100 text-xs font-semibold">
                      ▮ {g.name}
                    </span>
                  </div>
                ))}
                <span className="text-red-400/60 text-xs">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30 text-green-200 text-xs font-semibold">Real users</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {gates.map((g) => (
              <div key={g.name} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="mt-1 w-2.5 h-2.5 rounded-sm bg-red-400/80 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{g.name} gate</p>
                  <p className="text-white/60 text-sm leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Each gate answers a question that the prototype lane never asked. Requirements ask "what exactly should
              this do, including when things go wrong?" Tests ask "how will we know if it stops doing that?" Security
              review asks "who could misuse this, and what could they reach?" Observability asks "how will we find out
              something broke?" Maintainability asks "can someone other than the AI change this safely?" Rollback asks
              "what do we do when, not if, a release goes wrong?"
            </p>
            <p>
              Notice that AI can help with every gate. It can draft requirements, generate test ideas, point out common
              security issues and suggest logging. What it cannot do is pass the gate on your behalf. A gate is passed
              when a responsible person has looked at the evidence and is willing to put their name on it.
            </p>
            <p>
              The gates also do not all need to happen at once, or at full depth for every project. A small internal tool
              might need a light version of each; a feature handling payments or personal data needs the heavy version.
              The point is that each gate is considered and either passed or consciously waived by someone with the
              authority to accept that risk. What should never happen is a prototype drifting into the product lane
              without anyone noticing that it skipped every gate on the way.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="qa-contribution" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The QA Contribution</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is where testers become unusually valuable. Vibe-coded software arrives with lots of behavior and
              little documented intent. Turning that into something trustworthy is, at its core, a testing problem.
            </p>
            <p>
              <span className="text-blue-300 font-medium">Turn output into specs.</span> Start by exploring what the
              prototype actually does and writing it down as acceptance checks. Then take those to the product owner and
              ask which behaviors are intended and which are accidents. Many of the AI's plausible guesses will turn out
              to be wrong in small, important ways: a rounding rule, a default value, a permission nobody asked for.
            </p>
            <p>
              <span className="text-blue-300 font-medium">Add tests that fail for the right reasons.</span> For each
              important behavior, write a check and then break the behavior on purpose to see it fail. That one habit
              separates real protection from decorative tests. If generated tests already exist, review them with the
              same suspicion: what would each one actually catch?
            </p>
            <p>
              <span className="text-blue-300 font-medium">Probe edges and abuse cases.</span> Empty, huge, duplicate and
              malformed input. Two users editing the same record. A user trying to reach another user's data by changing
              an identifier. Double-clicking the submit button. Losing connection halfway through. These are the cases
              prompts rarely mention and testers instinctively try.
            </p>
            <p>
              <span className="text-blue-300 font-medium">Review data handling.</span> What does the app store, where,
              and for how long? Does it log personal data? Does it send anything to third-party services? Prototypes
              often handle data casually because they only ever saw fake data. Real users change that.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">The framing that helps: </span>
              you are not there to criticize the prototype. You are there to convert its behavior into evidence, so the
              team can decide with confidence whether it is ready, and so the person who built it can keep building fast
              without carrying all the risk alone.
            </p>
          </div>
        </section>

        {/* Section 6 — Graduation checklist */}
        <section id="graduation" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Graduation Checklist</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            The moment a prototype gets real users, real data or real money, it has graduated whether anyone planned it
            or not. Better to make graduation a deliberate step with a checklist. Every item below should be true before
            people outside the builder start depending on the result.
          </p>

          <div className="border-2 border-red-500/30 bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-red-200 font-semibold">Ready for real users?</p>
              <span className="text-red-300/60 text-xs uppercase tracking-widest">All must be true</span>
            </div>
            <ol className="space-y-3">
              {graduation.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />
                  <span className="text-white/75 text-sm leading-relaxed">{g}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The checklist scales with risk. An internal tool for a handful of colleagues on non-sensitive data might
              satisfy several items lightly. A customer-facing feature handling personal data needs every item done
              properly, and probably more. What should never change is that someone consciously walks through the list
              and records the answers.
            </p>
            <p>
              Sometimes the honest outcome of the checklist is that the prototype should not graduate at all. It
              validated the idea, which was its job, and the product version should be rebuilt with engineering practices
              from the start, using the prototype as a living specification. That is not wasted work. It is the prototype
              lane doing exactly what it was for.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="workflow" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Repeat className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Healthy Workflow</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Put it together and a healthy workflow has two speeds, used on purpose.
            </p>
            <p>
              <span className="text-white font-medium">Explore fast.</span> When you are trying to understand a problem,
              test an idea or show someone what you mean, vibe code freely. Do not slow yourself down with process that
              protects nothing. Label the result clearly as a prototype, keep it away from real data, and do not let it
              quietly become something people rely on.
            </p>
            <p>
              <span className="text-white font-medium">Then slow down on purpose.</span> When an idea has proven its
              value and is heading for real users, change gears. Read the code, or decide to rewrite it. Write the
              requirements, add the tests, run the security review, wire up observability and plan the rollback. Use AI
              throughout, but as an assistant to engineers who understand and own the result, not as a replacement for
              them.
            </p>
            <p>
              <span className="text-white font-medium">Keep humans accountable.</span> Whatever the tools, a named person
              is responsible for what ships. "The AI wrote it" is not an explanation that users, customers or regulators
              will accept, and it should not be one that teams accept from each other either. Accountability is what makes
              the gates real rather than ceremonial.
            </p>
            <p>
              Teams that get this right tend to get the best of both. Product owners and testers prototype more, so
              ideas are clearer before development starts. Engineers spend less time building the wrong thing. And QA
              stops being the team that slows everything down, becoming the team that decides, with evidence, when
              something is ready to move from one lane to the other.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Vibe coding is not the enemy of engineering. It is a different activity with a different purpose. It is
              wonderful for prototypes, personal tools, learning and validating ideas, and it lowers the cost of trying
              things in a way that benefits everyone, testers included. What it does not do is produce evidence that
              software is correct, secure, observable and maintainable. Those come from the gates.
            </p>
            <p>
              QA's role is to keep the two lanes honest: to celebrate fast exploration, to insist on deliberate
              graduation, and to turn plausible behavior into documented, tested, owned behavior before real users depend
              on it. That is not slowing innovation down. It is what lets innovation survive contact with the real
              world.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-red-200 text-lg font-semibold">
              Move fast to find the idea. Slow down to earn the trust.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Turning a prototype into a product?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about quality gates, graduation checklists and how QA can keep fast AI-built work trustworthy.
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

export default VibeCodingVsEngineeringBlog;
