import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { motion } from "motion/react";
import { Move, Minus, Tv, ExternalLink } from "lucide-react";
import {
  type Artist,
  type DiscographyItem,
  type DiscographyTrack,
  getAlbumTracklist,
  getAlbumLeadTrack,
} from "../data";
import { parseDurationToSeconds } from "../components/AudioPlaybackDeck";
import { RealMusicEmbedPlayer } from "../components/RealMusicEmbedPlayer";

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
  isDeckExpanded: boolean;
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
            // Automatically advance to next track or stop
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
        toggleDeckExpanded,
        setIsDeckExpanded,
        closePlayer,
        openTracklistModal,
        closeTracklistModal,
      }}
    >
      {/* Background YouTube Audio Engine & Draggable Movable Floating MV Mini-Player */}
      {playingAlbum && playingArtist && (
        <>
          {/* Always-mounted audio engine (hidden when video popup is closed, visible when opened) */}
          <motion.div
            drag={showVideo}
            dragMomentum={false}
            dragElastic={0.08}
            className={`fixed z-50 transition-shadow ${
              showVideo
                ? "bottom-24 right-4 sm:bottom-24 sm:right-6 w-[320px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl border border-primary/40 bg-black/95 backdrop-blur-xl touch-none"
                : "w-0 h-0 opacity-0 pointer-events-none overflow-hidden"
            }`}
            style={{
              boxShadow: showVideo
                ? `0 20px 40px -10px ${playingArtist.color}40, 0 10px 25px rgba(0,0,0,0.8)`
                : undefined,
            }}
          >
            {showVideo && (
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-card/95 to-secondary/80 border-b border-border/80 text-xs select-none cursor-grab active:cursor-grabbing group">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="p-1 rounded bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <Move className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                      <p className="font-bold text-[12px] truncate text-foreground leading-tight">
                        {currentTrack?.title}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate leading-tight">
                      {playingArtist.name} · <span className="opacity-75">Drag to move anywhere</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="Watch on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="Close Video (Audio will keep playing)"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <div className={showVideo ? "p-2.5 bg-black/60" : ""}>
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
                onTimeUpdate={(cur, dur) => {
                  setCurrentTime(cur);
                }}
                onEnded={() => {
                  nextTrack();
                }}
                onStateChange={(statePlaying) => {
                  setIsPlaying(statePlaying);
                }}
              />
            </div>
          </motion.div>
        </>
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
