import React from "react";

const companies = [
  "Google", "Microsoft", "Stripe", "Notion", "Vercel", "Figma",
  "Linear", "Loom", "Atlassian", "Shopify", "Twilio", "Cloudflare",
];

export function CompaniesSection() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
          Worked with & for companies like
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
            {doubled.map((company, i) => (
              <div
                key={`${company}-${i}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card/40 glass hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 cursor-default group flex-shrink-0"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
