// src/components/portfolio/TimelineSummary.tsx

const timelineItems = [
  {
    year: "1999 - 2001",
    title: "Entering Technology",
    teaser: "My first degree-related role in a rapidly evolving industry.",
    storyTitle: "The Beginning",
    story:
      "Fresh out of college, I landed a technology role aligned with my degree. Working as a Systems Programmer taught me how quickly technology evolves and how important continuous learning would become.",
  },
  {
    year: "20+ YEARS",
    title: "The Discovery Years",
    teaser: "Educator • Consultant • Analyst • Investor • Entrepreneur",
    storyTitle: "The Detour That Wasn't",
    story:
      "What began as a practical pivot became a period of discovery. As an educator, consultant, analyst, entrepreneur, and investor, I developed the communication, leadership, and problem-solving skills that now shape how I build software.",
  },
  {
    year: "2026 & BEYOND",
    title: "The Return",
    teaser: "Bringing modern engineering skills to decades of experience.",
    storyTitle: "The Return",
    story:
      "Long before React and AI-assisted development, I was a dual-degree engineering student at Spelman with plans connected to Georgia Tech. Life changed the route, but not the destination. Today, I return with modern engineering skills and decades of real-world experience.",
  },
];

export default function TimelineSummary() {
  return (
    <section className="timeline-summary">
      {timelineItems.map((item) => (
        <article className="timeline-card" key={item.title}>
          <span className="timeline-year">{item.year}</span>

          <h3>{item.title}</h3>

          <p>{item.teaser}</p>

          <div className="timeline-story">
            <h4>{item.storyTitle}</h4>
            <p>{item.story}</p>
          </div>
        </article>
      ))}
    </section>
  );
}