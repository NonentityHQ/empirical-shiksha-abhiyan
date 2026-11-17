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

/* राहुल — तीन तरह का ज्ञान, जानबूझकर अलग-अलग रखा गया है। */
export const RAHUL = {
  engineering: [
    "इंजीनियरिंग मैकेनिक्स", "थ्योरी ऑफ़ मशीन्स", "स्ट्रेंथ ऑफ़ मैटेरियल्स", "थर्मोडायनामिक्स",
    "फ्लूड मैकेनिक्स", "मशीन डिज़ाइन", "हीट एंड मास ट्रांसफ़र", "मैन्युफैक्चरिंग प्रोसेसेस",
  ] as string[],
  exam: ["करंट अफेयर्स", "सांख्यिकी", "गणित", "उन्नत अंकगणित", "रीज़निंग", "इतिहास", "भूगोल", "राजव्यवस्था"] as string[],
  teaching: [
    { text: "पॉलिटेक्निक गेस्ट फैकल्टी", note: "लगभग 2 वर्ष — सटीक अवधि और संस्थान की पुष्टि बाकी" },
  ] as Detail[],
};

/* जयराम — हाथ से लिखे नोट्स के अलग, अस्पष्ट हिस्से से लिया गया।
   प्रकाशित करने से पहले नाम और संदर्भ की पुष्टि करें। */
export const JAYRAM = {
  skills: [
    { text: "ऑटोकैड" },
    { text: "रेविट" },
    { text: "3D स्किल्स" },
    { text: "विज्ञान एवं प्रौद्योगिकी" },
  ] as Detail[],
  numbers: [
    { value: 5, suffix: " वर्ष", label: "उद्योग का अनुभव" },
    { value: 12, suffix: " वर्ष", label: "संस्थान प्रमुख का अनुभव" },
  ],
  execution: { text: "विचार को ज़मीन पर उतारने में उनकी भूमिका" } as Detail,
};

/* सिर्फ़ वही आँकड़े जो वेबसाइट पर पहले से प्रकाशित हैं (Home / Impact)। */
export const TODAY = {
  students: "1,000+",
  volunteers: "60+",
  trees: "120",
  waste: "420",
  events: "25+",
};

export const PILLARS = [
  { id: "shiksha", hi: "शिक्षा", title: "एकलव्य बैच", line: "ज़रूरतमंद विद्यार्थियों के लिए निःशुल्क, नियमित शैक्षणिक सहयोग।", img: IMG.pShiksha, pos: "50% 40%" },
  { id: "swachhata", hi: "स्वच्छता", title: "कुंड और सार्वजनिक स्थल", line: "सब मिलकर साफ़ करते हैं, और बार-बार लौटकर आते हैं।", img: IMG.pSwachhata, pos: "50% 55%" },
  { id: "paryavaran", hi: "पर्यावरण", title: "पौधे और जल स्रोत", line: "पौधे लगाना और अपने जल स्रोतों को बचाना।", img: IMG.pParyavaran, pos: "50% 62%" },
  { id: "swasthya", hi: "मानसिक स्वास्थ्य", title: "फोन की लत और मन की सेहत", line: "विद्यार्थियों के साथ खुलकर बातचीत।", img: IMG.pSwasthya, pos: "50% 50%" },
] as const;

export const FAQ = [
  { q: "एम्पिरिकल शिक्षा अभियान समिति कौन चलाता है?", a: "संस्था की स्थापना राहुल गीते और जयराम मालाकार ने की है, और खंडवा में 60+ स्वयंसेवकों की टीम इसे सहयोग देती है।" },
  { q: "क्या आप दान स्वीकार करते हैं?", a: "नहीं। हमारा पूरा खर्च हमारे संस्थापक स्वयं उठाते हैं। हम जनता से कोई दान नहीं माँगते और न ही स्वीकार करते हैं।" },
  { q: "एकलव्य बैच क्या है?", a: "खंडवा के मध्यम वर्गीय और आर्थिक रूप से कमज़ोर परिवारों के विद्यार्थियों के लिए निःशुल्क, नियमित शैक्षणिक सहयोग कार्यक्रम।" },
  { q: "मैं स्वयंसेवक कैसे बन सकता/सकती हूँ?", a: "हमें WhatsApp या संपर्क पेज पर संदेश भेजें। हर हफ़्ते समय दे सकने वाले विद्यार्थी, शिक्षक और पड़ोसी — सभी का स्वागत है।" },
  { q: "संस्था का पंजीकरण कब हुआ?", a: "एम्पिरिकल शिक्षा अभियान समिति का पंजीकरण 13 जुलाई 2026 को खंडवा, मध्य प्रदेश में हुआ।" },
];

