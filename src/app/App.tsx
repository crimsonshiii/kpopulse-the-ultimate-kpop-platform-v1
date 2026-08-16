import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Home,
  Compass,
  TrendingUp,
  Newspaper,
  User,
  Bell,
  Search,
  Heart,
  Star,
  Calendar,
  Play,
  ChevronRight,
  ArrowLeft,
  Music,
  Flame,
  Share2,
  Bookmark,
  Clock,
  Award,
  BadgeCheck,
  Plus,
  Zap,
  MessageCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "splash" | "login" | "main";
type Tab =
  "home" | "discover" | "comebacks" | "news" | "profile";

interface Artist {
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

interface Comeback {
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

interface NewsItem {
  id: number;
  category: string;
  headline: string;
  time: string;
  author: string;
  img: string;
  hot: boolean;
  body: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ARTISTS: Artist[] = [
  {
    id: 1,
    name: "aespa",
    label: "SM Entertainment",
    members: 4,
    debut: "2020",
    genre: "Synth-pop / Future Pop",
    color: "#8B5FFF",
    accentColor: "#C4A4FF",
    img: "1516450360452-9312f5e86fc7",
    fans: "12.4M",
    verified: true,
    nextComeback: "Oct 2024",
    bio: "aespa is a four-member girl group known for their unique concept blending the real world with a virtual dimension called ae-world. Their signature sound fuses hyper-pop with futuristic production and has redefined the visual language of K-pop.",
  },
  {
    id: 2,
    name: "NewJeans",
    label: "ADOR",
    members: 5,
    debut: "2022",
    genre: "Y2K Pop / Alternative",
    color: "#FF5FA0",
    accentColor: "#FFB3D0",
    img: "1493225457124-a3eb161ffa5f",
    fans: "9.8M",
    verified: true,
    nextComeback: "Nov 2024",
    bio: "NewJeans debuted under ADOR and quickly rose to fame with their nostalgic Y2K-inspired sound and effortlessly cool aesthetic. Their music blends Jersey club, drum and bass, and bubblegum pop.",
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
];

const COMEBACKS: Comeback[] = [
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

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Award",
    headline:
      "aespa sweeps 4 categories at Melon Music Awards 2024",
    time: "2h ago",
    author: "Jao Nicholas Benedicto",
    img: "1516450360452-9312f5e86fc7",
    hot: true,
    body: "aespa had a historic night at the Melon Music Awards, taking home Album of the Year, Artist of the Year, Best Female Group, and Best Performance. The group's 'Whiplash' era proved to be their most successful to date, with the title track dominating charts across Asia for weeks. Winter, Karina, Giselle, and NingNing were visibly emotional as they accepted their final award of the night.\n\nThe ceremony, held at the KSPO Dome in Seoul, drew thousands of fans and millions of online viewers. aespa performed their hit 'Whiplash' live on stage for the first time since their comeback, receiving a standing ovation from the crowd.",
  },
  {
    id: 2,
    category: "Release",
    headline:
      "NewJeans drops surprise collab with iconic 90s producer",
    time: "5h ago",
    author: "Music Desk",
    img: "1493225457124-a3eb161ffa5f",
    hot: true,
    body: "In a surprise announcement, NewJeans revealed a collaboration with legendary 90s producer Timbaland. The track blends classic R&B production with the group's signature Y2K aesthetic, resulting in a sound that bridges generations of pop music history. The single dropped midnight KST and has already topped iTunes in 28 countries.\n\nFans on social media have praised the unexpected pairing, with many calling it the crossover of the year. The music video, shot in Los Angeles and Seoul simultaneously, features nods to iconic 90s aesthetics.",
  },
  {
    id: 3,
    category: "Tour",
    headline:
      "SEVENTEEN announces global RIGHT HERE world tour dates",
    time: "8h ago",
    author: "Events Team",
    img: "1598387993441-a364f854c3e1",
    hot: false,
    body: "SEVENTEEN has officially announced their RIGHT HERE world tour, spanning 32 cities across North America, Europe, Asia, and Oceania. Pre-sale for Carat members begins next week, with general sales to follow two days later. The tour runs from February through July 2025.\n\nThe production features a new stage design created by a Grammy-winning set designer, incorporating elements from their latest album's concept. Setlists will vary by region to give longtime fans fresh experiences at every stop.",
  },
  {
    id: 4,
    category: "Milestone",
    headline:
      "Stray Kids MIROH crosses 400M streams on Spotify",
    time: "1d ago",
    author: "Charts Desk",
    img: "1524368535928-5b5e00ddc76b",
    hot: false,
    body: "Stray Kids' breakthrough track MIROH has officially reached 400 million streams on Spotify, making it the group's first song to achieve this milestone. The track, released in 2019, continues to introduce new fans to the group's distinct sound five years after its release.\n\nThe achievement cements MIROH's status as a generational K-pop anthem, with new listeners discovering the track daily through social media trends and playlist placements.",
  },
  {
    id: 5,
    category: "Debut",
    headline:
      "SM Entertainment's new girl group teaser sends fans into frenzy",
    time: "1d ago",
    author: "KPOPULSE Staff",
    img: "1571019613454-1cb2f99b2d8b",
    hot: false,
    body: "SM Entertainment dropped a mysterious 30-second teaser for their upcoming new girl group, sending K-pop fans into an online frenzy. The teaser features five silhouettes against a futuristic backdrop, with a sound that draws comparisons to early aespa while establishing a distinct new identity.\n\nSpeculation about member identities has dominated K-pop forums, with several trainee names circulating across fan communities. SM has confirmed only that the group will debut in the first quarter of 2025.",
  },
];

const TRACKS = [
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function unsplash(id: string, w = 400, h = 300) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

const CATEGORY_STYLES: Record<string, string> = {
  Award: "bg-yellow-500/20 text-yellow-300",
  Release: "bg-pink-500/20 text-pink-300",
  Tour: "bg-blue-500/20 text-blue-300",
  Milestone: "bg-emerald-500/20 text-emerald-300",
  Debut: "bg-violet-500/20 text-violet-300",
};

function CatBadge({ label }: { label: string }) {
  return (
    <span
      className={`inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_STYLES[label] ?? "bg-white/10 text-white/60"}`}
    >
      {label}
    </span>
  );
}

// ─── SplashScreen ─────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/12 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-accent/8 blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="flex flex-col items-center gap-6 z-10"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 40px rgba(255,28,142,0.3)",
              "0 0 80px rgba(255,28,142,0.6)",
              "0 0 40px rgba(255,28,142,0.3)",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: 0.6,
          }}
          className="w-28 h-28 rounded-[32px] bg-primary flex items-center justify-center"
        >
          <Zap className="w-14 h-14 text-white" fill="white" />
        </motion.div>
        <div className="text-center">
          <h1 className="font-display text-6xl font-black tracking-tight text-white">
            KPO<span className="text-primary">PULSE</span>
          </h1>
          <p className="text-muted-foreground text-base mt-3">
            Your K-pop universe, all in one place
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-14 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.25,
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  );
}

