import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  ListMusic,
  ExternalLink,
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
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  type Screen,
  type Tab,
  type Artist,
  type Comeback,
  type NewsItem,
  type TrackItem,
  type DiscographyItem,
  type DiscographyTrack,
  type ScheduleItem,
  type UserPersonalization,
  type UserAccount,
  ARTISTS,
  COMEBACKS,
  NEWS,
  TRACKS,
  aespaDiscography,
  ARTIST_DISCOGRAPHIES,
  DEFAULT_SCHEDULE,
  PROFILE_STATS,
  PROFILE_NOTIFS,
  ACCOUNT_SETTINGS,
  CATEGORY_STYLES,
  DISCOVER_FILTERS,
  NEWS_FILTERS,
  TAB_TITLES,
  DEFAULT_PERSONALIZATION,
  DEFAULT_ACCOUNTS,
  getAlbumTracklist,
  getAlbumLeadTrack,
  calculateComebackDaysLeft,
  isComebackFinished,
} from "./data";
import { PersonalizationScreen } from "./components/PersonalizationScreen";
import { SafeImage } from "./components/SafeImage";
import {
  AudioPlaybackDeck,
  parseDurationToSeconds,
} from "./components/AudioPlaybackDeck";
import { TracklistModal } from "./components/TracklistModal";
import { AudioProvider, useAudioPlayer } from "./context/AudioContext";
import { PersistentAudioBar } from "./components/PersistentAudioBar";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function unsplash(id: string, w = 400, h = 300) {
  if (!id) return "";
  if (id.startsWith("http://") || id.startsWith("https://") || id.startsWith("data:")) {
    return id;
  }
  let path = id;
  if (path.startsWith("sset/")) {
    path = "asset/" + path.slice(5);
  }
  if (
    path.startsWith("/") ||
    path.startsWith("asset/") ||
    path.includes(".webp") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".svg") ||
    path.includes(".jpeg")
  ) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

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

