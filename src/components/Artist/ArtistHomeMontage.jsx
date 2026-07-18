import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CROSSFADE_S = 1.35;

const kenBurnsMotion = (kind, durationMs) => {
  const duration = Math.max((durationMs || 5000) / 1000, CROSSFADE_S + 0.4);
  const ease = 'linear';

  switch (kind) {
    case 'in-left':
      return {
        initial: { scale: 1.06, x: '2.5%', y: '0%' },
        animate: { scale: 1.14, x: '-2%', y: '-1%' },
        transition: { scale: { duration, ease }, x: { duration, ease }, y: { duration, ease } },
      };
    case 'in-up':
      return {
        initial: { scale: 1.05, x: '0%', y: '2%' },
        animate: { scale: 1.13, x: '0%', y: '-2%' },
        transition: { scale: { duration, ease }, x: { duration, ease }, y: { duration, ease } },
      };
    case 'out-right':
      return {
        initial: { scale: 1.14, x: '-2%', y: '0%' },
        animate: { scale: 1.06, x: '2%', y: '1%' },
        transition: { scale: { duration, ease }, x: { duration, ease }, y: { duration, ease } },
      };
    case 'in-right':
    default:
      return {
        initial: { scale: 1.06, x: '-2.5%', y: '0%' },
        animate: { scale: 1.14, x: '2%', y: '1%' },
        transition: { scale: { duration, ease }, x: { duration, ease }, y: { duration, ease } },
      };
  }
};

const applySafariVideoAttrs = (el) => {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.playsInline = true;
  el.setAttribute('muted', '');
  el.setAttribute('playsinline', '');
  el.setAttribute('webkit-playsinline', '');
};

/**
 * Home hero montage — unique stills + short video beats.
 * Safari-safe: metadata before seek/play; soft fill until first frame.
 */
const ArtistHomeMontage = ({ slides, poster, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const slide = slides[index];
  const nextIndex = (index + 1) % slides.length;
  const isLandscape = slide?.orientation === 'landscape';
  const isImage = slide?.type === 'image';
  const burns = isImage
    ? kenBurnsMotion(slide.kenBurns || 'in-right', slide.duration)
    : null;

  useEffect(() => {
    const next = slides[nextIndex];
    if (!next) return;

    if (next.type === 'image') {
      const img = new Image();
      img.src = next.src;
      return;
    }

    const warm = document.createElement('video');
    applySafariVideoAttrs(warm);
    warm.preload = 'auto';
    warm.src = next.src;
    warm.load();
  }, [nextIndex, slides]);

  useLayoutEffect(() => {
    if (!slide) return undefined;

    setVideoReady(false);
    const advance = () => {
      setIndex((i) => (i + 1) % slides.length);
    };

    if (slide.type !== 'video') {
      timerRef.current = setTimeout(advance, slide.duration);
      return () => clearTimeout(timerRef.current);
    }

    const el = videoRef.current;
    if (!el) {
      timerRef.current = setTimeout(advance, slide.duration);
      return () => clearTimeout(timerRef.current);
    }

    let cancelled = false;
    // Prefer start of clip on first paint — mid-file seeks often black out on iOS Safari
    const startAt = slide.startAt || 0;
    const playFor = slide.playFor || slide.duration / 1000;

    const tryPlay = async () => {
      if (cancelled) return;
      applySafariVideoAttrs(el);

      if (startAt > 0) {
        try {
          if (Number.isFinite(el.duration) && el.duration > startAt + 0.25) {
            el.currentTime = startAt;
          }
        } catch {
          /* play from 0 */
        }
      }

      try {
        const playPromise = el.play();
        if (playPromise?.then) await playPromise;
        if (!cancelled) setVideoReady(true);
      } catch {
        if (!cancelled) setVideoReady(false);
      }
    };

    const onPlaying = () => {
      if (!cancelled) setVideoReady(true);
    };

    const onTimeUpdate = () => {
      if (el.currentTime >= startAt + playFor) {
        el.pause();
      }
    };

    applySafariVideoAttrs(el);
    el.pause();
    if (el.getAttribute('src') !== slide.src) {
      el.setAttribute('src', slide.src);
    }
    el.load();

    const onCanPlay = () => {
      tryPlay();
    };

    el.addEventListener('playing', onPlaying);
    el.addEventListener('timeupdate', onTimeUpdate);

    if (el.readyState >= 2) onCanPlay();
    else {
      el.addEventListener('loadedmetadata', onCanPlay, { once: true });
      el.addEventListener('canplay', onCanPlay, { once: true });
    }

    const metaFallback = setTimeout(() => {
      if (!cancelled) tryPlay();
    }, 1200);

    timerRef.current = setTimeout(advance, slide.duration);

    return () => {
      cancelled = true;
      clearTimeout(metaFallback);
      clearTimeout(timerRef.current);
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.pause();
    };
  }, [slide, slides.length]);

  if (!slides?.length) return null;

  const position =
    slide.objectPosition ||
    (isLandscape ? 'center center' : 'center 24%');

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {/* Persistent still under videos so Safari never flashes pure black */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          style={{ objectPosition: 'center 28%' }}
        />
      )}

      <AnimatePresence mode="sync">
        <motion.div
          key={`${slide.type}-${slide.src}-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_S, ease: 'easeInOut' }}
        >
          {isImage ? (
            <motion.div
              className="absolute inset-0"
              initial={burns.initial}
              animate={burns.animate}
              transition={burns.transition}
            >
              <img
                src={slide.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover blur-[0.5px] sm:blur-0"
                style={{ objectPosition: position }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.06 }}
              transition={{
                duration: Math.max((slide.duration || 4000) / 1000, CROSSFADE_S),
                ease: 'linear',
              }}
            >
              <video
                ref={videoRef}
                className={`h-full w-full object-cover blur-[0.5px] sm:blur-0 transition-opacity duration-500 ${
                  videoReady ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ objectPosition: position }}
                muted
                playsInline
                autoPlay
                preload="auto"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
    </div>
  );
};

export default ArtistHomeMontage;
