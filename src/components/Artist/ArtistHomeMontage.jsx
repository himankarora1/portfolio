import React, { useEffect, useRef, useState } from 'react';
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

/**
 * Home hero montage — unique stills + short video beats.
 * Stills use Ken Burns drift; all slides crossfade for a continuous blend.
 */
const ArtistHomeMontage = ({ slides, className = '' }) => {
  const [index, setIndex] = useState(0);
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
    if (next?.type === 'image') {
      const img = new Image();
      img.src = next.src;
    }
  }, [nextIndex, slides]);

  useEffect(() => {
    if (!slide) return undefined;

    const advance = () => {
      setIndex((i) => (i + 1) % slides.length);
    };

    if (slide.type === 'video' && videoRef.current) {
      const el = videoRef.current;
      const startAt = slide.startAt || 0;

      const onReady = () => {
        try {
          el.currentTime = startAt;
          const playPromise = el.play();
          if (playPromise?.catch) playPromise.catch(() => {});
        } catch {
          /* ignore seek errors */
        }
      };

      if (el.readyState >= 2) onReady();
      else el.addEventListener('loadeddata', onReady, { once: true });

      const onTimeUpdate = () => {
        if (el.currentTime >= startAt + (slide.playFor || slide.duration / 1000)) {
          el.pause();
        }
      };
      el.addEventListener('timeupdate', onTimeUpdate);
      timerRef.current = setTimeout(advance, slide.duration);

      return () => {
        el.removeEventListener('timeupdate', onTimeUpdate);
        clearTimeout(timerRef.current);
      };
    }

    timerRef.current = setTimeout(advance, slide.duration);
    return () => clearTimeout(timerRef.current);
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
                className="h-full w-full object-cover blur-[1.5px] sm:blur-[2.5px]"
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
                src={slide.src}
                className="h-full w-full object-cover blur-[1.5px] sm:blur-[2.5px]"
                style={{ objectPosition: position }}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-transparent sm:via-black/55 lg:via-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
    </div>
  );
};

export default ArtistHomeMontage;
