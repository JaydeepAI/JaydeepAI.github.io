import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "NexaFlow",
    avatar: "https://images.unsplash.com/photo-1580894908361-967195033215?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Jaydeep completely transformed our platform. He delivered a complex CRM system 2 weeks ahead of schedule with exceptional quality. The UI is stunning and our users love it. Will absolutely work with him again.",
  },
  {
    name: "Marcus Okafor",
    role: "CTO",
    company: "FinEdge Technologies",
    avatar: "https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Working with Jaydeep on our trading platform was an exceptional experience. His deep understanding of real-time systems and eye for detail produced a product that handles 50K events/second flawlessly.",
  },
  {
    name: "Priya Mehta",
    role: "Product Lead",
    company: "CloudBase",
    avatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Jaydeep is that rare developer who thinks like a product person. He challenged our assumptions in the best way, improved our architecture, and shipped a beautiful interface. 10/10 would recommend.",
  },
  {
    name: "James Whitford",
    role: "Founder",
    company: "LaunchKit",
    avatar: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "We needed a full redesign and rebuild in 6 weeks. Jaydeep delivered exactly that — a product that looks better than our competitors and converts 40% better than before. Communication was top-notch throughout.",
  },
  {
    name: "Aisha Patel",
    role: "Design Director",
    company: "Kreative Studio",
    avatar: "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "As a designer, I rarely say this about developers — Jaydeep actually cares about the pixels. He implements designs with 1:1 fidelity and always suggests improvements that make the final product better.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => { setAutoPlay(false); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAutoPlay(false); setCurrent((c) => (c + 1) % testimonials.length); };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from real people I&apos;ve had the pleasure of working with.
          </p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 lg:p-12 rounded-3xl bg-card/60 glass border border-border">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 text-violet-500/20">
              <Quote size={60} />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium mb-8 relative z-10">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-violet-500/30 bg-muted flex-shrink-0">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role} · {t.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gradient-to-r from-violet-500 to-blue-500" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/40 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/40 transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Small cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((item, i) => (
            <button
              key={i}
              onClick={() => { setAutoPlay(false); setCurrent(i); }}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                current === i
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-border bg-card/40 hover:border-violet-500/20 hover:bg-card/60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.text.slice(0, 80)}…</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
