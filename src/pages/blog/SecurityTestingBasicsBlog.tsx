import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  ShieldCheck,
  Scale,
  KeyRound,
  TextCursorInput,
  LockKeyhole,
  FileWarning,
  Siren,
  Ban,
  CircleCheck,
  CircleX,
  Github,
} from "lucide-react";

/**
 * Blog: Security Testing Basics for QA Engineers: Checks You Can Run Without Being a Pentester
 * Slug: /blog/security-testing-basics-for-qa-engineers
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

const SecurityTestingBasicsBlog = () => {
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
    title: "Security Testing Basics for QA Engineers: Checks You Can Run Without Being a Pentester | Digital Jaydeep",
    description:
      "You don't need to be a security specialist to catch common web risks. A beginner-friendly, ethical starter set for QA engineers: access control, input handling, sessions, error exposure and a responsible escalation path.",
    keywords:
      "security testing, QA security, OWASP Top 10, access control testing, session testing, input validation, responsible disclosure, web application security",
    canonicalUrl: "https://jaydeepai.github.io/blog/security-testing-basics-for-qa-engineers",
    ogImage: "https://jaydeepai.github.io/android-chrome-512x512.png",
    schema: {
      "@type": "BlogPosting",
      headline: "Security Testing Basics for QA Engineers: Checks You Can Run Without Being a Pentester",
      datePublished: "2026-11-15",
      author: { "@type": "Person", name: "Jaydeep Patel" },
    },
  });

  const toc = [
    { id: "quality-attribute", label: "Security Is a Quality Attribute" },
    { id: "ground-rules", label: "Ground Rules" },
    { id: "access-control", label: "Access Control" },
    { id: "input-handling", label: "Input Handling" },
    { id: "sessions", label: "Sessions and Authentication" },
    { id: "errors", label: "Errors and Exposure" },
    { id: "escalation", label: "The Escalation Path" },
    { id: "conclusion", label: "Where I've Landed" },
  ];

  const riskTable = [
    {
      area: "Access control",
      check: "Log in as user A, note a record that belongs to user B in your test data, and try to open or change it as A.",
      flag: "A can view or edit B's data, or the server returns it and only the screen hides it.",
    },
    {
      area: "Role boundaries",
      check: "Open an admin-only page or action directly while logged in as a regular test user.",
      flag: "The page loads, or the action succeeds, because only the menu link was hidden.",
    },
    {
      area: "Input handling",
      check: "Enter empty, very long, wrongly typed and unusually formatted values in each field.",
      flag: "Crashes, raw technical errors, or the input appears back on the page unescaped.",
    },
    {
      area: "Sessions",
      check: "Log out, then use the browser back button or an old bookmarked link.",
      flag: "Protected pages still load, or an old session remains usable.",
    },
    {
      area: "Authentication",
      check: "Try weak passwords, repeated wrong passwords and an expired reset link.",
      flag: "No limits, weak rules, or reset links that work more than once or never expire.",
    },
    {
      area: "Error exposure",
      check: "Trigger validation and server errors and read what comes back, on screen and in responses.",
      flag: "Stack traces, internal paths, database details or other users' data in the message.",
    },
    {
      area: "Data in transit and URLs",
      check: "Look at URLs, query strings and response bodies during normal flows.",
      flag: "Tokens, personal data or secrets in URLs or in responses the screen doesn't need.",
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-wide uppercase">
            QA &amp; Test Automation Series · November 2026
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            Security Testing
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
            OWASP
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-5">
          Security Testing Basics for QA Engineers: Checks You Can Run Without Being a Pentester
        </h1>

        <p className="text-lg text-white/60 italic mb-8">
          You already test boundaries for a living. Some of those boundaries happen to be security boundaries.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> November 15, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 13 min read
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
          "Most security bugs aren't clever. They're the boundary nobody tested."
        </blockquote>

        <div className="space-y-4 text-white/70 leading-relaxed mb-16">
          <p>
            Many QA engineers treat security as somebody else's job. There's a security team, or an annual external
            assessment, or a scanner in the pipeline, and functional testers stay in their lane. I understand the
            instinct. Security has its own vocabulary, its own tools and a reputation for being a specialist craft.
          </p>
          <p>
            But a surprising share of real-world security problems are not exotic. A user can open another user's
            invoice by changing a number in the address bar. An admin button is hidden in the interface but the action
            behind it still works for everyone. A logout doesn't actually end the session. These are boundary bugs, and
            testers find boundary bugs for a living. This article is a beginner-friendly, ethical starter set: checks you
            can run on systems you are authorised to test, with no attack tooling and no exploit code, plus a clear path
            for handing anything serious to the people whose job it is.
          </p>
        </div>

        {/* Section 1 */}
        <section id="quality-attribute" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Security Is a Quality Attribute</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              We already accept that performance, accessibility and usability are part of quality. Security belongs in
              the same list. A feature that works perfectly for the intended user but also works for the wrong user is
              not a working feature. It's a defect with a higher severity than most.
            </p>
            <p>
              That doesn't mean testers should try to replace security specialists. Think of it as layers. Developers
              own secure design and secure code. Security specialists own threat modelling, deep assessments, tooling
              and incident response. QA sits in between with a unique advantage: we already exercise every feature, in
              many roles, with many kinds of data, on every release. We are in the right place to notice when a boundary
              doesn't hold, simply because we are standing next to it more often than anyone else.
            </p>
            <p>
              The practical goal is modest. You want a handful of security-minded checks folded into the testing you
              already do, a habit of asking "who else could do this?" alongside "does this work?", and the judgment to
              stop and escalate when you find something rather than digging deeper on your own. That last part matters
              as much as the checks themselves.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="ground-rules" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ground Rules</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Before any check in this article, the rules. Security testing without permission is not testing; depending
              on where you are, it can be a serious legal problem, and it's a breach of trust either way. Even inside your
              own company, make sure the scope is clear. Testing the login form of the application you're assigned to is
              normal work. Poking at a different team's system, a production environment or a third-party service because
              you were curious is not.
            </p>
            <p>
              Use test environments and synthetic data. Never use real customer data to probe access control, and never
              try to access real users' accounts. Create your own test users in different roles and keep a note of which
              records belong to whom, so you can tell instantly when a boundary is crossed. And when you find something,
              stop. Your job is to show the door is open, not to walk through it and see how far it goes.
            </p>
          </div>

          {/* Signature visual part 2: boundary card */}
          <div className="rounded-2xl border-2 border-red-500/40 bg-gradient-to-br from-red-500/10 to-transparent p-6">
            <div className="flex items-center gap-3 mb-5">
              <Ban className="w-6 h-6 text-red-400" />
              <p className="text-red-200 text-lg font-bold tracking-wide uppercase">Escalate, don't exploit</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-emerald-300 font-semibold text-sm mb-3">Inside the line</p>
                <div className="space-y-2">
                  {[
                    "Testing systems you are explicitly authorised to test",
                    "Using test environments and your own test accounts",
                    "Confirming a boundary fails once, with minimal data",
                    "Documenting clearly and reporting promptly",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-white/70 text-sm">{x}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-red-300 font-semibold text-sm mb-3">Outside the line</p>
                <div className="space-y-2">
                  {[
                    "Anything in production without explicit approval",
                    "Accessing, copying or keeping real users' data",
                    "Chaining a finding to see how much more you can reach",
                    "Running attack tools or downloaded scripts on your own initiative",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <CircleX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <p className="text-white/70 text-sm">{x}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="access-control" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Access Control</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-8">
            <p>
              Here is the whole starter set in one place. Each row is a risk area, a simple check that fits into normal
              functional testing, and the red flag that means you should stop and report. Access control comes first in
              the table, and first in this article, because in my view it's where testers can add the most value with the
              least specialist knowledge.
            </p>
          </div>

          {/* Signature visual: risk table */}
          <div className="overflow-x-auto rounded-2xl border border-red-500/20 mb-8">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-red-500/10">
                  <th className="p-4 text-red-200 font-semibold w-36">Risk area</th>
                  <th className="p-4 text-red-200 font-semibold">Simple tester check</th>
                  <th className="p-4 text-red-200 font-semibold">Red flag</th>
                </tr>
              </thead>
              <tbody>
                {riskTable.map((r) => (
                  <tr key={r.area} className="border-t border-white/10 align-top">
                    <td className="p-4 text-white font-medium">{r.area}</td>
                    <td className="p-4 text-white/65">{r.check}</td>
                    <td className="p-4 text-red-200/80">{r.flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The central question of access control is simple: can user A see or change user B's data? To test it, you
              need at least two test users, ideally in different organisations or tenants if your product has them, and in
              different roles. Create records as each one. Then, logged in as A, try to reach B's records through every
              route you know: the normal navigation, a direct link you copied while logged in as B, a bookmarked page, a
              shared link, an export.
            </p>
            <p>
              Pay special attention to identifiers in links. If a record's address contains a simple number or a readable
              id, ask what happens when a different user opens that address. A well-built system checks, on the server,
              whether the current user is allowed to see that specific record. A poorly built one assumes that if you have
              the link, you must be entitled to it.
            </p>
            <p>
              Role boundaries deserve the same care. A common pattern is an action that's hidden in the interface for
              regular users, like a delete button or an admin settings page, while the underlying request still works
              for anyone who reaches it. Hiding a button is a usability decision, not a security control. Test the
              boundary by reaching the page or action directly as a lower-privileged test user, using only what the
              application itself exposes, and check that the server refuses.
            </p>
            <p>
              One more angle: the screen might hide data that the server still sends. If your team gives you access to
              the browser's developer tools for testing, glance at what responses contain. A user list that shows names
              only on screen but returns email addresses and phone numbers in the response is leaking, even though
              nothing looks wrong.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="input-handling" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <TextCursorInput className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Input Handling</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Input handling is the area where functional testing and security testing overlap most naturally. You
              already try empty values, maximum lengths and invalid formats. The security lens just asks you to pay
              closer attention to what the system does with the unexpected input afterwards: where it's stored, where it's
              displayed, and how it fails.
            </p>
            <p>
              Think in categories rather than specific strings. Unexpected characters: punctuation, symbols that have
              special meaning in web pages or databases, characters from other scripts, emoji. Long input: far longer than
              any real user would type. Wrong types: text where a number is expected, negative numbers, decimals where
              whole numbers are expected. Special formats: dates in odd formats, file names with unusual characters, files
              whose content doesn't match their extension. None of this requires an attack payload. Ordinary unusual
              input is enough to show whether validation exists.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { t: "Validation", d: "Is bad input rejected with a clear, friendly message, and is it validated on the server, not only in the browser?" },
              { t: "Display", d: "When stored input is shown again, on another page or to another user, does it appear as plain text, exactly as typed?" },
              { t: "Failure", d: "When something does go wrong, is the error safe and generic, or does it reveal internal details?" },
            ].map((c) => (
              <div key={c.t} className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-5">
                <p className="text-orange-300 font-semibold text-sm mb-2">{c.t}</p>
                <p className="text-white/65 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              The display check is worth expanding. If you type text that includes formatting-like characters into a
              profile field or a comment, and it later shows up on a page rendered as formatting rather than as the
              literal characters you typed, that is a red flag. You don't need to go further than noticing it. Report it
              and let the security team assess what it means.
            </p>
            <p>
              Browser-side validation is convenient for users but easy to bypass, so a mature system validates again on
              the server. If your team has an API test suite, that's a natural place to check this safely: send the same
              unusual values directly to the endpoint and confirm the server rejects them with a sensible response.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="sessions" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <LockKeyhole className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Sessions and Authentication</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              Sessions are the system's memory of who you are. Authentication is how it decided that in the first place.
              Both have edges that ordinary functional tests often skip, because the happy path, logging in and doing
              things, works fine.
            </p>
            <p>
              Start with logout. After logging out, press the back button and try to interact with what you see. Open a
              bookmarked page that requires login. Try the same in a second tab that was open before you logged out. A
              logout should end the session on the server, not just clear the screen. Then try timeouts: leave a session
              idle for longer than the documented limit and see whether it still works. If there is no documented limit,
              that's a finding in itself.
            </p>
            <p>
              Old links and tokens are a rich area. Password reset links, email verification links, invitation links and
              one-time codes should typically work once and expire. Try using one twice. Try one after it should have
              expired. Try one after the password has already been changed by another route. Each of these is an ordinary
              user action that real people perform by accident all the time.
            </p>
            <p>
              Finally, check the rules around passwords and repeated failures. Does the system accept very weak passwords?
              Does it react in some way, such as a delay, a lockout or an extra check, after many wrong attempts? Does
              the login error reveal whether the account exists? If the product has multi-factor authentication, check the
              flows around it: enrolment, recovery, changing devices, and whether any path lets a user skip the second step.
            </p>
          </div>

          <div className="border-l-4 border-red-400/60 bg-red-500/5 rounded-r-2xl p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-red-300 font-semibold">Keep it gentle: </span>
              testing repeated wrong passwords means a handful of attempts on your own test account in a test
              environment, to confirm a control exists. It does not mean automated guessing, and it never means anyone
              else's account.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="errors" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Errors and Exposure</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Error handling is where systems accidentally tell strangers how they're built. A full stack trace on screen
              reveals frameworks, file paths and sometimes query details. A verbose message like "user not found in
              table X" tells someone which accounts exist. Neither is harmful on its own in a test environment, but both
              suggest the same behaviour may exist in production.
            </p>
            <p>
              As you test, keep an eye out for sensitive data in places it shouldn't be. URLs and query strings are a
              classic: tokens, email addresses or personal identifiers in a link end up in browser history, server logs
              and shared screenshots. Responses that contain more than the screen needs are another. Application logs
              you have access to as a tester are a third. If you can see passwords, full card numbers or session tokens in
              a log, that's a finding.
            </p>
            <p>
              Security headers are worth knowing about at a high level. They are instructions the server sends to the
              browser about how to handle the page, for example whether it may be embedded in other sites or which
              sources of scripts are allowed. You don't need to evaluate them in depth. It's enough to know they exist,
              to notice if a security review or scanner reports them missing, and to make sure such reports reach the
              right owner rather than sitting in a dashboard.
            </p>
            <p>
              A simple habit: whenever you trigger an error for functional reasons, spend ten extra seconds reading what
              came back with a security eye. Ask what a curious stranger could learn from it. Most of the time the answer
              is "nothing", which is exactly how it should be.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="escalation" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Siren className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Escalation Path</h2>
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed mb-6">
            <p>
              When something looks risky, the right move is almost always the same: stop, document, hand over. Do not try
              to work out how bad it could get by testing further. That's the security team's call, and they have the
              context, the authority and the tools to assess it safely.
            </p>
            <p>
              A good security finding report looks a lot like a good bug report, with a few extra considerations. Describe
              the steps precisely, using your test accounts. State what you expected and what happened. Describe the
              potential impact in plain words, such as "a regular user could view another customer's invoices", without
              speculating wildly. Attach minimal evidence. And handle the report itself carefully: many teams route
              security issues through a restricted channel rather than the general bug tracker, so that the details
              aren't visible to everyone before a fix exists. Find out what your organisation's process is before you
              need it.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-3 mb-6">
            {["Stop testing that path", "Write it down precisely", "Report via the agreed channel", "Support the fix and retest"].map(
              (s, i) => (
                <div key={s} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-center">
                  <p className="text-red-300 font-mono text-xs mb-2">0{i + 1}</p>
                  <p className="text-white/80 text-sm font-medium">{s}</p>
                </div>
              )
            )}
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              If you want to grow in this area, learn the shared vocabulary. Reference lists such as the OWASP Top 10
              describe common categories of web application risk, and reading them will help you recognise patterns and
              talk with security colleagues in their terms. Treat them as a vocabulary and a map, not a checklist to run
              attacks from. The more you understand the categories, the better your instinct for where boundaries are
              likely to be weak.
            </p>
            <p>
              Once a fix lands, retest it the same way you found it, and suggest turning the check into an automated test
              where it's safe and practical. An access control test that runs on every build, asserting that user A gets a
              refusal when requesting user B's record, is one of the most valuable regression tests a team can own.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Where I've Landed</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              You don't need to be a pentester to make your product meaningfully safer. You need a tester's habits pointed
              at a few specific boundaries: who can access what, what happens to unusual input, how sessions end, and what
              errors reveal. Most of these checks fit inside the testing you already do.
            </p>
            <p>
              Equally important is knowing where your role ends. Stay within your authorisation, use test data, stop when
              you find something, and escalate it clearly and privately. That combination of curiosity and restraint is
              exactly what security teams want from QA.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-8 text-center">
            <p className="text-red-200 text-lg font-semibold">
              Find the door that shouldn't open. Then tell the people who can lock it.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Want security thinking in your QA process?</h3>
          <p className="text-white/60 mb-6 text-sm">
            Let's talk about folding safe, practical security checks into everyday testing and building a clean escalation
            path.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => goHome("contact")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default SecurityTestingBasicsBlog;
