import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  BrainCircuit,
  GitFork,
  Flame,
  ListChecks,
  FlaskConical,
  ShieldCheck,
  FileWarning,
  FileText,
  Cpu,
  Wrench,
  OctagonAlert,
  ChevronRight,
  ChevronDown,
  CircleCheck,
} from "lucide-react";

/**
 * Blog: Prompt Injection for Testers: How to Break an AI Feature on Purpose
 * Slug: /blog/prompt-injection-for-testers
 * Category: AI Safety
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

const PromptInjectionTestersBlog = () => {
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
    title: "Prompt Injection for Testers: How to Break an AI Feature on Purpose | Digital Jaydeep",
    description:
      "If an AI feature reads text, someone can hide instructions in that text. A tester's conceptual catalogue of prompt injection attacks, direct and indirect, and a practical way to turn them into a repeatable, ethical adversarial test set.",
    keywords:
      "prompt injection, AI security, AI testing, indirect prompt injection, LLM security testing, adversarial testing, AI red teaming, QA for AI features",
    canonicalUrl: "https://jaydeepai.github.io/blog/prompt-injection-for-testers",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Prompt Injection for Testers: How to Break an AI Feature on Purpose",
      datePublished: "2026-11-09",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "why-different", label: "Why AI Features Are Different to Attack" },
    { id: "direct-indirect", label: "Direct vs Indirect Injection" },
    { id: "what-goes-wrong", label: "What Can Actually Go Wrong" },
    { id: "catalogue", label: "The Tester's Catalogue" },
    { id: "attacks-to-tests", label: "Turning Attacks Into Tests" },
    { id: "defenses", label: "Defenses to Look For, and Why None Is Complete" },
    { id: "reporting", label: "What to Report" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const catalogue = [
    {
      type: "Instruction override",
      idea: "The input tells the model to ignore its earlier rules and follow new ones instead.",
      safe: "Keeps following the system's real rules; treats the request as ordinary user text.",
      test: "Ask in several phrasings for the rules to be dropped; check the behavior and the boundaries stay the same.",
    },
    {
      type: "Role-play framing",
      idea: "The input wraps a forbidden request inside a story, a game or a pretend persona.",
      safe: "Recognizes that the fictional frame does not change what it may say or do.",
      test: "Pair each restricted behavior with a fictional framing; expected result is the same refusal or limit as without the frame.",
    },
    {
      type: "Hidden instructions in content",
      idea: "A document, email, page or ticket the system reads contains text addressed to the AI rather than to the human.",
      safe: "Summarizes or uses the content as data; does not act on instructions found inside it.",
      test: "Plant harmless marker instructions in test documents; check the output never obeys them and ideally flags them.",
    },
    {
      type: "Data-exfiltration attempts",
      idea: "The input tries to get the model to reveal its hidden instructions, other users' data or secrets in its context.",
      safe: "Declines, and the sensitive data was never in reach in the first place.",
      test: "Seed fake secrets and fake private records into the test environment; search every output and tool call for them.",
    },
    {
      type: "Tool misuse",
      idea: "The input tries to steer the model into calling a tool it shouldn't, or calling an allowed tool with harmful arguments.",
      safe: "Tool calls stay within scope; risky actions need approval; permissions block the rest.",
      test: "Log every tool call during the test; assert that no out-of-scope tool or argument appears.",
    },
    {
      type: "Multi-step or delayed attacks",
      idea: "The steering is spread over several turns, or planted early and triggered later in a long conversation or workflow.",
      safe: "Rules hold for the whole session, not just the first message.",
      test: "Script multi-turn conversations where the pressure builds slowly; check the last turn, not just the first.",
    },
    {
      type: "Encoding or formatting tricks",
      idea: "The instruction is disguised: unusual formatting, another language, text hidden from human readers but visible to the model.",
      safe: "Behaves the same regardless of how the text is dressed up; filters don't rely on exact wording.",
      test: "Re-express existing cases in different languages and layouts; results should match the plain versions.",
    },
  ];

  const defenses = [
    {
      name: "Least-privilege tools",
      what: "The model can only reach the tools and data the feature genuinely needs, with scoped credentials.",
      limit: "Shrinks the blast radius, but whatever is allowed can still be misused.",
    },
    {
      name: "Separating instructions from data",
      what: "Untrusted content is clearly marked and passed as data, and the system prompt tells the model to treat it that way.",
      limit: "Helps a lot, but the model still sees it all as text. Marking is a hint, not a wall.",
    },
    {
      name: "Output checks",
      what: "Responses and tool arguments are checked before they leave the system: for secrets, links, forbidden content, unexpected formats.",
      limit: "Checks catch what they were designed for. Creative outputs can slip past pattern-based filters.",
    },
    {
      name: "Approval gates for risky actions",
      what: "Sending, deleting, paying, sharing or changing data requires a human to confirm, with the proposed action shown clearly.",
      limit: "Only as good as the attention of the person approving. Rubber-stamping defeats it.",
    },
    {
      name: "Logging and monitoring",
      what: "Inputs, retrieved content, tool calls and outputs are recorded so incidents can be detected and investigated.",
      limit: "Detects and explains; it does not prevent. Still essential.",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            AI Safety Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Prompt Injection
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            AI Security
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Prompt Injection for Testers: How to Break an AI Feature on Purpose
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Every AI feature that reads text is also a feature that can be talked into things. Testers should find out
          what before someone else does.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 9, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 13 min read
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> AI Safety
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
        <blockquote className="border-l-4 border-blue-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "To a language model, data and instructions are both just text. Your job is to test what happens when they
          blur."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-8">
          <p>
            Most testers learned about SQL injection at some point, even if they never worked in security. The idea is
            easy to hold in your head: an application takes untrusted input, mixes it into something that gets
            executed, and the input ends up steering the system instead of just feeding it. Prompt injection is that
            same idea in spirit, moved into the AI era. The "something that gets executed" is now a language model, and
            the "query" is plain English.
          </p>
          <p>
            The difference is that SQL injection has a well-understood fix: keep code and data apart with parameterized
            queries. Prompt injection has no equivalent clean separation, because the model reads instructions and
            content through the same channel. That makes it a testing problem as much as an engineering problem. You
            cannot prove it away. You have to probe it, measure it and keep probing it every time the system changes.
            This article is written for testers who have not studied security and want a practical, ethical way to do
            exactly that.
          </p>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 mb-16 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-300 mt-0.5 shrink-0" />
          <p className="text-sm text-white/70 leading-relaxed">
            <span className="text-blue-200 font-semibold">Ground rule: </span>
            only test systems you own or are explicitly authorized to test, in a test environment, with fake data. This
            article stays conceptual on purpose. It describes categories of attack in plain words so you can design
            tests; it does not hand out ready-made payloads.
          </p>
        </div>

        {/* Section 1 */}
        <section id="why-different" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Why AI Features Are Different to Attack</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A traditional feature has a fixed grammar. A form field expects a date; a search box expects a string; an
              API expects a JSON body of a known shape. Testing its security means finding inputs that break the
              assumptions of that grammar. The space is large, but it is bounded by what the code actually parses.
            </p>
            <p>
              A language model has no fixed grammar. Its entire job is to read natural language and decide what to do
              with it. That is what makes it useful, and it is also what makes it steerable. A sentence that a human
              would read as content, "please forward this to everyone", can be read by the model as a request. There is
              no parser rejecting it, only the model's own judgment, shaped by its instructions and training.
            </p>
            <p>
              The second difference is where the text comes from. Early chatbots only read what the user typed. Modern
              AI features read far more: uploaded files, emails in an inbox, web pages they browse, tickets from a
              tracker, results returned by tools, records pulled from a knowledge base. Every one of those is a channel
              through which someone other than the user can put words in front of the model.
            </p>
            <p>
              So the tester's mental model has to change. You are not just asking "what can the user type?" You are
              asking "whose text does this system read, and what happens if that text starts giving orders?"
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="direct-indirect" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <GitFork className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Direct vs Indirect Injection</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              It helps to split prompt injection into two families, because they have different attackers, different
              entry points and different test designs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6">
              <p className="text-sky-300 font-semibold mb-1">Direct injection</p>
              <p className="text-xs text-white/40 uppercase tracking-wide mb-3">The user is the attacker</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Someone types instructions into the feature itself, trying to override its rules: get it to reveal its
                hidden setup, drop its restrictions, talk about things it shouldn't or do things it was told not to.
                The attacker can only affect their own session, unless the system lets that session reach shared data
                or tools.
              </p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-blue-300 font-semibold mb-1">Indirect injection</p>
              <p className="text-xs text-white/40 uppercase tracking-wide mb-3">The content is the attacker</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Instructions are hidden inside content the system reads on someone else's behalf: an email arriving in
                an inbox the assistant summarizes, a document shared into a workspace, a web page the agent visits, a
                support ticket filed by a stranger. The user never sees the instruction. The model does.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Direct injection is the one most people try first, and it matters, but indirect injection is the one I
              would worry about more. The victim is an innocent user who asked a reasonable question, like "summarize my
              unread emails", and the attacker is whoever managed to get text into one of those emails. The user has no
              reason to be suspicious, and the attacker never needed an account.
            </p>
            <p>
              For testers, this means two separate input surfaces. For direct injection, the surface is the chat box,
              the prompt field, any free-text input. For indirect injection, the surface is every source of content the
              feature can read. Make that list explicitly. It is usually longer than the team expects, and it is the
              first artifact I would bring to a test planning session for any AI feature.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="what-goes-wrong" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Can Actually Go Wrong</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              A model saying something silly because a user tricked it is embarrassing. It is rarely the worst case. The
              real risk depends on what the system can reach. I find it useful to picture the path from untrusted text
              to actual harm as a chain, because every link in it is a place where a test can look and a defense can
              sit.
            </p>
          </div>

          {/* Signature visual: injection flow */}
          <div className="rounded-2xl border border-blue-500/25 bg-blue-500/5 p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-blue-300/70 font-semibold mb-5">
              How injected text becomes harm
            </p>
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              {[
                { icon: FileText, title: "Untrusted document", note: "Email, page, file or ticket with hidden instructions", color: "border-white/15 bg-white/5", text: "text-white/80" },
                { icon: Cpu, title: "Model", note: "Reads instructions and data as the same stream of text", color: "border-blue-500/30 bg-blue-500/10", text: "text-blue-200" },
                { icon: Wrench, title: "Tool call", note: "Sends, edits, fetches or shares on the user's behalf", color: "border-amber-500/30 bg-amber-500/10", text: "text-amber-200" },
                { icon: OctagonAlert, title: "Harm", note: "Data leaked, action taken, trust damaged", color: "border-red-500/30 bg-red-500/10", text: "text-red-200" },
              ].map((step, i, arr) => (
                <div key={step.title} className="flex flex-col md:flex-row items-center gap-3 flex-1">
                  <div className={`w-full rounded-xl border p-4 text-center flex-1 ${step.color}`}>
                    <step.icon className={`w-6 h-6 mx-auto mb-2 ${step.text}`} />
                    <p className={`font-semibold text-sm ${step.text}`}>{step.title}</p>
                    <p className="text-xs text-white/50 mt-1 leading-snug">{step.note}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <>
                      <ChevronRight className="hidden md:block w-5 h-5 text-white/30 shrink-0" />
                      <ChevronDown className="md:hidden w-5 h-5 text-white/30 shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/50 mt-5 leading-relaxed">
              Break any link and the chain fails: don't feed it untrusted text without marking it, limit what the model
              can do, gate the tool call, check the output.
            </p>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Concretely, the outcomes fall into three groups. The first is <span className="text-blue-200">leakage</span>:
              the system reveals something it should not. That might be its hidden instructions, which often contain
              business logic and sometimes things that should never have been put there. It might be data from the
              current context, such as another customer's record that was retrieved for a different purpose, or a
              credential sitting in a configuration the model can see.
            </p>
            <p>
              The second is <span className="text-blue-200">unwanted action</span>. As soon as a model can call tools,
              an injected instruction can turn into a real operation: an email sent, a record changed, a file shared, a
              ticket closed, a link fetched that quietly carries data out in its address. This is where prompt injection
              stops being a content problem and becomes a security incident.
            </p>
            <p>
              The third is <span className="text-blue-200">harmful or off-brand output</span>: offensive text, false
              claims presented as the company's position, advice the product must not give, or content that breaks
              policy. Lower in technical severity, often higher in reputational cost.
            </p>
            <p>
              The rule of thumb I use is simple: impact grows with the tools the system can use. A read-only chatbot
              with no access to private data has a small blast radius. An agent that can read an inbox, browse the web
              and send messages has a very large one. Your test effort should scale the same way.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="catalogue" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Tester's Catalogue</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              You do not need to be a security researcher to build good adversarial tests. You need categories, so that
              your coverage is deliberate instead of a handful of clever tricks someone saw online. Here is the
              catalogue I work from. Each row describes the idea in plain words, what a well-built system does in
              response, and how to turn it into a test. None of it requires a magic phrase; the point is the category,
              and you design your own harmless variations for your own system.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-500/25 mb-6">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="bg-blue-500/10 text-blue-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Attack type</th>
                  <th className="text-left px-4 py-3 font-semibold">The idea, in plain words</th>
                  <th className="text-left px-4 py-3 font-semibold">What a safe system does</th>
                  <th className="text-left px-4 py-3 font-semibold">How to test it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {catalogue.map((row) => (
                  <tr key={row.type} className="align-top">
                    <td className="px-4 py-3 text-blue-200 font-semibold">{row.type}</td>
                    <td className="px-4 py-3 text-white/70">{row.idea}</td>
                    <td className="px-4 py-3 text-white/60">{row.safe}</td>
                    <td className="px-4 py-3 text-white/60">{row.test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A few notes on using it. <span className="text-white/90">Instruction override</span> and{" "}
              <span className="text-white/90">role-play framing</span> are the direct-injection staples. They are worth
              testing mostly to understand how firmly the system holds its rules, and to make sure nothing important
              depends on the model "choosing" to behave.
            </p>
            <p>
              <span className="text-white/90">Hidden instructions in content</span> is the heart of indirect injection,
              and the most valuable category for most products. The safe way to test it is with harmless markers: an
              instruction planted in a test document that asks the model to do something visible but benign, like
              adding an unusual word to its answer. If the marker shows up in the output, the system obeyed content it
              should have treated as data, and you have proven the channel exists without causing any harm.
            </p>
            <p>
              <span className="text-white/90">Data-exfiltration</span> and <span className="text-white/90">tool misuse</span>{" "}
              tests depend on canaries: fake secrets, fake customer records and dummy tools in the test environment
              whose only job is to be noticed if they leak or get called. You never need real data to prove a leak.
            </p>
            <p>
              <span className="text-white/90">Multi-step attacks</span> matter because many teams only test single
              turns. Rules that hold on the first message sometimes erode over a long conversation or a long agent
              run. <span className="text-white/90">Encoding and formatting tricks</span> test whether defenses rely on
              surface wording. If a filter only catches one phrasing in one language, it is a speed bump, not a
              defense.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="attacks-to-tests" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Turning Attacks Into Tests</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Poking at a chatbot for an afternoon finds bugs. It does not protect you next month, when someone edits
              the system prompt, swaps the model or adds a new tool. For that you need the attacks to live as tests: a
              versioned, repeatable adversarial set that runs whenever something changes.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                t: "Write each case with an expected safe behavior",
                d: "Not just the input, but what 'passing' means: refuses, ignores the embedded instruction, asks for confirmation, makes no tool call, never mentions the canary value.",
              },
              {
                n: "2",
                t: "Tag it by category and channel",
                d: "Catalogue category plus entry point (chat, uploaded file, retrieved page, tool result). Gaps in coverage become obvious when you count by tag.",
              },
              {
                n: "3",
                t: "Check behavior, not wording",
                d: "Assert on properties you can observe automatically: tool calls made, canary strings present, refusal detected, output format valid. Use human review for the cases that need judgment.",
              },
              {
                n: "4",
                t: "Run it on every prompt, model or tool change",
                d: "Treat the adversarial set like a regression suite. A system prompt edit is a code change and deserves the same safety net.",
              },
              {
                n: "5",
                t: "Repeat the important cases",
                d: "Model output can vary between runs. A case that passes once may fail on another attempt, so run high-impact cases several times and record the pass rate, not a single result.",
              },
              {
                n: "6",
                t: "Track results over time",
                d: "Keep the history. A category that slowly gets worse across releases is a finding, even if no single run looks alarming.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-300 font-mono text-sm flex items-center justify-center shrink-0">
                  {s.n}
                </span>
                <div>
                  <p className="text-white/90 font-semibold text-sm mb-1">{s.t}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Point five deserves extra emphasis because it is where classic test thinking misleads us. In a
              deterministic system, one pass means the behavior is there. With a language model, one pass means the
              behavior happened once. If a case protects something that matters, such as customer data or the ability to
              send messages, run it enough times to be confident, and treat any failure as real even if the next run
              passes. "It only happens sometimes" is not reassuring when an attacker can simply try again.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="defenses" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Defenses to Look For, and Why None Is Complete</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Testers are not usually the ones building defenses, but knowing them makes your tests sharper. Each
              defense suggests specific checks, and each has a known limit that tells you where to push. When I review
              an AI feature, these are the five I look for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {defenses.map((d) => (
              <div key={d.name} className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5">
                <p className="text-emerald-300 font-semibold text-sm mb-2">{d.name}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{d.what}</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  <span className="text-amber-300/80 font-semibold">Limit: </span>
                  {d.limit}
                </p>
              </div>
            ))}
            <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-5 flex flex-col justify-center">
              <p className="text-blue-200 font-semibold text-sm mb-2">The honest summary</p>
              <p className="text-white/70 text-sm leading-relaxed">
                No single defense is a guarantee. Layers make attacks harder and failures smaller. That is the realistic
                goal.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The most important of these, in my view, is least privilege, because it works even when everything else
              fails. If the summarization feature has no ability to send email, no injected instruction can make it send
              email. That is why my first question about any AI feature is not "how good is the prompt?" but "what can
              this thing touch?" A tester can often find a serious risk just by reading the list of tools and
              permissions, before writing a single adversarial input.
            </p>
            <p>
              Be wary of any claim that the system is "protected against prompt injection" in absolute terms. Filters,
              classifiers and careful prompts all reduce the problem. None of them make the model incapable of being
              steered by text, because reading and acting on text is what the model is for. Your role is to test how
              well the layers work together and to make sure the team understands the residual risk.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="reporting" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What to Report</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              A prompt injection finding is easy to dismiss if it is written badly. "I made the bot say something weird"
              invites a shrug. A clear finding connects the input to the behavior to the impact, and gives the team
              something to do about it. I use four parts.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/25 overflow-hidden mb-6">
            <div className="bg-blue-500/10 px-5 py-3 text-xs uppercase tracking-widest text-blue-200/80 font-semibold">
              Finding template
            </div>
            <div className="divide-y divide-white/10">
              {[
                ["Input", "Where the text entered (chat, uploaded file, retrieved page, tool result), a safe description of what it contained, and the session context. Share the exact test input privately with the team, not in public channels."],
                ["Behavior", "What the system did, with evidence: the output, the tool calls from the logs, and how many times out of how many runs it happened."],
                ["Impact", "What an attacker could realistically achieve with this in production: which data, which action, which users. Be specific and avoid exaggeration."],
                ["Suggested mitigation", "The layer you think would help most: remove a permission, add an approval gate, mark the content as data, add an output check. A suggestion, not a demand."],
              ].map(([k, v]) => (
                <div key={k} className="grid md:grid-cols-[180px_1fr] gap-2 px-5 py-4">
                  <p className="text-blue-200 font-semibold text-sm">{k}</p>
                  <p className="text-white/65 text-sm leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Severity should follow impact, not cleverness. A long, inventive conversation that makes the model write a
              rude poem is a low-severity finding. A single planted sentence in a shared document that makes an agent
              share a file outside the organization is high severity, however simple it looks.
            </p>
            <p>
              Handle findings responsibly. Report through the agreed channel, usually the security team or the
              product's owner, and keep working exploit details out of public tickets, chat rooms and demos. If you
              found it in a third-party product you are authorized to test, follow that vendor's disclosure process.
              The goal is to get the problem fixed, not to prove how clever the test was.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Prompt injection is not an exotic topic for specialists. It is the natural consequence of building
              software that takes orders in natural language and reads text from the world. Any tester who works on an
              AI feature is already standing next to it.
            </p>
            <p>
              The good news is that the tester's core skills transfer directly. Mapping input surfaces, thinking in
              categories, writing expected results, running regressions, writing clear findings: that is the whole
              discipline. What changes is that the inputs are sentences and the expected results are behaviors.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-white/90 font-semibold mb-4">Start this week</p>
            <div className="space-y-3">
              {[
                "List every source of text your AI feature reads, not just the chat box",
                "List every tool and permission it has, and ask which ones it actually needs",
                "Write one harmless test case per catalogue category for your highest-impact entry point",
                "Add the set to the pipeline and run high-impact cases several times per change",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-lg font-semibold">
              You can't make a language model deaf to instructions. You can make sure it can't do much harm when it
              listens to the wrong ones.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Testing an AI feature before it reaches users?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about adversarial test sets, safe test design and how to make AI features hold their rules.
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

export default PromptInjectionTestersBlog;
