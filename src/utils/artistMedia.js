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
        src: '/images/artist/artist-rooftop-solo.jpg',
        duration: 5000,
        scale: 1,
        objectPosition: 'center 28%',
        kenBurns: 'in-left',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 5000,
        startAt: 0,
        playFor: 5,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
      },
      {
        type: 'image',
        src: '/images/artist/artist-stage-jacket.jpg',
        duration: 5000,
        scale: 1,
        objectPosition: '6% 18%',
        kenBurns: 'in-right',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-rooftop-clip.mp4',
        duration: 5000,
        startAt: 0,
        playFor: 5,
        scale: 1,
        objectPosition: '42% 58%',
      },
      {
        type: 'image',
        src: '/images/artist/artist-ensemble-red.jpg',
        duration: 5000,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center center',
        kenBurns: 'in-up',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-portrait-clip.mp4',
        duration: 5000,
        startAt: 0,
        playFor: 5,
        orientation: 'landscape',
        scale: 1,
        objectPosition: 'center 65%',
      },
      {
        type: 'video',
        src: '/videos/artist/artist-stage-landscape.mp4',
        duration: 5000,
        startAt: 12,
        playFor: 5,
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
    // Distinct from Work banner — stage POV = invitation / “reach out”
    atmosphere: '/images/artist/artist-pov-mic.jpg',
  },
  welcome: {
    atmosphere: '/images/artist/artist-silhouette-welcome.jpg',
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
