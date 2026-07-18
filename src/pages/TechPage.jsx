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
  Zap,
  Target,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAnalytics } from '../components/Analytics';
import { contentData } from '../utils/contentManager';

// Rotating role titles for the typing animation (module-level so the array reference is stable across renders)
const roles = [
  'Technical Analyst',
  'Developer',
  'Problem Solver'
];

const TechPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [currentCertPage, setCurrentCertPage] = useState(0);
  const [currentProjectPage, setCurrentProjectPage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Form state
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
  
  const analytics = useAnalytics();

  // Get data from content manager
  const projects = contentData.featured_projects;
  const skills = contentData.skills;
  const experience = contentData.experience;
  const workExperience = experience.filter(exp => exp.type === 'work');
  const education = experience.filter(exp => exp.type === 'education');
  const certificates = contentData.certifications;
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;
  const projectsPerPage = 4;
  const totalProjectPages = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = projects.slice(
    currentProjectPage * projectsPerPage,
    (currentProjectPage + 1) * projectsPerPage
  );

  // In-page navigation items
  const sectionNavItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const mobileMenuItems = [
    { id: 'hero', label: 'Home', icon: Home },
    ...sectionNavItems
  ];

  // Form handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status and start submitting
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });

    try {
      // Send to your Vercel API endpoint with pageType
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageType: 'tech' // This will route to himankarora1000@gmail.com
        }),
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
          analytics.trackPortfolioEvents.contactForm('tech-contact-form-success');
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
        analytics.trackPortfolioEvents.contactForm('tech-contact-form-error');
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
        errorMessage += 'Please try again or email me directly at himankarora1000@gmail.com';
      }
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: errorMessage
      });
    }
  };

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
  }, [displayText, isTyping, isDeleting, currentRoleIndex]);

  // Scroll detection
  useEffect(() => {
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
        title="Himank Arora - Technical Analyst & Developer"
        description="IT professional who bridges analysis and engineering: turning business needs into working products across data tools, web apps, and AI-enabled systems."
        keywords="technical analyst, developer, business analysis, React, Python, data analysis, Boston"
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
              {/* Desktop in-page section links */}
              <div className="hidden lg:flex items-center space-x-1">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-cyan-300'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-opacity duration-300 ${
                        activeSection === item.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                ))}
              </div>

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
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </div>

      {/* Floating Navigation - Mobile & Desktop */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 sm:top-28 left-0 right-0 z-40 flex justify-center px-3 sm:px-0"
          >
            <nav className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10">
              <div className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3">
                {sectionNavItems.map((item) => (
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
        {/* Subtle background atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-slate-500/10 rounded-full blur-3xl"></div>
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
              
              {/* Left side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-left space-y-3 sm:space-y-4 lg:space-y-5"
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                  className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gray-500 font-medium"
                >
                  Technical Analyst & Developer
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-1 sm:mb-2">
                    Hi, I'm
                  </h1>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 sm:mb-2 leading-tight"
                  >
                    Himank
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-5 leading-tight"
                  >
                    Arora
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-3 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[3rem]"
                >
                  <span className="text-cyan-400">
                    {displayText}
                    <span className="animate-pulse text-cyan-300">|</span>
                  </span>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-4 sm:mb-6"
                >
                  {personalInfo.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                >
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-white hover:bg-gray-100 text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base shadow-sm"
                  >
                    <Target size={16} className="sm:w-5 sm:h-5" />
                    <span>View My Work</span>
                  </button>
                  
                  <a
                    href={personalInfo.resume}
                    download
                    onClick={handleResumeDownload}
                    className="border border-gray-500/70 text-gray-200 hover:border-cyan-400/60 hover:text-cyan-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Download size={16} className="sm:w-5 sm:h-5" />
                    <span>Download Resume</span>
                  </a>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-sm sm:text-base text-gray-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline px-1 py-2 sm:py-0 text-left sm:text-center"
                  >
                    Get in Touch
                  </button>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex space-x-4 sm:space-x-6 pt-2 sm:pt-4"
                >
                  <a 
                    href={socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleSocialClick('GitHub', socialLinks.github)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Github size={22} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleSocialClick('LinkedIn', socialLinks.linkedin)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Linkedin size={22} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="mailto:himankarora1000@gmail.com"
                    onClick={() => handleSocialClick('Email', 'himankarora1000@gmail.com')}
                    className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110 p-2"
                  >
                    <Mail size={22} className="sm:w-6 sm:h-6" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Right side - Visual Animation - Responsive */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.65 }}
                className="relative flex items-center justify-center mt-6 lg:mt-0"
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
                        transition={{ delay: 0.9, duration: 0.4 }}
                        className="text-blue-400"
                      >
                        <span className="text-cyan-400">const</span> professional = {'{'}
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.15, duration: 0.4 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        name: <span className="text-green-400">'{personalInfo.name}'</span>,
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.4 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        skills: [<span className="text-green-400">'Analysis'</span>, <span className="text-green-400">'React'</span>],
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.65, duration: 0.4 }}
                        className="text-gray-300 ml-2 sm:ml-4"
                      >
                        focus: <span className="text-green-400">'Ship products'</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.9, duration: 0.4 }}
                        className="text-blue-400"
                      >
                        {'};'}
                      </motion.div>
                    </div>
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
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Background
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Bridging analysis and engineering to ship products people actually use.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                  <p>
                    I'm a Technical Analyst and developer with 3+ years as the sole technical resource at growing businesses: owning requirements and analysis, then shipping the tools myself across data platforms, web products, and AI-enabled applications.
                  </p>
                  <p>
                    I work both sides of the problem: eliciting needs, mapping workflows, and validating impact with data, while also designing and building the systems that make those improvements real.
                  </p>
                  <p>
                    Whether it's a reporting dashboard, a product workflow redesign, or a full-stack application, I care about clear problem framing, measurable outcomes, and software people actually use.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sm:p-8 space-y-5 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">At a glance</h3>
                <div className="space-y-4">
                  {[
                    { icon: Briefcase, label: 'Role', value: 'Technical Analyst & Developer' },
                    { icon: Clock, label: 'Experience', value: '3+ years analyzing and shipping products' },
                    { icon: GraduationCap, label: 'Education', value: 'MS Information Systems, Northeastern' },
                    { icon: MapPin, label: 'Location', value: 'Boston, MA' }
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start space-x-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-cyan-400 sm:w-[18px] sm:h-[18px]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400 mb-0.5">{label}</div>
                        <div className="text-sm sm:text-base text-white font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="relative py-16 sm:py-20 lg:py-24 px-3 sm:px-4 lg:px-6 overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900/90 to-gray-900"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,48rem)] h-64 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

          <div className="relative max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Career
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Experience & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Education</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                A clear view of my professional path and academic foundation.
              </p>
            </motion.div>

            {/* Professional Experience — centered timeline */}
            <div className="mb-16 sm:mb-24">
              <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                  <Briefcase size={18} className="text-cyan-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Professional Experience</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">Roles and impact across organizations</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gray-700/80 md:-translate-x-1/2" />

                <div className="space-y-12 sm:space-y-16">
                  {workExperience.map((exp, index) => (
                    <motion.div
                      key={exp.id || index}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 lg:gap-14"
                    >
                      {/* Timeline node */}
                      <div
                        className={`absolute left-4 md:left-1/2 top-3 md:top-4 w-3 h-3 rounded-full -translate-x-1/2 z-10 ${
                          index === 0
                            ? 'bg-cyan-400 ring-[6px] ring-cyan-400/20 shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                            : 'bg-white ring-[3px] ring-gray-800'
                        }`}
                      />

                      {/* Left: date, title, company */}
                      <div className="pl-10 md:pl-0 md:pr-8 lg:pr-12 md:text-right">
                        <span className="inline-block mb-3 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700/80 text-xs sm:text-sm text-gray-200">
                          {exp.duration}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                          {exp.title}
                        </h4>
                        <p className="mt-1.5 text-cyan-400 font-medium text-sm sm:text-base">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="mt-1 text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 md:justify-end">
                            <MapPin size={12} className="text-gray-500 shrink-0" />
                            {exp.location}
                          </p>
                        )}
                      </div>

                      {/* Right: description, achievements, skills */}
                      <div className="pl-10 md:pl-8 lg:pl-12">
                        {exp.description && (
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                            {exp.description}
                          </p>
                        )}

                        {exp.achievements?.length > 0 && (
                          <ul className="space-y-2 mb-5">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                                <span className="mt-2 h-1 w-1 rounded-full bg-cyan-400/80 shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {exp.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md bg-gray-800/80 border border-gray-700/70 text-xs text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education — same centered timeline */}
            <div id="education" className="scroll-mt-24">
              <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 flex items-center justify-center">
                  <GraduationCap size={18} className="text-blue-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Education</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">Academic credentials and foundation</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gray-700/80 md:-translate-x-1/2" />

                <div className="space-y-12 sm:space-y-14">
                  {education.map((exp, index) => (
                    <motion.div
                      key={exp.id || index}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 lg:gap-14"
                    >
                      <div
                        className={`absolute left-4 md:left-1/2 top-3 md:top-4 w-3 h-3 rounded-full -translate-x-1/2 z-10 ${
                          index === 0
                            ? 'bg-blue-400 ring-[6px] ring-blue-400/20 shadow-[0_0_18px_rgba(96,165,250,0.4)]'
                            : 'bg-white ring-[3px] ring-gray-800'
                        }`}
                      />

                      <div className="pl-10 md:pl-0 md:pr-8 lg:pr-12 md:text-right">
                        <span className="inline-block mb-3 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700/80 text-xs sm:text-sm text-gray-200">
                          {exp.duration}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                          {exp.title}
                        </h4>
                        <p className="mt-1.5 text-blue-400 font-medium text-sm sm:text-base">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="mt-1 text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 md:justify-end">
                            <MapPin size={12} className="text-gray-500 shrink-0" />
                            {exp.location}
                          </p>
                        )}
                      </div>

                      <div className="pl-10 md:pl-8 lg:pl-12">
                        {exp.description && (
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                            {exp.description}
                          </p>
                        )}

                        {exp.skills?.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2.5 font-medium">
                              Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-md bg-gray-800/80 border border-gray-700/70 text-xs text-gray-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-800/50 backdrop-blur-sm border-y border-gray-700">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Selected Work
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Products and tools I've analyzed, designed, and shipped end to end.
              </p>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 min-h-[400px]">
                {paginatedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.2 }}
                    onClick={() => handleProjectClick(project)}
                    className="group flex flex-col h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-400/30 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col flex-1 p-6 sm:p-7">
                      <div className="text-xs font-medium uppercase tracking-wide text-cyan-400 mb-2 h-4">
                        {project.category}
                      </div>

                      <h3
                        className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug h-[3.25rem] sm:h-[3.5rem] overflow-hidden group-hover:text-cyan-300 transition-colors"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                        title={project.title}
                      >
                        {project.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base h-[6.5rem] overflow-y-auto pr-1 mb-4">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <div className="rounded-lg border border-gray-700/80 bg-gray-900/40 p-3 sm:p-4 h-[6.25rem] flex flex-col">
                          <div className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2.5 shrink-0">
                            Tech stack
                          </div>
                          <div className="flex flex-wrap gap-2 content-start overflow-y-auto">
                            {project.tech.map(tech => (
                              <span
                                key={tech}
                                className="bg-blue-500/15 border border-blue-500/25 text-blue-300 px-2.5 py-1 rounded-md text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 h-[52px] px-6 sm:px-7 border-t border-gray-700/80 bg-gray-900/30 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectGithub(project);
                          }}
                          className="inline-flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-gray-700/40 text-sm"
                        >
                          <Github size={15} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.demo && project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectDemo(project);
                          }}
                          className="inline-flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-gray-700/40 text-sm"
                        >
                          <ExternalLink size={15} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalProjectPages > 1 && (
                <>
                  <div className="flex items-center justify-between mt-6 sm:mt-8">
                    <button
                      onClick={() => setCurrentProjectPage(Math.max(0, currentProjectPage - 1))}
                      disabled={currentProjectPage === 0}
                      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                        currentProjectPage === 0
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25'
                      }`}
                    >
                      <ChevronLeft size={16} className="sm:w-4 sm:h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalProjectPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentProjectPage(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                            index === currentProjectPage
                              ? 'bg-cyan-400 scale-125'
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                          aria-label={`Go to projects page ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentProjectPage(Math.min(totalProjectPages - 1, currentProjectPage + 1))}
                      disabled={currentProjectPage >= totalProjectPages - 1}
                      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                        currentProjectPage >= totalProjectPages - 1
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="text-center mt-3 sm:mt-4">
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Showing {currentProjectPage * projectsPerPage + 1}-{Math.min((currentProjectPage + 1) * projectsPerPage, projects.length)} of {projects.length} projects
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Toolkit
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Skills & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technologies</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                The stack I use to analyze problems and build solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Object.entries(skills).map(([category, skillData], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-cyan-400/30 transition-colors"
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
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Credentials
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Certificates & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Credentials</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
                Professional certifications that validate expertise and continuous learning in technology and data analysis.
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
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-cyan-400/30 transition-colors duration-300 ${
                        cert.featured ? 'ring-1 ring-cyan-400/40' : ''
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
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-gray-400 border border-gray-600/60 rounded-full">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Let's Have a <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Chat</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Leave your email and I will get back to you within 24 hours
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
              {/* Left Side - PC Setup Background with Info */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] flex flex-col justify-end"
              >
                <div className="relative z-10 space-y-6 sm:space-y-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Get in touch</h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2">EMAIL</h4>
                      <a 
                        href="mailto:himankarora1000@gmail.com"
                        onClick={() => handleSocialClick('Email', 'himankarora1000@gmail.com')}
                        className="text-white text-base sm:text-lg hover:text-cyan-300 transition-colors"
                      >
                        himankarora1000@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2">WORKING HOURS</h4>
                      <p className="text-white text-base sm:text-lg">10:00 AM - 6:00 PM EST</p>
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
                      href={socialLinks.x_twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick('X Twitter', socialLinks.x_twitter)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.a>
                    
                    <motion.a
                      href="mailto:himankarora1000@gmail.com"
                      onClick={() => handleSocialClick('Email', 'himankarora1000@gmail.com')}
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8"
              >
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
                        <p className="text-green-400 text-xs sm:text-sm">I'll get back to you within 24 hours.</p>
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

                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" className="text-gray-400">Select a subject</option>
                      <option value="project-inquiry" className="text-gray-900">Project Inquiry</option>
                      <option value="collaboration" className="text-gray-900">Collaboration Opportunity</option>
                      <option value="job-opportunity" className="text-gray-900">Job Opportunity</option>
                      <option value="freelance-work" className="text-gray-900">Freelance Work</option>
                      <option value="consultation" className="text-gray-900">Technical Consultation</option>
                      <option value="general" className="text-gray-900">General Inquiry</option>
                      <option value="other" className="text-gray-900">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Tell me about the role, project, or problem you're working on..."
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all resize-none text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg shadow-cyan-500/25 disabled:shadow-gray-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base disabled:cursor-not-allowed"
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
                        <span>Submit</span>
                        <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                      </>
                    )}
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
                  <p className="text-gray-400 text-xs sm:text-sm">Technical Analyst & Developer</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                Technical Analyst and developer: bridging business needs with working products that teams actually adopt.
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
                  href="mailto:himankarora1000@gmail.com"
                  onClick={() => handleSocialClick('Email', 'himankarora1000@gmail.com')}
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
                    <span>Experience & Education</span>
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
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Get In Touch</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a 
                    href="mailto:himankarora1000@gmail.com"
                    onClick={() => handleSocialClick('Email', 'himankarora1000@gmail.com')}
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
                    <Briefcase size={14} className="sm:w-4 sm:h-4" />
                    <span>Open to opportunities</span>
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
    </>
  );
};

export default TechPage;