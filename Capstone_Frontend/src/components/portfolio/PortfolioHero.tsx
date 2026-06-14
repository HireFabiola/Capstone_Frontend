export default function PortfolioHero() {
  return (
    <section className="portfolio-hero">
      <div className="portfolio-hero-content">
        <p className="hero-eyebrow">
          MY SOFTWARE ENGINEERING JOURNEY
        </p>

        <h1 className="portfolio-hero-title">
          From Systems Programmer
          <br />
          to AI-Native
          <br />
          <span className="hero-accent">
            Full-Stack Developer
          </span>
        </h1>

        <p className="hero-description">
          I build practical digital solutions that solve real problems,
          improve client experiences, and help businesses grow.
        </p>
      </div>

      <div className="hero-image-container">
        <img
          src="/images/portfolio-headshot.png"
          alt="Fabiola Aurelien"
          className="hero-image"
        />

        <div className="hero-quote">
          <p>
            <span className="quote-mark">“</span>
            <br />
            A lifelong love of
            <br />
            problem-solving
            <br />
            and teaching
            <br />
            shaped the way
            <br />
            I build today.
          </p>

          <span className="hero-quote-author">
            Fabiola
          </span>
        </div>
      </div>
    </section>
  );
}