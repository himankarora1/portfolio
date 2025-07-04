import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Users,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get data from content manager
  const personalInfo = contentData.personal;
  const artistData = contentData.artist;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });

  // Mobile menu items
  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/artist' },
    { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
    { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status and start submitting
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });

    try {
      // Send to your Vercel API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (result.success) {
        // Track successful form submission
        if (analytics?.trackPortfolioEvents) {
          analytics.trackPortfolioEvents.contactForm('artist-contact-form-success');
        }
        
        // Show success message and clear form
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ''
        });
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSuccess: false,
            isError: false,
            errorMessage: ''
          });
        }, 5000);
        
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Track failed form submission
      if (analytics?.trackPortfolioEvents) {
        analytics.trackPortfolioEvents.contactForm('artist-contact-form-error');
      }
      
      // Show specific error message
      let errorMessage = 'Failed to send message. ';
      
      if (error.message.includes('HTTP error! status: 405')) {
        errorMessage += 'API endpoint not configured properly.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Please check your connection.';
      } else if (error.message.includes('non-JSON response')) {
        errorMessage += 'Server configuration error.';
      } else {
        errorMessage += 'Please try again or email me directly at himankaroraofficial@gmail.com';
      }
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: errorMessage
      });
    }
  };

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
        {/* Navigation - FIXED WITH SEPARATOR */}
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

          {/* Gradient Orbs - Responsive */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
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

        {/* Main Content - FIXED SPACING */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-3 sm:px-4 lg:px-6"
          style={{
            paddingTop: '8rem', // INCREASED from 5rem to 8rem (128px) for more spacing
            paddingBottom: '2rem'
          }}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header - FIXED SPACING */}
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Let's <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Create Together</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Ready to collaborate, book a session, or just chat about creative projects? I'm always excited to connect with fellow creators and explore new opportunities.
              </p>
            </motion.div>

            {/* Updated Contact Methods - Mobile Responsive */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
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
                  className={`${method.bgColor} backdrop-blur-sm border ${method.borderColor} rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all group cursor-pointer`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${method.iconBg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all shadow-lg`}>
                    <method.icon size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-cyan-300 font-semibold mb-2 text-sm sm:text-base">{method.value}</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{method.description}</p>
                </motion.a>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Left Column */}
              <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
                
                {/* Quick Info */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Quick <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Info</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <Clock size={16} className="text-pink-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Response time: 24-48 hours</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <MapPin size={16} className="text-purple-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Based in {personalInfo.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <Calendar size={16} className="text-cyan-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Available for projects worldwide</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <Mail size={16} className="text-green-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Professional collaborations welcome</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <Star size={16} className="text-yellow-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Quality-focused content creation</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                      <Zap size={16} className="text-orange-400 sm:w-[18px] sm:h-[18px]" />
                      <span>Fast turnaround times</span>
                    </div>
                  </div>
                </div>

                {/* What I Offer - OPTIMIZED SPACING AND TEXT SIZE */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-5">
                    What I <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Offer</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 mb-5">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 transition-all"
                      >
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <service.icon size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <span className="text-white font-medium text-sm sm:text-base">{service.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Updated Pricing Info - REDUCED SPACING */}
                  <div className="border-t border-gray-600/30 pt-4 mb-4">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Pricing & Packages</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>• Live Gigs & Performances</span>
                        <span className="text-green-400 font-medium">From $300</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>• Gaming Stream Collaborations</span>
                        <span className="text-green-400 font-medium">From $100</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>• Music Production</span>
                        <span className="text-green-400 font-medium">From $200</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>• Audio & Video Editing</span>
                        <span className="text-green-400 font-medium">From $150</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>• Brand Collaborations</span>
                        <span className="text-green-400 font-medium">Custom Quote</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-600/30 pt-4">
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">
                      My services include live performance booking, gaming stream collaborations, custom music production, and audio-video editing. Each service is delivered with professional standards and personalized attention to ensure exceptional results.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      All packages include revisions and source files.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
                
                {/* Contact Form - Mobile Responsive */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
                    Send Me a <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Message</span>
                  </h2>
                  
                  {/* Success Message */}
                  {formStatus.isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-300 font-semibold text-sm sm:text-base">Message sent successfully!</p>
                          <p className="text-green-400 text-xs sm:text-sm">I'll get back to you soon.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {formStatus.isError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-red-300 font-semibold text-sm sm:text-base">Failed to send message</p>
                          <p className="text-red-400 text-xs sm:text-sm">{formStatus.errorMessage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={formStatus.isSubmitting}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={formStatus.isSubmitting}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gray-900/50 text-white border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <label className="block text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        rows={6}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none resize-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell me about your project, collaboration idea, or just say hello..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg shadow-pink-500/25 disabled:shadow-gray-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base disabled:cursor-not-allowed"
                      whileHover={!formStatus.isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!formStatus.isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>

                {/* Connect on Social - REDUCED SPACING */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-5">
                    Connect on <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Social</span>
                  </h3>
                  <div className="space-y-2">
                    {socialPlatforms.map((platform, index) => (
                      <motion.a
                        key={index}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSocialClick(platform.name, platform.url)}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 transition-all group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 ${platform.color} rounded-lg flex items-center justify-center`}>
                            <platform.icon size={14} className="text-white sm:w-4 sm:h-4" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{platform.name}</div>
                            <div className="text-gray-400 text-xs">{platform.handle}</div>
                          </div>
                        </div>
                        <div className="text-purple-400 font-semibold text-xs">
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

        {/* Footer - Mobile Responsive */}
        <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg tracking-tight">HA</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      {personalInfo.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Content Creator & Artist</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                  Ready to collaborate? Let's create something amazing together. 
                  I'm always excited to work on new projects and creative ideas.
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
                  {mobileMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path}
                        onClick={() => handleNavigationClick(item.id)}
                        className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
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
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <Globe size={14} className="sm:w-4 sm:h-4" />
                      <span>Portfolio Hub</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Methods */}
              <div>
                <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Get In Touch</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      onClick={() => handleSocialClick('Email', personalInfo.email)}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                      <span>Email Me</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={contentData.social.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('Discord', contentData.social.discord)}
                      className="text-gray-400 hover:text-pink-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
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
                      <Globe size={14} className="sm:w-4 sm:h-4" />
                      <span>Available Remotely</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section with Privacy Policy & Terms */}
            <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <Link to="/" className="hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/" className="hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart size={12} className="text-pink-400 sm:w-3.5 sm:h-3.5" />
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