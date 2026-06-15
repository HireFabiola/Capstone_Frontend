// src/components/portfolio/JourneySection.tsx

import { useState } from "react";
import { phases, skillCards } from "./portfolioData";


export default function JourneySection() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const journeyGroups = phases.map((phase) => ({
    ...phase,
    skills: skillCards.filter((skill) => skill.phase === phase.phase),
  }));

  return (
    <section id="journey" className="journey-section">
      <div className="section-heading">
        <h2>My Journey. My Growth. My Projects.</h2>
        <p>
          A step-by-step evolution of skills, knowledge, and real-world
          application.
        </p>
      </div>

      <div className="journey-groups">
        {journeyGroups.map((group) => (
          <div className="journey-group" key={group.phase}>
            <aside className="journey-phases">
              <article className="phase-card">
                <div className="phase-marker">
                  <span className="phase-dot" />
                </div>

                <div className="phase-content">
                  <span className="phase-label">{group.phase}</span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>

                  <div className="phase-tools">
                    {group.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            </aside>

            <div className="journey-skills">
              {group.skills.map((skill) => {
                const isOpen = openCard === skill.title;
                const hasNoGraphicFrame =
                  skill.title === "Design Systems & CSS Frameworks";
                const isAccessiblePreview =
                  skill.title === "Responsive & Accessible Web Page";
                const isTaskAppPreview =
                  skill.title === "JavaScript Fundamentals";

                return (
                  <article
                    className={`skill-card ${skill.phase === "Phase 06"
                        ? "capstone-card"
                        : skill.visualType === "design"
                          ? "design-card"
                          : skill.visualType === "screenshot"
                            ? "screenshot-card"
                            : "icon-card"
                      }`}
                    key={skill.title}
                  >
                    {skill.phase === "Phase 06" ? (
  <div className="skill-card-main capstone-card-main">
    <div className="skill-card-content capstone-card-content">
      <h3>{skill.title}</h3>
    </div>

    <div className="capstone-card-graphic graphic-image-frame">
      <img src={skill.image} alt="" />
    </div>

    <p className="skill-description capstone-card-description">
      {skill.description}
    </p>
  </div>
) : (
  <div className="skill-card-main">
    <div
      className={`skill-thumbnail ${
        skill.visualType === "design"
          ? "design"
          : skill.visualType === "screenshot"
          ? "screenshot"
          : "icon"
      } ${skill.phase === "Phase 03" ? "graphic-image-frame" : ""} ${
        hasNoGraphicFrame ? "no-graphic-frame" : ""
      } ${isAccessiblePreview ? "accessible-preview" : ""} ${
        isTaskAppPreview ? "taskapp-preview" : ""
      }`}
    >
      <img src={skill.image} alt="" />
    </div>

    <div className="skill-card-content">
      <h3>{skill.title}</h3>
      <p className="skill-description">{skill.description}</p>
    </div>
  </div>
)}

                    <div className="skill-card-highlights">
                      {skill.phase === "Phase 06" ? (
                        <a href="#capstone" className="skill-link">
                          View Capstone →
                        </a>
                      ) : (
                        <small
                          className="skill-link"
                          onClick={() => setOpenCard(isOpen ? null : skill.title)}
                        >
                          {skill.linkLabel} {isOpen ? "▴" : "▾"}
                        </small>
                      )}

                      {isOpen && (
                        <>
                          {skill.details && (
                            <ul className="skill-details">
                              {skill.details.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {skill.visualType === "design" &&
                            !skill.title.toLowerCase().includes("dom") && (
                              <div className="implementation-proof">
                                <p className="proof-title">
                                  Design-to-Development Example
                                </p>

                                <div className="proof-grid">
                                  <figure>
                                    <span>Figma Design</span>
                                    <img
                                      src="/images/journey/frontend-mentor-design.png"
                                      alt="Frontend Mentor Figma design"
                                    />
                                  </figure>

                                  <figure>
                                    <span>My Implementation</span>
                                    <img
                                      src="/images/journey/frontend-mentor-build.png"
                                      alt="Implemented webpage"
                                    />
                                  </figure>
                                </div>

                                <button
                                  className="comparison-link"
                                  onClick={() => setComparisonOpen(true)}
                                >
                                  View Full Comparison ↗
                                </button>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {comparisonOpen && (
        <div
          className="comparison-modal"
          onClick={() => setComparisonOpen(false)}
        >
          <div
            className="comparison-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="comparison-close"
              onClick={() => setComparisonOpen(false)}
            >
              ✕
            </button>

            <h3>Frontend Mentor Challenge</h3>

            <div className="comparison-images">
              <div>
                <h4>Figma Design</h4>

                <img
                  src="/images/journey/frontend-mentor-design.png"
                  alt=""
                />
              </div>

              <div>
                <h4>My Implementation</h4>

                <iframe
                  src="https://hirefabiola.github.io/SBA3_DesignDevelopment/"
                  title="Frontend Mentor Implementation"
                  className="comparison-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      )}


    </section>
  );
}
