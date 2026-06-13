import React, { useEffect, useRef } from "react";
import { ArrowRight, Download, Sparkles, Github, Linkedin, Twitter } from "lucide-react";
import jaydeepPhoto from "../../assets/images/jaydeep.png";

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
        <span className="text-cyan-400">v2025</span>
        <span className="text-pink-400">{" />"}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">

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
          <span className="block gradient-text">AI Builder</span>
          <span className="block text-foreground">Future Entrepreneur</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
          Hi, I'm Jaydeep Patel — Training AI Models for public. Currently a QA Automation Engineer, exploring & Building AI Agents, creating digital products, and documenting the journey toward new startups.
        </p>

        {/* Role tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["QA Automation", "Selenium & Java", "UI/UX Design", "AI Tools & Technology", "AI Models Training"].map((tag) => (
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
            onClick={() => scrollTo("#contact")}
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
    <div className="flex justify-center lg:justify-end lg:translate-x-8">
      <div className="relative">

        <div className="absolute -inset-6 bg-gradient-to-r from-violet-600/15 to-blue-600/15 blur-3xl rounded-[40px]" />

        <img
          src={jaydeepPhoto}
          alt="Jaydeep Patel"
          className="relative w-[420px] lg:w-[520px] h-[520px] lg:h-[650px] object-cover rounded-[32px] border border-white/10 shadow-2xl opacity-80"
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
