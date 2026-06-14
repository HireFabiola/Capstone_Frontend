import { useEffect, useState } from "react";
export default function ContactSection() {
    const [latestRepo, setLatestRepo] = useState<any>(null);
    const [latestCommit, setLatestCommit] = useState<any>(null);

    useEffect(() => {
        fetch("https://api.github.com/users/HireFabiola/repos")
            .then((res) => res.json())
            .then(async (repos) => {
                const sorted = repos.sort(
                    (a: any, b: any) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                );

                const repo = sorted[0];

                setLatestRepo(repo);

                const commitResponse = await fetch(
                    `https://api.github.com/repos/HireFabiola/${repo.name}/commits`
                );

                const commits = await commitResponse.json();

                setLatestCommit(commits[0]);
            });
    }, []);

    const commitText =
        latestCommit?.commit?.message?.length > 80
            ? latestCommit.commit.message.slice(0, 80) + "..."
            : latestCommit?.commit?.message;

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
<div className="github-status-line">
 <span className="github-label">
  Currently Building:{" "}
</span>

  <span className="github-link">
    {latestRepo.name}
  </span>

  <span className="footer-mascot">
    👩🏾‍💻
  </span>
</div>

    {latestCommit && (
      <p className="commit-message">
        "{commitText}"
      </p>
    )}

    <p className="github-meta">
      Updated{" "}
      {new Date(latestRepo.updated_at).toLocaleDateString()}
      {" • "}
      {latestRepo.language}
    </p>

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