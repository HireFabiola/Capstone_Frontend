import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { createInquiry } from "../services/inquiryService";
import "../App.css";

type InquiryForm = {
  clientName: string;
  email: string;
  businessName: string;
  projectType: string;
  budgetRange: string;
  message: string;
};

const initialForm: InquiryForm = {
  clientName: "",
  email: "",
  businessName: "",
  projectType: "",
  budgetRange: "",
  message: "",
};

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await createInquiry(formData);

      setFormData(initialForm);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <nav className="home-navbar contact-navbar" aria-label="Primary navigation">
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
          aria-controls="contact-navigation"
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="contact-navigation"
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

      <section className="contact-layout">
        <div className="contact-intro">
          <p className="contact-eyebrow">LET'S CONNECT</p>

          <h1>
            Let's start the
            <br />
            conversation.
          </h1>

          <p className="contact-description">
            Tell us a little about your project and we'll be in touch soon.
          </p>

          <div className="contact-details-card">
            <h2>R4B Design Studio</h2>
            <p>✉ hello@r4bdesignstudio.com</p>
            <p>☎ (864) 555-0148</p>
            <p>⌖ Greenville, SC</p>
          </div>
        </div>

        <form
          className="contact-form compact-contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <label>
              Name
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Business Name
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
            </label>

            <label>
              Project Type
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="">Select One</option>

                <option value="website">
                  Website Design & Development
                </option>

                <option value="business system">
                  Business System
                </option>

                <option value="digital solution">
                  Digital Solution
                </option>

                <option value="debugging">
                  Debugging / Technical Support
                </option>

                <option value="not sure">
                  Not Sure Yet
                </option>
              </select>
            </label>
          </div>

          <label>
            Budget Range
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
            >
              <option value="">Select Budget</option>

              <option value="under $500">
                Under $500
              </option>

              <option value="$500-$1,000">
                $500 - $1,000
              </option>

              <option value="$1,000-$2,500">
                $1,000 - $2,500
              </option>

              <option value="$2,500+">
                $2,500+
              </option>

              <option value="not sure">
                Not Sure Yet
              </option>
            </select>
          </label>

          <label>
            Project Details
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "SENDING..."
              : "SEND INQUIRY →"}
          </button>
        </form>
      </section>

      {success && (
        <div className="thank-you-overlay">
          <div className="thank-you-modal">
            <button
              type="button"
              className="modal-close"
              onClick={() => setSuccess(false)}
            >
              ×
            </button>

            <p className="contact-eyebrow">
              INQUIRY SENT
            </p>

            <h2>Thank You!</h2>

            <p>
              Your inquiry has been received. We'll
              review your project details and follow
              up soon.
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
