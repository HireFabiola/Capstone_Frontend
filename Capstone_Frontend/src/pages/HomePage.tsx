import "../App.css";
import { Link } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css";
import DesignAssistant from "../components/DesignAssistant";


type FeatureProps = {
    icon: string;
    title: string;
    description: string;
};

type FooterColumnProps = {
    title: string;
    links: string[];
};

export default function HomePage() {
    return (
        <main className="home-page">
            <section
                className="hero"
                style={{
                    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(244, 229, 218, 0.98) 0%,
        rgba(244, 229, 218, 0.94) 25%,
        rgba(244, 229, 218, 0.65) 45%,
        rgba(244, 229, 218, 0.2) 65%,
        rgba(244, 229, 218, 0) 82%
      ),
      url("/images/r4b-hero.png")
    `,
                }}
            >


                <nav className="navbar">
                    <div className="brand">
                     <img src="/images/r4b-logo.png" alt="R4B Design Studio" />
                        <div className="brand-divider"></div>
                        <p>
                            <span>DESIGN</span> STUDIO
                        </p>
                    </div>

                    <div className="nav-links">
                        <a className="active" href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/services">Services</a>
                        <a href="/work">Work</a>
                        <a href="/resources">Resources</a>
                        <a href="/contact">Contact</a>
                    </div>
                </nav>

                <div className="hero-content">
                    <h1>Growing your business <br />with clarity and purpose.</h1>
                    <div className="gold-line"></div>
                    <p>
                        Thoughtful design, practical systems, and digital tools that help
                        you work smarter, serve clients better, and grow sustainably.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-btn"><Link to="/contact">LET’S BUILD TOGETHER →</Link></button>
                        <button className="secondary-btn">
                            <span>▷</span> <Link to="/work">VIEW OUR WORK</Link>
                        </button>
                    </div>
                </div>
            </section>

            <section className="feature-strip">
                <Feature
                    icon="👥"
                    title="CLIENT FOCUSED"
                    description="Solutions designed around your clients and their experience."
                />
                <Feature
                    icon="⚙️"
                    title="WORKFLOW DRIVEN"
                    description="Systems and tools that simplify processes and save time."
                />
                <Feature
                    icon="📈"
                    title="BUILT FOR GROWTH"
                    description="Practical digital solutions that support your long-term goals."
                />
                <Feature
                    icon="🍃"
                    title="THOUGHTFUL DESIGN"
                    description="Clean, intentional design that reflects your brand and builds trust."
                />
            </section>

            <footer className="footer">
                <div className="flex flex-col items-center text-center">
                    <h3 className="mb-4 text-sm tracking-[3px] text-[#A56F08]">
                        FIND US
                    </h3>

                    <img
                        src="/images/r4b-logo-dark.png"
                        alt="R4B Design Studio"
                        className="mb-4 w-24"
                    />

                    <p className="mb-4 text-white">
                        @r4bdesignstudio
                    </p>

                    <div className="mb-6 flex gap-5 text-2xl text-white">
                        <i className="bi bi-instagram hover:text-[#A56F08]"></i>
                        <i className="bi bi-facebook hover:text-[#A56F08]"></i>
                        <i className="bi bi-twitter-x hover:text-[#A56F08]"></i>
                    </div>

                    <p className="text-xs text-white/60">
                        © R4B Design Studio
                    </p>
                </div>

                <FooterColumn
                    title="EXPLORE"
                    links={["About", "Services", "Work", "Resources", "Contact"]}
                />

                <FooterColumn
                    title="SERVICES"
                    links={[
                        "Custom Websites",
                        "Business Systems",
                        "Client Experience",
                        "Workflow Automation",
                        "Ongoing Support",
                    ]}
                />

                <FooterColumn
                    title="RESOURCES"
                    links={["Guides", "Templates", "Tools We Love", "Studio Notes"]}
                />

                <div className="footer-column">
                    <h3>LET’S CONNECT</h3>
                    <p>✉ hello@r4bdesignstudio.com</p>
                    <p>☎ (864) 555-0148</p>
                    <p>⌖ Greenville, SC</p>
                    <Link to="/admin/login" className="login-link">🔒 Admin Login</Link>
                </div>
            </footer>
            <DesignAssistant />
        </main>
    );
}

function Feature({ icon, title, description }: FeatureProps) {
    return (
        <article className="feature-card">
            <div className="feature-icon">{icon}</div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </article>
    );
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="footer-column">
            <h3>{title}</h3>
            {links.map((link) => (
                <a href="#" key={link}>
                    {link}
                </a>
            ))}
        </div>
    );
}