import React from "react";
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
  Tv,
  Music,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import { useAudioPlayer } from "../context/AudioContext";
import { formatTime } from "./AudioPlaybackDeck";
import { type Artist, getAlbumTracklist } from "../data";

interface PersistentAudioBarProps {
  onSelectArtist?: (artist: Artist) => void;
}

export function PersistentAudioBar({ onSelectArtist }: PersistentAudioBarProps) {
  const {
    playingArtist,
    playingAlbum,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    showVideo,
    isDeckExpanded,
    togglePlay,
    prevTrack,
    nextTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShowVideo,
    toggleDeckExpanded,
    closePlayer,
    openTracklistModal,
  } = useAudioPlayer();

  if (!playingArtist || !playingAlbum || !currentTrack) {
    return null;
  }

  const tracklist = getAlbumTracklist(playingArtist.name, playingAlbum);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const spotifyUrl =
    playingAlbum.spotifyUrl ||
    `https://open.spotify.com/search/${encodeURIComponent(
      `${playingArtist.name} ${playingAlbum.title}`
    )}`;
  const ytMusicUrl =
    playingAlbum.youtubeMusicUrl ||
    `https://music.youtube.com/search?q=${encodeURIComponent(
      `${playingArtist.name} ${playingAlbum.title}`
    )}`;
  const appleMusicUrl =
    playingAlbum.appleMusicUrl ||
    `https://music.apple.com/search?term=${encodeURIComponent(
      `${playingArtist.name} ${playingAlbum.title}`
    )}`;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed z-40 inset-x-0 bottom-16 lg:bottom-0 p-2 sm:p-3 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div
          className="relative rounded-2xl border border-primary/30 shadow-2xl backdrop-blur-xl p-3 sm:p-4 text-foreground overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${playingArtist.color}25 0%, rgba(16, 14, 26, 0.96) 100%)`,
            boxShadow: `0 12px 35px -8px ${playingArtist.color}30, 0 4px 12px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: playingArtist.color }}
          />

          {/* Top Scrubber Progress Bar */}
          <div className="relative group/scrub mb-2.5">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                seek(pos * duration);
              }}
              className="relative h-2 bg-secondary/80 hover:bg-secondary rounded-full cursor-pointer overflow-hidden transition-all"
            >
              {/* Fill */}
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, #FF1C8E, ${playingArtist.color || "#00B4D8"})`,
                }}
              />
            </div>
          </div>

          {/* Player Controls & Track Info */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Spinning Disc & Track Info */}
            <div className="flex items-center gap-3 min-w-0 max-w-[45%] sm:max-w-[35%]">
              {/* Disc */}
              <button
                onClick={() => {
                  if (onSelectArtist) onSelectArtist(playingArtist);
                }}
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex-shrink-0 bg-black/80 border border-border/80 flex items-center justify-center shadow-md overflow-hidden group cursor-pointer"
                title={`View ${playingArtist.name}`}
              >
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                  }`}
                >
                  <Disc3
                    className="w-8 h-8 transition-transform group-hover:scale-110"
                    style={{
                      color: isPlaying ? playingArtist.color : "rgba(255,255,255,0.7)",
                    }}
                  />
                </div>
                <div
                  className="absolute w-2.5 h-2.5 rounded-full border border-black"
                  style={{ backgroundColor: playingArtist.accentColor || "#00B4D8" }}
                />
              </button>

              {/* Title & Artist */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase hidden sm:inline">
                    Background Audio
                  </span>

                  {currentTrack.isTitle ? (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-[#FF1C8E]/30 to-[#00B4D8]/30 text-white border border-primary/40 uppercase">
                      Title
                    </span>
                  ) : currentTrack.hasMv ? (
                    <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-red-500/15 text-red-400 border border-red-500/30 uppercase flex items-center gap-0.5">
                      <Tv className="w-2.5 h-2.5" /> MV
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 uppercase flex items-center gap-0.5">
                      <Music className="w-2.5 h-2.5" /> Audio
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-xs sm:text-sm text-foreground truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">
                  <button
                    onClick={() => {
                      if (onSelectArtist) onSelectArtist(playingArtist);
                    }}
                    className="hover:underline hover:text-foreground font-medium"
                  >
                    {playingArtist.name}
                  </button>{" "}
                  · <span className="text-foreground/70">{playingAlbum.title}</span>
                </p>
              </div>
            </div>

            {/* Center: Playback Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={prevTrack}
                disabled={currentTrackIndex === 0}
                className="p-1.5 sm:p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Track"
              >
                <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" fill="white" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" fill="white" />
                )}
              </button>

              <button
                onClick={nextTrack}
                disabled={currentTrackIndex === tracklist.length - 1}
                className="p-1.5 sm:p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Track"
              >
                <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Time */}
              <span className="text-[11px] font-mono text-muted-foreground ml-1 hidden md:inline">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right: Actions (MV, Tracklist, Volume, Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Watch MV Button */}
              <button
                onClick={toggleShowVideo}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase flex items-center gap-1 border transition-all cursor-pointer ${
                  showVideo
                    ? "bg-red-500/20 text-red-300 border-red-500/40"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
                title={showVideo ? "Hide Video Popup" : "Watch MV in background"}
              >
                <Tv className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {showVideo ? "Hide MV" : currentTrack.isTitle || currentTrack.hasMv ? "Watch MV" : "Video"}
                </span>
              </button>

              {/* Tracklist Modal */}
              <button
                onClick={() => openTracklistModal(playingArtist, playingAlbum)}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border hover:border-primary/40 transition-colors flex items-center gap-1"
                title="Open Tracklist"
              >
                <ListMusic className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Tracks</span>
              </button>

              {/* Volume Slider (Desktop) */}
              <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-border">
                <button
                  onClick={toggleMute}
                  className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-14 h-1.5 bg-secondary rounded-lg accent-primary cursor-pointer"
                />
              </div>

              {/* Dismiss / Close Player */}
              <button
                onClick={closePlayer}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors ml-1"
                title="Close Player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
