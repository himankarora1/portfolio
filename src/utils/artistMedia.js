/**
 * Cinematic artist media map — one primary visual per page purpose.
 * Warm stage light / black canvas; photos carry the color.
 */
export const artistMedia = {
  home: {
    video: '/videos/artist/artist-stage-landscape.mp4',
    poster: '/images/artist/artist-silhouette-pink.jpg',
    fallbackStill: '/images/artist-hero.png',
  },
  about: {
    portrait: '/images/artist/artist-stage-jacket.jpg',
    atmosphere: '/images/artist/artist-rooftop-solo.jpg',
  },
  work: {
    banner: '/images/artist/artist-ensemble-red.jpg',
    collab: '/images/artist/artist-rooftop-duo.jpg',
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
