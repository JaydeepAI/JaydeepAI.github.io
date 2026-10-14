import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Shuffle,
  Timer,
  NotebookPen,
  Lightbulb,
  Sparkles,
  HeartPulse,
  PackageCheck,
  Bug,
  CircleHelp,
  ArrowRight,
} from "lucide-react";

/**
 * Blog: Exploratory Testing in the AI Era: Curiosity Is the Part That Can't Be Automated
 * Slug: /blog/exploratory-testing-in-the-ai-era
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

const ExploratoryTestingAIEraBlog = () => {
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
    title: "Exploratory Testing in the AI Era: Curiosity Is the Part That Can't Be Automated | Digital Jaydeep",
    description:
      "Automation checks what you already know. Exploratory testing finds what you didn't think to check. A practical guide to session-based exploratory testing, writing good charters, using test heuristics, and where AI can feed your curiosity without replacing it.",
    keywords:
      "exploratory testing, session-based testing, test charters, test heuristics, AI in testing, test design, QA skills, manual testing",
    canonicalUrl: "https://jaydeepai.github.io/blog/exploratory-testing-in-the-ai-era",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Exploratory Testing in the AI Era: Curiosity Is the Part That Can't Be Automated",
      datePublished: "2026-11-12",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "random-clicking", label: "The Myth of \"Random Clicking\"" },
    { id: "sessions", label: "Session-Based Testing" },
    { id: "charter", label: "Write a Good Charter" },
    { id: "heuristics", label: "Heuristics That Spark Ideas" },
    { id: "ai-helps", label: "Where AI Helps" },
    { id: "ai-cant", label: "Where It Can't" },
    { id: "assets", label: "Turn Discoveries Into Assets" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const heuristics = [
    {
      name: "Boundaries",
      prompt: "What are the limits? Go to them, just past them and just under them.",
      example: "Maximum lengths, quantities, dates at month and year edges, empty lists, a single item.",
    },
    {
      name: "Interruptions",
      prompt: "What happens if the flow is broken halfway?",
      example: "Back button, refresh mid-submit, closing the tab, losing the network, the session expiring.",
    },
    {
      name: "Permissions",
      prompt: "Who is allowed to do this, and what about everyone else?",
      example: "Different roles, a user removed from a team mid-task, a shared link opened by someone else.",
    },
    {
      name: "Data",
      prompt: "What kinds of data has this never seen?",
      example: "Long names, accents and non-Latin scripts, emoji, leading spaces, pasted formatting, zero and negatives.",
    },
    {
      name: "Time",
      prompt: "Does anything depend on when it happens?",
      example: "Time zones, daylight saving changes, end of month, slow actions, things left open overnight.",
    },
    {
      name: "Concurrency",
      prompt: "What if two things happen at once?",
      example: "Two tabs editing the same record, double-clicking submit, two users approving the same item.",
    },
    {
      name: "Recovery",
      prompt: "When it fails, how does it come back?",
      example: "Error messages, retry behavior, partially saved work, what the user sees after a crash.",
    },
    {
      name: "Consistency",
      prompt: "Does it behave like the rest of the product and like its own documentation?",
      example: "Same action, different screens; help text versus behavior; mobile versus desktop.",
    },
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
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Exploratory Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Charters
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Exploratory Testing in the AI Era: Curiosity Is the Part That Can't Be Automated
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The more of our checking we hand to machines, the more our value lives in the questions nobody wrote down.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 12, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
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
          "Scripts verify what you expect. Exploration discovers what you didn't know to expect."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            I spend most of my working life on test automation, so this may sound strange coming from me: automation is
            not where most of the interesting bugs are found. Automated checks are superb at confirming that things we
            already understand still work. They are, by design, blind to everything we didn't think to encode. The bugs
            that surprise a team, the ones that make people say "how did nobody notice that?", usually live in the space
            between the scripts.
          </p>
          <p>
            Exploratory testing is how you search that space on purpose. And now that AI can write test code, generate
            test cases and summarize results, I think exploration becomes more valuable, not less. The mechanical parts of
            testing are getting cheaper. The part that depends on curiosity, judgment and noticing is not. This article
            is a defense of exploratory testing as a skilled, structured practice, and a practical look at where AI can
            sharpen it and where it simply cannot follow.
          </p>
        </div>

        {/* Section 1 */}
        <section id="random-clicking" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Myth of "Random Clicking"</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Exploratory testing has an image problem. To people who haven't done it well, it looks like a tester
              wandering around an application clicking whatever catches their eye. Unplanned, unrepeatable, impossible to
              measure. If that were true, it would deserve to be automated away.
            </p>
            <p>
              It isn't true. Good exploratory testing is learning, test design and test execution happening at the same
              time, each feeding the others. You try something, observe the result, form a theory about how the system
              works, design the next test to challenge that theory, and run it immediately. A scripted test separates
              those activities across days or weeks. Exploration compresses them into minutes, which is exactly why it can
              follow a lead that no script anticipated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">What people imagine</p>
              <ul className="space-y-2 text-sm text-white/55">
                <li>No plan, no goal</li>
                <li>Whatever the tester feels like today</li>
                <li>Nothing written down</li>
                <li>Can't say what was covered</li>
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
              <p className="text-orange-300 text-xs uppercase tracking-widest font-semibold mb-3">What it actually is</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>A mission and a time box</li>
                <li>Deliberate use of heuristics and risk</li>
                <li>Notes taken as you go</li>
                <li>A debrief that says what was learned and what's still open</li>
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            The freedom in exploration is freedom of method, not freedom from discipline. The tester decides the next
            step based on what they just saw, but they are always working toward a stated mission and they are always
            accountable for what they report.
          </p>
        </section>

        {/* Section 2 */}
        <section id="sessions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Timer className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Session-Based Testing</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The most practical structure I know for exploration is session-based testing. The idea is simple: work in
              uninterrupted, time-boxed sessions, each with a mission written down beforehand, notes taken during, and a
              short debrief afterward. It gives exploration enough shape to be planned, tracked and discussed, without
              turning it into a script.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-orange-500/20 mb-6 text-sm">
            <div className="sm:w-[15%] bg-orange-500/20 p-4">
              <p className="text-orange-200 font-semibold">Set up</p>
              <p className="text-white/55 text-xs mt-1">Charter, data, environment</p>
            </div>
            <div className="sm:w-[65%] bg-orange-500/10 p-4">
              <p className="text-orange-200 font-semibold">Explore</p>
              <p className="text-white/55 text-xs mt-1">
                Test, observe, take notes, follow leads within the mission. Park anything off-mission as a question for
                later.
              </p>
            </div>
            <div className="sm:w-[20%] bg-amber-500/15 p-4">
              <p className="text-amber-200 font-semibold">Debrief</p>
              <p className="text-white/55 text-xs mt-1">Bugs, questions, coverage, next charters</p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The time box matters more than its exact length. A session long enough to get deep into an area, but short
              enough to stay focused, is the sweet spot; I would start with something around an hour or two and adjust. Protect
              it from interruptions. A session broken into fragments by meetings and messages loses the thread of
              learning that makes exploration effective.
            </p>
            <p>
              The debrief is the part most teams skip, and it is where the value gets captured. Five or ten minutes with
              a lead or a colleague: what did you cover, what did you find, what worried you, what didn't you get to? It
              turns a private experience into shared knowledge. It is also the natural point to decide what happens next:
              another session on the same area, a different charter, or "this is good enough, move on".
            </p>
            <p>
              Sessions also make exploration visible to people who think in plans and reports. "We ran six sessions on the
              new billing flow, found three bugs and have two open questions for the product owner" is a sentence a
              manager can work with. "I had a look around" is not.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="charter" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <NotebookPen className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Write a Good Charter</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A charter is the mission for a session. It is short, usually a sentence or two, and it does a specific
              job: it points your attention at an area and a kind of risk while leaving you free to decide how to
              investigate. A common template is "Explore <span className="text-white/90">target</span> with{" "}
              <span className="text-white/90">resources</span> to discover <span className="text-white/90">information</span>".
            </p>
            <p>
              Good charters sit in a narrow band. Too vague ("test the checkout") and the session has no focus. Too
              specific ("verify that a discount code of exactly ten characters is accepted") and it has become a scripted
              test case. A good charter is specific about where to look and what you're worried about, and open about
              what you might find.
            </p>
          </div>

          {/* Signature visual: charter card */}
          <div className="rounded-2xl border-2 border-orange-500/30 bg-[#0d0a14] overflow-hidden mb-6">
            <div className="bg-orange-500/15 border-b border-orange-500/30 px-6 py-3 flex items-center justify-between">
              <p className="text-orange-200 font-semibold text-sm uppercase tracking-widest">Session Charter</p>
              <p className="text-white/40 text-xs font-mono">example</p>
            </div>
            <div className="divide-y divide-white/10">
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5">Mission</p>
                <p className="text-white/85 text-sm leading-relaxed">
                  Explore saving a shopping cart across devices with a signed-in user, to discover how cart contents,
                  prices and stock behave when the same cart is changed in two places.
                </p>
              </div>
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5">Area</p>
                <p className="text-white/70 text-sm">Cart, sign-in, product availability. Test environment, seeded catalogue.</p>
              </div>
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5">Time box</p>
                <p className="text-white/70 text-sm">One uninterrupted session</p>
              </div>
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5">Notes</p>
                <div className="space-y-1.5">
                  {[
                    "Desktop + phone browser, same account",
                    "Added item on phone, desktop updated only after refresh",
                    "Removed item on desktop while phone was on checkout page...",
                  ].map((n) => (
                    <div key={n} className="border-b border-dashed border-white/15 text-white/60 text-sm font-mono pb-1">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5 flex items-center gap-1.5">
                  <Bug className="w-3.5 h-3.5" /> Bugs
                </p>
                <p className="text-white/70 text-sm">Checkout allowed purchase of an item removed from the cart on another device</p>
              </div>
              <div className="grid sm:grid-cols-[140px_1fr] gap-2 px-6 py-4">
                <p className="text-orange-300/80 text-xs uppercase tracking-wide font-semibold pt-0.5 flex items-center gap-1.5">
                  <CircleHelp className="w-3.5 h-3.5" /> Questions
                </p>
                <p className="text-white/70 text-sm">
                  Should the cart sync live or on refresh? What should happen to the price if it changes while the item sits
                  in a cart?
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice what the example does. The mission names a risk, two devices changing one cart, without dictating
              steps. The notes are rough and fast, written for the debrief, not for publication. And the session produces
              two kinds of output: a bug, and questions that nobody had asked yet. In my experience the questions are
              often as valuable as the bugs, because they expose gaps in the requirements before they become defects.
            </p>
            <p>
              Write charters before the session, ideally as a small backlog for a feature. They can come from risks,
              from recent changes, from support tickets, from a gut feeling about a fragile area. Prioritize them the
              same way you would prioritize any testing work: by what a failure would cost.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="heuristics" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Heuristics That Spark Ideas</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Halfway through a session, even experienced testers run out of ideas. That's where heuristics help. A
              heuristic is a rule of thumb: a short prompt that points your attention at a kind of thing that tends to go
              wrong. It doesn't tell you what to test. It reminds you of a dimension you haven't pushed on yet.
            </p>
            <p>
              Here is the cheat-sheet I keep next to me during sessions. Each card is a question to ask the system, with
              a few examples to get started.
            </p>
          </div>

          {/* Signature visual: heuristic cheat-sheet grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {heuristics.map((h) => (
              <div key={h.name} className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex flex-col">
                <p className="text-orange-300 font-bold text-sm mb-2">{h.name}</p>
                <p className="text-white/80 text-sm leading-snug mb-3">{h.prompt}</p>
                <p className="text-white/45 text-xs leading-relaxed mt-auto">{h.example}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              How to use them: when a line of inquiry dries up, pick a card you haven't used in this session and apply it
              to whatever is in front of you. On a form, "Interruptions" leads you to refresh mid-submit. On a report,
              "Time" leads you to time zones and month boundaries. On an approval flow, "Concurrency" leads you to two
              approvers clicking at once. The heuristic does not find the bug. It moves you to the place where you might.
            </p>
            <p>
              Heuristics are also a good debrief tool. Asking "which of these did we not touch?" is a quick, honest way to
              describe the limits of a session's coverage. Over time, add your own cards for the risks specific to your
              product: the integrations that always surprise you, the domain rules that are easy to get wrong.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="ai-helps" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where AI Helps</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              AI fits naturally around exploratory sessions: before, to widen the set of ideas, and after, to tidy up what
              you found. In both places it works as a fast, tireless brainstorming partner. Four uses stand out for me.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                t: "Generating charter ideas",
                d: "Give it a feature description or a user story and ask for possible charters, grouped by risk. Most will be obvious. A few will point at an angle you hadn't considered. You choose which ones are worth a session.",
              },
              {
                t: "Listing risks from a feature description",
                d: "Ask what could go wrong, for whom, and under which conditions. It's a fast way to stress-test your own risk list and to catch categories you overlooked, especially in domains you know less well.",
              },
              {
                t: "Suggesting data variations",
                d: "Names in different scripts, tricky addresses, unusual but valid formats, edge values for a given field. AI is good at producing long, varied lists you can pick from during a session.",
              },
              {
                t: "Summarizing notes after a session",
                d: "Turn rough, fast notes into a clean debrief summary and draft bug reports from them. Check every statement against what you actually observed; it must never add a step or result you didn't record.",
              },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 bg-sky-500/5 border border-sky-500/15 rounded-xl p-4">
                <Sparkles className="w-5 h-5 text-sky-300 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/90 font-semibold text-sm mb-1">{c.t}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Notice the pattern: AI expands the options, and the tester selects. That is the right division of labor.
              A model can list fifty risks; it cannot tell you which three this team, this release and these users should
              worry about most. Keep the feature description you share free of confidential details, too. Ideas for
              charters rarely need customer data or internal system names to be useful.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="ai-cant" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where It Can't</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The heart of exploration happens in the session itself, and that is the part AI cannot do for you. Not
              because models are unintelligent, but because exploration depends on things that come from being a person
              using the product in real time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                t: "Noticing that something feels wrong",
                d: "A page that loads a little slower than usual. A label that is technically correct but would confuse a first-time user. A number that is plausible but doesn't quite match what you saw a minute ago. These are not assertion failures. They are unease, and unease is where bugs hide.",
              },
              {
                t: "Following a hunch",
                d: "Exploration is full of moments where you think 'I wonder what happens if...' for reasons you couldn't fully explain. Those hunches come from experience with this product, this team's habits, the last three incidents. That context lives in you.",
              },
              {
                t: "Understanding frustration",
                d: "Software can work exactly as specified and still be maddening to use. Feeling the friction of a flow, the extra click, the lost input, the confusing error, is a human experience. You can describe it to a model afterward; you can't delegate feeling it.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-rose-500/5 border border-rose-500/15 rounded-2xl p-5">
                <p className="text-rose-200 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              There's a subtler risk too. If every charter, every data set and every risk list comes from the same AI
              suggestions, your exploration slowly converges on what the model finds obvious. Everyone tests the same
              things in the same way. Exploration is valuable precisely because it brings a different perspective from
              the one that built the software. Use AI to widen your options, but keep some sessions where you start from
              nothing but the product and your own curiosity.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="assets" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Turn Discoveries Into Assets</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Exploration is not finished when the session ends. Its findings should leave a mark on the rest of your
              testing, otherwise you'll rediscover the same things next quarter. Every discovery should end up in one of
              three places.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                from: "A bug",
                to: "A clear bug report",
                d: "With exact steps, the data used, evidence and the impact you observed. Written while it is fresh, from your session notes.",
              },
              {
                from: "A stable, important finding",
                to: "A new automated check",
                d: "If the behavior you explored matters and won't change often, encode it. Exploration finds the question; automation keeps asking it on every build.",
              },
              {
                from: "An open question",
                to: "A new charter or a conversation",
                d: "Something you ran out of time for, or a requirement nobody can answer. Put it in the charter backlog or take it to the product owner.",
              },
            ].map((r) => (
              <div key={r.from} className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/80 text-sm font-semibold">{r.from}</p>
                <ArrowRight className="hidden md:block w-4 h-4 text-orange-300" />
                <div>
                  <p className="text-orange-300 text-sm font-semibold">{r.to}</p>
                  <p className="text-white/55 text-xs leading-relaxed mt-1">{r.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              This is where exploration and automation stop being rivals. Exploration is how you find out what is worth
              automating; automation is how you free up time for more exploration. A healthy team runs that loop
              continuously. The automated suite grows from discoveries, and the exploratory backlog grows from the
              questions automation can't answer.
            </p>
            <p>
              One practical habit makes this stick: end every debrief by deciding, explicitly, what happens to each item
              in the notes. File it, automate it, schedule it or drop it. Notes that are never sorted become a private
              diary of things the team almost learned. Sorted notes become the next sprint's test plan.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              The more testing work gets automated, and AI is accelerating that, the more a tester's distinctive value
              shifts toward the work that can't be written down in advance. Exploratory testing is that work. It is not
              random, not unstructured and not old-fashioned. It is the skill of learning a system quickly enough to find
              what nobody expected.
            </p>
            <p>
              Give it structure with sessions and charters. Feed it with heuristics and, yes, with AI-generated ideas.
              Capture its results as bugs, checks and new questions. And protect the human core of it: the noticing, the
              hunches, the feeling of friction. That part is yours.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
            <p className="text-orange-200 text-lg font-semibold">
              Automate the answers you have. Explore for the questions you don't.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Want exploration your team can plan and report on?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about charters, sessions and how to balance curiosity-driven testing with your automation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default ExploratoryTestingAIEraBlog;
