import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Play,
  Pause,
  Disc3,
  ExternalLink,
  Sparkles,
  Music,
  CheckCircle2,
  Tv,
} from "lucide-react";
import {
  type Artist,
  type DiscographyItem,
  type DiscographyTrack,
  getAlbumTracklist,
} from "../data";

interface TracklistModalProps {
  artist: Artist;
  album: DiscographyItem | null;
  currentPlayingAlbumTitle: string | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  onClose: () => void;
  onSelectTrack: (album: DiscographyItem, trackIndex: number) => void;
}

export function TracklistModal({
  artist,
  album,
  currentPlayingAlbumTitle,
  currentTrackIndex,
  isPlaying,
  onClose,
  onSelectTrack,
}: TracklistModalProps) {
  if (!album) return null;

  const tracklist: DiscographyTrack[] = getAlbumTracklist(artist.name, album);
  const isThisAlbumActive = currentPlayingAlbumTitle === album.title;

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[88vh] flex flex-col"
          style={{
            borderColor: `${artist.color}40`,
          }}
        >
          {/* Header Banner */}
          <div
            className="relative p-5 md:p-6 border-b border-border/80 flex items-center justify-between"
            style={{
              background: `linear-gradient(135deg, ${artist.color}25 0%, rgba(20, 18, 30, 0.98) 100%)`,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                style={{ backgroundColor: artist.color + "35" }}
              >
                <Disc3
                  className={`w-8 h-8 ${
                    isThisAlbumActive && isPlaying
                      ? "animate-[spin_4s_linear_infinite]"
                      : ""
                  }`}
                  style={{ color: artist.color }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {album.type} · {album.year}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    Studio Master Recordings
                  </span>
                </div>
                <h3 className="font-display text-xl font-black text-foreground">
                  {album.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {artist.name} · {tracklist.length} tracks
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Tracklist Content */}
          <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-2 divide-y divide-border/40">
            <div className="flex items-center justify-between pb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Official Tracklist (Select to play in app)
              </p>
              <span className="text-[10px] text-primary font-mono">
                Click song to listen
              </span>
            </div>

            {tracklist.map((track, idx) => {
              const isCurrentTrackPlaying =
                isThisAlbumActive && currentTrackIndex === idx;

              return (
                <div
                  key={track.num}
                  onClick={() => onSelectTrack(album, idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isCurrentTrackPlaying
                      ? "bg-primary/15 border border-primary/40 text-primary shadow-sm"
                      : "hover:bg-secondary/60 text-foreground/90 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Track Number / Play state */}
                    <div className="w-7 text-center flex-shrink-0">
                      {isCurrentTrackPlaying ? (
                        <div className="flex items-end justify-center gap-0.5 h-4">
                          {[0.4, 0.9, 0.6].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={
                                isPlaying
                                  ? {
                                      height: [
                                        `${Math.max(4, h * 14)}px`,
                                        `${Math.max(6, (1 - h * 0.5) * 16)}px`,
                                        `${Math.max(4, h * 14)}px`,
                                      ],
                                    }
                                  : { height: "4px" }
                              }
                              transition={{
                                duration: 0.5 + i * 0.1,
                                repeat: Infinity,
                              }}
                              className="w-1 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground">
                          {track.num < 10 ? `0${track.num}` : track.num}
                        </span>
                      )}
                    </div>

                    {/* Track Title & Title Tag */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-semibold truncate ${
                            isCurrentTrackPlaying
                              ? "text-primary font-bold"
                              : "text-foreground"
                          }`}
                        >
                          {track.title}
                        </span>

                        {track.isTitle ? (
                          <>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/40 uppercase">
                              Title
                            </span>
                            {track.youtubeVideoId && (
                              <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-red-500/15 text-red-400 border border-red-500/30 uppercase flex items-center gap-0.5">
                                <Tv className="w-2.5 h-2.5" /> MV
                              </span>
                            )}
                          </>
                        ) : track.hasMv ? (
                          <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-red-500/15 text-red-400 border border-red-500/30 uppercase flex items-center gap-0.5">
                            <Tv className="w-2.5 h-2.5" /> MV
                          </span>
                        ) : (
                          <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 uppercase flex items-center gap-0.5">
                            <Music className="w-2.5 h-2.5" /> AUDIO
                          </span>
                        )}
                      </div>
                      {isCurrentTrackPlaying && (
                        <span className="text-[10px] text-primary/80 font-mono">
                          {isPlaying ? "Playing official track" : "Paused"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Duration and Play Action */}
                  <div className="flex items-center gap-3 flex-shrink-0 pl-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {track.duration}
                    </span>

                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrentTrackPlaying
                          ? "bg-primary text-white scale-105"
                          : "bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      {isCurrentTrackPlaying && isPlaying ? (
                        <Pause className="w-3.5 h-3.5" fill="currentColor" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct External Streaming Links Footer */}
          <div className="p-4 md:p-5 bg-card/90 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <p className="text-[11px] font-semibold text-muted-foreground">
                External Full-Album Streaming
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Listen on Spotify, YouTube Music, or Apple Music
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-xs font-semibold transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={ytMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition-colors"
              >
                <span>YT Music</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FA243C]/10 hover:bg-[#FA243C]/20 border border-[#FA243C]/30 text-[#FA243C] text-xs font-semibold transition-colors"
              >
                <span>Apple Music</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
