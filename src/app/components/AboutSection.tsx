import React from "react";
import { Lightbulb, Target, Rocket, Users, MapPin, Coffee, Zap } from "lucide-react";

const traits = [
  {
    icon: Lightbulb,
    title: "Problem Solver",
    desc: "Breaking down complex testing challenges and creating scalable automation solutions.",
  },
  {
    icon: Target,
    title: "Detail-Oriented",
    desc: "Focused on quality, reliability, and delivering software users can trust.",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    desc: "Constantly exploring AI, automation tools, and emerging technologies.",
  },
  {
    icon: Users,
    title: "Team Player",
    desc: "Collaborating with developers, testers, and stakeholders to deliver better products.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-blue-500 to-cyan-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: image + floating badges */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-violet-900/20 to-blue-900/20">
              <img
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=750&fit=crop&auto=format"
                alt="Jaydeep Patel — Full Stack Developer"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Floating badge: location */}
              <div className="absolute bottom-6 left-6 glass border border-border bg-card/80 rounded-2xl px-4 py-3 flex items-center gap-2">
                <MapPin size={14} className="text-violet-400" />
                <span className="text-sm font-medium text-foreground">India</span>
              </div>

              {/* Floating badge: status */}
              <div className="absolute top-6 right-6 glass border border-emerald-500/30 bg-emerald-500/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow" />
                <span className="text-sm font-medium text-emerald-400">Open to Talk</span>
              </div>
            </div>

            {/* Side decoration */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-violet-500 to-blue-500 rounded-full opacity-60 hidden lg:block" />
          </div>

          {/* Right: content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              I'm building my journey with{" "}
              <span className="gradient-text">Automated AI</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm Jaydeep Patel, a QA Automation Engineer with 4+ years of experience building reliable test automation frameworks and improving software quality across enterprise applications with AI Integration.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-10">
              Today I'm expanding beyond automation into AI, digital products, and training AI Models. 'Digital Jaydeep' is where I document experiments, projects, lessons, and my journey toward entrepreneurship.
            </p>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: Coffee, text: "3 coffees/day" },
                { icon: Zap, text: "Automation with AI" },
                { icon: Rocket, text: "Startup mindset" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border text-sm text-muted-foreground">
                  <Icon size={14} className="text-violet-400" />
                  {text}
                </div>
              ))}
            </div>

            {/* Trait grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traits.map((trait) => (
                <div
                  key={trait.title}
                  className="p-4 rounded-2xl bg-card/60 border border-border card-hover glass"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center mb-3">
                    <trait.icon size={15} className="text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{trait.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
