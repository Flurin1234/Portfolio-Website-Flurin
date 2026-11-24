// All personal content lives here; texts exist in German (de) and English (en).

export type Lang = "de" | "en";

export type TimelineEntry = {
  period: string;
  team: string;
  role: string;
  description: string;
  tags: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
  // Set on one group to show it as a wide highlight card
  highlight?: string;
};

export type Hobby = {
  title: string;
  description: string;
  facts: { value: string; label: string }[];
};

export type Photo = {
  src?: string;
  alt: string;
};

export const site = {
  firstName: "Flurin",
  lastName: "Manella",
  email: "flurin.manella@icloud.com",
  portrait: undefined as string | undefined,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/flurin-manella-01b455379/" },
    { label: "GitHub", href: "https://github.com/Flurin1234" },
  ],
};

export const company = "Swisscom";

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Off Work", href: "#off-work" },
];

// Photo band at the end of Off Work
export const marquee: Photo[] = [
  { src: "/images/strand-mond.jpg", alt: "" },
  { src: "/images/saxer-luecke.jpg", alt: "" },
  { src: "/images/marina-nacht.jpg", alt: "" },
  { src: "/images/matterhorn-1.jpg", alt: "" },
  { src: "/images/backyard-sonnenuntergang.jpg", alt: "" },
  { src: "/images/strand-abend.jpg", alt: "" },
  { src: "/images/faelensee-2.jpg", alt: "" },
  { src: "/images/lauf-start.jpg", alt: "" },
];

// Names in the moving tech band below the skills
export const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "SvelteKit",
  "Tailwind CSS",
  "NestJS",
  "Python",
  "Java",
  "Spring Boot",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "MCP",
  "Figma",
];

const sportTags = ["Python", "SvelteKit", "MySQL", "MCP"];

