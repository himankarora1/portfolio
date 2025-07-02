import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Home,
  User,
  Briefcase,
  Award,
  MapPin,
  Calendar,
  Globe,
  Coffee,
  Zap,
  Target,
  GraduationCap,
  Star,
  CheckCircle,
  ArrowRight,
  Twitter,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAnalytics } from '../components/Analytics';
import { 
  contentData, 
  getProjectsByCategory, 
  getWorkExperience, 
  getFeaturedCertifications 
} from '../utils/contentManager';

const TechPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentCertPage, setCurrentCertPage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const analytics = useAnalytics();

  const roles = [
    'Full Stack Developer',
    'Data Enthusiast', 
    'Problem Solver'
  ];

  // Get data from content manager
  const projects = contentData.featured_projects;
  const skills = contentData.skills;
  const experience = contentData.experience;
  const certificates = contentData.certifications;
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

  // Mobile menu items for in-page navigation
  const mobileMenuItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'certificates', label: 'Certificates', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Event handlers with analytics
  const handleResumeDownload = () => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.resumeDownload();
    }
  };

  const handleProjectClick = (project) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.projectView(project.id, project.title);
    }
  };

  const handleProjectDemo = (project) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.projectDemo(project.id, project.demo);
    }
  };

  const handleProjectGithub = (project) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.projectGithub(project.id, project.github);
    }
  };

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  // Fixed typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const typeChar = () => {
      if (isTyping && !isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const speed = isDeleting ? 50 : 100; // Faster deletion
    const timer = setTimeout(typeChar, speed);

    return () => clearTimeout(timer);
  }, [displayText, isTyping, isDeleting, currentRoleIndex, roles]);

  // Scroll detection
  useEffect(() => {
    let scrollTimer;
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 200;
      const isScrolled = window.scrollY > 100;

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollableHeight = documentHeight - windowHeight;
      const currentScrollProgress = Math.min((window.scrollY / totalScrollableHeight) * 100, 100);
      setScrollProgress(currentScrollProgress);

      // Show/hide floating nav based on scroll position (all devices)
      setShowFloatingNav(isScrolled);
      setIsScrolling(true);

      // Clear existing timer
      clearTimeout(scrollTimer);
      
      // Set timer to hide floating nav after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);

      let currentSection = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Adjust for mobile nav height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
    
    // Track section navigation
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(sectionId);
    }
  };

  return (
    <>
      {/* SEO */}
      <SEO 
        title="Himank Arora - Full Stack Developer Portfolio"
        description="Experienced full stack developer specializing in React, Python, and machine learning. View my professional portfolio, projects, and technical expertise."
        keywords="full stack developer, React, Python, machine learning, web development, Boston developer"
      />

      {/* Professional Navigation - FIXED WITH PROPER SPACING */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/98 backdrop-blur-xl border-b border-gray-700/30 shadow-xl">
        <div className="max-w-none mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link 
              to="/tech" 
              className="flex items-center space-x-3 sm:space-x-4 group transition-all duration-300 hover:scale-105"
            >
              {/* Logo Icon with Initials */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300">
                <span className="text-white font-bold text-sm sm:text-lg tracking-tight">HA</span>
              </div>
              
              {/* Name with Modern Typography */}
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-none bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                  {personalInfo.name}
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* FIXED: Added Divider for Desktop */}
              <div className="hidden md:block h-8 w-px bg-white/20"></div>

              {/* Portfolio Hub Button - Desktop */}
              <div className="hidden md:block">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 text-gray-300 hover:from-cyan-500/20 hover:to-blue-600/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20"
                >
                  <Globe size={18} />
                  <span>Portfolio Hub</span>
                </Link>
              </div>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
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
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
                
                {/* Portfolio Hub Link for Mobile */}
                <motion.div
                  className="pt-2 mt-2 border-t border-gray-700/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
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

      {/* Scroll Progress Bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 h-1 bg-gray-800/50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/20"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </div>

      {/* Floating Navigation - Mobile & Desktop */}
      <AnimatePresence>
        {showFloatingNav && isScrolling && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 sm:top-28 left-0 right-0 z-40 flex justify-center px-3 sm:px-0"
          >
            <nav className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10">
              <div className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3">
                {mobileMenuItems.slice(1).map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Moving Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-50"
                animate={{
                  y: [-20, -100],
                  x: [Math.random() * 100, Math.random() * 100],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero Section - FIXED SPACING */}
        <section 
          id="hero" 
          className="min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6 relative z-10"
          style={{
            paddingTop: '8rem', // INCREASED from default to 8rem (128px) for more spacing - same as ArtistAbout
            paddingBottom: '2rem'
          }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left side - Text Content - REDUCED SIZE FOR BETTER FIT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left space-y-3 sm:space-y-4 lg:space-y-5" // REDUCED spacing
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-300 mb-1 sm:mb-2"> {/* REDUCED SIZE */}
                    Hi, I'm
                  </h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 sm:mb-2" // REDUCED SIZE
                  >
                    Himank
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-5" // REDUCED SIZE
                  >
                    Arora
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-3 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[3rem]" // REDUCED SIZE
                >
                  <span className="text-cyan-400">
                    {displayText}
                    <span className="animate-pulse text-cyan-300">|</span>
                  </span>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-4 sm:mb-6" // REDUCED SIZE
                >
                  {personalInfo.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6" // ADDED MARGIN BOTTOM
                >
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base" // REDUCED SIZE
                  >
                    <Target size={16} className="sm:w-5 sm:h-5" />
                    <span>View My Work</span>
                  </button>
                  
                  <a
                    href={personalInfo.resume}
                    download
                    onClick={handleResumeDownload}
                    className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base" // REDUCED SIZE
                  >
                    <Download size={16} className="sm:w-5 sm:h-5" />
                    <span>Download Resume</span>
                  </a>
                </motion.div>

                {/* SOCIAL LINKS - MOVED UP WITH BETTER SPACING */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="flex space-x-4 sm:space-x-6 pt-2 sm:pt-4" // REDUCED TOP PADDING
                >
                  <a 
                    href={socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleSocialClick('GitHub', socialLinks.github)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Github size={22} className="sm:w-6 sm:h-6" /> {/* SLIGHTLY SMALLER */}
                  </a>
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleSocialClick('LinkedIn', socialLinks.linkedin)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Linkedin size={22} className="sm:w-6 sm:h-6" /> {/* SLIGHTLY SMALLER */}
                  </a>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    onClick={() => handleSocialClick('Email', personalInfo.email)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Mail size={22} className="sm:w-6 sm:h-6" /> {/* SLIGHTLY SMALLER */}
                  </a>
                </motion.div>
              </motion.div>

              {/* Right side - Visual Animation - Responsive */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative flex items-center justify-center mt-6 lg:mt-0" // REDUCED TOP MARGIN
              >
                {/* Animated Code Editor Mockup */}
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                  {/* Main Terminal/Editor Window */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
                    {/* Window Controls */}
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Code Content */}
                    <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="text-blue-400"
                      >
                        <span className="text-purple-400">const</span> developer = {'{'}
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        name: <span className="text-green-400">'{personalInfo.name}'</span>,
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Python'</span>],
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        passion: <span className="text-green-400">'Innovation'</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5, duration: 0.5 }}
                        className="text-blue-400"
                      >
                        {'};'}
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating Tech Icons - Responsive positioning */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25"
                  >
                    <Target size={16} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 20, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25"
                  >
                    <Zap size={16} className="text-white sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Circuit Lines - Responsive */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      <motion.path
                        d="M50 200 Q 200 50 350 200"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                      <motion.path
                        d="M50 200 Q 200 350 350 200"
                        stroke="url(#gradient2)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                          <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800/50 backdrop-blur-sm border-y border-gray-700">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                About Me
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                  <p>
                    I'm a dynamic full stack developer with a foundation in business analysis and a deep interest in building impactful digital solutions. 
                    With over 3 years of experience working across data analytics, web development, and user-focused design, I bring a unique blend of logic, creativity, and strategic thinking to every project I take on.
                  </p>
                  <p>
                    My journey began with a curiosity about how systems work — both technical and human. That curiosity evolved into a passion for developing web applications that solve real-world problems, streamline processes, and deliver meaningful user experiences.
                  </p>
                  <p>
                    Whether it's creating responsive UIs, designing backend logic, or turning raw data into actionable insights, I love working across the full stack to bring ideas to life. I'm always exploring new technologies, refining my craft, and building solutions that blend function with purpose.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:gap-6"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 p-4 sm:p-6 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">3+</div>
                  <div className="text-gray-300 text-sm sm:text-base">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 p-4 sm:p-6 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">50+</div>
                  <div className="text-gray-300 text-sm sm:text-base">Projects Completed</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">15+</div>
                  <div className="text-gray-300 text-sm sm:text-base">Technologies</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 p-4 sm:p-6 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">100%</div>
                  <div className="text-gray-300 text-sm sm:text-base">Client Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Professional Experience
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-cyan-500/10 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="text-cyan-400 font-semibold mb-2">{exp.company}</div>
                    </div>
                    <div className="flex flex-col md:items-end text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start space-x-2 text-gray-300 text-sm sm:text-base">
                          <Award size={14} className="text-cyan-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800/50 backdrop-blur-sm border-y border-gray-700">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Featured Projects
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => handleProjectClick(project)}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-cyan-500/10 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <div className="mb-4">
                    <div className="text-xs sm:text-sm font-medium text-cyan-400 mb-2">{project.category}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectGithub(project);
                      }}
                      className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/30"
                    >
                      <Github size={16} className="sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base">Code</span>
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectDemo(project);
                        }}
                        className="flex items-center justify-center sm:justify-start space-x-2 text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/30"
                      >
                        <ExternalLink size={16} className="sm:w-4 sm:h-4" />
                        <span className="text-sm sm:text-base">Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Skills & Technologies
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Object.entries(skills).map(([category, skillData], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-cyan-500/10 transition-all"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                    <Zap size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
                    <span>{category}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillData.items.map(skill => (
                      <span key={skill} className="bg-gray-700/50 border border-gray-600 text-gray-300 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-300 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800/50 backdrop-blur-sm border-y border-gray-700">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Certificates & Credentials
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 sm:mb-8"></div>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Professional certifications that validate my expertise and commitment to continuous learning in technology and data analysis.
              </p>
            </motion.div>

            {/* Certificates Display */}
            <div className="relative">
              {/* Certificates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 min-h-[400px]">
                {certificates
                  .slice(currentCertPage * 6, (currentCertPage + 1) * 6)
                  .map((cert, index) => (
                    <motion.div
                      key={cert.credentialId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/50 ${
                        cert.featured ? 'ring-2 ring-cyan-400/50' : ''
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={16} className="text-white sm:w-5 sm:h-5" />
                          </div>
                          {cert.featured && (
                            <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </div>
                          )}
                        </div>
                        <div className="text-green-400">
                          <CheckCircle size={16} className="sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{cert.title}</h3>
                        <p className="text-cyan-400 font-semibold text-sm">{cert.issuer}</p>
                        
                        <div className="flex items-center text-xs sm:text-sm text-gray-400">
                          <Calendar size={12} className="mr-2 sm:w-3.5 sm:h-3.5" />
                          <span>{cert.date}</span>
                        </div>

                        {/* Skills */}
                        <div>
                          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                            {cert.skills.slice(0, 2).map(skill => (
                              <span key={skill} className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 2 && (
                              <span className="text-gray-400 text-xs px-2 py-1">
                                +{cert.skills.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Credential ID */}
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Credential ID:</p>
                          <p className="text-gray-300 text-xs font-mono bg-gray-700/50 px-2 py-1 rounded truncate">
                            {cert.credentialId}
                          </p>
                        </div>

                        {/* Verify Link */}
                        <a 
                          href={cert.verifyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center space-x-1 sm:space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm font-semibold mt-2 sm:mt-3"
                        >
                          <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                          <span>Verify Certificate</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6 sm:mt-8">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentCertPage(Math.max(0, currentCertPage - 1))}
                  disabled={currentCertPage === 0}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                    currentCertPage === 0
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25'
                  }`}
                >
                  <ChevronLeft size={16} className="sm:w-4 sm:h-4" />
                  <span>Previous</span>
                </button>

                {/* Page Indicators */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.ceil(certificates.length / 6) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCertPage(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        index === currentCertPage
                          ? 'bg-cyan-400 scale-125'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentCertPage(Math.min(Math.ceil(certificates.length / 6) - 1, currentCertPage + 1))}
                  disabled={currentCertPage >= Math.ceil(certificates.length / 6) - 1}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                    currentCertPage >= Math.ceil(certificates.length / 6) - 1
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Showing {currentCertPage * 6 + 1}-{Math.min((currentCertPage + 1) * 6, certificates.length)} of {certificates.length} certificates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Let's Have a Chat</h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Leave your email and I will get back to you within 24 hours
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
              {/* Left Side - PC Setup Background with Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] flex flex-col justify-end"
                style={{
                  backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="relative z-10 space-y-6 sm:space-y-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 italic">LET'S INNOVATE TOGETHER</h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2">EMAIL</h4>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        onClick={() => handleSocialClick('Email', personalInfo.email)}
                        className="text-white text-base sm:text-lg hover:text-cyan-300 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                    
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2">WORKING HOURS</h4>
                      <p className="text-white text-base sm:text-lg">10:00 AM - 6:00 PM</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2">ADDRESS</h4>
                      <p className="text-white text-base sm:text-lg">{personalInfo.location}</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4 sm:space-x-6 mt-6 sm:mt-8">
                    <motion.a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('GitHub', socialLinks.github)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} className="sm:w-6 sm:h-6" />
                    </motion.a>
                    
                    <motion.a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('LinkedIn', socialLinks.linkedin)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={20} className="sm:w-6 sm:h-6" />
                    </motion.a>
                    
                    <motion.a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('Twitter', socialLinks.twitter)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter size={20} className="sm:w-6 sm:h-6" />
                    </motion.a>
                    
                    <motion.a
                      href={`mailto:${personalInfo.email}`}
                      onClick={() => handleSocialClick('Email', personalInfo.email)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail size={20} className="sm:w-6 sm:h-6" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8"
              >
                <form className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Full Name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Project Discussion"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Looking for a proficient software developer skilled in React and Next.js for a specific project..."
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all resize-none text-sm sm:text-base"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Submit</span>
                    <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - MATCHING ARTISTABOUT STYLE */}
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
                  <h3 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Full Stack Developer & Data Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                Full Stack Developer & Data Enthusiast passionate about creating innovative solutions 
                that bridge technology and business objectives.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('GitHub', socialLinks.github)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('LinkedIn', socialLinks.linkedin)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
                <motion.a
                  href={socialLinks.x_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('X Twitter', socialLinks.x_twitter)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => handleSocialClick('Email', personalInfo.email)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <User size={14} className="sm:w-4 sm:h-4" />
                    <span>About Me</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('experience')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <Briefcase size={14} className="sm:w-4 sm:h-4" />
                    <span>Experience</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <Target size={14} className="sm:w-4 sm:h-4" />
                    <span>Projects</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('skills')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <Zap size={14} className="sm:w-4 sm:h-4" />
                    <span>Skills</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('certificates')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <GraduationCap size={14} className="sm:w-4 sm:h-4" />
                    <span>Certificates</span>
                  </button>
                </li>
                <li>
                  <Link 
                    to="/"
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
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
                    href={`mailto:${personalInfo.email}`}
                    onClick={() => handleSocialClick('Email', personalInfo.email)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <Mail size={14} className="sm:w-4 sm:h-4" />
                    <span>Email Me</span>
                  </a>
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
                <li>
                  <span className="text-gray-400 flex items-center space-x-2 text-sm sm:text-base">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <span>24-48h Response</span>
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 flex items-center space-x-2 text-sm sm:text-base">
                    <Sparkles size={14} className="sm:w-4 sm:h-4" />
                    <span>Open for Opportunities</span>
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
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={12} className="text-cyan-400 sm:w-3.5 sm:h-3.5" />
                <span>and React</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TechPage;