import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import DesignAssistant from "../components/DesignAssistant";

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const services = [
  {
    icon: "bi-window",
    title: "Custom Website Development",
    description:
      "Beautiful, responsive websites designed to reflect your brand, engage your audience, and drive growth.",
  },
  {
    icon: "bi-code-slash",
    title: "Full-Stack Web Applications",
    description:
      "Scalable, secure web applications built with modern technologies to streamline operations and solve complex challenges.",
  },
  {
    icon: "bi-gear",
    title: "Business Process Solutions",
    description:
      "Custom systems and automation to optimize workflows, improve efficiency, and support your business goals.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Data Dashboards & Reporting",
    description:
      "Transform your data into clear, actionable insights with custom dashboards and reporting solutions.",
  },
  {
    icon: "bi-compass",
    title: "Digital Strategy Consulting",
    description:
      "Strategic guidance to align technology with your business objectives and plan for sustainable growth.",
  },
  {
    icon: "bi-cpu",
    title: "AI-Powered Workflow Solutions",
    description:
      "Leverage AI and automation to eliminate repetitive tasks and unlock new levels of productivity and innovation.",
  },
];

const process = [
  {
    icon: "bi-search",
    title: "Discover",
    text: "We learn about your business, goals, and challenges to uncover the right opportunities.",
  },
  {
    icon: "bi-pencil",
    title: "Design",
    text: "We create thoughtful strategies and user-centered designs tailored to your needs.",
  },
  {
    icon: "bi-code-slash",
    title: "Develop",
    text: "We build scalable, secure solutions using modern technologies and best practices.",
  },
  {
    icon: "bi-rocket-takeoff",
    title: "Deliver",
    text: "We launch with care and provide ongoing support to help you continue growing.",
  },
];

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="services-page">
      <header className="about-header">
        <nav className="about-navbar" aria-label="Primary navigation">
          <Link to="/" className="home-brand" aria-label="R4B Design Studio home">
            <img src="/images/r4b-logo-mark.png" alt="" />
            <span className="home-brand-divider" aria-hidden="true" />
            <span className="home-brand-name">
              <strong>Design</strong> Studio
            </span>
          </Link>

          <button
            className={`home-nav-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="services-navigation"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="services-navigation"
            className={`home-nav-links ${menuOpen ? "is-open" : ""}`}
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <section className="services-hero">
        <div className="about-hero-content">
          <p className="about-kicker">Services</p>
          <h1>
            Technology Solutions
            <br />
            Designed for Growth
          </h1>
          <span className="about-rule" aria-hidden="true" />
          <p>
            We help entrepreneurs, small businesses, and organizations transform
            ideas into scalable digital solutions through strategy, design,
            software development, and AI-powered automation.
          </p>
          <Link to="/contact" className="services-hero-button">
            Schedule a Consultation
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <div className="about-hero-art" aria-hidden="true" />
      </section>

      <section className="services-list about-section">
        <div className="about-section-heading">
          <p className="about-kicker">What We Do</p>
          <h2>Our Services</h2>
          <span className="services-heading-line" aria-hidden="true" />
        </div>

        <div className="services-card-grid">
          {services.map((service) => (
            <article key={service.title} className="services-card">
              <div className="services-card-icon">
                <i className={`bi ${service.icon}`} aria-hidden="true" />
              </div>
              <div>
                <h3>{service.title}</h3>
                <span aria-hidden="true" />
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-process about-process about-section">
        <div className="about-section-heading">
          <p className="about-kicker">Our Approach</p>
          <h2>A Collaborative, Results-Driven Process</h2>
          <span className="services-heading-line" aria-hidden="true" />
        </div>

        <div className="about-process-grid">
          {process.map((step, index) => (
            <article key={step.title}>
              <div className="about-process-icon">
                <i className={`bi ${step.icon}`} aria-hidden="true" />
              </div>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <div>
          <p className="about-kicker">Ready to Build?</p>
          <h2>Ready to Build Something Extraordinary?</h2>
          <p>
            Let&apos;s talk about how we can turn your ideas into powerful
            digital solutions that help your business grow with confidence.
          </p>
        </div>

        <Link to="/contact" className="about-cta-button">
          Let&apos;s Connect
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </section>

      <footer className="services-footer">
        <div className="services-footer-brand">
          <img src="/images/r4b-logo-mark.png" alt="R4B Design Studio" />
          <div>
            <p className="services-footer-title">R4B Design Studio</p>
            <p>Building digital solutions rooted in strategy, clarity, and purpose.</p>
          </div>
        </div>

        <div>
          <h2>Quick Links</h2>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h2>Services</h2>
          <p>Web Development</p>
          <p>Web Applications</p>
          <p>Business Solutions</p>
          <p>Data & Analytics</p>
          <p>Digital Strategy</p>
          <p>AI & Automation</p>
        </div>

        <div className="services-footer-contact">
          <h2>Let&apos;s Connect</h2>
          <a href="mailto:hello@r4bdesignstudio.com">
            <i className="bi bi-envelope" aria-hidden="true" />
            hello@r4bdesignstudio.com
          </a>
          <a href="tel:+15612890010">
            <i className="bi bi-telephone" aria-hidden="true" />
            (561) 289-0010
          </a>
          <p>
            <i className="bi bi-geo-alt" aria-hidden="true" />
            West Palm Beach, FL
          </p>
          <div className="services-social-links" aria-label="Social links">
            <a href="#" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
            <a href="#" aria-label="GitHub">
              <i className="bi bi-github" />
            </a>
            <a href="#" aria-label="X">
              <i className="bi bi-twitter-x" />
            </a>
          </div>
        </div>
      </footer>

      <DesignAssistant />
    </main>
  );
}
