// src/components/portfolio/ProjectsSection.tsx

import { projects } from "./portfolioData";

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-heading">
        <p className="section-eyebrow">FROM LEARNING TO BUILDING</p>

        <h2>Real Projects. Real Impact.</h2>

        <p>
          Each project reflects a new layer of growth, from frontend foundations
          to full-stack applications.
        </p>
      </div>

      <div className="projects-grid">
      {projects.map((project) => (
  <a
    key={project.title}
    href={project.liveUrl}
    target="_blank"
    rel="noreferrer"
    className="project-card-link"
  >
    <article className="project-card">
      <img src={project.image} alt={project.title} />

      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <div className="project-tags">
        {project.tech.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <span className="project-launch">
        View Live →
      </span>
    </article>
  </a>
))}
      </div>
    </section>
  );
}
