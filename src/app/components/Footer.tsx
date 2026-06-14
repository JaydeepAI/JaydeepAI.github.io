import React from "react";
import { Github, Linkedin, Mail, Code2, ArrowUp, Instagram } from "lucide-react";

const footerLinks = {
  Navigation: [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Let's Connect", href: "#services" },
    { label: "Exploring", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],

  "Currently Exploring": [
    { label: "AI Agents", href: "#testimonials" },
    { label: "n8n Automation", href: "#testimonials" },
    { label: "Prompt Engineering", href: "#testimonials" },
    { label: "AI SaaS Ideas", href: "#testimonials" },
    { label: "MCP & AI Tools", href: "#testimonials" },
  ],

  "Find Me Online": [
    { label: "GitHub", href: "https://github.com/JaydeepAI" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jaydeepchovatiya/" },
    { label: "Instagram", href: "https://www.instagram.com/jaydeep_chovatiya__" },
    { label: "Email Me", href: "mailto:84jaydeepchovatiya@gmail.com" },
{ label: "Download My Profile", href: "#download-profile" },
  ],
};

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/JaydeepAI" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jaydeepchovatiya/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/jaydeep_chovatiya__" },
  { icon: Mail, label: "Email", href: "mailto:84jaydeepchovatiya@gmail.com" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const downloadProfile = () => {
  alert("Digital Profile PDF is Generating");
};
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTop(); }}
              className="flex items-center gap-2.5 mb-5 w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="text-lg">
                <span className="gradient-text font-bold">Digital</span>
                <span className="text-foreground font-semibold"> Jaydeep</span>
              </span>
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
  QA Automation Engineer • AI Builder • Future Entrepreneur.
  Training AI Agents while exploring AI, automation, digital products.
</p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}  target="_blank"
  rel="noopener noreferrer" 
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
  if (link.href === "#download-profile") {
    e.preventDefault();
    downloadProfile();
    return;
  }

  if (link.href.startsWith("#") && link.href.length > 1) {
    e.preventDefault();
    scrollTo(link.href);
  }
}}
                        className="text-sm text-muted-foreground hover:text-violet-400 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
  © {new Date().getFullYear()} Digital Jaydeep • Built and designed by Jaydeep Patel
</p>

          <div />

          <button
            onClick={scrollTop}
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
