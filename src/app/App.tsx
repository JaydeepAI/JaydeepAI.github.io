import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { AboutSection } from "./components/AboutSection";
import { CompaniesSection } from "./components/CompaniesSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { TimelineSection } from "./components/TimelineSection";
import Achievements from "../pages/Achievements";
import { PortfolioSection } from "./components/PortfolioSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import BlogIndex from "../pages/blog/BlogIndex";
import ClaudeCodeFeaturesBlog from "../pages/blog/ClaudeCodeFeaturesBlog";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark) || (!saved && true);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <style>{`
              html { scroll-behavior: smooth; }

              ::-webkit-scrollbar { width: 6px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
                border-radius: 3px;
              }

              .gradient-text {
                background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }

              .gradient-text-warm {
                background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }

              .gradient-border {
                border: 1px solid transparent;
                background-clip: padding-box;
                position: relative;
              }

              .gradient-border::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1px;
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
              }

              .glass {
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
              }

              .mesh-bg {
                background: radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 60%),
                            radial-gradient(ellipse at 60% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 60%);
              }

              .dark .mesh-bg {
                background: radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
                            radial-gradient(ellipse at 60% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 60%);
              }

              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
              }

              @keyframes glow-pulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
              }

              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }

              .animate-float { animation: float 5s ease-in-out infinite; }
              .animate-float-slow { animation: float 7s ease-in-out infinite 1s; }
              .animate-glow { animation: glow-pulse 3s ease-in-out infinite; }
              .animate-marquee { animation: marquee 25s linear infinite; }

              .btn-primary {
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }

              .btn-primary::before {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
              }

              .btn-primary:hover::before { left: 100%; }
              .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4); }

              .card-hover {
                transition: all 0.3s ease;
              }

              .card-hover:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
              }

              .dark .card-hover:hover {
                box-shadow: 0 20px 60px rgba(139, 92, 246, 0.25);
              }

              .section-fade-in {
                animation: fadeInUp 0.6s ease both;
              }

              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }

              .skill-bar-fill {
                transition: width 1.5s ease;
              }

              .timeline-line::before {
                content: '';
                position: absolute;
                left: 50%;
                top: 0; bottom: 0;
                width: 2px;
                background: linear-gradient(to bottom, #8b5cf6, #3b82f6, #06b6d4);
                transform: translateX(-50%);
              }

              @media (max-width: 768px) {
                .timeline-line::before {
                  left: 1.5rem;
                }
              }
            `}</style>

            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>
              <HeroSection />
              <StatsSection />
              <AboutSection />
              <CompaniesSection />
              <ExpertiseSection />
              <TimelineSection />
              <PortfolioSection />
              <ServicesSection />
              <TestimonialsSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        }
      />

      <Route path="/achievements" element={<Achievements />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/claude-code-features" element={<ClaudeCodeFeaturesBlog />} />
    </Routes>
  );
}