export type Media = { title: string; cat: "shiksha" | "swachhata" | "paryavaran" | "swasthya"; type: "photo" | "video"; img: string; date?: string };

export const MEDIA: Media[] = [
  { title: "Weekly cleaning at Rameshwar Kund", cat: "swachhata", type: "photo", img: "images/swachhata.jpg", date: "Weekly" },
  { title: "Eklavya Batch — evening class", cat: "shiksha", type: "photo", img: "images/shiksha.jpg" },
  { title: "Saplings & green spaces", cat: "paryavaran", type: "photo", img: "images/paryavaran.jpg" },
  { title: "Phone addiction awareness session", cat: "swasthya", type: "video", img: "images/swasthya.jpg" },
  { title: "Clog Run — collect, race, dispose", cat: "swachhata", type: "video", img: "images/clogrun.jpg" },
  { title: "Our volunteer family", cat: "paryavaran", type: "photo", img: "images/volunteers.jpg" },
  { title: "Padam Kund cleanup", cat: "swachhata", type: "photo", img: "images/clogrun.jpg" },
  { title: "Mental well-being talk", cat: "swasthya", type: "photo", img: "images/swasthya.jpg" },
  { title: "Eklavya Batch — doubt session", cat: "shiksha", type: "video", img: "images/shiksha.jpg" },
  { title: "After the Guru Purnima fair", cat: "swachhata", type: "photo", img: "images/volunteers.jpg" },
  { title: "Suraj Kund visit", cat: "paryavaran", type: "photo", img: "images/swachhata.jpg" },
  { title: "Students & screen time — a conversation", cat: "swasthya", type: "video", img: "images/shiksha.jpg" },
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
    img: "images/shiksha.jpg",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#1f5fd1",
  },
  {
    id: "r2",
    title: "A Cleaner Khandwa",
    tag: "Swachhta Drive",
    views: "8.7K",
    img: "images/swachhata.jpg",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#2f9a46",
  },
  {
    id: "r3",
    title: "Happy & Confident Minds",
    tag: "Mental Health",
    views: "15.1K",
    img: "images/swasthya.jpg",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#7b4fd6",
  },
  {
    id: "r4",
    title: "More Green Spaces",
    tag: "Environment",
    views: "9.3K",
    img: "images/paryavaran.jpg",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#3f9a3a",
  },
  {
    id: "r5",
    title: "Mental Health for Students",
    tag: "Awareness Session",
    views: "11.9K",
    img: "images/volunteers.jpg",
    url: "https://www.instagram.com/empirical_institute/",
    badgeColor: "#f2611c",
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
    img: "images/shiksha.jpg",
  },
  {
    id: "yt2",
    videoId: "clUxly8zYmY",
    title: "Swachhta Abhiyan | Community Cleanliness Drive in Khandwa",
    subtitle: "Swachhta Abhiyan | Clean Khandwa, Healthy Khandwa",
    views: "3.8K",
    age: "3 weeks ago",
    duration: "6:37",
    img: "images/swachhata.jpg",
  },
  {
    id: "yt3",
    videoId: "VMcj1zKg5Sk",
    title: "Mental Health Awareness Session | Building Confident & Happy Minds",
    subtitle: "Mental Health Awareness Session For Students",
    views: "6.9K",
    age: "1 month ago",
    duration: "10:15",
    img: "images/swasthya.jpg",
  },
];
