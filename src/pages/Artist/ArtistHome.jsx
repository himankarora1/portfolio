import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  User,
  Mail,
  Brush,
  ArrowRight,
  Globe,
  Menu,
  X
} from 'lucide-react';
import ArtistWelcome from './ArtistWelcome';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';

const ArtistHome = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const analytics = useAnalytics();

  const artistData = contentData.artist;
  const personalInfo = contentData.personal;

  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/artist' },
    { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
    { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' }
  ];

  useEffect(() => {
    const hasVisitedArtistSection = sessionStorage.getItem('visitedArtistSection');
    const isFromPortfolioHub = sessionStorage.getItem('fromPortfolioHub') === 'true';
    
    if (!hasVisitedArtistSection || navigationType === 'RELOAD' || isFromPortfolioHub) {
      setShowWelcome(true);
      sessionStorage.setItem('visitedArtistSection', 'true');
      sessionStorage.removeItem('fromPortfolioHub');
    }
  }, [navigationType]);

  const handleNavigationClick = (section) => {
    setIsMobileMenuOpen(false);
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

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

  const isActive = (path) => location.pathname === path;

  if (showWelcome) {
    return <ArtistWelcome onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <SEO 
        title={`${personalInfo.name} - Artist & Content Creator`}
        description={artistData.tagline || artistData.bio}
        keywords="content creator, musician, gaming, YouTube, streaming, music production"
        image="/images/artist-hero.png"
      />

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Cinematic full-bleed background */}
        <div className="absolute inset-0">
          <motion.img
            src="/images/artist-hero.png"
            alt=""
            aria-hidden="true"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="h-full w-full object-cover object-[center_20%] blur-[2px] sm:blur-[3px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto max-w-none px-3 sm:px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between sm:h-20">
              <Link 
                to="/artist" 
                className="group flex items-center space-x-3 sm:space-x-4 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-transparent transition-colors group-hover:border-amber-300 sm:h-12 sm:w-12">
                  <span className="text-sm font-bold tracking-tight text-white sm:text-lg">HA</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                  {personalInfo.name}
                </span>
              </Link>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="hidden items-center space-x-2 md:flex">
                  {mobileMenuItems.map((item) => (
                    <Link 
                      key={item.id}
                      to={item.path}
                      onClick={() => handleNavigationClick(item.id)}
                      className={`flex items-center space-x-2 rounded-xl px-3 py-2 transition-all ${
                        isActive(item.path) 
                          ? 'border border-white/20 bg-white/10 text-white' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="hidden h-8 w-px bg-white/20 md:block" />

                <div className="hidden md:block">
                  <Link 
                    to="/" 
                    onClick={() => handleNavigationClick('portfolio-hub')}
                    className="flex items-center space-x-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-200 backdrop-blur-sm transition-all hover:border-amber-400/40 hover:text-amber-200"
                  >
                    <Globe size={18} />
                    <span>Portfolio Hub</span>
                  </Link>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen}
                  className="rounded-lg border border-white/15 bg-white/5 p-2 text-gray-200 transition-all hover:text-amber-200 md:hidden"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
              >
                <div className="space-y-2 px-3 py-4">
                  {mobileMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => handleNavigationClick(item.id)}
                      className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left transition-all ${
                        isActive(item.path)
                          ? 'bg-white/15 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="mt-2 border-t border-white/10 pt-2">
                    <Link
                      to="/"
                      onClick={() => handleNavigationClick('portfolio-hub')}
                      className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <Globe size={18} />
                      <span className="font-medium">Portfolio Hub</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero foreground */}
        <div className="relative z-10 flex min-h-screen items-end sm:items-center px-4 sm:px-6 lg:px-10 pb-16 pt-28 sm:pb-20 sm:pt-24">
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
