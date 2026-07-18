import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ArtistWelcome from './ArtistWelcome';
import ArtistNav from '../../components/Artist/ArtistNav';
import ArtistHomeMontage from '../../components/Artist/ArtistHomeMontage';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';
import { artistPagePad, artistPageWidth } from '../../utils/artistLayout';

const ArtistHome = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const analytics = useAnalytics();

  const artistData = contentData.artist;
  const personalInfo = contentData.personal;
  const media = artistMedia.home;
  const firstName = personalInfo.name.split(' ')[0]?.toUpperCase() || 'HIMANK';
  const lastName = personalInfo.name.split(' ').slice(1).join(' ').toUpperCase();

  useEffect(() => {
    // Once per browser tab session, or when arriving from the portfolio hub.
    // Note: React Router has no 'RELOAD' navigation type — full refresh keeps
    // sessionStorage, so welcome correctly does not re-run on F5.
    const hasVisitedArtistSection = sessionStorage.getItem('visitedArtistSection');
    const isFromPortfolioHub = sessionStorage.getItem('fromPortfolioHub') === 'true';

    if (!hasVisitedArtistSection || isFromPortfolioHub) {
      setShowWelcome(true);
      sessionStorage.setItem('visitedArtistSection', 'true');
      sessionStorage.removeItem('fromPortfolioHub');
    }
  }, []);

  const handleExploreContentClick = () => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('artist-home', 'artist-work');
    }
  };

  const handleCollaborateClick = () => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('artist-home', 'artist-contact');
    }
  };

  if (showWelcome) {
    return <ArtistWelcome onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <SEO
        title={`${personalInfo.name} - Artist & Content Creator`}
        description={artistData.tagline || artistData.bio}
        keywords="content creator, musician, gaming, YouTube, streaming, music production"
      />

      <div className="relative min-h-screen overflow-hidden bg-black">
        <ArtistHomeMontage slides={media.montage} />

        <ArtistNav variant="overlay" />

        <div
          className={`relative z-10 flex min-h-screen flex-col justify-end ${artistPagePad} pb-12 pt-28 sm:pb-16 sm:pt-24 lg:pb-20`}
        >
          <div className={`${artistPageWidth}`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              {/* Thin editorial rule + role */}
              <div className="mb-5 flex items-center gap-4 sm:mb-6">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/55 sm:text-xs">
                  Artist & Content Creator
                </span>
                <span className="hidden h-px flex-1 max-w-[8rem] bg-white/25 sm:block" />
                <span className="hidden text-[10px] uppercase tracking-[0.22em] text-white/40 sm:inline sm:text-xs">
                  Music · Gaming · Stories
                </span>
              </div>

              {/* Brand-first name */}
              <h1 className="mb-4 font-display text-[clamp(2.75rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-white sm:mb-5">
                <span className="block">{firstName}</span>
                {lastName && (
                  <span className="block text-amber-200/95">{lastName}</span>
                )}
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/70 sm:mb-10 sm:text-base md:text-lg">
                {artistData.tagline || 'Music, gaming, and storytelling. Creating content that connects.'}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  to="/artist/work"
                  onClick={handleExploreContentClick}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-100 sm:px-8 sm:text-base"
                >
                  <span>Explore My Work</span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/artist/contact"
                  onClick={handleCollaborateClick}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/70 hover:text-white sm:px-8 sm:text-base"
                >
                  <span>Let&apos;s Collaborate</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quiet scroll cue — points to work via primary path */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="pointer-events-none absolute bottom-6 right-4 hidden text-[10px] uppercase tracking-[0.3em] text-white/35 sm:bottom-8 sm:right-8 sm:block lg:right-12"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2">
              Scroll
              <ArrowDown size={12} className="opacity-70" />
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ArtistHome;
