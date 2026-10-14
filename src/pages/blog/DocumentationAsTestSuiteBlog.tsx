import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Workflow,
  Shuffle,
  ClipboardCheck,
  FileWarning,
  Search,
  Link2,
  Handshake,
  ArrowDown,
  CircleCheck,
  Github,
} from "lucide-react";

/**
 * Blog: Documentation Is Now Part of Your Test Suite
 * Slug: /blog/documentation-is-part-of-your-test-suite
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

const DocumentationAsTestSuiteBlog = () => {
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
    title: "Documentation Is Now Part of Your Test Suite | Digital Jaydeep",
    description:
      "AI output can only be as clear as the spec it reads. Vague requirements produce vague code and vague tests, faster than ever. Why writing testable acceptance criteria is now a core QA skill, how to spot spec smells, and how to use AI to attack a spec before development starts.",
    keywords:
      "acceptance criteria, requirements quality, Given When Then, test oracle, AI quality, spec review, QA strategy, traceability",
    canonicalUrl: "https://jaydeepai.github.io/blog/documentation-is-part-of-your-test-suite",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Documentation Is Now Part of Your Test Suite",
      datePublished: "2026-10-31",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "new-dependency", label: "The New Dependency" },
    { id: "ambiguity-multiplies", label: "Ambiguity Multiplies" },
    { id: "testable-criteria", label: "Write Testable Criteria" },
    { id: "spec-smells", label: "Spec Smells" },
    { id: "attack-the-spec", label: "Use AI to Attack the Spec" },
    { id: "link-docs-tests", label: "Link Docs and Tests" },
    { id: "team-habit", label: "Make It a Team Habit" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const attackPrompt = `You are reviewing a requirement before development starts.
Act as a skeptical senior tester. Do NOT write tests and do NOT answer
your own questions.

Requirement:
[paste the user story and acceptance criteria here, with no customer data]

Return three lists:
1. Ambiguities: words or phrases two people could read differently.
   Quote the exact phrase and explain the two readings.
2. Missing behavior: error cases, empty states, limits, permissions,
   concurrency and what happens on failure of external services.
3. Questions for the product owner, ordered by how much a wrong
   assumption would cost.

Rules:
- Only use information in the requirement. If you assume anything,
  label it as an assumption.
- Keep each item to one or two sentences.`;

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold tracking-wide uppercase">
            AI Strategy Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Requirements
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Acceptance Criteria
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Documentation Is Now Part of Your Test Suite
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          When AI writes the code and the tests from the same document, the document becomes the one thing nobody can
          afford to get wrong.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 31, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 11 min read
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
                  className="flex items-center gap-3 text-white/70 hover:text-pink-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-pink-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "Ambiguity in the spec is a bug that has not been filed yet."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            For a long time, documentation was something testers complained about rather than something we
            owned. Requirements arrived vague, we asked questions in meetings, filled the gaps with experience, and
            wrote tests based on what we eventually understood. The document was a starting point. The real
            specification lived in conversations and in the heads of the people who had them.
          </p>
          <p>
            AI tools change that arrangement. A coding assistant reads the ticket and writes the feature. Another
            prompt reads the same ticket and writes the tests. Neither was in the meeting. Neither knows what the
            product owner meant but did not write down. Whatever the document says, and whatever it leaves out, flows
            straight into code and tests at machine speed. That makes the spec part of your test infrastructure, and
            writing testable acceptance criteria a core QA skill rather than a nice-to-have.
          </p>
        </div>

        {/* Section 1 — New dependency */}
        <section id="new-dependency" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The New Dependency</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Think about what an AI assistant actually has when it generates a test from a user story. It has the
              text of the story, perhaps some code, and its general knowledge of how similar features usually work.
              That is all. If the story says "users can reset their password", the model will produce a reasonable,
              generic password reset test. Whether your product's reset link expires, whether old sessions are logged
              out, and what happens when the email is unknown are all things it will either skip or guess.
            </p>
            <p>
              Guessing is the real danger. A model filling a gap does not flag that it is filling a gap. It writes a
              confident assertion based on what is common, and the result looks exactly like a test written from a
              clear requirement. This connects directly to the oracle problem: a test's expected result has to come
              from somewhere outside the code. The spec is that somewhere. When the spec is silent, the oracle becomes
              the model's assumption.
            </p>
            <p>
              So the quality of what AI generates is capped by the quality of what it reads. Better prompts help at the
              margin. A clearer document helps at the source.
            </p>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-pink-300 font-semibold">The shift: </span>
              the spec used to be an input to testers. Now it is an input to the tools that write the code and the
              tests. That makes it part of the system under test.
            </p>
          </div>
        </section>

        {/* Section 2 — Ambiguity multiplies */}
        <section id="ambiguity-multiplies" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ambiguity Multiplies</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A vague sentence in a requirement used to cause a misunderstanding. Now it can cause a consistent,
              well-structured misunderstanding, repeated in code, in tests and in documentation, all generated from the
              same flawed source. Worse, because the code and the tests come from the same reading, they agree with
              each other. The build is green. The behavior is wrong.
            </p>
          </div>

          {/* Flow */}
          <div className="flex flex-col items-center gap-2 my-8">
            {[
              { label: "Fuzzy requirement", sub: "\"Show a warning for large orders\"", cls: "bg-pink-500/10 border-pink-500/30 text-pink-200" },
              { label: "AI-generated code", sub: "Picks a threshold and a message on its own", cls: "bg-white/5 border-white/10 text-white" },
              { label: "AI-generated tests", sub: "Assert the same guessed threshold", cls: "bg-white/5 border-white/10 text-white" },
              { label: "Green build", sub: "Code and tests agree, both on the guess", cls: "bg-purple-500/10 border-purple-500/30 text-purple-200" },
            ].map((s, i, arr) => (
              <div key={s.label} className="w-full flex flex-col items-center gap-2">
                <div className={`w-full md:w-2/3 rounded-xl border p-4 text-center ${s.cls}`}>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-white/50 text-xs mt-1">{s.sub}</p>
                </div>
                {i < arr.length - 1 && <ArrowDown className="w-4 h-4 text-pink-400" />}
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              When a human developer and a human tester read the same fuzzy line, they often read it differently, and
              that disagreement surfaces as a failing test and a conversation. It is annoying, but it is also a
              detection mechanism. When one model, or two models with similar training, read the same line, they tend
              to make the same guess. The disagreement that used to expose the ambiguity disappears.
            </p>
            <p>
              That is why I think spec quality matters more now, not less. The speed is real. So is the risk of
              producing the wrong thing quickly and confidently.
            </p>
          </div>
        </section>

        {/* Section 3 — Testable criteria */}
        <section id="testable-criteria" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Write Testable Criteria</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A testable acceptance criterion describes a specific, observable outcome under stated conditions. You
              should be able to read it and know exactly what to check and what result counts as a pass. If two people
              could write two different tests from it, it is not finished.
            </p>
            <p>
              Given/When/Then is a useful tool here, but treat it as a clarity tool, not a ritual. Its value is that it
              forces three questions: what is the starting state, what action happens, and what exactly should be
              observable afterwards. Plenty of teams write Given/When/Then that is just as vague as prose. The format
              does not make a criterion testable. The specifics do.
            </p>
          </div>

          {/* Signature visual — before / after */}
          <div className="space-y-4 mb-6">
            {[
              {
                topic: "Large order warning",
                before: "The system should warn the user when an order is too large.",
                after: [
                  ["Given", "a cart with a total above 5,000 in the account currency"],
                  ["When", "the user opens the checkout page"],
                  ["Then", "a warning banner shows the text defined in copy deck item CHK-07"],
                  ["And", "the user can still place the order after confirming the warning"],
                ],
              },
              {
                topic: "Search performance",
                before: "Search should be fast and return relevant results.",
                after: [
                  ["Given", "the standard test catalog is loaded"],
                  ["When", "a user searches for an exact product name"],
                  ["Then", "that product appears in the first page of results"],
                  ["And", "results load within the response-time target agreed for search"],
                ],
              },
              {
                topic: "Password reset",
                before: "Users can reset their password if they forget it.",
                after: [
                  ["Given", "a registered user requests a password reset"],
                  ["When", "they open the reset link after it has expired"],
                  ["Then", "they see an 'expired link' message and an option to request a new one"],
                  ["And", "the password is unchanged"],
                ],
              },
            ].map((ex) => (
              <div key={ex.topic} className="rounded-2xl border border-white/10 overflow-hidden">
                <div className="bg-white/5 px-5 py-2.5 text-xs uppercase tracking-wide text-white/50 font-semibold">
                  {ex.topic}
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="p-5 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/10">
                    <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">Before: vague</p>
                    <p className="text-white/60 text-sm italic">"{ex.before}"</p>
                  </div>
                  <div className="p-5 bg-pink-500/5">
                    <p className="text-xs uppercase tracking-wide text-pink-300 font-semibold mb-2">After: testable</p>
                    <div className="space-y-1.5">
                      {ex.after.map(([kw, text]) => (
                        <p key={kw + text} className="text-sm text-white/75">
                          <span className="font-mono font-semibold text-pink-300 mr-2">{kw}</span>
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The values in these examples are placeholders, not recommendations. The point is that a value exists and
              someone accountable chose it. In the search example, "the response-time target agreed for search" is
              still a reference rather than a number, and that is acceptable only if the target is actually written
              down somewhere the team can find. If it is not, the criterion is still vague, just better dressed.
            </p>
            <p>
              Notice also that each "after" version includes something the "before" never mentioned: the user can
              still proceed, the password stays unchanged. Good criteria describe what must not happen as carefully as
              what must.
            </p>
          </div>
        </section>

        {/* Section 4 — Spec smells */}
        <section id="spec-smells" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Spec Smells</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Code smells are surface patterns that often point to deeper problems. Specs have them too. None of these
            prove a requirement is wrong, but each one is a reason to ask a question before anyone writes code.
          </p>

          <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6 mb-6">
            <p className="text-pink-300 font-semibold mb-4">Spec smells checklist</p>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
              {[
                ["Unmeasurable adjectives", "\"fast\", \"user-friendly\", \"intuitive\", \"secure\", \"large\""],
                ["Hand-wave words", "\"appropriate\", \"relevant\", \"as needed\", \"etc.\", \"and so on\""],
                ["Missing error behavior", "Only the happy path is described; failures are left to imagination"],
                ["Unstated limits", "No maximums, minimums, lengths, counts or time windows"],
                ["Undefined roles", "\"The user\" when admins, guests and members behave differently"],
                ["Silent dependencies", "Relies on another service or feature without saying what happens if it is down"],
                ["Passive voice hiding the actor", "\"The record is updated\": by whom, and when?"],
                ["Should vs must", "Mixed words with no agreement on which ones are mandatory"],
              ].map(([smell, example]) => (
                <div key={smell} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{smell}</p>
                    <p className="text-white/50 text-xs mt-0.5">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The most expensive smell, in my view, is missing error behavior. Teams naturally describe what
              should happen when everything works, because that is the feature they are excited about. What happens
              when the payment provider times out, when the file is too large, or when two users edit the same record
              is usually left out, and it is exactly where AI-generated code will fill the gap with whatever pattern is
              most common, which may not be what your product needs.
            </p>
          </div>
        </section>

        {/* Section 5 — Attack the spec */}
        <section id="attack-the-spec" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Use AI to Attack the Spec</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Here is the twist: the same tools that amplify ambiguity are very good at finding it, if you point them
              at the spec instead of past it. Asking a model to generate tests from a vague story hides the gaps.
              Asking it to list the questions a skeptical tester would ask exposes them.
            </p>
            <p>
              Models are good at this because it is a broad, generative task: enumerate edge cases, notice missing
              states, find words that could be read two ways. They have seen countless variations of similar features
              and can list what is commonly specified that this document skipped.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono flex items-center justify-between">
              <span>spec-attack-prompt.txt</span>
              <span className="text-pink-300/70">illustrative</span>
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-pink-100/90 font-mono whitespace-pre-wrap">
              <code>{attackPrompt}</code>
            </pre>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The critical instruction is "do not answer your own questions". Left to itself, a model will helpfully
              resolve every ambiguity with a plausible default, and you are back to the guessing problem. Treat its
              output as a question list, not as answers. The answers have to come from the people who own the product
              decision.
            </p>
            <p>
              Then filter. Some questions will be irrelevant or already obvious to your team. Pick the handful that
              would genuinely change the implementation or the tests, take them to refinement, and write the answers
              back into the acceptance criteria. The document improves, and every tool that reads it afterwards
              benefits.
            </p>
          </div>
        </section>

        {/* Section 6 — Link docs and tests */}
        <section id="link-docs-tests" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Link Docs and Tests</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              If the spec is the source of the oracle, every important test should point back to it. The simplest way
              is to reference the requirement or criterion id in the test name, a tag or a short comment. It costs a
              few characters and pays off every time a test fails and someone has to decide whether the product or the
              test is wrong.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Criterion id</th>
                  <th className="text-left px-5 py-3 font-semibold">Criterion (short)</th>
                  <th className="text-left px-5 py-3 font-semibold">Linked test</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-teal-300 font-mono text-xs">CHK-AC1</td>
                  <td className="px-5 py-3 text-white/70">Warning shown above order threshold</td>
                  <td className="px-5 py-3 text-white/50 font-mono text-xs">checkout_CHK_AC1_showsLargeOrderWarning</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-teal-300 font-mono text-xs">CHK-AC2</td>
                  <td className="px-5 py-3 text-white/70">Order still placeable after warning</td>
                  <td className="px-5 py-3 text-white/50 font-mono text-xs">checkout_CHK_AC2_allowsOrderAfterConfirm</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-teal-300 font-mono text-xs">PWD-AC3</td>
                  <td className="px-5 py-3 text-white/70">Expired reset link is rejected</td>
                  <td className="px-5 py-3 text-white/50 font-mono text-xs">reset_PWD_AC3_rejectsExpiredLink</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Links make two things possible. First, impact analysis: when a requirement changes, you can find the
              tests that encode it. Second, gap analysis: a criterion with no linked test is visible, and so is a test
              with no criterion, which is often a test nobody can explain.
            </p>
            <p>
              The discipline that matters is updating both together. When a criterion changes, the linked tests change
              in the same piece of work. When a test's expectation changes, someone asks whether the criterion changed
              too, and if it did not, why the test is being edited. AI assistants handle this well when you give them
              both the old and new criteria and the linked tests; they are good at spotting assertions that no longer
              match the text.
            </p>
          </div>
        </section>

        {/* Section 7 — Team habit */}
        <section id="team-habit" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Make It a Team Habit</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              None of this works as a QA-only crusade. Testers cannot rewrite every story alone, and they should not
              try. The goal is a shared habit: specs are reviewed for testability before development starts, the same
              way code is reviewed before it merges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                who: "Product owner",
                does: "Writes the intent and the business rules, and answers the open questions with real values.",
              },
              {
                who: "Tester",
                does: "Reviews for smells, runs the spec-attack prompt, and turns answers into testable criteria.",
              },
              {
                who: "Developer",
                does: "Checks feasibility, flags hidden technical limits, and confirms the criteria can be built as written.",
              },
            ].map((r) => (
              <div key={r.who} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-pink-300 font-semibold text-sm mb-2">{r.who}</p>
                <p className="text-white/60 text-sm leading-relaxed">{r.does}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Keep it light. A short testability pass during refinement, focused on the stories about to be picked up,
              is enough. A simple rule helps: a story is not ready for development if a tester cannot describe at least
              one negative case and one boundary from the criteria alone.
            </p>
            <p>
              Over time, this changes how the team writes. Product owners start including limits and error behavior
              without being asked. Developers stop discovering requirements halfway through implementation. And every
              AI tool the team uses gets better input, which is the cheapest model upgrade available.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The job of a QA engineer used to start when there was something to test. Increasingly, it starts when
              there is something to read. If AI writes a growing share of the code and the tests, then the document
              both are generated from is the highest-leverage place to find defects, because one fixed sentence prevents
              a whole chain of wrong code, wrong tests and false confidence.
            </p>
            <p>
              That does not mean testers become technical writers. It means we apply the skills we already have,
              skepticism, edge-case thinking and a sharp eye for "what happens if", one step earlier. Use AI to attack
              the spec, insist on observable outcomes, link criteria to tests, and make testability part of what
              "ready" means.
            </p>
            <p>
              Try it on the next story your team picks up: run it through the smells checklist, ask a model for the
              questions it raises, and see how many would have become defects later.
            </p>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-pink-200 text-lg font-semibold">
              Clear specs are the cheapest test automation you will ever write.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Want requirements your AI tools can actually test?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about acceptance criteria, spec reviews and keeping the oracle where it belongs.
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

export default DocumentationAsTestSuiteBlog;
