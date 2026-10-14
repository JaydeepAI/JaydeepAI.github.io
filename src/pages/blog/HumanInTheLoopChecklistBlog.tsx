import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Github,
  Scale,
  ShieldAlert,
  Split,
  Eye,
  Brain,
  FileText,
  ClipboardCheck,
  Square,
} from "lucide-react";

/**
 * Blog: The Human-in-the-Loop Checklist for AI Automation
 * Slug: /blog/human-in-the-loop-checklist-for-ai-automation
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

const HumanInTheLoopChecklistBlog = () => {
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
    title: "The Human-in-the-Loop Checklist for AI Automation | Digital Jaydeep",
    description:
      "Approval gates protect you, until they become a rubber stamp. How to decide where a human must sign off on AI automation, which gate type fits each action, how to design reviews people actually read, and a checklist you can copy.",
    keywords:
      "human in the loop, AI safety, automation governance, approval gates, automation bias, AI agents, AI review process",
    canonicalUrl: "https://jaydeepai.github.io/blog/human-in-the-loop-checklist-for-ai-automation",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "The Human-in-the-Loop Checklist for AI Automation",
      datePublished: "2026-10-27",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "two-failure-modes", label: "The Two Failure Modes" },
    { id: "which-actions", label: "Which Actions Need a Gate" },
    { id: "gate-types", label: "Gate Types" },
    { id: "reviews-that-get-read", label: "Design Reviews That Get Read" },
    { id: "automation-bias", label: "Avoid Automation Bias" },
    { id: "logging", label: "Logging and Accountability" },
    { id: "checklist", label: "The Checklist" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const gateRows = [
    {
      action: "Read-only",
      example: "Summarize test results, search logs, read tickets",
      gate: "No gate, log only",
      chip: "bg-green-500/15 text-green-300 border-green-500/30",
    },
    {
      action: "Internal draft",
      example: "Draft a bug report, propose a test plan, suggest a fix",
      gate: "Review after, easy discard",
      chip: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    },
    {
      action: "External message",
      example: "Reply to a customer, post in a shared channel, email a vendor",
      gate: "Approve before action",
      chip: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    },
    {
      action: "Data change",
      example: "Update ticket fields, change test data, edit records",
      gate: "Approve before, or review after with rollback",
      chip: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    },
    {
      action: "Irreversible",
      example: "Delete data, close accounts, deploy to production",
      gate: "Approve before, named approver, two-step confirm",
      chip: "bg-red-500/15 text-red-300 border-red-500/30",
    },
    {
      action: "Spending",
      example: "Buy, refund, start paid jobs, raise usage limits",
      gate: "Approve before, hard budget cap",
      chip: "bg-red-500/15 text-red-300 border-red-500/30",
    },
  ];

  const auditLog = `Illustrative approval log entry

action_id:      draft-email-0142
proposed_by:    release-notes-assistant
action_type:    external_message
summary:        Send release notes to the partner mailing list
evidence:       diff of notes vs last release, list of included tickets
gate:           approve_before_action
decision:       approved_with_edits
decided_by:     named reviewer (not a shared account)
decided_at:     timestamp
edits:          removed one ticket still marked "in progress"
rollback_path:  not possible after send (external, irreversible)`;

  const checklist = [
    "Every automated action is classified by type: read, draft, external, data change, irreversible, spending.",
    "Irreversible, external, costly and regulated actions require approval before they happen.",
    "Reversible actions have a tested rollback path before they run without a gate.",
    "Low-confidence results escalate to a human instead of proceeding.",
    "The review screen shows the proposed action, the evidence and the diff in one view.",
    "The safe choice is the default; approving requires a deliberate action.",
    "Review volume is sized so a person can genuinely read each item.",
    "Seeded checks are mixed in to keep reviewers attentive.",
    "Every approval records who, when, what and based on which evidence.",
    "Each automation has a named human owner who reviews its logs.",
    "Gates are reviewed regularly: remove the ones nobody needs, add the ones incidents reveal.",
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
            AI Safety Series · October 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Human-in-the-Loop
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Automation Governance
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          The Human-in-the-Loop Checklist for AI Automation
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          Adding a human to the loop is easy. Making sure that human is actually paying attention is the real design
          problem.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> October 27, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 12 min read
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
        <blockquote className="border-l-4 border-orange-400/50 pl-6 py-1 italic text-xl md:text-2xl font-light text-white/80 mb-10">
          "A review nobody reads is worse than no review. It adds risk and a false sense of safety."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            "We'll keep a human in the loop" has become the default answer to every question about AI automation. Will
            the agent send emails? Human in the loop. Will it update tickets? Human in the loop. Will it touch
            production data? Human in the loop. The phrase sounds responsible, and it ends the conversation. That is
            the problem. It ends the conversation before anyone has asked where the human sits, what they see, how many
            items they review, and whether they have any realistic chance of spotting a mistake.
          </p>
          <p>
            As a tester, I look at approval gates the way I look at any control: does it actually catch the failure it
            claims to catch? Many do not. This article is about placing gates deliberately, choosing the right kind of
            gate for each action, and designing reviews for human attention rather than for an audit checkbox. It ends
            with a checklist you can copy into your own team's documentation.
          </p>
        </div>

        {/* Section 1 */}
        <section id="two-failure-modes" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Two Failure Modes</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Human oversight of automation fails in two opposite directions, and teams usually swing from one to the
              other.
            </p>
            <p>
              The first is no oversight. A workflow or agent is given permission to act, it works well in the demo, and
              it goes live with nobody checking what it does. Mistakes are discovered by the people they affect: a
              customer who got a wrong message, a colleague whose ticket was closed, a dataset that was quietly changed.
            </p>
            <p>
              The second is over-oversight. After an incident, every action needs approval. The approval queue grows.
              Reviewers learn that nearly everything in it is fine. They start approving in batches, then without
              opening the details, then on reflex. The gate still exists on paper, and everyone feels safer, but it no
              longer catches anything. This second failure is the more dangerous one, because it looks like control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-red-300 font-semibold mb-2">Failure mode 1: No gate</p>
              <p className="text-white/70 text-sm">
                Automation acts freely. Errors are found by whoever they hurt, usually late and usually outside the
                team.
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-orange-300 font-semibold mb-2">
                Failure mode 2: Rubber stamp
              </p>
              <p className="text-white/70 text-sm">
                Everything needs approval, so nothing gets real attention. The gate becomes a click, and the click
                becomes a liability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="which-actions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Which Actions Need a Gate</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              The way out of both failure modes is to stop treating "AI did something" as one category. Gates belong on
              specific kinds of actions, chosen by consequence, not by how nervous the technology makes people feel.
              Six properties tell you an action deserves a human.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Irreversible", desc: "Cannot be undone, or undoing it is expensive." },
              { label: "External-facing", desc: "Reaches customers, partners or the public." },
              { label: "Costly", desc: "Spends money or consumes paid resources." },
              { label: "Regulated", desc: "Touches areas with legal or compliance rules." },
              { label: "Low-confidence", desc: "The system itself signals uncertainty." },
              { label: "Other people's data", desc: "Changes records or work owned by someone else." },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-red-300 text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Just as important is the list of actions that do not need a pre-approval gate. Reading data, summarizing
              results, drafting something a human will see before it goes anywhere: these are low risk when the output
              stays internal and can be discarded. Putting approval gates on them is how you train reviewers to click
              through. Save attention for where it matters.
            </p>
            <p>
              A useful exercise is to list every action an automation can take and tag each one with the six
              properties above. Most teams find that a small number of actions carry nearly all of the risk. Those are
              where the human belongs. The long tail of reads, summaries and drafts can run with logging alone, which
              frees reviewers to give real attention to the handful of decisions that can hurt someone.
            </p>
            <p>
              Watch out for actions that change category depending on context. Updating a ticket field in a test project
              is a reversible internal change. The same update on a customer-visible ticket is external. Sending a
              message to your own team is low risk; the same message routed to a partner channel is not. Classify by
              where the effect lands, not by the name of the function being called.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="gate-types" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Split className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Gate Types</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              "Human in the loop" is not one design. There are at least four distinct gate types, and choosing the right
              one is most of the work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              {
                name: "Approve before action",
                desc: "Nothing happens until a person says yes. Strongest control, highest cost in attention and delay. Reserve it for irreversible, external or costly actions.",
              },
              {
                name: "Review after, with easy rollback",
                desc: "The action happens, a person reviews it soon after, and undoing it is one click. Good for reversible internal changes where speed matters.",
              },
              {
                name: "Sampled review",
                desc: "A person reviews a random share of actions rather than all of them. Useful for high-volume, low-risk work where you still want to detect drift.",
              },
              {
                name: "Escalation on low confidence",
                desc: "The system proceeds when it is confident and routes uncertain cases to a person. Only as good as the confidence signal, so validate that signal first.",
              },
            ].map((g, i) => (
              <div key={g.name} className="bg-cyan-500/5 border border-cyan-500/15 rounded-2xl p-5">
                <p className="text-cyan-300 font-semibold text-sm mb-2">
                  <span className="text-white/30 font-mono mr-2">G{i + 1}</span>
                  {g.name}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            A common mistake is treating these as a ladder where "approve before" is always the safest. It is the
            safest only if the approver is paying attention. A well-run review-after gate with a tested one-click
            rollback can protect you better than an approve-before gate that people click through. Rollback has to be
            real, though: try it before you rely on it, the same way you would test a backup by restoring it.
          </p>

          <p className="text-white/70 leading-relaxed mb-6">
            Put the action properties and the gate types together and you get a simple mapping. This is the table I
            would start from for most teams automating QA and engineering work. Adjust it to your own risks, but make
            the mapping explicit and written down.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-orange-500/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-500/10 text-orange-200/80 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Action type</th>
                  <th className="text-left px-5 py-3 font-semibold">Examples</th>
                  <th className="text-left px-5 py-3 font-semibold">Gate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {gateRows.map((row) => (
                  <tr key={row.action}>
                    <td className="px-5 py-4 text-white font-medium align-top">{row.action}</td>
                    <td className="px-5 py-4 text-white/60 align-top">{row.example}</td>
                    <td className="px-5 py-4 align-top">
                      <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${row.chip}`}>
                        {row.gate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section id="reviews-that-get-read" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Design Reviews That Get Read</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Once a gate is in the right place, the next question is whether the reviewer can do their job. Most
              approval screens are designed for the system, not for the person. They show a title and two buttons. The
              actual change is three clicks away. The evidence is somewhere else entirely.
            </p>
            <p>
              A review that gets read puts three things in one view: the proposed action in plain words, the evidence
              that led to it, and the exact change, as a diff where possible. If a reviewer has to go hunting for
              context, most of the time they will not.
            </p>
            <p>
              Make the safe choice the default. Rejecting, or doing nothing, should be the easy path. Approving should
              require a deliberate action, ideally after the details are visible. For high-risk actions, ask for a short
              reason when approving. That one sentence is surprisingly effective at turning a reflex into a decision.
            </p>
            <p>
              Keep the volume humane. If a reviewer faces a long queue every morning, attention will collapse no matter
              how good the screen is. When volume grows, the answer is not "review faster". It is to move low-risk
              actions to sampled review, improve the automation so fewer items need a human, or add reviewers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-3">Rubber-stamp screen</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Title only, details behind a link</li>
                <li>"Approve all" button at the top</li>
                <li>No evidence shown</li>
                <li>Approve is the highlighted default</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-orange-300 font-semibold mb-3">Review that gets read</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Action, evidence and diff in one view</li>
                <li>One item at a time for high-risk actions</li>
                <li>Reason required to approve</li>
                <li>Reject or "do nothing" is the default</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="automation-bias" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Avoid Automation Bias</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Automation bias is the well-known human tendency to over-trust a machine's suggestion, especially when it
              is presented confidently and is usually right. Language models make this worse in a specific way: their
              output is fluent, structured and calm whether it is correct or not. A wrong recommendation looks exactly
              like a right one.
            </p>
            <p>
              The trap is that good automation trains people to stop checking. If a reviewer approves a long run of
              correct suggestions, their brain reasonably concludes that checking is a waste of time. Then the one bad
              suggestion arrives looking exactly like the others.
            </p>
            <p>
              Testers have a tool for this: seeded defects. Occasionally insert a known-bad item into the review queue,
              clearly tracked by the system, and see whether it gets caught. The point is not to trick or punish anyone.
              It is to keep reviewers sharp and to measure whether the gate is working at all. If seeded items sail
              through, you have learned that your gate is a rubber stamp, and you have learned it safely.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-purple-300 font-semibold">Other habits that help: </span>
              show the system's uncertainty when it has a meaningful signal, rotate reviewers so nobody reviews the same
              stream forever, and occasionally ask reviewers to explain an approval out loud. Explaining is the fastest
              way to notice you did not really look.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="logging" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Logging and Accountability</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A gate without a record is a gate you cannot learn from. Every approval and rejection should capture who
              decided, when, what exactly they approved, and what evidence they were shown. Not a shared service
              account: a named person.
            </p>
            <p>
              This is not about blame. It is about being able to answer, after something goes wrong, the questions any
              good incident review asks. Did the reviewer see the information they needed? Was the action they approved
              the action that actually ran? Was the gate even triggered? Without a log, those questions turn into
              guesswork and opinion.
            </p>
            <p>
              Logs also tell you where to tune. Gates where nearly everything is approved unchanged may be candidates for
              sampled review. Gates where reviewers often edit or reject the proposal are telling you the automation is
              not ready to run with less oversight.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden mt-6">
            <div className="px-5 py-2.5 border-b border-white/10 text-xs text-white/40 font-mono">
              approval-log-entry — illustrative
            </div>
            <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-cyan-100/90 font-mono">
              <code>{auditLog}</code>
            </pre>
          </div>
        </section>

        {/* Section 7 */}
        <section id="checklist" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Checklist</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Here is everything above condensed into a checklist you can copy. Run through it before any AI automation
            is allowed to act on its own, and again whenever its permissions grow.
          </p>

          <div className="bg-[#0b0f1f] border-2 border-dashed border-orange-500/40 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-500/20">
              <p className="text-orange-300 font-bold tracking-wide uppercase text-sm">Human-in-the-Loop Checklist</p>
              <p className="text-white/30 text-xs font-mono">copy · print · pin</p>
            </div>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Square className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-white/75 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-orange-500/20 text-xs text-white/40">
              <p>Automation owner: ____________________</p>
              <p>Last reviewed: ____________________</p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mt-6">
            If you can only adopt three items this week, pick these: classify actions by type, put approval before
            anything irreversible or external, and give every automation a named owner. Those three alone remove most
            of the ways human oversight quietly fails.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Human-in-the-loop is not a feature you switch on. It is a design that has to be placed, sized and tested
              like any other control. Too few gates and mistakes reach people who never agreed to be your test
              environment. Too many and every gate turns into a reflex that protects nobody.
            </p>
            <p>
              The pattern that works is simple to describe and takes discipline to keep: classify actions by
              consequence, match each to the lightest gate that genuinely controls it, design the review for real
              attention, check that attention with seeded items, and keep a record you can learn from. As automation
              takes on more of our work, the scarcest resource in the loop will be human judgment. Spend it carefully.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-orange-200 text-lg font-semibold">
              Put the human where judgment is needed, not where clicking is easy.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Designing approval gates for your AI automation?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about putting oversight where it actually protects you, without drowning your team in clicks.
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

export default HumanInTheLoopChecklistBlog;
