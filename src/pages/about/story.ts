/* ------------------------------------------------------------------
   About-page documentary — central config.
   1) IMAGES: every photo the film uses. Swap a file name here and the
      whole film updates. `replace` marks photos to replace with
      client-provided originals.
   2) FOUNDER DETAILS: items with `confirm: true` come from the
      handwritten notes and are NOT verified. While SHOW_UNCONFIRMED is
      true they show with a dashed "confirm" tag so you can review them.
      Set it to false (or fix the text and set confirm:false) before
      publishing and unconfirmed items disappear from the page.
------------------------------------------------------------------- */

export const SHOW_UNCONFIRMED = false;

const I = (n: string) => `/images/${n}`;

export const IMG = {
  open: I("real-kund.webp"), // atmospheric steps + pond
  rahul: I("about-rahul-trim.webp"), // transparent cut-out, cropped to the subject (same crop of about-rahul.webp)
  jayram: I("about-jayram-trim.webp"), // transparent cut-out, cropped to the subject (same crop of about-jayram.webp)
  classroom: I("shiksha.webp"), // replace: illustrated classroom, not a real photo
  community: I("volunteers.webp"),
  buildPlant: I("real-plant.webp"),
  buildTarp: I("clean-group-2.webp"),
  buildRun: I("clogrun.webp"), // replace: looks generated
  turnA: I("real-rally.webp"),
  turnB: I("init-rally.webp"),
  turnC: I("real-group.webp"),
  begin: I("shiksha.webp"), // replace: need a real early-batch photo
  beginGroup: I("real-group.webp"),
  kund: I("clean-group-1.webp"), // Rameshwar Kund
  kund2: I("real-kund-2.webp"),
  pShiksha: I("group-banner.webp"),
  pSwachhata: I("clean-group-2.webp"),
  pParyavaran: I("init-environment.webp"),
  pSwasthya: I("swasthya.webp"), // replace: looks generated
  todayA: I("paryavaran.webp"), // replace: looks generated
  todayB: I("init-rally-photo.webp"),
  todayC: I("team-gloves.webp"),
  todayD: I("real-rally.webp"),
  finalA: I("init-environment.webp"),
  finalB: I("real-group.webp"),
  finalC: I("clean-group-1.webp"),
} as const;

/* Final scene: the whole stage is filled with these photos (swap names to change the wall). */
export const FINAL_WALL = [IMG.finalA, IMG.finalB, IMG.finalC, IMG.turnA, IMG.pShiksha, IMG.buildTarp, IMG.community, IMG.kund2];

export type Detail = { text: string; confirm?: boolean; note?: string };

/* Rahul — three distinct areas of expertise. */
export const RAHUL = {
  engineering: [
    "Engineering Mechanics", "Theory of Machines", "Strength of Materials", "Thermodynamics",
    "Fluid Mechanics", "Machine Design", "Heat and Mass Transfer", "Manufacturing Processes",
  ] as string[],
  exam: ["Current Affairs", "Statistics", "Mathematics", "Advanced Arithmetic", "Reasoning", "History", "Geography", "Polity"] as string[],
  teaching: [
    { text: "Polytechnic Guest Faculty", note: "Approximately 2 years — exact duration and institution still need confirmation" },
  ] as Detail[],
};

/* Jayram — details taken from a separate, partly unclear handwritten note.
   Confirm the names and context before publication. */
export const JAYRAM = {
  skills: [
    { text: "AutoCAD" },
    { text: "Revit" },
    { text: "3D Design Skills" },
    { text: "Science and Technology" },
  ] as Detail[],
  numbers: [
    { value: 5, suffix: " years", label: "Industry Experience" },
    { value: 12, suffix: " years", label: "Institute Leadership Experience" },
  ],
  execution: { text: "His role in turning ideas into action" } as Detail,
};

/* Only figures already published on the website (Home / Impact). */
export const TODAY = {
  students: "1,000+",
  volunteers: "60+",
  trees: "120",
  waste: "420",
  events: "25+",
};

export const PILLARS = [
  { id: "shiksha", hi: "Education", title: "Eklavya Batch", line: "Free, regular academic support for students who need it.", img: IMG.pShiksha, pos: "50% 40%" },
  { id: "swachhata", hi: "Cleanliness", title: "Kunds and Public Spaces", line: "Volunteers work together to clean these places and return regularly.", img: IMG.pSwachhata, pos: "50% 55%" },
  { id: "paryavaran", hi: "Environment", title: "Trees and Water Sources", line: "Planting trees and protecting shared water sources.", img: IMG.pParyavaran, pos: "50% 62%" },
  { id: "swasthya", hi: "Mental Health", title: "Digital Habits and Well-being", line: "Open conversations with students about phone use and mental health.", img: IMG.pSwasthya, pos: "50% 50%" },
] as const;

export const FAQ = [
  { q: "Who leads Empirical Shiksha Abhiyan Samiti?", a: "The organisation was founded by Rahul Geete and Jayram Malakar, with support from a team of 60+ volunteers in Khandwa." },
  { q: "Do you accept donations?", a: "No. Our founders personally cover the organisation’s expenses. We do not request or accept public donations." },
  { q: "What is the Eklavya Batch?", a: "A free, regular academic support programme for students from middle-income and economically disadvantaged families in Khandwa." },
  { q: "How can I become a volunteer?", a: "Send us a message on WhatsApp or through the Contact page. Students, teachers and neighbours who can spare time each week are welcome." },
  { q: "When was the organisation registered?", a: "Empirical Shiksha Abhiyan Samiti was registered on 13 July 2026 in Khandwa, Madhya Pradesh." },
];

