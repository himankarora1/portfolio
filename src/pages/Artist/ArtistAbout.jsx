import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  User,
  Mail,
  Brush,
  Music,
  Gamepad2,
  Camera,
  Mic,
  Headphones,
  Youtube,
  Twitch,
  Instagram,
  Facebook,
  MessageSquare,
  Heart,
  Star,
  Award,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Globe,
  Video
} from 'lucide-react';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';

// Custom X (Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ArtistAbout = () => {
  const location = useLocation();
  const analytics = useAnalytics();

  // Get data from content manager
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

  const isActive = (path) => location.pathname === path;

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

  // Updated creative stats
  const creativeStats = [
    { icon: Mic, value: "25+", label: "Performances", color: "from-pink-500 to-rose-500" },
    { icon: Camera, value: "50+", label: "Video Content", color: "from-purple-500 to-indigo-500" },
    { icon: Gamepad2, value: "100+", label: "Gaming Hours", color: "from-blue-500 to-cyan-500" },
    { icon: Heart, value: "1K+", label: "Community", color: "from-orange-500 to-red-500" }
  ];

  // Updated creative journey
  const creativeJourney = [
    {
      year: "2005",
      title: "Musical Foundations",
      description: "Introduced to the world of music, began developing vocal skills and mastering various instruments to build a strong musical foundation.",
      icon: Music,
      color: "from-pink-500 to-rose-500"
    },
    {
      year: "2019",
      title: "Content Creation",
      description: "Started digital content creation, sharing musical performances and creative processes across various social media platforms.",
      icon: Camera,
      color: "from-purple-500 to-indigo-500"
    },
    {
      year: "2020",
      title: "Gaming Content",
      description: "Expanded into gaming entertainment, creating gameplay walkthroughs and hosting live streaming sessions.",
      icon: Gamepad2,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2021",
      title: "Community Building",
      description: "Focused on fostering authentic connections and building engaged communities across platforms through consistent content.",
      icon: Heart,
      color: "from-orange-500 to-red-500"
    }
  ];

  const socialPlatforms = [
    { icon: Youtube, name: "YouTube (Music)", handle: "@himankarora", followers: "1.2K", color: "bg-red-500", url: socialLinks.youtube_music },
    { icon: Youtube, name: "YouTube (Gaming)", handle: "@himankaroragaming", followers: "850", color: "bg-red-600", url: socialLinks.youtube_gaming },
    { icon: Instagram, name: "Instagram", handle: "@himankarora1", followers: "2.1K", color: "bg-gradient-to-r from-pink-500 to-orange-500", url: socialLinks.instagram },
    { icon: XIcon, name: "X (Twitter)", handle: "@himankaroraa", followers: "1.5K", color: "bg-black", url: socialLinks.x_twitter },
    { icon: Facebook, name: "Facebook", handle: "himankaroraa", followers: "980", color: "bg-blue-600", url: socialLinks.facebook },
    { icon: MessageSquare, name: "Discord", handle: "Join Server", followers: "250+", color: "bg-indigo-600", url: socialLinks.discord }
  ];

  // Updated creative skills with new data
  const creativeSkills = [
    { name: "Singing", level: 95, icon: Mic, category: "audio" },
    { name: "Gaming", level: 90, icon: Gamepad2, category: "gaming" },
    { name: "Live Streaming", level: 92, icon: Video, category: "streaming" },
    { name: "Music Production", level: 85, icon: Music, category: "audio" },
    { name: "Community Management", level: 88, icon: Heart, category: "social" },
    { name: "Video Editing", level: 86, icon: Camera, category: "video" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      {/* SEO for Artist About */}
      <SEO 
        title={`About ${personalInfo.name} - Content Creator & Musician`}
        description="Dive deeper into my creative journey, skills, and the passion that drives my content creation across music, gaming, and digital storytelling."
        keywords="about, creative journey, content creator, musician, gaming, digital storytelling"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Navigation */}
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
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                      isActive('/artist') ? 'bg-white/10 text-white border border-white/20' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link 
                    to="/artist/about" 
                    onClick={() => handleNavigationClick('artist-about')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                      isActive('/artist/about') ? 'bg-white/10 text-white border border-white/20' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <User size={18} />
                    <span>About Me</span>
                  </Link>
                  <Link 
                    to="/artist/work" 
                    onClick={() => handleNavigationClick('artist-work')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                      isActive('/artist/work') ? 'bg-white/10 text-white border border-white/20' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Brush size={18} />
                    <span>My Work</span>
                  </Link>
                  <Link 
                    to="/artist/contact" 
                    onClick={() => handleNavigationClick('artist-contact')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                      isActive('/artist/contact') ? 'bg-white/10 text-white border border-white/20' : 'text-white hover:bg-white/10'
                    }`}
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20"
              animate={{
                y: [-20, -120],
                x: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.5, 0.5]
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
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Dive deeper into my creative journey, skills, and the passion that drives my content creation across music, gaming, and digital storytelling.
              </p>
            </motion.div>

            {/* Story Section - Updated */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white mb-8">
                  My <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Story</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My creative journey began with a deep love for music that blossomed into a lifelong passion. What started as learning instruments and developing vocal skills evolved into a serious pursuit of musical excellence and artistic expression through authentic content creation.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  As my musical foundation grew stronger, I discovered the power of digital platforms to connect with audiences. This led me to explore video content creation, where I could showcase not just my performances, but the entire creative process behind my art and the stories that inspire each piece.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Gaming has always been another passion of mine, and I found joy in sharing that enthusiasm through streaming and creating walkthroughs. Whether I'm producing music, creating videos, or streaming games, my goal remains the same: to inspire, entertain, and build genuine connections with communities who share these passions.
                </p>
              </div>

              {/* Profile Image - Centered */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex justify-center items-center"
              >
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-2 shadow-2xl">
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/images/itsrhiney.jpg" 
                        alt={personalInfo.name}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          // Fallback to HA if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-2xl"
                        style={{ display: 'none' }}
                      >
                        <span className="text-8xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                          HA
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating stats */}
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-4 shadow-lg"
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">25+</div>
                      <div className="text-sm">Performances</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 shadow-lg"
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">1K+</div>
                      <div className="text-sm">Community</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Creative Stats Section - Updated */}
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Creative <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Achievements</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creativeStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-r ${stat.color} bg-opacity-10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all group`}
                  >
                    <stat.icon size={32} className="text-white mx-auto mb-4 group-hover:scale-110 transition-all" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Journey Timeline - Updated */}
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                My Creative <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {creativeJourney.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="relative"
                  >
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}>
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div className="text-pink-400 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Section - UPDATED WITH NEW DATA */}
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Creative <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {creativeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <skill.icon size={24} className="text-pink-400" />
                        <span className="text-white font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-purple-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-4xl font-bold text-white mb-8">
                Follow My <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Creative Journey</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Connect with me across different platforms and be part of my creative community. Let's create, learn, and grow together!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick(platform.name, platform.url)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group"
                  >
                    <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all`}>
                      <platform.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{platform.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{platform.handle}</p>
                    <p className="text-purple-400 font-semibold">{platform.followers} followers</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg tracking-tight">HA</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      {personalInfo.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Content Creator & Artist</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                  Creating authentic content through music, gaming, and digital storytelling. 
                  Join me on this creative journey across multiple platforms.
                </p>
                <div className="flex space-x-4">
                  {socialPlatforms.map((platform, index) => (
                    <motion.a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick(platform.name, platform.url)}
                      className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <platform.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/artist"
                      onClick={() => handleNavigationClick('artist-home')}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <Home size={16} />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/artist/about"
                      onClick={() => handleNavigationClick('artist-about')}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <User size={16} />
                      <span>About Me</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/artist/work"
                      onClick={() => handleNavigationClick('artist-work')}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <Brush size={16} />
                      <span>My Work</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/artist/contact"
                      onClick={() => handleNavigationClick('artist-contact')}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <Mail size={16} />
                      <span>Contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/"
                      onClick={() => handleNavigationClick('portfolio-hub')}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <Globe size={16} />
                      <span>Portfolio Hub</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Get In Touch */}
              <div>
                <h4 className="text-white font-semibold mb-6">Get In Touch</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      onClick={() => handleSocialClick('Email', personalInfo.email)}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <Mail size={16} />
                      <span>Email Me</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('Discord', socialLinks.discord)}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2"
                    >
                      <MessageSquare size={16} />
                      <span>Join Discord</span>
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2">
                      <Clock size={16} />
                      <span>24-48h Response</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{personalInfo.location}</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2">
                      <Sparkles size={16} />
                      <span>Available Remotely</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section with Privacy Policy & Terms */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link to="/" className="hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/" className="hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart size={14} className="text-pink-400" />
                  <span>and creativity</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ArtistAbout;