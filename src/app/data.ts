// ─── Types ───────────────────────────────────────────────────────────────────

export type Screen = "splash" | "login" | "main";
export type Tab = "home" | "discover" | "comebacks" | "news" | "profile";

export interface Artist {
  id: number;
  name: string;
  label: string;
  members: number;
  debut: string;
  genre: string;
  color: string;
  accentColor: string;
  img: string;
  fans: string;
  verified: boolean;
  nextComeback: string;
  bio: string;
}

export interface Comeback {
  id: number;
  artist: string;
  title: string;
  type: string;
  date: string;
  daysLeft: number;
  tracks: number;
  teaser: boolean;
  preorder: boolean;
  color: string;
  img: string;
}

export interface NewsItem {
  id: number;
  category: string;
  headline: string;
  time: string;
  author: string;
  img: string;
  hot: boolean;
  body: string;
}

export interface TrackItem {
  rank: number;
  title: string;
  artist: string;
  streams: string;
  delta: string;
  rising: boolean;
  color: string;
}

export interface DiscographyItem {
  title: string;
  type: string;
  year: string;
  tracks: number;
}

export interface ScheduleItem {
  event: string;
  date: string;
  loc: string;
  type: string;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileNotification {
  label: string;
  desc: string;
  on: boolean;
}

export interface AccountSettingItem {
  label: string;
  desc: string;
}

// ─── Artists Data ────────────────────────────────────────────────────────────

export const ARTISTS: Artist[] = [
  {
    id: 1,
    name: "aespa",
    label: "SM Entertainment",
    members: 4,
    debut: "2020",
    genre: "Synth-pop / Future Pop",
    color: "#8B5FFF",
    accentColor: "#C4A4FF",
    img: "asset/artistLogo/aespa - LEMONADE.webp",
    fans: "12.4M",
    verified: true,
    nextComeback: "May 2026",
    bio: "aespa is a four-member girl group known for their unique concept blending the real world with a virtual dimension called ae-world. Their signature sound fuses hyper-pop with futuristic production and has redefined the visual language of K-pop.",
  },
  {
    id: 2,
    name: "TREASURE",
    label: "YG Entertainment",
    members: 10,
    debut: "2020",
    genre: "Hip-hop / Pop",
    color: "#00B4D8",
    accentColor: "#90E0EF",
    img: "asset/artistLogo/Treasure - New Wav.webp",
    fans: "9.8M",
    verified: true,
    nextComeback: "Nov 2024",
    bio: "TREASURE is a 10-member boy group formed by YG Entertainment through YG Treasure Box. Known for their powerful choreography, energetic rap line, and high-energy hits like 'JIKJIN', 'DARARI', and 'BONA BONA'.",
  },
  {
    id: 3,
    name: "SEVENTEEN",
    label: "PLEDIS Entertainment",
    members: 13,
    debut: "2015",
    genre: "Performance / Hip-hop",
    color: "#0099FF",
    accentColor: "#80CCFF",
    img: "1598387993441-a364f854c3e1",
    fans: "18.2M",
    verified: true,
    nextComeback: "Sep 2024",
    bio: "SEVENTEEN is a 13-member group known as self-producing idols who actively participate in writing, composing, and choreographing their own music. Divided into vocal, hip-hop, and performance units.",
  },
  {
    id: 4,
    name: "Stray Kids",
    label: "JYP Entertainment",
    members: 8,
    debut: "2018",
    genre: "K-Pop / Hip-hop / Rock",
    color: "#FF4500",
    accentColor: "#FF9070",
    img: "1524368535928-5b5e00ddc76b",
    fans: "15.6M",
    verified: true,
    nextComeback: "Dec 2024",
    bio: "Stray Kids is an eight-member group formed through a reality survival show. Known for their intense performances, rock-influenced sound, and self-produced music through their sub-unit 3RACHA.",
  },
  {
    id: 5,
    name: "IVE",
    label: "Starship Entertainment",
    members: 6,
    debut: "2021",
    genre: "Dance-pop / Concept",
    color: "#00D4A0",
    accentColor: "#80EDD0",
    img: "1508700115892-45ecd05ae2ad",
    fans: "8.1M",
    verified: true,
    nextComeback: "Oct 2024",
    bio: "IVE debuted with members from previous groups and quickly established themselves with their confident, mature concept. Their music explores themes of self-love, independence, and empowerment.",
  },
  {
    id: 6,
    name: "TWICE",
    label: "JYP Entertainment",
    members: 9,
    debut: "2015",
    genre: "K-Pop / Dance-pop",
    color: "#FF85C0",
    accentColor: "#FFC0DC",
    img: "1571019613454-1cb2f99b2d8b",
    fans: "22.7M",
    verified: true,
    nextComeback: "Jan 2025",
    bio: "TWICE is one of K-pop's most successful girl groups, known for their positive energy, catchy melodies, and strong fanbase ONCE. They have broken numerous records and completed multiple world tours.",
  },
  {
    id: 7,
    name: "Kiss of Life",
    label: "S2 Entertainment",
    members: 4,
    debut: "2023",
    genre: "R&B / Hip-hop / K-Pop",
    color: "#FF1744",
    accentColor: "#FF8A80",
    img: "asset/artistLogo/Kiss of Life - SWEAT.webp",
    fans: "3.5M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Kiss of Life is a four-member group under S2 Entertainment known for their distinctive 90s/2000s R&B vibe, vocal versatility, and confident stage presence. Members Julie, Natty, Belle, and Haneul each showcase standout musicality and self-expression.",
  },
];

// ─── Comebacks Data ──────────────────────────────────────────────────────────

export const COMEBACKS: Comeback[] = [
  // ── Upcoming ─────────────────────────────────────────────────────────────
  { id: 21, artist: "TXT",           title: "Setsuna Hanabi",         type: "Japan 5th Single",   date: "Aug 17, 2026", daysLeft: 1,  tracks: 2,  teaser: true,  preorder: true,  color: "#FF6B9D", img: "1619983081563-430f63602796" },
  { id: 22, artist: "JUN. K",        title: "Your Lips",              type: "Digital Single",     date: "Aug 17, 2026", daysLeft: 1,  tracks: 1,  teaser: false, preorder: false, color: "#B06AB3", img: "1520637836993-5cce7b6b3b27" },
  { id: 23, artist: "BOYNEXTDOOR",   title: "Boom Boom Boom",         type: "Japan Single",       date: "Aug 18, 2026", daysLeft: 2,  tracks: 2,  teaser: true,  preorder: false, color: "#FFB300", img: "1514525253161-7a46d19cd819" },
  { id: 24, artist: "AtHeart",       title: "3!4!",                   type: "Single",             date: "Aug 19, 2026", daysLeft: 3,  tracks: 1,  teaser: false, preorder: false, color: "#FF4F8B", img: "1541367777708-7905fe3296c4" },
  { id: 25, artist: "ZEROBASEONE",   title: "回帰LOVE",               type: "Japan Single",       date: "Aug 19, 2026", daysLeft: 3,  tracks: 2,  teaser: true,  preorder: true,  color: "#00B4D8", img: "1478737270239-2f02b77fc618" },
  { id: 26, artist: "BIGBANG",       title: "BiiiG",                  type: "Digital Single",     date: "Aug 19, 2026", daysLeft: 3,  tracks: 1,  teaser: true,  preorder: false, color: "#F0A500", img: "1516450360452-9312f5e86fc7" },
  { id: 27, artist: "ONEWE",         title: "面 : Unknown Atlas",     type: "3rd Full Album",     date: "Aug 19, 2026", daysLeft: 3,  tracks: 12, teaser: false, preorder: true,  color: "#4361EE", img: "1598387993441-a364f854c3e1" },
  { id: 28, artist: "MASHIRO",       title: "24/11",                  type: "1st EP",             date: "Aug 19, 2026", daysLeft: 3,  tracks: 5,  teaser: false, preorder: false, color: "#E040FB", img: "1574169411535-1e7c8f9e1b74" },
  { id: 29, artist: "ODD YOUTH",     title: "can't go back",          type: "Single",             date: "Aug 19, 2026", daysLeft: 3,  tracks: 1,  teaser: false, preorder: false, color: "#26C6DA", img: "1508700115892-45ecd05ae2ad" },
  { id: 30, artist: "Tiffany Young", title: "Edge of Calm",           type: "1st Full Album",     date: "Aug 20, 2026", daysLeft: 4,  tracks: 11, teaser: true,  preorder: true,  color: "#FF8C69", img: "1493225457124-a3eb161ffa5f" },
  { id: 31, artist: "KIM JAE JOONG", title: "THE WAVE",               type: "Single",             date: "Aug 20, 2026", daysLeft: 4,  tracks: 1,  teaser: false, preorder: false, color: "#1A73E8", img: "1524368535928-5b5e00ddc76b" },
  { id: 32, artist: "MIMI",          title: "Bish Bash Bosh",         type: "Single",             date: "Aug 20, 2026", daysLeft: 4,  tracks: 1,  teaser: false, preorder: false, color: "#FF6F61", img: "1571019613454-1cb2f99b2d8b" },
  { id: 33, artist: "ENHYPEN",       title: "THE SIN : BLISS",        type: "8th Mini Album",     date: "Aug 21, 2026", daysLeft: 5,  tracks: 8,  teaser: true,  preorder: true,  color: "#7B3FFF", img: "1598387993441-a364f854c3e1" },
  { id: 34, artist: "NEXZ",          title: "SAUCIN'",                type: "4th Mini Album",     date: "Aug 24, 2026", daysLeft: 8,  tracks: 7,  teaser: false, preorder: false, color: "#FF5722", img: "1619983081563-430f63602796" },
  { id: 35, artist: "NCT 127",       title: "BLINGY",                 type: "7th Album",          date: "Aug 24, 2026", daysLeft: 8,  tracks: 14, teaser: true,  preorder: true,  color: "#00A36C", img: "1520637836993-5cce7b6b3b27" },
  { id: 36, artist: "ALPHA DRIVE",   title: "ALPHA DRIVE ONE",        type: "2nd Mini Album",     date: "Aug 24, 2026", daysLeft: 8,  tracks: 6,  teaser: false, preorder: false, color: "#E53935", img: "1541367777708-7905fe3296c4" },
  { id: 37, artist: "TUIDE",         title: "TUIDE",                  type: "1st EP",             date: "Aug 24, 2026", daysLeft: 8,  tracks: 5,  teaser: false, preorder: false, color: "#43A047", img: "1478737270239-2f02b77fc618" },
  { id: 38, artist: "SF9",           title: "TENACITY",               type: "2nd Album",          date: "Aug 26, 2026", daysLeft: 10, tracks: 12, teaser: false, preorder: true,  color: "#E82020", img: "1514525253161-7a46d19cd819" },
  { id: 39, artist: "HITGS",         title: "HITGS",                  type: "Digital Single",     date: "Aug 27, 2026", daysLeft: 11, tracks: 1,  teaser: false, preorder: false, color: "#9C27B0", img: "1516450360452-9312f5e86fc7" },
  { id: 40, artist: "TAEMIN",        title: "PHASE 1 : Soft Violence", type: "Album",             date: "Aug 31, 2026", daysLeft: 15, tracks: 10, teaser: true,  preorder: true,  color: "#5B8DB8", img: "1574169411535-1e7c8f9e1b74" },
  // ── Recently Released ────────────────────────────────────────────────────
  { id: 1,  artist: "Stray Kids",    title: "SKZ-REPLAY 2026 Pt.1",  type: "Album",              date: "Aug 1, 2026",  daysLeft: -15, tracks: 18, teaser: false, preorder: false, color: "#FF4500", img: "1524368535928-5b5e00ddc76b" },
  { id: 2,  artist: "DINO",          title: "吉BOARD",                type: "1st Mini Album",     date: "Aug 3, 2026",  daysLeft: -13, tracks: 6,  teaser: false, preorder: false, color: "#FF9800", img: "1508700115892-45ecd05ae2ad" },
  { id: 3,  artist: "Red Velvet",    title: "Velvet Summer",          type: "Mini Album",         date: "Aug 3, 2026",  daysLeft: -13, tracks: 6,  teaser: false, preorder: false, color: "#FF5FA0", img: "1493225457124-a3eb161ffa5f" },
  { id: 4,  artist: "KISS OF LIFE",  title: "SWEAT",                  type: "3rd Single",         date: "Aug 4, 2026",  daysLeft: -12, tracks: 1,  teaser: false, preorder: false, color: "#FF1744", img: "1619983081563-430f63602796" },
  { id: 5,  artist: "TWS",           title: "SODA SODA",              type: "Japan Single",       date: "Aug 4, 2026",  daysLeft: -12, tracks: 2,  teaser: false, preorder: false, color: "#00BCD4", img: "1520637836993-5cce7b6b3b27" },
  { id: 6,  artist: "DAYOUNG X JAY PARK", title: "FLIRTY",           type: "Single",             date: "Aug 4, 2026",  daysLeft: -12, tracks: 1,  teaser: false, preorder: false, color: "#FF6E40", img: "1541367777708-7905fe3296c4" },
  { id: 7,  artist: "HUH JIWON",     title: "The Calling",            type: "Single",             date: "Aug 5, 2026",  daysLeft: -11, tracks: 1,  teaser: false, preorder: false, color: "#AB47BC", img: "1478737270239-2f02b77fc618" },
  { id: 8,  artist: "AEN",           title: "A NEW ERA OF NOW",       type: "1st EP",             date: "Aug 5, 2026",  daysLeft: -11, tracks: 5,  teaser: false, preorder: false, color: "#42A5F5", img: "1514525253161-7a46d19cd819" },
  { id: 9,  artist: "WHIB",          title: "CHERRY PIE",             type: "2nd Mini Album",     date: "Aug 5, 2026",  daysLeft: -11, tracks: 6,  teaser: false, preorder: false, color: "#F06292", img: "1571019613454-1cb2f99b2d8b" },
  { id: 10, artist: "ARTMS",         title: "Hyper-Ego",              type: "2nd Mini Album",     date: "Aug 7, 2026",  daysLeft: -9,  tracks: 5,  teaser: false, preorder: false, color: "#C44FFF", img: "1598387993441-a364f854c3e1" },
  { id: 11, artist: "DAWN",          title: "Too Much",               type: "Single",             date: "Aug 7, 2026",  daysLeft: -9,  tracks: 1,  teaser: false, preorder: false, color: "#FF7043", img: "1508700115892-45ecd05ae2ad" },
  { id: 12, artist: "Stray Kids",    title: "THIS & THAT",            type: "Mini Album",         date: "Aug 7, 2026",  daysLeft: -9,  tracks: 7,  teaser: false, preorder: false, color: "#FF4500", img: "1516450360452-9312f5e86fc7" },
  { id: 13, artist: "KiiiKiii",      title: "WhyKiiiKiii",            type: "3rd EP",             date: "Aug 10, 2026", daysLeft: -6,  tracks: 5,  teaser: false, preorder: false, color: "#EC407A", img: "1493225457124-a3eb161ffa5f" },
  { id: 14, artist: "WayV",          title: "Vision Wings",           type: "8th Mini Album",     date: "Aug 10, 2026", daysLeft: -6,  tracks: 6,  teaser: false, preorder: false, color: "#00C4CC", img: "1574169411535-1e7c8f9e1b74" },
  { id: 15, artist: "MIYEON",        title: "RUN AWAY",               type: "Single",             date: "Aug 10, 2026", daysLeft: -6,  tracks: 1,  teaser: false, preorder: false, color: "#7E57C2", img: "1619983081563-430f63602796" },
  { id: 16, artist: "JEONG EUNJI",   title: "Summer, I",              type: "5th Mini Album",     date: "Aug 11, 2026", daysLeft: -5,  tracks: 6,  teaser: false, preorder: false, color: "#FF8A65", img: "1520637836993-5cce7b6b3b27" },
  { id: 17, artist: "Hearts2Hearts", title: "ICONIC HEART",           type: "Japan Single",       date: "Aug 12, 2026", daysLeft: -4,  tracks: 2,  teaser: false, preorder: false, color: "#E91E63", img: "1541367777708-7905fe3296c4" },
  { id: 18, artist: "AxMxP",         title: "HELLO AxMxP",            type: "2nd Mini Album",     date: "Aug 12, 2026", daysLeft: -4,  tracks: 6,  teaser: false, preorder: false, color: "#29B6F6", img: "1478737270239-2f02b77fc618" },
  { id: 19, artist: "Splayit",       title: "SPLAY : CHAPTER 01",     type: "EP",                 date: "Aug 13, 2026", daysLeft: -3,  tracks: 5,  teaser: false, preorder: false, color: "#66BB6A", img: "1514525253161-7a46d19cd819" },
  { id: 20, artist: "HYNN",          title: "Traces of Summer",       type: "EP",                 date: "Aug 13, 2026", daysLeft: -3,  tracks: 4,  teaser: false, preorder: false, color: "#FFA726", img: "1571019613454-1cb2f99b2d8b" },
];

// ─── News Data ───────────────────────────────────────────────────────────────

export const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Award",
    headline: "aespa sweeps 4 categories at Melon Music Awards 2024",
    time: "2h ago",
    author: "Jao Nicholas Benedicto",
    img: "1516450360452-9312f5e86fc7",
    hot: true,
    body: "aespa had a historic night at the Melon Music Awards, taking home Album of the Year, Artist of the Year, Best Female Group, and Best Performance. The group's 'Whiplash' era proved to be their most successful to date, with the title track dominating charts across Asia for weeks. Winter, Karina, Giselle, and NingNing were visibly emotional as they accepted their final award of the night.\n\nThe ceremony, held at the KSPO Dome in Seoul, drew thousands of fans and millions of online viewers. aespa performed their hit 'Whiplash' live on stage for the first time since their comeback, receiving a standing ovation from the crowd.",
  },
  {
    id: 2,
    category: "Release",
    headline: "NewJeans drops surprise collab with iconic 90s producer",
    time: "5h ago",
    author: "Music Desk",
    img: "1493225457124-a3eb161ffa5f",
    hot: true,
    body: "In a surprise announcement, NewJeans revealed a collaboration with legendary 90s producer Timbaland. The track blends classic R&B production with the group's signature Y2K aesthetic, resulting in a sound that bridges generations of pop music history. The single dropped midnight KST and has already topped iTunes in 28 countries.\n\nFans on social media have praised the unexpected pairing, with many calling it the crossover of the year. The music video, shot in Los Angeles and Seoul simultaneously, features nods to iconic 90s aesthetics.",
  },
  {
    id: 3,
    category: "Tour",
    headline: "SEVENTEEN announces global RIGHT HERE world tour dates",
    time: "8h ago",
    author: "Events Team",
    img: "1598387993441-a364f854c3e1",
    hot: false,
    body: "SEVENTEEN has officially announced their RIGHT HERE world tour, spanning 32 cities across North America, Europe, Asia, and Oceania. Pre-sale for Carat members begins next week, with general sales to follow two days later. The tour runs from February through July 2025.\n\nThe production features a new stage design created by a Grammy-winning set designer, incorporating elements from their latest album's concept. Setlists will vary by region to give longtime fans fresh experiences at every stop.",
  },
  {
    id: 4,
    category: "Milestone",
    headline: "Stray Kids MIROH crosses 400M streams on Spotify",
    time: "1d ago",
    author: "Charts Desk",
    img: "1524368535928-5b5e00ddc76b",
    hot: false,
    body: "Stray Kids' breakthrough track MIROH has officially reached 400 million streams on Spotify, making it the group's first song to achieve this milestone. The track, released in 2019, continues to introduce new fans to the group's distinct sound five years after its release.\n\nThe achievement cements MIROH's status as a generational K-pop anthem, with new listeners discovering the track daily through social media trends and playlist placements.",
  },
  {
    id: 5,
    category: "Debut",
    headline: "SM Entertainment's new girl group teaser sends fans into frenzy",
    time: "1d ago",
    author: "KPOPULSE Staff",
    img: "1571019613454-1cb2f99b2d8b",
    hot: false,
    body: "SM Entertainment dropped a mysterious 30-second teaser for their upcoming new girl group, sending K-pop fans into an online frenzy. The teaser features five silhouettes against a futuristic backdrop, with a sound that draws comparisons to early aespa while establishing a distinct new identity.\n\nSpeculation about member identities has dominated K-pop forums, with several trainee names circulating across fan communities. SM has confirmed only that the group will debut in the first quarter of 2025.",
  },
];

