"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const MUSIC_SRC = "/music/interacive.mp3";

export default function BackgroundMusic() {
  const { t } = useLocale();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set volume to ambient level (0.3) when audio loads
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.25;
    }
  }, [isMounted]);

  // Try autoplay on mount (browsers may block until user interaction)
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [isMounted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
        aria-label="Background music"
      />
      {/* Lusion-style: minimal pill button, bottom-left, visible on light & dark backgrounds */}
      <motion.button
        type="button"
        onClick={togglePlay}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-20 left-6 right-auto sm:bottom-6 z-[100] flex items-center gap-2 rounded-full border border-black/20 bg-black/40 px-4 py-2.5 backdrop-blur-md shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:bg-black/55 hover:border-[#6B9FF7]/50 hover:shadow-[#6B9FF7]/25"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause" : "Play"}
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300 ${isHovered ? "bg-[#6B9FF7]/60" : "bg-white/30"}`}>
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg
                key="pause"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="h-4 w-4 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7L8 5z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap text-xs font-medium uppercase tracking-wider text-white/90"
            >
              {isPlaying ? t("common.soundOn") : t("common.soundOff")}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
