/* ---------------------------------------------------------------------------
   OUR STARS — sample data.
   Every name, hour count, date and badge below is placeholder content taken from
   the design mock. Replace it with real volunteer records before publishing.
   Totals, ranks, percentages and streak averages on the pages are computed from
   this list, so editing it updates the whole section.
--------------------------------------------------------------------------- */
export type Cat = "Environment" | "Education" | "Mental Health" | "Community";
export type Badge = { name: string; icon: string; color: string };
export type Star = {
  slug: string; name: string; initials: string; role: string; roleIcon: string; cat: Cat;
  photo?: string; color: string; tint: string;
  target: number; monthly: number[]; since: string; years: string;
  streak: number; longest: number; quote: string; be: string;
  achievements: { name: string; icon: string }[];
  badges: Badge[];
  impact: { icon: string; value: string; label: string }[];
  recent: { title: string; icon: string; hrs: number; date: string }[];
};

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

export const MILESTONES = [
  { hrs: 25, name: "Green Starter", short: "First Step", icon: "sprout", color: "#3A7D44" },
  { hrs: 50, name: "Active Volunteer", short: "Active Volunteer", icon: "users", color: "#1A7F78" },
  { hrs: 100, name: "Community Contributor", short: "Community Contributor", icon: "star", color: "#EE9B13" },
  { hrs: 200, name: "Impact Leader", short: "Impact Leader", icon: "trophy", color: "#D8501F" },
  { hrs: 400, name: "Changemaker", short: "Changemaker", icon: "crown", color: "#7A4A8E" },
];