// ─── Trending Tracks ─────────────────────────────────────────────────────────

export const TRACKS: TrackItem[] = [
  {
    rank: 1,
    title: "Whiplash",
    artist: "aespa",
    streams: "84.2M",
    delta: "+12",
    rising: true,
    color: "#8B5FFF",
  },
  {
    rank: 2,
    title: "ETA",
    artist: "NewJeans",
    streams: "71.8M",
    delta: "+3",
    rising: true,
    color: "#FF5FA0",
  },
  {
    rank: 3,
    title: "MAESTRO",
    artist: "SEVENTEEN",
    streams: "65.3M",
    delta: "+8",
    rising: true,
    color: "#0099FF",
  },
  {
    rank: 4,
    title: "Miroh",
    artist: "Stray Kids",
    streams: "52.1M",
    delta: "-1",
    rising: false,
    color: "#FF4500",
  },
  {
    rank: 5,
    title: "Baddie",
    artist: "IVE",
    streams: "48.9M",
    delta: "+5",
    rising: true,
    color: "#00D4A0",
  },
];

// ─── Discographies ───────────────────────────────────────────────────────────

export const aespaDiscography: DiscographyItem[] = [
  {
    title: "Drama",
    type: "Mini Album",
    year: "2023",
    tracks: 6,
  },
  {
    title: "MY WORLD",
    type: "Mini Album",
    year: "2023",
    tracks: 6,
  },
  {
    title: "GIRLS",
    type: "Mini Album",
    year: "2022",
    tracks: 6,
  },
  {
    title: "Savage",
    type: "Mini Album",
    year: "2021",
    tracks: 7,
  },
  {
    title: "Next Level",
    type: "Digital Single",
    year: "2021",
    tracks: 1,
  },
  {
    title: "Black Mamba",
    type: "Digital Single",
    year: "2020",
    tracks: 1,
  },
];

