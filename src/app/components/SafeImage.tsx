import React, { useState } from "react";
import { Sparkles, Music, Mic, Zap, Users, User, Flame } from "lucide-react";

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
  fallbackText?: string;
  fallbackType?: "group" | "solo" | "music" | "news";
  width?: number;
  height?: number;
  priority?: boolean;
}

export function formatImageUrl(src?: string, w = 400, h = 300): string {
  if (!src) return "";
  
  // If already absolute URL or data URI
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }

  // If local asset
  let path = src;
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
    const rawPath = path.startsWith("/") ? path : `/${path}`;
    // Encode spaces and special characters for browser compatibility
    return encodeURI(rawPath);
  }

  // Otherwise assume Unsplash photo ID
  return `https://images.unsplash.com/photo-${src}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// Generate a clean 2-3 letter monogram for artist fallback
function getMonogram(name: string): string {
  if (!name) return "KP";
  const words = name.trim().split(/[\s_.-]+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  if (name.length <= 4) {
    return name.toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}

export function SafeImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  fallbackColor = "#FF1C8E",
  fallbackText,
  fallbackType = "group",
  width = 400,
  height = 300,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const formattedSrc = React.useMemo(() => {
    return formatImageUrl(src, width, height);
  }, [src, width, height]);

  // Reset error when src changes
  React.useEffect(() => {
    setHasError(false);
    setLoaded(false);
  }, [src]);

  const monogram = getMonogram(fallbackText || alt);

  if (hasError || !formattedSrc) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none p-2 ${
          className.includes("rounded") ? "" : ""
        }`}
        style={{
          background: `radial-gradient(circle at 50% 35%, ${fallbackColor}44 0%, ${fallbackColor}18 55%, #0B0E17 100%)`,
          border: `1px solid ${fallbackColor}33`,
        }}
      >
        {/* Subtle mesh background circles */}
        <div
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-xl opacity-30 pointer-events-none"
          style={{ backgroundColor: fallbackColor }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-xl opacity-20 pointer-events-none"
          style={{ backgroundColor: fallbackColor }}
        />

        {/* Center icon / monogram badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-lg relative z-10 transition-transform"
          style={{
            backgroundColor: `${fallbackColor}28`,
            border: `1px solid ${fallbackColor}66`,
            color: fallbackColor,
          }}
        >
          {fallbackType === "solo" ? (
            <User className="w-5 h-5" />
          ) : fallbackType === "music" ? (
            <Music className="w-5 h-5" />
          ) : fallbackType === "news" ? (
            <Flame className="w-5 h-5" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
        </div>

        {/* Monogram / Title */}
        <span
          className="font-display font-black text-xs tracking-wider text-white relative z-10 truncate max-w-full px-1 text-center"
          style={{
            textShadow: `0 0 12px ${fallbackColor}88`,
          }}
        >
          {fallbackText || alt || monogram}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-card/40">
      <img
        src={formattedSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-90"
        }`}
        onError={() => setHasError(true)}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
