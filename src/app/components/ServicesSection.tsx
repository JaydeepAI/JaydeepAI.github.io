import React, { useState } from "react";
import { Bot, Briefcase, Users, Rocket, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "QA Automation",
    price: "Open",
    color: "from-violet-500 to-purple-600",
    desc: "Helping teams build scalable automation frameworks and improve software quality.",
    features: [
      "Selenium & Java Automation",
      "Framework Design",
      "CI/CD Integration",
      "Regression Automation",
      "Quality Engineering",
    ],
  },

  {
    icon: Bot,
    title: "AI Automation",
    price: "Collaboration",
    color: "from-blue-500 to-cyan-600",
    desc: "Exploring AI agents, workflows, prompt engineering and automation systems.",
    features: [
      "Prompt Engineering",
      "AI Agents",
      "n8n Workflows",
      "Automation Systems",
      "AI Experimentation",
    ],
  },

  {
    icon: Rocket,
    title: "Freelance Projects",
    price: "Available",
    color: "from-amber-500 to-orange-600",
    desc: "Available for freelance, contract-based and short-term technical engagements.",
    features: [
      "QA Automation Projects",
      "Framework Development",
      "Technical Problem Solving",
      "Project Support",
      "Short-Term Engagements",
    ],
  },

  {
    icon: Users,
    title: "Networking & Opportunities",
    price: "Let's Connect",
    color: "from-indigo-500 to-violet-600",
    desc: "Open to meaningful conversations, collaborations and future opportunities.",
    features: [
      "Full-Time Roles",
      "Part-Time Opportunities",
      "Startup Discussions",
      "Tech Meetups",
      "Knowledge Sharing",
    ],
  },
];

export function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
           <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">
  Collaboration
</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="gradient-text"> Work Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Open to full-time opportunities, freelance projects, QA automation consulting, AI collaborations, networking, and meaningful co
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`relative p-6 rounded-2xl bg-card/60 glass border transition-all duration-300 cursor-default ${
                hovered === i
                  ? "border-violet-500/40 shadow-xl shadow-violet-500/10 -translate-y-1"
                  : "border-border"
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                <service.icon size={22} className="text-white" />
              </div>

              {/* Title + price */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg ml-2 flex-shrink-0">
                  {service.price}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.desc}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo("#contact")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-violet-500/30 text-violet-400 text-sm font-semibold hover:bg-violet-500/10 transition-all duration-200 group"
              >
                Let's Connect
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
