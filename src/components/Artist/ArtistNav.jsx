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

/** Unified artist nav — same quiet chrome on every artist page */
const ArtistNav = () => {
  const location = useLocation();
  const analytics = useAnalytics();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const name = contentData.personal.name;

  const isActive = (path) => location.pathname === path;

  const handleNav = (section) => {
    setIsMobileMenuOpen(false);
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className={`${artistPageWidth} ${artistPagePad}`}>
        <div className="flex h-16 items-center justify-between sm:h-16">
          <Link
            to="/artist"
            onClick={() => handleNav('home')}
            className="group flex items-center space-x-2.5 transition-all duration-300 sm:space-x-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-transparent transition-colors group-hover:border-amber-300 sm:h-10 sm:w-10">
              <span className="text-xs font-bold tracking-tight text-white sm:text-sm">HA</span>
            </div>
            <span className="text-base font-bold tracking-tight text-white sm:text-lg">{name}</span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden items-center md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                    isActive(item.path)
                      ? 'text-amber-200'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden h-7 w-px bg-white/20 md:block" />

            <div className="hidden md:block">
              <Link
                to="/"
                onClick={() => handleNav('portfolio-hub')}
                className="flex items-center space-x-2 px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-amber-200"
              >
                <Globe size={14} />
                <span>Portfolio Hub</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="rounded-full border border-white/15 bg-white/5 p-2 text-gray-200 transition-all hover:border-amber-200/40 hover:text-amber-200 md:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-3 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleNav(item.id)}
                  className={`flex w-full items-center space-x-3 rounded-full px-4 py-3 text-left text-sm transition-all ${
                    isActive(item.path)
                      ? 'bg-white/10 text-amber-200'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  <span className="font-medium tracking-wide">{item.label}</span>
                </Link>
              ))}

              <div className="mt-2 border-t border-white/10 pt-2">
                <Link
                  to="/"
                  onClick={() => handleNav('portfolio-hub')}
                  className="flex w-full items-center space-x-3 rounded-full px-4 py-3 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-amber-200"
                >
                  <Globe size={16} />
                  <span className="font-medium tracking-wide">Portfolio Hub</span>
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
