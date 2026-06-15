import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import DesignAssistant from "../components/DesignAssistant";

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

type FooterLink = {
  label: string;
  to: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const features: FeatureProps[] = [
  {
    icon: "bi-people",
    title: "Client Focused",
    description: "Solutions designed around your clients and their experience.",
  },
  {
    icon: "bi-gear",
    title: "Workflow Driven",
    description: "Systems and tools that simplify processes and save time.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Built for Growth",
    description: "Practical digital solutions that support your long-term goals.",
  },
  {
    icon: "bi-leaf",
    title: "Thoughtful Design",
    description: "Clean, intentional design that reflects your brand and builds trust.",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="home-page">
      <section className="home-hero">
        <nav className="home-navbar" aria-label="Primary navigation">
          <Link to="/" className="home-brand" aria-label="R4B Design Studio home">
            <img src="/images/r4b-logo.png" alt="" />
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
            aria-controls="home-navigation"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="home-navigation"
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

        <div className="home-hero-layout">
          <div className="home-hero-content">
            <p className="home-eyebrow">Strategy. Systems. Design.</p>
            <h1>
              Growing your business
              <br />
              with clarity and purpose.
            </h1>
            <span className="home-gold-line" aria-hidden="true" />
            <p className="home-hero-description">
              Thoughtful design, practical systems, and digital tools that help
              you work smarter, serve clients better, and grow sustainably.
            </p>

            <div className="home-hero-buttons">
              <Link to="/contact" className="home-primary-button">
                Let&apos;s Build Together
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
              <Link to="/services" className="home-secondary-button">
                <i className="bi bi-play-circle" aria-hidden="true" />
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        <div className="home-responsive-visual">
          <img
            src="/images/r4b-hero.png"
            alt="A design consultant presenting an R4B website concept to a client"
          />
        </div>

        <div className="home-feature-strip">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-brand">
          <img src="/images/r4b-logo-dark.png" alt="R4B Design Studio" />
          <div>
            <p className="home-footer-kicker">Design Studio</p>
            <p className="home-footer-summary">
              Helping small businesses improve client experience, simplify
              workflows, and build practical digital tools for meaningful growth.
            </p>
            <div className="home-social-links" aria-label="Social links">
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
              <a href="mailto:hello@r4bdesignstudio.com" aria-label="Email">
                <i className="bi bi-envelope" />
              </a>
            </div>
          </div>
        </div>

        <FooterColumn
          title="Explore"
          links={[
            { label: "About", to: "/about" },
            { label: "Services", to: "/services" },
            { label: "Contact", to: "/contact" },
          ]}
        />

        <div className="home-footer-column">
          <h2>Services</h2>
          <p>Custom Websites</p>
          <p>Business Systems</p>
          <p>Client Experience</p>
          <p>Workflow Automation</p>
          <p>Ongoing Support</p>
        </div>

        <div className="home-footer-column home-footer-contact">
          <h2>Let&apos;s Connect</h2>
          <a href="mailto:hello@r4bdesignstudio.com">
            <i className="bi bi-envelope" aria-hidden="true" />
            hello@r4bdesignstudio.com
          </a>
          <a href="tel:+18645550148">
            <i className="bi bi-telephone" aria-hidden="true" />
            (864) 555-0148
          </a>
          <p>
            <i className="bi bi-geo-alt" aria-hidden="true" />
            Greenville, SC
          </p>
          <Link to="/admin/login" className="home-login-link">
            <i className="bi bi-lock" aria-hidden="true" />
            Studio Login
          </Link>
        </div>
      </footer>

      <DesignAssistant />
    </main>
  );
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <article className="home-feature-card">
      <div className="home-feature-icon">
        <i className={`bi ${icon}`} aria-hidden="true" />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="home-footer-column">
      <h2>{title}</h2>
      {links.map((link) => (
        <Link to={link.to} key={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
