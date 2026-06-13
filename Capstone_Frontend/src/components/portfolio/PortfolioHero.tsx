import { useState } from "react";

export default function PortfolioHero() {
    const [resumeOpen, setResumeOpen] = useState(false);

    return (
        <>
            <section className="portfolio-hero">
                <div className="portfolio-hero-content">
                    <p className="hero-eyebrow">MY SOFTWARE ENGINEERING JOURNEY</p>

                    <h1 className="portfolio-hero-title">
                        From Systems Programmer
                        <br />
                        to AI-Native
                        <br />
                        <span className="hero-accent">Full-Stack Developer</span>
                    </h1>

                    <p className="hero-description">
                        I build practical digital solutions that solve real problems,
                        improve client experiences, and help businesses grow.
                    </p>

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
                </div>

                <div className="hero-image-container">
                    <img
                        src="/images/portfolio-headshot.png"
                        alt="Fabiola Aurelien"
                        className="hero-image"
                    />
                </div>

                <div className="hero-quote">
                    <p>
                        <span className="quote-mark">“</span>
                        A lifelong love of <br />
                        problem-solving <br />
                        and teaching <br />
                        shaped the way <br />I build today.
                    </p>

                    <span className="hero-quote-author">Fabiola</span>
                </div>
            </section>

            {resumeOpen && (
                <div className="resume-modal" onClick={() => setResumeOpen(false)}>
                    <div
                        className="resume-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="resume-close"
                            onClick={() => setResumeOpen(false)}
                        >
                            ✕
                        </button>

                        <iframe
                            src="/Fabiola_Aurelien_Software_Engineer_Resume.pdf"
                            title="Resume"
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
        </>
    );
}