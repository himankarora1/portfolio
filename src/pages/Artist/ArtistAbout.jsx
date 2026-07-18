import React from 'react';
import { Link } from 'react-router-dom';
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
  Youtube,
  Instagram,
  Facebook,
  MessageSquare,
  Heart,
  Clock,
  MapPin,
  Sparkles,
  Globe,
  Video
} from 'lucide-react';
import SEO from '../../components/SEO';
import ArtistPageShell from '../../components/Artist/ArtistPageShell';
import { useAnalytics } from '../../components/Analytics';
import { contentData, getEmailForContext } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';

// Custom X (Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ArtistAbout = () => {
  const analytics = useAnalytics();

  // Get data from content manager
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;
  const artistEmail = getEmailForContext('artist'); // Use artist email

  // Footer / quick links
  const footerLinks = [
    { id: 'home', label: 'Home', icon: Home, path: '/artist' },
    { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
    { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' }
  ];

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
    { icon: Mic, value: "25+", label: "Performances", color: "from-amber-600 to-orange-700" },
    { icon: Camera, value: "50+", label: "Video Content", color: "from-stone-600 to-stone-800" },
    { icon: Gamepad2, value: "100+", label: "Gaming Hours", color: "from-cyan-600 to-teal-700" },
    { icon: Heart, value: "1K+", label: "Community", color: "from-rose-600 to-orange-700" }
  ];

  // Updated creative journey
  const creativeJourney = [
    {
      year: "2005",
      title: "Musical Foundations",
      description: "Introduced to the world of music, began developing vocal skills and mastering various instruments to build a strong musical foundation.",
      icon: Music,
      color: "from-amber-600 to-orange-700"
    },
    {
      year: "2019",
      title: "Content Creation",
      description: "Started digital content creation, sharing musical performances and creative processes across various social media platforms with dedicated focus.",
      icon: Camera,
      color: "from-stone-600 to-stone-800"
    },
    {
      year: "2020",
      title: "Gaming Content",
      description: "Expanded into gaming entertainment, creating gameplay walkthroughs and hosting live streaming sessions with engaging interactions.",
      icon: Gamepad2,
      color: "from-cyan-600 to-teal-700"
    },
    {
      year: "2021",
      title: "Community Building",
      description: "Focused on fostering authentic connections and building engaged communities across platforms through consistent content.",
      icon: Heart,
      color: "from-rose-600 to-orange-700"
    }
  ];

  const socialPlatforms = [
    { icon: Youtube, name: "YouTube (Music)", handle: "@himankarora", followers: "1.2K", color: "bg-red-500", url: socialLinks.youtube_music },
    { icon: Youtube, name: "YouTube (Gaming)", handle: "@himankaroragaming", followers: "850", color: "bg-red-600", url: socialLinks.youtube_gaming },
    { icon: Instagram, name: "Instagram", handle: "@himankarora1", followers: "2.1K", color: "bg-gradient-to-r from-rose-500 to-orange-500", url: socialLinks.instagram },
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

      <ArtistPageShell atmosphereSrc={artistMedia.about.atmosphere} atmosphereFit="contain">
        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-3 sm:px-4 lg:px-6"
          style={{
            paddingTop: '8rem',
            paddingBottom: '2rem'
          }}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
                About <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">Me</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Dive deeper into my creative journey, skills, and the passion that drives my content creation across music, gaming, and digital storytelling.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-20 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
                  My <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Story</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  My creative journey began with a deep love for music that blossomed into a lifelong passion. What started as learning instruments and developing vocal skills evolved into a serious pursuit of musical excellence and artistic expression through authentic content creation.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  As my musical foundation grew stronger, I discovered the power of digital platforms to connect with audiences. This led me to explore video content creation, where I could showcase not just my performances, but the entire creative process behind my art and the stories that inspire each piece.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Gaming has always been another passion of mine, and I found joy in sharing that enthusiasm through streaming and creating walkthroughs. Whether I'm producing music, creating videos, or streaming games, my goal remains the same: to inspire, entertain, and build genuine connections with communities who share these passions.
                </p>
              </div>

              {/* Profile Image */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex justify-center items-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-r from-amber-500/80 via-orange-400/60 to-stone-600/80 p-2 shadow-2xl ring-1 ring-white/20">
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img 
                        src={artistMedia.about.portrait} 
                        alt={personalInfo.name}
                        className="w-full h-full object-cover rounded-2xl"
                        style={{ objectPosition: 'center 15%' }}
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
                        <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text">
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
                    className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl p-3 sm:p-4 shadow-lg"
                  >
                    <div className="text-white text-center">
                      <div className="text-lg sm:text-2xl font-bold">25+</div>
                      <div className="text-xs sm:text-sm">Performances</div>
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
                    className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-stone-700 to-stone-900 rounded-2xl p-3 sm:p-4 shadow-lg"
                  >
                    <div className="text-white text-center">
                      <div className="text-lg sm:text-2xl font-bold">1K+</div>
                      <div className="text-xs sm:text-sm">Community</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Creative Stats Section */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                Creative <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Achievements</span>
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {creativeStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-r ${stat.color} bg-opacity-10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-all group`}
                  >
                    <stat.icon size={24} className="text-white mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-all sm:w-8 sm:h-8" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300 text-sm sm:text-base">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                My Creative <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Journey</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {creativeJourney.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="relative"
                  >
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all group">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all`}>
                        <item.icon size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-amber-200 font-bold text-base sm:text-lg mb-2">{item.year}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                Creative <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Skills</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {creativeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-3">
                        <skill.icon size={20} className="text-amber-200 sm:w-6 sm:h-6" />
                        <span className="text-white font-semibold text-sm sm:text-base">{skill.name}</span>
                      </div>
                      <span className="text-orange-200 font-bold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                      <motion.div
                        className="bg-gradient-to-r from-amber-600 to-orange-700 h-2 sm:h-3 rounded-full"
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
                Follow My <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Creative Journey</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
                Connect with me across different platforms and be part of my creative community. Let's create, learn, and grow together!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all group"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-all`}>
                      <platform.icon size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{platform.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{platform.handle}</p>
                    <p className="text-amber-200 font-semibold text-sm sm:text-base">{platform.followers} followers</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="relative z-10 bg-black/60 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg tracking-tight">HA</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                      {personalInfo.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Content Creator & Artist</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                  Creating authentic content through music, gaming, and digital storytelling. 
                  Join me on this creative journey across multiple platforms.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialPlatforms.map((platform, index) => (
                    <motion.a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick(platform.name, platform.url)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${platform.color} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <platform.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {footerLinks.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path}
                        onClick={() => handleNavigationClick(item.id)}
                        className="text-gray-400 hover:text-amber-200 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <item.icon size={14} className="sm:w-4 sm:h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link 
                      to="/"
                      onClick={() => handleNavigationClick('portfolio-hub')}
                      className="text-gray-400 hover:text-amber-200 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <Globe size={14} className="sm:w-4 sm:h-4" />
                      <span>Portfolio Hub</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Get In Touch */}
              <div>
                <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Get In Touch</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a 
                      href={`mailto:${artistEmail}`}
                      onClick={() => handleSocialClick('Email', artistEmail)}
                      className="text-gray-400 hover:text-amber-200 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                      <span>Email Me</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('Discord', socialLinks.discord)}
                      className="text-gray-400 hover:text-amber-200 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <MessageSquare size={14} className="sm:w-4 sm:h-4" />
                      <span>Join Discord</span>
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2 text-sm sm:text-base">
                      <Clock size={14} className="sm:w-4 sm:h-4" />
                      <span>24-48h Response</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2 text-sm sm:text-base">
                      <MapPin size={14} className="sm:w-4 sm:h-4" />
                      <span>{personalInfo.location}</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-400 flex items-center space-x-2 text-sm sm:text-base">
                      <Sparkles size={14} className="sm:w-4 sm:h-4" />
                      <span>Available Remotely</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-center items-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </ArtistPageShell>
    </>
  );
};

export default ArtistAbout;
