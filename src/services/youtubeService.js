// services/youtubeService.js - Customized for 6-hour cache with manual refresh
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Cache configuration - Customized for your posting schedule
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const VIDEO_CACHE_KEY = 'youtube_videos_cache';
const CACHE_TIMESTAMP_KEY = 'youtube_cache_timestamp';

// Your channel configurations
const CHANNELS = {
  music: {
    id: process.env.REACT_APP_MUSIC_CHANNEL_ID,
    name: 'Himank Arora'
  },
  gaming: {
    id: process.env.REACT_APP_GAMING_CHANNEL_ID,
    name: 'Himank Gaming'
  }
};

// Quota cost tracking
let dailyQuotaUsed = 0;
const DAILY_QUOTA_LIMIT = 10000;

const API_ERROR_MESSAGES = {
  403: 'API quota exceeded. Please try again tomorrow.',
  404: 'Channel not found. Please check the configuration.',
  500: 'YouTube service temporarily unavailable.',
  NETWORK: 'Connection failed. Please check your internet connection.'
};

export const handleAPIError = (error) => {
  if (error.response?.status) {
    return API_ERROR_MESSAGES[error.response.status] || 'An unexpected error occurred';
  }
  return API_ERROR_MESSAGES.NETWORK;
};

// Cache management with human-readable time display
const getCachedData = (key) => {
  try {
    const cachedData = localStorage.getItem(key);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && timestamp) {
      const cacheAge = Date.now() - parseInt(timestamp);
      const hoursOld = Math.round(cacheAge / 1000 / 60 / 60 * 10) / 10; // Round to 1 decimal
      
      if (cacheAge < CACHE_DURATION) {
        console.log(`📦 Using cached data for ${key} (${hoursOld}h old)`);
        return {
          data: JSON.parse(cachedData),
          cacheInfo: {
            age: cacheAge,
            hoursOld: hoursOld,
            isExpired: false,
            lastUpdated: new Date(parseInt(timestamp))
          }
        };
      } else {
        console.log(`⏰ Cache expired for ${key} (${hoursOld}h old, max 6h)`);
        return {
          data: JSON.parse(cachedData), // Return expired data as fallback
          cacheInfo: {
            age: cacheAge,
            hoursOld: hoursOld,
            isExpired: true,
            lastUpdated: new Date(parseInt(timestamp))
          }
        };
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
};

const setCachedData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    console.log(`💾 Cached data for ${key} - valid for 6 hours`);
  } catch (error) {
    console.error('Error writing cache:', error);
  }
};

// Get cache information for UI display
export const getCacheInfo = (channelType) => {
  const cacheKey = `${VIDEO_CACHE_KEY}_${channelType}`;
  const cached = getCachedData(cacheKey);
  
  if (!cached) {
    return {
      hasCache: false,
      message: 'No cached data'
    };
  }
  
  const { cacheInfo } = cached;
  const timeUntilExpiry = CACHE_DURATION - cacheInfo.age;
  const hoursUntilExpiry = Math.max(0, Math.round(timeUntilExpiry / 1000 / 60 / 60 * 10) / 10);
  
  return {
    hasCache: true,
    isExpired: cacheInfo.isExpired,
    lastUpdated: cacheInfo.lastUpdated,
    hoursOld: cacheInfo.hoursOld,
    hoursUntilExpiry: hoursUntilExpiry,
    message: cacheInfo.isExpired 
      ? `Cache expired (${cacheInfo.hoursOld}h old)` 
      : `Fresh cache (${cacheInfo.hoursOld}h old, expires in ${hoursUntilExpiry}h)`
  };
};

// Quota tracking
const trackQuotaUsage = (cost) => {
  dailyQuotaUsed += cost;
  console.log(`📊 Quota used: ${dailyQuotaUsed}/${DAILY_QUOTA_LIMIT} units`);
  
  if (dailyQuotaUsed >= DAILY_QUOTA_LIMIT * 0.8) {
    console.warn('⚠️ Approaching quota limit! Consider using cached data.');
  }
};

