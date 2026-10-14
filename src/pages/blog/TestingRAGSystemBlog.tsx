import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  BookOpen,
  GitCompare,
  Target,
  Anchor,
  FileClock,
  Lock,
  ChartColumn,
  MessageCircleQuestion,
  Database,
  FileStack,
  Cpu,
  MessageSquareText,
  ChevronRight,
  ChevronDown,
  CircleX,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Testing a RAG System: What QA Should Actually Check
 * Slug: /blog/testing-a-rag-system
 * Category: AI Architecture
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

const TestingRAGSystemBlog = () => {
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
    title: "Testing a RAG System: What QA Should Actually Check | Digital Jaydeep",
    description:
      "Retrieval-augmented generation has two things that can fail: finding the right information and using it faithfully. A structured QA approach to testing retrieval, grounding, citations, data quality and access control in a RAG system, separately and together.",
    keywords:
      "RAG testing, retrieval-augmented generation, AI testing, LLM evaluation, grounding, citations, retrieval quality, AI access control",
    canonicalUrl: "https://jaydeepai.github.io/blog/testing-a-rag-system",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Testing a RAG System: What QA Should Actually Check",
      datePublished: "2026-11-13",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "what-is-rag", label: "What RAG Is, in Plain Words" },
    { id: "two-systems", label: "Two Systems, Two Kinds of Failure" },
    { id: "retrieval", label: "Testing Retrieval" },
    { id: "grounding", label: "Testing Grounding" },
    { id: "data-issues", label: "Data Issues" },
    { id: "access-control", label: "Access Control" },
    { id: "eval-set", label: "Build the Evaluation Set and Track It" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const pipeline = [
    { icon: MessageCircleQuestion, name: "Question", fail: "Ambiguous or out of scope" },
    { icon: Database, name: "Retrieval", fail: "Misses or ranks wrong content" },
    { icon: FileStack, name: "Context", fail: "Stale, conflicting or not permitted" },
    { icon: Cpu, name: "Model", fail: "Ignores or goes beyond the sources" },
    { icon: MessageSquareText, name: "Answer", fail: "Wrong citation, false confidence" },
  ];

  const failures = [
    {
      type: "Missed retrieval",
      what: "The answer exists in the documents, but the right passage never reaches the model.",
      test: "Questions with known source passages; check the passage appears in the retrieved results.",
      sev: "Medium",
    },
    {
      type: "Wrong retrieval",
      what: "Similar-looking but irrelevant content is retrieved and ranked above the right content.",
      test: "Inspect the top results for each evaluation question; include near-miss questions on purpose.",
      sev: "Medium",
    },
    {
      type: "Stale source",
      what: "An outdated version of a document is retrieved and answered from as if current.",
      test: "Plant superseded and current versions; ask questions whose answer changed between them.",
      sev: "High",
    },
    {
      type: "Ungrounded answer",
      what: "The model adds facts not present in the retrieved context, or answers when the sources are silent.",
      test: "Compare each claim with the context; include questions the documents cannot answer.",
      sev: "High",
    },
    {
      type: "Bad citation",
      what: "The answer cites a source that doesn't support it, or cites the wrong section.",
      test: "Open every cited passage for a sample of answers and check it supports the claim.",
      sev: "Medium",
    },
    {
      type: "Access leak",
      what: "A user receives content, or an answer built from content, they are not allowed to see.",
      test: "Ask the same questions as different roles; restricted canary content must never appear.",
      sev: "Critical",
    },
  ];

  const sevStyle: Record<string, string> = {
    Medium: "bg-amber-500/15 text-amber-300",
    High: "bg-orange-500/15 text-orange-300",
    Critical: "bg-red-500/15 text-red-300",
  };

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold tracking-wide uppercase">
            AI Architecture Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            RAG
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Evaluation
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Testing a RAG System: What QA Should Actually Check
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Most bad answers from a RAG system start long before the model writes a word.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 13, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 14 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Architecture
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
                  className="flex items-center gap-3 text-white/70 hover:text-green-300 transition-colors text-sm text-left"
                >
                  <span className="text-white/30 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Pull quote / intro */}
        <blockquote className="border-l-4 border-green-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "When a RAG answer is wrong, the first question is not 'what did the model say?' It's 'what did we hand it?'"
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Retrieval-augmented generation, usually shortened to RAG, has become the default way to build AI features that
            answer questions about a specific body of knowledge: a product's documentation, a company's policies, a support
            knowledge base, a set of test reports. Instead of hoping the model already knows the answer, the system looks up
            relevant documents and hands them to the model to answer from.
          </p>
          <p>
            For QA, that architecture is good news and bad news. Good, because it gives us something concrete to test: a
            retrieval step with inputs and outputs we can inspect. Bad, because a RAG system can fail in more places than a
            plain chatbot, and the failures look alike from the outside. A wrong answer might be the model's fault, the
            search's fault, the documents' fault, or a permissions bug. Testing it well means taking the system apart and
            checking each piece, then checking them together.
          </p>
        </div>

        {/* Section 1 */}
        <section id="what-is-rag" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What RAG Is, in Plain Words</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Think of an open-book exam. A RAG system receives a question, searches a library of documents for the passages
              most likely to contain the answer, places those passages in the prompt alongside the question, and asks the
              model to answer using them. Three steps: retrieve, augment, generate.
            </p>
            <p>
              Behind the scenes, documents are usually split into smaller pieces, often called chunks, and indexed so they
              can be found by meaning rather than only by exact keywords. When a question arrives, the system finds the
              chunks most similar to it, picks the top few and passes them on. The details vary a great deal between
              implementations, but that basic shape is common, and it is enough to plan your testing around.
            </p>
          </div>

          {/* Signature visual: pipeline with failure markers */}
          <div className="rounded-2xl border border-green-500/25 bg-green-500/5 p-6 mb-6">
            <p className="text-xs uppercase tracking-widest text-green-300/70 font-semibold mb-6">
              The RAG pipeline and where it breaks
            </p>
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              {pipeline.map((p, i) => (
                <div key={p.name} className="flex flex-col md:flex-row items-center gap-2 flex-1">
                  <div className="w-full flex-1 flex flex-col items-center">
                    <div className="w-full rounded-xl border border-green-500/30 bg-[#08140f] p-3 text-center">
                      <p.icon className="w-5 h-5 text-green-300 mx-auto mb-1.5" />
                      <p className="text-green-100 text-sm font-semibold">{p.name}</p>
                    </div>
                    <div className="w-px h-3 bg-red-400/40" />
                    <div className="w-full rounded-lg border border-red-500/25 bg-red-500/5 px-2 py-2 flex items-start gap-1.5">
                      <CircleX className="w-3.5 h-3.5 text-red-300 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-red-200/80 leading-snug">{p.fail}</p>
                    </div>
                  </div>
                  {i < pipeline.length - 1 && (
                    <>
                      <ChevronRight className="hidden md:block w-4 h-4 text-green-300/50 shrink-0" />
                      <ChevronDown className="md:hidden w-4 h-4 text-green-300/50 shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Every box in that diagram is a place where the answer can go wrong, and every red marker is a test idea. The
            rest of this article walks through them.
          </p>
        </section>

        {/* Section 2 */}
        <section id="two-systems" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Two Systems, Two Kinds of Failure</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The single most useful idea in RAG testing is that you are testing two systems glued together. The first is a
              search system: given a question, did it find the right content? The second is a generation system: given the
              content, did it produce a faithful, useful answer? They fail differently, they are fixed by different people,
              and they should be tested separately before they are tested together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5">
              <p className="text-green-300 font-semibold mb-2">Retrieval quality</p>
              <p className="text-white/65 text-sm leading-relaxed">
                Did the right passages come back, and near the top? Fixes live in chunking, indexing, search settings and
                document metadata. You can test it without calling the model at all.
              </p>
            </div>
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-5">
              <p className="text-teal-300 font-semibold mb-2">Generation faithfulness</p>
              <p className="text-white/65 text-sm leading-relaxed">
                Given good passages, did the answer stay within them, cite them correctly and admit gaps? Fixes live in the
                prompt, the model choice and output checks. You can test it with hand-picked context.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Why separate them? Because end-to-end tests alone make diagnosis guesswork. If you only look at final answers,
              a bad one could come from either half, and teams tend to blame the model first because it's the visible part.
              In practice, many disappointing answers trace back to retrieval: the model faithfully answered from the wrong
              material. Separate tests tell you which half to fix.
            </p>
            <p>
              Here is the failure map I use. It covers both halves plus the data and permissions underneath them, with a
              way to test each and the severity I would start from.
            </p>
          </div>

          {/* Signature visual: failure types table */}
          <div className="overflow-x-auto rounded-2xl border border-green-500/25">
            <table className="w-full text-sm min-w-[680px]">
              <thead>
                <tr className="bg-green-500/10 text-green-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Failure type</th>
                  <th className="text-left px-4 py-3 font-semibold">What happens</th>
                  <th className="text-left px-4 py-3 font-semibold">How to test it</th>
                  <th className="text-left px-4 py-3 font-semibold">Start at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {failures.map((f) => (
                  <tr key={f.type} className="align-top">
                    <td className="px-4 py-3 text-green-200 font-semibold">{f.type}</td>
                    <td className="px-4 py-3 text-white/70">{f.what}</td>
                    <td className="px-4 py-3 text-white/60">{f.test}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${sevStyle[f.sev]}`}>{f.sev}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section id="retrieval" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Testing Retrieval</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Retrieval testing starts with a set of questions where you know the answer's location. For each question, you
              record which document and which passage should be found. Then you run only the retrieval step and check what
              comes back. No model involved, no fuzzy judgment about wording, just a search result you can compare against
              an expectation. This is the most deterministic part of a RAG system and the cheapest to test thoroughly.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Question (example)</th>
                  <th className="text-left px-4 py-3 font-semibold">Expected source</th>
                  <th className="text-left px-4 py-3 font-semibold">In top results?</th>
                  <th className="text-left px-4 py-3 font-semibold">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                <tr>
                  <td className="px-4 py-3 text-white/80">How do I reset my password?</td>
                  <td className="px-4 py-3 text-white/60 font-mono">account-help / reset</td>
                  <td className="px-4 py-3"><CircleCheck className="w-4 h-4 text-green-400" /></td>
                  <td className="px-4 py-3 text-white/60">First</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/80">Can I get a refund after the trial ends?</td>
                  <td className="px-4 py-3 text-white/60 font-mono">billing-policy / refunds</td>
                  <td className="px-4 py-3"><CircleCheck className="w-4 h-4 text-green-400" /></td>
                  <td className="px-4 py-3 text-amber-300">Low, below a trial FAQ</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/80">Which export formats are supported?</td>
                  <td className="px-4 py-3 text-white/60 font-mono">reports-guide / export</td>
                  <td className="px-4 py-3"><CircleX className="w-4 h-4 text-red-400" /></td>
                  <td className="px-4 py-3 text-red-300">Not found</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Three things to look at. <span className="text-white/90">Presence</span>: does the expected passage appear in
              the results at all? If it doesn't, the model never had a chance. <span className="text-white/90">Ranking</span>:
              how high does it appear? Systems usually pass only the top few results onward, so a correct passage ranked
              too low is effectively missing. <span className="text-white/90">Coverage</span>: for questions whose answer
              spans several passages, did all of them come back, or only one?
            </p>
            <p>
              Write the questions the way real users ask them, not the way documents are written. Users say "I can't get
              in" rather than "authentication failure". Include synonyms, typos, vague questions and questions that use
              internal jargon. Include near-miss questions too: ones that sound like a documented topic but are actually
              about something else. These are where wrong retrieval shows up.
            </p>
            <p>
              Once you have the set, retrieval checks are cheap enough to run on every change to the documents or search
              settings, and the results are easy to track as simple counts of found, ranked well, and missed.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="grounding" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Anchor className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Testing Grounding</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Grounding is about the second half: does the answer stay faithful to the content it was given? To test it in
              isolation, fix the context. Hand-pick the passages, feed them to the generation step directly and look at
              what comes out. That removes retrieval from the equation, so anything wrong is the generation's doing.
            </p>
          </div>

          <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6 mb-6">
            <p className="text-teal-300 font-semibold mb-4">Grounding questions to ask of every answer</p>
            <div className="space-y-3">
              {[
                ["Stays within the context", "Every factual claim can be traced to a provided passage. Nothing extra is filled in from the model's general knowledge where the product expects source-only answers."],
                ["Admits when the sources are silent", "Given a question the passages can't answer, it says so instead of producing a plausible guess."],
                ["Cites correctly", "Each citation points to a passage that actually supports the sentence it's attached to."],
                ["Handles conflict honestly", "When two passages disagree, it notices, rather than silently picking one or blending them."],
                ["Doesn't follow instructions in documents", "Text inside a retrieved document is treated as content, not as commands to the model."],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">
                    <span className="text-white/90 font-semibold">{k}. </span>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The "admits when the sources are silent" check deserves dedicated test cases. Deliberately include questions
              your documents do not answer, some close to covered topics and some completely off-topic. A system that
              answers them confidently is inventing, and users have no way to tell. I consider a good "I couldn't find that
              in the documentation" one of the most important behaviors a RAG system can have.
            </p>
            <p>
              Citations are where small errors hide. An answer can be correct and well-grounded while citing the wrong
              section, which matters because users click through to check. For a sample of answers in each run, open every
              cited passage and confirm it supports the claim. It's tedious, which is exactly why it's often skipped.
            </p>
            <p>
              Scoring grounding automatically is possible, for example with a second model asked to compare claims against
              the context, but treat such graders as tools to be validated. Check their verdicts against careful human
              review on a sample before you rely on them, and keep sampling afterward.
            </p>
            <p>
              Only after both halves have been checked separately does it make sense to test them together, end to end,
              with real retrieval feeding real generation. Now the questions are about interaction. Does the answer degrade
              gracefully when retrieval returns partially relevant content? Does the system notice when the top results are
              weak and say so, or does it build a confident answer on thin evidence? When an end-to-end case fails, your
              separate tests tell you where to look: if retrieval for that question passes on its own, the problem is in
              generation; if it fails, start there. That diagnostic shortcut is the whole reason for splitting the work.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="data-issues" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-lime-500/15 border border-lime-500/30 flex items-center justify-center">
              <FileClock className="w-5 h-5 text-lime-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Data Issues</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A RAG system is only as good as its library. The model can be excellent and retrieval well tuned, and the
              answers will still be wrong if the documents are. Data problems are the least glamorous part of RAG testing
              and, I suspect, the most underrated.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                t: "Stale documents",
                d: "Old versions sit next to new ones, or superseded policies were never removed. Retrieval doesn't know which is current unless something tells it.",
              },
              {
                t: "Conflicting documents",
                d: "Two sources say different things: a policy page and an old announcement, a help article and a release note. The model may pick either.",
              },
              {
                t: "Duplicates",
                d: "The same content appears several times, crowding out other relevant passages from the top results.",
              },
              {
                t: "Poorly split content",
                d: "Chunks cut through the middle of a table, a list or a step-by-step procedure, so the retrieved piece lacks the context that makes it meaningful.",
              },
              {
                t: "Missing metadata",
                d: "No dates, versions, product names or audience tags, so the system can't filter or prefer the right document.",
              },
              {
                t: "Unreadable sources",
                d: "Scanned documents, images of text or complex layouts that were ingested as garbage or not at all.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-lime-500/5 border border-lime-500/15 rounded-2xl p-5">
                <p className="text-lime-300 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Testing for these means looking at the corpus, not just the answers. Sample retrieved chunks and read them as
              a human would: do they make sense on their own? Search the library for duplicate and near-duplicate content.
              Plant a deliberately outdated document in a test corpus alongside its replacement and see which one answers
              questions. And ask the content owners a question that often surprises them: who is responsible for removing
              documents when they become outdated?
            </p>
            <p>
              Data issues are also where QA can add value early, before the system is even built. Reviewing the source
              library for freshness, ownership and structure is ordinary documentation review, a skill testers already
              have. Finding that half the knowledge base has no owner is much cheaper before launch than after users have
              learned not to trust the answers.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="access-control" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Access Control</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              This is the section I would not let any team skip. A RAG system that indexes internal documents is, among other
              things, a very effective search engine over everything it can read. If permissions are not enforced at
              retrieval time, a user can ask a question and receive an answer built from documents they were never allowed
              to open. The answer may not even show the source; it just quietly contains the information.
            </p>
            <p>
              Test it explicitly with different roles. Create test documents with restricted visibility, containing
              distinctive canary phrases that would be obvious if they leaked. Then ask questions as users who should and
              should not see them, and check both the retrieved results and the final answers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-red-500/25 mb-6">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-red-500/10 text-red-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Test document</th>
                  <th className="text-left px-4 py-3 font-semibold">Regular user</th>
                  <th className="text-left px-4 py-3 font-semibold">Team member</th>
                  <th className="text-left px-4 py-3 font-semibold">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {[
                  ["Public help article", true, true, true],
                  ["Team-only runbook (canary A)", false, true, true],
                  ["Admin-only salary policy (canary B)", false, false, true],
                ].map(([doc, a, b, c]) => (
                  <tr key={String(doc)}>
                    <td className="px-4 py-3 text-white/80">{doc}</td>
                    {[a, b, c].map((ok, i) => (
                      <td key={i} className="px-4 py-3">
                        {ok ? (
                          <span className="text-green-300 flex items-center gap-1.5"><CircleCheck className="w-4 h-4" /> may see</span>
                        ) : (
                          <span className="text-red-300 flex items-center gap-1.5"><CircleX className="w-4 h-4" /> must never see</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Treat any leak as high severity, even in a test environment, because it shows the design does not enforce
              permissions where it matters. Check the edges too: a user who just lost access to a team, documents whose
              permissions changed after indexing, cached answers shared between users, and conversation history that
              carries restricted content into a later question.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="eval-set" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ChartColumn className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Build the Evaluation Set and Track It</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Everything above comes together in an evaluation set: a curated collection of questions, each with its
              expected source passages, the qualities a good answer must have, and the roles allowed to ask it. Some
              questions have answers in the documents, some deliberately don't, some test conflicts, some test permissions.
            </p>
            <p>
              Version it like code, in the repository, with changes reviewed. Add to it whenever a user reports a bad answer
              or a new document type is ingested. And re-run it, at least the retrieval part, whenever any of these change:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Documents added or removed", "Chunking settings", "Retrieval and ranking settings", "Prompts", "Model or model version", "Permission rules"].map(
              (t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-200 text-xs">
                  {t}
                </span>
              )
            )}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Track the results over time rather than as one-off verdicts. Retrieval hit rates, grounding failures, wrong
              citations and access-control results, run after run. A RAG system can drift without any code change at all,
              simply because the document library changed underneath it. A trend line shows that drift; a single green run
              hides it.
            </p>
            <p>
              Because generated answers can vary between runs, repeat the important generation checks a few times and look
              at the pattern. Retrieval, by contrast, is usually stable for the same index and settings, which makes it a
              good early warning: if retrieval results move, find out why before you look at anything else.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              RAG systems feel like AI products, so teams naturally focus their testing on the AI. I think that's backwards.
              The model is often the most reliable part of the chain. The risks concentrate in what surrounds it: whether the
              right content was found, whether that content was current and allowed, and whether the answer stayed honest
              about what the content said.
            </p>
            <p>
              Test retrieval like a search system, with known questions and expected sources. Test grounding with fixed
              context and questions the documents cannot answer. Audit the library. Hammer permissions with multiple roles.
              Then tie it all together in an evaluation set you re-run on every meaningful change. That's what QA should
              actually check.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
            <p className="text-green-200 text-lg font-semibold">
              A confident answer from the wrong document is still a wrong answer.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Building or testing a RAG feature?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about evaluation sets, retrieval checks and how to catch grounding and access problems before users
            do.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default TestingRAGSystemBlog;
