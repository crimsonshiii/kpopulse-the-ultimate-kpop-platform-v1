// ─── Types ───────────────────────────────────────────────────────────────────

export type Screen = "splash" | "login" | "onboarding" | "main";
export type Tab = "home" | "discover" | "comebacks" | "news" | "profile";

export interface Artist {
  id: number;
  name: string;
  label: string;
  members: number;
  debut: string;
  genre: string;
  type: "group" | "solo";
  generation: "2nd" | "3rd" | "4th" | "5th";
  color: string;
  accentColor: string;
  img: string;
  fans: string;
  verified: boolean;
  nextComeback: string;
  bio: string;
}

export interface GenreItem {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  artists: string[];
}

export interface GenerationItem {
  id: string;
  name: string;
  years: string;
  tagline: string;
  color: string;
  highlights: string[];
}

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  password?: string;
  personalization: UserPersonalization;
  createdAt: string;
}

export interface UserPersonalization {
  favoriteGroups: string[];
  favoriteSoloists: string[];
  favoriteGenres: string[];
  favoriteGenerations: string[];
  username: string;
  email: string;
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

export interface DiscographyTrack {
  num: number;
  title: string;
  duration: string;
  isTitle?: boolean;
  hasMv?: boolean;
  audioPreviewUrl?: string;
  youtubeVideoId?: string;
}

export interface DiscographyItem {
  title: string;
  type: string;
  year: string;
  tracks: number;
  leadTrack?: string;
  tracklist?: DiscographyTrack[];
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  audioPreviewUrl?: string;
  youtubeVideoId?: string;
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
  // ── Groups ──
  {
    id: 1,
    name: "aespa",
    label: "SM Entertainment",
    members: 4,
    debut: "2020",
    genre: "Synth-pop / Future Pop",
    type: "group",
    generation: "4th",
    color: "#8B5FFF",
    accentColor: "#C4A4FF",
    img: "asset/artistLogo/aespa - LEMONADE.webp",
    fans: "12.4M",
    verified: true,
    nextComeback: "May 2026",
    bio: "aespa is a four-member girl group known for their unique concept blending the real world with a virtual dimension called ae-world. Their signature sound fuses hyper-pop with futuristic production.",
  },
  {
    id: 2,
    name: "TREASURE",
    label: "YG Entertainment",
    members: 10,
    debut: "2020",
    genre: "Hip-hop / Pop",
    type: "group",
    generation: "4th",
    color: "#00B4D8",
    accentColor: "#90E0EF",
    img: "asset/artistLogo/Treasure - New Wav.webp",
    fans: "9.8M",
    verified: true,
    nextComeback: "Nov 2024",
    bio: "TREASURE is a 10-member boy group formed by YG Entertainment through YG Treasure Box. Known for their energetic rap line, synchronized dance routines, and high-octane stage energy.",
  },
  {
    id: 3,
    name: "SEVENTEEN",
    label: "PLEDIS Entertainment",
    members: 13,
    debut: "2015",
    genre: "Performance / Hip-hop",
    type: "group",
    generation: "3rd",
    color: "#0099FF",
    accentColor: "#80CCFF",
    img: "asset/artistLogo/Seventeen - Happy Burstday.webp",
    fans: "18.2M",
    verified: true,
    nextComeback: "Sep 2024",
    bio: "SEVENTEEN is a 13-member group known as self-producing idols who actively compose, write lyrics, and choreograph their own music.",
  },
  {
    id: 4,
    name: "Stray Kids",
    label: "JYP Entertainment",
    members: 8,
    debut: "2018",
    genre: "K-Pop / Hip-hop / Rock",
    type: "group",
    generation: "4th",
    color: "#FF4500",
    accentColor: "#FF9070",
    img: "asset/artistLogo/Stray Kids - This & That.webp",
    fans: "15.6M",
    verified: true,
    nextComeback: "Dec 2024",
    bio: "Stray Kids is an eight-member group known for their intense self-produced sound via 3RACHA, rock-fueled drops, and global chart domination.",
  },
  {
    id: 5,
    name: "IVE",
    label: "Starship Entertainment",
    members: 6,
    debut: "2021",
    genre: "Dance-pop / Concept",
    type: "group",
    generation: "4th",
    color: "#00D4A0",
    accentColor: "#80EDD0",
    img: "1508700115892-45ecd05ae2ad",
    fans: "8.1M",
    verified: true,
    nextComeback: "Oct 2024",
    bio: "IVE is a 6-member powerhouse girl group renowned for their self-love anthems, immaculate chic visuals, and record-breaking viral chart hits.",
  },
  {
    id: 6,
    name: "TWICE",
    label: "JYP Entertainment",
    members: 9,
    debut: "2015",
    genre: "K-Pop / Dance-pop",
    type: "group",
    generation: "3rd",
    color: "#FF85C0",
    accentColor: "#FFC0DC",
    img: "1571019613454-1cb2f99b2d8b",
    fans: "22.7M",
    verified: true,
    nextComeback: "Jan 2025",
    bio: "TWICE is one of K-pop's most iconic girl groups, delivering beloved stadium anthems, irresistible hooks, and boundless charismatic energy.",
  },
  {
    id: 7,
    name: "Kiss of Life",
    label: "S2 Entertainment",
    members: 4,
    debut: "2023",
    genre: "R&B / Hip-hop / K-Pop",
    type: "group",
    generation: "5th",
    color: "#FF1744",
    accentColor: "#FF8A80",
    img: "asset/artistLogo/Kiss of Life - SWEAT.webp",
    fans: "3.5M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Kiss of Life is a four-member group known for their standout 90s/2000s R&B vibe, vocal acrobatics, and refreshing live performance power.",
  },
  /*
  {
    id: 8,
    name: "TXT",
    label: "BIGHIT MUSIC",
    members: 5,
    debut: "2019",
    genre: "Pop / Rock / Alternative",
    type: "group",
    generation: "4th",
    color: "#FF6B9D",
    accentColor: "#FFAAC8",
    img: "1619983081563-430f63602796",
    fans: "11.2M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "TOMORROW X TOGETHER tells universal youth stories through poetic lyrics, genre-bending rock-pop tracks, and fantastical concept worlds.",
  },
  {
    id: 9,
    name: "ENHYPEN",
    label: "BELIFT LAB",
    members: 7,
    debut: "2020",
    genre: "Dark Pop / Synthwave",
    type: "group",
    generation: "4th",
    color: "#7B3FFF",
    accentColor: "#B58CFF",
    img: "1598387993441-a364f854c3e1",
    fans: "10.4M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "ENHYPEN captivates global listeners with their dark cinematic storyline, vampire motifs, and hypnotic dance beats.",
  },
  {
    id: 10,
    name: "ZEROBASEONE",
    label: "WAKEONE",
    members: 9,
    debut: "2023",
    genre: "Pop / Dance / EDM",
    type: "group",
    generation: "5th",
    color: "#00B4D8",
    accentColor: "#70E0FF",
    img: "1478737270239-2f02b77fc618",
    fans: "4.9M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Formed through Boys Planet, ZEROBASEONE brings bright youthful energy, emotional melodies, and dazzling group choreography.",
  },
  {
    id: 11,
    name: "BOYNEXTDOOR",
    label: "KOZ Entertainment",
    members: 6,
    debut: "2023",
    genre: "Hip-hop / Easy Listening",
    type: "group",
    generation: "5th",
    color: "#FFB300",
    accentColor: "#FFE082",
    img: "1514525253161-7a46d19cd819",
    fans: "3.8M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "BOYNEXTDOOR makes approachable, groovy, and relatable music produced alongside ZICO, telling relatable everyday stories.",
  },
  {
    id: 12,
    name: "Red Velvet",
    label: "SM Entertainment",
    members: 5,
    debut: "2014",
    genre: "R&B / Pop / Concept",
    type: "group",
    generation: "3rd",
    color: "#FF5FA0",
    accentColor: "#FFA6D2",
    img: "1493225457124-a3eb161ffa5f",
    fans: "14.1M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Red Velvet showcases a dual concept: their bright, bubbly 'Red' side and their smooth, seductive R&B 'Velvet' side.",
  },
  */

