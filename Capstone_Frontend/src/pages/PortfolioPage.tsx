// src/pages/PortfolioPage.tsx
import "./PortfolioPage.css";
import PortfolioHero from "../components/portfolio/PortfolioHero.tsx";
import TimelineSummary from "../components/portfolio/TimelineSummary.tsx";
import JourneySection from "../components/portfolio/JourneySection.tsx";
import ProjectsSection from "../components/portfolio/ProjectsSection.tsx";
import CapstoneSection from "../components/portfolio/CapstoneSection.tsx";
import PortfolioFooterQuote from "../components/portfolio/PortfolioFooterQuote.tsx";
import ContactSection from "../components/portfolio/ContactSection.tsx";

export default function PortfolioPage() {
  return (


    <div className="portfolio-page">
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
       
          <a href="#journey" className="active">Welcome</a>
            <a href="#contact" className="connect">
          Let&apos;s Connect
        </a>
        </div>

      
      </nav>
      <div className="portfolio-shell"></div>
      <PortfolioHero />
      <TimelineSummary />
      <JourneySection />
      <ProjectsSection />
      <CapstoneSection />
      <PortfolioFooterQuote />
      <ContactSection />
    </div>

  );
}