/* ------------------------------------------------------------------
   Founder sections (chapters 3 & 4). Rahul = photo on the LEFT,
   Jayram = photo on the RIGHT. `confirm: true` → shows a "पुष्टि बाकी" tag
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
  id: "rahul", side: "l", img: IMG.rahul, alt: "राहुल गीते, संस्थापक", name: "राहुल गीते", role: "संस्थापक",
  tag: "Founder's Journey",
  head: ["“ज्ञान वही बड़ा, जो करियर की सीमा लाँघकर", "किसी और की ज़िंदगी बदल दे।”"],
  intro: "एक शिक्षक, मार्गदर्शक और तकनीकी विशेषज्ञ — जिन्होंने अपने ज्ञान और अनुभव को निजी स्वार्थ से ऊपर रखकर एम्पिरिकल शिक्षा अभियान के ज़रिए शिक्षा, स्वच्छता और प्रकृति के संरक्षण के लिए समर्पित किया।",
  decor: "books", books: ["SSC JE", "RRB JE", "MPPSC AE", "State AE/JE"],
  stats: [
    { icon: "Trophy", big: "12 वर्ष+", label: "प्रतियोगी परीक्षा शिक्षण का अनुभव", tone: "yellow" },
    { icon: "Briefcase", big: "5 वर्ष+", label: "उद्योग / व्यावहारिक अनुभव", tone: "blue" },
  ],
  cta: { label: "मार्गदर्शन से जुड़ें", page: "contact" },
  panels: [
    { icon: "Settings", title: "इंजीनियरिंग का ज्ञान", sub: "इंजीनियरिंग की मूलभूत और उन्नत अवधारणाओं पर मजबूत पकड़।", items: RAHUL.engineering, mark: "blue" },
    { icon: "Target", title: "परीक्षा की तैयारी के विषय", sub: "प्रतियोगी परीक्षाओं के लिए आवश्यक सभी प्रमुख विषयों की गहन तैयारी।", items: RAHUL.exam, mark: "orange" },
  ],
  cards: [
    { icon: "GraduationCap", title: "प्रतियोगी परीक्षा अनुभव", sub: "विभिन्न तकनीकी और राज्य स्तरीय प्रतियोगी परीक्षाओं के लिए विशेष मार्गदर्शन।", chips: ["SSC JE", "RRB JE", "MPPSC AE", "State AE/JE"], tone: "blue" },
    { icon: "Users", title: "विद्यार्थी मेंटरशिप", sub: "हज़ारों विद्यार्थियों को सही रणनीति, निरंतर मार्गदर्शन और परिणाम के लिए प्रेरित करने का अनुभव।", tone: "pink" },
    { icon: "Mountain", title: "हमारा उद्देश्य", sub: "शिक्षा, स्वच्छता और पर्यावरण के ज़रिए, निजी स्वार्थ से ऊपर उठकर समाज और प्रकृति के लिए कुछ करना।", tone: "green" },
  ],
};

export const JAYRAM_F: FounderData = {
  id: "jayram", side: "r", img: IMG.jayram, alt: "जयराम मालाकार, संस्थापक एवं संस्थान प्रमुख", name: "जयराम मालाकार", role: "संस्थापक एवं संस्थान प्रमुख",
  tag: "Founder's Journey",
  head: ["“हुनर वही सार्थक, जो समाज के काम आए", "और प्रकृति को कुछ लौटाए।”"],
  intro: "तकनीकी शिक्षा, डिज़ाइन टूल्स और संस्थागत नेतृत्व के अनुभव के साथ, निजी स्वार्थ से ऊपर उठकर एम्पिरिकल शिक्षा अभियान में विद्यार्थियों को दिशा देते हैं — और पौधारोपण व जल स्रोतों की सफ़ाई जैसे प्रयासों से प्रकृति और समाज के लिए काम करते हैं।",
  decor: "building",
  note: "ये सभी विषय वे राहुल सर के साथ मिलकर विद्यार्थियों तक पहुँचाते हैं",
  stats: [
    { icon: "Trophy", big: "12 वर्ष+", label: "संस्थान प्रमुख का अनुभव", tone: "yellow" },
    { icon: "Briefcase", big: "5 वर्ष+", label: "उद्योग / व्यावहारिक अनुभव", tone: "yellow" },
    { icon: "Users", big: "विस्तृत शिक्षण अनुभव", label: "तकनीकी + प्रतियोगी + आधारभूत विषय", tone: "yellow" },
  ],
  panels: [
    { icon: "Settings", title: "डिज़ाइन टूल्स एवं PCM विशेषज्ञता", items: ["AutoCAD – 3 Years", "Autodesk Revit – 3 Years", "3D Max – 3 Years", "Physics – 4 Years", "Chemistry – 4 Years", "Maths – 4 Years"], mark: "orange" },
    { icon: "BookOpen", title: "शिक्षण एवं विषय विशेषज्ञता", items: [...RAHUL.engineering, ...RAHUL.exam], two: true, mark: "orange" },
  ],
  cards: [
    { icon: "Target", title: "प्रतियोगी परीक्षा मार्गदर्शन", chips: ["MPPSC", "SSC JE", "RRB JE", "State AE/JE"], sub: "तथा अन्य तकनीकी एवं राज्य स्तरीय प्रतियोगी परीक्षाएँ", tone: "cream" },
    { icon: "Users", title: "शैक्षणिक नेतृत्व और प्रबंधन", items: ["पाठ्यक्रम नियोजन एवं अकादमिक गुणवत्ता", "फैकल्टी मार्गदर्शन एवं प्रशिक्षण", "संस्थान संचालन एवं दीर्घकालिक शैक्षणिक विकास"], tone: "cream" },
  ],
  bottom: {
    tag: "Teaching Philosophy",
    quote: "व्यावहारिक कौशल, मजबूत कॉन्सेप्ट और सही रणनीति के साथ हर विद्यार्थी को प्रतियोगी दुनिया के लिए तैयार करना।",
    chips: [
      { icon: "Monitor", label: "Technical Design" }, { icon: "Settings", label: "Engineering Subjects" },
      { icon: "Target", label: "Competitive Exams" }, { icon: "Users", label: "Student Mentorship" }, { icon: "BarChart3", label: "Academic Leadership" },
    ],
  },
};
