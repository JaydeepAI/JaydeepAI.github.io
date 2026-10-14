import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Search,
  ArrowRightLeft,
  Hammer,
  MessageSquare,
  Boxes,
  NotebookPen,
  Rocket,
  Bug,
  Wrench,
  ChevronRight,
  CircleCheck,
  CircleX,
  Lightbulb,
  Github,
} from "lucide-react";

/**
 * Blog: From QA Engineer to AI Builder: What Transfers and What Doesn't
 * Slug: /blog/from-qa-engineer-to-ai-builder
 * Category: AI Builder
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

const QAToAIBuilderBlog = () => {
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
    title: "From QA Engineer to AI Builder: What Transfers and What Doesn't | Digital Jaydeep",
    description:
      "A tester's habits are a quiet advantage when you start building with AI. But some skills do not carry over, and pretending otherwise is how side projects stall. An honest framework for moving from QA engineer to tool user to AI builder.",
    keywords:
      "QA to AI builder, QA career, AI builder, building with AI, Claude Code, GitHub Copilot, test engineer career, AI side projects",
    canonicalUrl: "https://jaydeepai.github.io/blog/from-qa-engineer-to-ai-builder",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "From QA Engineer to AI Builder: What Transfers and What Doesn't",
      datePublished: "2026-10-19",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "starting-position", label: "Why QA Is a Good Starting Position" },
    { id: "what-transfers", label: "What Transfers" },
    { id: "what-does-not", label: "What Does Not" },
    { id: "tool-user", label: "The Tool-User Stage" },
    { id: "builder", label: "The Builder Stage" },
    { id: "habits", label: "Habits That Help" },
    { id: "start-this-month", label: "Where to Start This Month" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const transfers = [
    { skill: "Test-first thinking", note: "Deciding what \"working\" means before you build is exactly how you should scope an AI feature." },
    { skill: "Debugging", note: "Isolating a failure, narrowing inputs and reading logs works the same on a prompt pipeline as on a web app." },
    { skill: "Risk sense", note: "Knowing which failure would hurt most tells you where to spend your limited building time." },
    { skill: "Reproducibility", note: "Model output varies. The instinct to pin inputs, record versions and rerun is gold." },
    { skill: "Clear bug reports", note: "A good bug report and a good prompt share a shape: context, steps, expected, actual." },
  ];

  const fromScratch = [
    { skill: "Product judgment", note: "Testing asks whether a thing works. Building asks whether it is worth making at all." },
    { skill: "Choosing what to build", note: "Nobody hands you a requirement. The backlog is empty until you fill it." },
    { skill: "Distribution", note: "A tool nobody hears about does not exist. Testers rarely have to think about this." },
    { skill: "Deciding with incomplete information", note: "You will often have to commit before the evidence is complete." },
    { skill: "Tolerating \"good enough\"", note: "A release bar built for a mature product will stop a prototype from ever shipping." },
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Career
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            AI Builder
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          From QA Engineer to AI Builder: What Transfers and What Doesn't
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Not a victory lap. A field map for testers who want to build, drawn from the early part of the road.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 19, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Builder
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
                  className="flex items-center gap-3 text-white/70 hover:text-orange-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-orange-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Testers are trained to ask 'how does this break?' Builders who never learn that question ship fragile
          things."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-10">
          <p>
            There is a lot of content about "breaking into AI", and most of it is written from the far side of the
            journey, by people who already made it and now tell the story backwards. I am earlier than that. I work in
            QA automation, and I build with AI on the side and in my daily work. This is not a success story. It is an
            attempt to be precise about which parts of a tester's training help when you start building, and which
            parts you have to learn from zero.
          </p>
          <p>
            The honest answer is more interesting than "QA is a great background" or "testers are not builders". Some
            habits transfer almost perfectly and give you a real edge. Others do not transfer at all, and assuming they
            do is a reliable way to end up with a half-finished side project and a vague sense that building is not for
            you. It helps to see the move as three stages rather than one leap.
          </p>
        </div>

        {/* Signature visual: journey strip */}
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 mb-16">
          <p className="text-xs uppercase tracking-widest text-orange-300 font-semibold mb-5 text-center">The journey</p>
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <Bug className="w-6 h-6 text-orange-300 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Tester</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">Finds how things break. Judges others' work.</p>
            </div>
            <div className="flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-orange-400/70 rotate-90 md:rotate-0" />
            </div>
            <div className="flex-1 bg-white/5 border border-orange-500/25 rounded-xl p-5 text-center">
              <Wrench className="w-6 h-6 text-orange-300 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Tool user</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">Uses AI well. Knows when the output is wrong.</p>
            </div>
            <div className="flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-orange-400/70 rotate-90 md:rotate-0" />
            </div>
            <div className="flex-1 bg-orange-500/15 border border-orange-500/40 rounded-xl p-5 text-center">
              <Boxes className="w-6 h-6 text-orange-200 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Builder</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">Wraps a model in a workflow someone relies on.</p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section id="starting-position" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why QA Is a Good Starting Position</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Building with AI rewards a particular temperament, and it happens to be the one testers spend years
              developing. Language models are fluent, confident and frequently wrong. The people who get the most out
              of them are the people who do not trust fluent, confident things by default.
            </p>
            <p>
              <span className="text-white font-medium">A skeptical mindset.</span> A tester's first reaction to "it
              works" is "show me". That reaction is exactly what you need when a model hands you a clean-looking
              function, a confident summary or a plausible answer with a made-up detail in the middle.
            </p>
            <p>
              <span className="text-white font-medium">Edge-case thinking.</span> Empty input, very long input, the
              wrong language, the user who pastes a whole document where you expected a sentence. AI features fail at the
              edges in the same way any software does, and often more creatively. Testers go looking there by instinct.
            </p>
            <p>
              <span className="text-white font-medium">Reading specs critically.</span> Testers are used to reading a
              requirement and noticing what it does not say. When you build with AI, the "spec" is often your own prompt
              or plan, and the same skill tells you where the model will have to guess.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-orange-300 font-semibold">The quiet advantage: </span>
              many people building with AI are excellent at making things appear to work. Fewer are good at proving they
              do. That second skill is rarer, and testers already have it.
            </p>
          </div>
        </section>

        {/* Section 2 + 3: signature grid spans both */}
        <section id="what-transfers" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Transfers</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Some skills carry over so directly that it feels like cheating. The common thread is that they are all
              about evidence: knowing what you expect, observing what actually happens, and explaining the difference to
              someone else.
            </p>
            <p>
              Test-first thinking is the biggest one. Before you build anything with a model, you should be able to
              write down a handful of example inputs and what a good output looks like for each. Testers do this almost
              without thinking. Many first-time builders skip it entirely, then spend weeks tweaking prompts without
              any way to tell whether a change made things better or worse.
            </p>
            <p>
              Reproducibility is the second. Model output varies between runs, between versions and between small
              changes in wording. The tester's instinct to pin inputs, record exactly what changed and rerun before
              drawing conclusions is what keeps you from chasing ghosts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleCheck className="w-5 h-5 text-green-400" />
                <p className="text-sm uppercase tracking-wide text-green-300 font-semibold">Transfers directly</p>
              </div>
              <div className="space-y-4">
                {transfers.map((t) => (
                  <div key={t.skill}>
                    <p className="text-white text-sm font-medium">{t.skill}</p>
                    <p className="text-white/55 text-xs leading-relaxed mt-0.5">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleX className="w-5 h-5 text-orange-400" />
                <p className="text-sm uppercase tracking-wide text-orange-300 font-semibold">Needs building from scratch</p>
              </div>
              <div className="space-y-4">
                {fromScratch.map((t) => (
                  <div key={t.skill}>
                    <p className="text-white text-sm font-medium">{t.skill}</p>
                    <p className="text-white/55 text-xs leading-relaxed mt-0.5">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="what-does-not" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Does Not</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The right-hand column of that grid is where side projects stall, so it is worth slowing down on.
            </p>
            <p>
              <span className="text-white font-medium">Product judgment and choosing what to build.</span> As a tester,
              someone else decides what gets built. You judge whether it was built well. As a builder, the hardest
              question comes first: is this worth making? A tester's skepticism, pointed at your own ideas, can be useful
              here, but it can also kill every idea before it starts. Judgment means deciding to proceed despite the
              doubts, not only listing them.
            </p>
            <p>
              <span className="text-white font-medium">Distribution.</span> Testers almost never have to think about how
              people find out a thing exists. Builders have to think about it from the start, even if "distribution" just
              means "how will my three teammates hear about this script, and why would they try it".
            </p>
            <p>
              <span className="text-white font-medium">Deciding with incomplete information.</span> Testing trains you to
              want evidence before a verdict. Building often requires you to commit to an approach, a model, a data
              format, before you can know it is right, and to revisit later. That feels uncomfortable for people whose
              job is to withhold sign-off until they are sure.
            </p>
            <p>
              <span className="text-white font-medium">Tolerating "good enough".</span> This is the one I would underline.
              A tester's release bar is calibrated for software that real users depend on. Apply that bar to a first
              prototype and it will never ship. The skill to learn is not lowering your standards; it is matching the bar
              to the stage. A prototype needs to be good enough to learn from, not good enough to sign off.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="tool-user" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Tool-User Stage</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Before you build with AI, get genuinely good at using it. This stage is underrated because it does not
              produce anything you can show off, but it is where you learn how models behave, which is the foundation
              for everything after.
            </p>
            <p>
              My daily toolkit is unremarkable and that is the point: Claude for thinking through problems and drafting,
              Claude Code for working directly in a repository, GitHub Copilot inside the editor, and ChatGPT or Codex
              when I want a second opinion. The specific tools change. The skills they teach do not, and there are three
              of them.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                name: "Prompting",
                desc: "Giving context, constraints and an expected output format, the same way you would brief a new colleague. A prompt is a small spec.",
              },
              {
                name: "Reviewing",
                desc: "Reading every line the model produced as if a stranger wrote it. Running it. Checking it against what you actually asked for.",
              },
              {
                name: "Knowing when it is wrong",
                desc: "Spotting invented APIs, confident claims with no source, code that compiles but ignores a requirement, and answers that sound right because they are fluent.",
              },
            ].map((s) => (
              <div key={s.name} className="flex items-start gap-4 bg-blue-500/5 border border-blue-500/15 rounded-xl p-4">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 text-xs font-semibold shrink-0">
                  {s.name}
                </span>
                <p className="text-white/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            The third skill is where testers shine, and it is the one that separates people who are productive with AI
            from people who are just fast. A quick way to practice: for a week, before accepting any AI output, write
            down one specific way it could be wrong and check that one thing. It turns review from a vague feeling into a
            habit.
          </p>
        </section>

        {/* Section 5 */}
        <section id="builder" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Boxes className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Builder Stage</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Using a model and building with one are different jobs. When you use a model, you are the safety net: you
              read the output, you notice when it is wrong, you fix it. When you build, you wrap the model in a workflow
              that runs when you are not watching, often for someone else. Everything you used to catch by eye now has to
              be handled by design.
            </p>
            <p>
              That brings in concerns most testers have only seen from the outside.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-orange-500/25 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-500/10 text-orange-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Concern</th>
                  <th className="text-left px-5 py-3 font-semibold">The builder's question</th>
                  <th className="text-left px-5 py-3 font-semibold">Where QA instincts help</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-orange-300 font-medium">Handling failure</td>
                  <td className="px-5 py-3 text-white/70">What happens when the model returns nonsense, nothing or the wrong format?</td>
                  <td className="px-5 py-3 text-white/50">Negative testing, error paths, validation</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-orange-300 font-medium">Cost</td>
                  <td className="px-5 py-3 text-white/70">Usage-based pricing means cost grows with use. What does one run cost, and a busy day?</td>
                  <td className="px-5 py-3 text-white/50">Thinking about load and volume, not just one case</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-orange-300 font-medium">Data privacy</td>
                  <td className="px-5 py-3 text-white/70">What data leaves your machine, where does it go, and is that allowed?</td>
                  <td className="px-5 py-3 text-white/50">Treating test data and production data differently</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-orange-300 font-medium">Quality over time</td>
                  <td className="px-5 py-3 text-white/70">How will you know if a prompt or model change made results worse?</td>
                  <td className="px-5 py-3 text-white/50">Regression suites, baselines, evaluation sets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed">
            Look at the right-hand column. Every builder concern maps onto something testers already know how to think
            about. The difference is that you now own the answer, not just the question. That shift from "I found the
            problem" to "I designed it so the problem is handled" is the real move from QA to building.
          </p>
        </section>

        {/* Section 6 */}
        <section id="habits" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <NotebookPen className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Habits That Help</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            No single skill makes the transition. A few small habits, kept consistently, do most of the work.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Build small",
                desc: "Pick problems you can finish in an evening or a weekend. Unfinished projects teach you much less than finished small ones.",
              },
              {
                title: "Ship tiny",
                desc: "Put something in front of one real user, even if that user is you next week. Feedback starts only when something leaves your laptop.",
              },
              {
                title: "Write down decisions",
                desc: "Why this model, why this prompt structure, why this data format. Future you will want to know, and the act of writing forces clarity.",
              },
              {
                title: "Keep a learning log",
                desc: "A short note each time a model surprised you, good or bad. Over time it becomes your personal map of where these tools are reliable.",
              },
            ].map((h) => (
              <div key={h.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-purple-300 font-semibold text-sm mb-2">{h.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">
            <Lightbulb className="w-5 h-5 text-purple-300 mt-0.5 shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              The learning log is the most tester-like habit on this list, and it is the one I would keep if I could keep
              only one. It is a defect log for your own understanding.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="start-this-month" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where to Start This Month</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The most common mistake is starting with an app. An app means a UI, hosting, accounts, deployment, all
              before you know whether the core idea works. Start with a script instead.
            </p>
            <p>
              Pick one narrow, repeated annoyance from your own workday. Summarizing a nightly test report. Turning rough
              notes into a bug report draft. Grouping similar failure messages. Something you understand deeply, so you
              can tell immediately whether the output is good. Then build the smallest thing that removes it.
            </p>
          </div>

          <div className="relative border-l-2 border-orange-500/30 ml-3 space-y-6 mb-6">
            {[
              { week: "Week 1", text: "Pick the problem. Collect five to ten real examples and write what a good output would be for each. Remove any sensitive data." },
              { week: "Week 2", text: "Write a small script that calls a model on those examples. No UI. Compare outputs with what you wrote down." },
              { week: "Week 3", text: "Handle failure: bad output, empty output, errors. Add the cases that broke it to your examples." },
              { week: "Week 4", text: "Use it for real for a week. Note where it saved time and where you had to fix its work. Decide: continue, change or stop." },
            ].map((w) => (
              <div key={w.week} className="pl-6 relative">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-orange-400" />
                <p className="text-orange-300 text-xs font-semibold uppercase tracking-wide mb-1">{w.week}</p>
                <p className="text-white/70 text-sm leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            Notice that week one is a testing exercise. You are writing expected results before you write any code. That
            is not an accident. It is the clearest example of a QA habit that makes you a better builder from day one, and
            it is the step most people skip.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Moving from QA toward building with AI is not a career change so much as a change of position. You stop
              standing at the end of the line judging what others made, and start standing at the beginning making
              things others will judge. Many of your instincts come with you and give you a real edge. A few do not, and
              the honest move is to name them and practice them deliberately rather than hope they appear.
            </p>
            <p>
              Learn to use the tools well before you build with them. Build small, from your own pain, as a script before
              an app. Match your quality bar to the stage. And keep asking the question that made you a good tester in the
              first place, because most of the fragile things being built right now were made by people who never asked
              it.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-orange-200 text-lg font-semibold">
              You do not leave testing behind. You carry it into everything you build.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">A tester starting to build with AI?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's compare notes on turning QA instincts into small, reliable AI tools.
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

export default QAToAIBuilderBlog;