  // ── Soloists ──
  /*
  {
    id: 13,
    name: "TAEMIN",
    label: "BPM Entertainment",
    members: 1,
    debut: "2014",
    genre: "Synth-pop / R&B / Performance",
    type: "solo",
    generation: "2nd",
    color: "#5B8DB8",
    accentColor: "#A2C5E5",
    img: "1574169411535-1e7c8f9e1b74",
    fans: "6.7M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Known as the Idol's Idol, TAEMIN has redefined solo artistry with his theatrical, gender-defying performances and ethereal vocals.",
  },
  {
    id: 14,
    name: "Tiffany Young",
    label: "Sublime",
    members: 1,
    debut: "2016",
    genre: "Pop / Vocal / R&B",
    type: "solo",
    generation: "2nd",
    color: "#FF8C69",
    accentColor: "#FFBAA3",
    img: "1493225457124-a3eb161ffa5f",
    fans: "5.2M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Legendary member of Girls' Generation who forged a bold international solo career marked by emotive vocal power and charismatic pop anthems.",
  },
  {
    id: 15,
    name: "DINO",
    label: "PLEDIS Entertainment",
    members: 1,
    debut: "2023",
    genre: "Hip-hop / Dance / Pop",
    type: "solo",
    generation: "3rd",
    color: "#FF9800",
    accentColor: "#FFC97A",
    img: "1508700115892-45ecd05ae2ad",
    fans: "3.9M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "SEVENTEEN's main dancer and all-rounder powerhouse exploring sharp hip-hop, energetic groove, and solo stage presence.",
  },
  {
    id: 16,
    name: "JUN. K",
    label: "JYP Entertainment",
    members: 1,
    debut: "2011",
    genre: "R&B / Soul / Ballad",
    type: "solo",
    generation: "2nd",
    color: "#B06AB3",
    accentColor: "#E2A9E5",
    img: "1520637836993-5cce7b6b3b27",
    fans: "2.8M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "2PM's main vocal and prolific singer-songwriter celebrated for his soulful vocal range, rich acoustics, and R&B arrangements.",
  },
  {
    id: 17,
    name: "MIYEON",
    label: "Cube Entertainment",
    members: 1,
    debut: "2022",
    genre: "Vocal / Ballad / Pop",
    type: "solo",
    generation: "4th",
    color: "#7E57C2",
    accentColor: "#B694EB",
    img: "1619983081563-430f63602796",
    fans: "4.1M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "(G)I-DLE's main vocal delivering sweet, crystalline melodies, romantic balladry, and enchanting acoustic stages.",
  },
  {
    id: 18,
    name: "JEONG EUNJI",
    label: "IST Entertainment",
    members: 1,
    debut: "2016",
    genre: "Ballad / Acoustic / Pop",
    type: "solo",
    generation: "2nd",
    color: "#FF8A65",
    accentColor: "#FFBDB0",
    img: "1520637836993-5cce7b6b3b27",
    fans: "3.4M",
    verified: true,
    nextComeback: "Aug 2026",
    bio: "Apink's legendary powerhouse vocal with heartwarming healing ballads, nostalgic acoustic songs, and commanding stage control.",
  },
  */
];

// ─── Genres & Generations Datasets ──────────────────────────────────────────

export const GENRES_LIST: GenreItem[] = [
  {
    id: "synth-pop",
    name: "Synth-pop & Future Pop",
    tagline: "Cyberpunk synths, hyperpop textures & futuristic drops",
    icon: "Sparkles",
    color: "#8B5FFF",
    artists: ["aespa", "TAEMIN", "ENHYPEN"],
  },
  {
    id: "hiphop-rap",
    name: "Hip-hop & Hard Rap",
    tagline: "808 heavy basslines, rapid flows & fierce cyphers",
    icon: "Mic",
    color: "#00B4D8",
    artists: ["TREASURE", "Stray Kids", "BOYNEXTDOOR"],
  },
  {
    id: "rnb-soul",
    name: "R&B & Soul Grooves",
    tagline: "Smooth 90s/00s vocal runs, velvet chords & sensual melodies",
    icon: "Disc",
    color: "#FF1744",
    artists: ["Kiss of Life", "Red Velvet", "JUN. K"],
  },
  {
    id: "dance-pop",
    name: "Dance-pop & EDM Anthems",
    tagline: "High-energy festival beats, addictive hooks & dance drops",
    icon: "Flame",
    color: "#FF1C8E",
    artists: ["TWICE", "IVE", "ZEROBASEONE"],
  },
  {
    id: "k-rock",
    name: "K-Rock & Alternative",
    tagline: "Live drums, guitar riffs, anthemic choruses & punk energy",
    icon: "Guitar",
    color: "#FF4500",
    artists: ["Stray Kids", "TXT", "KIM JAE JOONG"],
  },
  {
    id: "ballad-vocal",
    name: "Power Ballads & Acoustic",
    tagline: "Soul-stirring vocals, grand orchestrations & emotional lyrics",
    icon: "Heart",
    color: "#00D4A0",
    artists: ["Tiffany Young", "JEONG EUNJI", "MIYEON"],
  },
  {
    id: "performance",
    name: "Concept & Performance",
    tagline: "Complex synchronized choreo, theatrical stages & storylines",
    icon: "Zap",
    color: "#0099FF",
    artists: ["SEVENTEEN", "TAEMIN", "ENHYPEN"],
  },
];

export const GENERATIONS_LIST: GenerationItem[] = [
  {
    id: "2nd-gen",
    name: "2nd Gen (2000–2011)",
    years: "2000–2011",
    tagline: "The Golden Era pioneers who sparked the global Hallyu wave",
    color: "#F59E0B",
    highlights: ["BIGBANG", "Girls' Generation", "TAEMIN (SHINee)", "JUN. K (2PM)", "KIM JAE JOONG", "JEONG EUNJI (Apink)"],
  },
  {
    id: "3rd-gen",
    name: "3rd Gen (2012–2017)",
    years: "2012–2017",
    tagline: "The Global Explosion era dominating world stadiums and streaming charts",
    color: "#3B82F6",
    highlights: ["TWICE", "SEVENTEEN", "Red Velvet", "NCT 127", "DINO", "DAWN"],
  },
  {
    id: "4th-gen",
    name: "4th Gen (2018–2022)",
    years: "2018–2022",
    tagline: "Self-producing masters, dark concepts and boundary-breaking visuals",
    color: "#EC4899",
    highlights: ["Stray Kids", "aespa", "TREASURE", "IVE", "TXT", "ENHYPEN", "MIYEON"],
  },
  {
    id: "5th-gen",
    name: "5th Gen (2023–Present)",
    years: "2023–Present",
    tagline: "The Next Wave of fresh R&B vibes, easy listening & dynamic rookie power",
    color: "#10B981",
    highlights: ["Kiss of Life", "ZEROBASEONE", "BOYNEXTDOOR", "TWS"],
  },
];

export const DEFAULT_PERSONALIZATION: UserPersonalization = {
  favoriteGroups: ["aespa", "TREASURE", "Kiss of Life", "SEVENTEEN", "Stray Kids", "IVE", "TWICE"],
  favoriteSoloists: ["TAEMIN", "Tiffany Young"],
  favoriteGenres: ["Synth-pop & Future Pop", "Hip-hop & Hard Rap", "R&B & Soul Grooves"],
  favoriteGenerations: ["4th Gen (2018–2022)", "5th Gen (2023–Present)"],
  username: "kpop_luna",
  email: "luna@kpopulse.com",
};

export const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    id: "user_kpop_luna",
    username: "kpop_luna",
    email: "luna@kpopulse.com",
    password: "password123",
    personalization: { ...DEFAULT_PERSONALIZATION },
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "user_starlight",
    username: "starlight_stan",
    email: "starlight@kpopulse.com",
    password: "password123",
    personalization: {
      favoriteGroups: ["Stray Kids", "TXT", "ENHYPEN"],
      favoriteSoloists: ["TAEMIN", "DINO"],
      favoriteGenres: ["Hip-hop & Hard Rap", "K-Rock & Alternative"],
      favoriteGenerations: ["4th Gen (2018–2022)"],
      username: "starlight_stan",
      email: "starlight@kpopulse.com",
    },
    createdAt: "2026-02-15T00:00:00.000Z",
  },
];

// ─── Comebacks Helper & Data ───────────────────────────────────────────────────

export function calculateComebackDaysLeft(dateStr: string, referenceDate: Date = new Date()): number {
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return 0;
  
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const refMidnight = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate()).getTime();
  
  return Math.round((targetMidnight - refMidnight) / (1000 * 60 * 60 * 24));
}

export function isComebackFinished(comeback: Comeback): boolean {
  return comeback.daysLeft <= 0 || calculateComebackDaysLeft(comeback.date) <= 0;
}