/* ------------------------------------------------------------------
   Founder sections (chapters 3 & 4). Rahul = photo on the LEFT,
   Jayram = photo on the RIGHT. `confirm: true` → shows a "pending confirmation" tag
   while SHOW_UNCONFIRMED is on, and is hidden once it is turned off.
------------------------------------------------------------------- */
export type IconName = "Settings" | "Target" | "BookOpen" | "Users" | "GraduationCap" | "Trophy" | "Briefcase" | "Mountain" | "Monitor" | "BarChart3";
export type Tone = "yellow" | "blue" | "pink" | "green" | "cream";
export type Stat = { icon: IconName; big: string; label: string; tone: Tone; confirm?: boolean };
export type Panel = { icon: IconName; title: string; sub?: string; items: string[]; two?: boolean; mark?: "blue" | "orange" };
export type Card = { icon: IconName; title: string; sub?: string; chips?: string[]; items?: string[]; tone: Tone; confirm?: boolean };
export type FounderData = {
  id: "rahul" | "jayram"; side: "l" | "r"; img: string; alt: string; name: string; role: string; tag: string;
  head: [string, string]; intro: string; decor: "books" | "building"; books?: string[]; note?: string;
  stats: Stat[]; cta?: { label: string; page: "contact" }; panels: Panel[]; cards: Card[];
  bottom?: { tag: string; quote: string; chips: { icon: IconName; label: string }[] };
};

export const RAHUL_F: FounderData = {
  id: "rahul", side: "l", img: IMG.rahul, alt: "Rahul Geete, Founder", name: "Rahul Geete", role: "Founder",
  tag: "Founder's Journey",
  head: ["“Knowledge becomes meaningful when it reaches beyond a career", "and changes someone else’s life.”"],
  intro: "A teacher, mentor and technical specialist who chose to put knowledge and experience to work beyond personal gain — supporting education, cleanliness and environmental care through Empirical Shiksha Abhiyan.",
  decor: "books", books: ["SSC JE", "RRB JE", "MPPSC AE", "State AE/JE"],
  stats: [
    { icon: "Trophy", big: "12+ years", label: "Competitive Exam Teaching Experience", tone: "yellow" },
    { icon: "Briefcase", big: "5+ years", label: "Industry and Practical Experience", tone: "blue" },
  ],
  cta: { label: "Connect for Guidance", page: "contact" },
  panels: [
    { icon: "Settings", title: "Engineering Knowledge", sub: "A strong command of foundational and advanced engineering concepts.", items: RAHUL.engineering, mark: "blue" },
    { icon: "Target", title: "Competitive Exam Subjects", sub: "In-depth preparation across the core subjects required for competitive examinations.", items: RAHUL.exam, mark: "orange" },
  ],
  cards: [
    { icon: "GraduationCap", title: "Competitive Exam Experience", sub: "Focused guidance for technical and state-level competitive examinations.", chips: ["SSC JE", "RRB JE", "MPPSC AE", "State AE/JE"], tone: "blue" },
    { icon: "Users", title: "Student Mentorship", sub: "Experience motivating and guiding thousands of students with sound strategy and consistent support.", tone: "pink" },
    { icon: "Mountain", title: "Our Purpose", sub: "To serve people and nature through education, cleanliness and environmental care — beyond personal interest.", tone: "green" },
  ],
};

export const JAYRAM_F: FounderData = {
  id: "jayram", side: "r", img: IMG.jayram, alt: "Jayram Malakar, Founder and Institute Director", name: "Jayram Malakar", role: "Founder & Institute Director",
  tag: "Founder's Journey",
  head: ["“Skills have meaning when they serve society", "and give something back to nature.”"],
  intro: "With experience in technical education, design tools and institutional leadership, he guides students through Empirical Shiksha Abhiyan and contributes to society and nature through tree planting and the care of local water sources.",
  decor: "building",
  note: "He teaches these subjects to students in collaboration with Rahul Sir.",
  stats: [
    { icon: "Trophy", big: "12+ years", label: "Institute Leadership Experience", tone: "yellow" },
    { icon: "Briefcase", big: "5+ years", label: "Industry and Practical Experience", tone: "yellow" },
    { icon: "Users", big: "Broad teaching experience", label: "Technical, competitive and foundational subjects", tone: "yellow" },
  ],
  panels: [
    { icon: "Settings", title: "Design Tools and PCM Expertise", items: ["AutoCAD – 3 Years", "Autodesk Revit – 3 Years", "3D Max – 3 Years", "Physics – 4 Years", "Chemistry – 4 Years", "Maths – 4 Years"], mark: "orange" },
    { icon: "BookOpen", title: "Teaching and Subject Expertise", items: [...RAHUL.engineering, ...RAHUL.exam], two: true, mark: "orange" },
  ],
  cards: [
    { icon: "Target", title: "Competitive Exam Guidance", chips: ["MPPSC", "SSC JE", "RRB JE", "State AE/JE"], sub: "Along with other technical and state-level competitive examinations", tone: "cream" },
    { icon: "Users", title: "Academic Leadership and Management", items: ["Curriculum planning and academic quality", "Faculty guidance and training", "Institution operations and long-term academic development"], tone: "cream" },
  ],
  bottom: {
    tag: "Teaching Philosophy",
    quote: "Preparing every student for competitive environments through practical skills, strong concepts and the right strategy.",
    chips: [
      { icon: "Monitor", label: "Technical Design" }, { icon: "Settings", label: "Engineering Subjects" },
      { icon: "Target", label: "Competitive Exams" }, { icon: "Users", label: "Student Mentorship" }, { icon: "BarChart3", label: "Academic Leadership" },
    ],
  },
};