// ─── LoginScreen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "register">(
    "login",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-background flex overflow-hidden z-50">
      {/* Left — brand / concert visual */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <img
          src={unsplash(
            "1516450360452-9312f5e86fc7",
            1000,
            1000,
          )}
          alt="Concert stage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/30 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Zap
                className="w-5 h-5 text-white"
                fill="white"
              />
            </div>
            <span className="font-display text-xl font-black text-white">
              KPO<span className="text-primary">PULSE</span>
            </span>
          </div>
          <div>
            <h2 className="font-display text-5xl font-black text-white leading-tight">
              The ultimate
              <br />
              <span className="text-primary">
                K-pop platform
              </span>
            </h2>
            <p className="text-white/60 mt-4 text-base max-w-sm leading-relaxed">
              Track comebacks, explore artists, discover new
              music, and connect with fans worldwide.
            </p>
            <div className="flex gap-6 mt-8">
              {[
                { n: "500K+", l: "Active Fans" },
                { n: "1,200+", l: "Artists" },
                { n: "50K+", l: "Events" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl font-black text-white">
                    {s.n}
                  </p>
                  <p className="text-white/50 text-xs">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full md:w-[480px] flex-shrink-0 flex flex-col justify-center overflow-y-auto bg-background">
        <div className="px-10 py-12 w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap
                className="w-4 h-4 text-white"
                fill="white"
              />
            </div>
            <span className="font-display text-lg font-black text-foreground">
              KPO<span className="text-primary">PULSE</span>
            </span>
          </div>

          <h2 className="font-display text-3xl font-black text-foreground mb-1">
            {mode === "login"
              ? "Welcome back"
              : "Join the fandom"}
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "login"
              ? "Sign in to your PULSE account"
              : "Create your free account today"}
          </p>

          <div className="flex bg-card rounded-xl p-1 border border-border mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === "register" && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Username
                </p>
                <input
                  type="text"
                  placeholder="your_fanname"
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            )}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                Email
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fan@kpopulse.com"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                Password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              onClick={onLogin}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-primary/90 active:scale-[0.99]"
              style={{
                boxShadow: "0 8px 32px rgba(255,28,142,0.35)",
              }}
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                or continue with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex gap-3">
              {["Google", "Apple"].map((p) => (
                <button
                  key={p}
                  onClick={onLogin}
                  className="flex-1 py-3 border border-border rounded-xl text-sm text-foreground font-semibold hover:bg-card/60 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home" as Tab, Icon: Home, label: "Home" },
  { id: "discover" as Tab, Icon: Compass, label: "Discover" },
  {
    id: "comebacks" as Tab,
    Icon: TrendingUp,
    label: "Comebacks",
  },
  { id: "news" as Tab, Icon: Newspaper, label: "News" },
  { id: "profile" as Tab, Icon: User, label: "Profile" },
];

function Sidebar({
  activeTab,
  onTab,
  open,
  onClose,
}: {
  activeTab: Tab;
  onTab: (t: Tab) => void;
  open: boolean;
  onClose: () => void;
}) {
  const upcoming = COMEBACKS.filter(
    (c) => c.daysLeft > 0,
  ).slice(0, 2);

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col w-64 bg-card border-r border-border flex-shrink-0 h-screen transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0"
              style={{
                boxShadow: "0 4px 16px rgba(255,28,142,0.4)",
              }}
            >
              <Zap
                className="w-5 h-5 text-white"
                fill="white"
              />
            </div>
            <span className="font-display text-lg font-black text-foreground">
              KPO<span className="text-primary">PULSE</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ id, Icon, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  onTab(id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon
                  className="w-4.5 h-4.5 flex-shrink-0"
                  style={{
                    color: active ? "#FF1C8E" : undefined,
                  }}
                  strokeWidth={active ? 2.5 : 1.75}
                />
                {label}
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}

          {/* Mini comebacks */}
          <div className="pt-4 pb-2 px-3.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Upcoming Comebacks
            </p>
            <div className="space-y-2">
              {upcoming.map((cb) => (
                <div
                  key={cb.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-secondary/50"
                >
                  <div
                    className="w-1.5 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cb.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {cb.artist}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {cb.title}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold flex-shrink-0"
                    style={{ color: cb.color }}
                  >
                    {cb.daysLeft}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
            <img
              src={unsplash(
                "1535713875002-d1ffd9b4a8bc",
                80,
                80,
              )}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary ring-offset-1 ring-offset-card flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                kpop_luna
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Super Fan
              </p>
            </div>
            <Settings className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

function PageHeader({
  title,
  showBack,
  onBack,
  onMenuOpen,
}: {
  title: string;
  showBack: boolean;
  onBack: () => void;
  onMenuOpen: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="flex-shrink-0 flex items-center h-14 px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuOpen}
          className="lg:hidden text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm hidden sm:block">
              Back
            </span>
          </button>
        )}
        <h1 className="font-display text-base font-black text-foreground truncate">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {searchOpen ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search artists, news…"
                className="bg-card border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-56 transition-all"
              />
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        )}
        <button className="relative w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors">
          <Bell className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
      </div>
    </header>
  );
}

// ─── HomeTab ─────────────────────────────────────────────────────────────────

function HomeTab({
  onArtist,
  onNews,
}: {
  onArtist: (a: Artist) => void;
  onNews: () => void;
}) {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const featured =
    COMEBACKS.find((c) => c.daysLeft > 0 && ARTISTS.some((a) => a.name === c.artist)) ??
    COMEBACKS.find((c) => c.daysLeft > 0) ??
    COMEBACKS[0];
  const featuredArtist =
    ARTISTS.find((a) => a.name === featured.artist) ??
    ({ img: featured.img } as Artist);

  const toggleLike = (rank: number) =>
    setLiked((prev) => {
      const s = new Set(prev);
      s.has(rank) ? s.delete(rank) : s.add(rank);
      return s;
    });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Featured comeback banner */}
      <div className="relative h-52 md:h-64 rounded-2xl overflow-hidden">
        <img
          src={unsplash(featuredArtist.img, 1200, 500)}
          alt={featured.artist}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <span className="text-white/60 text-xs font-mono">
              {featured.date}
            </span>
          </div>
          <div className="max-w-lg">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">
              {featured.type} · {featured.artist}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
              {featured.title}
            </h2>
            <p className="text-white/60 text-sm mt-2">
              {featured.tracks} tracks · {featured.daysLeft}{" "}
              days away
            </p>
            <div className="flex gap-3 mt-5">
              <button
                className="flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary/90 transition-colors"
                style={{
                  boxShadow: "0 4px 20px rgba(255,28,142,0.4)",
                }}
              >
                <Bookmark className="w-4 h-4" /> Pre-save Now
              </button>
              <button className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4" /> Watch Teaser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-col content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Artists + Trending */}
        <div className="xl:col-span-2 space-y-6">
          {/* My Artists */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-black text-foreground uppercase tracking-wider">
                My Artists
              </h3>
              <button className="text-xs text-primary font-semibold hover:underline">
                Manage
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {ARTISTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onArtist(a)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full aspect-square rounded-2xl overflow-hidden border-2 transition-transform group-hover:scale-105 group-active:scale-95"
                    style={{
                      borderColor: a.color,
                      boxShadow: `0 0 0 2px ${a.color}20`,
                    }}
                  >
                    <img
                      src={unsplash(a.img, 120, 120)}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                    {a.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending tracks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />{" "}
                Trending Now
              </h3>
              <button className="text-xs text-primary font-semibold hover:underline">
                Full Chart
              </button>
            </div>
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
              {TRACKS.map((track) => (
                <div
                  key={track.rank}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/30 transition-colors"
                >
                  <span className="w-5 text-xs font-mono text-muted-foreground text-right flex-shrink-0">
                    {track.rank}
                  </span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: track.color + "25",
                    }}
                  >
                    <Music
                      className="w-4 h-4"
                      style={{ color: track.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {track.artist}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono hidden sm:block">
                    {track.streams} streams
                  </p>
                  <p
                    className={`w-10 text-xs font-mono font-bold text-right flex-shrink-0 ${
                      track.rising
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {track.delta}
                  </p>
                  <button
                    onClick={() => toggleLike(track.rank)}
                    className="flex-shrink-0"
                  >
                    <Heart
                      className="w-4 h-4 transition-all"
                      fill={
                        liked.has(track.rank)
                          ? "#FF1C8E"
                          : "none"
                      }
                      stroke={
                        liked.has(track.rank)
                          ? "#FF1C8E"
                          : "currentColor"
                      }
                      strokeWidth={
                        liked.has(track.rank) ? 0 : 1.5
                      }
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Latest news */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-black text-foreground uppercase tracking-wider">
              Latest News
            </h3>
            <button className="text-xs text-primary font-semibold hover:underline">
              See all
            </button>
          </div>
          {NEWS.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => onNews()}
              className="flex gap-3 bg-card rounded-xl border border-border p-3.5 text-left w-full hover:border-primary/30 transition-colors group"
            >
              <img
                src={unsplash(item.img, 120, 120)}
                alt=""
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-secondary"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <CatBadge label={item.category} />
                  {item.hot && (
                    <Flame className="w-3 h-3 text-orange-400" />
                  )}
                </div>
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary/80 transition-colors">
                  {item.headline}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {item.time}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DiscoverTab ─────────────────────────────────────────────────────────────

function DiscoverTab({
  onArtist,
}: {
  onArtist: (a: Artist) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const FILTERS = [
    "All",
    "Girl Group",
    "Boy Group",
    "Solo",
    "Rookie",
  ];

  const results = ARTISTS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.genre.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, genres, labels…"
            className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                filter === f
                  ? "bg-primary border-primary text-white"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-semibold">
            {results.length}
          </span>{" "}
          artists
        </p>
      </div>

      {/* Artist grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.map((artist) => (
          <motion.button
            key={artist.id}
            onClick={() => onArtist(artist)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="bg-card rounded-2xl border border-border overflow-hidden text-left transition-shadow hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={unsplash(artist.img, 300, 250)}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 30%, ${artist.color}DD)`,
                }}
              />
              {artist.verified && (
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="absolute bottom-3 left-3">
                <h4 className="font-display font-black text-base text-white leading-tight">
                  {artist.name}
                </h4>
                <p className="text-white/70 text-[11px]">
                  {artist.label}
                </p>
              </div>
            </div>
            <div className="p-3.5">
              <p className="text-[11px] text-muted-foreground truncate">
                {artist.genre}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {artist.fans} fans
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: artist.color + "25",
                    color: artist.accentColor,
                  }}
                >
                  {artist.members}M
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── ArtistProfile ───────────────────────────────────────────────────────────

function ArtistProfile({ artist }: { artist: Artist }) {
  const [tab, setTab] = useState<
    "overview" | "disco" | "schedule"
  >("overview");
  const [following, setFollowing] = useState(false);

  const DISCOGRAPHY = [
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
  const SCHEDULE = [
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

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Wide hero */}
      <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
        <img
          src={unsplash(artist.img, 1200, 400)}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${artist.color}CC 0%, transparent 50%), linear-gradient(to top, ${artist.color}99 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-8">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl md:text-5xl font-black text-white">
              {artist.name}
            </h1>
            {artist.verified && (
              <BadgeCheck className="w-7 h-7 text-primary" />
            )}
          </div>
          <p className="text-white/60 mt-1">{artist.label}</p>
        </div>
        <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors">
          <Share2 className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              At a Glance
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Fans", value: artist.fans },
                {
                  label: "Members",
                  value: String(artist.members),
                },
                { label: "Debut Year", value: artist.debut },
                {
                  label: "Next CB",
                  value: artist.nextComeback,
                },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-lg font-black text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setFollowing(!following)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                following
                  ? "border border-primary/50 text-primary bg-primary/10"
                  : "bg-primary text-white"
              }`}
              style={
                following
                  ? {}
                  : {
                      boxShadow:
                        "0 4px 20px rgba(255,28,142,0.3)",
                    }
              }
            >
              {following ? "Following ✓" : "Follow"}
            </button>
            <button className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold text-foreground flex items-center justify-center gap-1.5 hover:border-primary/30 transition-colors">
              <Bell className="w-4 h-4" /> Notify
            </button>
          </div>

          {/* Genre */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Genre
            </p>
            <div className="flex flex-wrap gap-2">
              {artist.genre.split(" / ").map((g) => (
                <span
                  key={g}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground/70"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Comeback alert */}
          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: artist.color + "40",
              backgroundColor: artist.color + "0F",
            }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: artist.accentColor }}
            >
              Next Comeback
            </p>
            <p className="text-sm font-semibold text-foreground">
              Expected {artist.nextComeback}
            </p>
            <button
              className="mt-3 w-full text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: artist.color + "20",
                color: artist.accentColor,
              }}
            >
              <Bell className="w-3 h-3" /> Set Comeback Alert
            </button>
          </div>
        </div>

        {/* Right: tabs */}
        <div className="lg:col-span-2">
          {/* Tab header */}
          <div className="flex border-b border-border mb-5">
            {(["overview", "disco", "schedule"] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-3 text-sm font-semibold capitalize relative transition-colors ${
                    tab === t
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "disco" ? "Discography" : t}
                  {tab === t && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ),
            )}
          </div>

          {/* Tab content */}
          {tab === "overview" && (
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  About
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {artist.bio}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Label", value: artist.label },
                  {
                    label: "Active Since",
                    value: artist.debut,
                  },
                  {
                    label: "Group Size",
                    value: `${artist.members} members`,
                  },
                  { label: "Global Fans", value: artist.fans },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "disco" && (
            <div className="space-y-3">
              {DISCOGRAPHY.map((album) => (
                <div
                  key={album.title}
                  className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: artist.color + "25",
                    }}
                  >
                    <Music
                      className="w-5 h-5"
                      style={{ color: artist.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {album.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {album.type} · {album.year} ·{" "}
                      {album.tracks} tracks
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10">
                    <Play className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "schedule" && (
            <div className="space-y-3">
              {SCHEDULE.map((ev) => (
                <div
                  key={ev.event}
                  className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: artist.color + "20",
                    }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: artist.accentColor }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {ev.event}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {ev.date} · {ev.loc}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: artist.color + "20",
                      color: artist.accentColor,
                    }}
                  >
                    {ev.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ComebacksTab ─────────────────────────────────────────────────────────────

function ComebacksTab() {
  const [filter, setFilter] = useState<"upcoming" | "recent">(
    "upcoming",
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-card rounded-xl p-1 border border-border">
          {(["upcoming", "recent"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground hidden sm:block">
          {
            COMEBACKS.filter((c) =>
              filter === "upcoming"
                ? c.daysLeft > 0
                : c.daysLeft <= 0,
            ).length
          }{" "}
          comebacks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {COMEBACKS.filter((c) =>
          filter === "upcoming"
            ? c.daysLeft > 0
            : c.daysLeft <= 0,
        ).map((cb) => (
          <div
            key={cb.id}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={unsplash(cb.img, 600, 200)}
                alt={cb.artist}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${cb.color}CC, transparent 55%)`,
                }}
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-black/50 text-white px-2 py-0.5 rounded-full">
                    {cb.type}
                  </span>
                  {cb.teaser && (
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-primary/80 text-white px-2 py-0.5 rounded-full">
                      Teaser Out
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-white">
                    {cb.title}
                  </h3>
                  <p className="text-white/70 text-xs">
                    {cb.artist}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">
                    {cb.date}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: cb.color + "20" }}
                >
                  <Clock
                    className="w-3 h-3"
                    style={{ color: cb.color }}
                  />
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: cb.color }}
                  >
                    {cb.daysLeft > 0
                      ? `${cb.daysLeft}d left`
                      : "Released"}
                  </span>
                </div>
              </div>

              <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width:
                      cb.daysLeft <= 0
                        ? "100%"
                        : `${Math.max(5, 100 - (cb.daysLeft / 50) * 100)}%`,
                    backgroundColor: cb.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {cb.tracks} tracks
                </span>
                <div className="flex gap-2">
                  <button className="text-xs border border-border text-foreground px-3 py-1.5 rounded-lg font-semibold hover:bg-secondary transition-colors">
                    Details
                  </button>
                  {cb.preorder ? (
                    <button
                      className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: cb.color }}
                    >
                      Pre-order
                    </button>
                  ) : (
                    <button className="text-xs text-primary border border-primary/30 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-primary/10 transition-colors">
                      <Bell className="w-3 h-3" /> Notify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NewsTab — master-detail ──────────────────────────────────────────────────

function NewsTab() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<NewsItem | null>(
    NEWS[0],
  );
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const FILTERS = [
    "All",
    "Award",
    "Release",
    "Tour",
    "Debut",
    "Milestone",
  ];
  const items =
    activeFilter === "All"
      ? NEWS
      : NEWS.filter((n) => n.category === activeFilter);

  const handleSelect = (item: NewsItem) => {
    setSelected(item);
    setLiked(false);
    setSaved(false);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Article list */}
      <div
        className={`flex flex-col border-r border-border flex-shrink-0 w-full lg:w-80 xl:w-96 ${
          selected ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Filters */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-border">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeFilter === f
                    ? "bg-primary border-primary text-white"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`w-full flex gap-3 p-4 text-left border-b border-border transition-colors ${
                selected?.id === item.id
                  ? "bg-primary/8 border-l-2 border-l-primary"
                  : "hover:bg-secondary/40"
              }`}
            >
              <img
                src={unsplash(item.img, 120, 120)}
                alt=""
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-secondary"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <CatBadge label={item.category} />
                  {item.hot && (
                    <Flame className="w-3 h-3 text-orange-400" />
                  )}
                </div>
                <p
                  className={`text-xs font-medium line-clamp-2 leading-snug ${
                    selected?.id === item.id
                      ? "text-primary/80"
                      : "text-foreground"
                  }`}
                >
                  {item.headline}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {item.time} · {item.author}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Article detail */}
      {selected ? (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Back on mobile */}
          <div className="lg:hidden px-4 pt-4 pb-2">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Articles
            </button>
          </div>

          <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
            <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
              <img
                src={unsplash(selected.img, 900, 400)}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <CatBadge label={selected.category} />
              {selected.hot && (
                <Flame className="w-3.5 h-3.5 text-orange-400" />
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {selected.time}
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-2">
              {selected.headline}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              By {selected.author}
            </p>
            <div className="h-px bg-border mb-6" />

            <div className="space-y-4">
              {selected.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
              <p className="text-sm text-foreground leading-relaxed">
                Stay tuned to KPOPULSE for real-time updates,
                exclusive interviews, and comprehensive coverage
                of the K-pop world. Join our growing community
                of fans to never miss a moment.
              </p>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  liked
                    ? "border-primary/40 text-primary bg-primary/10"
                    : "border-border text-foreground hover:border-primary/30"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={liked ? "currentColor" : "none"}
                />{" "}
                Like
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:border-primary/30 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex-1 flex items-center justify-center gap-2 py--3 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  saved
                    ? "border-primary/40 text-primary bg-primary/10"
                    : "border-border text-foreground hover:border-primary/30"
                }`}
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={saved ? "currentColor" : "none"}
                />{" "}
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center flex-col gap-4 text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center">
            <Newspaper className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Select an article
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Choose a story from the list to read it here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ProfileTab ───────────────────────────────────────────────────────────────

function ProfileTab({ onSignOut }: { onSignOut: () => void }) {
  const STATS = [
    { label: "Following", value: "14" },
    { label: "Fan Posts", value: "287" },
    { label: "Events", value: "3" },
    { label: "Since", value: "2021" },
  ];
  const NOTIFS = [
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
  const LINKS = [
    {
      Icon: Award,
      label: "My Collection",
      badge: null as string | null,
    },
    { Icon: Calendar, label: "My Schedule", badge: "3" },
    {
      Icon: MessageCircle,
      label: "Fan Community",
      badge: null as string | null,
    },
    { Icon: Bookmark, label: "Saved Articles", badge: "12" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div
              className="h-24 relative"
              style={{
                background:
                  "linear-gradient(135deg, #FF1C8E30, #8B5FFF30)",
              }}
            >
              <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <div className="px-5 pb-5 -mt-10 relative">
              <div className="flex items-end justify-between mb-4">
                <img
                  src={unsplash(
                    "1535713875002-d1ffd9b4a8bc",
                    100,
                    100,
                  )}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-card border-2 border-primary"
                />
                <button className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:text-foreground hover:border-primary/40 transition-colors">
                  <Settings className="w-3 h-3" /> Edit
                </button>
              </div>
              <h3 className="font-display font-black text-xl text-foreground">
                kpop_luna
              </h3>
              <p className="text-xs text-muted-foreground">
                luna@kpopulse.com
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Star
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                />
                <span className="text-xs text-yellow-400 font-semibold">
                  Super Fan
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-sm font-black text-foreground">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Favorites */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                My Favorites
              </p>
              <button className="text-xs text-primary font-semibold hover:underline">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {ARTISTS.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-full aspect-square rounded-xl overflow-hidden border-2"
                    style={{ borderColor: a.color }}
                  >
                    <img
                      src={unsplash(a.img, 80, 80)}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {LINKS.map(({ Icon, label, badge }, i) => (
              <button
                key={label}
                className={`flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-secondary/50 transition-colors ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {label}
                </span>
                {badge && (
                  <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Notifications */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">
                Notification Preferences
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose what alerts you want to receive
              </p>
            </div>
            {NOTIFS.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${
                    item.on
                      ? "bg-primary"
                      : "bg-secondary border border-border"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      item.on
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Account settings */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">
                Account Settings
              </p>
            </div>
            {[
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
            ].map((item, i) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-5 py-4 w-full text-left hover:bg-secondary/50 transition-colors ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <button
            onClick={onSignOut}
            className="w-full py-3.5 rounded-xl border border-border text-sm text-muted-foreground font-semibold hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────

function BottomNav({
  activeTab,
  onTab,
}: {
  activeTab: Tab;
  onTab: (t: Tab) => void;
}) {
  return (
    <div className="bg-card/95 backdrop-blur-xl border-t border-border">
      <div className="flex px-1 pb-1">
        {NAV_ITEMS.map(({ id, Icon, label }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="flex-1 flex flex-col items-center py-2.5 gap-0.5"
            >
              <Icon
                className="w-5 h-5 transition-colors"
                style={{
                  color: active ? "#FF1C8E" : undefined,
                }}
                strokeWidth={active ? 2.5 : 1.75}
              />
              <span
                className="text-[10px] font-semibold transition-colors"
                style={{
                  color: active ? "#FF1C8E" : undefined,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedArtist, setSelectedArtist] =
    useState<Artist | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const TAB_TITLES: Record<Tab, string> = {
    home: "Home",
    discover: "Discover Artists",
    comebacks: "Comeback Tracker",
    news: "K-pop News",
    profile: "My Profile",
  };

  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedArtist(null);
  };

  if (screen === "splash")
    return <SplashScreen onDone={() => setScreen("login")} />;
  if (screen === "login")
    return <LoginScreen onLogin={() => setScreen("main")} />;

  const pageTitle = selectedArtist
    ? selectedArtist.name
    : TAB_TITLES[activeTab];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTab={handleTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PageHeader
          title={pageTitle}
          showBack={!!selectedArtist}
          onBack={() => setSelectedArtist(null)}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main
          className={`flex-1 ${activeTab === "news" && !selectedArtist ? "flex flex-col overflow-hidden" : "overflow-y-auto scrollbar-hide"}`}
        >
          {selectedArtist ? (
            <div className="overflow-y-auto scrollbar-hide h-full">
              <ArtistProfile artist={selectedArtist} />
            </div>
          ) : (
            <>
              {activeTab === "home" && (
                <HomeTab
                  onArtist={setSelectedArtist}
                  onNews={() => {
                    setActiveTab("news");
                  }}
                />
              )}
              {activeTab === "discover" && (
                <DiscoverTab onArtist={setSelectedArtist} />
              )}
              {activeTab === "comebacks" && <ComebacksTab />}
              {activeTab === "news" && <NewsTab />}
              {activeTab === "profile" && <ProfileTab onSignOut={() => setScreen("login")} />}
            </>
          )}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-20">
        <BottomNav activeTab={activeTab} onTab={handleTab} />
      </div>
    </div>
  );
}