export const COMEBACKS: Comeback[] = [
  // ── Upcoming ─────────────────────────────────────────────────────────────
  { id: 24, artist: "AtHeart",       title: "3!4!",                   type: "Single",             date: "Aug 19, 2026", daysLeft: 1,  tracks: 1,  teaser: false, preorder: false, color: "#FF4F8B", img: "1541367777708-7905fe3296c4" },
  { id: 25, artist: "ZEROBASEONE",   title: "回帰LOVE",               type: "Japan Single",       date: "Aug 19, 2026", daysLeft: 1,  tracks: 2,  teaser: true,  preorder: true,  color: "#00B4D8", img: "1478737270239-2f02b77fc618" },
  { id: 26, artist: "BIGBANG",       title: "BiiiG",                  type: "Digital Single",     date: "Aug 19, 2026", daysLeft: 1,  tracks: 1,  teaser: true,  preorder: false, color: "#F0A500", img: "1516450360452-9312f5e86fc7" },
  { id: 27, artist: "ONEWE",         title: "面 : Unknown Atlas",     type: "3rd Full Album",     date: "Aug 19, 2026", daysLeft: 1,  tracks: 12, teaser: false, preorder: true,  color: "#4361EE", img: "1598387993441-a364f854c3e1" },
  { id: 28, artist: "MASHIRO",       title: "24/11",                  type: "1st EP",             date: "Aug 19, 2026", daysLeft: 1,  tracks: 5,  teaser: false, preorder: false, color: "#E040FB", img: "1574169411535-1e7c8f9e1b74" },
  { id: 29, artist: "ODD YOUTH",     title: "can't go back",          type: "Single",             date: "Aug 19, 2026", daysLeft: 1,  tracks: 1,  teaser: false, preorder: false, color: "#26C6DA", img: "1508700115892-45ecd05ae2ad" },
  { id: 30, artist: "Tiffany Young", title: "Edge of Calm",           type: "1st Full Album",     date: "Aug 20, 2026", daysLeft: 2,  tracks: 11, teaser: true,  preorder: true,  color: "#FF8C69", img: "1493225457124-a3eb161ffa5f" },
  { id: 31, artist: "KIM JAE JOONG", title: "THE WAVE",               type: "Single",             date: "Aug 20, 2026", daysLeft: 2,  tracks: 1,  teaser: false, preorder: false, color: "#1A73E8", img: "1524368535928-5b5e00ddc76b" },
  { id: 32, artist: "MIMI",          title: "Bish Bash Bosh",         type: "Single",             date: "Aug 20, 2026", daysLeft: 2,  tracks: 1,  teaser: false, preorder: false, color: "#FF6F61", img: "1571019613454-1cb2f99b2d8b" },
  { id: 33, artist: "ENHYPEN",       title: "THE SIN : BLISS",        type: "8th Mini Album",     date: "Aug 21, 2026", daysLeft: 3,  tracks: 8,  teaser: true,  preorder: true,  color: "#7B3FFF", img: "1598387993441-a364f854c3e1" },
  { id: 34, artist: "NEXZ",          title: "SAUCIN'",                type: "4th Mini Album",     date: "Aug 24, 2026", daysLeft: 6,  tracks: 7,  teaser: false, preorder: false, color: "#FF5722", img: "1619983081563-430f63602796" },
  { id: 35, artist: "NCT 127",       title: "BLINGY",                 type: "7th Album",          date: "Aug 24, 2026", daysLeft: 6,  tracks: 14, teaser: true,  preorder: true,  color: "#00A36C", img: "1520637836993-5cce7b6b3b27" },
  { id: 36, artist: "ALPHA DRIVE",   title: "ALPHA DRIVE ONE",        type: "2nd Mini Album",     date: "Aug 24, 2026", daysLeft: 6,  tracks: 6,  teaser: false, preorder: false, color: "#E53935", img: "1541367777708-7905fe3296c4" },
  { id: 37, artist: "TUIDE",         title: "TUIDE",                  type: "1st EP",             date: "Aug 24, 2026", daysLeft: 6,  tracks: 5,  teaser: false, preorder: false, color: "#43A047", img: "1478737270239-2f02b77fc618" },
  { id: 38, artist: "SF9",           title: "TENACITY",               type: "2nd Album",          date: "Aug 26, 2026", daysLeft: 8,  tracks: 12, teaser: false, preorder: true,  color: "#E82020", img: "1514525253161-7a46d19cd819" },
  { id: 39, artist: "HITGS",         title: "HITGS",                  type: "Digital Single",     date: "Aug 27, 2026", daysLeft: 9,  tracks: 1,  teaser: false, preorder: false, color: "#9C27B0", img: "1516450360452-9312f5e86fc7" },
  { id: 40, artist: "TAEMIN",        title: "PHASE 1 : Soft Violence", type: "Album",             date: "Aug 31, 2026", daysLeft: 13, tracks: 10, teaser: true,  preorder: true,  color: "#5B8DB8", img: "1574169411535-1e7c8f9e1b74" },
  { id: 41, artist: "CHUNG HA",       title: "México",                 type: "Digital Single",     date: "Sep 1, 2026",  daysLeft: 14, tracks: 1,  teaser: true,  preorder: false, color: "#E040FB", img: "1534528741775-53994a69daeb" },
  { id: 42, artist: "82MAJOR",        title: "HEAT",                   type: "2nd Single",         date: "Sep 1, 2026",  daysLeft: 14, tracks: 2,  teaser: true,  preorder: true,  color: "#FF5722", img: "1516450360452-9312f5e86fc7" },
  { id: 43, artist: "TUNEXX",         title: "BLUE MODE",              type: "2nd Mini Album",     date: "Sep 2, 2026",  daysLeft: 15, tracks: 6,  teaser: true,  preorder: true,  color: "#00B4D8", img: "1508700115892-45ecd05ae2ad" },
  { id: 44, artist: "izna",           title: "HANDLE WITH CARE",       type: "Japan 1st Mini",     date: "Sep 2, 2026",  daysLeft: 15, tracks: 5,  teaser: true,  preorder: true,  color: "#FF69B4", img: "1541367777708-7905fe3296c4" },
  { id: 45, artist: "MONSTA X",       title: "The Phase",              type: "Mini Album",         date: "Sep 4, 2026",  daysLeft: 17, tracks: 6,  teaser: true,  preorder: true,  color: "#D32F2F", img: "1598387993441-a364f854c3e1" },
  { id: 46, artist: "EVAN",           title: "DEATH OF ME",            type: "1st Mini Album",     date: "Sep 7, 2026",  daysLeft: 20, tracks: 6,  teaser: true,  preorder: true,  color: "#8E24AA", img: "1534528741775-53994a69daeb" },
  { id: 47, artist: "VERIVERY",       title: "CONFETTI",               type: "8th Mini Album",     date: "Sep 7, 2026",  daysLeft: 20, tracks: 6,  teaser: false, preorder: true,  color: "#7B1FA2", img: "1478737270239-2f02b77fc618" },
  { id: 48, artist: "MINHO",          title: "Make It Hot",            type: "2nd Mini Album",     date: "Sep 7, 2026",  daysLeft: 20, tracks: 5,  teaser: true,  preorder: true,  color: "#FF3D00", img: "1520637836993-5cce7b6b3b27" },
  { id: 49, artist: "&TEAM",          title: "Mark on Me",             type: "Mini Album",         date: "Sep 8, 2026",  daysLeft: 21, tracks: 6,  teaser: true,  preorder: true,  color: "#1976D2", img: "1514525253161-7a46d19cd819" },
  { id: 50, artist: "In A Minute",    title: "In A Minute",            type: "Debut Single",       date: "Sep 9, 2026",  daysLeft: 22, tracks: 2,  teaser: false, preorder: false, color: "#009688", img: "1571019613454-1cb2f99b2d8b" },
  { id: 51, artist: "ONEW",           title: "Kakera -Unmei no Piece-",type: "Japan 4th Single",   date: "Sep 16, 2026", daysLeft: 29, tracks: 3,  teaser: true,  preorder: true,  color: "#3F51B5", img: "1574169411535-1e7c8f9e1b74" },
  { id: 52, artist: "CLOSE YOUR EYES",title: "New Album",              type: "Album",              date: "Sep 25, 2026", daysLeft: 38, tracks: 6,  teaser: false, preorder: false, color: "#2E7D32", img: "1516450360452-9312f5e86fc7" },
  { id: 53, artist: "BOYNEXTDOOR",   title: "HOME",                   type: "1st Studio Repackage", date: "Sep 28, 2026", daysLeft: 41, tracks: 12, teaser: true, preorder: true,  color: "#FFB300", img: "1619983081563-430f63602796" },
  { id: 54, artist: "XngHan&Xoul",    title: "XngHan&Xoul",            type: "Japan Debut Single", date: "Sep 30, 2026", daysLeft: 43, tracks: 2,  teaser: false, preorder: true,  color: "#607D8B", img: "1493225457124-a3eb161ffa5f" },
  // ── Recently Released (Finished Comebacks) ─────────────────────────────────
  { id: 23, artist: "BOYNEXTDOOR",   title: "Boom Boom Boom",         type: "Japan Single",       date: "Aug 18, 2026", daysLeft: 0,  tracks: 2,  teaser: false, preorder: false, color: "#FFB300", img: "1514525253161-7a46d19cd819" },
  { id: 21, artist: "TXT",           title: "Setsuna Hanabi",         type: "Japan 5th Single",   date: "Aug 17, 2026", daysLeft: 0,  tracks: 2,  teaser: false, preorder: false, color: "#FF6B9D", img: "1619983081563-430f63602796" },
  { id: 22, artist: "JUN. K",        title: "Your Lips",              type: "Digital Single",     date: "Aug 17, 2026", daysLeft: 0,  tracks: 1,  teaser: false, preorder: false, color: "#B06AB3", img: "1520637836993-5cce7b6b3b27" },
  { id: 19, artist: "Splayit",       title: "SPLAY : CHAPTER 01",     type: "EP",                 date: "Aug 13, 2026", daysLeft: -5,  tracks: 5,  teaser: false, preorder: false, color: "#66BB6A", img: "1514525253161-7a46d19cd819" },
  { id: 20, artist: "HYNN",          title: "Traces of Summer",       type: "EP",                 date: "Aug 13, 2026", daysLeft: -5,  tracks: 4,  teaser: false, preorder: false, color: "#FFA726", img: "1571019613454-1cb2f99b2d8b" },
  { id: 17, artist: "Hearts2Hearts", title: "ICONIC HEART",           type: "Japan Single",       date: "Aug 12, 2026", daysLeft: -6,  tracks: 2,  teaser: false, preorder: false, color: "#E91E63", img: "1541367777708-7905fe3296c4" },
  { id: 18, artist: "AxMxP",         title: "HELLO AxMxP",            type: "2nd Mini Album",     date: "Aug 12, 2026", daysLeft: -6,  tracks: 6,  teaser: false, preorder: false, color: "#29B6F6", img: "1478737270239-2f02b77fc618" },
  { id: 16, artist: "JEONG EUNJI",   title: "Summer, I",              type: "5th Mini Album",     date: "Aug 11, 2026", daysLeft: -7,  tracks: 6,  teaser: false, preorder: false, color: "#FF8A65", img: "1520637836993-5cce7b6b3b27" },
  { id: 13, artist: "KiiiKiii",      title: "WhyKiiiKiii",            type: "3rd EP",             date: "Aug 10, 2026", daysLeft: -8,  tracks: 5,  teaser: false, preorder: false, color: "#EC407A", img: "1493225457124-a3eb161ffa5f" },
  { id: 14, artist: "WayV",          title: "Vision Wings",           type: "8th Mini Album",     date: "Aug 10, 2026", daysLeft: -8,  tracks: 6,  teaser: false, preorder: false, color: "#00C4CC", img: "1574169411535-1e7c8f9e1b74" },
  { id: 15, artist: "MIYEON",        title: "RUN AWAY",               type: "Single",             date: "Aug 10, 2026", daysLeft: -8,  tracks: 1,  teaser: false, preorder: false, color: "#7E57C2", img: "1619983081563-430f63602796" },
  { id: 10, artist: "ARTMS",         title: "Hyper-Ego",              type: "2nd Mini Album",     date: "Aug 7, 2026",  daysLeft: -11, tracks: 5,  teaser: false, preorder: false, color: "#C44FFF", img: "1598387993441-a364f854c3e1" },
  { id: 11, artist: "DAWN",          title: "Too Much",               type: "Single",             date: "Aug 7, 2026",  daysLeft: -11, tracks: 1,  teaser: false, preorder: false, color: "#FF7043", img: "1508700115892-45ecd05ae2ad" },
  { id: 12, artist: "Stray Kids",    title: "THIS & THAT",            type: "Mini Album",         date: "Aug 7, 2026",  daysLeft: -11, tracks: 7,  teaser: false, preorder: false, color: "#FF4500", img: "1516450360452-9312f5e86fc7" },
  { id: 7,  artist: "HUH JIWON",     title: "The Calling",            type: "Single",             date: "Aug 5, 2026",  daysLeft: -13, tracks: 1,  teaser: false, preorder: false, color: "#AB47BC", img: "1478737270239-2f02b77fc618" },
  { id: 8,  artist: "AEN",           title: "A NEW ERA OF NOW",       type: "1st EP",             date: "Aug 5, 2026",  daysLeft: -13, tracks: 5,  teaser: false, preorder: false, color: "#42A5F5", img: "1514525253161-7a46d19cd819" },
  { id: 9,  artist: "WHIB",          title: "CHERRY PIE",             type: "2nd Mini Album",     date: "Aug 5, 2026",  daysLeft: -13, tracks: 6,  teaser: false, preorder: false, color: "#F06292", img: "1571019613454-1cb2f99b2d8b" },
  { id: 4,  artist: "KISS OF LIFE",  title: "SWEAT",                  type: "3rd Single",         date: "Aug 4, 2026",  daysLeft: -14, tracks: 1,  teaser: false, preorder: false, color: "#FF1744", img: "1619983081563-430f63602796" },
  { id: 5,  artist: "TWS",           title: "SODA SODA",              type: "Japan Single",       date: "Aug 4, 2026",  daysLeft: -14, tracks: 2,  teaser: false, preorder: false, color: "#00BCD4", img: "1520637836993-5cce7b6b3b27" },
  { id: 6,  artist: "DAYOUNG X JAY PARK", title: "FLIRTY",           type: "Single",             date: "Aug 4, 2026",  daysLeft: -14, tracks: 1,  teaser: false, preorder: false, color: "#FF6E40", img: "1541367777708-7905fe3296c4" },
  { id: 2,  artist: "DINO",          title: "吉BOARD",                type: "1st Mini Album",     date: "Aug 3, 2026",  daysLeft: -15, tracks: 6,  teaser: false, preorder: false, color: "#FF9800", img: "1508700115892-45ecd05ae2ad" },
  { id: 3,  artist: "Red Velvet",    title: "Velvet Summer",          type: "Mini Album",         date: "Aug 3, 2026",  daysLeft: -15, tracks: 6,  teaser: false, preorder: false, color: "#FF5FA0", img: "1493225457124-a3eb161ffa5f" },
  { id: 1,  artist: "Stray Kids",    title: "SKZ-REPLAY 2026 Pt.1",  type: "Album",              date: "Aug 1, 2026",  daysLeft: -17, tracks: 18, teaser: false, preorder: false, color: "#FF4500", img: "1524368535928-5b5e00ddc76b" },
];

