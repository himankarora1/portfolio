/**
 * Cinematic artist media map — one primary visual per page purpose.
 * Warm stage light / black canvas; photos carry the color.
 */
export const artistMedia = {
  home: {
    /** SEO / OG still — brown jacket portrait */
    poster: '/images/artist/artist-stage-jacket.jpg',
    /**
     * Home montage — each still once, interleaved with short video beats.
     * Stills get Ken Burns motion in ArtistHomeMontage.
     */
    montage: [
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 5200,
        scale: 1,
        objectPosition: '6% 18%',
        kenBurns: 'in-right',
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
        type: 'image',
        src: '/images/artist/artist-rooftop-solo.jpg',
        duration: 5000,
        scale: 1,
        objectPosition: 'center 28%',
        kenBurns: 'in-left',
      },
      {
        type: 'video',
        // WhatsApp Video 12 — from when you're visible; keep you in frame
        src: '/videos/artist/artist-rooftop-clip.mp4',
        duration: 4800,
        startAt: 0,
        playFor: 4.8,
        scale: 1,
        objectPosition: '42% 58%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-ensemble-red.jpg',
        duration: 4800,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
        kenBurns: 'in-up',
      },
      {
        type: 'video',
        // WhatsApp Video 9 — upright full landscape
        src: '/videos/artist/artist-stage-portrait-clip.mp4',
        duration: 4200,
        startAt: 0,
        playFor: 4.2,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center 65%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-silhouette-pink.jpg',
        duration: 4800,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
        kenBurns: 'out-right',
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
    ],
  },
  about: {
    portrait: '/images/artist/artist-stage-jacket.jpg',
    atmosphere: '/images/artist/artist-rooftop-solo.jpg',
  },
  work: {
    banner: '/images/artist/artist-ensemble-red.jpg',
  },
  contact: {
    atmosphere: '/images/artist/artist-silhouette-pink.jpg',
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
