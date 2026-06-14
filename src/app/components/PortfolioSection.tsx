import React, { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const filters = ["All", "Automation", "AI", "Personal", "Under Development"];

const projects = [

{
    title: "AI Experiments Lab",
    category: "AI",
    desc: "Collection of AI workflows, prompt engineering experiments, agents, and automation projects.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    tags: ["OpenAI", "Claude", "n8n", "Agents"],
    color: "from-emerald-500/20 to-teal-600/20",
    live: "",
    github: "https://github.com/JaydeepAI",
    featured: true,
  },

  {
    title: "Digital Jaydeep",
    category: "Personal",
    desc: "My personal website documenting the journey from QA Automation Engineer to AI Builder and Upcoming entrepreneur.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
    tags: ["React", "Vite", "GitHub Pages", "TypeScript"],
    color: "from-violet-500/20 to-purple-600/20",
    live: "https://jaydeepai.github.io",
    github: "https://github.com/JaydeepAI/JaydeepAI.github.io",
    featured: true,
  },

  {
    title: "Marketplace Automation Framework",
    category: "Automation",
    desc: "Automation framework built for enterprise marketplace applications with reusable utilities and scalable test design.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop&auto=format",
    tags: ["Selenium", "Java", "TestNG", "Jenkins"],
    color: "from-blue-500/20 to-cyan-600/20",
    live: "",
    github: "https://github.com/JaydeepAI",
    featured: true,
  },

  {
    title: "AI SaaS Project",
    category: "Under Development",
    desc: "AI SaaS product currently under development and research.",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=400&fit=crop&auto=format",
    tags: ["AI SaaS", "Planning"],
    color: "from-pink-500/20 to-rose-600/20",
    live: "",
    github: "https://github.com/JaydeepAI",
    featured: false,
  },

  {
    title: "Chrome Extension",
    category: "Under Development",
    desc: "Chrome extension currently under development.",
    image: "https://images.unsplash.com/photo-1635776063043-ab23b4c226f6?w=600&h=400&fit=crop&auto=format",
    tags: ["Chrome Extension"],
    color: "from-amber-500/20 to-orange-600/20",
    live: "",
    github: "https://github.com/JaydeepAI",
    featured: false,
  },

  {
    title: "Startup Venture",
    category: "Under Development",
    desc: "Startup venture currently in planning and development Phase 2.",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&h=400&fit=crop&auto=format",
    tags: ["Startup"],
    color: "from-indigo-500/20 to-violet-600/20",
    live: "",
    github: "https://github.com/JaydeepAI",
    featured: false,
  },
];
export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? [
        ...projects.filter((p) => p.category === "Personal"),
        ...projects.filter((p) => p.category === "Automation"),
        ...projects.filter((p) => p.category === "AI"),
        ...projects.filter((p) => p.category === "Upcoming"),
      ]
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5 dark:opacity-10 blur-3xl bg-gradient-to-r from-violet-600 to-blue-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Portfolio</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Projects & <span className="gradient-text">Experiments</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Automation projects, AI experiments, and everything I'm building & Training AI models.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={`${project.category}-${project.title}-${i}`}
              className="group relative rounded-2xl overflow-hidden bg-card/60 glass border border-border card-hover"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                {/* Overlay links */}
                <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                  <a
                    href={project.live}
target="_blank"
  rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-gray-900 hover:bg-white transition-all hover:scale-110"
                    aria-label="View live"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
target="_blank"
  rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-gray-900 hover:bg-white transition-all hover:scale-110"
                    aria-label="View code"
                  >
                    <Github size={16} />
                  </a>
                </div>

                {project.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-foreground">{project.title}</h3>
                  <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60 border border-border ml-2 flex-shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
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
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/JaydeepAI" target="_blank"
  rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors group"
          >
            View all projects on GitHub
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
