// components/YouTubeVideo.jsx - Simplified for direct click-to-swap-and-play
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, ExternalLink, Youtube } from 'lucide-react';
import { getVideoStats, formatDuration, formatViewCount, formatDate } from '../services/youtubeService';

const YouTubeVideo = ({ video, onPlay, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoStats = async () => {
      if (video.videoId) {
        setLoading(true);
        const videoStats = await getVideoStats(video.videoId);
        setStats(videoStats);
        setLoading(false);
      }
    };

    fetchVideoStats();
  }, [video.videoId]);

  const handleVideoClick = (e) => {
    // If clicking on YouTube button, don't trigger video swap/play
    if (e.target.closest('.youtube-button')) {
      return;
    }
    
    if (onPlay) {
      onPlay(video.videoId);
    } else {
      // Fallback: open in new tab
      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
    }
  };

  const handleYouTubeClick = (e) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all group cursor-pointer relative"
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Play size={24} className="text-white ml-1" fill="white" />
          </motion.div>
        </div>
        
        {/* Duration Badge */}
        {stats?.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-white text-xs font-medium">
              {formatDuration(stats.duration)}
            </span>
          </div>
        )}

        {/* Loading indicator for stats */}
        {loading && (
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-white text-xs">Loading...</span>
          </div>
        )}
      </div>
      
      {/* Video Info */}
      <div className="p-4">
        <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors leading-tight">
          {video.title}
        </h4>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          {stats?.viewCount && (
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{formatViewCount(stats.viewCount)} views</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
        
        {/* Channel indicator and YouTube link */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">
            {video.channelTitle}
          </span>
          
          {/* YouTube Link */}
          <motion.button
            onClick={handleYouTubeClick}
            className="youtube-button inline-flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors text-xs bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Youtube size={12} />
            <span>YouTube</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default YouTubeVideo;