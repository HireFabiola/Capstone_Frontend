// src/components/portfolio/portfolioData.ts
export const phases = [
  {
    phase: "Phase 01",
    title: "Professional Workflow",
    description: "Version control, GitHub workflows, and developer setup.",
    tools: ["Git", "GitHub", "Branches", "Pull Requests", "Code Review"],
  },
  {
    phase: "Phase 02",
    title: "Web Foundations & Design",
    description: "HTML, CSS, responsive layouts, and foundational UI design.",
    tools: ["HTML", "CSS", "Flexbox", "CSS Grid", "Accessibility"],
  },
  {
    phase: "Phase 03",
    title: "JavaScript & TypeScript",
    description:
      "Core programming, DOM interaction, typed development, and frontend logic.",
    tools: ["JavaScript", "TypeScript", "DOM", "Events"],
  },
  {
    phase: "Phase 04",
    title: "React Development",
    description:
      "Component-based interfaces, hooks, routing, and advanced React patterns.",
    tools: ["React", "Hooks", "React Router", "State"],
  },
  {
    phase: "Phase 05",
    title: "Backend & Databases",
    description: "Node.js, Express, MongoDB, middleware, APIs, and authentication.",
    tools: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
  },
  {
    phase: "Phase 06",
    title: "Full-Stack MERN & Capstone",
    description:
      "Unified interfaces, deployment, full-stack integration, and capstone delivery.",
    tools: ["MERN", "Deployment", "Auth", "AI Tools"],
  },
];
export const skillCards = [
  {
    title: "Version Control & Collaboration",
    image: "/images/journey/git.svg",
    description:
      "Completed a Git project simulation using branches, merge conflict resolution, pull requests, peer review, and repository management.",
    tags: [
      "Git",
      "GitHub",
      "Branches",
      "Merge Conflicts",
      "Pull Requests",
      "Code Review",
    ],
    linkLabel: "Highlights",
    details: [
      "Worked confidently with feature branches and Git workflows.",
      "Resolved merge conflicts and integrated code safely.",
      "Collaborated through pull requests and peer reviews.",
      "Applied version control practices used by professional development teams.",
    ],
  },
  {
    title: "Responsive & Accessible Web Page",
    image: "/images/journey/responsive.png",
    visualType: "screenshot",
    description:
      "Designed and developed a responsive multi-section website using semantic HTML, modern CSS layouts, and accessibility-first design principles.",

    linkLabel: "Highlights",

    details: [
      "Built responsive layouts that adapt seamlessly across devices.",
      "Applied semantic HTML to improve structure and accessibility.",
      "Created modern interfaces using Flexbox and CSS Grid.",
      "Implemented accessibility best practices for inclusive user experiences.",
      "Designed with mobile-first thinking and responsive breakpoints.",
    ],
  },
  {
  title: "Design Systems & CSS Frameworks",
  image: "/images/journey/design.png",
  visualType: "banner",

  description:
    "Explored modern design-to-development workflows using Figma, Bootstrap, and Tailwind CSS to create responsive, user-focused interfaces.",

  linkLabel: "Highlights",

  details: [
    "Created wireframes and high-fidelity mockups using Figma.",
    "Built interactive prototypes to communicate user experiences and design intent.",
    "Practiced designer-to-developer handoff workflows and collaboration techniques.",
    "Implemented responsive layouts using Bootstrap's grid system and components.",
    "Explored utility-first styling concepts with Tailwind CSS.",
    "Customized framework styles to support branding and design requirements.",
  ],
},

  {
    title: "JavaScript & TypeScript Foundations",
    image: "/images/journey/js-ts.svg",
    visualType: "icon",

    description:
      "Developed interactive web experiences through JavaScript programming, DOM manipulation, event handling, and strongly typed TypeScript development.",

    linkLabel: "Highlights",

    details: [
      "Strengthened problem-solving through real-world programming challenges.",
      "Used DOM manipulation to create interactive user experiences.",
      "Handled events and dynamic content updates with confidence.",
      "Introduced TypeScript for safer and more maintainable code.",
      "Connected application logic directly to user interactions.",
    ],
  },
  {
    title: "React Application Development",
    image: "/images/journey/react.svg",
    description:
      "Built component-based applications with state, routing, and API integration.",
    tags: ["React", "Hooks", "React Router", "API"],
    linkLabel: "View Project",
    details: [
      "Built reusable component-based user interfaces.",
      "Managed application state using modern React patterns.",
      "Implemented client-side routing for seamless navigation.",
      "Created scalable frontend architectures for larger applications.",
      "Developed interactive experiences with a focus on usability.",
    ],
  },
  {
    title: "Backend & Database Development",
    image: "/images/journey/backend.svg",
    description:
      "Developed server-side features using APIs, authentication, and database logic.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    linkLabel: "View Project",
    details: [
      "Designed RESTful APIs to support frontend applications.",
      "Built server-side functionality using Node.js and Express.",
      "Modeled and managed data with MongoDB and Mongoose.",
      "Implemented authentication and protected application resources.",
      "Connected frontend and backend systems into complete workflows.",
    ],
  },
  {
    title: "Full-Stack MERN Capstone",
    image: "/images/journey/mern.svg",
    description:
      "Unified frontend, backend, database, authentication, and deployment into a complete business platform.",
    tags: ["MERN", "TypeScript", "Auth", "Deployment"],
    linkLabel: "View Capstone",
    details: [
      "Integrated frontend, backend, and database technologies into full-stack solutions.",
      "Deployed production-ready applications to the web.",
      "Applied authentication, APIs, and database design in real projects.",
      "Leveraged AI-assisted development tools to accelerate delivery.",
      "Delivered a complete capstone application from concept to deployment.",
    ],
  },
];
export const projects = [
  {
    image: "/images/project-wanderlust.png",
    title: "WanderLust",
    description:
      "Travel exploration app with maps, APIs, and state management.",
    tech: ["TypeScript", "API", "Bootstrap"],
  },
  {
    image: "/images/project-dashboard.png",
    title: "Task Dashboard",
    description:
      "Real-time dashboard with charts, filtering, and task analytics.",
    tech: ["React", "Charts", "Context API"],
  },
  {
    image: "/images/project-counter.png",
    title: "Character Counter",
    description:
      "Real-time character, word, and reading time calculator.",
    tech: ["React", "TypeScript", "LocalStorage"],
  },
  {
    image: "/images/project-bookshelf.png",
    title: "Digital Bookshelf",
    description:
      "Full-stack app for managing books with CRUD operations.",
    tech: ["Node.js", "Express", "EJS", "CRUD"],
  },
  {
    image: "/images/project-fuelwise.png",
    title: "FuelWise",
    description:
      "Team project with auth, APIs, and protected routes.",
    tech: ["React", "Node.js", "JWT"],
  },
];