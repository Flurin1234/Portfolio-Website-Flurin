// All personal content lives here; edit this file to update the site.

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
  caption: string;
  description: string;
  // Shown in the moving band when hovering the row
  keywords: string[];
};

export type Photo = {
  src?: string;
  alt: string;
};

export const site = {
  firstName: "Flurin",
  lastName: "Nachname",
  role: "Deine Rolle / Beruf",
  location: "Schweiz",
  email: "hallo@example.com",
  portrait: undefined as string | undefined,
  statement: [
    { text: "Ich " },
    { text: "gestalte", strong: true },
    { text: " und " },
    { text: "entwickle", strong: true },
    { text: " Dinge, die Menschen gerne benutzen — mit Fokus auf " },
    { text: "Details", strong: true },
    { text: ", sauberen Code und gutes Design." },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const company = "Swisscom";

// Photo band on the home page
export const marquee: Photo[] = [
  { src: "/images/strand-mond.jpg", alt: "Mondaufgang über dem Strand" },
  { src: "/images/saxer-luecke.jpg", alt: "Kreuzberge im Alpstein" },
  { src: "/images/marina-nacht.jpg", alt: "Hafen bei Nacht" },
  { src: "/images/matterhorn-1.jpg", alt: "Matterhorn" },
  { src: "/images/backyard-sonnenuntergang.jpg", alt: "Zielbogen im Sonnenuntergang" },
  { src: "/images/strand-abend.jpg", alt: "Strand am Abend" },
  { src: "/images/faelensee-2.jpg", alt: "Ufer am Fälensee" },
  { src: "/images/lauf-start.jpg", alt: "Am Start eines Laufs" },
];

// Newest first
export const timeline: TimelineEntry[] = [
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
];

export const skills: SkillGroup[] = [
  {
    category: "KI & Agents",
    highlight: "Agents für Bernard, die KI von Swisscom, und MCP für meine eigene Sport-App.",
    items: ["MCP", "KI-Agents", "Bernard"],
  },
  {
    category: "Frontend",
    items: ["HTML & CSS", "JavaScript", "TypeScript", "Angular", "SvelteKit", "Tailwind CSS", "SDX"],
  },
  {
    category: "Backend & Daten",
    items: ["NestJS", "Python", "MySQL", "CRUD-APIs", "Authentifizierung", "Autorisierung"],
  },
  {
    category: "Arbeitsweise",
    items: ["Scrum", "Teamleitung", "Meetings leiten", "Präsentieren"],
  },
  { category: "Tools", items: ["Git", "VS Code", "Linux"] },
];

// Names in the moving tech band below the skills
export const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Angular",
  "SvelteKit",
  "Tailwind CSS",
  "SDX",
  "NestJS",
  "Python",
  "MySQL",
  "MCP",
];

// Screenshots in /public/images/sport-app; the live app will be switched off, so only images are shown
export const sportApp = {
  name: "Sport-App",
  eyebrow: "Wo Arbeit und Sport sich treffen",
  description:
    "Eine App, mit der ich meine Trainingseinheiten erfasse und auswerte – vom Laufen über Radfahren und Krafttraining bis zum Wandern und Trailrunning. Die Daten kommen automatisch über intervals.icu, und im Chat beantwortet Max, ein KI-Coach, Fragen zu meinem Training. Entstanden im Team Halo, weil mich das Thema auch privat nicht loslässt.",
  tags: ["Python", "SvelteKit", "MySQL", "MCP"],
  screens: [
    { src: "/images/sport-app/home.jpg", label: "Wochenübersicht", alt: "Startseite mit Wochenübersicht, Distanz-Diagramm und Gesundheitswerten" },
    { src: "/images/sport-app/activities.jpg", label: "Aktivitäten", alt: "Liste der Läufe mit Distanzverlauf über mehrere Wochen" },
    { src: "/images/sport-app/performance.jpg", label: "Trainingsstatus", alt: "Form, Fitness und Ermüdung als Diagramm" },
    { src: "/images/sport-app/health.jpg", label: "Schlaf", alt: "Schlaf-Score der letzten 30 Tage" },
    { src: "/images/sport-app/chat.jpg", label: "KI-Coach Max", alt: "Chat mit dem KI-Coach Max" },
  ],
};

// Text block on the Off Work page; `strong` parts are set in serif italic
export const offWorkStatement = [
  { text: "Wenn ich nicht arbeite, bin ich am liebsten " },
  { text: "draussen", strong: true },
  { text: " — in den " },
  { text: "Bergen", strong: true },
  { text: " oder auf langen " },
  { text: "Läufen", strong: true },
  { text: "." },
];

export const hobbies: Hobby[] = [
  {
    title: "Laufen",
    caption: "Halbmarathon, Trail & Ultra",
    description:
      "Mein grösstes Hobby. Mehrere Halbmarathons mit einer Bestzeit von 1:38, Trailläufe in Zermatt und ein Backyard Ultra, bei dem man jede Stunde eine Runde läuft, bis nur noch eine Person übrig ist.",
    keywords: ["Halbmarathon 1:38", "Trail Zermatt", "Backyard Ultra", "21,1 km"],
  },
  {
    title: "Wandern",
    caption: "Saxer Lücke & viele andere Berge",
    description:
      "Ich bin überall unterwegs, wo es nach oben geht – von der Saxer Lücke im Alpstein bis zu Touren in ganz anderen Bergregionen. Oben ankommen und den Kopf freibekommen ist der perfekte Ausgleich zum Bildschirm.",
    keywords: ["Saxer Lücke", "Alpstein", "Gipfel", "Höhenmeter"],
  },
  {
    title: "Krafttraining",
    caption: "Die Basis für alles andere",
    description:
      "Krafttraining gehört fest in meine Woche. Es macht mich stabiler auf langen Läufen und in den Bergen – und Fortschritte direkt zu spüren, motiviert mich jedes Mal aufs Neue.",
    keywords: ["Gym", "Stabilität", "Progression", "Basis fürs Laufen"],
  },
  {
    title: "Gaming",
    caption: "Abschalten nach einem langen Tag",
    description:
      "Gaming ist für mich der perfekte Ausgleich am Abend. Und als Entwickler finde ich es spannend, wie gute Spiele gestaltet und gebaut sind.",
    keywords: ["Abschalten", "Strategie", "Teamplay", "Game Design"],
  },
  {
    title: "Schach",
    caption: "Online & am Brett",
    description:
      "Schach trainiert genau das, was ich auch beim Programmieren brauche: vorausdenken, Muster erkennen und geduldig bleiben.",
    keywords: ["Vorausdenken", "Taktik", "Muster", "Geduld"],
  },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Off Work", href: "#off-work" },
];
