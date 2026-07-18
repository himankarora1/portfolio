import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Mail, Brush, Globe, Menu, X } from 'lucide-react';
import { contentData } from '../../utils/contentManager';
import { artistPagePad, artistPageWidth } from '../../utils/artistLayout';
import { useAnalytics } from '../Analytics';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/artist' },
  { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
  { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' },
];

/**
 * @param {'default' | 'overlay'} [variant]
 * overlay = cinematic home: transparent bar, text-only links
 */
const ArtistNav = ({ variant = 'default' }) => {
  const location = useLocation();
  const analytics = useAnalytics();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const name = contentData.personal.name;
  const isOverlay = variant === 'overlay';

  const isActive = (path) => location.pathname === path;

  const handleNav = (section) => {
    setIsMobileMenuOpen(false);
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isOverlay
          ? 'border-b border-transparent bg-gradient-to-b from-black/50 to-transparent'
          : 'border-b border-white/10 bg-black/35 backdrop-blur-xl'
      }`}
    >
      <div className={`${artistPageWidth} ${artistPagePad}`}>
        <div className={`flex items-center justify-between ${isOverlay ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
          <Link
            to="/artist"
            onClick={() => handleNav('home')}
            className="group flex items-center space-x-2.5 transition-all duration-300 sm:space-x-3"
          >
            <div
              className={`flex items-center justify-center rounded-full border border-white/70 bg-transparent transition-colors group-hover:border-amber-300 ${
                isOverlay ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-10 w-10 border-2 sm:h-12 sm:w-12'
              }`}
            >
              <span className={`font-bold tracking-tight text-white ${isOverlay ? 'text-xs sm:text-sm' : 'text-sm sm:text-lg'}`}>
                HA
              </span>
            </div>
            <span
              className={`font-bold tracking-tight text-white ${
                isOverlay ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'
              }`}
            >
              {name}
            </span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden items-center md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleNav(item.id)}
                  className={
                    isOverlay
                      ? `px-3 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                          isActive(item.path)
                            ? 'text-amber-200'
                            : 'text-white/65 hover:text-white'
                        }`
                      : `flex items-center space-x-2 rounded-xl px-3 py-2 transition-all ${
                          isActive(item.path)
                            ? 'border border-white/20 bg-white/10 text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`
                  }
                >
                  {!isOverlay && <item.icon size={18} />}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="hidden h-8 w-px bg-white/20 md:block" />

            <div className="hidden md:block">
              <Link
                to="/"
                onClick={() => handleNav('portfolio-hub')}
                className={
                  isOverlay
                    ? 'flex items-center space-x-2 px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-amber-200'
                    : 'flex items-center space-x-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-200 backdrop-blur-sm transition-all hover:border-amber-400/40 hover:text-amber-200'
                }
              >
                <Globe size={isOverlay ? 14 : 18} />
                <span>Portfolio Hub</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="rounded-lg border border-white/15 bg-white/5 p-2 text-gray-200 transition-all hover:text-amber-200 md:hidden"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleNav(item.id)}
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
                  onClick={() => handleNav('portfolio-hub')}
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
  );
};

export default ArtistNav;
