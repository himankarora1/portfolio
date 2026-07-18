import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play,
  Music,
  Gamepad2,
  ExternalLink,
  Youtube,
  Loader,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap,
  Clock
} from 'lucide-react';
import { getChannelVideos, testYouTubeAPI, forceRefreshVideos, getCacheInfo } from '../../services/youtubeService';
import YouTubeVideo from '../../components/YouTubeVideo';
import SEO from '../../components/SEO';
import ArtistPageShell from '../../components/Artist/ArtistPageShell';
import ArtistFooter from '../../components/Artist/ArtistFooter';
import { artistPagePad, artistPageWidth, artistBtnPrimary, artistBtnSecondary, artistBtnGhost, artistHeadingAccent } from '../../utils/artistLayout';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';

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
      const newVideos = await forceRefreshVideos(channelType);
      
      // Update cache info immediately
      const updatedInfo = getCacheInfo(channelType);
      setCacheInfo(updatedInfo);
      
      // Notify parent component
      if (onRefresh) {
        onRefresh(newVideos);
      }
    } catch (error) {
      console.error('Manual refresh failed:', error);
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
        className={`${artistBtnGhost} ${isRefreshing ? 'cursor-not-allowed opacity-50' : ''}`}
        whileHover={!isRefreshing ? { scale: 1.02 } : {}}
        whileTap={!isRefreshing ? { scale: 0.98 } : {}}
        onHoverStart={() => setShowDetails(true)}
        onHoverEnd={() => setShowDetails(false)}
      >
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
          transition={isRefreshing ? { 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            } : { duration: 0.3 }}
        >
            <RefreshCw 
              size={16} 
              className={`sm:w-[18px] sm:h-[18px] ${isRefreshing ? 'text-gray-400' : 'text-current'}`} 
            />
        </motion.div>
        <span className="relative z-10">
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </span>
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
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState('Music');
  const [youtubeVideos, setYoutubeVideos] = useState({
    Music: [],
    Gaming: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get data from content manager
  const personalInfo = contentData.personal;

  const tabs = [
    { 
      id: 'Music', 
      label: 'Music', 
      icon: Music, 
      color: 'from-amber-600 to-orange-700',
      description: 'Original compositions and musical creations'
    },
    { 
      id: 'Gaming', 
      label: 'Gaming', 
      icon: Gamepad2, 
      color: 'from-cyan-600 to-teal-700',
      description: 'Epic gaming sessions and walkthroughs'
    }
  ];

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
      return;
    }
    
    // Create new array with swapped videos
    const newVideos = [...currentVideos];
    [newVideos[0], newVideos[clickedIndex]] = [newVideos[clickedIndex], newVideos[0]];
    
    // Update the videos state
    setYoutubeVideos(prev => ({
      ...prev,
      [activeTab]: newVideos
    }));
    
    // Start playing the newly swapped main video
    setSelectedVideo(clickedVideo.videoId);
    setIsVideoPlaying(true);
    
    // Track video swap and play
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.videoSwap(currentVideos[0].videoId, clickedVideo.videoId);
      analytics.trackPortfolioEvents.videoPlay(clickedVideo.videoId, clickedVideo.title, 'artist-portfolio');
    }
  };

  const handleChannelVisit = (channelUrl, channelType) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.channelVisit(channelType, channelUrl);
    }
  };

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      setLoading(true);
      setError(null);
      
      try {
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

        setYoutubeVideos({
          Music: musicVideos,
          Gaming: gamingVideos
        });

      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        setError(error.message);
        setYoutubeVideos({ Music: [], Gaming: [] });
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
      setYoutubeVideos(prev => ({
        ...prev,
        [activeTab]: refreshedVideos
      }));
    } catch (error) {
      console.error('Error handling manual refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
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
        description="Explore my content across music and gaming. Each category showcases different aspects of my creative journey."
        keywords="creative work, music content, gaming videos, content creation, YouTube, streaming"
      />

      <ArtistPageShell>
        {/* Single blurred cinematic hero — one framed shot */}
        <section className="relative isolate w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={artistMedia.work.banner}
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-110 object-cover object-center blur-[3px] sm:blur-[4px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          </div>

          <div className="relative mx-auto flex min-h-[44vh] w-full max-w-4xl flex-col items-center justify-center px-4 pb-12 pt-28 text-center sm:min-h-[52vh] sm:px-6 sm:pb-16 sm:pt-32">
            <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              My <span className={artistHeadingAccent}>Creative Work</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
              Explore my content across music and gaming. Each category showcases different aspects of my creative journey.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`relative z-10 ${artistPagePad}`}
          style={{
            paddingTop: '2rem',
            paddingBottom: '2rem'
          }}
        >
          <div className={artistPageWidth}>
            
            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 max-w-4xl mx-auto"
              >
                <p className="text-red-300 text-center text-sm sm:text-base">
                  <strong>API Error:</strong> {error}
                </p>
              </motion.div>
            )}

            {/* Tab Navigation with Refresh Button - FIXED: Equal width buttons, no scrolling */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Tab Navigation - FIXED: Equal width buttons, no scrolling, INCREASED WIDTH */}
              <div className="w-full rounded-full border border-white/15 bg-black/30 p-1.5 backdrop-blur-sm sm:w-auto sm:min-w-[320px]">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => handleTabSwitch(tab.id)}
                      className={`flex items-center justify-center space-x-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:space-x-2 sm:px-5 sm:py-3 sm:text-sm ${
                        activeTab === tab.id
                          ? 'bg-amber-200 text-black'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon size={16} className="sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
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
                  className="text-amber-200"
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
                      <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/30 rounded-xl px-4 py-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-amber-200 text-xs sm:text-sm">Refreshing videos...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Main Featured Video */}
                  {getMainVideo() && (
                    <div>
                      {/* Latest Video Label */}
                      <div className="mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                          Watch <span className={artistHeadingAccent}>Latest</span> Video
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
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
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
                                className={`flex-1 ${artistBtnPrimary}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Youtube size={16} className="sm:w-5 sm:h-5" />
                                <span>Subscribe</span>
                              </motion.a>
                              
                              <motion.a
                                href={`https://www.youtube.com/watch?v=${getMainVideo().videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleChannelVisit(`https://www.youtube.com/watch?v=${getMainVideo().videoId}`, 'video')}
                                className={`flex-1 ${artistBtnSecondary}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
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
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          More <span className={artistHeadingAccent}>{activeTab}</span> Content
                        </h3>
                        
                        {/* More Videos Button */}
                        <motion.a
                          href={getChannelInfo().url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                          className={artistBtnGhost}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
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

                  {/* Empty state */}
                  {getCurrentVideos().length === 0 && (
                    <div className="text-center py-12 sm:py-20">
                      <p className="text-gray-400 text-sm sm:text-base mb-6">
                        No videos to show right now. Visit the YouTube channel below.
                      </p>
                      <motion.a
                        href={getChannelInfo().url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleChannelVisit(getChannelInfo().url, activeTab)}
                        className={artistBtnPrimary}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Youtube size={16} className="sm:w-5 sm:h-5" />
                        <span>Visit {getChannelInfo().name}</span>
                        <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                      </motion.a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
        <ArtistFooter />
      </ArtistPageShell>
    </>
  );
};

export default ArtistWork;