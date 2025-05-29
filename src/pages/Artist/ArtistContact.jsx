import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Music, 
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  MessageSquare,
  Send,
  Star,
  Clock,
  Palette,
  Home,
  User,
  Brush,
  Heart,
  Zap,
  MessageCircle,
  Calendar,
  Headphones,
  Camera,
  Gamepad2,
  Globe,
  Mic,
  Edit,
  Users
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

const ArtistContact = () => {
  const location = useLocation();
  const analytics = useAnalytics();
  
  // Get data from content manager
  const personalInfo = contentData.personal;
  const artistData = contentData.artist;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Track form submission
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.contactForm('artist-contact-form');
    }
    
    alert('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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

  const handleContactMethodClick = (method) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.contactForm(method);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Updated contact methods with improved design
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: personalInfo.email,
      description: "For all inquiries and collaborations",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-500",
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: Music,
      title: "Music Collaborations",
      value: "Open for projects",
      description: "Let's create something amazing together",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500",
      href: "#"
    },
    {
      icon: Gamepad2,
      title: "Gaming Content",
      value: "Stream collaborations",
      description: "Join me for epic gaming sessions",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500",
      href: "#"
    },
    {
      icon: Camera,
      title: "Content Creation",
      value: "Brand partnerships",
      description: "Professional content creation services",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      iconBg: "bg-orange-500",
      href: "#"
    }
  ];

  // Updated services list
  const services = [
    { icon: Mic, label: "Live Gigs & Performances", color: "bg-pink-500" },
    { icon: Gamepad2, label: "Gaming Stream Collaborations", color: "bg-blue-500" },
    { icon: Music, label: "Music Production", color: "bg-purple-500" },
    { icon: Edit, label: "Audio & Video Editing", color: "bg-green-500" },
    { icon: Users, label: "Brand Collaborations", color: "bg-red-500" }
  ];

  const socialPlatforms = [
    { 
      icon: Youtube, 
      name: "YouTube (Music)", 
      handle: "@himankarora", 
      followers: "1.2K", 
      color: "bg-red-500", 
      url: contentData.social.youtube_music
    },
    { 
      icon: Youtube, 
      name: "YouTube (Gaming)", 
      handle: "@himankaroragaming", 
      followers: "850", 
      color: "bg-red-600", 
      url: contentData.social.youtube_gaming
    },
    { 
      icon: Instagram, 
      name: "Instagram", 
      handle: "@himankarora1", 
      followers: "2.1K", 
      color: "bg-gradient-to-r from-pink-500 to-orange-500", 
      url: contentData.social.instagram
    },
    { 
      icon: XIcon, 
      name: "X (Twitter)", 
      handle: "@himankaroraa", 
      followers: "1.5K", 
      color: "bg-black", 
      url: contentData.social.x_twitter
    },
    { 
      icon: Facebook, 
      name: "Facebook", 
      handle: "himankaroraa", 
      followers: "980", 
      color: "bg-blue-600", 
      url: contentData.social.facebook
    },
    { 
      icon: MessageSquare, 
      name: "Discord", 
      handle: "Join Server", 
      followers: "250+", 
      color: "bg-indigo-600", 
      url: contentData.social.discord
    }
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
      {/* SEO */}
      <SEO 
        title={`Contact ${personalInfo.name} - Let's Create Together`}
        description="Ready to collaborate, book a session, or just chat about creative projects? I'm always excited to connect with fellow creators and explore new opportunities."
        keywords="contact, collaboration, music production, content creation, partnerships, creative projects"
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
          {[...Array(25)].map((_, i) => (
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
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Let's <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Create Together</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to collaborate, book a session, or just chat about creative projects? I'm always excited to connect with fellow creators and explore new opportunities.
              </p>
            </motion.div>

            {/* Updated Contact Methods with Better Design */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={method.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  onClick={() => handleContactMethodClick(method.title)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${method.bgColor} backdrop-blur-sm border ${method.borderColor} rounded-2xl p-6 hover:border-white/40 transition-all group cursor-pointer`}
                >
                  <div className={`w-12 h-12 ${method.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-lg`}>
                    <method.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-cyan-300 font-semibold mb-2">{method.value}</p>
                  <p className="text-gray-300 text-sm">{method.description}</p>
                </motion.a>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <motion.div variants={itemVariants} className="space-y-8">
                
                {/* Quick Info */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Quick <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Info</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Clock size={18} className="text-pink-400" />
                      <span>Response time: 24-48 hours</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin size={18} className="text-purple-400" />
                      <span>Based in {personalInfo.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar size={18} className="text-cyan-400" />
                      <span>Available for projects worldwide</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail size={18} className="text-green-400" />
                      <span>Professional collaborations welcome</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Star size={18} className="text-yellow-400" />
                      <span>Quality-focused content creation</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Zap size={18} className="text-orange-400" />
                      <span>Fast turnaround times</span>
                    </div>
                  </div>
                </div>

                {/* What I Offer - Updated */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    What I <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Offer</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mb-7">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 transition-all"
                      >
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <service.icon size={20} className="text-white" />
                        </div>
                        <span className="text-white font-medium">{service.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Updated Pricing Info */}
                  <div className="border-t border-gray-600/30 pt-6 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Pricing & Packages</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-300">
                        <span>• Live Gigs & Performances</span>
                        <span className="text-green-400 font-medium">From $300</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>• Gaming Stream Collaborations</span>
                        <span className="text-green-400 font-medium">From $100</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>• Music Production</span>
                        <span className="text-green-400 font-medium">From $200</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>• Audio & Video Editing</span>
                        <span className="text-green-400 font-medium">From $150</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>• Brand Collaborations</span>
                        <span className="text-green-400 font-medium">Custom Quote</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-600/30 pt-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      I specialize in creating authentic, engaging content across multiple platforms. From live performances to gaming content and music production, I bring passion and professionalism to every project. All packages include revisions and source files.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={itemVariants} className="space-y-8">
                
                {/* Contact Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Send Me a <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Message</span>
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white text-base font-semibold mb-3">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white text-base font-semibold mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white text-base font-semibold mb-3">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 rounded-xl bg-gray-900/50 text-white border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all"
                      >
                        <option value="" className="text-gray-400">Select a subject</option>
                        <option value="live-performance" className="text-gray-900">Live Gigs & Performances</option>
                        <option value="gaming-collaboration" className="text-gray-900">Gaming Stream Collaboration</option>
                        <option value="music-production" className="text-gray-900">Music Production</option>
                        <option value="audio-video-editing" className="text-gray-900">Audio & Video Editing</option>
                        <option value="brand-collaboration" className="text-gray-900">Brand Collaboration</option>
                        <option value="general" className="text-gray-900">General Inquiry</option>
                        <option value="other" className="text-gray-900">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white text-base font-semibold mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={8}
                        className="w-full px-4 py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none resize-none transition-all"
                        placeholder="Tell me about your project, collaboration idea, or just say hello..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={18} />
                      <span>Send Message</span>
                    </motion.button>
                  </form>
                </div>

                {/* Connect on Social */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Connect on <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Social</span>
                  </h3>
                  <div className="space-y-3">
                    {socialPlatforms.map((platform, index) => (
                      <motion.a
                        key={index}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSocialClick(platform.name, platform.url)}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 transition-all group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                            <platform.icon size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{platform.name}</div>
                            <div className="text-gray-400 text-sm">{platform.handle}</div>
                          </div>
                        </div>
                        <div className="text-purple-400 font-semibold text-sm">
                          {platform.followers}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
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
                  Ready to collaborate? Let's create something amazing together. 
                  I'm always excited to work on new projects and creative ideas.
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

              {/* Contact Methods */}
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
                      href={contentData.social.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('Discord', contentData.social.discord)}
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
                      <Globe size={16} />
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

export default ArtistContact;