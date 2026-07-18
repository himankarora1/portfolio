import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Home hero montage — photos + short video beats.
 * Default: object-cover at scale 1 (no zoom-in, no translate → no black bars).
 * fit: 'containBlur' — show full frame (zoomed out) over a blurred cover fill (no side bars).
 */
const ArtistHomeMontage = ({ slides, className = '' }) => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const slide = slides[index];
  const nextIndex = (index + 1) % slides.length;
  const mediaScale = slide?.scale ?? 1;
  const isLandscape = slide?.orientation === 'landscape';
  const containBlur = slide?.fit === 'containBlur';

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

  const mediaStyle = {
    objectPosition: position,
    transform: mediaScale === 1 ? undefined : `scale(${mediaScale})`,
  };

  const renderMedia = (fitClass, extraClass = '', withRef = false) => {
    if (slide.type === 'video') {
      return (
        <video
          ref={withRef ? videoRef : undefined}
          src={slide.src}
          className={`h-full w-full ${fitClass} ${extraClass}`}
          style={mediaStyle}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      );
    }

    return (
      <img
        src={slide.src}
        alt=""
        aria-hidden="true"
        className={`h-full w-full ${fitClass} ${extraClass}`}
        style={mediaStyle}
      />
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={`${slide.type}-${slide.src}-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          {containBlur ? (
            <>
              {/* Soft fill so contain doesn't show black side bars */}
              <div className="absolute inset-0">
                {renderMedia('object-cover', 'scale-110 blur-2xl opacity-70')}
              </div>
              <div className="absolute inset-0">
                {renderMedia(
                  'object-contain',
                  'blur-[1px] sm:blur-[1.5px]',
                  true
                )}
              </div>
            </>
          ) : (
            renderMedia(
              'object-cover blur-[1.5px] sm:blur-[2.5px]',
              '',
              true
            )
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-transparent sm:via-black/55 lg:via-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
    </div>
  );
};

export default ArtistHomeMontage;
