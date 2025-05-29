// Add this temporary debug component to test your API
// Create: src/components/YouTubeDebug.jsx

import React, { useEffect, useState } from 'react';
import { testYouTubeAPI, getChannelVideos } from '../services/youtubeService';

const YouTubeDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDebug = async () => {
      console.log('🔍 Starting YouTube API Debug...');
      
      // Check environment variables
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const musicChannelId = process.env.REACT_APP_MUSIC_CHANNEL_ID;
      const gamingChannelId = process.env.REACT_APP_GAMING_CHANNEL_ID;
      
      const debug = {
        envVars: {
          apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING',
          musicChannelId: musicChannelId || 'MISSING',
          gamingChannelId: gamingChannelId || 'MISSING'
        },
        apiTest: false,
        musicVideos: [],
        gamingVideos: [],
        errors: []
      };
      
      console.log('📊 Environment Variables:');
      console.log('API Key:', debug.envVars.apiKey);
      console.log('Music Channel:', debug.envVars.musicChannelId);
      console.log('Gaming Channel:', debug.envVars.gamingChannelId);
      
      try {
        // Test API connection
        console.log('🧪 Testing API connection...');
        debug.apiTest = await testYouTubeAPI();
        console.log('API Test Result:', debug.apiTest);
        
        if (debug.apiTest) {
          // Try to fetch actual videos
          console.log('📹 Fetching music videos...');
          debug.musicVideos = await getChannelVideos('music', 3);
          console.log('Music videos found:', debug.musicVideos.length);
          
          console.log('🎮 Fetching gaming videos...');
          debug.gamingVideos = await getChannelVideos('gaming', 3);
          console.log('Gaming videos found:', debug.gamingVideos.length);
        }
        
      } catch (error) {
        console.error('❌ Debug Error:', error);
        debug.errors.push(error.message);
        
        if (error.response) {
          console.error('Response Status:', error.response.status);
          console.error('Response Data:', error.response.data);
          debug.errors.push(`HTTP ${error.response.status}: ${error.response.data?.error?.message || 'Unknown error'}`);
        }
      }
      
      setDebugInfo(debug);
      setLoading(false);
    };
    
    runDebug();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 m-4">
        <h3 className="text-white font-bold mb-4">🔍 YouTube API Debug</h3>
        <p className="text-blue-300">Running diagnostics...</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 m-4">
      <h3 className="text-white font-bold mb-4">🔍 YouTube API Debug Results</h3>
      
      {/* Environment Variables */}
      <div className="mb-4">
        <h4 className="text-blue-300 font-semibold mb-2">Environment Variables:</h4>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>API Key:</span>
            <span className={debugInfo.envVars?.apiKey === 'MISSING' ? 'text-red-400' : 'text-green-400'}>
              {debugInfo.envVars?.apiKey}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Music Channel:</span>
            <span className={debugInfo.envVars?.musicChannelId === 'MISSING' ? 'text-red-400' : 'text-green-400'}>
              {debugInfo.envVars?.musicChannelId}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Gaming Channel:</span>
            <span className={debugInfo.envVars?.gamingChannelId === 'MISSING' ? 'text-red-400' : 'text-green-400'}>
              {debugInfo.envVars?.gamingChannelId}
            </span>
          </div>
        </div>
      </div>
      
      {/* API Test Result */}
      <div className="mb-4">
        <h4 className="text-blue-300 font-semibold mb-2">API Connection:</h4>
        <span className={debugInfo.apiTest ? 'text-green-400' : 'text-red-400'}>
          {debugInfo.apiTest ? '✅ Success' : '❌ Failed'}
        </span>
      </div>
      
      {/* Video Counts */}
      <div className="mb-4">
        <h4 className="text-blue-300 font-semibold mb-2">Videos Found:</h4>
        <div className="text-sm space-y-1">
          <div>Music: {debugInfo.musicVideos?.length || 0} videos</div>
          <div>Gaming: {debugInfo.gamingVideos?.length || 0} videos</div>
        </div>
      </div>
      
      {/* Errors */}
      {debugInfo.errors?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-red-300 font-semibold mb-2">Errors:</h4>
          <div className="text-sm space-y-1">
            {debugInfo.errors.map((error, index) => (
              <div key={index} className="text-red-400">• {error}</div>
            ))}
          </div>
        </div>
      )}
      
      {/* Sample Video Data */}
      {debugInfo.musicVideos?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-green-300 font-semibold mb-2">Sample Music Video:</h4>
          <div className="text-xs bg-black/30 rounded p-2 overflow-auto">
            <pre>{JSON.stringify(debugInfo.musicVideos[0], null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeDebug;