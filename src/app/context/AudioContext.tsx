import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Minus,
  Tv,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  type Artist,
  type DiscographyItem,
  type DiscographyTrack,
  getAlbumTracklist,
  getAlbumLeadTrack,
} from "../data";
import { parseDurationToSeconds } from "../components/AudioPlaybackDeck";
import { RealMusicEmbedPlayer } from "../components/RealMusicEmbedPlayer";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

interface AudioContextType {
  playingArtist: Artist | null;
  playingAlbum: DiscographyItem | null;
  currentTrackIndex: number;
  currentTrack: DiscographyTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showVideo: boolean;
  videoMode: "mini" | "expanded";
  isDeckExpanded: boolean;
  isInDiscographyView: boolean;
  seekTime: number | null;
  tracklistModalData: { artist: Artist; album: DiscographyItem } | null;
  playAlbum: (artist: Artist, album: DiscographyItem, trackIndex?: number) => void;
  playTrack: (artist: Artist, album: DiscographyItem, trackIndex: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  prevTrack: () => void;
  nextTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShowVideo: () => void;
  setShowVideo: (show: boolean) => void;
  setVideoMode: (mode: "mini" | "expanded") => void;
  toggleVideoMode: () => void;
  expandVideo: () => void;
  minimizeVideo: () => void;
  setIsInDiscographyView: (inDiscography: boolean) => void;
  toggleDeckExpanded: () => void;
  setIsDeckExpanded: (expanded: boolean) => void;
  closePlayer: () => void;
  openTracklistModal: (artist: Artist, album: DiscographyItem) => void;
  closeTracklistModal: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [playingArtist, setPlayingArtist] = useState<Artist | null>(null);
  const [playingAlbum, setPlayingAlbum] = useState<DiscographyItem | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [videoMode, setVideoMode] = useState<"mini" | "expanded">("mini");
  const [isInDiscographyView, setIsInDiscographyView] = useState<boolean>(false);
  const [isDeckExpanded, setIsDeckExpanded] = useState<boolean>(false);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [tracklistModalData, setTracklistModalData] = useState<{
    artist: Artist;
    album: DiscographyItem;
  } | null>(null);

  // Compute tracklist and active track
  const tracklist =
    playingArtist && playingAlbum
      ? getAlbumTracklist(playingArtist.name, playingAlbum)
      : [];

  const currentTrack: DiscographyTrack | null =
    tracklist[currentTrackIndex] ||
    (playingAlbum
      ? {
          num: 1,
          title: getAlbumLeadTrack(playingAlbum),
          duration: "3:30",
          isTitle: true,
        }
      : null);

  const duration = currentTrack
    ? parseDurationToSeconds(currentTrack.duration)
    : 210;

  // Fallback playback timer for tracking elapsed time
  useEffect(() => {
    let timer: any;
    if (isPlaying && playingAlbum && playingArtist) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration && duration > 0) {
            if (currentTrackIndex < tracklist.length - 1) {
              setCurrentTrackIndex((prevIdx) => prevIdx + 1);
              return 0;
            } else {
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playingAlbum, playingArtist, currentTrackIndex, duration, tracklist.length]);

  const playAlbum = useCallback(
    (artist: Artist, album: DiscographyItem, startTrackIdx?: number) => {
      if (playingAlbum?.title === album.title && playingArtist?.name === artist.name) {
        if (startTrackIdx !== undefined && startTrackIdx !== currentTrackIndex) {
          setCurrentTrackIndex(startTrackIdx);
          setCurrentTime(0);
          setIsPlaying(true);
        } else {
          setIsPlaying((prev) => !prev);
        }
      } else {
        const tracks = getAlbumTracklist(artist.name, album);
        let idx = startTrackIdx;
        if (idx === undefined) {
          const titleIdx = tracks.findIndex((t) => t.isTitle);
          idx = titleIdx >= 0 ? titleIdx : 0;
        }
        setPlayingArtist(artist);
        setPlayingAlbum(album);
        setCurrentTrackIndex(idx);
        setCurrentTime(0);
        setIsPlaying(true);
      }
    },
    [playingAlbum?.title, playingArtist?.name, currentTrackIndex]
  );

  const playTrack = useCallback(
    (artist: Artist, album: DiscographyItem, trackIndex: number) => {
      setPlayingArtist(artist);
      setPlayingAlbum(album);
      setCurrentTrackIndex(trackIndex);
      setCurrentTime(0);
      setIsPlaying(true);
    },
    []
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const prevTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((i) => i - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [currentTrackIndex]);

  const nextTrack = useCallback(() => {
    if (currentTrackIndex < tracklist.length - 1) {
      setCurrentTrackIndex((i) => i + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [currentTrackIndex, tracklist.length]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(seconds);
    setSeekTime(seconds);
    setTimeout(() => setSeekTime(null), 300);
  }, []);

  const setVolume = useCallback(
    (vol: number) => {
      setVolumeState(vol);
      if (vol > 0 && isMuted) {
        setIsMuted(false);
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShowVideo = useCallback(() => {
    setShowVideo((prev) => !prev);
  }, []);

  const toggleVideoMode = useCallback(() => {
    setVideoMode((prev) => (prev === "mini" ? "expanded" : "mini"));
  }, []);

  const expandVideo = useCallback(() => {
    setShowVideo(true);
    setVideoMode("expanded");
  }, []);

  const minimizeVideo = useCallback(() => {
    setShowVideo(true);
    setVideoMode("mini");
  }, []);

  const toggleDeckExpanded = useCallback(() => {
    setIsDeckExpanded((prev) => !prev);
  }, []);

  const closePlayer = useCallback(() => {
    setIsPlaying(false);
    setPlayingAlbum(null);
    setPlayingArtist(null);
    setShowVideo(false);
    setIsDeckExpanded(false);
  }, []);

  const openTracklistModal = useCallback(
    (artist: Artist, album: DiscographyItem) => {
      setTracklistModalData({ artist, album });
    },
    []
  );

  const closeTracklistModal = useCallback(() => {
    setTracklistModalData(null);
  }, []);

  // Active YouTube video ID
  const activeVideoId =
    currentTrack?.youtubeVideoId ||
    playingAlbum?.youtubeVideoId ||
    "D8VEhcPeSlc";

  return (
    <AudioContext.Provider
      value={{
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
        videoMode,
        isInDiscographyView,
        isDeckExpanded,
        seekTime,
        tracklistModalData,
        playAlbum,
        playTrack,
        togglePlay,
        setIsPlaying,
        prevTrack,
        nextTrack,
        seek,
        setVolume,
        toggleMute,
        toggleShowVideo,
        setShowVideo,
        setVideoMode,
        toggleVideoMode,
        expandVideo,
        minimizeVideo,
        setIsInDiscographyView,
        toggleDeckExpanded,
        setIsDeckExpanded,
        closePlayer,
        openTracklistModal,
        closeTracklistModal,
      }}
    >
      {/* Single Persistent Video & Audio Player Container (Never unmounts on toggle to prevent restarting) */}
      {playingAlbum && playingArtist && (
        <div
          className={`fixed transition-all duration-300 pointer-events-auto ${
            !showVideo
              ? "w-0 h-0 opacity-0 pointer-events-none overflow-hidden bottom-0 right-0 z-[-10]"
              : videoMode === "expanded"
              ? "left-0 lg:left-64 right-0 top-16 bottom-24 sm:bottom-20 z-50 p-3 sm:p-6 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center overflow-y-auto"
              : "z-45 bottom-[210px] sm:bottom-[200px] lg:bottom-[135px] right-3 sm:right-6 md:right-8 w-[270px] xs:w-[310px] sm:w-[370px] md:w-[410px] max-w-[calc(100vw-24px)] rounded-2xl border border-primary/40 shadow-2xl bg-black/95 backdrop-blur-2xl overflow-hidden flex flex-col group"
          }`}
          style={{
            boxShadow:
              showVideo && videoMode === "mini"
                ? `0 20px 45px -10px ${playingArtist.color || "#FF1C8E"}50, 0 10px 30px rgba(0,0,0,0.95)`
                : undefined,
          }}
        >
          {/* HEADER BAR (Visible when video is shown) */}
          {showVideo && (
            videoMode === "expanded" ? (
              <div className="w-full max-w-4xl flex items-center justify-between px-4 py-3 bg-card/95 border border-primary/30 rounded-2xl text-foreground shadow-xl mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-2 rounded-xl bg-primary/20 text-primary flex-shrink-0">
                    <Tv className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm sm:text-base text-foreground truncate">
                      {currentTrack?.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {playingArtist.name} · {playingAlbum.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setVideoMode("mini")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground border border-border transition-colors cursor-pointer"
                    title="Minimize to Bottom-Right Floating Player"
                  >
                    <Minimize2 className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline">Floating Mini Player</span>
                  </button>

                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Close Video (Audio continues)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-card/95 via-secondary/90 to-card/95 border-b border-border/80 text-xs select-none">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="p-1 rounded bg-primary/20 text-primary">
                    <Tv className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                      <p className="font-bold text-[11px] sm:text-xs truncate text-foreground leading-tight">
                        {currentTrack?.title}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate leading-tight">
                      {playingArtist.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <button
                    onClick={() => setVideoMode("expanded")}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                    title="Expand to Main View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                    title="Hide Video (Audio continues)"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                    title="Close Video"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          )}

          {/* SINGLE REAL MUSIC EMBED PLAYER INSTANCE */}
          <div
            className={
              !showVideo
                ? "w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
                : videoMode === "expanded"
                ? "w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-primary/40 shadow-2xl bg-black relative"
                : "w-full aspect-video bg-black relative overflow-hidden"
            }
          >
            <RealMusicEmbedPlayer
              videoId={activeVideoId}
              trackKey={`${playingArtist?.name}-${playingAlbum?.title}-${currentTrackIndex}-${currentTrack?.title}`}
              title={currentTrack?.title || ""}
              artistName={playingArtist?.name || ""}
              isPlaying={isPlaying}
              volume={volume}
              isMuted={isMuted}
              seekTime={seekTime}
              showVideoPlayer={showVideo}
              onTimeUpdate={(cur) => setCurrentTime(cur)}
              onEnded={() => nextTrack()}
              onStateChange={(statePlaying) => setIsPlaying(statePlaying)}
            />
          </div>

          {/* FOOTER CONTROLS BAR (Visible when video is shown) */}
          {showVideo && (
            videoMode === "expanded" ? (
              <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-card/95 border border-primary/30 rounded-2xl text-foreground shadow-xl mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTrack}
                    disabled={currentTrackIndex === 0}
                    className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary disabled:opacity-30 text-foreground transition-colors cursor-pointer"
                    title="Previous Track"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    disabled={currentTrackIndex === tracklist.length - 1}
                    className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary disabled:opacity-30 text-foreground transition-colors cursor-pointer"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="w-full sm:w-64">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      seek(pos * duration);
                    }}
                    className="h-2 bg-secondary hover:bg-secondary/80 rounded-full cursor-pointer overflow-hidden relative"
                  >
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-150"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground cursor-pointer">
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
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1.5 bg-secondary rounded-lg accent-primary cursor-pointer"
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                    title="Watch on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="w-full p-2 bg-gradient-to-t from-black via-card/95 to-secondary/90 border-t border-border/60 flex flex-col gap-1.5">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    seek(pos * duration);
                  }}
                  className="h-1.5 bg-secondary hover:bg-secondary/80 rounded-full cursor-pointer overflow-hidden relative"
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-150"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-1 text-xs px-0.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevTrack}
                      disabled={currentTrackIndex === 0}
                      className="p-1 text-foreground/80 hover:text-foreground disabled:opacity-30 cursor-pointer"
                      title="Previous Track"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={nextTrack}
                      disabled={currentTrackIndex === tracklist.length - 1}
                      className="p-1 text-foreground/80 hover:text-foreground disabled:opacity-30 cursor-pointer"
                      title="Next Track"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[10px] font-mono text-muted-foreground ml-1">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center gap-1">
                      <button
                        onClick={toggleMute}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
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
                        className="w-10 sm:w-14 h-1 bg-secondary rounded-lg accent-primary cursor-pointer"
                      />
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-muted-foreground hover:text-foreground"
                      title="Watch on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {children}
    </AudioContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioProvider");
  }
  return context;
}

