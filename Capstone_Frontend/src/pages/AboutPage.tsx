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
  { icon: "bi-window", label: "Custom Website Development" },
  { icon: "bi-code-slash", label: "Full-Stack Applications" },
  { icon: "bi-gear", label: "Business Process Solutions" },
  { icon: "bi-bar-chart-line", label: "Dashboards & Reporting" },
  { icon: "bi-compass", label: "Digital Strategy Consulting" },
  { icon: "bi-cpu", label: "AI-Powered Workflows" },
];

const process = [
  {
    icon: "bi-search",
    title: "Discover",
    text: "We begin by understanding your goals, challenges, clients, and vision.",
  },
  {
    icon: "bi-pencil",
    title: "Design",
    text: "We shape thoughtful solutions around real business needs and outcomes.",
  },
  {
    icon: "bi-code-slash",
    title: "Develop",
    text: "We build maintainable digital tools with clarity and care.",
  },
  {
    icon: "bi-rocket-takeoff",
    title: "Deliver",
    text: "We launch, support, and help your organization keep growing.",
  },
];

const HandshakeIcon = () => (
  <svg
    className="about-handshake-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7.5 11.6 10 9.1a2.8 2.8 0 0 1 3.95 0l.55.55" />
    <path d="m14.5 9.65 1.2-1.2a2.5 2.5 0 0 1 3.55 0l1.45 1.45-4.6 4.6" />
    <path d="m3.3 9.9 1.45-1.45a2.5 2.5 0 0 1 3.55 0l.9.9" />
    <path d="m8.35 14.65 2.2 2.2a1.3 1.3 0 0 0 1.85 0 1.3 1.3 0 0 0 0-1.85" />
    <path d="m10.35 12.65 3.2 3.2a1.3 1.3 0 0 0 1.85-1.85l-2.1-2.1" />
    <path d="m14.7 12.9 1.25 1.25a1.3 1.3 0 0 0 1.85-1.85l-2.2-2.2" />
    <path d="m5.35 11.95 3 3" />
    <path d="m18.65 11.95-2.7 2.7" />
  </svg>
);

const values = [
  { icon: "bi-briefcase", label: "Business Understanding" },
  { icon: "bi-pie-chart", label: "Analytical Problem Solving" },
  { icon: "bi-person", label: "User-Centered Design" },
  { icon: "bi-code-slash", label: "Modern Development" },
  { icon: "handshake", label: "Long-Term Partnership" },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="about-page">
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
            aria-controls="about-navigation"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="about-navigation"
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

      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-kicker">About</p>
          <h1>
            About R4B
            <br />
            Design Studio
          </h1>
          <p className="about-hero-lead">
            Building digital solutions rooted in strategy, clarity, and purpose.
          </p>
          <span className="about-rule" aria-hidden="true" />
          <p>
            Great technology begins with understanding people. We partner with
            entrepreneurs, small businesses, nonprofits, and growing
            organizations to turn ideas into meaningful digital experiences.
          </p>
          <p>
            Whether it is a website, custom application, business workflow, or
            technology consultation, our goal is simple:
          </p>
          <strong>Create solutions that help businesses grow with confidence.</strong>
        </div>

        <div className="about-hero-art" aria-hidden="true" />
      </section>

      <section className="about-story about-section">
        <div>
          <p className="about-kicker">Our Story</p>
          <h2>From Roots to Branches</h2>
          <p>
            R4B stands for <strong>Roots 4 Branches</strong>, a philosophy built
            on the belief that strong foundations create lasting growth.
          </p>
          <p>
            What began as a commitment to helping people and organizations
            establish stronger roots has evolved into a studio focused on
            technology, design, and business solutions.
          </p>
        </div>

        <div className="about-story-mark" aria-hidden="true">
          <img src="/images/tree-transparent.png" alt="" />
          <span>Roots 4 Branches</span>
        </div>

        <div className="about-story-closing">
          <p>
            With experience spanning education, analytics, business operations,
            and software development, we approach every project with a unique
            perspective.
          </p>
          <h3>We do not just build software. We solve problems.</h3>
          <p>
            By combining strategic thinking with modern technologies, we help
            clients move from concept to implementation with clarity and purpose.
          </p>
        </div>
      </section>

      <section className="about-services about-section">
        <div className="about-section-heading">
          <p className="about-kicker">What We Do</p>
          <h2>Services</h2>
        </div>

        <div className="about-service-grid">
          {services.map((service) => (
            <article key={service.label}>
              <i className={`bi ${service.icon}`} aria-hidden="true" />
              <h3>{service.label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="about-process about-section">
        <div className="about-section-heading">
          <p className="about-kicker">Our Approach</p>
          <h2>How We Work</h2>
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

      <section className="about-values">
        <div className="about-values-intro">
          <p className="about-kicker">Why Clients Choose R4B</p>
          <h2>More Than Technology</h2>
          <p>Our approach combines:</p>
        </div>

        <div className="about-values-grid">
          {values.map((value) => (
            <article key={value.label}>
              {value.icon === "handshake" ? (
                <HandshakeIcon />
              ) : (
                <i className={`bi ${value.icon}`} aria-hidden="true" />
              )}
              <span>{value.label}</span>
            </article>
          ))}
        </div>

        <blockquote>
          <i className="bi bi-quote" aria-hidden="true" />
          <br/>We understand that technology is not the goal.
          <br />
          <strong>Results are.</strong>
        </blockquote>
      </section>

      <section className="about-founder about-section">
        <div className="about-founder-copy">
          <p className="about-kicker">Founder</p>
          <h2>Meet the Founder</h2>
          <p className="about-signature">Fabiola Aurelien</p>
          <p>
            Fabiola brings a unique blend of experience spanning software
            development, mathematics, education, analytics, and business
            operations.
          </p>
          <p>
            After helping students solve complex problems for over two decades,
            she returned to her technology roots to build solutions that empower
            businesses and communities.
          </p>
          <p>
            Her background as both a systems thinker and educator allows her to
            bridge technical complexity with real-world business needs.
          </p>
          <p>
            Today, she combines modern software engineering practices with a
            passion for helping organizations create meaningful impact through
            technology.
          </p>
        </div>

        <div className="about-founder-portrait">
          <img
            src="/images/portfolio-headshot.png"
            alt="Fabiola Aurelien, founder of R4B Design Studio"
          />
        </div>
      </section>

      <section className="about-cta">
        <div>
          <p className="about-kicker">Ready to Grow?</p>
          <h2>Let&apos;s Build Something Together.</h2>
          <p>
            Whether you are launching a new idea, improving an existing process,
            or exploring what is possible with technology, we would love to help.
          </p>
          <strong>Every strong branch begins with strong roots.</strong>
        </div>

        <Link to="/contact" className="about-cta-button">
          Let&apos;s Connect
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </section>

      <DesignAssistant />
    </main>
  );
}
