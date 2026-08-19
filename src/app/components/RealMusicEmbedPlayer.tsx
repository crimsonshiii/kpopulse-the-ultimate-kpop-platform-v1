import React, { useEffect, useRef } from "react";

interface RealMusicEmbedPlayerProps {
  videoId: string;
  trackKey?: string;
  title: string;
  artistName: string;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  seekTime?: number | null;
  initialTime?: number;
  onStateChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  showVideoPlayer?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function RealMusicEmbedPlayer({
  videoId,
  trackKey,
  title,
  artistName,
  isPlaying,
  volume,
  isMuted,
  seekTime,
  initialTime = 0,
  onStateChange,
  onTimeUpdate,
  onEnded,
  showVideoPlayer = false,
}: RealMusicEmbedPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const playerReadyRef = useRef<boolean>(false);
  const currentVideoIdRef = useRef<string>(videoId);
  const lastLoadedKeyRef = useRef<string>(`${videoId}-${trackKey || ""}`);
  const isPlayingRef = useRef<boolean>(isPlaying);
  isPlayingRef.current = isPlaying;
  const isTransitioningRef = useRef<boolean>(false);
  const transitionTimeoutRef = useRef<any>(null);
  const timeIntervalRef = useRef<any>(null);

  // Initialize YouTube player once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || !containerRef.current) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
        playerReadyRef.current = false;
      }

      currentVideoIdRef.current = videoId;
      lastLoadedKeyRef.current = `${videoId}-${trackKey || ""}`;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: isPlayingRef.current ? 1 : 0,
          controls: 1,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          enablejsapi: 1,
          start: initialTime > 0 ? Math.floor(initialTime) : 0,
        },
        events: {
          onReady: (event: any) => {
            playerReadyRef.current = true;
            try {
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
                event.target.setVolume(Math.round(volume * 100));
              }
              if (initialTime > 0) {
                event.target.seekTo(initialTime, true);
              }
              if (isPlayingRef.current) {
                event.target.playVideo();
              }
            } catch (e) {}
          },
          onError: (event: any) => {
            console.warn("YouTube player error event code:", event.data);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0, BUFFERING = 3, UNSTARTED = -1, CUED = 5
            if (event.data === 1) {
              isTransitioningRef.current = false;
              onStateChange?.(true);
            } else if (event.data === 2) {
              // Ignore pause events while transitioning between tracks
              if (!isTransitioningRef.current) {
                onStateChange?.(false);
              }
            } else if (event.data === 0) {
              // Track ended - notify listener to auto-advance
              onEnded?.();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
        playerReadyRef.current = false;
      }
    };
  }, []); // Run once on mount

  // Load new video ONLY when videoId or trackKey actually changes
  useEffect(() => {
    if (!playerRef.current || !playerReadyRef.current) {
      currentVideoIdRef.current = videoId;
      lastLoadedKeyRef.current = `${videoId}-${trackKey || ""}`;
      return;
    }

    const newKey = `${videoId}-${trackKey || ""}`;
    if (lastLoadedKeyRef.current !== newKey) {
      lastLoadedKeyRef.current = newKey;
      currentVideoIdRef.current = videoId;

      isTransitioningRef.current = true;
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 2000);

      try {
        if (isPlaying) {
          playerRef.current.loadVideoById({
            videoId: videoId,
            startSeconds: 0,
          });
          playerRef.current.playVideo();
        } else {
          playerRef.current.cueVideoById({
            videoId: videoId,
            startSeconds: 0,
          });
        }
      } catch (e) {
        console.error("Failed to transition YouTube video:", e);
      }
    }
  }, [videoId, trackKey, isPlaying]);

  // Sync play / pause state
  useEffect(() => {
    if (!playerRef.current || !playerReadyRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        if (!isTransitioningRef.current) {
          playerRef.current.pauseVideo();
        }
      }
    } catch (e) {}
  }, [isPlaying]);

  // Sync volume & mute state
  useEffect(() => {
    if (!playerRef.current || !playerReadyRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(Math.round(volume * 100));
      }
    } catch (e) {}
  }, [volume, isMuted]);

  // Handle programmatic seek
  useEffect(() => {
    if (seekTime != null && playerRef.current && playerReadyRef.current) {
      try {
        playerRef.current.seekTo(seekTime, true);
        if (isPlaying) {
          playerRef.current.playVideo();
        }
      } catch (e) {}
    }
  }, [seekTime, isPlaying]);

  // Real-time tracking of current time & total duration
  useEffect(() => {
    if (isPlaying) {
      timeIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerReadyRef.current) {
          try {
            const cur = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (typeof cur === "number" && onTimeUpdate) {
              onTimeUpdate(Math.floor(cur), dur > 0 ? Math.floor(dur) : 0);
            }
          } catch (e) {}
        }
      }, 500);
    } else {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    }

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [isPlaying, onTimeUpdate]);

  return (
    <div className="w-full h-full">
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showVideoPlayer
            ? "aspect-video w-full h-full rounded-xl border border-border/80 bg-black shadow-lg"
            : "w-1 h-1 opacity-0 pointer-events-none absolute top-0 left-0 overflow-hidden"
        }`}
      >
        <div ref={containerRef} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
      </div>
    </div>
  );
}