function LoginScreen({
  accounts,
  onLogin,
  onRegister,
}: {
  accounts: UserAccount[];
  onLogin: (account: UserAccount) => void;
  onRegister: (account: UserAccount) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register fields
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Feedback states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const resetErrors = () => {
    setErrorMessage(null);
    setErrorField(null);
    setSuccessMessage(null);
  };

  const handleModeChange = (newMode: "login" | "register") => {
    setMode(newMode);
    resetErrors();
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    resetErrors();

    const cleanIdentifier = loginIdentifier.trim();
    if (!cleanIdentifier) {
      setErrorMessage("Please enter your registered username or email.");
      setErrorField("identifier");
      return;
    }

    if (!loginPassword) {
      setErrorMessage("Please enter your account password.");
      setErrorField("password");
      return;
    }

    // Lookup user in registered accounts database
    const query = cleanIdentifier.toLowerCase();
    const foundUser = accounts.find(
      (a) =>
        a.username.toLowerCase() === query || a.email.toLowerCase() === query
    );

    if (!foundUser) {
      setErrorMessage(
        `Account not found for "${cleanIdentifier}". Please check your spelling or register a new account.`
      );
      setErrorField("identifier");
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    // Validate password
    if (foundUser.password && foundUser.password !== loginPassword) {
      setErrorMessage(
        `Incorrect password for @${foundUser.username}. Please verify your credentials and try again.`
      );
      setErrorField("password");
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    // Success
    setSuccessMessage(`Welcome back, @${foundUser.username}!`);
    setTimeout(() => {
      onLogin(foundUser);
    }, 250);
  };

  const handleRegisterSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    resetErrors();

    const cleanUsername = regUsername.trim();
    const cleanEmail = regEmail.trim();

    // Username validation
    if (!cleanUsername) {
      setErrorMessage("Please provide a username.");
      setErrorField("regUsername");
      return;
    }

    if (cleanUsername.length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      setErrorField("regUsername");
      return;
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
      setErrorMessage(
        "Username can only contain letters, numbers, underscores, and hyphens."
      );
      setErrorField("regUsername");
      return;
    }

    // Check if username is already taken
    const usernameTaken = accounts.some(
      (a) => a.username.toLowerCase() === cleanUsername.toLowerCase()
    );
    if (usernameTaken) {
      setErrorMessage(
        `The username "@${cleanUsername}" is already taken. Please choose another username.`
      );
      setErrorField("regUsername");
      return;
    }

    // Email validation
    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      setErrorField("regEmail");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address format (e.g. fan@kpopulse.com).");
      setErrorField("regEmail");
      return;
    }

    // Check if email already registered
    const emailTaken = accounts.some(
      (a) => a.email.toLowerCase() === cleanEmail.toLowerCase()
    );
    if (emailTaken) {
      setErrorMessage(
        `An account with email "${cleanEmail}" is already registered. Please sign in instead.`
      );
      setErrorField("regEmail");
      return;
    }

    // Password validation
    if (!regPassword) {
      setErrorMessage("Please create a password for your account.");
      setErrorField("regPassword");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setErrorField("regPassword");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and re-type.");
      setErrorField("regConfirmPassword");
      return;
    }

    // Create new account
    const newAccount: UserAccount = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      username: cleanUsername,
      email: cleanEmail,
      password: regPassword,
      personalization: {
        favoriteGroups: [],
        favoriteSoloists: [],
        favoriteGenres: [],
        favoriteGenerations: [],
        username: cleanUsername,
        email: cleanEmail,
      },
      createdAt: new Date().toISOString(),
    };

    setSuccessMessage(`Account created successfully! Let's personalize your PULSE...`);
    setTimeout(() => {
      onRegister(newAccount);
    }, 300);
  };

  const handleOAuth = (provider: string) => {
    resetErrors();
    const providerLower = provider.toLowerCase();
    const defaultEmail = `${providerLower}.fan@kpopulse.com`;
    const defaultUser = `${providerLower}_stan`;

    // Check if already registered
    const existing = accounts.find(
      (a) =>
        a.email.toLowerCase() === defaultEmail ||
        a.username.toLowerCase() === defaultUser
    );

    if (existing) {
      onLogin(existing);
    } else {
      const socialAccount: UserAccount = {
        id: `user_${providerLower}_${Date.now()}`,
        username: defaultUser,
        email: defaultEmail,
        password: "social_login_auth",
        personalization: {
          ...DEFAULT_PERSONALIZATION,
          username: defaultUser,
          email: defaultEmail,
        },
        createdAt: new Date().toISOString(),
      };
      onRegister(socialAccount);
    }
  };

  const handleQuickFillDemo = (username: string, pass: string) => {
    setMode("login");
    setLoginIdentifier(username);
    setLoginPassword(pass);
    resetErrors();
  };

  return (
    <div className="fixed inset-0 bg-background flex overflow-hidden z-50">
      {/* Left — brand / concert visual */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <img
          src={unsplash("1516450360452-9312f5e86fc7", 1000, 1000)}
          alt="Concert stage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/30 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="font-display text-xl font-black text-white tracking-wider">
              KPO<span className="text-primary">PULSE</span>
            </span>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-semibold mb-4">
              <KeyRound className="w-3.5 h-3.5 text-primary" />
              Secure Account Authentication & Bias Sync
            </div>
            <h2 className="font-display text-5xl font-black text-white leading-tight">
              The ultimate
              <br />
              <span className="text-primary">K-pop platform</span>
            </h2>
            <p className="text-white/70 mt-4 text-base max-w-sm leading-relaxed">
              Track comebacks, explore artists, personalize your bias radar, and
              sync preferences across your registered account.
            </p>
            <div className="flex gap-6 mt-8">
              {[
                { n: `${accounts.length}+`, l: "Registered Users" },
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
        <div className="px-8 sm:px-10 py-10 w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-display text-lg font-black text-foreground">
              KPO<span className="text-primary">PULSE</span>
            </span>
          </div>

          <h2 className="font-display text-3xl font-black text-foreground mb-1">
            {mode === "login" ? "Welcome back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === "login"
              ? "Sign in with your registered account credentials"
              : "Register to personalize your biases & track releases"}
          </p>

          {/* Mode Switcher */}
          <div className="flex bg-card rounded-xl p-1 border border-border mb-5">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Error Banner with strict restriction alerts */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <div className="flex-1 text-xs font-medium leading-relaxed">
                <span className="font-bold text-red-300 block mb-0.5">
                  Access Restriction
                </span>
                {errorMessage}
              </div>
            </motion.div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              <span className="text-xs font-medium">{successMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      if (errorField === "identifier") resetErrors();
                    }}
                    placeholder="kpop_luna or luna@kpopulse.com"
                    autoComplete="username"
                    className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errorField === "identifier"
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                        : "border-border focus:border-primary/50"
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Password
                  </label>
                  <span className="text-[11px] text-muted-foreground/80">
                    Case-sensitive
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (errorField === "password") resetErrors();
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`w-full bg-card border rounded-xl pl-4 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errorField === "password"
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                        : "border-border focus:border-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {failedAttempts >= 2 && (
                <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2 text-yellow-400 text-xs">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    Having trouble? Use one of the registered demo accounts below.
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-primary/90 active:scale-[0.99] mt-2 cursor-pointer shadow-lg shadow-primary/30"
              >
                Sign In to K-Pop Pulse
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Choose Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => {
                      setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, "_"));
                      if (errorField === "regUsername") resetErrors();
                    }}
                    placeholder="your_stan_name"
                    className={`w-full bg-card border rounded-xl pl-8 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errorField === "regUsername"
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                        : "border-border focus:border-primary/50"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    if (errorField === "regEmail") resetErrors();
                  }}
                  placeholder="fan@kpopulse.com"
                  className={`w-full bg-card border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                    errorField === "regEmail"
                      ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                      : "border-border focus:border-primary/50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Create Password (min. 6 chars)
                </label>
                <div className="relative">
                  <input
                    type={showRegPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => {
                      setRegPassword(e.target.value);
                      if (errorField === "regPassword") resetErrors();
                    }}
                    placeholder="••••••••"
                    className={`w-full bg-card border rounded-xl pl-4 pr-11 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errorField === "regPassword"
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                        : "border-border focus:border-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showRegPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showRegConfirmPassword ? "text" : "password"}
                    value={regConfirmPassword}
                    onChange={(e) => {
                      setRegConfirmPassword(e.target.value);
                      if (errorField === "regConfirmPassword") resetErrors();
                    }}
                    placeholder="••••••••"
                    className={`w-full bg-card border rounded-xl pl-4 pr-11 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      errorField === "regConfirmPassword"
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-500/5"
                        : "border-border focus:border-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegConfirmPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showRegConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-primary/90 active:scale-[0.99] mt-2 cursor-pointer shadow-lg shadow-primary/30"
              >
                Register & Setup Bias Radar
              </button>
            </form>
          )}

          {/* Quick Demo Accounts for fast testing */}
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
              Quick Test Registered Accounts
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {accounts.slice(0, 2).map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() =>
                    handleQuickFillDemo(acc.username, acc.password || "password123")
                  }
                  className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-[11px] font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-muted-foreground" />
                  <span>@{acc.username}</span>
                  <span className="text-[10px] text-muted-foreground">({acc.password})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-3">
            {["Google", "Apple"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleOAuth(p)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm text-foreground font-semibold hover:bg-card/60 transition-colors"
              >
                {p}
              </button>
            ))}
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
  personalization,
}: {
  activeTab: Tab;
  onTab: (t: Tab) => void;
  open: boolean;
  onClose: () => void;
  personalization: UserPersonalization;
}) {
  const upcoming = COMEBACKS.filter(
    (c) => !isComebackFinished(c),
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
          <div
            onClick={() => {
              onTab("profile");
              onClose();
            }}
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary ring-offset-1 ring-offset-card flex-shrink-0">
              <SafeImage
                src="1535713875002-d1ffd9b4a8bc"
                alt="Profile"
                fallbackColor="#FF1C8E"
                fallbackType="solo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {personalization.username || "kpop_luna"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Super Fan · {personalization.favoriteGroups.length + personalization.favoriteSoloists.length} Following
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
  onManageArtists,
  personalization,
}: {
  onArtist: (a: Artist) => void;
  onNews: () => void;
  onManageArtists: () => void;
  personalization: UserPersonalization;
}) {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  // Filter user's chosen artists from personalization
  const followedArtists = ARTISTS.filter(
    (a) =>
      personalization.favoriteGroups.includes(a.name) ||
      personalization.favoriteSoloists.includes(a.name)
  );

  const displayArtists = followedArtists.length > 0 ? followedArtists : ARTISTS.slice(0, 6);

  // Prioritize favorite artist comebacks
  const favoriteComeback = COMEBACKS.find(
    (c) =>
      !isComebackFinished(c) &&
      (personalization.favoriteGroups.includes(c.artist) ||
        personalization.favoriteSoloists.includes(c.artist))
  );

  const featured =
    favoriteComeback ??
    COMEBACKS.find((c) => !isComebackFinished(c) && ARTISTS.some((a) => a.name === c.artist)) ??
    COMEBACKS.find((c) => !isComebackFinished(c)) ??
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
      {/* Featured artist comeback banner */}
      <div className="relative h-52 md:h-64 rounded-2xl overflow-hidden">
        <SafeImage
          src={featuredArtist.img}
          alt={featured.artist}
          fallbackColor={featured.color || "#FF1C8E"}
          fallbackText={featured.artist}
          className="w-full h-full object-cover"
          width={1200}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
              {favoriteComeback ? "⭐ Your Bias Comeback" : "Coming Soon"}
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
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-black text-foreground uppercase tracking-wider">
                  My Artists
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {followedArtists.length}
                </span>
              </div>
              <button
                onClick={onManageArtists}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                Manage
              </button>
            </div>

            {followedArtists.length === 0 ? (
              <div className="bg-card rounded-2xl border border-dashed border-border p-6 text-center">
                <p className="text-sm font-semibold text-foreground mb-1">
                  No favorite artists selected yet
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Curate your K-pop pulse to track comebacks and alerts from your bias groups and soloists.
                </p>
                <button
                  onClick={onManageArtists}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  Personalize My Pulse ⚡
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {displayArtists.map((a) => (
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
                      <SafeImage
                        src={a.img}
                        alt={a.name}
                        fallbackColor={a.color}
                        fallbackText={a.name}
                        fallbackType={a.type}
                        className="w-full h-full object-cover"
                        width={120, 120}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium group-hover:text-foreground transition-colors truncate w-full text-center">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
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
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                <SafeImage
                  src={item.img}
                  alt={item.headline}
                  fallbackColor="#00B4D8"
                  fallbackType="news"
                  className="w-full h-full object-cover"
                  width={120}
                  height={120}
                />
              </div>
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
  personalization,
  onToggleFollow,
}: {
  onArtist: (a: Artist) => void;
  personalization: UserPersonalization;
  onToggleFollow: (artistName: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const FILTERS = DISCOVER_FILTERS;

  const results = ARTISTS.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.genre.toLowerCase().includes(query.toLowerCase()) ||
      a.label.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "All") return true;
    if (filter === "⭐ My Favorites") {
      return (
        personalization.favoriteGroups.includes(a.name) ||
        personalization.favoriteSoloists.includes(a.name)
      );
    }
    if (filter === "Solo") return a.type === "solo";
    if (filter === "Girl Group") {
      const girlGroups = ["aespa", "BLACKPINK", "TWICE", "IVE", "LE SSERAFIM", "ITZY", "Red Velvet", "NMIXX", "STAYC", "BABYMONSTER", "ILLIT", "fromis_9", "KISS OF LIFE", "tripleS", "Hearts2Hearts"];
      return a.type === "group" && girlGroups.includes(a.name);
    }
    if (filter === "Boy Group") {
      const boyGroups = ["BTS", "Stray Kids", "TXT", "ENHYPEN", "SEVENTEEN", "TREASURE", "ATEEZ", "NCT 127", "ZEROBASEONE", "RIIZE", "BOYNEXTDOOR", "TWS", "SHINee", "EXO", "BIGBANG", "SUPER JUNIOR", "THE BOYZ", "PLAVE"];
      return a.type === "group" && (boyGroups.includes(a.name) || !["aespa", "BLACKPINK", "TWICE", "IVE", "LE SSERAFIM", "ITZY", "Red Velvet"].includes(a.name));
    }
    if (filter === "2nd Gen" || filter === "3rd Gen" || filter === "4th Gen" || filter === "5th Gen") {
      return a.generation === filter;
    }
    return true;
  });

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
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
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
          artists {filter !== "All" && <span className="text-primary font-medium">({filter})</span>}
        </p>
      </div>

      {/* Artist grid */}
      {results.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center max-w-md mx-auto my-8">
          <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-display font-black text-lg text-foreground mb-1">
            No artists found
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            {filter === "⭐ My Favorites"
              ? "You haven't followed any artists in this category yet. Explore all artists and tap the heart icon!"
              : "Try adjusting your search query or filter."}
          </p>
          {filter === "⭐ My Favorites" && (
            <button
              onClick={() => setFilter("All")}
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Browse All Artists
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((artist) => {
            const isFollowed =
              personalization.favoriteGroups.includes(artist.name) ||
              personalization.favoriteSoloists.includes(artist.name);

            return (
              <motion.div
                key={artist.id}
                whileHover={{ y: -4 }}
                className="relative bg-card rounded-2xl border border-border overflow-hidden text-left transition-shadow hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 group"
              >
                <div
                  onClick={() => onArtist(artist)}
                  className="relative h-44 overflow-hidden cursor-pointer"
                >
                  <SafeImage
                    src={artist.img}
                    alt={artist.name}
                    fallbackColor={artist.color}
                    fallbackText={artist.name}
                    fallbackType={artist.type}
                    width={300}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 30%, ${artist.color}DD)`,
                    }}
                  />
                  {artist.verified && (
                    <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-10">
                    <h4 className="font-display font-black text-base text-white leading-tight truncate">
                      {artist.name}
                    </h4>
                    <p className="text-white/70 text-[11px] truncate">
                      {artist.label}
                    </p>
                  </div>
                </div>

                {/* Heart / Follow Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFollow(artist.name);
                  }}
                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isFollowed
                      ? "bg-primary text-white shadow-lg shadow-primary/40 scale-105"
                      : "bg-black/50 backdrop-blur-md text-white/80 hover:bg-black/80 hover:text-white"
                  }`}
                  title={isFollowed ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart
                    className="w-3.5 h-3.5 transition-transform active:scale-125"
                    fill={isFollowed ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                </button>

                <div className="p-3.5" onClick={() => onArtist(artist)}>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] text-muted-foreground truncate">
                      {artist.genre}
                    </p>
                    {artist.generation && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                        {artist.generation}
                      </span>
                    )}
                  </div>
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
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── ArtistProfile ───────────────────────────────────────────────────────────

function ArtistProfile({
  artist,
  isFollowing,
  onToggleFollow,
}: {
  artist: Artist;
  isFollowing: boolean;
  onToggleFollow: () => void;
}) {
  const [tab, setTab] = useState<
    "overview" | "disco" | "schedule"
  >("overview");

  const discography = ARTIST_DISCOGRAPHIES[artist.name] || aespaDiscography;
  const SCHEDULE = DEFAULT_SCHEDULE;

  // Global Background Audio Playback State
  const audio = useAudioPlayer();
  const isCurrentArtistPlaying = audio.playingArtist?.name === artist.name;
  const isInDiscography = isCurrentArtistPlaying && tab === "disco";

  useEffect(() => {
    audio.setIsInDiscographyView(isInDiscography);
    return () => {
      audio.setIsInDiscographyView(false);
    };
  }, [isInDiscography, audio]);

  const playingAlbum = isCurrentArtistPlaying ? audio.playingAlbum : null;
  const currentTrackIndex = audio.currentTrackIndex;
  const isPlaying = audio.isPlaying;
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const volume = audio.volume;
  const isMuted = audio.isMuted;
  const showVideo = audio.showVideo;

  // Handle clicking "Listen" or playing an album
  const handleListenAlbum = (album: DiscographyItem) => {
    audio.playAlbum(artist, album);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Wide hero */}
      <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
        <SafeImage
          src={artist.img}
          alt={artist.name}
          fallbackColor={artist.color}
          fallbackText={artist.name}
          fallbackType={artist.type}
          width={1200}
          height={400}
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
              onClick={onToggleFollow}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                isFollowing
                  ? "border border-primary/50 text-primary bg-primary/10"
                  : "bg-primary text-white"
              }`}
              style={
                isFollowing
                  ? {}
                  : {
                      boxShadow:
                        "0 4px 20px rgba(255,28,142,0.3)",
                    }
              }
            >
              {isFollowing ? "Following ✓" : "Follow"}
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
            <div className="space-y-4">
              {/* In-App Audio Playback Deck */}
              {playingAlbum && (
                <AudioPlaybackDeck
                  artist={artist}
                  album={playingAlbum}
                  currentTrackIndex={currentTrackIndex}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                  isMuted={isMuted}
                  showVideo={showVideo}
                  onTogglePlay={audio.togglePlay}
                  onPrevTrack={audio.prevTrack}
                  onNextTrack={audio.nextTrack}
                  onSeek={audio.seek}
                  onVolumeChange={audio.setVolume}
                  onToggleMute={audio.toggleMute}
                  onOpenTracklist={() => audio.openTracklistModal(artist, playingAlbum)}
                  onToggleShowVideo={audio.toggleShowVideo}
                  onSetIsPlaying={audio.setIsPlaying}
                  onTimeUpdate={(cur, dur) => {}}
                />
              )}

              {/* Discography List */}
              <div className="space-y-3">
                {discography.map((album) => {
                  const isCurrentAlbumActive = playingAlbum?.title === album.title;
                  const albumTracks = getAlbumTracklist(artist.name, album);
                  const leadTitle = getAlbumLeadTrack(album);

                  return (
                    <div
                      key={album.title}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                        isCurrentAlbumActive
                          ? "bg-primary/[0.06] border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/40"
                          : "bg-card border-border hover:border-primary/30"
                      }`}
                    >
                      <div
                        onClick={() => audio.openTracklistModal(artist, album)}
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                      >
                        {/* Disc / Icon Art */}
                        <div
                          className="relative w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                          style={{
                            backgroundColor: artist.color + "25",
                          }}
                        >
                          <Disc3
                            className={`w-6 h-6 transition-transform ${
                              isCurrentAlbumActive && isPlaying
                                ? "animate-[spin_4s_linear_infinite]"
                                : "group-hover:scale-110"
                            }`}
                            style={{ color: artist.color }}
                          />

                          {isCurrentAlbumActive && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="flex items-end gap-0.5 h-3">
                                {[0.4, 0.9, 0.6].map((h, i) => (
                                  <motion.span
                                    key={i}
                                    animate={
                                      isPlaying
                                        ? {
                                            height: [
                                              `${Math.max(3, h * 12)}px`,
                                              `${Math.max(4, (1 - h * 0.4) * 14)}px`,
                                              `${Math.max(3, h * 12)}px`,
                                            ],
                                          }
                                        : { height: "3px" }
                                    }
                                    transition={{
                                      duration: 0.5 + i * 0.1,
                                      repeat: Infinity,
                                    }}
                                    className="w-0.5 rounded-full bg-primary"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {album.title}
                            </p>

                            {isCurrentAlbumActive && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                {isPlaying ? "Playing" : "Paused"}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground mt-0.5">
                            {album.type} · {album.year} ·{" "}
                            {album.tracks || albumTracks.length} tracks · Lead:{" "}
                            <span className="text-foreground/80 font-medium">
                              {leadTitle}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        {/* Tracklist Trigger */}
                        <button
                          onClick={() => audio.openTracklistModal(artist, album)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border hover:border-primary/30 transition-colors"
                        >
                          <ListMusic className="w-3.5 h-3.5" />
                          <span>Tracklist</span>
                        </button>

                        {/* Play/Listen Button */}
                        <button
                          onClick={() => handleListenAlbum(album)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                            isCurrentAlbumActive
                              ? isPlaying
                                ? "bg-primary text-white shadow-md shadow-primary/30"
                                : "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20"
                          }`}
                        >
                          {isCurrentAlbumActive && isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              <span>Playing</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{isCurrentAlbumActive ? "Resume" : "Listen"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
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

function ComebacksTab({
  personalization,
  onArtist,
}: {
  personalization: UserPersonalization;
  onArtist: (a: Artist) => void;
}) {
  const [filter, setFilter] = useState<"upcoming" | "recent" | "favorites">(
    "upcoming",
  );

  const followedNames = new Set([
    ...personalization.favoriteGroups,
    ...personalization.favoriteSoloists,
  ]);

  const filteredComebacks = COMEBACKS.filter((c) => {
    const finished = isComebackFinished(c);
    if (filter === "favorites") {
      return followedNames.has(c.artist);
    }
    return filter === "upcoming" ? !finished : finished;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-card rounded-xl p-1 border border-border">
          {(["upcoming", "recent", "favorites"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "favorites" ? "⭐ My Bias" : f}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground hidden sm:block">
          {filteredComebacks.length} comebacks
        </p>
      </div>

      {filteredComebacks.length === 0 ? (
        <div className="bg-card rounded-2xl border border-dashed border-border p-12 text-center max-w-md mx-auto my-8">
          <Clock className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-display font-black text-lg text-foreground mb-1">
            No comebacks found
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            {filter === "favorites"
              ? "None of your currently followed artists have scheduled upcoming releases."
              : "No comebacks match this filter."}
          </p>
          {filter === "favorites" && (
            <button
              onClick={() => setFilter("upcoming")}
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              View All Upcoming Comebacks
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredComebacks.map((cb) => {
            const isFollowed = followedNames.has(cb.artist);
            const artistObj = ARTISTS.find((a) => a.name === cb.artist);
            const isFinished = isComebackFinished(cb);
            const daysRemaining = calculateComebackDaysLeft(cb.date);

            return (
              <div
                key={cb.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="relative h-36 overflow-hidden">
                  <SafeImage
                    src={cb.img}
                    alt={cb.artist}
                    fallbackColor={cb.color}
                    fallbackText={cb.artist}
                    width={600}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${cb.color}CC, transparent 55%)`,
                    }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-black/50 text-white px-2 py-0.5 rounded-full">
                        {cb.type}
                      </span>
                      {isFinished ? (
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/90 text-white px-2 py-0.5 rounded-full font-bold">
                          Out Now
                        </span>
                      ) : cb.teaser ? (
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-primary/80 text-white px-2 py-0.5 rounded-full">
                          Teaser Out
                        </span>
                      ) : null}
                      {isFollowed && (
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-yellow-400/90 text-black font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          ⭐ Following
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-black text-white">
                        {cb.title}
                      </h3>
                      <p
                        onClick={() => artistObj && onArtist(artistObj)}
                        className="text-white/80 text-xs font-semibold hover:underline cursor-pointer inline-block"
                      >
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
                        {!isFinished && daysRemaining > 0
                          ? `${daysRemaining}d left`
                          : "Released"}
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width:
                          isFinished
                            ? "100%"
                            : `${Math.max(5, 100 - (Math.max(0, daysRemaining) / 50) * 100)}%`,
                        backgroundColor: cb.color,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {cb.tracks} tracks
                    </span>
                    <div className="flex gap-2">
                      {artistObj && (
                        <button
                          onClick={() => onArtist(artistObj)}
                          className="text-xs border border-border text-foreground px-3 py-1.5 rounded-lg font-semibold hover:bg-secondary transition-colors"
                        >
                          Artist
                        </button>
                      )}
                      {isFinished ? (
                        <button
                          onClick={() => artistObj && onArtist(artistObj)}
                          className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-80"
                          style={{ backgroundColor: cb.color }}
                        >
                          <Play className="w-3 h-3 fill-current" /> Stream Now
                        </button>
                      ) : cb.preorder ? (
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
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── NewsTab — master-detail ──────────────────────────────────────────────────

function NewsTab({
  personalization,
}: {
  personalization: UserPersonalization;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<NewsItem | null>(
    NEWS[0],
  );
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const FILTERS = NEWS_FILTERS;

  const followedArtists = new Set([
    ...personalization.favoriteGroups,
    ...personalization.favoriteSoloists,
  ]);

  const items = NEWS.filter((n) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "⭐ For You") {
      const mentionsBias = Array.from(followedArtists).some(
        (artist) =>
          n.headline.toLowerCase().includes(artist.toLowerCase()) ||
          n.body.toLowerCase().includes(artist.toLowerCase())
      );
      const matchesGenre = personalization.favoriteGenres.some(
        (g) =>
          n.headline.toLowerCase().includes(g.toLowerCase()) ||
          n.body.toLowerCase().includes(g.toLowerCase())
      );
      return mentionsBias || matchesGenre || n.hot;
    }
    return n.category === activeFilter;
  });

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
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                <SafeImage
                  src={item.img}
                  alt={item.headline}
                  fallbackColor="#00B4D8"
                  fallbackType="news"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
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
              <SafeImage
                src={selected.img}
                alt={selected.headline}
                fallbackColor="#00B4D8"
                fallbackType="news"
                width={900}
                height={400}
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

function ProfileTab({
  personalization,
  onEditPreferences,
  onSignOut,
  onArtist,
}: {
  personalization: UserPersonalization;
  onEditPreferences: () => void;
  onSignOut: () => void;
  onArtist: (a: Artist) => void;
}) {
  const followedCount =
    personalization.favoriteGroups.length + personalization.favoriteSoloists.length;

  const STATS = [
    { label: "Following", value: String(followedCount) },
    { label: "Fav Genres", value: String(personalization.favoriteGenres.length) },
    { label: "Articles", value: "12" },
    { label: "Level", value: "48" },
  ];

  const NOTIFS = PROFILE_NOTIFS;
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

  const followedArtists = ARTISTS.filter(
    (a) =>
      personalization.favoriteGroups.includes(a.name) ||
      personalization.favoriteSoloists.includes(a.name)
  );

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
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-card border-2 border-primary">
                  <SafeImage
                    src="1535713875002-d1ffd9b4a8bc"
                    alt="Profile"
                    fallbackColor="#FF1C8E"
                    fallbackType="solo"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={onEditPreferences}
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  <Settings className="w-3 h-3" /> Edit Pulse
                </button>
              </div>
              <h3 className="font-display font-black text-xl text-foreground">
                {personalization.username || "kpop_luna"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {personalization.email || "luna@kpopulse.com"}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Star
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                />
                <span className="text-xs text-yellow-400 font-semibold">
                  Super Fan · {personalization.favoriteGenerations.join(", ") || "All Generations"}
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

          {/* My Favorites / Following */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  My Favorites ({followedArtists.length})
                </p>
              </div>
              <button
                onClick={onEditPreferences}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Manage
              </button>
            </div>

            {followedArtists.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No favorite artists selected yet.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {followedArtists.slice(0, 8).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => onArtist(a)}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div
                      className="w-full aspect-square rounded-xl overflow-hidden border-2 transition-transform group-hover:scale-105"
                      style={{ borderColor: a.color }}
                    >
                      <SafeImage
                        src={a.img}
                        alt={a.name}
                        fallbackColor={a.color}
                        fallbackText={a.name}
                        fallbackType={a.type}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight truncate w-full group-hover:text-foreground">
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pulse Preferences Card */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                K-Pop Pulse Preferences
              </p>
              <button
                onClick={onEditPreferences}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
                  Favorite Genres
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {personalization.favoriteGenres.length > 0 ? (
                    personalization.favoriteGenres.map((g) => (
                      <span
                        key={g}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">All genres</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
                  Generations
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {personalization.favoriteGenerations.length > 0 ? (
                    personalization.favoriteGenerations.map((gen) => (
                      <span
                        key={gen}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-foreground font-semibold border border-border"
                      >
                        {gen}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">All generations</span>
                  )}
                </div>
              </div>
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
                Choose what alerts you want to receive for followed artists
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
            {ACCOUNT_SETTINGS.map((item, i) => (
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

function MainAppContent() {
  const audio = useAudioPlayer();
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  // Registered accounts state
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem("kpopulse_registered_accounts");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ACCOUNTS;
  });

  // Active logged-in user state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const savedAccounts = localStorage.getItem("kpopulse_registered_accounts");
      const list: UserAccount[] = savedAccounts ? JSON.parse(savedAccounts) : DEFAULT_ACCOUNTS;
      const activeId = localStorage.getItem("kpopulse_active_user_id");
      if (activeId) {
        const found = list.find((a) => a.id === activeId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Keep accounts synced to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kpopulse_registered_accounts", JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }
  }, [accounts]);

  // Derived user personalization
  const personalization: UserPersonalization =
    currentUser?.personalization || DEFAULT_PERSONALIZATION;

  // Helper to update current user personalization and sync to accounts list
  const updatePersonalization = (updated: UserPersonalization) => {
    if (currentUser) {
      const updatedUser: UserAccount = {
        ...currentUser,
        personalization: updated,
      };
      setCurrentUser(updatedUser);
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc))
      );
    }
    try {
      localStorage.setItem(
        "kpopulse_user_personalization",
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedArtist(null);
  };

  const handleRegister = (newAccount: UserAccount) => {
    setAccounts((prev) => {
      const filtered = prev.filter((a) => a.id !== newAccount.id);
      return [...filtered, newAccount];
    });
    setCurrentUser(newAccount);
    try {
      localStorage.setItem("kpopulse_active_user_id", newAccount.id);
      localStorage.setItem(
        "kpopulse_user_personalization",
        JSON.stringify(newAccount.personalization)
      );
    } catch (e) {
      console.error(e);
    }
    setScreen("onboarding");
  };

  const handleLogin = (account: UserAccount) => {
    setCurrentUser(account);
    try {
      localStorage.setItem("kpopulse_active_user_id", account.id);
      localStorage.setItem(
        "kpopulse_user_personalization",
        JSON.stringify(account.personalization)
      );
    } catch (e) {
      console.error(e);
    }
    setScreen("main");
  };

  const handleOnboardingComplete = (updated: UserPersonalization) => {
    updatePersonalization(updated);
    setScreen("main");
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("kpopulse_active_user_id");
    } catch (e) {
      console.error(e);
    }
    setScreen("login");
  };

  const toggleFavoriteArtist = (artistName: string) => {
    const artistObj = ARTISTS.find((a) => a.name === artistName);
    const isSolo = artistObj?.type === "solo";

    const currentPers = personalization;
    let updatedPers: UserPersonalization;
    if (isSolo) {
      const has = currentPers.favoriteSoloists.includes(artistName);
      updatedPers = {
        ...currentPers,
        favoriteSoloists: has
          ? currentPers.favoriteSoloists.filter((n) => n !== artistName)
          : [...currentPers.favoriteSoloists, artistName],
      };
    } else {
      const has = currentPers.favoriteGroups.includes(artistName);
      updatedPers = {
        ...currentPers,
        favoriteGroups: has
          ? currentPers.favoriteGroups.filter((n) => n !== artistName)
          : [...currentPers.favoriteGroups, artistName],
      };
    }
    updatePersonalization(updatedPers);
  };

  if (screen === "splash") {
    return <SplashScreen onDone={() => setScreen("login")} />;
  }

  if (screen === "login") {
    return (
      <LoginScreen
        accounts={accounts}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  if (screen === "onboarding") {
    return (
      <PersonalizationScreen
        personalization={personalization}
        onComplete={handleOnboardingComplete}
        onSkip={() => setScreen("main")}
      />
    );
  }

  const pageTitle = selectedArtist
    ? selectedArtist.name
    : TAB_TITLES[activeTab];

  const isSelectedArtistFollowed = selectedArtist
    ? personalization.favoriteGroups.includes(selectedArtist.name) ||
      personalization.favoriteSoloists.includes(selectedArtist.name)
    : false;

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Global Tracklist Modal */}
      {audio.tracklistModalData && (
        <TracklistModal
          artist={audio.tracklistModalData.artist}
          album={audio.tracklistModalData.album}
          currentPlayingAlbumTitle={audio.playingAlbum?.title || null}
          currentTrackIndex={audio.currentTrackIndex}
          isPlaying={audio.isPlaying}
          onClose={audio.closeTracklistModal}
          onSelectTrack={(album, trackIdx) => {
            audio.playTrack(audio.tracklistModalData!.artist, album, trackIdx);
          }}
        />
      )}

      {/* Personalization Modal when opened from dashboard "Manage" or profile "Edit Pulse" */}
      {showPersonalizationModal && (
        <PersonalizationScreen
          personalization={personalization}
          isModal
          onComplete={(updated) => {
            updatePersonalization(updated);
            setShowPersonalizationModal(false);
          }}
          onSkip={() => setShowPersonalizationModal(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTab={handleTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        personalization={personalization}
      />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <PageHeader
          title={pageTitle}
          showBack={!!selectedArtist}
          onBack={() => setSelectedArtist(null)}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main
          className={`flex-1 ${
            activeTab === "news" && !selectedArtist
              ? "flex flex-col overflow-hidden"
              : "overflow-y-auto scrollbar-hide"
          } ${audio.playingAlbum ? "pb-44 lg:pb-28" : "pb-24 lg:pb-8"}`}
        >
          {selectedArtist ? (
            <div className="overflow-y-auto scrollbar-hide h-full">
              <ArtistProfile
                artist={selectedArtist}
                isFollowing={isSelectedArtistFollowed}
                onToggleFollow={() => toggleFavoriteArtist(selectedArtist.name)}
              />
            </div>
          ) : (
            <>
              {activeTab === "home" && (
                <HomeTab
                  onArtist={setSelectedArtist}
                  onNews={() => setActiveTab("news")}
                  onManageArtists={() => setShowPersonalizationModal(true)}
                  personalization={personalization}
                />
              )}
              {activeTab === "discover" && (
                <DiscoverTab
                  onArtist={setSelectedArtist}
                  personalization={personalization}
                  onToggleFollow={toggleFavoriteArtist}
                />
              )}
              {activeTab === "comebacks" && (
                <ComebacksTab
                  personalization={personalization}
                  onArtist={setSelectedArtist}
                />
              )}
              {activeTab === "news" && (
                <NewsTab personalization={personalization} />
              )}
              {activeTab === "profile" && (
                <ProfileTab
                  personalization={personalization}
                  onEditPreferences={() => setShowPersonalizationModal(true)}
                  onSignOut={handleSignOut}
                  onArtist={setSelectedArtist}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Persistent Global Floating Audio Player */}
      <PersistentAudioBar onSelectArtist={setSelectedArtist} />

      {/* Mobile bottom nav */}
      <div
        className={`lg:hidden fixed inset-x-0 z-20 transition-all ${
          audio.playingAlbum ? "bottom-20" : "bottom-0"
        }`}
      >
        <BottomNav activeTab={activeTab} onTab={handleTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainAppContent />
    </AudioProvider>
  );
}