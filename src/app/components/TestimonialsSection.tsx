import React from "react";
import { Brain, Bot, Workflow, Rocket, ArrowUpRight } from "lucide-react";

const explorations = [
  {
    icon: Brain,
    title: "AI Agents",
    desc: "Building autonomous workflows using ChatGPT, Claude, MCP, and agentic systems.",
  },
  {
    icon: Workflow,
    title: "n8n Automation",
    desc: "Creating end-to-end business automations, integrations, and productivity systems.",
  },
  {
    icon: Bot,
    title: "Prompt Engineering",
    desc: "Experimenting with advanced prompting techniques, AI workflows, and reasoning systems.",
  },
  {
    icon: Rocket,
    title: "AI SaaS Ideas",
    desc: "Researching future products, startups, and business opportunities powered by AI.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">
              Currently Exploring
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Currently <span className="gradient-text">Exploring</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies, ideas, and opportunities I'm actively learning,
            building, and experimenting with.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {explorations.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-card/60 glass border border-border hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                <item.icon size={22} className="text-white" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-5 flex items-center gap-2 text-violet-400 text-sm font-medium">
                Learning
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}