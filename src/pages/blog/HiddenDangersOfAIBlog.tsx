import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  ShieldAlert,
  VenetianMask,
  Scale,
  Building2,
  Newspaper,
  CheckCircle2,
  Landmark,
  Github,
  AlertTriangle,
} from "lucide-react";

/**
 * Blog: The Hidden Dangers and Growing Problems of AI Technology — And What We Must Do About It
 * Slug: /blog/hidden-dangers-of-ai
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

const HiddenDangersOfAIBlog = () => {
  const navigate = useNavigate();

  // Local fallback for the shared goHome() nav helper used across blogs.
  // Replace with your existing shared import if you already have one centralized (e.g. src/lib/navigation.ts)
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
    title: "The Hidden Dangers and Growing Problems of AI Technology — And What We Must Do About It | Digital Jaydeep",
    description:
      "AI is failing silently in ways most people never notice — black-box errors, deepfake fraud, biased gatekeeping, collapsing startups, and eroding truth. A practical look at the real risks and what builders, users, and regulators should do about it.",
    keywords:
      "AI risks, AI safety, AI dangers, deepfakes, AI bias, responsible AI, AI regulation, black box AI, AI fraud, voice cloning scams",
    canonicalUrl: "https://jaydeepai.github.io/blog/hidden-dangers-of-ai",
    ogImage: "https://jaydeepai.github.io/og/hidden-dangers-of-ai.png",
    schema: {
      "@type": "BlogPosting",
      headline: "The Hidden Dangers and Growing Problems of AI Technology — And What We Must Do About It",
      datePublished: "2026-07-13",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "black-box", label: "When AI Systems Fail Silently" },
    { id: "weaponized-ai", label: "AI as a Weapon: Deepfakes and Voice Cloning" },
    { id: "invisible-gatekeeping", label: "When AI Decides Your Future" },
    { id: "startup-fragility", label: "The Fragility of the AI Startup Economy" },
    { id: "erosion-of-truth", label: "AI and the Erosion of Truth" },
    { id: "protect-yourself", label: "A Practical Playbook for Protecting Yourself" },
    { id: "regulation", label: "What Real Regulation Should Look Like" },
    { id: "conclusion", label: "Conclusion: Building AI That Deserves Trust" },
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
            AI Safety Series · July 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Responsible AI
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Risk &amp; Governance
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          The Hidden Dangers and Growing Problems of AI Technology — And What We Must Do About It
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          AI rarely fails with a bang. It fails quietly — in a misread scan, a frozen bank account, a cloned voice on the
          phone — long before anyone is watching.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> July 13, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 14 min read
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
          "The public assumes AI is precise, objective, and reliable. The reality is far more fragile — and the gap
          between the two is where the damage happens."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            AI is now woven into everyday decisions — the phone in your pocket, the thermostat on your wall, the systems
            banks, hospitals, schools, and police departments use to decide who gets approved, flagged, hired, or
            treated first. The pitch is always the same: more convenience, more efficiency, more personalization. What
            rarely makes the pitch deck is how often these systems fail, who absorbs the cost when they do, and how
            little recourse most people have when an algorithm gets it wrong.
          </p>
          <p>
            None of this is an argument against building with AI — it's the opposite. Builders who understand exactly
            where these systems break are the ones who end up building things people can actually trust. This is a
            tour of the failure modes that matter most right now, and a practical playbook for individuals, builders,
            and regulators to reduce the damage.
          </p>
        </div>

        {/* Section 1 — Black Box Problem */}
        <section id="black-box" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">When AI Systems Fail Silently</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Most people assume AI is precise because it feels mathematical. In practice, AI systems misfire, mishear,
              misinterpret, and hallucinate — often with real consequences attached. Smart-home platforms lean on
              cloud servers that vanish the moment a company pivots or shuts down, turning working locks, cameras, and
              thermostats into expensive paperweights overnight. This has already happened repeatedly across the smart
              home industry, and it will keep happening as venture-funded hardware companies burn through runway.
            </p>
            <p>
              The pattern shows up everywhere the stakes are higher. Legal-research chatbots have fabricated case law
              that made it into real court filings. Fraud-detection models have frozen legitimate bank accounts with no
              clear appeal path. Facial recognition used by law enforcement has misidentified innocent people, leading
              to wrongful arrests. Diagnostic tools have misread scans. Hiring algorithms have filtered out qualified
              candidates because their resumes didn't pattern-match the training data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-white/40 font-semibold mb-2">What Users Assume</p>
              <p className="text-white/70 text-sm">
                "The system ran the numbers — it must be objective, consistent, and correct."
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-blue-300 font-semibold mb-2">What Actually Happens</p>
              <p className="text-white/70 text-sm">
                A black-box model makes a call even its own creators can't fully explain — and there's often no clean
                way to challenge it.
              </p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-blue-300 font-semibold">The core issue: </span>
              these aren't isolated bugs — they're symptoms of systems that make consequential decisions without
              being able to show their work. Explainability isn't a nice-to-have feature; it's the difference between
              a system you can debug and one you can only hope behaves.
            </p>
          </div>
        </section>

        {/* Section 2 — Weaponized AI */}
        <section id="weaponized-ai" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <VenetianMask className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI as a Weapon: Deepfakes and Voice Cloning</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Criminals adopted AI faster than most enterprises did. Voice-cloning scams are the clearest example —
              a few seconds of audio lifted from a social post is now enough to convincingly mimic a family member or
              an executive. Victims have wired money, leaked confidential data, and fallen for fabricated kidnapping
              hoaxes built entirely on a cloned voice and a sense of urgency.
            </p>
            <p>
              Deepfake video is closing the same gap for anything that used to rely on "seeing is believing."
              Fraudulent emails, fake government notices, synthetic dating profiles, and personalized investment scams
              can now be mass-produced with flawless grammar and individualized targeting — at a cost and speed that
              makes traditional scam detection increasingly unreliable. The line between real and synthetic is
              thinning faster than most people's instincts have adjusted to.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">Why this matters for builders: </span>
              any product that accepts voice, video, or "familiar sender" as a trust signal is now working against an
              adversary that can fake all three cheaply. Identity verification needs a second, independent channel —
              not a better version of the first one.
            </p>
          </div>
        </section>

        {/* Section 3 — Invisible Gatekeeping */}
        <section id="invisible-gatekeeping" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">When AI Decides Your Future</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              AI increasingly sits behind the decisions that shape people's lives — who gets hired, who gets a loan,
              who gets flagged for investigation, who gets into school, who gets treated first in an ER. These systems
              are trained on historical data, and historical data carries historical bias. The result is that the bias
              doesn't disappear when it's automated — it gets replicated at scale, with a veneer of objectivity that
              makes it harder to challenge.
            </p>
            <p>
              Because the decision is automated, the person on the receiving end often has no visibility into why they
              were rejected and no clear path to appeal it. The gatekeeper becomes invisible, and invisible gatekeepers
              are effectively unaccountable ones.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Decision Domain</th>
                  <th className="text-left px-5 py-3 font-semibold">Documented Bias Pattern</th>
                  <th className="text-left px-5 py-3 font-semibold">Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Hiring</td>
                  <td className="px-5 py-3 text-white/70">Resume screeners undervalue nontraditional career paths</td>
                  <td className="px-5 py-3 text-white/50">Qualified candidates filtered out pre-interview</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Lending</td>
                  <td className="px-5 py-3 text-white/70">Risk models correlate proxies with protected classes</td>
                  <td className="px-5 py-3 text-white/50">Unequal credit access, little explanation given</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Policing</td>
                  <td className="px-5 py-3 text-white/70">Facial recognition error rates skew by demographic</td>
                  <td className="px-5 py-3 text-white/50">Wrongful stops and arrests</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-purple-300 font-medium">Housing</td>
                  <td className="px-5 py-3 text-white/70">Tenant-screening tools weight income/neighborhood proxies</td>
                  <td className="px-5 py-3 text-white/50">Discriminatory rejections, hard to trace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 — Startup Fragility */}
        <section id="startup-fragility" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Fragility of the AI Startup Economy</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The AI startup boom cuts both ways. Thousands of new companies launch every year promising to store your
              photos, documents, financial records, or voiceprints more intelligently — and a large share of them will
              be gone within a few years when funding dries up or the business model doesn't hold. When that happens,
              consumers often lose access with little warning.
            </p>
            <p>
              The deeper problem is what happens to the data left behind. In bankruptcy proceedings, customer data is
              frequently treated as a sellable asset, sometimes with weak privacy protections attached to the sale.
              Companies come and go; the personal data people handed them in good faith can end up outliving the
              company by years, repurposed in ways the original user never agreed to.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mt-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-orange-300 font-semibold">The asymmetry: </span>
              a startup can disappear in a quarter. The data it collected — and the decisions built on top of it — can
              persist indefinitely. That mismatch is the actual risk, not the failure of any single company.
            </p>
          </div>
        </section>

        {/* Section 5 — Erosion of Truth */}
        <section id="erosion-of-truth" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI and the Erosion of Truth</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Generative AI has collapsed the cost of producing convincing fake content to nearly zero — fabricated
              news stories, invented research citations, synthetic political narratives, manipulated photos and video.
              Social platforms amplify whatever gets engagement, and fact-checking simply can't move as fast as
              generation does.
            </p>
            <p>
              The damage isn't limited to any one fake story going viral. It's the second-order effect: as synthetic
              content becomes harder to distinguish from real, people's baseline trust in institutions — and in the
              idea of a verifiable, shared truth — erodes. That's a slower, harder-to-reverse cost than any single
              piece of misinformation.
            </p>
          </div>
        </section>

        {/* Section 6 — Protect Yourself */}
        <section id="protect-yourself" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">A Practical Playbook for Protecting Yourself</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            We can't slow AI's advance, but individuals aren't powerless while regulation catches up. A few habits go
            a long way:
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Favor local control over cloud dependency",
                desc: "Where possible, choose smart devices that keep working offline — don't let a company's survival be a single point of failure for your home.",
              },
              {
                title: "Verify through a second channel",
                desc: "An unusual call, message, or video — even from someone familiar — should be confirmed another way before you act on it.",
              },
              {
                title: "Treat AI output as a draft, not a fact",
                desc: "Double-check anything legal, medical, financial, or safety-related before relying on it.",
              },
              {
                title: "Limit what you hand over",
                desc: "Read the privacy policy before feeding sensitive data into an AI tool, especially from an early-stage company with an uncertain future.",
              },
              {
                title: "Lock down the basics",
                desc: "Multi-factor authentication, current software, and avoiding public Wi-Fi for sensitive tasks still stop most opportunistic attacks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 bg-green-500/5 border border-green-500/15 rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 — Regulation */}
        <section id="regulation" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Real Regulation Should Look Like</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Individual habits only go so far. Meaningful consumer protection needs to come from policy, and the gap
            today is wide. Five priorities would move the needle most:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Priority</th>
                  <th className="text-left px-5 py-3 font-semibold">What It Requires</th>
                  <th className="text-left px-5 py-3 font-semibold">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Transparency &amp; explainability</td>
                  <td className="px-5 py-3 text-white/70">Disclose how decisions are made and what data drives them</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Device continuity guarantees</td>
                  <td className="px-5 py-3 text-white/70">Hardware stays functional if a company shuts down its cloud</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 text-xs">Medium</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Independent audits in high-stakes AI</td>
                  <td className="px-5 py-3 text-white/70">Mandatory fairness audits for hiring, lending, policing</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs">High</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">Biometric data protection</td>
                  <td className="px-5 py-3 text-white/70">Ban the resale of voiceprints and facial data in bankruptcy sales</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 text-xs">Medium</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-white font-medium">National AI safety standards</td>
                  <td className="px-5 py-3 text-white/70">Baseline safeguards against deepfakes and infrastructure risk</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-xs">Foundational</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Conclusion: Building AI That Deserves Trust</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              AI's upside is real, and none of the failure modes above are an argument for stopping. They're an
              argument for building differently — with explainability, verification, and accountability treated as
              core requirements, not afterthoughts bolted on after something breaks.
            </p>
            <p>
              As individuals, that means staying skeptical of anything that feels too seamless. As an industry, it
              means demanding audits, transparency, and continuity guarantees before scale, not after harm. The
              systems we're building today will make decisions about people's lives for years to come — the work is
              to make sure those decisions stay explainable, contestable, and ultimately answerable to the humans they
              affect.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Building something that needs to be trusted?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about designing AI systems with explainability and accountability built in from day one.
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

export default HiddenDangersOfAIBlog;