const de = {
  greeting: "Hi, ich bin",
  role: "Informatiker Applikationsentwickler EFZ",
  meta: ["3. Lehrjahr bei Swisscom", "seit 08/2024"],
  work: {
    intro: `Die Teams, in denen ich bei ${company} gearbeitet habe — und was ich dort gemacht habe.`,
    stations: "Meine Stationen",
    skills: "Womit ich arbeite",
    highlight: "Highlight",
  },
  offWork: { intro: "Was ich mache, wenn ich nicht gerade arbeite." },
  timeline: [
    {
      period: "08/2026 — heute",
      team: "Team Halo",
      role: "Full-Stack Entwickler",
      description:
        "Mit Python, SvelteKit, MySQL und MCP habe ich eine App zum Monitoring von Trainingseinheiten gebaut – für Laufen, Radfahren, Krafttraining, Wandern und Trailrunning, ein Thema, das mich auch privat begeistert. Zudem entwickle ich Agents für Bernard, die KI von Swisscom, die beim Kompetenzmanagement unterstützen.",
      tags: ["Python", "SvelteKit", "MySQL", "MCP", "KI-Agents"],
    },
    {
      period: "02/2026 — 08/2026",
      team: "SiteLab",
      role: "Full-Stack Entwickler & Teamleitung",
      description:
        "Ich habe Tailwind CSS gelernt und mein Wissen in SDX, JavaScript und TypeScript vertieft. Dabei habe ich an der Team-Website und an NexTrack mitgearbeitet, einem Tool, das Lernende beim Management ihrer Kompetenzen unterstützt. Ausserdem habe ich die Leitung im Team übernommen und Meetings sowie Besuchstage geführt.",
      tags: ["Tailwind CSS", "SDX", "TypeScript", "Leadership"],
    },
    {
      period: "08/2025 — 02/2026",
      team: "Apps Team",
      role: "Backend Entwickler",
      description:
        "Mein Einstieg ins Backend: Mit NestJS und MySQL habe ich gelernt, wie Server und Datenbanken zusammenspielen. Daraus ist eine eigene CRUD-App mit Authentifizierung und Autorisierung entstanden.",
      tags: ["NestJS", "MySQL", "CRUD", "Auth"],
    },
    {
      period: "02/2025 — 08/2025",
      team: "Codemix2",
      role: "Frontend Entwickler",
      description:
        "Hier habe ich TypeScript gelernt und mein Wissen in JavaScript vertieft. In mehreren Gruppenaufträgen habe ich im Team entwickelt und eine Website vor den Lernbegleitern präsentiert.",
      tags: ["TypeScript", "JavaScript", "Teamarbeit", "Präsentation"],
    },
    {
      period: "08/2024 — 02/2025",
      team: "Minions",
      role: "Frontend Entwickler",
      description:
        "Mein Start in den Arbeitsalltag bei Swisscom. Mit HTML, CSS, JavaScript und Angular habe ich meine ersten Sprachen kennengelernt, mit Scrum gearbeitet und verschiedene kleine Projekte umgesetzt.",
      tags: ["HTML", "CSS", "JavaScript", "Angular", "Scrum"],
    },
  ] as TimelineEntry[],
  skills: [
    {
      category: "KI & Agents",
      highlight: "Agents für Bernard, die KI von Swisscom, und MCP für meine eigene Sport-App.",
      items: ["MCP", "KI-Agents", "Ollama / lokale Modelle", "AWS Bedrock"],
    },
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "SvelteKit", "Tailwind CSS", "SDX", "Responsive Design"],
    },
    { category: "Backend", items: ["NestJS", "Python", "Java", "Spring Boot", "Auth (JWT / OAuth / SSO)"] },
    { category: "Datenbanken", items: ["MySQL", "MariaDB", "PostgreSQL", "MongoDB", "Prisma"] },
    { category: "DevOps & Tools", items: ["Git", "GitHub", "GitLab", "CI/CD", "Docker", "AWS", "Linux", "Bash", "VS Code", "Jira"] },
    { category: "Design", items: ["Figma", "UI Design", "UX Design", "Canva"] },
    { category: "Arbeitsweise", items: ["Scrum", "Kanban", "Code Reviews"] },
    { category: "Sprachen", items: ["Deutsch", "Englisch", "Französisch"] },
  ] as SkillGroup[],
  sportApp: {
    name: "Sport-App",
    description: "Meine eigene App, um Trainings auszuwerten – mit KI-Coach im Chat. Gebaut im Team Halo.",
    tags: sportTags,
    screens: [
      { src: "/images/sport-app/home.jpg", label: "Wochenübersicht", alt: "Startseite mit Wochenübersicht, Distanz-Diagramm und Gesundheitswerten" },
      { src: "/images/sport-app/charts.jpg", label: "Detailansicht", alt: "Detailansicht eines Laufs mit Diagrammen zu Pace und Herzfrequenz" },
      { src: "/images/sport-app/activities.jpg", label: "Aktivitäten", alt: "Liste der Läufe mit Distanzverlauf über mehrere Wochen" },
      { src: "/images/sport-app/performance.jpg", label: "Trainingsstatus", alt: "Form, Fitness und Ermüdung als Diagramm" },
      { src: "/images/sport-app/health.jpg", label: "Schlaf", alt: "Schlaf-Score der letzten 30 Tage" },
      { src: "/images/sport-app/chat.jpg", label: "KI-Coach Max", alt: "Chat mit dem KI-Coach Max" },
    ],
  },
  hobbies: [
    {
      title: "Laufen",
      description: "Laufen ist mein grösstes Hobby. Bei jedem Halbmarathon konnte ich mich verbessern, und in Zermatt war ich schon zweimal bei Trailläufen am Start.",
      facts: [
        { value: "3×", label: "Halbmarathon" },
        { value: "1:38", label: "Bestzeit" },
      ],
    },
    {
      title: "Wandern",
      description: "Am liebsten bin ich mit Kollegen in den Bergen unterwegs. Oben ankommen und den Kopf freibekommen ist der perfekte Ausgleich zum Bildschirm.",
      facts: [
        { value: "Saxer Lücke", label: "Alpstein" },
        { value: "Pilatus", label: "Zentralschweiz" },
      ],
    },
    {
      title: "Krafttraining",
      description: "Als Ergänzung zum Laufen trainiere ich Beine und Oberkörper – so bleibe ich auch auf langen Strecken und steilen Trails stabil.",
      facts: [
        { value: "Beine", label: "Kraft" },
        { value: "Oberkörper", label: "Stabilität" },
      ],
    },
    {
      title: "Klavier",
      description: "Seit zehn Jahren spiele ich Klavier und durfte auch schon an Konzerten auftreten. An den Tasten kann ich komplett abschalten.",
      facts: [
        { value: "10", label: "Jahre am Klavier" },
        { value: "Konzerte", label: "Auf der Bühne gespielt" },
      ],
    },
  ] as Hobby[],
  ui: {
    contact: "Kontakt",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schliessen",
    backToTop: "Nach oben ↑",
    prev: "Vorheriger Screenshot",
    next: "Nächster Screenshot",
    language: "Sprache",
  },
};

export type Content = typeof de;

