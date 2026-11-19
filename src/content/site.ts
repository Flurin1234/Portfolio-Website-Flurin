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
};

export type Hobby = {
  title: string;
  caption: string;
  description?: string;
  image?: string;
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

// Photos for the home page: [0] wide image, [1] + [2] image pair. Files live in /public/images.
export const photos: Photo[] = [
  { src: "/images/marina-nacht.jpg", alt: "Hafen bei Nacht" },
  { src: "/images/matterhorn-2.jpg", alt: "Matterhorn zwischen Tannen" },
  { src: "/images/frankfurt.jpg", alt: "Hochhäuser in Frankfurt" },
];

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
    period: "2026 — heute",
    team: "Team Drei",
    role: "Deine Rolle",
    description: "Was macht das Team, was war deine Aufgabe und was hast du gelernt?",
    tags: ["Thema", "Tool"],
  },
  {
    period: "2025 — 2026",
    team: "Team Zwei",
    role: "Deine Rolle",
    description: "Was macht das Team, was war deine Aufgabe und was hast du gelernt?",
    tags: ["Thema", "Tool"],
  },
  {
    period: "2024 — 2025",
    team: "Team Eins",
    role: "Deine Rolle",
    description: "Was macht das Team, was war deine Aufgabe und was hast du gelernt?",
    tags: ["Thema", "Tool"],
  },
];

export const skills: SkillGroup[] = [
  { category: "Entwicklung", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Design", items: ["Figma", "UI Design", "Prototyping"] },
  { category: "Tools", items: ["Git", "VS Code", "Linux"] },
  { category: "Sprachen", items: ["Deutsch", "Englisch"] },
];

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
    title: "Wandern",
    caption: "Alpstein & Zermatt",
    image: "/images/saxer-luecke.jpg",
  },
  {
    title: "Laufen",
    caption: "Backyard Ultra",
    image: "/images/backyard-sonnenuntergang.jpg",
  },
  // Stock photos from Unsplash (free license)
  {
    title: "Indoor Velo",
    caption: "Auf der Rolle",
    image: "/images/indoor-velo.jpg",
  },
  {
    title: "Schach",
    caption: "Online & am Brett",
    image: "/images/schach.jpg",
  },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Off Work", href: "#off-work" },
];
