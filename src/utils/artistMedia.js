/**
 * Cinematic artist media map — one primary visual per page purpose.
 * Warm stage light / black canvas; photos carry the color.
 */
export const artistMedia = {
  home: {
    /** SEO / OG still — brown jacket portrait */
    poster: '/images/artist/artist-stage-jacket.jpg',
    /**
     * Home montage: photos + short video beats (not full clips).
     * - landscape: fill frame at scale 1, centered (no zoom-in)
     * - jacket: face right of copy, head near top, mic still in frame (no translateY)
     */
    montage: [
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 4800,
        scale: 1,
        // Right-side face, head high enough for nav, chest/mic still visible
        objectPosition: '6% 18%',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 4200,
        startAt: 4,
        playFor: 4,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
      },
      {
        type: 'video',
        // WhatsApp Video 9 — upright full landscape (no face zoom)
        src: '/videos/artist/artist-stage-portrait-clip.mp4',
        duration: 4200,
        startAt: 0,
        playFor: 4.2,
        orientation: 'landscape',
        scale: 1,
        // Tiny bias down-crop so shoes stay in frame
        objectPosition: 'center 65%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-rooftop-solo.jpg',
        duration: 4500,
        scale: 1,
        // A bit lower than 52% so head/mic stay in frame (clip after this stays as-is)
        objectPosition: 'center 28%',
      },
      {
        type: 'video',
        // WhatsApp Video 12 — short outdoor ensemble beat
        src: '/videos/artist/artist-rooftop-clip.mp4',
        duration: 3800,
        startAt: 0,
        playFor: 3.8,
        scale: 1,
        objectPosition: 'center 45%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-silhouette-pink.jpg',
        duration: 4000,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 4000,
        startAt: 14,
        playFor: 3.8,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: '/images/artist/artist-ensemble-red.jpg',
        duration: 4200,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 4000,
        scale: 1,
        objectPosition: '6% 18%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-pov-mic.jpg',
        duration: 3800,
        scale: 1,
        // Bias down so the handheld mic stays in frame
        objectPosition: 'center 72%',
      },
    ],
  },
  about: {
    portrait: '/images/artist/artist-stage-jacket.jpg',
    atmosphere: '/images/artist/artist-rooftop-solo.jpg',
  },
  work: {
    /** Single full-bleed hero for Work — group stage energy */
    banner: '/images/artist/artist-ensemble-red.jpg',
  },
  contact: {
    atmosphere: '/images/artist/artist-pov-mic.jpg',
  },
  welcome: {
    atmosphere: '/images/artist/artist-silhouette-pink.jpg',
  },
};

/** Accent tokens used across artist pages (Tailwind-friendly class fragments). */
export const artistTheme = {
  accentText: 'text-amber-200',
  accentHover: 'hover:text-amber-200',
  accentBorder: 'border-amber-400/40',
  accentSoft: 'bg-amber-500/15',
  gradientText: 'bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent',
  ctaPrimary: 'bg-white text-black hover:bg-amber-50',
  ctaSecondary: 'border border-white/40 bg-white/5 text-white hover:border-white/70 hover:bg-white/10',
};
