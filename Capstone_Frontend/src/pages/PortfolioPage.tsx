// src/pages/PortfolioPage.tsx
import { useEffect, useState } from "react";
import "./PortfolioPage.css";

import PortfolioHero from "../components/portfolio/PortfolioHero.tsx";
import TimelineSummary from "../components/portfolio/TimelineSummary.tsx";
import JourneySection from "../components/portfolio/JourneySection.tsx";
import EngineeringHighlights from "../components/portfolio/EngineeringHighlights.tsx";
import ProjectsSection from "../components/portfolio/ProjectsSection.tsx";
import CapstoneSection from "../components/portfolio/CapstoneSection.tsx";
import PortfolioFooterQuote from "../components/portfolio/PortfolioFooterQuote.tsx";
import ContactSection from "../components/portfolio/ContactSection.tsx";

export default function PortfolioPage() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 700);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-shell">
        <nav className="portfolio-navbar">
          <div className="portfolio-hero-buttons">
            <a href="#projects" className="btn-primary">
              VIEW MY WORK
            </a>

            <a
              href="https://github.com/HireFabiola"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              GITHUB
            </a>

            <a
              href="https://www.linkedin.com/in/fabiola-aurelien"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LINKEDIN
            </a>

            <a
              href="#"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                setResumeOpen(true);
              }}
            >
              RESUME
            </a>
          </div>

          <div className="portfolio-nav-links">
            <a href="#journey" className="active">
              Welcome
            </a>

            <a href="#contact" className="connect">
              Let&apos;s Connect
            </a>
          </div>
        </nav>

        <PortfolioHero />
        <TimelineSummary />
        <JourneySection />
        <EngineeringHighlights />
        <ProjectsSection />
        <CapstoneSection />
        <PortfolioFooterQuote />
        <ContactSection />
      </div>

      {resumeOpen && (
        <div
          className="resume-modal"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="resume-close"
              onClick={() => setResumeOpen(false)}
            >
              ✕
            </button>

            <iframe
              src="/Fabiola_Aurelien_Software_Engineer_Resume.pdf"
              title="Fabiola Aurelien Resume"
              className="resume-frame"
            />

            <a
              href="/Fabiola_Aurelien_Software_Engineer_Resume.pdf"
              download
              className="btn-gold"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
