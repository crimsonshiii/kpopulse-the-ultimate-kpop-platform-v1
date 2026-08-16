import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Check,
  Zap,
  Search,
  Sparkles,
  Mic,
  Disc,
  Flame,
  Guitar,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  BadgeCheck,
  Music,
  Users,
  User as UserIcon,
  Filter,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
import {
  type Artist,
  type GenreItem,
  type GenerationItem,
  type UserPersonalization,
  ARTISTS,
  GENRES_LIST,
  GENERATIONS_LIST,
} from "../data";

// Unsplash / Asset Helper
function resolveImage(id: string, w = 400, h = 300) {
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

// Icon helper for genres
function renderGenreIcon(iconName: string, color: string) {
  const props = { className: "w-6 h-6", style: { color } };
  switch (iconName) {
    case "Sparkles":
      return <Sparkles {...props} />;
    case "Mic":
      return <Mic {...props} />;
    case "Disc":
      return <Disc {...props} />;
    case "Flame":
      return <Flame {...props} />;
    case "Guitar":
      return <Guitar {...props} />;
    case "Heart":
      return <Heart {...props} />;
    case "Zap":
      return <Zap {...props} />;
    default:
      return <Music {...props} />;
  }
}

interface PersonalizationScreenProps {
  personalization?: UserPersonalization;
  initialData?: UserPersonalization;
  onComplete: (updated: UserPersonalization) => void;
  onSkip?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export function PersonalizationScreen({
  personalization,
  initialData,
  onComplete,
  onSkip,
  isModal = false,
  onClose,
}: PersonalizationScreenProps) {
  const activeData = personalization || initialData || {
    favoriteGroups: [],
    favoriteSoloists: [],
    favoriteGenres: [],
    favoriteGenerations: [],
    username: "kpop_luna",
    email: "fan@kpopulse.com",
  };

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [favoriteGroups, setFavoriteGroups] = useState<string[]>(
    activeData.favoriteGroups || []
  );
  const [favoriteSoloists, setFavoriteSoloists] = useState<string[]>(
    activeData.favoriteSoloists || []
  );
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(
    activeData.favoriteGenres || []
  );
  const [favoriteGenerations, setFavoriteGenerations] = useState<string[]>(
    activeData.favoriteGenerations || []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const groupsList = useMemo(() => {
    return ARTISTS.filter((a) => a.type === "group");
  }, []);

  const soloistsList = useMemo(() => {
    return ARTISTS.filter((a) => a.type === "solo");
  }, []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupsList;
    const q = searchQuery.toLowerCase();
    return groupsList.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.label.toLowerCase().includes(q) ||
        a.genre.toLowerCase().includes(q)
    );
  }, [groupsList, searchQuery]);

  const filteredSoloists = useMemo(() => {
    if (!searchQuery.trim()) return soloistsList;
    const q = searchQuery.toLowerCase();
    return soloistsList.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.label.toLowerCase().includes(q) ||
        a.genre.toLowerCase().includes(q)
    );
  }, [soloistsList, searchQuery]);

  const toggleGroup = (name: string) => {
    setFavoriteGroups((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleSoloist = (name: string) => {
    setFavoriteSoloists((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleGenre = (name: string) => {
    setFavoriteGenres((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleGeneration = (name: string) => {
    setFavoriteGenerations((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleSelectAllGroups = () => {
    const allNames = groupsList.map((g) => g.name);
    setFavoriteGroups(allNames);
  };

  const handleClearGroups = () => {
    setFavoriteGroups([]);
  };

  const handleSelectAllSoloists = () => {
    const allNames = soloistsList.map((s) => s.name);
    setFavoriteSoloists(allNames);
  };

  const handleClearSoloists = () => {
    setFavoriteSoloists([]);
  };

  const handleFinish = () => {
    onComplete({
      ...activeData,
      favoriteGroups,
      favoriteSoloists,
      favoriteGenres,
      favoriteGenerations,
    });
  };

  const steps = [
    {
      id: "groups",
      title: "Favorite Groups",
      subtitle: "Select your bias groups to curate your comeback radar, news feed, and music rankings.",
      badge: `${favoriteGroups.length} selected`,
      icon: Users,
    },
    {
      id: "soloists",
      title: "Favorite Soloists",
      subtitle: "Choose the solo powerhouses and vocalists you follow for individual releases and stages.",
      badge: `${favoriteSoloists.length} selected`,
      icon: UserIcon,
    },
    {
      id: "genres",
      title: "Favorite Genres",
      subtitle: "Pick the soundscapes and production styles that match your daily listening vibes.",
      badge: `${favoriteGenres.length} selected`,
      icon: Disc,
    },
    {
      id: "generations",
      title: "Favorite Generations",
      subtitle: "Select your favorite eras of K-pop history from 2nd Gen pioneers to 5th Gen rookies.",
      badge: `${favoriteGenerations.length} selected`,
      icon: Clock,
    },
  ];

  return (
    <div
      className={
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          : "min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden selection:bg-primary/30"
      }
    >
      <div
        className={
          isModal
            ? "w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            : "w-full max-w-6xl mx-auto px-4 py-8 md:py-10 flex-1 flex flex-col"
        }
      >
        {/* Top Header */}
        <div className="px-6 py-6 border-b border-border/80 bg-card/60 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center text-white shadow-lg flex-shrink-0"
                style={{ boxShadow: "0 4px 20px rgba(255,28,142,0.45)" }}
              >
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
                  Personalization & Onboarding
                </span>
                <h1 className="text-xl md:text-2xl font-black font-display text-foreground tracking-tight">
                  What’s on your K-pop pulse?
                </h1>
              </div>
            </div>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {!isModal && onSkip && (
              <button
                onClick={onSkip}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline transition-colors px-3 py-1.5 rounded-lg border border-border/50"
              >
                Skip for now
              </button>
            )}
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-6">
            {steps.map((s, idx) => {
              const isActive = currentStep === idx;
              const isPast = currentStep > idx;
              const IconComponent = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentStep(idx);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary/40"
                      : isPast
                      ? "bg-secondary/40 border-border/80 text-foreground/80 hover:border-primary/40"
                      : "bg-card/40 border-border/40 text-muted-foreground hover:border-border"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : isPast
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate leading-tight">
                      {s.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground truncate block font-mono">
                      {s.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide space-y-6">
          {/* Step Info Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-secondary/30 border border-border/60 p-4 rounded-2xl">
            <div>
              <h2 className="text-lg font-black font-display text-foreground flex items-center gap-2">
                {steps[currentStep].title}
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                  {steps[currentStep].badge}
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Quick Actions for Groups & Soloists */}
            {(currentStep === 0 || currentStep === 1) && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={currentStep === 0 ? handleSelectAllGroups : handleSelectAllSoloists}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-card border border-border text-foreground hover:border-primary/40 transition-colors shadow-sm"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-primary" />
                  Select All
                </button>
                <button
                  onClick={currentStep === 0 ? handleClearGroups : handleClearSoloists}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Search bar (for Step 1 & 2) */}
          {(currentStep === 0 || currentStep === 1) && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentStep === 0
                    ? "Search favorite group, agency, or genre..."
                    : "Search soloist, label, or concept..."
                }
                className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* STEP 1: Favorite Groups */}
          {currentStep === 0 && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {filteredGroups.map((artist) => {
                  const isSelected = favoriteGroups.includes(artist.name);
                  return (
                    <motion.button
                      key={artist.id}
                      onClick={() => toggleGroup(artist.name)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group flex flex-col rounded-2xl overflow-hidden border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-primary bg-card ring-2 ring-primary shadow-lg shadow-primary/20"
                          : "border-border bg-card/80 hover:border-primary/40 hover:shadow-md"
                      }`}
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/50">
                        <img
                          src={resolveImage(artist.img, 300, 225)}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
                          }}
                        />

                        {/* Checkmark Badge */}
                        <div
                          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-primary text-white shadow-md scale-100"
                              : "bg-black/50 text-white/40 border border-white/20 group-hover:border-white/50 scale-90"
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 transition-transform stroke-[3] ${
                              isSelected ? "scale-100" : "scale-75 opacity-40"
                            }`}
                          />
                        </div>

                        {/* Generation Tag */}
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white/90 backdrop-blur-md"
                            style={{ backgroundColor: artist.color + "99" }}
                          >
                            {artist.generation} Gen
                          </span>
                        </div>

                        {/* Overlay text */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                          <div>
                            <h3 className="font-display font-black text-base text-white leading-tight flex items-center gap-1.5 drop-shadow-sm">
                              {artist.name}
                              {artist.verified && (
                                <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary/20" />
                              )}
                            </h3>
                            <p className="text-[11px] text-white/70 font-medium truncate">
                              {artist.label}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3 bg-card flex items-center justify-between gap-2 border-t border-border/40">
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground truncate font-medium">
                            {artist.genre}
                          </p>
                          <p className="text-[10px] font-mono text-muted-foreground/80 mt-0.5">
                            {artist.members} Members · {artist.fans} fans
                          </p>
                        </div>

                        {/* Heart Button */}
                        <div
                          className={`p-1.5 rounded-xl transition-colors ${
                            isSelected
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground/50 group-hover:text-primary/70"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4 transition-all"
                            fill={isSelected ? "currentColor" : "none"}
                          />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredGroups.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">No groups found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Favorite Soloists */}
          {currentStep === 1 && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {filteredSoloists.map((artist) => {
                  const isSelected = favoriteSoloists.includes(artist.name);
                  return (
                    <motion.button
                      key={artist.id}
                      onClick={() => toggleSoloist(artist.name)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group flex flex-col rounded-2xl overflow-hidden border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-primary bg-card ring-2 ring-primary shadow-lg shadow-primary/20"
                          : "border-border bg-card/80 hover:border-primary/40 hover:shadow-md"
                      }`}
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/50">
                        <img
                          src={resolveImage(artist.img, 300, 225)}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
                          }}
                        />

                        {/* Checkmark Badge */}
                        <div
                          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-primary text-white shadow-md scale-100"
                              : "bg-black/50 text-white/40 border border-white/20 group-hover:border-white/50 scale-90"
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 transition-transform stroke-[3] ${
                              isSelected ? "scale-100" : "scale-75 opacity-40"
                            }`}
                          />
                        </div>

                        {/* Soloist Badge */}
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white/90 backdrop-blur-md"
                            style={{ backgroundColor: artist.color + "99" }}
                          >
                            Soloist · {artist.generation} Gen
                          </span>
                        </div>

                        {/* Overlay text */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                          <div>
                            <h3 className="font-display font-black text-base text-white leading-tight flex items-center gap-1.5 drop-shadow-sm">
                              {artist.name}
                              {artist.verified && (
                                <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary/20" />
                              )}
                            </h3>
                            <p className="text-[11px] text-white/70 font-medium truncate">
                              {artist.label}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3 bg-card flex items-center justify-between gap-2 border-t border-border/40">
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground truncate font-medium">
                            {artist.genre}
                          </p>
                          <p className="text-[10px] font-mono text-muted-foreground/80 mt-0.5">
                            Debut {artist.debut} · {artist.fans} fans
                          </p>
                        </div>

                        {/* Heart Button */}
                        <div
                          className={`p-1.5 rounded-xl transition-colors ${
                            isSelected
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground/50 group-hover:text-primary/70"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4 transition-all"
                            fill={isSelected ? "currentColor" : "none"}
                          />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredSoloists.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">No soloists found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Favorite Genres */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GENRES_LIST.map((genre) => {
                const isSelected = favoriteGenres.includes(genre.name);
                return (
                  <motion.button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.name)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary shadow-md shadow-primary/15"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner"
                          style={{
                            backgroundColor: genre.color + "20",
                          }}
                        >
                          {renderGenreIcon(genre.icon, genre.color)}
                        </div>

                        {/* Heart & Checkbox */}
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-primary text-white scale-100"
                                : "border border-border text-transparent scale-90"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div
                            className={`p-1 rounded-lg ${
                              isSelected ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={isSelected ? "currentColor" : "none"}
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-display font-black text-base text-foreground mb-1">
                        {genre.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {genre.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                      {genre.artists.map((art) => (
                        <span
                          key={art}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-foreground/80"
                        >
                          {art}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* STEP 4: Favorite Generations */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GENERATIONS_LIST.map((gen) => {
                const isSelected = favoriteGenerations.includes(gen.name);
                return (
                  <motion.button
                    key={gen.id}
                    onClick={() => toggleGeneration(gen.name)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary shadow-md shadow-primary/15"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                          style={{
                            backgroundColor: gen.color + "25",
                            color: gen.color,
                          }}
                        >
                          {gen.years}
                        </div>

                        {/* Selected indicator */}
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-primary text-white scale-100"
                                : "border border-border text-transparent scale-90"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div
                            className={`p-1 rounded-lg ${
                              isSelected ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={isSelected ? "currentColor" : "none"}
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-display font-black text-lg text-foreground mb-1.5">
                        {gen.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {gen.tagline}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border/50">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        Notable Artists
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {gen.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-secondary/80 text-foreground border border-border/40"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 border-t border-border/80 bg-card/80 backdrop-blur-md flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            {currentStep > 0 ? (
              <button
                onClick={() => {
                  setCurrentStep((prev) => prev - 1);
                  setSearchQuery("");
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : isModal && onClose ? (
              <button
                onClick={onClose}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            ) : (
              <span className="text-xs text-muted-foreground font-mono">
                Step 1 of 4
              </span>
            )}
          </div>

          {/* Progress Indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  currentStep === i
                    ? "w-8 bg-primary"
                    : i < currentStep
                    ? "w-3 bg-primary/40"
                    : "w-3 bg-secondary"
                }`}
              />
            ))}
          </div>

          {/* Forward / Complete */}
          <div className="flex items-center gap-3">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => {
                  setCurrentStep((prev) => prev + 1);
                  setSearchQuery("");
                }}
                className="flex items-center gap-2 bg-primary text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95"
                style={{
                  boxShadow: "0 4px 20px rgba(255,28,142,0.35)",
                }}
              >
                Next: {steps[currentStep + 1].title}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-pink-500 text-white font-black text-xs md:text-sm px-7 py-2.5 rounded-xl hover:opacity-95 transition-all shadow-lg active:scale-95"
                style={{
                  boxShadow: "0 6px 25px rgba(255,28,142,0.45)",
                }}
              >
                <Zap className="w-4 h-4 fill-white" />
                {isModal ? "Save & Sync Pulse" : "Complete & Launch Pulse"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
