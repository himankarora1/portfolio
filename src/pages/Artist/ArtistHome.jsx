import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Play,
  Heart,
  Home,
  User,
  Mail,
  Brush,
  Palette,
  Youtube,
  Twitch,
  Instagram,
  Twitter,
  Gamepad2,
  Headphones,
  Camera,
  Mic,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Video,
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

  // Get artist data from content manager
  const artistData = contentData.artist;
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

  // Mobile menu items
  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/artist' },
    { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
    { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' }
  ];

  useEffect(() => {
    // Check if user is coming from the portfolio hub or first time visit
    const hasVisitedArtistSection = sessionStorage.getItem('visitedArtistSection');
    const isFromPortfolioHub = sessionStorage.getItem('fromPortfolioHub') === 'true';
    
    // Show welcome animation if:
    // 1. First time visiting artist section in this session, OR
    // 2. Coming from outside the website (direct navigation/refresh), OR
    // 3. Coming from the Portfolio Hub
    if (!hasVisitedArtistSection || navigationType === 'RELOAD' || isFromPortfolioHub) {
      setShowWelcome(true);
      sessionStorage.setItem('visitedArtistSection', 'true');
      // Clear the portfolio hub flag after using it
      sessionStorage.removeItem('fromPortfolioHub');
    }
  }, [navigationType]);

  // Analytics event handlers
  const handleNavigationClick = (section) => {
    setIsMobileMenuOpen(false);
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* SEO for Artist Home */}
      <SEO 
        title={`${personalInfo.name} - Content Creator & Musician`}
        description={artistData.bio}
        keywords="content creator, musician, gaming, YouTube, streaming, music production"
        image={contentData.meta.og_image}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced Navigation - FIXED WITH SEPARATOR */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-none mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <Link 
                to="/artist" 
                className="flex items-center space-x-3 sm:space-x-4 group transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 group-hover:border-pink-400 transition-all duration-300">
                  <span className="text-white font-bold text-sm sm:text-lg tracking-tight">HA</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-none bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </span>
                </div>
              </Link>

              <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden md:flex items-center space-x-4">
                  {mobileMenuItems.map((item) => (
                    <Link 
                      key={item.id}
                      to={item.path}
                      onClick={() => handleNavigationClick(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                        isActive(item.path) 
                          ? 'bg-white/10 text-white border border-white/20' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* FIXED: Added Divider for Desktop */}
                <div className="hidden md:block h-8 w-px bg-white/20"></div>

                {/* Portfolio Hub Button - Desktop */}
                <div className="hidden md:block">
                  <Link 
                    to="/" 
                    onClick={() => handleNavigationClick('portfolio-hub')}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 text-gray-300 hover:from-pink-500/20 hover:to-purple-600/20 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    <Globe size={18} />
                    <span>Portfolio Hub</span>
                  </Link>
                </div>

                {/* Mobile Hamburger Menu */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/30"
              >
                <div className="px-3 py-4 space-y-2">
                  {mobileMenuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => handleNavigationClick(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                            : 'text-gray-300 hover:text-pink-400 hover:bg-gray-800/50'
                        }`}
                      >
                        <item.icon size={18} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Portfolio Hub Link for Mobile */}
                  <motion.div
                    className="pt-2 mt-2 border-t border-gray-700/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/"
                      onClick={() => handleNavigationClick('portfolio-hub')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-pink-400 hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <Globe size={18} />
                      <span className="font-medium">Portfolio Hub</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Animated Background - Mobile Optimized */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20"
              animate={{
                y: [-20, -120],
                x: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                opacity: [0, 0.6, 0],
                scale: [0.5, 2, 0.5]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}

          {/* Gradient Orbs - Responsive */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Main Content - FIXED SPACING AND LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6"
          style={{
            paddingTop: '5rem', // Fixed top padding for mobile (80px)
            paddingBottom: '2rem' // Bottom padding
          }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">
              
              {/* Left Content - FIXED SPACING */}
              <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                {/* Greeting - ADDED PROPER SPACING */}
                <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ marginTop: '1rem' }} // Extra top margin for mobile
                  >
                    Hi, I'm
                  </motion.h1>
                  <motion.div 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {personalInfo.name}
                  </motion.div>
                </motion.div>

                {/* Roles - Mobile Responsive */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-3 sm:gap-4"
                >
                  {[
                    { icon: Music, label: "Musician", color: "from-pink-500 to-rose-500" },
                    { icon: Camera, label: "Content Creator", color: "from-purple-500 to-indigo-500" },
                    { icon: Gamepad2, label: "Gamer", color: "from-blue-500 to-cyan-500" }
                  ].map((role, index) => (
                    <motion.div
                      key={role.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-gradient-to-r ${role.color} bg-opacity-10 border border-white/20 backdrop-blur-sm`}
                    >
                      <role.icon size={16} className="text-white sm:w-5 sm:h-5" />
                      <span className="text-white font-semibold text-sm sm:text-base">{role.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bio - Mobile Responsive */}
                <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    {artistData.bio}
                  </p>
                </motion.div>

                {/* CTA Buttons - Mobile Responsive */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link
                    to="/artist/work"
                    onClick={handleExploreContentClick}
                    className="group inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/25 text-sm sm:text-base"
                  >
                    <Sparkles size={16} className="sm:w-5 sm:h-5" />
                    <span>Explore My Content</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                    </motion.div>
                  </Link>
                  
                  <Link
                    to="/artist/contact"
                    onClick={handleCollaborateClick}
                    className="inline-flex items-center justify-center space-x-2 sm:space-x-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all text-sm sm:text-base"
                  >
                    <Zap size={16} className="sm:w-5 sm:h-5" />
                    <span>Let's Collaborate</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - FIXED IMAGE LAYOUT */}
              <motion.div 
                variants={itemVariants} 
                className="relative flex flex-col items-center justify-center order-1 lg:order-2"
                style={{
                  minHeight: '400px', // Ensure minimum height
                  paddingBottom: '2rem' // Extra padding at bottom
                }}
              >
                {/* Profile Image Container - FIXED SIZING */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    duration: 1,
                    bounce: 0.4,
                    delay: 0.3
                  }}
                  className="relative"
                  style={{
                    marginBottom: '1rem' // Ensure space at bottom
                  }}
                >
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-2 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      {/* Your Image */}
                      <img 
                        src="/images/mewithguitar.JPG" 
                        alt={personalInfo.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // Fallback to HA if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback HA */}
                      <div 
                        className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-full"
                        style={{ display: 'none' }}
                      >
                        <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                          HA
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Icons - ADJUSTED POSITIONING FOR MOBILE */}
                  {/* Music Icon - Top Right */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-2 right-8 sm:-top-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Music size={20} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Gaming Icon - Bottom Left */}
                  <motion.div
                    animate={{ 
                      y: [0, 20, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-2 left-8 sm:-bottom-4 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Gamepad2 size={20} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Content Creation Icon - Middle Right */}
                  <motion.div
                    animate={{ 
                      x: [0, 15, 0],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Camera size={20} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Singing Icon (Mic) - Top Left */}
                  <motion.div
                    animate={{ 
                      x: [0, -15, 0],
                      y: [0, -10, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    className="absolute -top-2 left-8 sm:-top-4 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Mic size={20} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Streaming Icon (Video) - Middle Left */}
                  <motion.div
                    animate={{ 
                      x: [0, -15, 0],
                      rotate: [0, -15, 0]
                    }}
                    transition={{ 
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                    className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Video size={20} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ArtistHome;