export const treasureDiscography: DiscographyItem[] = [
  {
    title: "REBOOT",
    type: "2nd Full Album",
    year: "2023",
    tracks: 10,
  },
  {
    title: "THE SECOND STEP : CHAPTER TWO",
    type: "2nd Mini Album",
    year: "2022",
    tracks: 6,
  },
  {
    title: "THE SECOND STEP : CHAPTER ONE",
    type: "1st Mini Album",
    year: "2022",
    tracks: 6,
  },
  {
    title: "THE FIRST STEP : TREASURE EFFECT",
    type: "1st Full Album",
    year: "2021",
    tracks: 12,
  },
  {
    title: "KING KONG",
    type: "Digital Single",
    year: "2024",
    tracks: 1,
  },
];

export const seventeenDiscography: DiscographyItem[] = [
  {
    title: "17 IS RIGHT HERE",
    type: "Best Album",
    year: "2024",
    tracks: 33,
  },
  {
    title: "SEVENTEENTH HEAVEN",
    type: "11th Mini Album",
    year: "2023",
    tracks: 8,
  },
  {
    title: "FML",
    type: "10th Mini Album",
    year: "2023",
    tracks: 6,
  },
  {
    title: "Face the Sun",
    type: "4th Album",
    year: "2022",
    tracks: 9,
  },
  {
    title: "Attacca",
    type: "9th Mini Album",
    year: "2021",
    tracks: 7,
  },
];

