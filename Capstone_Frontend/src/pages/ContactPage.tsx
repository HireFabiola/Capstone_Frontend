import { useState } from "react";
import apiClient from "../api/apiClient";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    businessName: "",
    projectType: "website",
    budgetRange: "not sure",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await apiClient.post("/inquiries", formData);

      setSuccessMessage(
        "Thank you! Your inquiry has been submitted."
      );

      setFormData({
        clientName: "",
        email: "",
        businessName: "",
        projectType: "website",
        budgetRange: "not sure",
        message: "",
      });
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Contact R4B Design Studio</h1>

      <p>
        Tell me a little about your project, workflow challenge,
        or digital idea.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientName">Name</label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="businessName">Business Name</label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="projectType">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          >
            <option value="website">Website</option>
            <option value="business system">
              Business System
            </option>
            <option value="digital solution">
              Digital Solution
            </option>
            <option value="debugging">Debugging</option>
            <option value="not sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="budgetRange">Budget Range</label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
          >
            <option value="under $500">Under $500</option>
            <option value="$500-$1,000">$500-$1,000</option>
            <option value="$1,000-$2,500">
              $1,000-$2,500
            </option>
            <option value="$2,500+">$2,500+</option>
            <option value="not sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Project Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>

        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </section>
  );
};

export default ContactPage;