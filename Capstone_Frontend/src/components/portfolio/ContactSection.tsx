import { useEffect, useState } from "react";
export default function ContactSection() {
   const [latestRepo, setLatestRepo] = useState<any>(null);

    useEffect(() => {
        fetch("https://api.github.com/users/HireFabiola/repos")
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort(
                    (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                );

                setLatestRepo(sorted[0]);
            });
    }, []);

    return (
        <section id="contact" className="contact-section">
            <div className="contact-content">
                <h2 className="contact-title">
                    Let's Build Something
                    <br />
                    <span className="accent">Together</span>
                </h2>
                <p className="contact-description">
                    Whether you're looking for a developer, collaborator, or problem
                    solver, I’d love to hear from you.
                </p>

                <form
                    className="contact-form"
                    action="https://formspree.io/f/YOUR_FORM_ID"
                    method="POST"
                >
                    <div className="form-row">
                        <input type="text" name="name" placeholder="Your Name" required />

                        <input type="email" name="email" placeholder="Your Email" required />
                    </div>

                    <input type="text" name="subject" placeholder="Subject" required />

                    <textarea
                        name="message"
                        placeholder="Tell me a little about what you're looking for..."
                        rows={6}
                        required
                    />

                    <button type="submit" className="btn-gold">
                        Send Message
                    </button>
                </form>
            </div>

{latestRepo && (
  <div className="github-footer-note">
    <div className="github-meta">
      <span>Currently Building</span>
      <h4>{latestRepo.name}</h4>
    </div>

    <div className="github-stats">
      <span>
        Updated{" "}
        {new Date(latestRepo.updated_at).toLocaleDateString()}
      </span>

      {latestRepo.language && (
        <span>{latestRepo.language}</span>
      )}
    </div>

    <a
      href={latestRepo.html_url}
      target="_blank"
      rel="noreferrer"
      className="github-link"
    >
      View on GitHub →
    </a>
  </div>
)}
        </section>
    );
}