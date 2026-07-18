import React, { useState, useEffect } from 'react';
import { Link, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ArtistWelcome from './ArtistWelcome';
import ArtistNav from '../../components/Artist/ArtistNav';
import ArtistHomeMontage from '../../components/Artist/ArtistHomeMontage';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';

const ArtistHome = () => {
  const navigationType = useNavigationType();
  const [showWelcome, setShowWelcome] = useState(false);
  const analytics = useAnalytics();

  const artistData = contentData.artist;
  const personalInfo = contentData.personal;
  const media = artistMedia.home;

  useEffect(() => {
    const hasVisitedArtistSection = sessionStorage.getItem('visitedArtistSection');
    const isFromPortfolioHub = sessionStorage.getItem('fromPortfolioHub') === 'true';

    if (!hasVisitedArtistSection || navigationType === 'RELOAD' || isFromPortfolioHub) {
      setShowWelcome(true);
      sessionStorage.setItem('visitedArtistSection', 'true');
      sessionStorage.removeItem('fromPortfolioHub');
    }
  }, [navigationType]);

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
        image={media.poster}
      />

      <div className="relative min-h-screen overflow-hidden bg-black">
        <ArtistHomeMontage slides={media.montage} />

        <ArtistNav />

        <div className="relative z-10 flex min-h-screen items-end px-4 pb-16 pt-28 sm:items-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-200/90 sm:text-sm"
              >
                Artist & Content Creator
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mb-5 text-4xl font-bold leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-8 max-w-xl text-base leading-relaxed text-gray-200/90 sm:mb-10 sm:text-lg md:text-xl"
              >
                {artistData.tagline || 'Music, gaming, and storytelling. Creating content that connects.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              >
                <Link
                  to="/artist/work"
                  onClick={handleExploreContentClick}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-amber-50 sm:px-8 sm:text-base"
                >
                  <span>Explore My Work</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/artist/contact"
                  onClick={handleCollaborateClick}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 sm:px-8 sm:text-base"
                >
                  <span>Let's Collaborate</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistHome;
