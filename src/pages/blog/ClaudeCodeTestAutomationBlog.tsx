import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Compass,
  ClipboardList,
  ThumbsUp,
  ThumbsDown,
  Eye,
  GitBranch,
  RotateCcw,
  Sun,
  Coffee,
  Sunset,
  Moon,
  Terminal,
} from "lucide-react";

/**
 * Blog: Claude Code for Test Automation: A Day-to-Day Workflow
 * Slug: /blog/claude-code-for-test-automation-daily-workflow
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

const ClaudeCodeTestAutomationBlog = () => {
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
    title: "Claude Code for Test Automation: A Day-to-Day Workflow | Digital Jaydeep",
    description:
      "Where an AI coding agent fits into a normal test automation day: exploring a repo, planning before editing, writing page objects, debugging failures, and reviewing every diff yourself before you commit. Practical habits for QA engineers.",
    keywords:
      "Claude Code, AI coding agent, test automation workflow, page object model, Selenium, code review, QA engineer productivity",
    canonicalUrl: "https://jaydeepai.github.io/blog/claude-code-for-test-automation-daily-workflow",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Claude Code for Test Automation: A Day-to-Day Workflow",
      datePublished: "2026-10-25",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "explore-first", label: "Start by Exploring" },
    { id: "plan-first", label: "Plan First, Then Edit" },
    { id: "good-tasks", label: "Good Tasks" },
    { id: "bad-tasks", label: "Bad Tasks" },
    { id: "review-diff", label: "Review Its Diff Like a Colleague's" },
    { id: "git-control", label: "Keep Humans in Control of Git" },
    { id: "confidently-wrong", label: "When It Is Confidently Wrong" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const timeline = [
    {
      time: "Morning",
      title: "Triage",
      icon: Coffee,
      desc: "Overnight run has failures. Ask the agent to read the failing test, the page object it uses and the error, then explain what the test was trying to prove and list likely causes. You decide which one to chase.",
    },
    {
      time: "Mid-day",
      title: "Build",
      icon: Sun,
      desc: "A new screen needs coverage. Describe the screen, point to an existing page object as the pattern, ask for a plan, approve it, then let the agent draft the page object and one test. You write the expected results.",
    },
    {
      time: "Afternoon",
      title: "Refactor",
      icon: Sunset,
      desc: "Three tests repeat the same login and setup steps. Ask the agent to extract a helper, touching only the files you named, and run the affected tests to confirm nothing changed in behavior.",
    },
    {
      time: "End of day",
      title: "Review",
      icon: Moon,
      desc: "Read every changed line, run the suite yourself, ask the agent to draft a PR description from the diff, edit it, and commit small, single-purpose changes by hand.",
    },
  ];

  const explorePrompt = `Illustrative prompt, start of a session

Before changing anything, help me understand this repo.

1. Summarize the folder structure and what lives where.
2. Which test framework, runner and build tool are used?
3. How are page objects written? Point me to one good example.
4. How are tests run locally, and which command runs a single test?
5. How is test data created and cleaned up?
6. List any conventions you notice (naming, waits, locators, assertions).

Do not edit any files. Reply with a short summary and file paths.`;

  const planPrompt = `Illustrative prompt, plan before edit

Task: add a page object and one test for the "Change Password" screen.
Pattern to follow: pages/ProfilePage.java and tests/ProfileTest.java.

Expected behavior (from the requirement, do not infer from the UI):
- A new password shorter than the minimum length shows a validation error.
- A matching current password and valid new password shows a success message.

Before editing:
- List the files you will create or change.
- Describe the locators you plan to use and why.
- Wait for my approval.

Rules: no fixed sleeps, no assertions inside page objects, do not touch other tests.`;

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
            AI Builder Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Claude Code
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Workflow
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Claude Code for Test Automation: A Day-to-Day Workflow
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          The agent is fast. The value comes from how small you keep its tasks and how carefully you read what it
          hands back.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 25, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
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
        <blockquote className="border-l-4 border-purple-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Small tasks, clear boundaries, and you commit. That is the whole safety model."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-10">
          <p>
            Most writing about AI coding agents is about greenfield apps: describe an idea, watch an app appear. Test
            automation work does not look like that. It is a lot of reading existing code, chasing failures, adding one
            more page object in the house style, and cleaning up repetition before it spreads. It is maintenance-heavy,
            convention-heavy and full of small decisions about what a test should prove.
          </p>
          <p>
            Claude Code is a coding agent that works in your terminal or IDE. In general terms, it can read files in
            your project, propose edits, and run commands when you allow it to. That is enough to be genuinely useful in
            a test repo, and also enough to cause a mess if you hand it vague goals. This is the workflow I have settled
            into, organized around a normal working day rather than a feature list.
          </p>
        </div>

        {/* Signature visual: timeline */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-purple-300/80 font-semibold mb-6">
            A day with an agent in a test repo
          </p>
          <div className="relative border-l-2 border-purple-500/30 ml-4 space-y-8">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.time} className="relative pl-8">
                  <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#050816] border-2 border-purple-500/50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-300" />
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-wide text-purple-300 font-semibold mb-1">{item.time}</p>
                    <p className="text-white font-semibold mb-2">{item.title}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 1 */}
        <section id="explore-first" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start by Exploring</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The most underrated use of a coding agent is not writing code at all. It is reading. Before I let it
              change anything, I ask it to explain the repository back to me: the folder layout, the framework and
              runner, how page objects are structured, how a single test is run, and where test data comes from.
            </p>
            <p>
              This does two things. First, it is a fast orientation for me when I land in a repo I do not know well, or
              one I have not touched for a while. Second, and more important, it tells me what the agent believes about
              the project. If its summary says waits are handled one way and I know they are handled another way, I
              have found a misunderstanding before it turned into twenty changed lines.
            </p>
            <p>
              I explicitly tell it not to edit during this phase. Exploration should be read-only. It is also the
              cheapest moment to correct course: fixing a wrong assumption in a summary costs a sentence, while fixing
              it in a diff costs a review cycle.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mt-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> explore-the-repo.txt — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-purple-100/90 font-mono">
              <code>{explorePrompt}</code>
            </pre>
          </div>
        </section>

        {/* Section 2 */}
        <section id="plan-first" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Plan First, Then Edit</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Once the agent understands the repo, the next habit is to separate planning from doing. For anything
              bigger than a one-line fix, I ask for a plan first: what it intends to do, which files it will create or
              change, and any assumptions it is making. Then I approve, adjust or reject that plan before a single file
              changes.
            </p>
            <p>
              A plan is easy to review. A list of five files and three sentences of intent takes seconds to read, and it
              is where scope creep shows up. If I asked for one page object and the plan mentions changing a shared
              base class, I want to know now, not after the diff lands.
            </p>
            <p>
              The plan prompt is also where I put the things the agent cannot know. Expected results come from the
              requirement, so I write them in. House rules, such as no fixed sleeps or no assertions inside page
              objects, go in too. The agent is good at following explicit constraints. It is not good at guessing
              unstated ones.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mt-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              plan-before-edit.txt — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-indigo-100/90 font-mono">
              <code>{planPrompt}</code>
            </pre>
          </div>
        </section>

        {/* Section 3 */}
        <section id="good-tasks" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Good Tasks</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Good tasks for an agent share a shape: the goal is concrete, the boundaries are clear, there is an
              existing pattern to follow, and the result is easy to verify. In a test repo, plenty of daily work fits
              that shape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "A new page object for a described screen",
                desc: "You describe the screen and its elements, point at an existing page object as the template, and review the locators it chooses.",
              },
              {
                title: "Turning repeated steps into helpers",
                desc: "Three tests log in the same way and set up the same data. Extracting a helper is mechanical and easy to verify by running those tests.",
              },
              {
                title: "Fixing a clearly diagnosed locator issue",
                desc: "You already know the button's id changed and which page object references it. The agent makes the change and runs the affected test.",
              },
              {
                title: "Writing a PR description from a diff",
                desc: "It reads the changes and drafts a summary. You correct anything it overstates and add the reason, which only you know.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-green-500/5 border border-green-500/15 rounded-2xl p-5">
                <p className="text-green-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            Notice that in every case, the human has already done the thinking that requires context: what the screen
            should do, which tests repeat, what changed in the UI, why the PR exists. The agent saves typing,
            searching and boilerplate. That is a real saving, and it compounds over a week.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            A useful test before handing over any task: could you write the acceptance check in one sentence? "The new
            page object follows the ProfilePage pattern and the test fails when the validation is removed." If you can
            say that, the task is probably a good fit. If you find yourself saying "make it better" or "you'll know it
            when you see it", the task is not ready for an agent, and honestly it is not ready for a human either.
          </p>
        </section>

        {/* Section 4 */}
        <section id="bad-tasks" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ThumbsDown className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Bad Tasks</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Bad tasks are the ones where the agent has to invent the goal, invent the domain knowledge, or work for a
              long time without anyone checking. "Improve the test suite" is the classic example. It sounds productive.
              In practice the agent will pick its own definition of "improve", touch a lot of files, and hand you a diff
              too large to review honestly.
            </p>
            <p>
              Tasks that need business knowledge are the second trap. If a test needs to know that a discount only
              applies to certain account types, or that a status should never move backwards, the agent cannot learn
              that from the code. It will infer something plausible from the current behavior, which is exactly how you
              end up with tests that confirm bugs.
            </p>
            <p>
              The third trap is the large, unsupervised refactor. Renaming a pattern across a hundred files might be
              mechanically correct and still break things in ways no single test catches. Big changes should be broken
              into reviewable steps, each one run and checked before the next.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Instead of this</th>
                  <th className="text-left px-5 py-3 font-semibold">Ask for this</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Improve the suite", "Find tests that use fixed sleeps in the checkout folder and list them; do not edit."],
                  ["Write tests for the pricing page", "Write one test for this rule, using these expected values from the ticket."],
                  ["Refactor all page objects to the new base class", "Migrate LoginPage only, run its tests, show me the diff."],
                  ["Fix the flaky tests", "Read this failure log and the test; list three likely causes with evidence."],
                  ["Clean up the repo", "List unused helper methods with file paths; I will decide what to remove."],
                ].map(([bad, good]) => (
                  <tr key={bad}>
                    <td className="px-5 py-3 text-red-300/90 align-top">{bad}</td>
                    <td className="px-5 py-3 text-green-300/90 align-top">{good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section id="review-diff" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Review Its Diff Like a Colleague's</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The agent's output deserves exactly the review you would give a capable colleague's pull request. Not
              less, because it looks polished. Not more, because it is a machine. Read every changed line. If you would
              not approve a human's diff without reading it, do not approve this one.
            </p>
            <p>
              Then run the tests yourself. The agent may report that tests passed, and it may be right, but your own run
              is the evidence you trust. In test code especially, "it passes" is not the bar. Check that the assertions
              still mean something. Did a helper extraction quietly drop a check? Did a locator fix point at a
              different element that happens to have similar text? Did a wait become looser than it was?
            </p>
            <p>
              My favorite check is the one from the oracle problem: break the behavior on purpose and confirm the test
              fails. If the agent wrote a new test for a validation error, I temporarily disable the validation or
              change the expected message and run it. A test that stays green is not finished, no matter how clean it
              looks.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-6">
            <p className="text-blue-300 font-semibold text-sm mb-3">Diff review questions for test code</p>
            <ol className="space-y-2 text-sm text-white/70 list-decimal list-inside">
              <li>Does every new assertion trace to a requirement, not to current output?</li>
              <li>Did any existing assertion get weaker, removed or broadened?</li>
              <li>Are waits based on conditions rather than time?</li>
              <li>Do locators target the intended element and follow our locator rules?</li>
              <li>Did it touch files outside the agreed plan?</li>
            </ol>
          </div>
        </section>

        {/* Section 6 */}
        <section id="git-control" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Keep Humans in Control of Git</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              My firmest rule: I review, I commit, I push. The agent can propose a commit message and I often use it as
              a starting point, but the act of committing stays with me. A commit is a statement that someone looked at
              this change and stands behind it. That someone should be a person.
            </p>
            <p>
              Keep commits small and single-purpose. One page object and its test is one commit. One helper extraction
              is another. A locator fix is a third. Small commits make review honest, make reverting cheap, and make the
              history readable for whoever debugs this suite later. Large mixed commits are where agent mistakes hide.
            </p>
            <p>
              Work on a branch, never directly on the main line. If a session goes badly, throwing away a branch is a
              non-event. That safety net is what lets you experiment with an agent without fear.
            </p>
            <p>
              The same goes for anything that leaves your machine. Pushing, opening pull requests, triggering pipelines
              or touching shared environments all affect other people. Even when a tool can technically do these things
              with your permission, I prefer to keep them as deliberate human steps. The few seconds it costs are a
              cheap price for knowing exactly what went out and why.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {["You review", "You commit", "You push"].map((step) => (
              <div
                key={step}
                className="bg-purple-500/10 border border-purple-500/25 rounded-xl p-4 text-center text-purple-200 text-sm font-semibold"
              >
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 */}
        <section id="confidently-wrong" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">When It Is Confidently Wrong</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Every agent session can drift. The tricky part is that a wrong answer sounds exactly as confident as a
              right one. Over time I have learned to watch for a few signals that a session has gone off track.
            </p>
          </div>

          <div className="space-y-3 my-6">
            {[
              "It keeps fixing the same failure in different ways, each one plausible, none of them working.",
              "It references a method, file or config value that does not exist in your repo.",
              "The diff keeps growing beyond the plan you approved.",
              "It weakens an assertion or adds a retry to make a test pass.",
              "Its explanation of the failure changes every time you ask.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-pink-500/5 border border-pink-500/15 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-pink-400 mt-2 shrink-0" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              When I see these signs, I stop rather than push harder. Arguing with a drifting session rarely helps. The
              better move is to reset: discard the changes, write down what I now know about the problem, and start
              again with a tighter prompt. Name the exact file, the exact failing line, the constraint it kept breaking,
              and the outcome you want. Sometimes a fresh session with that sharper context gets there in one step.
            </p>
            <p>
              And sometimes the honest conclusion is that this task needs a human. If the failure depends on
              environment history, business rules or a judgment call about intended behavior, the agent is missing
              information it cannot get from the repo. That is not a failure of the tool. It is a signal that the task
              was the wrong shape for it.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A coding agent has earned a permanent place in my automation day. It reads faster than I do, it does not
              get bored by boilerplate, and it is excellent at following a pattern once you show it one. Exploring a
              repo, drafting page objects, extracting helpers and summarizing diffs are all faster with it than without
              it.
            </p>
            <p>
              But the safety of the whole arrangement comes from a few plain habits: explore before editing, plan before
              changing, keep tasks small, read every line, run the tests yourself, and keep git in human hands. None of
              those habits are about the tool. They are about staying the engineer who is accountable for the suite.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-purple-200 text-lg font-semibold">
              Treat it like a fast junior who never gets tired and never knows your business.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Bringing an AI agent into your test repo?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about workflows that make automation faster without giving up review and control.
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

export default ClaudeCodeTestAutomationBlog;
