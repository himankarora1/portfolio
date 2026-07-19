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

const captureVideoFrame = (el) => {
  try {
    if (!el || el.videoWidth < 2 || el.videoHeight < 2) return null;
    const canvas = document.createElement('canvas');
    canvas.width = el.videoWidth;
    canvas.height = el.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(el, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.72);
  } catch {
    return null;
  }
};

/**
 * Home hero montage — unique stills + short video beats.
 * Videos show a frame still from that clip while loading (never the jacket poster loop).
 */
const ArtistHomeMontage = ({ slides, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFrame, setVideoFrame] = useState(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const frameCacheRef = useRef({});

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
    setVideoFrame(null);

    const advance = () => {
      setIndex((i) => (i + 1) % slides.length);
    };

    if (slide.type !== 'video') {
      timerRef.current = setTimeout(advance, slide.duration);
      return () => clearTimeout(timerRef.current);
    }

    const cacheKey = `${slide.src}@${slide.startAt || 0}`;
    if (frameCacheRef.current[cacheKey]) {
      setVideoFrame(frameCacheRef.current[cacheKey]);
    }

    const el = videoRef.current;
    if (!el) {
      timerRef.current = setTimeout(advance, slide.duration);
      return () => clearTimeout(timerRef.current);
    }

    let cancelled = false;
    let started = false;
    const startAt = slide.startAt || 0;
    const playFor = slide.playFor || slide.duration / 1000;

    const stashFrame = () => {
      if (cancelled) return;
      const dataUrl = captureVideoFrame(el);
      if (dataUrl) {
        frameCacheRef.current[cacheKey] = dataUrl;
        setVideoFrame(dataUrl);
      }
    };

    const tryPlay = async () => {
      if (cancelled || started) return;
      started = true;
      applySafariVideoAttrs(el);

      try {
        if (startAt > 0 && Number.isFinite(el.duration) && el.duration > startAt + 0.25) {
          el.currentTime = startAt;
        }
      } catch {
        /* play from 0 */
      }

      try {
        const playPromise = el.play();
        if (playPromise?.then) await playPromise;
        if (!cancelled) {
          stashFrame();
          setVideoReady(true);
        }
      } catch {
        if (!cancelled) setVideoReady(false);
      }
    };

    const prepareFrameThenPlay = async () => {
      if (cancelled || started) return;
      applySafariVideoAttrs(el);

      const seekTo = startAt > 0 ? startAt : 0.05;
      let handled = false;

      const finish = () => {
        if (cancelled || handled) return;
        handled = true;
        stashFrame();
        tryPlay();
      };

      try {
        if (Number.isFinite(el.duration) && el.duration > seekTo) {
          el.addEventListener('seeked', finish, { once: true });
          el.currentTime = seekTo;
          setTimeout(finish, 700);
          return;
        }
      } catch {
        /* fall through */
      }

      finish();
    };

    const onPlaying = () => {
      if (!cancelled) {
        stashFrame();
        setVideoReady(true);
      }
    };

    const onTimeUpdate = () => {
      if (el.currentTime >= startAt + playFor) {
        el.pause();
      }
    };

    const onError = () => {
      if (!cancelled) setVideoReady(false);
    };

    applySafariVideoAttrs(el);
    el.pause();
    if (el.getAttribute('src') !== slide.src) {
      el.setAttribute('src', slide.src);
    }
    el.load();

    el.addEventListener('playing', onPlaying);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('error', onError);

    if (el.readyState >= 2) prepareFrameThenPlay();
    else {
      el.addEventListener('loadeddata', prepareFrameThenPlay, { once: true });
      el.addEventListener('canplay', prepareFrameThenPlay, { once: true });
    }

    const metaFallback = setTimeout(() => {
      if (!cancelled) prepareFrameThenPlay();
    }, 1400);

    timerRef.current = setTimeout(advance, slide.duration);

    return () => {
      cancelled = true;
      clearTimeout(metaFallback);
      clearTimeout(timerRef.current);
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('error', onError);
      el.pause();
    };
  }, [slide, slides.length]);

  if (!slides?.length) return null;

  const position =
    slide.objectPosition ||
    (isLandscape ? 'center center' : 'center 24%');

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
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
              {/* Frame from THIS video while it loads — black if capture isn't ready yet */}
              {videoFrame && !videoReady && (
                <img
                  src={videoFrame}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: position }}
                />
              )}
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