export const strayKidsDiscography: DiscographyItem[] = [
  {
    title: "ATE",
    type: "9th Mini Album",
    year: "2024",
    tracks: 8,
  },
  {
    title: "ROCK-STAR",
    type: "8th Mini Album",
    year: "2023",
    tracks: 8,
  },
  {
    title: "5-STAR",
    type: "3rd Full Album",
    year: "2023",
    tracks: 12,
  },
  {
    title: "MAXIDENT",
    type: "7th Mini Album",
    year: "2022",
    tracks: 8,
  },
  {
    title: "ODDINARY",
    type: "6th Mini Album",
    year: "2022",
    tracks: 7,
  },
];

export const iveDiscography: DiscographyItem[] = [
  {
    title: "IVE SWITCH",
    type: "2nd EP",
    year: "2024",
    tracks: 6,
  },
  {
    title: "I'VE MINE",
    type: "1st EP",
    year: "2023",
    tracks: 6,
  },
  {
    title: "I've IVE",
    type: "1st Studio Album",
    year: "2023",
    tracks: 11,
  },
  {
    title: "After LIKE",
    type: "3rd Single Album",
    year: "2022",
    tracks: 2,
  },
  {
    title: "LOVE DIVE",
    type: "2nd Single Album",
    year: "2022",
    tracks: 2,
  },
  {
    title: "ELEVEN",
    type: "1st Single Album",
    year: "2021",
    tracks: 2,
  },
];