// ─── News Data ───────────────────────────────────────────────────────────────

export const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Tour", // 
    headline: "aespa sweeps 4 categories at Melon Music Awards 2024",
    time: "2h ago",
    author: "Jao Nicholas Benedicto",
    img: "1516450360452-9312f5e86fc7",
    hot: true,
    body: "aespa had a historic night at the Melon Music Awards, taking home Album of the Year, Artist of the Year, Best Female Group, and Best Performance. The group's 'Whiplash' era proved to be their most successful to date, with the title track dominating charts across Asia for weeks. Winter, Karina, Giselle, and NingNing were visibly emotional as they accepted their final award of the night.\n\nThe ceremony, held at the KSPO Dome in Seoul, drew thousands of fans and millions of online viewers. aespa performed their hit 'Whiplash' live on stage for the first time since their comeback, receiving a standing ovation from the crowd.",
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
    title: "Whiplash",
    type: "5th Mini Album",
    year: "2024",
    tracks: 6,
    leadTrack: "Whiplash",
    youtubeVideoId: "jWQx2f-CErU", // aespa 'Whiplash' Official MV
    spotifyUrl: "https://open.spotify.com/album/4eW6bW4W6bW4W",
    appleMusicUrl: "https://music.apple.com/album/whiplash-the-5th-mini-album/1771234567",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_whiplash",
    tracklist: [
      { num: 1, title: "Whiplash", duration: "3:03", isTitle: true, youtubeVideoId: "jWQx2f-CErU" },
      { num: 2, title: "Kill It", duration: "3:20", youtubeVideoId: "Yp8h_w5xQyU" },
      { num: 3, title: "Flights, Not Feelings", duration: "3:01", youtubeVideoId: "vB4Q_rN8jWk" },
      { num: 4, title: "Pink Hoodie", duration: "2:46", youtubeVideoId: "tZ7Y_mK9v8s" },
      { num: 5, title: "Flowers", duration: "3:14", youtubeVideoId: "wP4N_kL8x0s" },
      { num: 6, title: "Just Another Girl", duration: "3:02", youtubeVideoId: "rM8Q_pL4v2s" },
    ],
  },
  {
    title: "Armageddon",
    type: "1st Full Album",
    year: "2024",
    tracks: 10,
    leadTrack: "Supernova",
    youtubeVideoId: "phuiAIQwU9A", // aespa 'Supernova' Official MV
    spotifyUrl: "https://open.spotify.com/album/43P0GvWl2d88vR22yD2E6n",
    appleMusicUrl: "https://music.apple.com/album/armageddon-the-1st-album/1744476884",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_armageddon",
    tracklist: [
      { num: 1, title: "Supernova", duration: "2:59", isTitle: true, youtubeVideoId: "phuiAIQwU9A" },
      { num: 2, title: "Armageddon", duration: "3:17", isTitle: true, hasMv: true, youtubeVideoId: "nFYwcndNuTE" },
      { num: 3, title: "Set The Tone", duration: "3:22", youtubeVideoId: "uN4v7wN_1jY" },
      { num: 4, title: "Mine", duration: "3:13", youtubeVideoId: "pL1O_7v9j8s" },
      { num: 5, title: "Licorice", duration: "2:41", youtubeVideoId: "R6Q9v4L1t0k" },
      { num: 6, title: "BAHAMA", duration: "3:11", youtubeVideoId: "V8j4q5L1n0s" },
      { num: 7, title: "Long Chat (#♥)", duration: "3:16", youtubeVideoId: "q5L1n8k4v9s" },
      { num: 8, title: "Prologue", duration: "3:15", youtubeVideoId: "W1m9v6R4k0j" },
      { num: 9, title: "Live My Life", duration: "3:46", youtubeVideoId: "x8Q1m5L9v4s" },
      { num: 10, title: "Melody (목소리)", duration: "3:08", youtubeVideoId: "J4q9v8L1n0s" },
    ],
  },
  {
    title: "Drama",
    type: "Mini Album",
    year: "2023",
    tracks: 6,
    leadTrack: "Drama",
    youtubeVideoId: "D8VEhcPeSlc", // aespa 'Drama' Official MV
    spotifyUrl: "https://open.spotify.com/album/43P0GvWl2d88vR22yD2E6n",
    appleMusicUrl: "https://music.apple.com/album/drama-the-4th-mini-album-ep/1712061986",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_kQy1H-q_a5N3Q8g_2t9R21D2qX0Q3",
    tracklist: [
      { num: 1, title: "Drama", duration: "3:48", isTitle: true, youtubeVideoId: "D8VEhcPeSlc" },
      { num: 2, title: "Trick or Trick", duration: "2:55", youtubeVideoId: "AvzoFZsShKg" },
      { num: 3, title: "Don't Blink", duration: "2:49", youtubeVideoId: "bzX5R8_GqEQ" },
      { num: 4, title: "Hot Air Balloon", duration: "3:19", youtubeVideoId: "Rbn56x39OLs" },
      { num: 5, title: "YOLO", duration: "3:09", youtubeVideoId: "SsW6Jkf4jQQ" },
      { num: 6, title: "You", duration: "3:23", youtubeVideoId: "ug6y1mQbr8s" },
    ],
  },
  {
    title: "MY WORLD",
    type: "Mini Album",
    year: "2023",
    tracks: 6,
    leadTrack: "Spicy",
    youtubeVideoId: "Os_heh8vPfs", // aespa 'Spicy' Official MV
    spotifyUrl: "https://open.spotify.com/album/6K4D9f7l8Xj3vK3r4J5b",
    appleMusicUrl: "https://music.apple.com/album/my-world-the-3rd-mini-album-ep/1684345517",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_nwV0z4Qe1tP8v9q",
    tracklist: [
      { num: 1, title: "Welcome To MY World (feat. nævis)", duration: "3:32", hasMv: true, youtubeVideoId: "0xdB_vo4r2c" },
      { num: 2, title: "Spicy", duration: "3:25", isTitle: true, youtubeVideoId: "Os_heh8vPfs" },
      { num: 3, title: "Salty & Sweet", duration: "3:22", youtubeVideoId: "sORkB5o3b6o" },
      { num: 4, title: "Thirsty", duration: "3:13", youtubeVideoId: "K8P_p4j9T38" },
      { num: 5, title: "I'm Unhappy", duration: "3:26", youtubeVideoId: "v3L1XdqGnyI" },
      { num: 6, title: "'Til We Meet Again", duration: "3:38", youtubeVideoId: "cWsZCogtH98" },
    ],
  },
  {
    title: "GIRLS",
    type: "Mini Album",
    year: "2022",
    tracks: 6,
    leadTrack: "Girls",
    youtubeVideoId: "dYRITmpFbJ4", // aespa 'Girls' Official MV
    spotifyUrl: "https://open.spotify.com/album/2d4Z6q5gV8vN0r5",
    appleMusicUrl: "https://music.apple.com/album/girls-the-2nd-mini-album-ep/1628169752",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_m5X8j2p4",
    tracklist: [
      { num: 1, title: "Girls", duration: "4:00", isTitle: true, youtubeVideoId: "dYRITmpFbJ4" },
      { num: 2, title: "Illusion", duration: "3:15", youtubeVideoId: "Bjzp6v8x1u8" },
      { num: 3, title: "Lingo", duration: "2:36", youtubeVideoId: "w7hK5s5p8aE" },
      { num: 4, title: "Life's Too Short (English Ver.)", duration: "2:58", hasMv: true, youtubeVideoId: "z2Ah0pvh9x8" },
      { num: 5, title: "ICU (쉬어가도 돼)", duration: "3:41", youtubeVideoId: "K2O5m3z4J8o" },
      { num: 6, title: "Life's Too Short (Korean Ver.)", duration: "2:58", youtubeVideoId: "f4V3j7y9K0k" },
    ],
  },
  {
    title: "Savage",
    type: "Mini Album",
    year: "2021",
    tracks: 7,
    leadTrack: "Savage",
    youtubeVideoId: "WPdWvnAAurg", // aespa 'Savage' Official MV
    spotifyUrl: "https://open.spotify.com/album/3oYV1W7j2v9qK",
    appleMusicUrl: "https://music.apple.com/album/savage-the-1st-mini-album/1587399850",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_n6T2p9r",
    tracklist: [
      { num: 1, title: "aenergy", duration: "2:27", youtubeVideoId: "X_U2Z6K3bXw" },
      { num: 2, title: "Savage", duration: "3:58", isTitle: true, youtubeVideoId: "WPdWvnAAurg" },
      { num: 3, title: "I'll Make You Cry", duration: "3:34", youtubeVideoId: "rNnFh2y0f8o" },
      { num: 4, title: "YEPPI YEPPI", duration: "3:33", youtubeVideoId: "vQZ7Vb3bL2o" },
      { num: 5, title: "ICONIC", duration: "3:11", youtubeVideoId: "k6r5h3V4o2Y" },
      { num: 6, title: "Lucid Dream", duration: "3:30", youtubeVideoId: "f6a9R1l5J8w" },
      { num: 7, title: "Black Mamba (Bonus)", duration: "2:54", youtubeVideoId: "ZeerrnuLi5E" },
    ],
  },
  {
    title: "Next Level",
    type: "Digital Single",
    year: "2021",
    tracks: 1,
    leadTrack: "Next Level",
    youtubeVideoId: "4TWR90KJl84", // aespa 'Next Level' Official MV
    spotifyUrl: "https://open.spotify.com/album/2CzbrboOLzeRoaaH1N5K0N",
    appleMusicUrl: "https://music.apple.com/album/next-level-single/1566861219",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=4TWR90KJl84",
    tracklist: [
      { num: 1, title: "Next Level", duration: "3:56", isTitle: true, youtubeVideoId: "4TWR90KJl84" },
    ],
  },
  {
    title: "Forever",
    type: "Digital Single",
    year: "2021",
    tracks: 1,
    leadTrack: "Forever",
    youtubeVideoId: "wog1R1d4zls", // aespa 'Next Level' Official MV
    spotifyUrl: "https://open.spotify.com/album/3CExk4WgPxe0lOwoOhuMWj",
    appleMusicUrl: "https://music.apple.com/album/next-level-single/1566861219",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=4TWR90KJl84",
    tracklist: [
      { num: 1, title: "Next Level", duration: "5:06", isTitle: true, youtubeVideoId: "wog1R1d4zls" },
    ],
  },
  {
    title: "Black Mamba",
    type: "Digital Single",
    year: "2020",
    tracks: 1,
    leadTrack: "Black Mamba",
    youtubeVideoId: "ZeerrnuLi5E", // aespa 'Black Mamba' Official MV
    spotifyUrl: "https://open.spotify.com/track/1ENaee1lKz1oT8kU",
    appleMusicUrl: "https://music.apple.com/album/black-mamba-single/1539958156",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=ZeerrnuLi5E",
    tracklist: [
      { num: 1, title: "Black Mamba", duration: "2:54", isTitle: true, youtubeVideoId: "ZeerrnuLi5E" },
    ],
  },
];