export const STARS: Star[] = [
  {
    slug: "rahul-geete", name: "Rahul Geete", initials: "RG", role: "Environment Volunteer", roleIcon: "leaf", cat: "Environment",
    photo: "images/about-rahul.webp", color: "#3A7D44", tint: "#E4EED8", target: 400,
    monthly: [18, 22, 24, 26, 30, 32, 34, 36, 38, 42, 54], since: "Jan 2024", years: "2+ Years Active", streak: 12, longest: 12,
    quote: "Small efforts, done consistently, can make a big difference for Khandwa.",
    be: "Consistent efforts, small actions and a service mindset can create a cleaner, greener Khandwa.",
    achievements: [{ name: "Eco Warrior", icon: "leaf" }, { name: "Community Leader", icon: "users" }, { name: "Waste Hero", icon: "recycle" }],
    badges: [
      { name: "Eco Warrior", icon: "leaf", color: "#3A7D44" }, { name: "Clean City Champion", icon: "recycle", color: "#D8501F" },
      { name: "Community Leader", icon: "users", color: "#2B459E" }, { name: "Tree Planter", icon: "tree", color: "#EE9B13" },
      { name: "Water Protector", icon: "drop", color: "#7A4A8E" },
    ],
    impact: [{ icon: "tree", value: "120", label: "Trees Planted" }, { icon: "recycle", value: "420 kg", label: "Waste Collected" }, { icon: "users", value: "6", label: "Community Events" }, { icon: "drop", value: "3", label: "Water Activities" }],
    recent: [{ title: "Tree Plantation Drive", icon: "tree", hrs: 4, date: "12 Nov 2026" }, { title: "Cleanliness Campaign", icon: "recycle", hrs: 6, date: "05 Nov 2026" }, { title: "Water Conservation Awareness", icon: "drop", hrs: 3, date: "28 Oct 2026" }],
  },
  {
    slug: "priya-malviya", name: "Priya Malviya", initials: "PM", role: "Education Volunteer", roleIcon: "cap", cat: "Education",
    color: "#2B459E", tint: "#E6EAF7", target: 400,
    monthly: [14, 18, 20, 22, 24, 26, 28, 30, 32, 38, 46], since: "Mar 2024", years: "2 Years Active", streak: 10, longest: 10,
    quote: "When one child learns, a whole family moves forward.",
    be: "Teaching one hour a week can change how a child sees their own future.",
    achievements: [{ name: "Mentor", icon: "book" }, { name: "Star Teacher", icon: "star" }, { name: "Scholar", icon: "cap" }],
    badges: [{ name: "Eklavya Mentor", icon: "book", color: "#2B459E" }, { name: "Star Teacher", icon: "star", color: "#EE9B13" }, { name: "Doubt Buster", icon: "bulb", color: "#D8501F" }, { name: "Community Leader", icon: "users", color: "#1A7F78" }],
    impact: [{ icon: "users", value: "40", label: "Students Mentored" }, { icon: "book", value: "96", label: "Classes Taken" }, { icon: "laptop", value: "5", label: "Digital Sessions" }, { icon: "cap", value: "3", label: "Schools Visited" }],
    recent: [{ title: "Eklavya Batch Revision Class", icon: "book", hrs: 5, date: "10 Nov 2026" }, { title: "Study Material Drive", icon: "cap", hrs: 4, date: "02 Nov 2026" }, { title: "Career Guidance Talk", icon: "users", hrs: 3, date: "26 Oct 2026" }],
  },
  {
    slug: "aman-sharma", name: "Aman Sharma", initials: "AS", role: "Cleanliness Volunteer", roleIcon: "broom", cat: "Community",
    color: "#D8501F", tint: "#FBE6C8", target: 350,
    monthly: [10, 12, 16, 18, 20, 22, 24, 26, 28, 30, 36], since: "Jun 2024", years: "1.5 Years Active", streak: 8, longest: 8,
    quote: "A clean kund is a proud kund. We only have to start.",
    be: "Show up with gloves and a smile; the city notices.",
    achievements: [{ name: "Waste Hero", icon: "recycle" }, { name: "Planter", icon: "sprout" }, { name: "Star", icon: "star" }],
    badges: [{ name: "Clean City Champion", icon: "recycle", color: "#D8501F" }, { name: "Kund Guardian", icon: "drop", color: "#1A7F78" }, { name: "Eco Warrior", icon: "leaf", color: "#3A7D44" }],
    impact: [{ icon: "recycle", value: "310 kg", label: "Waste Collected" }, { icon: "broom", value: "14", label: "Cleanup Drives" }, { icon: "pin", value: "6", label: "Public Areas" }, { icon: "users", value: "4", label: "Awareness Events" }],
    recent: [{ title: "Rameshwar Kund Cleanup", icon: "broom", hrs: 5, date: "09 Nov 2026" }, { title: "Waste Segregation Awareness", icon: "recycle", hrs: 3, date: "31 Oct 2026" }, { title: "School Cleanliness Drive", icon: "school", hrs: 4, date: "22 Oct 2026" }],
  },
  {
    slug: "neha-patel", name: "Neha Patel", initials: "NP", role: "Mental Health Volunteer", roleIcon: "heart", cat: "Mental Health",
    color: "#C2456B", tint: "#F6D6DE", target: 300,
    monthly: [8, 10, 12, 14, 16, 18, 20, 22, 24, 18, 22], since: "Aug 2024", years: "1+ Years Active", streak: 6, longest: 6,
    quote: "Listening is the first step of helping.",
    be: "Open conversations in a classroom can make a student feel less alone.",
    achievements: [{ name: "Listener", icon: "heart" }, { name: "Team", icon: "users" }, { name: "Star", icon: "star" }],
    badges: [{ name: "Wellness Advocate", icon: "heart", color: "#C2456B" }, { name: "Community Leader", icon: "users", color: "#2B459E" }, { name: "Calm Mind", icon: "brain", color: "#7A4A8E" }],
    impact: [{ icon: "users", value: "180", label: "Students Reached" }, { icon: "brain", value: "8", label: "Awareness Sessions" }, { icon: "heart", value: "5", label: "Wellness Activities" }, { icon: "school", value: "3", label: "Schools" }],
    recent: [{ title: "Stress Management Workshop", icon: "brain", hrs: 4, date: "11 Nov 2026" }, { title: "Phone Addiction Awareness Session", icon: "users", hrs: 3, date: "29 Oct 2026" }, { title: "Peer Discussion Circle", icon: "heart", hrs: 3, date: "20 Oct 2026" }],
  },
  {
    slug: "yash-rathore", name: "Yash Rathore", initials: "YR", role: "Environment Volunteer", roleIcon: "leaf", cat: "Environment",
    color: "#1A7F78", tint: "#DDEDE7", target: 250,
    monthly: [6, 8, 10, 12, 14, 16, 18, 20, 22, 20, 22], since: "Sep 2024", years: "1+ Years Active", streak: 5, longest: 5,
    quote: "Every sapling is a promise to our city.",
    be: "Plant one tree, then go back and water it. That is the whole secret.",
    achievements: [{ name: "Planter", icon: "sprout" }, { name: "Recycler", icon: "recycle" }, { name: "Team", icon: "users" }],
    badges: [{ name: "Tree Planter", icon: "tree", color: "#EE9B13" }, { name: "Eco Warrior", icon: "leaf", color: "#3A7D44" }, { name: "Water Protector", icon: "drop", color: "#7A4A8E" }],
    impact: [{ icon: "tree", value: "64", label: "Trees Planted" }, { icon: "drop", value: "6", label: "Water Activities" }, { icon: "recycle", value: "90 kg", label: "Waste Collected" }, { icon: "users", value: "3", label: "Community Events" }],
    recent: [{ title: "Sapling Watering Round", icon: "drop", hrs: 3, date: "08 Nov 2026" }, { title: "Tree Plantation Drive", icon: "tree", hrs: 4, date: "12 Nov 2026" }, { title: "Recycling Awareness", icon: "recycle", hrs: 3, date: "25 Oct 2026" }],
  },
];

export const hoursOf = (s: Star) => s.monthly.reduce((a, b) => a + b, 0);
export const pctOf = (s: Star) => Math.min(100, Math.round((hoursOf(s) / s.target) * 100));
export const ranked = () => [...STARS].sort((a, b) => hoursOf(b) - hoursOf(a));
export const rankOf = (s: Star) => ranked().findIndex((x) => x.slug === s.slug) + 1;
export const starBySlug = (slug: string) => STARS.find((s) => s.slug === slug);
