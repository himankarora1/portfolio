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
     * Brown shirt/jacket portrait is featured early and again mid-loop.
     */
    montage: [
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 4800,
        // Zoom out + shift down so full head/hair clears the top/nav
        scale: 1,
        objectPosition: 'center top',
        offsetY: '7%',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 4200,
        startAt: 4,
        playFor: 4,
        objectPosition: 'center 30%',
      },
      {
        type: 'video',
        // WhatsApp Video 9 — rotated upright + face-zoomed
        src: '/videos/artist/artist-stage-portrait-clip.mp4',
        duration: 4200,
        startAt: 0,
        playFor: 4.2,
        objectPosition: '32% 28%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-rooftop-solo.jpg',
        duration: 4500,
        objectPosition: 'center 16%',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-rooftop-clip.mp4',
        duration: 3800,
        startAt: 2,
        playFor: 3.5,
        objectPosition: 'center 18%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-silhouette-pink.jpg',
        duration: 4000,
        objectPosition: 'center 40%',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 4000,
        startAt: 14,
        playFor: 3.8,
        objectPosition: 'center 30%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-ensemble-red.jpg',
        duration: 4200,
        objectPosition: 'center 32%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 4000,
        scale: 1,
        objectPosition: 'center top',
        offsetY: '7%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-pov-mic.jpg',
        duration: 3800,
        objectPosition: 'center 42%',
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