export const treasureDiscography: DiscographyItem[] = [
  {
    title: "REBOOT",
    type: "2nd Full Album",
    year: "2023",
    tracks: 10,
    leadTrack: "BONA BONA",
    youtubeVideoId: "bO2eC7mKj4w", // TREASURE BONA BONA MV
    spotifyUrl: "https://open.spotify.com/album/43i0y6p2v8",
    appleMusicUrl: "https://music.apple.com/album/reboot/1698244031",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_kQy1H",
    tracklist: [
      { num: 1, title: "BONA BONA", duration: "3:34", isTitle: true, youtubeVideoId: "bO2eC7mKj4w" },
      { num: 2, title: "I WANT YOUR LOVE", duration: "3:24" },
      { num: 3, title: "RUN", duration: "3:31" },
      { num: 4, title: "MOVE (T5)", duration: "3:28", isTitle: true, youtubeVideoId: "J2b0uDqujS8" },
      { num: 5, title: "G.O.A.T (feat. Lee Young Hyun)", duration: "3:03" },
      { num: 6, title: "STUPID", duration: "3:00" },
      { num: 7, title: "THE WAY TO", duration: "3:38" },
      { num: 8, title: "WONDERLAND", duration: "2:59" },
      { num: 9, title: "B.O.M.B", duration: "3:20", youtubeVideoId: "y1vX4W-3hZ4" },
      { num: 10, title: "LOVERS HIGH", duration: "3:18" },
    ],
  },
  {
    title: "THE SECOND STEP : CHAPTER TWO",
    type: "2nd Mini Album",
    year: "2022",
    tracks: 6,
    leadTrack: "HELLO",
    youtubeVideoId: "aedGtLptgHw", // TREASURE HELLO MV
    tracklist: [
      { num: 1, title: "HELLO", duration: "3:00", isTitle: true, youtubeVideoId: "aedGtLptgHw" },
      { num: 2, title: "VolKno", duration: "3:13", youtubeVideoId: "0bM5yTz6j0U" },
      { num: 3, title: "CLAP!", duration: "3:10" },
      { num: 4, title: "THANK YOU", duration: "3:15" },
      { num: 5, title: "HOLD IT IN", duration: "3:18" },
      { num: 6, title: "DARARI (Rock Remix)", duration: "3:14", youtubeVideoId: "Qp4v2g4fJqg" },
    ],
  },
  {
    title: "THE SECOND STEP : CHAPTER ONE",
    type: "1st Mini Album",
    year: "2022",
    tracks: 6,
    leadTrack: "JIKJIN",
    youtubeVideoId: "Z427mQkK_o4", // TREASURE JIKJIN MV
    tracklist: [
      { num: 1, title: "JIKJIN (직진)", duration: "3:04", isTitle: true, youtubeVideoId: "Z427mQkK_o4" },
      { num: 2, title: "U", duration: "2:46" },
      { num: 3, title: "DARARI (다라리)", duration: "3:40", isTitle: true, youtubeVideoId: "Qp4v2g4fJqg" },
      { num: 4, title: "IT'S OKAY", duration: "3:14" },
      { num: 5, title: "BFF", duration: "3:20" },
      { num: 6, title: "Gonna Be Fine", duration: "3:36" },
    ],
  },
  {
    title: "THE FIRST STEP : TREASURE EFFECT",
    type: "1st Full Album",
    year: "2021",
    tracks: 12,
    leadTrack: "MY TREASURE",
    youtubeVideoId: "p9LLo9C45CU", // TREASURE MY TREASURE MV
    tracklist: [
      { num: 1, title: "MY TREASURE", duration: "3:15", isTitle: true, youtubeVideoId: "p9LLo9C45CU" },
      { num: 2, title: "BE WITH ME", duration: "3:13" },
      { num: 3, title: "SLOWMOTION", duration: "3:10" },
      { num: 4, title: "BOY", duration: "3:16", isTitle: true, youtubeVideoId: "J_CXb54WNWY" },
      { num: 5, title: "COME TO ME", duration: "3:24" },
      { num: 6, title: "I LOVE YOU", duration: "3:01", isTitle: true, youtubeVideoId: "_hFarg-PvtI" },
      { num: 7, title: "B.L.T (BLING LIKE THIS)", duration: "3:25" },
      { num: 8, title: "MMM", duration: "3:28", isTitle: true, youtubeVideoId: "r2_r6QxZ-bA" },
      { num: 9, title: "ORANGE", duration: "4:16" },
      { num: 10, title: "GOING CRAZY", duration: "3:44" },
      { num: 11, title: "I LOVE YOU (Piano Ver.)", duration: "3:00" },
      { num: 12, title: "MMM (Rock Ver.)", duration: "3:28" },
    ],
  },
  {
    title: "KING KONG",
    type: "Digital Single",
    year: "2024",
    tracks: 1,
    leadTrack: "KING KONG",
    youtubeVideoId: "7L8sX4w1r2A", // TREASURE KING KONG MV
    tracklist: [
      { num: 1, title: "KING KONG", duration: "3:02", isTitle: true, youtubeVideoId: "7L8sX4w1r2A" },
    ],
  },
];

