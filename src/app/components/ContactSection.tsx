import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "84jaydeepchovatiya@gmail.com", href: "mailto:84jaydeepchovatiya@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 94095 77272", href: "tel:+919409577272" },
  { icon: MapPin, label: "Location", value: "Ahmedabad, India", href: "https://maps.google.com/?q=Ahmedabad,India" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/JaydeepAI" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jaydeepchovatiya/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/jaydeep_chovatiya__" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/84jaydeepchovatiya@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          discussion: form.budget,
          message: form.message,
        }),
      }
    );

    if (response.ok) {
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        budget: "",
      });
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-violet-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 dark:opacity-15 blur-3xl bg-gradient-to-r from-blue-600 to-cyan-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
            <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Looking to collaborate, discuss AI, automation, startups, freelance work, or career opportunities? I'd love to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Availability badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-glow" />
                <span className="text-sm font-semibold text-emerald-400">Open to Opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to freelance projects, QA Automation opportunities, AI collaborations, startup discussions, networking, and exciting ideas. Typical response within 12 hours.
              </p>
            </div>

            {/* Contact info list */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/60 glass border border-border hover:border-violet-500/40 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-violet-500/40 transition-all">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Also catch me on...</p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all hover:scale-110"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-3xl bg-card/60 glass border border-border">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out, {form.name.split(" ")[0]}! I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "", budget: "" }); }}
                    className="mt-6 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jay, Recruiter@TechFlow"
                        className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jay@techflow.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="Wanna discuss an AI Automation Project"
                        className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">What Brings You Here?</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all appearance-none"
                      >
                        <option value="">Select Discussion Point</option>
                        <option value="job">Full-Time Opportunity</option>
                        <option value="freelance">Freelance Project</option>
                        <option value="collaboration">AI Collaboration</option>
                        <option value="startup">Startup Discussion</option>
                        <option value="networking">Networking / Coffee Chat</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me the exciting part..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
