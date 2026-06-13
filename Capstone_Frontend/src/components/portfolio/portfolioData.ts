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
    "Building interactivity, managing browser behavior, and introducing type-safe development through progressively more complex applications.",
  tools: ["JavaScript", "DOM", "TypeScript", "ES6+", "Local Storage"],
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
    phase: "Phase 01",
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
      phase: "Phase 02",
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
    phase: "Phase 02",
  title: "Design Systems & CSS Frameworks",
  image: "/images/journey/design.png",
  visualType: "design",

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
    phase: "Phase 03",
    title: "JavaScript Fundamentals",
    image: "/images/journey/Taskapp.png",
    visualType: "screenshot",
    linkLabel: "Highlights",
    description:
      "Built a functional task management application using core JavaScript concepts, strengthening logic, data handling, and interactive application behavior.",
    details: [
      "Created, updated, and deleted task data using JavaScript logic",
      "Practiced arrays, objects, functions, and conditionals",
      "Built filtering and status-based task organization",
      "Strengthened application state and user interaction patterns",
    ],
  },
  {
    phase: "Phase 03",
    title: "DOM Manipulation & Browser APIs",
    image: "/images/journey/DOM2.png",
    visualType: "design",
    linkLabel: "Highlights",
    description:
      "Developed an interactive blog tracking tool that connected JavaScript logic to the browser through DOM manipulation, events, and local storage.",
    details: [
      "Manipulated DOM elements dynamically",
      "Handled user interactions with event listeners",
      "Persisted data using localStorage",
      "Rendered saved blog ideas back to the interface",
      "Improved understanding of browser-based functionality",
    ],
  },
  {
    phase: "Phase 03",
    title: "Type-Safe Development",
    image: "/images/journey/TS.png",
    visualType: "icon",
    linkLabel: "Highlights",
    description:
      "Built an eCommerce application while transitioning from JavaScript to TypeScript, focusing on stronger data modeling and maintainable code structure.",
    details: [
      "Created interfaces and custom types",
      "Implemented type-safe application logic",
      "Improved maintainability through modular architecture",
      "Strengthened scalable frontend development practices",
    ],
  }, 
{
      phase: "Phase 04",
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
      phase: "Phase 05",
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
  phase: "Phase 06",
  title: "Full-Stack MERN Development",
  image: "/images/journey/MERN.jpeg",
  visualType: "icon",
  description:
    "Built a full-stack business application using React, TypeScript, Node.js, Express, and MongoDB. This phase brought the frontend, backend, database, REST APIs, JWT authentication, protected admin routes, inquiry management, project tracking, task workflows, and deployment together into one complete MERN capstone for R4B Design Studio.",
  tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
  linkLabel: "View Capstone",
  details: [
    
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
    liveUrl: "https://hirefabiola.github.io/REST_Countries_API/",
  },
  {
    image: "/images/project-dashboard.png",
    title: "Task Dashboard",
    description:
      "Real-time dashboard with charts, filtering, and task analytics.",
    tech: ["React", "Charts", "Context API"],
    liveUrl: "https://hirefabiola.github.io/react-task-dashboard/",
  },
  {
    image: "/images/project-flashcard.png",
    title: "GenAI Flashcard App",
    description:
      "An AI-assisted study tool that presents learning content through an interactive flashcard experience.",
    tech: ["React", "TypeScript", "GenAI"],
    liveUrl: "https://hirefabiola.github.io/Mod8_GenAI/",
  },
  {
    image: "/images/project-bookshelf.png",
    title: "Digital Bookshelf",
    description:
      "Full-stack app for managing books with CRUD operations.",
    tech: ["Node.js", "Express", "EJS", "CRUD"],
    liveUrl: "https://booklistapp-q5sm.onrender.com/",
  },
  {
    image: "/images/project-fuelwise.png",
    title: "FuelWise",
    description:
      "Team project with auth, APIs, and protected routes.",
    tech: ["React", "Node.js", "JWT"],
    liveUrl: "https://robb-designs.github.io/fuelwise/",
  },
];