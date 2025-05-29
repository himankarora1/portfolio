import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Github, 
  Linkedin,
  Mail,
  ArrowRight
} from 'lucide-react';
import { contentData, getFeaturedProjects } from '../utils/contentManager';
import SEO from '../components/SEO';
import { useAnalytics } from '../components/Analytics';

// Custom X (Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const HomePage = () => {
  const analytics = useAnalytics();

  // Use content manager data
  const personalInfo = contentData.personal;
  const featuredProjects = getFeaturedProjects();
  const socialLinks = contentData.social;

  // Function to handle Artist portfolio navigation
  const handleArtistClick = () => {
    // Set flag to indicate user is coming from Portfolio Hub
    sessionStorage.setItem('fromPortfolioHub', 'true');
    // Track the navigation
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('home', 'artist');
    }
  };

  const handleTechClick = () => {
    // Track the navigation
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('home', 'tech');
    }
  };

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  // Animation variants for sequential loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each card
        delayChildren: 0.9 // Initial delay before cards start animating
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15 // Delay between card elements
      }
    }
  };

  // Sequential animations for card elements
  const cardElementVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Special animation for skill tags
  const skillTagVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: 10
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1, // Stagger each tag
        ease: "backOut",
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    })
  };

  // Button animation
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut",
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Page-specific SEO */}
      <SEO 
        title={`${personalInfo.name} - ${personalInfo.title}`}
        description={personalInfo.bio}
        keywords={contentData.meta.keywords.join(', ')}
        image={contentData.meta.og_image}
      />
      
      <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* More Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
                animate={{
                  y: [-30, -120],
                  x: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                  opacity: [0, 1, 0],
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
          </div>

          {/* Pulsing Orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center">
              {/* Enhanced Profile Image/Avatar */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  duration: 1.2,
                  bounce: 0.6
                }}
                className="mb-8"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto rounded-full bg-transparent border-2 border-white flex items-center justify-center shadow-2xl backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    borderColor: "#06b6d4"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 10
                  }}
                >
                  <span className="text-white font-bold text-3xl tracking-tight">HA</span>
                </motion.div>
              </motion.div>

              {/* Enhanced Name Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 1,
                  type: "spring",
                  bounce: 0.4
                }}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                <motion.span
                  initial={{ display: "inline-block" }}
                  animate={{ 
                    color: ["#ffffff", "#06b6d4", "#ffffff"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {personalInfo.name}
                </motion.span>
              </motion.h1>

              {/* Enhanced Bio Animation */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.8,
                  type: "spring"
                }}
                className="text-lg md:text-xl text-gray-300 mb-12"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #d1d5db, #06b6d4, #8b5cf6, #d1d5db)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  A Developer by profession and an Artist by passion
                </motion.span>
              </motion.p>

              {/* Enhanced Portfolio Cards with Sequential Loading */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8"
              >
                {/* Enhanced Tech Developer Card */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 shadow-xl"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    {/* Icon */}
                    <motion.div 
                      variants={cardElementVariants}
                      className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Code size={24} className="text-white" />
                    </motion.div>
                    
                    {/* Title */}
                    <motion.h3 
                      variants={cardElementVariants}
                      className="text-xl font-bold text-white mb-3"
                    >
                      Full Stack Developer
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                      variants={cardElementVariants}
                      className="text-gray-300 mb-4 text-sm leading-relaxed"
                    >
                      Building innovative web solutions and data-driven applications using modern technologies and machine learning.
                    </motion.p>

                    {/* Skills Tags */}
                    <motion.div 
                      variants={cardElementVariants}
                      className="flex flex-wrap gap-2 justify-center mb-6"
                    >
                      {["Python", "Java", "AWS", "Machine Learning"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          custom={index}
                          variants={skillTagVariants}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                          }}
                          className={`px-3 py-1 rounded-full text-sm border cursor-pointer transition-all ${
                            skill === "Python" ? "bg-green-500/20 border-green-500/30 text-green-300" :
                            skill === "Java" ? "bg-blue-500/20 border-blue-500/30 text-blue-300" :
                            skill === "AWS" ? "bg-orange-500/20 border-orange-500/30 text-orange-300" :
                            "bg-purple-500/20 border-purple-500/30 text-purple-300"
                          }`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    {/* Button */}
                    <motion.div
                      variants={buttonVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/tech"
                        onClick={handleTechClick}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/25"
                      >
                        <span>View Portfolio</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Artist/Content Creator Card */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 shadow-xl"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -5,
                    boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    {/* Icon */}
                    <motion.div 
                      variants={cardElementVariants}
                      className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: -360,
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Palette size={24} className="text-white" />
                    </motion.div>
                    
                    {/* Title */}
                    <motion.h3 
                      variants={cardElementVariants}
                      className="text-xl font-bold text-white mb-3"
                    >
                      Artist & Content Creator
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                      variants={cardElementVariants}
                      className="text-gray-300 mb-4 text-sm leading-relaxed"
                    >
                      An Artist and a passionate Content Creator across YouTube, gaming, and music platforms building authentic communities.
                    </motion.p>

                    {/* Creative Skills Tags */}
                    <motion.div 
                      variants={cardElementVariants}
                      className="flex flex-wrap gap-2 justify-center mb-6"
                    >
                      {["Music", "Gaming", "Streaming", "Content"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          custom={index}
                          variants={skillTagVariants}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                          }}
                          className={`px-3 py-1 rounded-full text-sm border cursor-pointer transition-all ${
                            skill === "Music" ? "bg-pink-500/20 border-pink-500/30 text-pink-300" :
                            skill === "Gaming" ? "bg-blue-500/20 border-blue-500/30 text-blue-300" :
                            skill === "Streaming" ? "bg-red-500/20 border-red-500/30 text-red-300" :
                            "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
                          }`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    {/* Button - Updated with onClick handler */}
                    <motion.div
                      variants={buttonVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/artist"
                        onClick={handleArtistClick}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/25"
                      >
                        <span>View Portfolio</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Social Links with X Icon */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.8, 
                  duration: 0.8,
                  type: "spring"
                }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Github, href: socialLinks.github, color: "hover:text-gray-300", platform: "GitHub" },
                  { icon: Linkedin, href: socialLinks.linkedin, color: "hover:text-blue-400", platform: "LinkedIn" },
                  { icon: XIcon, href: socialLinks.x_twitter, color: "hover:text-sky-400", platform: "X Twitter" },
                  { icon: Mail, href: `mailto:${personalInfo.email}`, color: "hover:text-red-400", platform: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                    onClick={() => handleSocialClick(social.platform, social.href)}
                    className={`text-gray-400 ${social.color} transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 2 + index * 0.1,
                      type: "spring",
                      bounce: 0.6
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 10,
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;