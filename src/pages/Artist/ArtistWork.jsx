import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Play,
  Music,
  Gamepad2,
  Camera,
  ExternalLink,
  Youtube,
  Heart,
  Eye,
  Calendar,
  Home,
  User,
  Mail,
  Brush,
  Palette,
  Subscribe,
  PlayCircle,
  Instagram,
  Facebook,
  MessageSquare,
  Sparkles,
  Clock,
  MapPin,
  Globe,
  Loader,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { getChannelVideos, testYouTubeAPI, forceRefreshVideos, getCacheInfo } from '../../services/youtubeService';
import YouTubeVideo from '../../components/YouTubeVideo';
import SEO from '../../components/SEO';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';

// Redesigned Refresh Videos Button Component (integrated directly)
const RefreshVideosButton = ({ channelType = 'music', onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cacheInfo, setCacheInfo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // Update cache info on component mount and periodically
  useEffect(() => {
    const updateCacheInfo = () => {
      const info = getCacheInfo(channelType);
      setCacheInfo(info);
    };

    updateCacheInfo();
    const interval = setInterval(updateCacheInfo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [channelType]);

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setLastRefreshTime(new Date());

    try {
      console.log(`🔄 Manual refresh triggered for ${channelType}`);
      const newVideos = await forceRefreshVideos(channelType);
      
      // Update cache info immediately
      const updatedInfo = getCacheInfo(channelType);
      setCacheInfo(updatedInfo);
      
      // Notify parent component
      if (onRefresh) {
        onRefresh(newVideos);
      }
      
      console.log(`✅ Manual refresh completed for ${channelType}`);
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = () => {
    if (!cacheInfo?.hasCache) return 'text-gray-400';
    if (cacheInfo.isExpired) return 'text-yellow-400';
    if (cacheInfo.hoursOld < 1) return 'text-green-400';
    if (cacheInfo.hoursOld < 3) return 'text-blue-400';
    return 'text-orange-400';
  };

  const getStatusIcon = () => {
    if (!cacheInfo?.hasCache) return AlertCircle;
    if (cacheInfo.isExpired) return AlertCircle;
    if (cacheInfo.hoursOld < 1) return CheckCircle;
    return Clock;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="relative">
      {/* Mobile Responsive Refresh Button */}
      <motion.button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={`
          group relative flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border-2 text-sm sm:text-base
          ${isRefreshing 
            ? 'bg-gray-600/50 border-gray-500/50 cursor-not-allowed' 
            : 'bg-gray-800/50 border-gray-600/50 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/50 hover:scale-105'
          }
          backdrop-blur-sm
        `}
        whileHover={!isRefreshing ? { scale: 1.05 } : {}}
        whileTap={!isRefreshing ? { scale: 0.95 } : {}}
        onHoverStart={() => setShowDetails(true)}
        onHoverEnd={() => setShowDetails(false)}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon Container with Status Dot */}
        <div className="relative">
          {/* Refresh Icon with Animation */}
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={isRefreshing ? { 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            } : { duration: 0.3 }}
            className="relative z-10"
          >
            <RefreshCw 
              size={16} 
              className={`sm:w-[18px] sm:h-[18px] ${isRefreshing ? 'text-gray-400' : 'text-gray-300 group-hover:text-purple-400'} transition-colors`} 
            />
          </motion.div>

          {/* Status Dot Indicator */}
          <div className="absolute -top-1 -right-1 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-gray-800 ${
                !cacheInfo?.hasCache ? 'bg-gray-500' :
                cacheInfo.isExpired ? 'bg-yellow-400' :
                cacheInfo.hoursOld < 1 ? 'bg-green-400' :
                cacheInfo.hoursOld < 3 ? 'bg-blue-400' : 'bg-orange-400'
              }`}
            >
              {/* Pulse effect for fresh cache */}
              {cacheInfo?.hasCache && !cacheInfo.isExpired && cacheInfo.hoursOld < 1 && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Button Text - Hidden on very small screens */}
        <span className={`hidden xs:inline text-xs sm:text-sm font-medium relative z-10 ${
          isRefreshing ? 'text-gray-400' : 'text-gray-300 group-hover:text-purple-400'
        } transition-colors`}>
          {isRefreshing ? 'Checking...' : 'Check for New Videos'}
        </span>

        {/* Mobile-only shorter text */}
        <span className={`xs:hidden text-xs font-medium relative z-10 ${
          isRefreshing ? 'text-gray-400' : 'text-gray-300 group-hover:text-purple-400'
        } transition-colors`}>
          {isRefreshing ? 'Checking...' : 'Refresh'}
        </span>

        {/* Loading Overlay */}
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
          >
            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.button>

      {/* Enhanced Cache Details Tooltip - Mobile Responsive */}
      <AnimatePresence>
        {showDetails && cacheInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-50 hidden sm:block"
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl min-w-[250px]">
              {/* Header */}
              <div className="flex items-center space-x-2 mb-3">
                <StatusIcon size={14} className={getStatusColor()} />
                <span className="text-white font-medium text-sm">
                  {channelType === 'gaming' ? 'Gaming' : 'Music'} Cache
                </span>
              </div>

              {/* Cache Details */}
              <div className="space-y-2 text-xs">
                {cacheInfo.hasCache ? (
                  <>
                    <div className="flex justify-between text-gray-300">
                      <span>Updated:</span>
                      <span className="text-cyan-400 font-mono">
                        {cacheInfo.lastUpdated.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Age:</span>
                      <span className={`${getStatusColor()} font-mono`}>
                        {cacheInfo.hoursOld}h
                      </span>
                    </div>
                    {!cacheInfo.isExpired && (
                      <div className="flex justify-between text-gray-300">
                        <span>Expires:</span>
                        <span className="text-green-400 font-mono">
                          {cacheInfo.hoursUntilExpiry}h
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400">No cache found</p>
                )}
              </div>

              {/* Status Message */}
              <div className="mt-3 pt-2 border-t border-gray-700">
                <p className={`text-xs ${cacheInfo.isExpired ? 'text-yellow-400' : 'text-green-400'}`}>
                  {!cacheInfo.hasCache ? 'Will fetch fresh data' :
                   cacheInfo.isExpired ? 'Cache expired - click to refresh' : 
                   'Cache is fresh'}
                </p>
              </div>

              {/* Last Manual Refresh */}
              {lastRefreshTime && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Zap size={10} />
                    <span>
                      Refreshed: {lastRefreshTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* Arrow pointer */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-900 border-l border-t border-gray-700/50 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {lastRefreshTime && Date.now() - lastRefreshTime < 2000 && !isRefreshing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium shadow-lg"
          >
            ✓ Refreshed
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArtistWork = () => {
  const location = useLocation();
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState('Music');
  const [youtubeVideos, setYoutubeVideos] = useState({
    Music: [],
    Gaming: [],
    'Raw Me': []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get data from content manager
  const personalInfo = contentData.personal;
  const artistData = contentData.artist;

  // Mobile menu items
  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/artist' },
    { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
    { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' }
  ];
  
  const isActive = (path) => location.pathname === path;

  const tabs = [
    { 
      id: 'Music', 
      label: 'Music', 
      icon: Music, 
      color: 'from-pink-500 to-rose-500',
      description: 'Original compositions and musical creations'
    },
    { 
      id: 'Gaming', 
      label: 'Gaming', 
      icon: Gamepad2, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Epic gaming sessions and walkthroughs'
    },
    { 
      id: 'Raw Me', 
      label: 'Raw Me', 
      icon: Camera, 
      color: 'from-purple-500 to-indigo-500',
      description: 'Behind the scenes and personal vlogs'
    }
  ];

  // Analytics event handlers
  const handleNavigationClick = (section) => {
    setIsMobileMenuOpen(false);
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
    // Stop video playback when switching tabs
    if (isVideoPlaying) {
      setSelectedVideo(null);
      setIsVideoPlaying(false);
    }
    
    // Track tab switch
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('artist-work', newTab);
    }
  };

  const handleVideoPlay = (videoId) => {
    setSelectedVideo(videoId);
    setIsVideoPlaying(true);
    
    // Track video play
    if (analytics?.trackPortfolioEvents) {
      const video = getCurrentVideos().find(v => v.videoId === videoId);
      if (video) {
        analytics.trackPortfolioEvents.videoPlay(videoId, video.title, 'artist-portfolio');
      }
    }
  };

  const handleGalleryVideoClick = (clickedVideo) => {
    if (!clickedVideo) return;
    
    const currentVideos = getCurrentVideos();
    if (currentVideos.length === 0) return;
    
    // Find the clicked video in the current list
    const clickedIndex = currentVideos.findIndex(video => video.videoId === clickedVideo.videoId);
    if (clickedIndex === -1) return; // Not found
    
    // If it's already the main video (index 0), just play it
    if (clickedIndex === 0) {
      setSelectedVideo(clickedVideo.videoId);
      setIsVideoPlaying(true);
      if (analytics?.trackPortfolioEvents) {
        analytics.trackPortfolioEvents.videoPlay(clickedVideo.videoId, clickedVideo.title, 'artist-portfolio');
      }
      console.log(`▶️ Playing main video: "${clickedVideo.title}"`);
      return;
    }
    
    // Create new array with swapped videos
    const newVideos = [...currentVideos];
    [newVideos[0], newVideos[clickedIndex]] = [newVideos[clickedIndex], newVideos[0]];
    
    // Update the videos state
    setYoutubeVideos(prev => ({
      ...prev,
      [activeTab]: newVideos,
      // Also update Raw Me if it was using music videos
      ...(activeTab === 'Music' && { 'Raw Me': newVideos.slice(0, 4) })
    }));
    
    // Start playing the newly swapped main video
    setSelectedVideo(clickedVideo.videoId);
    setIsVideoPlaying(true);
    
    // Track video swap and play
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.videoSwap(currentVideos[0].videoId, clickedVideo.videoId);
      analytics.trackPortfolioEvents.videoPlay(clickedVideo.videoId, clickedVideo.title, 'artist-portfolio');
    }
    
    console.log(`🔄 Swapped and playing video: "${clickedVideo.title}"`);
  };

  const handleChannelVisit = (channelUrl, channelType) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.channelVisit(channelType, channelUrl);
    }
  };

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Starting YouTube API fetch...');
        
        // Test API connection first
        const apiTest = await testYouTubeAPI();
        if (!apiTest) {
          throw new Error('YouTube API connection failed');
        }

        // Fetch videos from both channels (using 6-hour cache)
        const [musicVideos, gamingVideos] = await Promise.all([
          getChannelVideos('music', 8),
          getChannelVideos('gaming', 8)
        ]);

        console.log('Fetched videos:', { 
          music: musicVideos.length, 
          gaming: gamingVideos.length 
        });

        setYoutubeVideos({
          Music: musicVideos,
          Gaming: gamingVideos,
          'Raw Me': musicVideos.slice(0, 4) // Use music videos for Raw Me or create separate channel
        });

      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        setError(error.message);
        
        // Fallback to static data if API fails
        setYoutubeVideos({
          Music: getFallbackVideos('music'),
          Gaming: getFallbackVideos('gaming'),
          'Raw Me': getFallbackVideos('raw')
        });
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  // Handle manual refresh from RefreshVideosButton
  const handleManualRefresh = async (refreshedVideos) => {
    setIsRefreshing(true);
    try {
      // Determine which channel was refreshed based on activeTab
      const channelType = activeTab === 'Gaming' ? 'gaming' : 'music';
      
      // Update the videos state with fresh data
      setYoutubeVideos(prev => ({
        ...prev,
        [activeTab]: refreshedVideos,
        // Also update Raw Me if it was using music videos
        ...(activeTab === 'Music' && { 'Raw Me': refreshedVideos.slice(0, 4) })
      }));
      
      console.log(`✅ Manual refresh completed for ${activeTab}`);
    } catch (error) {
      console.error('Error handling manual refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fallback static data in case YouTube API fails
  const getFallbackVideos = (type) => {
    const fallbackData = {
      music: [
        {
          videoId: "dQw4w9WgXcQ",
          title: "Symphony of Dreams - Original Composition",
          description: "My latest original piece featuring a blend of classical and modern elements.",
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: "Himank Arora"
        },
        {
          videoId: "dQw4w9WgXcQ",
          title: "Midnight Melody",
          description: "A soothing composition perfect for late night listening.",
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: "Himank Arora"
        }
      ],
      gaming: [
        {
          videoId: "dQw4w9WgXcQ",
          title: "Epic Boss Battle - Elden Ring",
          description: "Watch me take on one of the toughest bosses in Elden Ring!",
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: "Himank Gaming"
        }
      ],
      raw: [
        {
          videoId: "dQw4w9WgXcQ",
          title: "My Creative Process - Behind the Scenes",
          description: "Take a deep dive into how I create content.",
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: "Himank Arora"
        }
      ]
    };
    
    return fallbackData[type] || [];
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsVideoPlaying(false);
  };

  const getCurrentVideos = () => {
    return youtubeVideos[activeTab] || [];
  };

  const getMainVideo = () => {
    const videos = getCurrentVideos();
    return videos.length > 0 ? videos[0] : null;
  };

  const getGalleryVideos = () => {
    const videos = getCurrentVideos();
    return videos.slice(1); // Skip the first video (main video)
  };

  const getChannelInfo = () => {
    switch (activeTab) {
      case 'Music':
        return {
          name: 'Himank Arora',
          subscribers: '1.2K',
          url: 'https://youtube.com/@himankarora'
        };
      case 'Gaming':
        return {
          name: 'Himank Gaming',
          subscribers: '850',
          url: 'https://youtube.com/@himankaroragaming'
        };
      default:
        return {
          name: 'Himank Arora',
          subscribers: '1.2K',
          url: 'https://youtube.com/@himankarora'
        };
    }
  };

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

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* SEO */}
      <SEO 
        title={`${personalInfo.name} - Creative Work & Content`}
        description="Explore my content across music, gaming, and personal vlogs. Each category showcases different aspects of my creative journey."
        keywords="creative work, music content, gaming videos, content creation, YouTube, streaming"
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
          {[...Array(15)].map((_, i) => (
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
            <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                My <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Creative Work</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Explore my content across music, gaming, and personal vlogs. Each category showcases different aspects of my creative journey.
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 max-w-4xl mx-auto"
              >
                <p className="text-red-300 text-center text-sm sm:text-base">
                  <strong>API Error:</strong> {error}. Showing sample content instead.
                </p>
              </motion.div>
            )}

            {/* Tab Navigation with Refresh Button - Mobile Responsive */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Tab Navigation */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 w-full sm:w-auto">
                <div className="flex flex-row sm:space-x-2 overflow-x-auto">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => handleTabSwitch(tab.id)}
                      className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon size={16} className="sm:w-5 sm:h-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Refresh Button positioned below on mobile, right on desktop */}
              <RefreshVideosButton 
                channelType={activeTab === 'Gaming' ? 'gaming' : 'music'}
                onRefresh={handleManualRefresh}
              />
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12 sm:py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-pink-400"
                >
                  <Loader size={36} className="sm:w-12 sm:h-12" />
                </motion.div>
                <span className="text-white text-lg sm:text-xl ml-4">Loading amazing content...</span>
              </div>
            )}

            {/* Tab Content */}
            {!loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8 sm:space-y-12"
                >
                  {/* Refreshing Indicator */}
                  {isRefreshing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-xl px-4 py-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-purple-300 text-xs sm:text-sm">Refreshing videos...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Main Featured Video */}
                  {getMainVideo() && (
                    <div>
                      {/* Latest Video Label */}
                      <div className="mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                          Watch <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Latest</span> Video
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
                        {/* Video Player */}
                        <div className="lg:col-span-3">
                          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden group">
                            {!isVideoPlaying || selectedVideo !== getMainVideo().videoId ? (
                              // Thumbnail View
                              <>
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                  <img 
                                    src={getMainVideo().thumbnail} 
                                    alt={getMainVideo().title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                                  
                                  {/* Play Button */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                      onClick={() => handleVideoPlay(getMainVideo().videoId)}
                                      className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play size={24} className="text-white ml-1 sm:w-8 sm:h-8" fill="white" />
                                    </motion.button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // Embedded YouTube Player
                              <div className="aspect-video relative">
                                <iframe
                                  src={`https://www.youtube.com/embed/${getMainVideo().videoId}?autoplay=1&rel=0&modestbranding=1`}
                                  title={getMainVideo().title}
                                  className="w-full h-full rounded-2xl"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                                
                                {/* Close Button */}
                                <motion.button
                                  onClick={handleCloseVideo}
                                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border-2 border-white/20 hover:border-red-400 shadow-lg"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <span className="text-base sm:text-lg font-bold leading-none">×</span>
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Video Info & YouTube Subscribe */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6 h-full flex flex-col">
                          <div className="flex-grow">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                              {getMainVideo().title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                              {getMainVideo().description || 'Check out this amazing content! Don\'t forget to like and subscribe for more.'}
                            </p>
                          </div>

                          {/* YouTube Subscribe Section */}
                          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-4 sm:p-6 mt-auto shadow-xl">
                            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <Youtube size={20} className="text-white sm:w-7 sm:h-7" />
                              </div>
                              <div>
                                <h4 className="text-base sm:text-lg font-bold text-white">
                                  {getChannelInfo().name}
                                </h4>
                                <p className="text-gray-300 text-xs sm:text-sm">
                                  {getChannelInfo().subscribers} subscribers
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                              Subscribe for more {activeTab.toLowerCase()} content and join our amazing community!
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                              <motion.a
                                href={getChannelInfo().url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                                className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-red-500/25 text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Youtube size={16} className="sm:w-5 sm:h-5" />
                                <span>Subscribe</span>
                              </motion.a>
                              
                              <motion.a
                                href={`https://www.youtube.com/watch?v=${getMainVideo().videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleChannelVisit(`https://www.youtube.com/watch?v=${getMainVideo().videoId}`, 'video')}
                                className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all border border-gray-500/50 shadow-lg hover:shadow-gray-500/25 text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                                <span>View on YouTube</span>
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Gallery */}
                  {getGalleryVideos().length > 0 && (
                    <div>
                      {/* Gallery Header with More Videos Button */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          More <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{activeTab}</span> Content
                        </h3>
                        
                        {/* More Videos Button */}
                        <motion.a
                          href={getChannelInfo().url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-red-500/20 hover:to-red-600/20 border border-gray-600/50 hover:border-red-500/50 text-gray-300 hover:text-red-400 px-3 sm:px-4 py-2 rounded-xl font-semibold transition-all backdrop-blur-sm shadow-lg hover:shadow-red-500/25 text-sm sm:text-base"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span>More Videos</span>
                          <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                        </motion.a>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {getGalleryVideos().map((video, index) => (
                          <YouTubeVideo
                            key={video.videoId}
                            video={video}
                            onPlay={() => handleGalleryVideoClick(video)}
                            index={index + 1}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Videos Message */}
                  {getCurrentVideos().length === 0 && !loading && (
                    <div className="text-center py-12 sm:py-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-gray-400"
                      >
                        <Youtube size={48} className="mx-auto mb-4 opacity-50 sm:w-16 sm:h-16" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No videos found</h3>
                        <p className="text-sm sm:text-base">Content will appear here once videos are uploaded to the channel.</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
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
                  Creating authentic content through music, gaming, and digital storytelling. 
                  Join me on this creative journey across multiple platforms.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <motion.a
                    href={contentData.social.youtube_music}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('YouTube Music', contentData.social.youtube_music)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                  <motion.a
                    href={contentData.social.youtube_gaming}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('YouTube Gaming', contentData.social.youtube_gaming)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                  <motion.a
                    href={contentData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Instagram', contentData.social.instagram)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                  <motion.a
                    href={contentData.social.x_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('X Twitter', contentData.social.x_twitter)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="sm:w-[18px] sm:h-[18px]">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href={contentData.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Facebook', contentData.social.facebook)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                  <motion.a
                    href={contentData.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Discord', contentData.social.discord)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
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

              {/* Contact Info */}
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
                      <Sparkles size={14} className="sm:w-4 sm:h-4" />
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

export default ArtistWork;