// API request wrapper with quota tracking
const makeYouTubeRequest = async (endpoint, params, quotaCost = 1) => {
  if (dailyQuotaUsed + quotaCost > DAILY_QUOTA_LIMIT) {
    throw new Error('Daily quota limit would be exceeded');
  }

  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}${endpoint}`, {
      params: {
        key: YOUTUBE_API_KEY,
        ...params
      }
    });
    
    trackQuotaUsage(quotaCost);
    return response;
  } catch (error) {
    if (error.response?.status === 403 && error.response?.data?.error?.message?.includes('quota')) {
      console.error('❌ YouTube API quota exceeded!');
      throw new Error('YouTube API quota exceeded. Please try again tomorrow.');
    }
    throw error;
  }
};

// Main function to get channel videos with enhanced caching
export const getChannelVideos = async (channelType, maxResults = 10, forceRefresh = false) => {
  try {
    const cacheKey = `${VIDEO_CACHE_KEY}_${channelType}`;
    
    // Check for cached data (unless force refresh is requested)
    if (!forceRefresh) {
      const cachedResult = getCachedData(cacheKey);
      if (cachedResult && cachedResult.data && cachedResult.data.length > 0 && !cachedResult.cacheInfo.isExpired) {
        console.log(`📦 Returning cached videos for ${channelType}`);
        return cachedResult.data.slice(0, maxResults);
      }
    }

    const channelId = CHANNELS[channelType]?.id;
    if (!channelId) {
      console.error('Invalid channel type:', channelType);
      return [];
    }

    console.log(`🔍 Fetching ${forceRefresh ? 'fresh' : 'new'} videos for ${channelType} channel:`, channelId);

    // Search API costs 100 units per request
    const response = await makeYouTubeRequest('/search', {
      channelId: channelId,
      part: 'snippet',
      order: 'date',
      maxResults: Math.min(maxResults, 25), // Limit to reduce quota usage
      type: 'video'
    }, 100);

    const videos = response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      channelType: channelType
    }));

    // Cache the fresh results
    setCachedData(cacheKey, videos);
    
    console.log(`✅ Found ${videos.length} ${forceRefresh ? 'refreshed' : 'fresh'} videos for ${channelType}`);
    return videos;
  } catch (error) {
    console.error(`❌ Error fetching YouTube videos for ${channelType}:`, error);
    
    // Return cached data even if expired as fallback
    const cacheKey = `${VIDEO_CACHE_KEY}_${channelType}`;
    const fallbackCache = getCachedData(cacheKey);
    if (fallbackCache && fallbackCache.data) {
      console.log('📦 Using cached data as fallback (may be expired)');
      return fallbackCache.data.slice(0, maxResults);
    }
    
    return [];
  }
};

// Force refresh function for manual button
export const forceRefreshVideos = async (channelType, maxResults = 10) => {
  console.log(`🔄 Force refreshing videos for ${channelType}...`);
  return await getChannelVideos(channelType, maxResults, true);
};

// Clear specific channel cache
export const clearChannelCache = (channelType) => {
  try {
    const cacheKey = `${VIDEO_CACHE_KEY}_${channelType}`;
    localStorage.removeItem(cacheKey);
    console.log(`🧹 Cleared cache for ${channelType}`);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Clear all video cache
export const clearAllVideoCache = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(VIDEO_CACHE_KEY) || key === CACHE_TIMESTAMP_KEY) {
        localStorage.removeItem(key);
      }
    });
    console.log('🧹 All video cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Get detailed cache status for admin/debug purposes
export const getCacheStatus = () => {
  const musicInfo = getCacheInfo('music');
  const gamingInfo = getCacheInfo('gaming');
  
  return {
    music: musicInfo,
    gaming: gamingInfo,
    quota: {
      used: dailyQuotaUsed,
      limit: DAILY_QUOTA_LIMIT,
      remaining: DAILY_QUOTA_LIMIT - dailyQuotaUsed,
      percentage: Math.round((dailyQuotaUsed / DAILY_QUOTA_LIMIT) * 100)
    },
    settings: {
      cacheDurationHours: CACHE_DURATION / (60 * 60 * 1000),
      lastQuotaReset: 'Midnight PT' // YouTube resets at midnight Pacific Time
    }
  };
};

// Helper functions (unchanged)
export const getVideoStats = async (videoId) => {
  try {
    const cacheKey = `video_stats_${videoId}`;
    const cachedStats = getCachedData(cacheKey);
    
    if (cachedStats && !cachedStats.cacheInfo.isExpired) {
      return cachedStats.data;
    }

    const response = await makeYouTubeRequest('/videos', {
      id: videoId,
      part: 'statistics,contentDetails'
    }, 1);

    if (response.data.items.length === 0) {
      return null;
    }

    const video = response.data.items[0];
    const stats = {
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      duration: video.contentDetails.duration
    };

    setCachedData(cacheKey, stats);
    return stats;
  } catch (error) {
    console.error('❌ Error fetching video stats:', error);
    return null;
  }
};

export const formatDuration = (duration) => {
  if (!duration) return '0:00';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};

export const formatViewCount = (count) => {
  if (!count) return '0';
  
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const testYouTubeAPI = async () => {
  try {
    console.log('🧪 Testing YouTube API connection...');
    console.log('API Key:', YOUTUBE_API_KEY ? 'Present' : 'Missing');
    console.log('Music Channel ID:', CHANNELS.music.id);
    console.log('Gaming Channel ID:', CHANNELS.gaming.id);
    
    const response = await makeYouTubeRequest('/channels', {
      id: CHANNELS.music.id,
      part: 'snippet'
    }, 1);
    
    const success = response.data.items.length > 0;
    console.log('✅ API Test Result:', success ? 'Success!' : 'No data found');
    return success;
  } catch (error) {
    console.error('❌ YouTube API test failed:', error);
    return false;
  }
};

export const getQuotaStatus = () => {
  return {
    used: dailyQuotaUsed,
    limit: DAILY_QUOTA_LIMIT,
    remaining: DAILY_QUOTA_LIMIT - dailyQuotaUsed,
    percentage: (dailyQuotaUsed / DAILY_QUOTA_LIMIT) * 100
  };
};

export const resetDailyQuota = () => {
  dailyQuotaUsed = 0;
  console.log('🔄 Daily quota reset');
};