export const seventeenDiscography: DiscographyItem[] = [
  {
    title: "17 IS RIGHT HERE",
    type: "Best Album",
    year: "2024",
    tracks: 33,
    leadTrack: "MAESTRO",
    youtubeVideoId: "3xWpL6L0s4g", // SEVENTEEN MAESTRO MV
    spotifyUrl: "https://open.spotify.com/album/5b7r9w3k",
    appleMusicUrl: "https://music.apple.com/album/17-is-right-here/1739981666",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_seventeen",
    tracklist: [
      { num: 1, title: "MAESTRO", duration: "3:18", isTitle: true, youtubeVideoId: "3xWpL6L0s4g" },
      { num: 2, title: "LALALI (Hip-hop Unit)", duration: "2:51", isTitle: true, youtubeVideoId: "4_R1B5TqB6w" },
      { num: 3, title: "Spell (Performance Unit)", duration: "3:17", isTitle: true, youtubeVideoId: "aM6E4s7dF6U" },
      { num: 4, title: "Cheers to youth (Vocal Unit)", duration: "3:11", isTitle: true, youtubeVideoId: "6r9y0sR3d0w" },
      { num: 5, title: "CALL CALL CALL! (Korean Ver.)", duration: "3:20" },
      { num: 6, title: "Happy Ending (Korean Ver.)", duration: "3:30" },
      { num: 7, title: "Fallin' Flower (Korean Ver.)", duration: "3:30" },
      { num: 8, title: "24H (Korean Ver.)", duration: "3:09" },
    ],
  },
  {
    title: "SEVENTEENTH HEAVEN",
    type: "11th Mini Album",
    year: "2023",
    tracks: 8,
    leadTrack: "God of Music",
    youtubeVideoId: "zSQ48zyWZrY", // SEVENTEEN God of Music MV
    spotifyUrl: "https://open.spotify.com/album/6d1c8y4z",
    appleMusicUrl: "https://music.apple.com/album/seventeenth-heaven-ep/1711200921",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_svt_heaven",
    tracklist: [
      { num: 1, title: "SOS (Prod. Marshmello)", duration: "3:12" },
      { num: 2, title: "God of Music (음악의 신)", duration: "3:25", isTitle: true, youtubeVideoId: "zSQ48zyWZrY" },
      { num: 3, title: "Diamond Days", duration: "3:26" },
      { num: 4, title: "Back 2 Back", duration: "3:29" },
      { num: 5, title: "Monster", duration: "2:54" },
      { num: 6, title: "Yawn (하품)", duration: "3:41" },
      { num: 7, title: "Headliner", duration: "3:18" },
      { num: 8, title: "God of Music (Inst.)", duration: "3:25" },
    ],
  },
  {
    title: "FML",
    type: "10th Mini Album",
    year: "2023",
    tracks: 6,
    leadTrack: "Super",
    youtubeVideoId: "-GQg25oP0S4", // SEVENTEEN Super MV
    spotifyUrl: "https://open.spotify.com/album/2wP7l3",
    appleMusicUrl: "https://music.apple.com/album/fml-ep/1681944519",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_fml",
    tracklist: [
      { num: 1, title: "F*ck My Life", duration: "3:22", isTitle: true, youtubeVideoId: "g4oGvF3N4mE" },
      { num: 2, title: "Super (손오공)", duration: "3:20", isTitle: true, youtubeVideoId: "-GQg25oP0S4" },
      { num: 3, title: "Fire (Hip-hop Team)", duration: "2:38" },
      { num: 4, title: "I Don't Understand But I Luv U", duration: "3:29" },
      { num: 5, title: "Dust (먼지)", duration: "2:45" },
      { num: 6, title: "April shower", duration: "3:32" },
    ],
  },
  {
    title: "Face the Sun",
    type: "4th Album",
    year: "2022",
    tracks: 9,
    leadTrack: "HOT",
    youtubeVideoId: "gRnuFC4Ualw", // SEVENTEEN HOT MV
    tracklist: [
      { num: 1, title: "Darl+ing", duration: "2:56", youtubeVideoId: "bTt4n_Pq2A0" },
      { num: 2, title: "HOT", duration: "3:17", isTitle: true, youtubeVideoId: "gRnuFC4Ualw" },
      { num: 3, title: "DON QUIXOTE", duration: "2:52" },
      { num: 4, title: "March", duration: "3:11" },
      { num: 5, title: "Domino", duration: "3:34" },
      { num: 6, title: "Shadow", duration: "3:33" },
      { num: 7, title: "'bout you (노래해)", duration: "2:42" },
      { num: 8, title: "IF you leave me", duration: "3:32" },
      { num: 9, title: "Ash", duration: "3:21" },
    ],
  },
  {
    title: "Attacca",
    type: "9th Mini Album",
    year: "2021",
    tracks: 7,
    leadTrack: "Rock with you",
    youtubeVideoId: "WpuatuzSDK4", // SEVENTEEN Rock with you MV
    tracklist: [
      { num: 1, title: "To you (소용돌이)", duration: "3:45" },
      { num: 2, title: "Rock with you", duration: "3:00", isTitle: true, youtubeVideoId: "WpuatuzSDK4" },
      { num: 3, title: "Crush", duration: "2:49" },
      { num: 4, title: "PANG!", duration: "2:58" },
      { num: 5, title: "Imperfect love (매일 그대라서 행복하다)", duration: "3:24" },
      { num: 6, title: "I can't run away (그리워하는 것까지)", duration: "3:30" },
      { num: 7, title: "2 MINUS 1", duration: "3:11" },
    ],
  },
];

export const strayKidsDiscography: DiscographyItem[] = [
  {
    title: "ATE",
    type: "9th Mini Album",
    year: "2024",
    tracks: 8,
    leadTrack: "Chk Chk Boom",
    youtubeVideoId: "0P0aQa27BGE", // Stray Kids Chk Chk Boom MV
    spotifyUrl: "https://open.spotify.com/album/43k0z2r9",
    appleMusicUrl: "https://music.apple.com/album/ate/1754988771",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_skz_ate",
    tracklist: [
      { num: 1, title: "MOUNTAINS", duration: "3:07" },
      { num: 2, title: "Chk Chk Boom", duration: "2:28", isTitle: true, youtubeVideoId: "0P0aQa27BGE" },
      { num: 3, title: "JJAM", duration: "3:05", isTitle: true, youtubeVideoId: "q5q7W_F5d4E" },
      { num: 4, title: "I Like It", duration: "2:28" },
      { num: 5, title: "Runners", duration: "2:33" },
      { num: 6, title: "twilight (또 다시 밤)", duration: "3:12" },
      { num: 7, title: "Stray Kids", duration: "3:09" },
      { num: 8, title: "Chk Chk Boom (Festival Ver.)", duration: "2:33" },
    ],
  },
  {
    title: "ROCK-STAR",
    type: "8th Mini Album",
    year: "2023",
    tracks: 8,
    leadTrack: "LALALALA",
    youtubeVideoId: "dt_2AdfvWls", // Stray Kids LALALALA MV
    spotifyUrl: "https://open.spotify.com/album/6t7y4",
    appleMusicUrl: "https://music.apple.com/album/rock-star/1711200921",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_skz_rock",
    tracklist: [
      { num: 1, title: "MEGAVERSE", duration: "3:06", youtubeVideoId: "w_M4o1zVj0Y" },
      { num: 2, title: "LALALALA (락)", duration: "3:02", isTitle: true, youtubeVideoId: "dt_2AdfvWls" },
      { num: 3, title: "BLIND SPOT (사각지대)", duration: "3:21" },
      { num: 4, title: "COMFLEX", duration: "2:52" },
      { num: 5, title: "Cover Me (가려줘)", duration: "3:11" },
      { num: 6, title: "Leave", duration: "3:39" },
      { num: 7, title: "Social Path (Korean Ver.)", duration: "3:17" },
      { num: 8, title: "LALALALA (Rock Ver.)", duration: "3:08" },
    ],
  },
  {
    title: "5-STAR",
    type: "3rd Full Album",
    year: "2023",
    tracks: 12,
    leadTrack: "S-Class",
    youtubeVideoId: "JsOOis4bBFg", // Stray Kids S-Class MV
    tracklist: [
      { num: 1, title: "Hall of Fame (위인전)", duration: "2:51" },
      { num: 2, title: "S-Class (특)", duration: "3:16", isTitle: true, youtubeVideoId: "JsOOis4bBFg" },
      { num: 3, title: "ITEM", duration: "3:12" },
      { num: 4, title: "Super Bowl", duration: "3:03", youtubeVideoId: "F1c7kXp1bL0" },
      { num: 5, title: "TOPLINE (feat. Tiger JK)", duration: "3:24", youtubeVideoId: "y1vX4W-3hZ4" },
      { num: 6, title: "DLC", duration: "3:06" },
      { num: 7, title: "GET LIT (죽어보자)", duration: "2:51" },
      { num: 8, title: "Collision (충돌)", duration: "2:38" },
      { num: 9, title: "FNF", duration: "2:52" },
      { num: 10, title: "Youtiful", duration: "3:29" },
      { num: 11, title: "THE SOUND (Korean Ver.)", duration: "2:58" },
      { num: 12, title: "Time Out", duration: "2:55" },
    ],
  },
  {
    title: "MAXIDENT",
    type: "7th Mini Album",
    year: "2022",
    tracks: 8,
    leadTrack: "CASE 143",
    youtubeVideoId: "jWD9z9g_s64", // Stray Kids CASE 143 MV
    tracklist: [
      { num: 1, title: "CASE 143", duration: "3:12", isTitle: true, youtubeVideoId: "jWD9z9g_s64" },
      { num: 2, title: "CHILL (식혀)", duration: "3:15" },
      { num: 3, title: "Give Me Your TMI", duration: "3:18" },
      { num: 4, title: "SUPER BOARD", duration: "3:06" },
      { num: 5, title: "3RACHA (Bang Chan, Changbin, Han)", duration: "3:29" },
      { num: 6, title: "TASTE (Lee Know, Hyunjin, Felix)", duration: "3:36" },
      { num: 7, title: "Can't Stop (Seungmin, I.N)", duration: "3:30" },
      { num: 8, title: "CIRCUS (Korean Ver.)", duration: "3:14" },
    ],
  },
  {
    title: "ODDINARY",
    type: "6th Mini Album",
    year: "2022",
    tracks: 7,
    leadTrack: "MANIAC",
    youtubeVideoId: "OvioeS1ZZ7o", // Stray Kids MANIAC MV
    tracklist: [
      { num: 1, title: "Venom (거미줄)", duration: "3:15", youtubeVideoId: "mE8P1YjW5E8" },
      { num: 2, title: "MANIAC", duration: "3:02", isTitle: true, youtubeVideoId: "OvioeS1ZZ7o" },
      { num: 3, title: "Charmer", duration: "3:08" },
      { num: 4, title: "FREEZE (땡)", duration: "2:58", youtubeVideoId: "vBqXz9-R9Bw" },
      { num: 5, title: "Lonely St.", duration: "2:44" },
      { num: 6, title: "Waiting For Us (피어난다)", duration: "3:39" },
      { num: 7, title: "Muddy Water", duration: "3:17" },
    ],
  },
];