export const twiceDiscography: DiscographyItem[] = [
  {
    title: "With YOU-th",
    type: "13th Mini Album",
    year: "2024",
    tracks: 6,
  },
  {
    title: "READY TO BE",
    type: "12th Mini Album",
    year: "2023",
    tracks: 7,
  },
  {
    title: "BETWEEN 1&2",
    type: "11th Mini Album",
    year: "2022",
    tracks: 7,
  },
  {
    title: "Formula of Love: O+T=<3",
    type: "3rd Full Album",
    year: "2021",
    tracks: 17,
  },
  {
    title: "Taste of Love",
    type: "10th Mini Album",
    year: "2021",
    tracks: 6,
  },
];

export const kissOfLifeDiscography: DiscographyItem[] = [
  {
    title: "Lose Yourself",
    type: "3rd Mini Album",
    year: "2024",
    tracks: 7,
  },
  {
    title: "Sticky",
    type: "1st Digital Single",
    year: "2024",
    tracks: 2,
  },
  {
    title: "Midas Touch",
    type: "1st Single Album",
    year: "2024",
    tracks: 2,
  },
  {
    title: "Born to be XX",
    type: "2nd Mini Album",
    year: "2023",
    tracks: 7,
  },
  {
    title: "KISS OF LIFE",
    type: "1st Mini Album",
    year: "2023",
    tracks: 6,
  },
];

