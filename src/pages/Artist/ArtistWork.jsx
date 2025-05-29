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
  Zap
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
      {/* Redesigned Refresh Button with Text */}
      <motion.button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={`
          group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border-2
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
              size={18} 
              className={`${isRefreshing ? 'text-gray-400' : 'text-gray-300 group-hover:text-purple-400'} transition-colors`} 
            />
          </motion.div>

          {/* Status Dot Indicator */}
          <div className="absolute -top-1 -right-1 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-2.5 h-2.5 rounded-full border border-gray-800 ${
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

        {/* Button Text */}
        <span className={`text-sm font-medium relative z-10 ${
          isRefreshing ? 'text-gray-400' : 'text-gray-300 group-hover:text-purple-400'
        } transition-colors`}>
          {isRefreshing ? 'Checking...' : 'Check for New Videos'}
        </span>

        {/* Loading Overlay */}
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
          >
            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.button>

      {/* Enhanced Cache Details Tooltip */}
      <AnimatePresence>
        {showDetails && cacheInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-50"
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

  // Get data from content manager
  const personalInfo = contentData.personal;
  const artistData = contentData.artist;
  
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
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                My <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Creative Work</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore my content across music, gaming, and personal vlogs. Each category showcases different aspects of my creative journey.
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-8 max-w-4xl mx-auto"
              >
                <p className="text-red-300 text-center">
                  <strong>API Error:</strong> {error}. Showing sample content instead.
                </p>
              </motion.div>
            )}

            {/* Tab Navigation with Refresh Button */}
            <motion.div variants={itemVariants} className="flex justify-center items-center gap-6 mb-8">
              {/* Tab Navigation */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2">
                <div className="flex space-x-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => handleTabSwitch(tab.id)}
                      className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon size={20} />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Refresh Button positioned to the right of tabs */}
              <RefreshVideosButton 
                channelType={activeTab === 'Gaming' ? 'gaming' : 'music'}
                onRefresh={handleManualRefresh}
              />
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-pink-400"
                >
                  <Loader size={48} />
                </motion.div>
                <span className="text-white text-xl ml-4">Loading amazing content...</span>
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
                  className="space-y-12"
                >
                  {/* Refreshing Indicator */}
                  {isRefreshing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-xl px-4 py-2">
                        <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-purple-300 text-sm">Refreshing videos...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Main Featured Video */}
                  {getMainVideo() && (
                    <div>
                      {/* Latest Video Label */}
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white text-center">
                          Watch <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Latest</span> Video
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                                      className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play size={32} className="text-white ml-1" fill="white" />
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
                                  className="absolute top-4 right-4 w-10 h-10 bg-black/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border-2 border-white/20 hover:border-red-400 shadow-lg"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <span className="text-lg font-bold leading-none">×</span>
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Video Info & YouTube Subscribe */}
                        <div className="lg:col-span-2 space-y-6 h-full flex flex-col">
                          <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                              {getMainVideo().title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                              {getMainVideo().description || 'Check out this amazing content! Don\'t forget to like and subscribe for more.'}
                            </p>
                          </div>

                          {/* YouTube Subscribe Section - Fixed to bottom */}
                          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-6 mt-auto shadow-xl">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <Youtube size={28} className="text-white" />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white">
                                  {getChannelInfo().name}
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  {getChannelInfo().subscribers} subscribers
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                              Subscribe for more {activeTab.toLowerCase()} content and join our amazing community!
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <motion.a
                                href={getChannelInfo().url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                                className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-red-500/25"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Youtube size={20} />
                                <span>Subscribe</span>
                              </motion.a>
                              
                              <motion.a
                                href={`https://www.youtube.com/watch?v=${getMainVideo().videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleChannelVisit(`https://www.youtube.com/watch?v=${getMainVideo().videoId}`, 'video')}
                                className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-gray-500/50 shadow-lg hover:shadow-gray-500/25"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink size={20} />
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
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-white">
                          More <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{activeTab}</span> Content
                        </h3>
                        
                        {/* More Videos Button */}
                        <motion.a
                          href={getChannelInfo().url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-red-500/20 hover:to-red-600/20 border border-gray-600/50 hover:border-red-500/50 text-gray-300 hover:text-red-400 px-4 py-2 rounded-xl font-semibold transition-all backdrop-blur-sm shadow-lg hover:shadow-red-500/25"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Youtube size={18} />
                          <span>More Videos</span>
                          <ExternalLink size={14} />
                        </motion.a>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="text-center py-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-gray-400"
                      >
                        <Youtube size={64} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                        <p>Content will appear here once videos are uploaded to the channel.</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
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
                  <motion.a
                    href={contentData.social.youtube_music}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('YouTube Music', contentData.social.youtube_music)}
                    className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Youtube size={18} />
                  </motion.a>
                  <motion.a
                    href={contentData.social.youtube_gaming}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('YouTube Gaming', contentData.social.youtube_gaming)}
                    className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Youtube size={18} />
                  </motion.a>
                  <motion.a
                    href={contentData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Instagram', contentData.social.instagram)}
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a
                    href={contentData.social.x_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('X Twitter', contentData.social.x_twitter)}
                    className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href={contentData.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Facebook', contentData.social.facebook)}
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a
                    href={contentData.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('Discord', contentData.social.discord)}
                    className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MessageSquare size={18} />
                  </motion.a>
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

              {/* Contact Info */}
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

export default ArtistWork;