export const iveDiscography: DiscographyItem[] = [
  {
    title: "IVE SWITCH",
    type: "2nd EP",
    year: "2024",
    tracks: 6,
    leadTrack: "HEYA",
    youtubeVideoId: "0bM5yTz6j0U", // IVE HEYA MV
    spotifyUrl: "https://open.spotify.com/album/43k0z2r9",
    appleMusicUrl: "https://music.apple.com/album/ive-switch-ep/1742048999",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_ive_switch",
    tracklist: [
      { num: 1, title: "HEYA (해야)", duration: "3:10", isTitle: true, youtubeVideoId: "0bM5yTz6j0U" },
      { num: 2, title: "Accendio", duration: "3:12", isTitle: true, youtubeVideoId: "Qp4v2g4fJqg" },
      { num: 3, title: "Blue Heart", duration: "3:08" },
      { num: 4, title: "Ice Queen", duration: "3:03" },
      { num: 5, title: "WOW", duration: "2:58" },
      { num: 6, title: "RESET", duration: "2:42" },
    ],
  },
  {
    title: "I'VE MINE",
    type: "1st EP",
    year: "2023",
    tracks: 6,
    leadTrack: "Baddie",
    youtubeVideoId: "Da40KDXAI-U", // IVE Baddie MV
    tracklist: [
      { num: 1, title: "Off The Record", duration: "3:08", isTitle: true, youtubeVideoId: "P_zK3pY7h0k" },
      { num: 2, title: "Baddie", duration: "2:34", isTitle: true, youtubeVideoId: "Da40KDXAI-U" },
      { num: 3, title: "Either Way", duration: "2:46", isTitle: true, youtubeVideoId: "F1c7kXp1bL0" },
      { num: 4, title: "Holy Moly", duration: "2:57" },
      { num: 5, title: "OTT", duration: "2:37" },
      { num: 6, title: "Payback", duration: "3:07" },
    ],
  },
  {
    title: "I've IVE",
    type: "1st Studio Album",
    year: "2023",
    tracks: 11,
    leadTrack: "I AM",
    youtubeVideoId: "6ZUIwj3FgUY", // IVE I AM MV
    tracklist: [
      { num: 1, title: "Blue Blood", duration: "2:47" },
      { num: 2, title: "I AM", duration: "3:03", isTitle: true, youtubeVideoId: "6ZUIwj3FgUY" },
      { num: 3, title: "Kitsch", duration: "3:15", isTitle: true, youtubeVideoId: "pG6iaOMV46I" },
      { num: 4, title: "Lips", duration: "3:01" },
      { num: 5, title: "Heroine", duration: "2:57" },
      { num: 6, title: "Mine", duration: "3:10" },
      { num: 7, title: "Hypnosis (섬찟)", duration: "2:26" },
      { num: 8, title: "NOT YOUR GIRL", duration: "3:22" },
      { num: 9, title: "Next Page", duration: "3:19" },
      { num: 10, title: "Cherish", duration: "3:14" },
      { num: 11, title: "Shine With Me", duration: "3:44" },
    ],
  },
  {
    title: "After LIKE",
    type: "3rd Single Album",
    year: "2022",
    tracks: 2,
    leadTrack: "After LIKE",
    youtubeVideoId: "F0B7HDiY-10", // IVE After LIKE MV
    tracklist: [
      { num: 1, title: "After LIKE", duration: "2:56", isTitle: true, youtubeVideoId: "F0B7HDiY-10" },
      { num: 2, title: "My Satisfaction", duration: "3:13" },
    ],
  },
  {
    title: "LOVE DIVE",
    type: "2nd Single Album",
    year: "2022",
    tracks: 2,
    leadTrack: "LOVE DIVE",
    youtubeVideoId: "Y8JFxS1HlDo", // IVE LOVE DIVE MV
    tracklist: [
      { num: 1, title: "LOVE DIVE", duration: "2:57", isTitle: true, youtubeVideoId: "Y8JFxS1HlDo" },
      { num: 2, title: "ROYAL", duration: "3:08" },
    ],
  },
  {
    title: "ELEVEN",
    type: "1st Single Album",
    year: "2021",
    tracks: 2,
    leadTrack: "ELEVEN",
    youtubeVideoId: "--FmExEAs3A", // IVE ELEVEN MV
    tracklist: [
      { num: 1, title: "ELEVEN", duration: "3:04", isTitle: true, youtubeVideoId: "--FmExEAs3A" },
      { num: 2, title: "Take It", duration: "3:25" },
    ],
  },
];

export const twiceDiscography: DiscographyItem[] = [
  {
    title: "With YOU-th",
    type: "13th Mini Album",
    year: "2024",
    tracks: 6,
    leadTrack: "ONE SPARK",
    youtubeVideoId: "jCzez_quvCw", // TWICE ONE SPARK MV
    spotifyUrl: "https://open.spotify.com/album/43k0z2r9",
    appleMusicUrl: "https://music.apple.com/album/with-you-th-ep/1728247814",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_twice_youth",
    tracklist: [
      { num: 1, title: "I GOT YOU", duration: "2:53", isTitle: true, youtubeVideoId: "r2_r6QxZ-bA" },
      { num: 2, title: "ONE SPARK", duration: "3:03", isTitle: true, youtubeVideoId: "jCzez_quvCw" },
      { num: 3, title: "RUSH", duration: "2:36" },
      { num: 4, title: "NEW NEW", duration: "3:01" },
      { num: 5, title: "BLOOM", duration: "3:23" },
      { num: 6, title: "YOU GET ME", duration: "3:32" },
    ],
  },
  {
    title: "READY TO BE",
    type: "12th Mini Album",
    year: "2023",
    tracks: 7,
    leadTrack: "SET ME FREE",
    youtubeVideoId: "w4cTYnOPdNk", // TWICE SET ME FREE MV
    tracklist: [
      { num: 1, title: "SET ME FREE", duration: "3:01", isTitle: true, youtubeVideoId: "w4cTYnOPdNk" },
      { num: 2, title: "MOONLIGHT SUNRISE", duration: "3:00", isTitle: true, youtubeVideoId: "cKlEE_EYuNM" },
      { num: 3, title: "GOT THE THRILLS", duration: "2:53" },
      { num: 4, title: "BLAME IT ON ME", duration: "2:40" },
      { num: 5, title: "WALLFLOWER", duration: "2:56" },
      { num: 6, title: "CRAZY STUPID LOVE", duration: "2:49" },
      { num: 7, title: "SET ME FREE (ENG)", duration: "3:01" },
    ],
  },
  {
    title: "BETWEEN 1&2",
    type: "11th Mini Album",
    year: "2022",
    tracks: 7,
    leadTrack: "Talk that Talk",
    youtubeVideoId: "k6jqx9kZgPM", // TWICE Talk that Talk MV
    tracklist: [
      { num: 1, title: "Talk that Talk", duration: "2:57", isTitle: true, youtubeVideoId: "k6jqx9kZgPM" },
      { num: 2, title: "Queen of Hearts", duration: "3:06" },
      { num: 3, title: "Basics", duration: "2:56" },
      { num: 4, title: "Trouble", duration: "3:53" },
      { num: 5, title: "Brave", duration: "3:09" },
      { num: 6, title: "Gone", duration: "3:15" },
      { num: 7, title: "When We Were Kids", duration: "3:09" },
    ],
  },
  {
    title: "Formula of Love: O+T=<3",
    type: "3rd Full Album",
    year: "2021",
    tracks: 17,
    leadTrack: "SCIENTIST",
    youtubeVideoId: "vPwaXytZcgI", // TWICE SCIENTIST MV
    tracklist: [
      { num: 1, title: "SCIENTIST", duration: "3:14", isTitle: true, youtubeVideoId: "vPwaXytZcgI" },
      { num: 2, title: "MOONLIGHT", duration: "3:39" },
      { num: 3, title: "ICON", duration: "2:56" },
      { num: 4, title: "CRUEL", duration: "3:31" },
      { num: 5, title: "REAL YOU", duration: "3:07" },
      { num: 6, title: "F.I.L.A (Fall In Love Again)", duration: "3:11" },
      { num: 7, title: "LAST WALTZ", duration: "2:50" },
      { num: 8, title: "ESPRESSO", duration: "3:07" },
      { num: 9, title: "REWIND", duration: "3:00" },
      { num: 10, title: "CACTUS (선인장)", duration: "3:37" },
      { num: 11, title: "PUSH & PULL", duration: "3:25" },
      { num: 12, title: "HELLO", duration: "3:03" },
      { num: 13, title: "1, 3, 2", duration: "3:18" },
      { num: 14, title: "CANDY", duration: "3:15" },
      { num: 15, title: "The Feels", duration: "3:18", isTitle: true, youtubeVideoId: "f5_wn8mexmM" },
      { num: 16, title: "The Feels (Benny Benassi Remix)", duration: "3:34" },
      { num: 17, title: "SCIENTIST (R3HAB Remix)", duration: "3:28" },
    ],
  },
  {
    title: "Taste of Love",
    type: "10th Mini Album",
    year: "2021",
    tracks: 6,
    leadTrack: "Alcohol-Free",
    youtubeVideoId: "XA2YEHn-A8Q", // TWICE Alcohol-Free MV
    tracklist: [
      { num: 1, title: "Alcohol-Free", duration: "3:30", isTitle: true, youtubeVideoId: "XA2YEHn-A8Q" },
      { num: 2, title: "First Time", duration: "3:02" },
      { num: 3, title: "Scandal", duration: "2:43" },
      { num: 4, title: "Conversation", duration: "2:27" },
      { num: 5, title: "Baby Blue Love", duration: "2:46" },
      { num: 6, title: "SOS", duration: "2:53" },
    ],
  },
];

