import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { ArrowRight, Download, Sparkles, Github, Linkedin, Twitter } from "lucide-react";
import jaydeepPhoto from "../../assets/images/jaydeep.png";

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
const downloadProfile = () => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(20, 20, 35);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.text("Jaydeep Patel", 20, 18);

  doc.setFontSize(12);
  doc.text(
    "QA Automation Engineer Enhaced with AI",
    20,
    28
  );

  // Reset colors
  doc.setTextColor(0, 0, 0);

  // About
  doc.setFontSize(18);
  doc.text("About", 20, 55);

  doc.setFontSize(11);
  doc.text(
    "QA Engineer at Asite with experience in Automation, API Testing,",
    20,
    65
  );

  doc.text(
    "Regression Testing, AI Tools and Digital Product Exploration.",
    20,
    72
  );

  // Experience
  doc.setFontSize(18);
  doc.text("Highlights", 20, 90);

  const highlights = [
    "950+ bugs identified and reported",
    "21+ automation scripts developed",
    "35% regression scope automated",
    "45+ legacy scripts rebased",
    "Delivered SPM, ePQQ, MFA, Tender & Reports modules",
    "Integration, Security & API Testing experience"
  ];

  let y = 100;

  highlights.forEach((item) => {
    doc.circle(23, y - 1, 1, "F");
    doc.text(item, 28, y);
    y += 8;
  });

  // Skills
  doc.setFontSize(18);
  doc.text("Core Skills", 20, 155);

  doc.setFontSize(11);

  doc.text(
    "Selenium, Java, Postman, Jenkins, Git, Jira, Groovy,",
    20,
    165
  );

  doc.text(
    "Regression Testing, Functional Testing, API Testing,",
    20,
    172
  );

  doc.text(
    "AI Agents, n8n Automation, Prompt Engineering",
    20,
    179
  );

  // Contact
  doc.setFontSize(18);
  doc.text("Contact", 20, 205);

  doc.setFontSize(11);
  doc.text("Email: 84jaydeepchovatiya@gmail.com", 20, 215);
  doc.text("Phone: +91 94095 77272", 20, 222);
  doc.text("Location: Ahmedabad, India", 20, 229);
  doc.text("Website: jaydeepai.github.io", 20, 236);

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Generated from Digital Jaydeep",
    20,
    285
  );

  doc.save("Jaydeep-Digital-Profile.pdf");
};
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 mesh-bg" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 dark:opacity-30 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 dark:opacity-25 blur-3xl bg-gradient-to-r from-blue-500 to-cyan-500 animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 dark:opacity-20 blur-3xl bg-gradient-to-r from-purple-500 to-pink-500 animate-glow" style={{ transform: "translate(-50%, -50%)" }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating code snippets */}
      <div className="absolute top-32 right-8 lg:right-24 glass border border-border bg-card/60 rounded-xl px-4 py-3 text-xs font-mono text-muted-foreground hidden md:block animate-float" style={{ animationDelay: "0.5s" }}>
        <span className="text-violet-400">const</span>{" "}
        <span className="text-blue-400">dev</span>{" "}
        <span className="text-foreground">= </span>
        <span className="text-emerald-400">"Jaydeep"</span>
      </div>
      <div className="absolute bottom-40 left-8 lg:left-24 glass border border-border bg-card/60 rounded-xl px-4 py-3 text-xs font-mono text-muted-foreground hidden md:block animate-float-slow">
        <span className="text-pink-400">{"<Portfolio"}</span>{" "}
        <span className="text-cyan-400">v2026</span>
        <span className="text-pink-400">{" />"}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-24 lg:pt-12">

    {/* Left Content */}
    <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass border border-violet-500/30 bg-violet-500/10 rounded-full px-4 py-2 text-sm font-medium text-violet-400 mb-8">
          <Sparkles size={14} className="animate-glow" />
          <span>Available for freelance & full-time roles</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow" />
        </div>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="block text-foreground">QA Automation Engineer</span>
          <span className="block gradient-text">Enhanced with AI</span>
        
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
          Hi, I'm Jaydeep Patel —  Currently a QA Automation Engineer, exploring Training AI Models and documenting the journey toward new Era.
        </p>

        {/* Role tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["QA Automation", "Selenium & Java", "Web Design & Testing", "AI Tools & Technology", "AI Models Training"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo("#portfolio")}
            className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 text-base w-full sm:w-auto justify-center"
          >
            View My Work
            <ArrowRight size={18} />
          </button>
          <button
  onClick={downloadProfile}
  className="gradient-border bg-card/40 glass text-foreground font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 text-base w-full sm:w-auto justify-center hover:bg-card/60 transition-all duration-200"
>
            <Download size={18} />
            Download CV
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/JaydeepAI" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jaydeepchovatiya/" },
            { icon: Twitter, label: "Twitter", href: "https://x.com/Jaydeep76208261" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all duration-200 hover:scale-110"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
    </div>

    {/* Right Photo */}
    <div className="flex justify-center lg:justify-end lg:translate-x-4 mt-8 lg:mt-0">
      <div className="relative">

        <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/8 to-blue-600/8 blur-3xl rounded-[40px]" />

        <img
          src={jaydeepPhoto}
          alt="Jaydeep Patel"
          className="relative w-[340px] lg:w-[420px] h-[420px] lg:h-[520px] object-cover rounded-[32px] border border-white/10 shadow-2xl opacity-80"
        />

      </div>
    </div>

  </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-violet-500/60 to-transparent" />
        </div>
      </div>

      {/* Hero image strip */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
