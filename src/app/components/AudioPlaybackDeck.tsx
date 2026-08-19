import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  ListMusic,
  ExternalLink,
  Sparkles,
  Tv,
  Music,
} from "lucide-react";
import {
  type Artist,
  type DiscographyItem,
  type DiscographyTrack,
  getAlbumTracklist,
  getAlbumLeadTrack,
} from "../data";
import { RealMusicEmbedPlayer } from "./RealMusicEmbedPlayer";

interface AudioPlaybackDeckProps {
  artist: Artist;
  album: DiscographyItem;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showVideo: boolean;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onOpenTracklist: () => void;
  onToggleShowVideo: () => void;
  onSetIsPlaying?: (playing: boolean) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function parseDurationToSeconds(durationStr: string): number {
  if (!durationStr) return 180;
  const parts = durationStr.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 180;
}

export function AudioPlaybackDeck({
  artist,
  album,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  showVideo,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onOpenTracklist,
  onToggleShowVideo,
  onSetIsPlaying,
  onTimeUpdate,
}: AudioPlaybackDeckProps) {
  const [seekTime, setSeekTime] = useState<number | null>(null);

  const tracklist = getAlbumTracklist(artist.name, album);
  const currentTrack: DiscographyTrack =
    tracklist[currentTrackIndex] || {
      num: 1,
      title: getAlbumLeadTrack(album),
      duration: "3:30",
      isTitle: true,
    };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Active YouTube video ID for official track / MV
  const activeVideoId =
    currentTrack.youtubeVideoId ||
    album.youtubeVideoId ||
    "D8VEhcPeSlc"; // aespa Drama official MV as fallback

  // External streaming links
  const spotifyUrl =
    album.spotifyUrl ||
    `https://open.spotify.com/search/${encodeURIComponent(
      `${artist.name} ${album.title}`
    )}`;
  const ytMusicUrl =
    album.youtubeMusicUrl ||
    `https://music.youtube.com/search?q=${encodeURIComponent(
      `${artist.name} ${album.title}`
    )}`;
  const appleMusicUrl =
    album.appleMusicUrl ||
    `https://music.apple.com/search?term=${encodeURIComponent(
      `${artist.name} ${album.title}`
    )}`;

  const handleSeekInternal = (seconds: number) => {
    setSeekTime(seconds);
    onSeek(seconds);
    // Reset seek flag shortly after
    setTimeout(() => setSeekTime(null), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl p-4 md:p-5 shadow-xl shadow-primary/10 overflow-hidden mb-6 group"
      style={{
        background: `linear-gradient(135deg, ${artist.color}18 0%, rgba(18, 16, 28, 0.96) 100%)`,
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ backgroundColor: artist.color }}
      />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none bg-primary/20" />

      {/* Ambient background glow */}

      <div className="relative z-10 space-y-4">
        {/* Top bar: Now Playing Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            {/* Spinning Disc Visualizer */}
            <div className="relative w-12 h-12 rounded-full flex-shrink-0 bg-black/70 border border-border/80 flex items-center justify-center shadow-lg shadow-black/50 overflow-hidden">
              <div
                className={`w-full h-full flex items-center justify-center ${
                  isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                }`}
              >
                <Disc3
                  className="w-9 h-9"
                  style={{
                    color: isPlaying ? artist.color : "rgba(255,255,255,0.6)",
                  }}
                />
              </div>
              {/* Center disc spindle */}
              <div
                className="absolute w-3 h-3 rounded-full border border-black"
                style={{ backgroundColor: artist.accentColor || "#00B4D8" }}
              />
            </div>

            {/* Track & Album Title */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  {currentTrack.isTitle || currentTrack.hasMv ? "Official Music" : "Official Audio"}
                </span>

                {/* Show/Hide MV/Video Toggle */}
                <button
                  onClick={onToggleShowVideo}
                  className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 border transition-all cursor-pointer ${
                    showVideo
                      ? "bg-red-500/20 text-red-300 border-red-500/40"
                      : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  <Tv className="w-3 h-3" />
                  <span>
                    {showVideo
                      ? currentTrack.isTitle || currentTrack.hasMv ? "Hide MV" : "Hide Video"
                      : currentTrack.isTitle || currentTrack.hasMv ? "Watch MV" : "Watch Video"}
                  </span>
                </button>

                {currentTrack.isTitle ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF1C8E]/30 to-[#00B4D8]/30 text-white border border-primary/40 uppercase">
                    Title Track
                  </span>
                ) : currentTrack.hasMv ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 uppercase flex items-center gap-1">
                    <Tv className="w-2.5 h-2.5" /> MV
                  </span>
                ) : (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 uppercase flex items-center gap-1">
                    <Music className="w-2.5 h-2.5" /> Audio
                  </span>
                )}
              </div>

              <h4 className="font-display font-black text-base text-foreground truncate max-w-xs sm:max-w-md">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {artist.name} · <span className="text-foreground/80">{album.title}</span> ({album.year})
              </p>
            </div>
          </div>

          {/* Equalizer Wave + Tracklist Modal Trigger */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Pulsing Audio Equalizer Bars */}
            <div className="flex items-end gap-1 h-6 px-2.5 py-1 bg-black/40 rounded-lg border border-border/60">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8].map((h, i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? {
                          height: [
                            `${Math.max(4, h * 18)}px`,
                            `${Math.max(6, (1 - h * 0.5) * 20)}px`,
                            `${Math.max(4, h * 18)}px`,
                          ],
                        }
                      : { height: "4px" }
                  }
                  transition={{
                    duration: 0.6 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 rounded-full bg-gradient-to-t from-primary to-[#00B4D8]"
                />
              ))}
            </div>

            {/* Open Tracklist Button */}
            <button
              onClick={onOpenTracklist}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border hover:border-primary/40 transition-colors"
            >
              <ListMusic className="w-3.5 h-3.5 text-primary" />
              <span>Tracklist</span>
              <span className="text-[10px] text-muted-foreground">
                ({tracklist.length})
              </span>
            </button>
          </div>
        </div>

        {/* Scrubber Progress Bar */}
        <div className="space-y-1.5">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              handleSeekInternal(pos * duration);
            }}
            className="group/scrub relative h-2.5 bg-secondary/80 hover:bg-secondary rounded-full cursor-pointer overflow-hidden transition-all"
          >
            {/* Elapsed Fill Bar with Gradient */}
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, #FF1C8E, ${artist.color || "#00B4D8"})`,
              }}
            />
            {/* Scrubber Glow Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-primary/50 opacity-0 group-hover/scrub:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `calc(${progressPercent}% - 7px)` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span className="text-foreground/70">
              Track {currentTrack.num} of {tracklist.length}
            </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls & Streaming Shortcuts */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Main Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevTrack}
              disabled={currentTrackIndex === 0}
              className="p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="white" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="white" />
              )}
            </button>

            <button
              onClick={onNextTrack}
              disabled={currentTrackIndex === tracklist.length - 1}
              className="p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5 ml-3 pl-3 border-l border-border">
              <button
                onClick={onToggleMute}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1.5 bg-secondary rounded-lg accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Direct External Streaming Links */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground hidden md:inline mr-1">
              Stream on:
            </span>

            {/* Spotify */}
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-[11px] font-semibold transition-colors"
              title="Listen on Spotify"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* YouTube Music */}
            <a
              href={ytMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-semibold transition-colors"
              title="Listen on YouTube Music"
            >
              <span>YT Music</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Apple Music */}
            <a
              href={appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FA243C]/10 hover:bg-[#FA243C]/20 border border-[#FA243C]/30 text-[#FA243C] text-[11px] font-semibold transition-colors"
              title="Listen on Apple Music"
            >
              <span>Apple</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