export const ARTIST_DISCOGRAPHIES: Record<string, DiscographyItem[]> = {
  aespa: aespaDiscography,
  TREASURE: treasureDiscography,
  SEVENTEEN: seventeenDiscography,
  "Stray Kids": strayKidsDiscography,
  IVE: iveDiscography,
  TWICE: twiceDiscography,
  "Kiss of Life": kissOfLifeDiscography,
};

// ─── Artist Schedules ────────────────────────────────────────────────────────

export const DEFAULT_SCHEDULE: ScheduleItem[] = [
  {
    event: "Fan Sign Event",
    date: "Oct 15, 2024",
    loc: "Seoul, Korea",
    type: "Fansign",
  },
  {
    event: "Comeback Stage",
    date: "Oct 21, 2024",
    loc: "TV Broadcast",
    type: "Performance",
  },
  {
    event: "Japan Tour — Tokyo",
    date: "Nov 3–5, 2024",
    loc: "Tokyo Dome",
    type: "Concert",
  },
  {
    event: "Year-End Awards",
    date: "Dec 31, 2024",
    loc: "KSPO Dome",
    type: "Award",
  },
  
];

// ─── Profile Data ────────────────────────────────────────────────────────────

export const PROFILE_STATS: ProfileStat[] = [
  { label: "Following", value: "14" },
  { label: "Fan Posts", value: "287" },
  { label: "Events", value: "3" },
  { label: "Since", value: "2021" },
];

