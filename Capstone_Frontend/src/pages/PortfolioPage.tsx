// src/pages/PortfolioPage.tsx
import "./PortfolioPage.css";
import PortfolioHero from "../components/portfolio/PortfolioHero.tsx";
import TimelineSummary from "../components/portfolio/TimelineSummary.tsx";
import JourneySection from "../components/portfolio/JourneySection.tsx";
import ProjectsSection from "../components/portfolio/JourneySection.tsx";
import CapstoneSection from "../components/portfolio/CapstoneSection.tsx";
import PortfolioFooterQuote from "../components/portfolio/PortfolioFooterQuote.tsx";


export default function PortfolioPage() {
  return (


    <div className="portfolio-page">
       <nav className="portfolio-navbar">
  <div className="portfolio-brand-lockup">
    <img
      src="/images/r4b-logo.png"
      alt="R4B"
      className="portfolio-r4b-logo"
    />

    <div className="portfolio-brand-divider" />

    <div className="portfolio-studio-text">
      <span className="portfolio-design-text">Design</span>
      <span className="portfolio-studio-word">Studio</span>
    </div>
  </div>

  <div className="portfolio-nav-links">
    <a href="/">Home</a>
    <a href="#about">About</a>
    <a href="#journey" className="active">My Journey</a>
    <a href="#projects">Projects</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </div>

  <a href="#contact" className="portfolio-nav-cta">
    Let&apos;s Connect
  </a>
</nav>

      <PortfolioHero />
      <TimelineSummary />
      <JourneySection />
      <ProjectsSection />
      <CapstoneSection />
      <PortfolioFooterQuote />
    </div>
  );
}