const en: Content = {
  greeting: "Hi, I'm",
  role: "Software Developer Apprentice (EFZ)",
  meta: ["3rd year at Swisscom", "since 08/2024"],
  work: {
    intro: `The teams I have worked in at ${company} — and what I did there.`,
    stations: "Where I've been",
    skills: "What I work with",
    highlight: "Highlight",
  },
  offWork: { intro: "What I do when I'm not working." },
  timeline: [
    {
      period: "08/2026 — today",
      team: "Team Halo",
      role: "Full-Stack Developer",
      description:
        "Using Python, SvelteKit, MySQL and MCP, I built an app for monitoring training sessions – running, cycling, strength training, hiking and trail running, a topic I'm passionate about outside of work too. I also build agents for Bernard, Swisscom's AI, that support competence management.",
      tags: ["Python", "SvelteKit", "MySQL", "MCP", "AI agents"],
    },
    {
      period: "02/2026 — 08/2026",
      team: "SiteLab",
      role: "Full-Stack Developer & Team Lead",
      description:
        "I learned Tailwind CSS and deepened my knowledge of SDX, JavaScript and TypeScript. I worked on the team website and on NexTrack, a tool that helps apprentices manage their competences. I also took over leading the team and ran meetings and visitor days.",
      tags: ["Tailwind CSS", "SDX", "TypeScript", "Leadership"],
    },
    {
      period: "08/2025 — 02/2026",
      team: "Apps Team",
      role: "Backend Developer",
      description:
        "My start in backend development: with NestJS and MySQL I learned how servers and databases work together. The result was my own CRUD app with authentication and authorisation.",
      tags: ["NestJS", "MySQL", "CRUD", "Auth"],
    },
    {
      period: "02/2025 — 08/2025",
      team: "Codemix2",
      role: "Frontend Developer",
      description:
        "Here I learned TypeScript and deepened my JavaScript skills. I built things together with my team in several group assignments and presented a website to our apprenticeship coaches.",
      tags: ["TypeScript", "JavaScript", "Teamwork", "Presenting"],
    },
    {
      period: "08/2024 — 02/2025",
      team: "Minions",
      role: "Frontend Developer",
      description:
        "My start into everyday work at Swisscom. I got to know my first languages – HTML, CSS, JavaScript and Angular – worked with Scrum and built various small projects.",
      tags: ["HTML", "CSS", "JavaScript", "Angular", "Scrum"],
    },
  ],
  skills: [
    {
      category: "AI & Agents",
      highlight: "Agents for Bernard, Swisscom's AI, and MCP for my own sports app.",
      items: ["MCP", "AI agents", "Ollama / local models", "AWS Bedrock"],
    },
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "SvelteKit", "Tailwind CSS", "SDX", "Responsive design"],
    },
    { category: "Backend", items: ["NestJS", "Python", "Java", "Spring Boot", "Auth (JWT / OAuth / SSO)"] },
    { category: "Databases", items: ["MySQL", "MariaDB", "PostgreSQL", "MongoDB", "Prisma"] },
    { category: "DevOps & Tools", items: ["Git", "GitHub", "GitLab", "CI/CD", "Docker", "AWS", "Linux", "Bash", "VS Code", "Jira"] },
    { category: "Design", items: ["Figma", "UI design", "UX design", "Canva"] },
    { category: "How I work", items: ["Scrum", "Kanban", "Code reviews"] },
    { category: "Languages", items: ["German", "English", "French"] },
  ],
  sportApp: {
    name: "Sports App",
    description: "My own app for analysing training – with an AI coach in the chat. Built in Team Halo.",
    tags: sportTags,
    screens: [
      { src: "/images/sport-app/home.jpg", label: "Weekly overview", alt: "Home page with weekly overview, distance chart and health stats" },
      { src: "/images/sport-app/charts.jpg", label: "Activity details", alt: "Detail view of a run with pace and heart rate charts" },
      { src: "/images/sport-app/activities.jpg", label: "Activities", alt: "List of runs with distance over several weeks" },
      { src: "/images/sport-app/performance.jpg", label: "Training status", alt: "Form, fitness and fatigue chart" },
      { src: "/images/sport-app/health.jpg", label: "Sleep", alt: "Sleep score of the last 30 days" },
      { src: "/images/sport-app/chat.jpg", label: "AI coach Max", alt: "Chat with the AI coach Max" },
    ],
  },
  hobbies: [
    {
      title: "Running",
      description: "Running is my biggest hobby. I got faster with every half marathon, and I've already started twice at trail runs in Zermatt.",
      facts: [
        { value: "3×", label: "Half marathon" },
        { value: "1:38", label: "Personal best" },
      ],
    },
    {
      title: "Hiking",
      description: "I love heading into the mountains with friends. Reaching the top and clearing my head is the perfect balance to the screen.",
      facts: [
        { value: "Saxer Lücke", label: "Alpstein" },
        { value: "Pilatus", label: "Central Switzerland" },
      ],
    },
    {
      title: "Strength",
      description: "Alongside running I train my legs and upper body – so I stay stable on long distances and steep trails.",
      facts: [
        { value: "Legs", label: "Power" },
        { value: "Upper body", label: "Stability" },
      ],
    },
    {
      title: "Piano",
      description: "I've been playing the piano for ten years and have already performed at concerts. At the keys I can switch off completely.",
      facts: [
        { value: "10", label: "Years of piano" },
        { value: "Concerts", label: "Played on stage" },
      ],
    },
  ],
  ui: {
    contact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    backToTop: "Back to top ↑",
    prev: "Previous screenshot",
    next: "Next screenshot",
    language: "Language",
  },
};

export const content: Record<Lang, Content> = { de, en };
