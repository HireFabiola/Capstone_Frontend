// src/components/portfolio/JourneySection.tsx

import { useState } from "react";
import { phases, skillCards } from "./portfolioData";

export default function JourneySection() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section id="journey" className="journey-section">
      <div className="section-heading">
        <h2>My Journey. My Growth. My Projects.</h2>
        <p>
          A step-by-step evolution of skills, knowledge, and real-world
          application.
        </p>
      </div>

      <div className="journey-grid">
        <aside className="journey-phases">
          {phases.map((phase) => (
            <article className="phase-card" key={phase.phase}>
              <div className="phase-marker">
                <span className="phase-dot" />
              </div>

              <div className="phase-content">
                <span className="phase-label">{phase.phase}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>

                <div className="phase-tools">
                  {phase.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </aside>

        <div className="journey-skills">
          {skillCards.map((skill) => {
            const isOpen = openCard === skill.title;

            return (
              <article
                className={`skill-card ${skill.visualType === "banner"
                    ? "banner-card"
                    : skill.visualType === "screenshot"
                      ? "screenshot-card"
                      : "icon-card"
                  }`}
                key={skill.title}
              >
                <div
                  className={`skill-thumbnail ${skill.visualType === "screenshot" ? "screenshot" : "icon"
                    }`}
                >
                  <img src={skill.image} alt="" />
                </div>

                <div className="skill-card-content">
                  <h3>{skill.title}</h3>

                  <p className="skill-description">
                    {skill.description}
                  </p>

                  <small
                    className="skill-link"
                    onClick={() =>
                      setOpenCard(isOpen ? null : skill.title)
                    }
                  >
                    {skill.linkLabel} {isOpen ? "▴" : "▾"}
                  </small>

                  {isOpen && skill.details && (
                    <ul className="skill-details">
                      {skill.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}