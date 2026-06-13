import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 80, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "M+", label: "Users Impacted" },
];

function useCountUp(target: number, duration = 1800, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, triggered]);
  return count;
}

function StatItem({ value, suffix, label, triggered }: { value: number; suffix: string; label: string; triggered: boolean }) {
  const count = useCountUp(value, 1600, triggered);
  return (
    <div className="text-center group">
      <div className="text-4xl lg:text-5xl font-bold mb-2">
        <span className="gradient-text">{count}</span>
        <span className="text-violet-400">{suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-blue-600/5 to-cyan-600/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
