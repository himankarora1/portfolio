import React from 'react';
import ArtistNav from './ArtistNav';

/**
 * Shared cinematic chrome for artist inner pages.
 * @param {string} [atmosphereSrc] - Full-bleed still behind content
 * @param {'cover'|'contain'} [atmosphereFit='cover'] - contain keeps tall shots in frame
 * @param {React.ReactNode} children
 */
const ArtistPageShell = ({ atmosphereSrc, atmosphereFit = 'cover', children, className = '' }) => {
  const fitContain = atmosphereFit === 'contain';

  return (
    <div className={`relative min-h-screen overflow-hidden bg-black ${className}`}>
      {atmosphereSrc && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
          <img
            src={atmosphereSrc}
            alt=""
            aria-hidden="true"
            className={
              fitContain
                ? 'h-full w-full object-contain object-center opacity-45 blur-[2px] sm:blur-[3px]'
                : 'h-full w-full scale-105 object-cover opacity-40 blur-[3px]'
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
        </div>
      )}

      {!atmosphereSrc && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.08),_transparent_55%)]" />
      )}

      <ArtistNav />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ArtistPageShell;
