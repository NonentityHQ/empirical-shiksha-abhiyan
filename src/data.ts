export type Media = { title: string; cat: "shiksha" | "swachhata" | "paryavaran" | "swasthya"; type: "photo" | "video"; img: string; date?: string };

export const MEDIA: Media[] = [
  { title: "Weekly cleaning at Rameshwar Kund", cat: "swachhata", type: "photo", img: "images/clean-group-1.webp", date: "Weekly" },
  { title: "Eklavya Batch & team", cat: "shiksha", type: "photo", img: "images/group-banner.webp" },
  { title: "Saplings & green spaces", cat: "paryavaran", type: "photo", img: "images/init-environment.webp" },
  { title: "Phone addiction awareness session", cat: "swasthya", type: "video", img: "images/init-rally.webp" },
  { title: "Clog Run — collect, race, dispose", cat: "swachhata", type: "video", img: "images/clean-group-2.webp" },
  { title: "Our volunteer family", cat: "paryavaran", type: "photo", img: "images/team-gloves.webp" },
  { title: "Padam Kund cleanup", cat: "swachhata", type: "photo", img: "images/real-kund.webp" },
  { title: "Mental well-being talk", cat: "swasthya", type: "photo", img: "images/group-banner.webp" },
  { title: "Eklavya Batch — group", cat: "shiksha", type: "video", img: "images/real-group.webp" },
  { title: "After the Guru Purnima fair", cat: "swachhata", type: "photo", img: "images/clean-group-1.webp" },
  { title: "Suraj Kund visit", cat: "paryavaran", type: "photo", img: "images/real-kund-2.webp" },
  { title: "Students & screen time — a conversation", cat: "swasthya", type: "video", img: "images/init-rally.webp" },
];

/* ---------- Social Impact section data ----------
   Instagram: no free public feed API that works on a static site.
   Update these entries when new reels go live, OR move this array into
   Sanity (document type "reel") and fetch via GROQ later for true auto-update.
   YouTube: replace videoId with real IDs from the channel; thumbnails can stay
   as local images or use YouTube's i.ytimg.com/vi/{id}/hqdefault.jpg
*/
export const YT_CHANNEL = "https://www.youtube.com/@empiricalinstituteabhiyan";
export const IG_PROFILE = "https://www.instagram.com/empirical_institute/";
export const IG_HANDLE = "@empirical_institute";

export type ReelCard = {
  id: string;
  title: string;
  tag: string;
  views: string;
  img: string;
  /** Instagram reel/post URL — opens in new tab */
  url: string;
  badgeColor: string;
};

export type YTVideo = {
  id: string;
  videoId: string;
  title: string;
  subtitle: string;
  views: string;
  age: string;
  duration: string;
  img: string;
};

export const INSTAGRAM_REELS: ReelCard[] = [
  {
    id: "r1",
    title: "Learning With Joy",
    tag: "Eklavya Batch",
    views: "12.4K",
    img: "images/group-banner.webp",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#2B459E",
  },
  {
    id: "r2",
    title: "A Cleaner Khandwa",
    tag: "Swachhta Drive",
    views: "8.7K",
    img: "images/clean-group-1.webp",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#3A7D44",
  },
  {
    id: "r3",
    title: "Happy & Confident Minds",
    tag: "Mental Health",
    views: "15.1K",
    img: "images/init-rally.webp",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#2B459E",
  },
  {
    id: "r4",
    title: "More Green Spaces",
    tag: "Environment",
    views: "9.3K",
    img: "images/init-environment.webp",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#3A7D44",
  },
  {
    id: "r5",
    title: "Mental Health for Students",
    tag: "Awareness Session",
    views: "11.9K",
    img: "images/team-gloves.webp",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#D8501F",
  },
];

export const YOUTUBE_VIDEOS: YTVideo[] = [
  {
    id: "yt1",
    videoId: "rrwFNzDMvoc",
    title: "Eklavya Batch | Free Learning Support for Underprivileged Students",
    subtitle: "Eklavya Batch | Education for All",
    views: "5.2K",
    age: "2 weeks ago",
    duration: "8:24",
    img: "images/group-banner.webp",
  },
  {
    id: "yt2",
    videoId: "clUxly8zYmY",
    title: "Swachhta Abhiyan | Community Cleanliness Drive in Khandwa",
    subtitle: "Swachhta Abhiyan | Clean Khandwa, Healthy Khandwa",
    views: "3.8K",
    age: "3 weeks ago",
    duration: "6:37",
    img: "images/clean-group-1.webp",
  },
  {
    id: "yt3",
    videoId: "VMcj1zKg5Sk",
    title: "Mental Health Awareness Session | Building Confident & Happy Minds",
    subtitle: "Mental Health Awareness Session For Students",
    views: "6.9K",
    age: "1 month ago",
    duration: "10:15",
    img: "images/init-rally.webp",
  },
];
