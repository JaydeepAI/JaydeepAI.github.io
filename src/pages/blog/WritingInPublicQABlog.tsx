import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  PenLine,
  Sprout,
  ListOrdered,
  Fingerprint,
  WandSparkles,
  Lock,
  CalendarDays,
  CircleCheck,
  CircleX,
  Github,
} from "lucide-react";

/**
 * Blog: Writing in Public as a QA Engineer: Why a Small Blog Compounds
 * Slug: /blog/writing-in-public-as-a-qa-engineer
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

const WritingInPublicQABlog = () => {
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
    title: "Writing in Public as a QA Engineer: Why a Small Blog Compounds | Digital Jaydeep",
    description:
      "Publishing what you learn builds clarity, credibility and opportunity over time. A practical guide for QA engineers: what to write, how to stay original in an AI-flooded feed, how to use AI as an editor and how to keep a sustainable writing habit.",
    keywords:
      "writing in public, QA engineer blog, career, personal brand, technical writing, AI editing, learning in public, writing habit",
    canonicalUrl: "https://jaydeepai.github.io/blog/writing-in-public-as-a-qa-engineer",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Writing in Public as a QA Engineer: Why a Small Blog Compounds",
      datePublished: "2026-11-22",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-write", label: "Why Write at All" },
    { id: "not-an-expert", label: "You Don't Need to Be an Expert" },
    { id: "what-to-write", label: "What to Write About" },
    { id: "standing-out", label: "Standing Out When AI Can Write Anything" },
    { id: "ai-as-editor", label: "Use AI as an Editor, Not a Ghostwriter" },
    { id: "confidentiality", label: "Protect Confidentiality" },
    { id: "habit", label: "Build a Sustainable Habit" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const ladder = [
    {
      tier: "Original framework",
      level: "Tier 4",
      desc: "A model, checklist or way of deciding that you built from repeated experience. Hardest to write, hardest to copy.",
      example: "Example: a set of questions you now ask before automating any test, and why each one exists.",
      width: "md:w-full",
      tone: "bg-indigo-500/25 border-indigo-400/50",
    },
    {
      tier: "Opinion with reasoning",
      level: "Tier 3",
      desc: "A position on a debate in your field, argued with reasons and trade-offs instead of slogans.",
      example: "Example: why you think retries in a test framework do more harm than good, and when you would still use them.",
      width: "md:w-11/12",
      tone: "bg-indigo-500/20 border-indigo-400/40",
    },
    {
      tier: "Explained simply",
      level: "Tier 2",
      desc: "A concept you understand well enough to teach to someone a step behind you.",
      example: "Example: explicit waits explained with one diagram and one short code sample.",
      width: "md:w-10/12",
      tone: "bg-indigo-500/15 border-indigo-400/30",
    },
    {
      tier: "Learned today",
      level: "Tier 1",
      desc: "A short note about something you just figured out, including what confused you on the way.",
      example: "Example: the error message that cost you an hour, and what it actually meant.",
      width: "md:w-9/12",
      tone: "bg-indigo-500/10 border-indigo-400/20",
    },
  ];

  const routine = [
    { day: "Mon", task: "Capture", detail: "Skim your notes from last week and pick one idea worth a post." },
    { day: "Tue", task: "Outline", detail: "Write the point in one sentence, then three to five headings." },
    { day: "Wed", task: "Draft", detail: "Write badly and quickly. Finish the whole thing before polishing." },
    { day: "Thu", task: "Edit", detail: "Cut, tighten, check facts and run a confidentiality pass." },
    { day: "Fri", task: "Publish", detail: "Ship it. Share it once where your peers read." },
    { day: "Weekend", task: "Rest or revisit", detail: "Optionally improve an older post with what you've learned since." },
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            AI Builder Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Writing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Career
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Writing in Public as a QA Engineer: Why a Small Blog Compounds
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          You test other people's thinking all day. Publishing your own is the fastest way to find out where it has
          gaps.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 22, 2026
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
          "Writing is thinking you can reread."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Most QA engineers write a lot. Bug reports, test plans, review comments, release notes, long messages
            explaining why something should not ship yet. Almost none of it is public, and almost none of it is about
            what we have learned. It disappears into trackers and chat threads, useful for a week and then forgotten.
          </p>
          <p>
            Writing in public is a small change with an outsized effect over time. You take some of what you learn and
            publish it where anyone can read it: a personal blog, a newsletter, a long post on a professional network.
            It does not need to be big or frequent to be worthwhile. This article is about why that habit compounds,
            what to write about, how to stay original when AI can produce endless generic content, and how to keep
            going without burning out. It is advice, not a success story; the value I describe comes from the process
            itself, not from any particular audience size.
          </p>
        </div>

        {/* Section 1 */}
        <section id="why-write" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <PenLine className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Write at All</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              There are three reasons, and none of them depend on anyone reading your posts. Readers are a bonus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-indigo-200 font-semibold text-sm mb-2">Clarity</p>
              <p className="text-white/60 text-sm leading-relaxed">
                You do not really know whether you understand something until you try to explain it in order, in full
                sentences, to someone who was not there.
              </p>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-indigo-200 font-semibold text-sm mb-2">A record of learning</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Months later, your own posts become a searchable memory of how you solved problems and how your
                thinking changed.
              </p>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-indigo-200 font-semibold text-sm mb-2">A portfolio of thinking</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A CV lists what you did. A body of writing shows how you reason, which is what colleagues and future
                employers actually want to know.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The clarity point is the one testers tend to underestimate. We are good at finding gaps in other people's
              specifications. Writing a post turns that skill on your own ideas. The moment you try to explain why a
              particular wait strategy is better, you discover the case you had not considered, the term you were
              using loosely, the step you skipped because it felt obvious. That is the same feeling as finding a bug,
              and it is just as valuable.
            </p>
            <p>
              The portfolio point matters more every year. QA work is often invisible when it goes well. Nothing broke,
              so nobody asks why. A public body of writing makes that invisible judgment visible. Someone who reads a
              handful of your posts learns how you think about risk, how you explain trade-offs and whether you are
              honest about what you do not know. That is hard to communicate in an interview and easy to show in
              writing.
            </p>
            <p>
              Why does it compound? Because each post makes the next one easier. You build a vocabulary, a set of
              examples and a clearer sense of your own opinions. Old posts become references you link from new ones.
              The effort per post goes down while the value of the whole collection goes up.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="not-an-expert" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">You Don't Need to Be an Expert</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The most common reason people never start is the feeling that they have nothing to add. Someone more
              senior has already written about it. Someone smarter would spot every mistake. Why publish what you just
              learned when experts exist?
            </p>
            <p>
              Because the person who just learned something is often the best teacher for the next person learning it.
              Experts forget what was hard. They skip steps that are no longer steps for them. You, on the other hand,
              still remember exactly which error message confused you, which documentation page was misleading and
              which explanation finally made it click. That memory is valuable and it fades fast. Write it down while
              you still have it.
            </p>
            <p>
              The key is honesty about where you are. Frame posts as what they are: "what I learned setting up my first
              API test suite", not "the definitive guide to API testing". Say what you are unsure about. Link to the
              official documentation and better resources. Readers trust a clearly labelled learning note far more than
              an overconfident tutorial, and if you get something wrong, a kind correction from a reader becomes part of
              your learning too.
            </p>
            <p>
              It also helps to remember who you are writing for. Not the senior architect who already knows the
              answer, but the version of you from six months ago, or a colleague who joined last week. Write for that
              person and the fear of being "not expert enough" mostly disappears, because you clearly know more than
              they do about the thing you just worked through. Where to publish matters much less than people think.
              Pick a place that is easy for you to keep using and that you control well enough to edit and update old
              posts; you can always move later.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-green-300 font-semibold">A useful framing: </span>
              you are not claiming to be the expert. You are documenting the path from not knowing to knowing, in public,
              so the next person on that path has a map.
            </p>
          </div>
        </section>

        {/* Section 3 — Ladder */}
        <section id="what-to-write" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Write About</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Ideas are rarely the real problem once you start paying attention. A helpful way to think about them is
              as a ladder. Each rung needs a little more experience and produces a post that is a little harder for
              anyone, or anything, to replicate. You do not have to climb in order, but most people start at the bottom.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mb-8">
            {ladder.map((l) => (
              <div key={l.tier} className={"w-full border rounded-2xl p-5 " + l.width + " " + l.tone}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <p className="text-white font-semibold">{l.tier}</p>
                  <span className="text-indigo-200/70 text-xs uppercase tracking-widest font-semibold">{l.level}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-2">{l.desc}</p>
                <p className="text-white/45 text-xs italic">{l.example}</p>
              </div>
            ))}
            <p className="text-white/40 text-xs text-center mt-2">
              Climb as your experience grows. Every tier is worth publishing.
            </p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Your daily work is the richest source of ideas, as long as you write about the lesson rather than the
              situation. A tricky flaky test becomes a post about a category of flakiness. A heated review discussion
              becomes a post about how you weigh readability against reuse. A tool you evaluated becomes a post about
              how you evaluated it, without naming internal systems or sharing results that belong to your employer.
            </p>
            <p>
              Other good sources: tools you tried on your own time, including what did not work; mistakes you made and
              what you changed afterwards; questions colleagues keep asking you, which signal a gap that a clear post
              could fill; and frameworks you have built for yourself, such as the checklist you run before approving a
              test pull request. Keep a running list of ideas in whatever note-taking tool you use. When it is time to
              write, you pick from the list instead of staring at a blank page.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="standing-out" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Standing Out When AI Can Write Anything</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Here is the uncomfortable truth: a generic article about "ten tips for better test automation" can now be
              produced in seconds by anyone with an AI assistant. The feeds are full of them. If your writing could have
              been generated from the title alone, it adds little, and readers can increasingly tell.
            </p>
            <p>
              The good news is that the things AI cannot supply on your behalf are exactly the things that make writing
              worth reading.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CircleX className="w-4 h-4 text-red-400" />
                <p className="text-red-200 font-semibold text-sm">Easy to generate, easy to ignore</p>
              </div>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Generic listicles with no point of view</li>
                <li>Definitions anyone could look up</li>
                <li>Balanced summaries that never take a side</li>
                <li>Confident claims with no experience behind them</li>
              </ul>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CircleCheck className="w-4 h-4 text-indigo-300" />
                <p className="text-indigo-200 font-semibold text-sm">Hard to fake, worth reading</p>
              </div>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Specific situations and the details that mattered</li>
                <li>Genuine opinions with the reasoning shown</li>
                <li>Real experience, including what went wrong</li>
                <li>Honest limits: what you don't know yet</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              <span className="text-white font-medium">Specificity</span> is the strongest signal. "Waits are important"
              is generic. A description of the exact pattern of failure you saw, the three things you tried and why the
              third worked is yours alone. <span className="text-white font-medium">Opinions</span> are next. Take a
              position and defend it; readers can disagree with a clear argument, but they cannot learn anything from a
              shrug. <span className="text-white font-medium">Honest limits</span> complete the picture. Saying "I have
              only tried this on small suites" makes the rest of your post more credible, not less.
            </p>
            <p>
              A good test before publishing: could someone with an AI assistant and no experience of the topic have
              written this post from its title? If the answer is yes, add the part only you could write.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="ai-as-editor" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <WandSparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Use AI as an Editor, Not a Ghostwriter</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              None of this means avoiding AI. It means putting it in the right role. As an editor, an assistant is
              excellent. As a ghostwriter, it quietly removes the very things that make your writing worth reading.
            </p>
            <p>
              Good editorial uses include helping you turn a messy brain dump into an outline, suggesting where an
              argument jumps a step, tightening long sentences, catching spelling and grammar mistakes, proposing
              clearer headings and pointing out where a non-specialist reader might get lost. You can also ask it to
              argue against your main point, which is a quick way to find the objection you should address.
            </p>
            <p>
              The line I would hold is that the ideas, the examples and the voice stay yours. If you ask an assistant to
              "write a post about flaky tests", you get the average of what has been written before, which is precisely
              the generic content you are trying to rise above. If you write a rough draft and ask it to "point out where
              this is unclear and suggest cuts", you keep everything that makes the post yours while still getting the
              benefit of a second reader.
            </p>
            <p>
              Two more rules. First, verify everything an assistant adds or changes. It can introduce a claim, a term or
              a detail you never intended, and your name is on the post. Second, read the edited version aloud. If it no
              longer sounds like you, roll back some of the polish. A slightly rough post in your own voice is better
              than a smooth one in nobody's.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="confidentiality" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Protect Confidentiality</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Writing about your work is valuable. Writing about your employer's work is risky. The difference matters,
              and it is your responsibility to get it right before you press publish.
            </p>
            <p>
              Never publish internal system names, architecture details, unreleased features, customer names or data,
              screenshots of internal tools, defect details that reveal weaknesses, internal metrics or anything covered
              by a confidentiality agreement or your employment contract. If you are not sure whether something is
              confidential, treat it as confidential. Many organizations have a policy on public writing and social
              media; read it, and ask if anything is unclear.
            </p>
            <p>
              The practical technique is abstraction. Strip the specific context and keep the transferable lesson.
              Instead of describing the exact system where a race condition appeared, describe the pattern: two
              processes updating the same record, a test that assumed an order, a fix that made the order explicit.
              Use made-up examples and generic code. Readers lose nothing, because the lesson was always the useful
              part.
            </p>
          </div>

          <div className="border border-red-500/30 bg-red-500/10 rounded-2xl p-6">
            <p className="text-red-200 font-semibold mb-2">Before you publish, ask</p>
            <ul className="space-y-1.5 text-white/70 text-sm">
              <li>Could a colleague identify the system, customer or project from this post?</li>
              <li>Does any screenshot, log or code sample come from real internal material?</li>
              <li>Would I be comfortable if my manager and my employer's legal team read it?</li>
            </ul>
          </div>
        </section>

        {/* Section 7 — Routine timeline */}
        <section id="habit" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Build a Sustainable Habit</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The posts that compound are the ones that keep coming. That means designing a habit you can sustain in an
              ordinary week, not an ambitious plan that collapses the first time work gets busy. Small, regular and public
              beats large, rare and perfect.
            </p>
            <p>
              Here is a simple weekly routine that spreads the work into short sessions. Each step is small enough to fit
              into a lunch break or the end of a day.
            </p>
          </div>

          <div className="relative mb-8">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-indigo-500/30" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {routine.map((r) => (
                <div key={r.day} className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-200 text-xs font-semibold mb-3 relative">
                    {r.day === "Weekend" ? "Wknd" : r.day}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{r.task}</p>
                  <p className="text-white/55 text-xs leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Adapt the rhythm to your life. If weekly is too much, make it fortnightly; what matters is that it is
              regular enough to become automatic. Lower the bar for what counts as a post. A short, useful note on a
              single idea is a perfectly good entry, and it keeps the habit alive during busy weeks.
            </p>
            <p>
              Do not neglect old posts. Revisiting them is one of the most underrated parts of writing in public. When
              you learn something that changes your view, update the post and say what changed. When a short note grows
              into a bigger idea, write a follow-up and link the two. Your blog becomes a living record rather than a
              pile of snapshots, and readers who arrive at an old post get your current thinking.
            </p>
            <p>
              Finally, measure the right thing. Do not judge the habit by views or reactions, which you cannot control
              and which say little about quality. Judge it by whether you kept writing and whether your thinking got
              sharper. Those are fully in your hands, and they are the parts that compound.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Writing in public is one of the cheapest, slowest and most reliable investments a QA engineer can make. It
              sharpens your thinking, leaves a record of your learning and shows the world how you reason, which is
              exactly the part of our work that usually stays invisible. You do not need expertise to start, only
              honesty about where you are.
            </p>
            <p>
              Start at the bottom of the ladder with what you learned this week. Keep it specific, keep your opinions in
              it, and keep your employer's details out of it. Let AI tighten your sentences, not replace your ideas.
              Then do it again next week.
            </p>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-indigo-200 text-lg font-semibold">
              One honest post a week beats one perfect post a year.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Thinking about starting your own blog?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about finding your first topics, building a routine and writing in a voice that is clearly yours.
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

export default WritingInPublicQABlog;
