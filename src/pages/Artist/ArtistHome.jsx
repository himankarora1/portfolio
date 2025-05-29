import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Video
} from 'lucide-react';
import ArtistWelcome from './ArtistWelcome';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';

const ArtistHome = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [showWelcome, setShowWelcome] = useState(false);
  const analytics = useAnalytics();

  // Get artist data from content manager
  const artistData = contentData.artist;
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

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

      <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-none mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center h-20">
              <Link to="/artist" className="flex items-center space-x-4 group transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 group-hover:border-pink-400 transition-all duration-300">
                  <span className="text-white font-bold text-lg tracking-tight">HA</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight leading-none bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </span>
                </div>
              </Link>

              <div className="flex items-center space-x-6">
                {/* Main Navigation */}
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/artist" 
                    onClick={() => handleNavigationClick('artist-home')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link 
                    to="/artist/about" 
                    onClick={() => handleNavigationClick('artist-about')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-white hover:bg-white/10 transition-all"
                  >
                    <User size={18} />
                    <span>About Me</span>
                  </Link>
                  <Link 
                    to="/artist/work" 
                    onClick={() => handleNavigationClick('artist-work')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-white hover:bg-white/10 transition-all"
                  >
                    <Brush size={18} />
                    <span>My Work</span>
                  </Link>
                  <Link 
                    to="/artist/contact" 
                    onClick={() => handleNavigationClick('artist-contact')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-white hover:bg-white/10 transition-all"
                  >
                    <Mail size={18} />
                    <span>Contact</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-white/20"></div>

                {/* Portfolio Hub Button */}
                <Link 
                  to="/" 
                  onClick={() => handleNavigationClick('portfolio-hub')}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 text-gray-300 hover:from-pink-500/20 hover:to-purple-600/20 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                >
                  <Globe size={18} />
                  <span>Portfolio Hub</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Elements */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20"
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

          {/* Gradient Orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
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

        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content */}
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Greeting */}
                <motion.div variants={itemVariants}>
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold text-white mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Hi, I'm
                  </motion.h1>
                  <motion.div 
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {personalInfo.name}
                  </motion.div>
                </motion.div>

                {/* Roles */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 mb-8"
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
                      className={`flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${role.color} bg-opacity-10 border border-white/20 backdrop-blur-sm`}
                    >
                      <role.icon size={20} className="text-white" />
                      <span className="text-white font-semibold">{role.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bio */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {artistData.bio}
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/artist/work"
                    onClick={handleExploreContentClick}
                    className="group inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/25"
                  >
                    <Sparkles size={20} />
                    <span>Explore My Content</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </Link>
                  
                  <Link
                    to="/artist/contact"
                    onClick={handleCollaborateClick}
                    className="inline-flex items-center space-x-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all"
                  >
                    <Zap size={20} />
                    <span>Let's Collaborate</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image with Floating Icons */}
              <motion.div 
                variants={itemVariants} 
                className="relative flex flex-col items-center justify-center"
              >
                {/* Profile Image Container */}
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
                >
                  <div className="w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-2 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      {/* Your Image */}
                      <img 
                        src="/images/mewithguitar.jpg" 
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
                        <span className="text-8xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                          HA
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Icons - Positioned at Equal Distances Around Circle */}
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
                    className="absolute -top-6 right-8 w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Music size={24} className="text-white" />
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
                    className="absolute -bottom-6 left-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Gamepad2 size={24} className="text-white" />
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
                    className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Camera size={24} className="text-white" />
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
                    className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Mic size={24} className="text-white" />
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
                    className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Video size={24} className="text-white" />
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