export const kissOfLifeDiscography: DiscographyItem[] = [
  {
    title: "Lose Yourself",
    type: "3rd Mini Album",
    year: "2024",
    tracks: 7,
    leadTrack: "Get Loud",
    youtubeVideoId: "o5VpS53Q8n8", // KISS OF LIFE Get Loud MV
    spotifyUrl: "https://open.spotify.com/album/43k0z2r9",
    appleMusicUrl: "https://music.apple.com/album/lose-yourself-ep/1770981666",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_kiof_lose",
    tracklist: [
      { num: 1, title: "Get Loud", duration: "3:01", isTitle: true, youtubeVideoId: "o5VpS53Q8n8" },
      { num: 2, title: "R.E.M", duration: "3:12", isTitle: true, youtubeVideoId: "aM6E4s7dF6U" },
      { num: 3, title: "Chemistry", duration: "2:54" },
      { num: 4, title: "Too Many Alex", duration: "3:08" },
      { num: 5, title: "Igloo", duration: "2:46", isTitle: true, youtubeVideoId: "4_R1B5TqB6w" },
      { num: 6, title: "No One But Us", duration: "3:21" },
      { num: 7, title: "Back To Me", duration: "3:10" },
    ],
  },
  {
    title: "Sticky",
    type: "1st Digital Single",
    year: "2024",
    tracks: 2,
    leadTrack: "Sticky",
    youtubeVideoId: "I_404X4yG38", // KISS OF LIFE Sticky MV
    spotifyUrl: "https://open.spotify.com/album/43k0z2r9",
    appleMusicUrl: "https://music.apple.com/album/sticky-single/1753981666",
    youtubeMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_kiof_sticky",
    tracklist: [
      { num: 1, title: "Sticky", duration: "2:48", isTitle: true, youtubeVideoId: "I_404X4yG38" },
      { num: 2, title: "Te Quiero", duration: "3:15" },
    ],
  },
  {
    title: "Midas Touch",
    type: "1st Single Album",
    year: "2024",
    tracks: 2,
    leadTrack: "Midas Touch",
    youtubeVideoId: "ss_zX3vL3iI", // KISS OF LIFE Midas Touch MV
    tracklist: [
      { num: 1, title: "Midas Touch", duration: "2:42", isTitle: true, youtubeVideoId: "ss_zX3vL3iI" },
      { num: 2, title: "Nothing", duration: "3:02" },
    ],
  },
  {
    title: "Born to be XX",
    type: "2nd Mini Album",
    year: "2023",
    tracks: 7,
    leadTrack: "Bad News",
    youtubeVideoId: "N1o8Q2l4H1k", // KISS OF LIFE Bad News MV
    tracklist: [
      { num: 1, title: "Bad News", duration: "2:42", isTitle: true, youtubeVideoId: "N1o8Q2l4H1k" },
      { num: 2, title: "Nobody Knows", duration: "3:10", isTitle: true, youtubeVideoId: "3vV8T2N1M9Q" },
      { num: 3, title: "My 808", duration: "2:58" },
      { num: 4, title: "TTG", duration: "3:04" },
      { num: 5, title: "Gentleman", duration: "3:12" },
      { num: 6, title: "Says It", duration: "3:30" },
      { num: 7, title: "Bad News (ENG Ver.)", duration: "2:42" },
    ],
  },
  {
    title: "KISS OF LIFE",
    type: "1st Mini Album",
    year: "2023",
    tracks: 6,
    leadTrack: "Shhh",
    youtubeVideoId: "Iq4p5w3yW_U", // KISS OF LIFE Shhh MV
    tracklist: [
      { num: 1, title: "Shhh (쉿)", duration: "3:02", isTitle: true, youtubeVideoId: "Iq4p5w3yW_U" },
      { num: 2, title: "Bye My Neverland (안녕,네버랜드)", duration: "3:18", isTitle: true, youtubeVideoId: "ZeerrnuLi5E" },
      { num: 3, title: "Sugarcoat (NATTY Solo)", duration: "2:59", isTitle: true, youtubeVideoId: "4TWR90KJl84" },
      { num: 4, title: "Countdown (BELLE Solo)", duration: "2:54" },
      { num: 5, title: "Kitty Cat (JULIE Solo)", duration: "3:05" },
      { num: 6, title: "Play Love Games (HANEUL Solo)", duration: "2:48" },
    ],
  },
];

// Helper to ensure any album has tracklist and lead track
export function getAlbumTracklist(artistName: string, album: DiscographyItem): DiscographyTrack[] {
  if (album.tracklist && album.tracklist.length > 0) {
    return album.tracklist;
  }
  // If not explicitly provided, generate realistic track names based on title
  const leadName = album.leadTrack || album.title;
  const count = album.tracks || 5;
  const list: DiscographyTrack[] = [
    { num: 1, title: leadName, duration: "3:18", isTitle: true },
  ];
  for (let i = 2; i <= count; i++) {
    list.push({
      num: i,
      title: `${album.title} (Track ${i})`,
      duration: `3:${(10 + i * 7) % 60 < 10 ? "0" : ""}${(10 + i * 7) % 60}`,
    });
  }
  return list;
}

export function getAlbumLeadTrack(album: DiscographyItem): string {
  if (album.leadTrack) return album.leadTrack;
  if (album.tracklist && album.tracklist.length > 0) {
    const titleTrack = album.tracklist.find((t) => t.isTitle);
    if (titleTrack) return titleTrack.title;
    return album.tracklist[0].title;
  }
  return album.title;
}

export const txtDiscography: DiscographyItem[] = [
  {
    title: "Setsuna Hanabi (刹那花火)",
    type: "Japan 5th Single",
    year: "2026",
    tracks: 2,
    leadTrack: "Setsuna Hanabi",
    youtubeVideoId: "D8VEhcPeSlc",
    spotifyUrl: "https://open.spotify.com/album/txt_setsuna_hanabi",
    tracklist: [
      { num: 1, title: "Setsuna Hanabi (刹那花火)", duration: "3:12", isTitle: true, youtubeVideoId: "D8VEhcPeSlc" },
      { num: 2, title: "Setsuna Hanabi (Instrumental)", duration: "3:12" },
    ],
  },
  {
    title: "The Name Chapter: FREEFALL",
    type: "3rd Full Album",
    year: "2023",
    tracks: 9,
    leadTrack: "Chasing That Feeling",
    youtubeVideoId: "X_U2Z6K3bXw",
    tracklist: [
      { num: 1, title: "Chasing That Feeling", duration: "3:02", isTitle: true, youtubeVideoId: "X_U2Z6K3bXw" },
      { num: 2, title: "Growing Pain", duration: "3:20" },
      { num: 3, title: "Back for More (TXT Ver.)", duration: "2:11" },
    ],
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
  TXT: txtDiscography,
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
  "⭐ My Favorites",
  "Girl Group",
  "Boy Group",
  "Solo",
  "2nd Gen",
  "3rd Gen",
  "4th Gen",
  "5th Gen",
];

export const NEWS_FILTERS = [
  "All",
  "⭐ For You",
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
