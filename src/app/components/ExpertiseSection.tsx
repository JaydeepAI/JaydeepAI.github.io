import React, { useState, useEffect, useRef } from "react";
import { Code2, Palette, Server, Cloud, Database, Smartphone } from "lucide-react";

const categories = [
  {
    icon: Code2,
    label: "Frontend",
    color: "from-violet-500 to-purple-600",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js / Nuxt", level: 75 },
      { name: "Animation / Framer", level: 80 },
    ],
  },
  {
    icon: Server,
    label: "Backend",
    color: "from-blue-500 to-cyan-600",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python / FastAPI", level: 80 },
      { name: "GraphQL", level: 78 },
      { name: "REST API Design", level: 92 },
      { name: "Microservices", level: 75 },
    ],
  },
  {
    icon: Database,
    label: "Data & DB",
    color: "from-emerald-500 to-teal-600",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 78 },
      { name: "Prisma / Drizzle", level: 85 },
      { name: "Data Modeling", level: 80 },
    ],
  },
  {
    icon: Cloud,
    label: "Cloud & DevOps",
    color: "from-orange-500 to-amber-600",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 82 },
      { name: "Vercel / Railway", level: 95 },
      { name: "Docker / K8s", level: 75 },
      { name: "CI/CD Pipelines", level: 80 },
      { name: "Cloudflare", level: 78 },
    ],
  },
  {
    icon: Palette,
    label: "Design",
    color: "from-pink-500 to-rose-600",
    skills: [
      { name: "Figma", level: 92 },
      { name: "UI/UX Design", level: 88 },
      { name: "Prototyping", level: 85 },
      { name: "Design Systems", level: 82 },
      { name: "Brand Identity", level: 70 },
    ],
  },
  {
    icon: Smartphone,
    label: "Mobile",
    color: "from-indigo-500 to-violet-600",
    skills: [
      { name: "React Native", level: 80 },
      { name: "Expo", level: 82 },
      { name: "PWA", level: 88 },
      { name: "App Store Deploy", level: 75 },
      { name: "Mobile UI Patterns", level: 85 },
    ],
  },
];

function SkillBar({ name, level, triggered }: { name: string; level: number; triggered: boolean }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full skill-bar-fill"
          style={{ width: triggered ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTriggered(false);
    const timer = setTimeout(() => setTriggered(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const active = categories[activeTab];

  return (
    <section id="expertise" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Expertise</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Technical Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive skill set spanning frontend, backend, cloud infrastructure, and design.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border"
              }`}
            >
              <cat.icon size={15} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-3xl bg-card/60 glass border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                <active.icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{active.label} Skills</h3>
                <p className="text-xs text-muted-foreground">{active.skills.length} technologies</p>
              </div>
            </div>

            {active.skills.map((skill) => (
              <SkillBar key={skill.name} {...skill} triggered={triggered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
