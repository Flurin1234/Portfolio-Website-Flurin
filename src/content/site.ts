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
  description: string;
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
  // Second portrait that appears inside the cursor circle on the home page
  portraitReveal: undefined as string | undefined,
  headline: "Digitale Erlebnisse mit Liebe zum Detail.",
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

// Photos for the home page (put files in /public/images and set `src`, e.g. "/images/berge.jpg")
export const photos: Photo[] = [
  { alt: "Foto 1" },
  { alt: "Foto 2" },
  { alt: "Foto 3" },
  { alt: "Foto 4" },
  { alt: "Foto 5" },
  { alt: "Foto 6" },
  { alt: "Foto 7" },
  { alt: "Foto 8" },
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

export const hobbies: Hobby[] = [
  { title: "Hobby Eins", caption: "Ort, 2025", description: "Was machst du gerne und warum?" },
  { title: "Hobby Zwei", caption: "Ort, 2024", description: "Was machst du gerne und warum?" },
  { title: "Hobby Drei", caption: "Ort, 2024", description: "Was machst du gerne und warum?" },
  { title: "Hobby Vier", caption: "Ort, 2023", description: "Was machst du gerne und warum?" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Off Work", href: "/off-work" },
];
