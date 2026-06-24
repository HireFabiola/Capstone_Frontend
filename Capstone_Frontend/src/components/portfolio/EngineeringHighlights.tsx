import { linkedInReflections } from "./portfolioData";

export default function EngineeringHighlights() {
  const visibleReflections = linkedInReflections
    .filter(
      (reflection) =>
        reflection.title.trim().length > 0 &&
        reflection.excerpt.trim().length > 0 &&
        reflection.linkedinUrl.trim().length > 0
    )
    .slice(0, 3);

  return (
    <section className="engineering-highlights" aria-labelledby="engineering-highlights-title">
      <div className="engineering-highlights-panel">
        <div className="engineering-highlights-header">
          <div>
            <p className="section-eyebrow">Engineering Insights</p>
            <h2 id="engineering-highlights-title">Insights from the Journey</h2>
            <p>
              Reflections on software engineering, career transition,
              problem-solving, and the lessons I&apos;m learning as I continue to
              build.
            </p>
          </div>
        </div>

        <div className="engineering-highlight-grid">
          {visibleReflections.map((reflection) => (
            <a
              className="engineering-highlight-card"
              href={reflection.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={reflection.linkedinUrl}
            >
              <span className="linkedin-badge" aria-hidden="true">
                in
              </span>

              <h3>{reflection.title}</h3>
              <p>{reflection.excerpt}</p>

              <span className="engineering-card-cta">
                Continue Reading <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}

          <a
            href="https://www.linkedin.com/in/fabiola-aurelien/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="engineering-view-all"
          >
            View all insights on LinkedIn <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
