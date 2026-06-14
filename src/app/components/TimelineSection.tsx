import React, { useState } from "react";
import { Briefcase, GraduationCap, Award, ChevronDown } from "lucide-react";

const events = [
  {
    year: "2026",
    type: "award",
    title: "Building Digital Jaydeep",
    org: "Personal Brand & AI Projects",
    location: "Ahmedabad, India",
    desc: "Building in public, creating AI experiments, automation workflows, and documenting the journey toward entrepreneurship.",
    tags: ["OpenAI", "Claude", "n8n", "GitHub Pages"],
  },

  {
    year: "2025",
    type: "work",
    title: "Exploring AI & Automation",
    org: "Self Learning Journey",
    location: "India",
    desc: "Learning AI tools, prompt engineering, AI agents, and modern automation workflows while sharing progress publicly.",
    tags: ["AI", "Prompt Engineering", "Agents", "Automation"],
  },

  {
    year: "2024",
    type: "work",
    title: "QA Automation Engineer",
    org: "Asite Solutions",
    location: "Ahmedabad, India",
    desc: "Built automation frameworks, improved regression coverage, contributed to enterprise applications, and supported quality delivery.",
    tags: ["Selenium", "Java", "TestNG", "Jenkins"],
  },

  {
    year: "2023",
    type: "work",
    title: "Started Professional Journey",
    org: "Asite Solutions",
    location: "Ahmedabad, India",
    desc: "Joined Asite as an intern and successfully transitioned into a full-time QA Engineer role.",
    tags: ["QA", "Testing", "Postman", "Jira"],
  },
];
const iconMap = {
  work: Briefcase,
  edu: GraduationCap,
  award: Award,
};

const colorMap = {
  work: "from-violet-500 to-purple-600",
  edu: "from-blue-500 to-cyan-600",
  award: "from-amber-500 to-orange-600",
};

export function TimelineSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="timeline" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-blue-500 to-cyan-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Journey</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Proffesional Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A story of growth, impact, and continuous learning across 4+ years.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative timeline-line max-w-4xl mx-auto">
          <div className="space-y-8">
            {events.map((event, i) => {
              const Icon = iconMap[event.type as keyof typeof iconMap];
              const color = colorMap[event.type as keyof typeof colorMap];
              const isLeft = i % 2 === 0;
              const isOpen = expanded === i;

              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full"
                    >
                      <div
                        className={`p-5 rounded-2xl bg-card/60 glass border transition-all duration-300 card-hover text-left ${
                          isOpen ? "border-violet-500/40 shadow-lg shadow-violet-500/10" : "border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-xs font-bold text-violet-400 tracking-widest uppercase mb-1 block">{event.year}</span>
                            <h3 className="text-base font-bold text-foreground mb-1">{event.title}</h3>
                            <p className="text-sm text-muted-foreground font-medium">{event.org}</p>
                            <p className="text-xs text-muted-foreground/70 mb-3">{event.location}</p>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`text-muted-foreground mt-1 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-violet-400" : ""}`}
                          />
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{event.desc}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {event.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0 hidden lg:flex">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ring-4 ring-background`}>
                      <Icon size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
