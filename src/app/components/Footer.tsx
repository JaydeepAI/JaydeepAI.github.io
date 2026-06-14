import React from "react";
import { jsPDF } from "jspdf";
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
  const doc = new jsPDF();

  // Header
  doc.setFillColor(20, 20, 35);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.text("Jaydeep Patel", 20, 18);

  doc.setFontSize(12);
  doc.text(
    "QA Automation Engineer • AI Builder • Future Entrepreneur",
    20,
    28
  );

  // Reset colors
  doc.setTextColor(0, 0, 0);

  // About
  doc.setFontSize(18);
  doc.text("About", 20, 55);

  doc.setFontSize(11);
  doc.text(
    "QA Engineer at Asite with experience in Automation, API Testing,",
    20,
    65
  );

  doc.text(
    "Regression Testing, AI Tools and Digital Product Exploration.",
    20,
    72
  );

  // Experience
  doc.setFontSize(18);
  doc.text("Highlights", 20, 90);

  const highlights = [
    "950+ bugs identified and reported",
    "21+ automation scripts developed",
    "35% regression scope automated",
    "45+ legacy scripts rebased",
    "Delivered SPM, ePQQ, MFA, Tender & Reports modules",
    "Integration, Security & API Testing experience"
  ];

  let y = 100;

  highlights.forEach((item) => {
    doc.circle(23, y - 1, 1, "F");
    doc.text(item, 28, y);
    y += 8;
  });

  // Skills
  doc.setFontSize(18);
  doc.text("Core Skills", 20, 155);

  doc.setFontSize(11);

  doc.text(
    "Selenium, Java, Postman, Jenkins, Git, Jira, Groovy,",
    20,
    165
  );

  doc.text(
    "Regression Testing, Functional Testing, API Testing,",
    20,
    172
  );

  doc.text(
    "AI Agents, n8n Automation, Prompt Engineering",
    20,
    179
  );

  // Contact
  doc.setFontSize(18);
  doc.text("Contact", 20, 205);

  doc.setFontSize(11);
  doc.text("Email: 84jaydeepchovatiya@gmail.com", 20, 215);
  doc.text("Phone: +91 94095 77272", 20, 222);
  doc.text("Location: Ahmedabad, India", 20, 229);
  doc.text("Website: jaydeepai.github.io", 20, 236);

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Generated from Digital Jaydeep",
    20,
    285
  );

  doc.save("Jaydeep-Digital-Profile.pdf");
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