export const PROFILE_NOTIFS: ProfileNotification[] = [
  {
    label: "Comeback Alerts",
    desc: "When artists announce comebacks",
    on: true,
  },
  {
    label: "Breaking News",
    desc: "Hot K-pop news as it happens",
    on: true,
  },
  {
    label: "Event Reminders",
    desc: "Concerts and fan sign events",
    on: false,
  },
  {
    label: "Chart Updates",
    desc: "Weekly chart movement alerts",
    on: true,
  },
];

export const ACCOUNT_SETTINGS: AccountSettingItem[] = [
  {
    label: "Change Password",
    desc: "Update your account password",
  },
  {
    label: "Privacy Settings",
    desc: "Control who can see your profile",
  },
  {
    label: "Connected Apps",
    desc: "Manage third-party integrations",
  },
  {
    label: "Data & Privacy",
    desc: "Download or delete your data",
  },
];

// ─── UI Filter and Title Constants ──────────────────────────────────────────

export const CATEGORY_STYLES: Record<string, string> = {
  Award: "bg-yellow-500/20 text-yellow-300",
  Release: "bg-pink-500/20 text-pink-300",
  Tour: "bg-blue-500/20 text-blue-300",
  Milestone: "bg-emerald-500/20 text-emerald-300",
  Debut: "bg-violet-500/20 text-violet-300",
};

export const DISCOVER_FILTERS = [
  "All",
  "Girl Group",
  "Boy Group",
  "Solo",
  "Rookie",
];

export const NEWS_FILTERS = [
  "All",
  "Award",
  "Release",
  "Tour",
  "Debut",
  "Milestone",
];

export const TAB_TITLES: Record<Tab, string> = {
  home: "Home",
  discover: "Discover Artists",
  comebacks: "Comeback Tracker",
  news: "K-pop News",
  profile: "My Profile",
};
