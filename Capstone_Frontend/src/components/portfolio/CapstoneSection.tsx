// src/components/portfolio/CapstoneSection.tsx

export default function CapstoneSection() {
  return (
    <section id="capstone" className="capstone-section">

      <div className="capstone-image">
        <img
          src="/images/r4b-capstone.png"
          alt="R4B Design Studio"
        />
      </div>

      <div className="capstone-content">

        <p className="section-eyebrow">
            FULL-STACK MERN CAPSTONE
        </p>

        <h2>R4B Design Studio</h2>

        <p className="capstone-description">
          A full-stack business platform and internal CRM designed to help
          organizations improve client experience, simplify workflows,
          and manage projects from inquiry to completion.
        </p>

        <div className="capstone-features">

          <span>React</span>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>JWT Auth</span>
          <span>REST API</span>
          <span>Admin Dashboard</span>
          <span>Project Management</span>
          <span>Task Tracking</span>

        </div>

        <div className="capstone-highlights">

          <div>
            <h4>Client Inquiries</h4>
            <p>
              Capture and manage incoming business opportunities.
            </p>
          </div>

          <div>
            <h4>Project Management</h4>
            <p>
              Track project status, budgets, and deliverables.
            </p>
          </div>

          <div>
            <h4>Task Management</h4>
            <p>
              Organize and prioritize project tasks efficiently.
            </p>
          </div>

          <div>
            <h4>Secure Authentication</h4>
            <p>
              JWT-based authentication and role-based access.
            </p>
          </div>

        </div>

        <div className="capstone-buttons">

          <a
            href="#"
            className="btn-gold"
          >
            View Live Site
          </a>

          <a
            href="#"
            className="btn-outline-light"
          >
            GitHub Repository
          </a>

        </div>

      </div>

    </section>
  );
}
